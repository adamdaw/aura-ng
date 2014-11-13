aura-ng
=======
Aura-ng is a Force.com package that provides integration between Lightning Components (Aura) and the Angular.js javascri[t library. This project is very much in a nascent state, but there is enough functionality to provide you with a view into where we plan to take this. Here are some of the current capabilities:

- Automatic once and only once loading and initialization semantics for angular JS
- Container components attributes are automatically surfaced as properties on the $scope.v object
- easy to use configuration event that allows you to wire in your angular code after all initialization of both aura and angular has been negotiated for you

Here are some of the things to look forward to:

- Automatic surfacing of aura components as angular directives for use within angular regions
- full integration of aura:iteration and ng-repeat
