({
    sanitizedRendering: function(component) {
        function sanitizedChildRendering(component) {
            var desc = component.getDef().getDescriptor().getQualifiedName();
            switch (desc) {
                case "markup://aura:html":
                    var tag = component.get("v.tag");
                    var attributes = component.get("v.HTMLAttributes");
    
                    var content = "<" + tag;
    
                    // Emit the attributes
                    for (var attr in attributes) {
                        var a = attributes[attr];
                        // Only emit string values - this keeps expressions from being emitted
                        if ($A.util.isString(a)) {
                            content += " " + attr + "=\"" + attributes[attr] + "\"";
                        }
                    }
                    
                    content += ">";
    
                    // Emit the body
                    var body = component.get("v.body");
                    for (var n = 0; n < body.length; n++) {
                        var child = sanitizedChildRendering(body[n]);
                        if (child) {
                            content += child;
                        }
                    }
    
                    return content + "</" + tag + ">";
                    break;
    
                case "markup://aura:text":
                    // aura:text can only contain inert (no expressions) literal text values (aura:expression is used to represent expressions)
                    return component.get("v.value");
                    break;
    
                default:
                    return undefined;
            }
        }
                
        var body = component.get("v.body");
        var sanitizedRendering = "";
        for (var n = 0; n < body.length; n++) {
            var child = sanitizedChildRendering(body[n]);
            if (child) {
                sanitizedRendering += child;
            }
        }
        
        return sanitizedRendering;
    }
})