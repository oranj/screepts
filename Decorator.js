/**
 * Creates a handy way of decorating types.
 */

module.exports = function() {

    var registry = [];

    this.decorate = function(Type, proto) {

        var Decoration = function(instance) {
            this.instance = instance;
        }, bindFn = function(name, method) {
            Decoration.prototype[name] = function() {
                return method.apply(this.instance, arguments);
            }
        }, name;

        for (name in proto) {
            if (proto.hasOwnProperty(name)) {
                bindFn(name, proto[name]);
            }
        }

        bindFn('toString', function() {
        	return this.toString();
        });

        registry.push({
            type: Type,
            proto: Decoration
        });
    };

    this.accessor = function(obj) {
        var i, matches, str = obj.toString();
        for (i = 0; i < registry.length; i++) {
            matches = str.match(/\[([a-zA-Z]+)\s*/);

            if (matches && matches[1] == registry[i].type) {
                return new registry[i].proto(obj);
            }
        }
    };
};