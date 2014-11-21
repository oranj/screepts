var CareerAdvisor = function(roleGetter, roleSetter) {
    var aptitudeRegistry = {},
        roleRegistry = {};
    
    this.identify = function(creep) {
        return creep.name.match(/^([a-zA-Z]+)[0-9]+/)[1];
    };
    this.aptitude = function(type, job) {
        aptitudeRegistry[type] = job;
        return this;
        
    };
    this.role = function(role, callback) {
        roleRegistry[role] = callback;
        return this;
    };
    
    this.advise = function(creep) {
        var myRole = roleGetter(creep), type, role;
        if (! myRole) {
            type = this.identify(creep);
            if (type && aptitudeRegistry.hasOwnProperty(type)) {
                myRole = aptitudeRegistry[type];
            }
            roleSetter(creep, myRole);
        }
        
        if (roleRegistry.hasOwnProperty(myRole)) {
            roleRegistry[myRole
            ].call(null, creep);
            return true;
        }
        return false;
    };
    
    this.adviseAll = function() {
        var creepName, creep, role;
        for (creepName in Game.creeps) {
            this.advise(Game.creeps[creepName]);
        }
    };
};

module.exports = CareerAdvisor;
