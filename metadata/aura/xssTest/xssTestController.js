({
    init : function(cmp, event, helper) {
        //models pulling some data from server, e.g. sObject
        cmp.set("v.someAttribute", "\x3cimg src=\x22x\x22 onerror=\x22alert(1)\x22\x3e");

        //test for template injection
        cmp.set("v.buyerName","{{phone.snippet}}");
    },

    configurePhoneRegion : function(cmp, event, helper) {
        var auraModule = event.getParam("module");
        auraModule.controller("PhoneCtrl", ["$scope", function($scope) {
            $scope.phones = [ {
                'name' : 'a',
                'snippet' : 'snippet1'
            }, {
                'name' : 'b',
                'snippet' : 'snippet2'
            }, {
                'name' : 'c',
                'snippet' : 'snippet3'
            } ];
        }]);
    }
})