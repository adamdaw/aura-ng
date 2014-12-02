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
		component.set("v.value", [1, 2, 3]);
	},
	
	configurePhoneRegion: function(component, event, helper) {
		var auraModule = event.getParam("module");
				
		// Add a new controller
		auraModule.controller("PhoneCtrl", ["$scope", function($scope) {
            $scope.phones = [ {
                'name' : 'Nexus S',
                'snippet' : 'Fast just got faster with Nexus S.'
            }, {
                'name' : 'Motorola XOOM with Wi-Fi',
                'snippet' : 'The Next, Next Generation tablet.'
            }, {
                'name' : 'MOTOROLA XOOM',
                'snippet' : 'The Next, Next Generation tablet.'
            } ];
        }]);
	},
	
	configureFooterRegion: function(component, event, helper) {
		var auraModule = event.getParam("module");
		
		// Add a new directive
		auraModule.directive('formInput', function() {
	        return {
	            restrict: 'EA',
	            scope: {
	                label: '@label',
	                formId: '@formId'
	            },
	            templateUrl: "/templates/footerTemplate.html"
	        }
	    });
	}
})