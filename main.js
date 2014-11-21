var Decorator = require("Decorator"),
    decorator = new Decorator(),
    X = decorator.accessor,
    creepName, worker;

require("XCreep")(decorator);

for (creepName in Game.creeps) {
    if (Game.creeps.hasOwnProperty(creepName)) {
        X(Game.creeps[creepName]).harvestEnergy();
    }
}
