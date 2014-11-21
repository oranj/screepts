
var spawn = require("Spawn"),
    
    PopulationControl = {
        
        identify: function(creep) {
            return creep.name.match(/^([a-zA-Z]+)[0-9]+$/)[1];
        },
        
        census: function() {
            var i, counts = {}, type;
            for (i in Game.creeps) {
                type = PopulationControl.identify(Game.creeps[i]);
                if (! counts.hasOwnProperty(type)) {
                    counts[type] = 0;
                }
                counts[type]++;
            }
            return counts;
        },
        
        target: function(population) {
            var counts = PopulationControl.census(), count, type, i,
                needed, schedule = [], name, spawnPoint;
            
            for (type in population) {
            
                if (counts.hasOwnProperty(type)) {
                    count = counts[type];
                } else {
                    count = 0;
                }
                needed = Math.max(0, population[type] - count);

                for (i = 0; i < needed; i++) {
                    schedule.push(type);
                }
            }
            
            if (schedule.length) {
                
                for (name in Game.spawns) {
                    spawnPoint = Game.spawns[name];
                    if (! spawnPoint.spawning) {
                        type = schedule.shift();
                        console.log("Spawning:",  type);
                        
                        spawn[type]();
                    }
                }
            }
        }
    };
    
module.exports = PopulationControl;
