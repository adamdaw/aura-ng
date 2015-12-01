({
	sanitizedRendering : function(component, event, helper) {
        var arguments = event.getParam('arguments');
		arguments.callback(helper.sanitizedRendering(arguments.root));
	}
})