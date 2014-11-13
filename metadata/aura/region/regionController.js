/*

    Copyright (C) 2014 salesforce.com, inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

*/
({
    init: function(component, event, helper) {
        helper.loadAngular(component, function() {
        	var angularWithAuraApp;
            try {
            	angularWithAuraApp = angular.module("auraNgModule");
            } catch (x) {
                // Register the Aura-Angular bridge controller
                var module = angular.module("auraNgModule", []);
                            
                module.directive('addAuraScope', function () {
                    return {
                    	restrict: 'AE',
                        link: function ($scope, element, attrs) {                            
                            var renderedBy = $A.getCmp(attrs.auraRenderedBy);
                            var cvp = renderedBy.getComponentValueProvider().getComponentValueProvider();
                            
                            // DCHASMAN TODO Figure out how to keep these in sync bidirectionally with Angular
                            $scope.v = {};
                                                
                            cvp.getDef().getAttributeDefs().each(function(a) {
                                var type = a.getTypeDefDescriptor();
                                if (type !== "aura://Aura.Component[]") {
                                    var name = a.getDescriptor().getName();
                                    $scope.v[name] = cvp.get("v." + name);
                                }
                            });   
                        }
                    };
                });
                
                try {
                	angularWithAuraApp = angular.module("angularWithAuraApp");
                } catch (x) {
                    angularWithAuraApp = angular.module("angularWithAuraApp", []);
                }
            }
            
            // Fire the configure event 
            var configureEvent = component.getEvent("configure");
            configureEvent.setParams({ "angular": angular });
            configureEvent.setParams({ "module": angularWithAuraApp });
            configureEvent.fire();
            
            component._angular = angular;
    		helper.bootstrap(component);
        });
    }
})