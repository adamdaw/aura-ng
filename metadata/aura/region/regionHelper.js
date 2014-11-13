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
	loadAngular: function(component, callback) {
        var helper = this;
        if (helper._loaded) {
        	if (callback) {
        		callback();
        	}
        } else {
        	var callbacks = helper._callbacks;
        	var script;
        	if (!callbacks) {
        		callbacks = helper._callbacks = [];
        		
        		script = document.createElement("script");
                
                script.src = "/resource/aurang__angularjs"; 
                script.type = "text/javascript";
                
                script.onload = function() {
                	helper._loaded = true;
                	
                	for (var n = 0; n < helper._callbacks.length; n++) {
                		helper._callbacks[n]();
                	}
                };
        	}
        	
        	if (callback) {
        		callbacks.push(callback);
        	}

        	if (script) {
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(script);
        	}
        }
    },
    
    bootstrap: function(component) {
	    if (!component._bootstrapped && component._angular && component.isRendered()) {
        	component._bootstrapped = true;
        	component._angular.bootstrap(component.find("locator").getElement(), ["auraNgModule", "angularWithAuraApp"]);
	    }
    }
})