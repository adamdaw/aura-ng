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
    render: function(component, helper) {
		var ret = component.superRender();
                            
        var el = component.find("locator").getElement();
        
        var inertRegionRenderer = component.find("inertRegionRenderer");
        inertRegionRenderer.sanitizedRendering(component, function(sanitizedHtml) {
        	el.innerHTML = sanitizedHtml;    
        });
        
        return ret;
    },
    
	afterRender: function(component, helper) {
		component.superAfterRender();
		
		helper.bootstrap(component);
	},
    
    unrender: function(component, helper) {
        // Synchronously remove elements because Angular gets very unhappy if we leave them in the DOM
        var el = component.find("locator").getElement();
        $A.util.removeElement(el);
        
		component.superUnrender();
	}
})