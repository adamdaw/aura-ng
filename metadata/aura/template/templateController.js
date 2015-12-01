({
	configure: function(component, event, helper) {
		var auraModule = event.getParam("module");
		
		auraModule.run(function($templateCache) {
            if (component.isValid()) {
                var id = component.get("v.id");
                if (!$templateCache.get(id)) {
                    var inertRegionRenderer = component.find("inertRegionRenderer");
                    inertRegionRenderer.sanitizedRendering(component, function(sanitizedHtml) {
                        $templateCache.put(id, sanitizedHtml);
                    });
                }
            }
		});
	}
})