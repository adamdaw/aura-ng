({
	configure: function(component, event, helper) {
		var auraModule = event.getParam("module");
		
		auraModule.run(function($templateCache) {
			var content = document.createElement("DIV");
			$A.render(component.get("v.body"), content);

		  	$templateCache.put(component.get("v.id"), content.innerHTML);
		});
	}
})