var X = require("X"), 
    creepName;

for (creepName in Game.creeps) {
    if (Game.creeps.hasOwnProperty(creepName)) {
        X(Game.creeps[creepName]).harvestEnergy();
    }
}
