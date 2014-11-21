module.exports = function(decorator) {
    
    var X = decorator.accessor;
  
    decorator.decorate("creep", {
        
        findNearest: function(type) {
            
            var objsOfType = this.room.find(type),
                i, minDistance = Infinity, minObj = null, path;
                
            if (type === undefined) {
                throw new Error("Unknown type: `" + type + "`");
            }
                
            for (i = 0; i < objsOfType.length; i++) {
                path = this.room.findPath(this.pos, objsOfType[i].pos);
                if (path.length < minDistance) {
                    minDistance = path.length;
                    minObj = objsOfType[i];
                }
            }
            
            return minObj;
        },
        
        moveToNearest: function(type) {
            var nearest = X(this).findNearest(type);
            if (nearest !== null) {
                this.moveTo(nearest);
            }
            return nearest;
        },
        
        distanceTo: function(target) {
            var path = this.room.findPath(this.pos, target.pos);
            if (path) {
                return path.length;
            }
            return Infinity;
        },
        
        setAttr: function(key, value) {
            Memory.creeps[this.name][key] = value;
        },
        
        getAttr: function(key) {
            return Memory.creeps[this.name][key];    
        },
        
        setRole: function(role) {
            console.log("Setting role of " + this.name + " to " + role);
            X(this).setAttr('role', role);
        },
        
        getRole: function() {
            return X(this).getAttr('role');
        },
        
        defend: function() {
            var nearestEnemy = X(this).findNearest(Game.HOSTILE_CREEPS);
            
            if (nearestEnemy) {
                if (X(this).distanceTo(nearestEnemy) == 1) {
                    this.attack(nearestEnemy);   
                } else {
                    this.moveTo(nearestEnemy);
                }
            }
        },
        
        construct: function() {
            var nearest = X(this).findNearest(Game.CONSTRUCTION_SITES);
            
            if (this.energy === 0) {
                X(this).retrieveEnergy();
            }
            
            if (nearest !== null) {
                if (X(this).distanceTo(nearest) <= 1) {
                    this.build(nearest);
                } else {
                    this.moveTo(nearest);
                }
            }
        },
        
        retrieveEnergy: function() {
            var nearestSpawn = X(this).findNearest(Game.MY_SPAWNS);
            if (nearestSpawn.energy > this.energyCapacity) {
                if (X(this).distanceTo(nearestSpawn) === 1) {
                    nearestSpawn.transferEnergy(this, this.energyCapacity);   
                } else {
                    this.moveTo(nearestSpawn);   
                }
            } else {
                console.log("Builder harvesting");
                this.harvestEnergy();
            }
        },
        
        harvestEnergy: function() {
            var nearest;
            if (this.energy < this.energyCapacity) {
                nearest = X(this).moveToNearest(Game.SOURCES);
                if (nearest) {
                    this.harvest(nearest);
                } 
            } else {
                nearest = X(this).findNearest(Game.MY_SPAWNS);
                if (nearest !== null) {
                    if (X(this).distanceTo(nearest) === 1) {
                        this.transferEnergy(nearest);
                    } else {
                        this.moveTo(nearest);
                    }
                }
            }
        }
        
    });
    
};
