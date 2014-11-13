aura-ng
=======
Aura-ng is a component library that provides integration between Aura (technology that powers Force.com Lightning Components) and the Angular.js javascript library. This project is very much in a nascent state, but there is enough functionality to provide you with a view into where we plan to take this. Here are some of the current capabilities:

- automatic once and only once loading and initialization semantics for Angular JS library
- container components attributes are automatically surfaced as properties on the $scope.v object
- easy to use configuration event that allows you to wire in your angular code after all initialization of both aura and angular has been negotiated for you

Here are some of the things to look forward to:

- multi-version support to allow a specific version of angular.JS to be specified at the region level
- automatic surfacing of aura components as angular directives for use within Angular regions
- full support for aura:iteration and ng-repeat

Getting Started
===============
