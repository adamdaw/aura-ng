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
        var scripts = component.get("v.scripts");
        scripts.unshift("/resource/aurang__angularjs");

        // Dynamically add in <ltng:require scripts="{!v.scripts}" afterScriptsLoaded="{!c.angularLoaded}"/>
        $A.createComponent("ltng:require", {
            scripts: scripts,
            afterScriptsLoaded: component.getReference("c.angularLoaded")
        }, function(requireCmp) {
            component.set("v.dynamicRequire", [requireCmp]);
        });    
    },

    angularLoaded: function(component, event, helper) {
        try {
            angular.module("auraNgModule");
        } catch (x) {
            // Register the Aura-Angular bridge controller
            var module = angular.module("auraNgModule", component.get("v.modules"));
            
            module.directive("addAuraScope", function () {
                return {
                    restrict: "AE",
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
            
            function createComponent(element, tag, clientCreatable, attributes) {
                $A.run(function() {
                    $A.componentService.newComponentAsync(
                        this,
                        function(component){
                            var parent = document.createElement("div");
                            $A.render(component, parent);
    
                            element.replaceWith(parent);
                        },
                        {
                            "componentDef": "markup://" + tag,
                            "attributes": {
                                "values": attributes
                            }
                        }, undefined, false, clientCreatable, !clientCreatable
                    );
                });
            }
            
        	module.directive("aurangComponent", function() {
                return {
                    link: function(scope, element, attr) {
                        var tag = attr.aurangTag;
    
                        // Check to see if we know about the component - enforce aura:dependency is used to avoid silent performance killer
                        var def;
                        try {
                            def = $A.componentService.getDef(tag);
                        } catch (e) {
                            if ("Unknown component: markup://" + tag === e.message) {
                                $A.error("No component definiton for " + tag + " in the client registry - perhaps you need to add <aura:dependency resource=\"" + tag + "\"/>?");
                            } else {
                                throw e;
                            }
                        }
    
                        var clientCreatable = attr.ltngClientCreatable !== "false";
    
                        // Build up the LC attributes from the directives attributes
                        var lightningAttributes = {};
    
                        var attrDefs = def.getAttributeDefs();
                        for (name in attr) {
                            var attrDef = attrDefs.getDef(name);
                            if (attrDef) {
                                lightningAttributes[name] = attr[name];
                            }
                        }
    
                        createComponent(element, tag, clientCreatable, lightningAttributes);
                    }
                };
            });
        }
        
        var angularWithAuraApp;
        try {
            angularWithAuraApp = angular.module("angularWithAuraApp");
        } catch (x) {
            angularWithAuraApp = angular.module("angularWithAuraApp", []);
        }        
        
        // Fire the configure event 
        var configureEvent = component.getEvent("configure");
        configureEvent.setParams({ "angular": angular });
        configureEvent.setParams({ "module": angularWithAuraApp });
        configureEvent.fire();
        
        component._angular = angular;
        helper.bootstrap(component);
    }
})