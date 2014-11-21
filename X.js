var Decorator = require("Decorator"),
    decorator = new Decorator();
    
require("XCreep")(decorator);

module.exports = decorator.accessor;
