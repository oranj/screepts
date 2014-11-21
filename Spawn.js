var Spawn, 
    getNextCreepName = function(base) {
        var i = 1, str;
        do {
            str = base + i;
            i++;
            
        } while (Game.creeps.hasOwnProperty(str));
        
        return str;
    }, 

    registerSpawnConfig = function(name, body) {
        Spawn[name] = function(spawn) {
            if (! spawn) {
                spawn = Spawn.getFirst();
            }
            spawn.createCreep(body, getNextCreepName(name));
        };
    };
    
Spawn = {
    
    getFirst: function() {
        var name;
        for (name in Game.spawns) {
            return Game.spawns[name];
        }
        throw new Error("No Spawns!");
    },
    
    getFromName: function(compareName) {
        var name;
        for (name in Game.spawns) {
            if (name == compareName) {
                return Game.spawns[name];
            }
        }
        return null;
    }
};

registerSpawnConfig("Worker", [Game.WORK, Game.CARRY, Game.MOVE]);
registerSpawnConfig("Builder", [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE]);

module.exports = Spawn;
