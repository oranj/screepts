var Spawn, 
getNextCreepName = function(base) {
    var i = 1, str;
    do {
        str = base + i;
        i++;
        
    } while (Game.creeps.hasOwnProperty(str));
    
    return str;
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
    },
    
    Worker: function(spawn) {
        if (! spawn) { 
            spawn = Spawn.getFirst(); 
        }
        spawn.createCreep(
            [Game.WORK, Game.CARRY, Game.MOVE], 
            getNextCreepName("Worker")
        );
    },
    
    Builder: function(spawn) {
        if (! spawn) {
            spawn = Spawn.getFirst();   
        }
        spawn.createCreep(
            [Game.WORK, Game.WORK, Game.WORK, Game.CARRY, Game.MOVE], 
            getNextCreepName("Builder")
        );
    }
};

module.exports = Spawn;
