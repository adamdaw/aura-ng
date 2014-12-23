({
	configure: function(component, event, helper) {
		var auraModule = event.getParam("module");
		
		auraModule.run(function($templateCache) {
            if (component.isValid()) {
                var id = component.get("v.id");
                if (!$templateCache.get(id)) {
                    var content = document.createElement("DIV");
                    $A.render(component.get("v.body"), content);
        
                    $templateCache.put(id, content.innerHTML);
                }
            }
		});
	}
})