aura-ng
=======
Aura-ng is a Force.com component library that provides integration between Aura (technology that powers Force.com Lightning Components) and the Angular.js javascript library. This project is very much in a nascent state, but there is enough functionality to provide you with a view into where we plan to take this. Here are some of the current capabilities:

- automatic once and only once loading and initialization semantics for Angular JS library
- correctly invokes `angular.bootstrap()` at the right time in the aura component lifecycle
- container components attributes are automatically surfaced as properties on the $scope.v object
- easy to use configuration event that allows you to wire in your angular code after all initialization of both aura and angular has been negotiated for you
- `aurang-component` directive that allows use of Aura components in Angular templates and directives such as ng-repeat

Here are some of the things to look forward to:

- I'm working to get the changes introduced into the aura framework that will remove the need for the **data-** prefixes or **CDATA** blocks that we currently have to use to work around an aura issue or custom attributes are being incorrectly assigned as properties on Dom elements instead of attributes
- multi-version support to allow a specific version of angular.JS to be specified at the region level
- automatic surfacing of aura components as angular directives for use within Angular regions
- full support for aura:iteration

Installation into your Force.com org
====================================
The library is available as an installable force.com namespaced managed package [here](https://login.salesforce.com/packaging/installPackage.apexp?p0=04to0000000JlZM). The code in this repository is for informational purposes only currently and is a direct copy of the package made by using the force.com command line interface. Your Salesforce.com organization will need to have the Enable Lightning Components preference enabled in Setup In order for you to be able to try out aurang:region in your own components.

After successfully installing the package into your org, you can try out the included demo application at /aurang/regionDemoApp.app.

Getting Started
===============
Aura-ng consists of a single Aura component called aurang:region. You simply wrap the regions of Angular markup in your component with `<aurang:region>your Angular markup goes here</aurang:region>` and then write your angular specific JavaScript inside of a standard aura client-side controller method.

This repository contains a fully functioning sample application [regionDemoApp.app](https://github.com/forcedotcom/aura-ng/blob/master/metadata/aura/regionDemoApp/regionDemoAppApplication.app) and component [regionDemoComponent.cmp](https://github.com/forcedotcom/aura-ng/blob/master/metadata/aura/regionDemo/regionDemoComponent.cmp) that demonstrate a number of different uses of the region component.

Here is a snippet taken directly from the samples:

```
<aura:component access="GLOBAL">
  <aura:attribute name="someAttribute" type="string" required="true"/>
  <aura:attribute name="someOtherAttribute" type="string[]"/>
  <aurang:region aura:id="inner">
    This content came from aurang:demoComponent: {{v.someAttribute}}
    <div data-ng-repeat="item in v.someOtherAttribute">{{item}}</div>
  </aurang:region>
</aura:component>
```
that demonstrates referencing Aura attributes from Angular *{{blah}}* expressions - including iterating using ng-repeat over a collection passed into the component via an Aura attribute. The automatically applied `add-aura-scope` directive takes care of publishing Aura attributes to the region's scope

This example illustrates how to use aurang-component inside of ng-repeat to correctly create one Aura component instance per row in the Angular iteration:

```
<c:region configure="{!c.configurePhoneRegion}">
    <![CDATA[
    <ul ng-controller="PhoneCtrl">
        <li ng-repeat="phone in phones">
            {{phone.name}}
        	<aurang-component aurang-tag="ui:button" label="{{phone.name}}"/>
        </li>
    </ul>
	]]>
</c:region>
```