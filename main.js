var X = require("X"), 
    creepName, 
    xCreep;

for (creepName in Game.creeps) {
    if (Game.creeps.hasOwnProperty(creepName)) {
        xCreep = X(Game.creeps[creepName]);
        switch (xCreep.getRole()) {
            case 'guard':
                xCreep.defend();
                break;
            case 'builder':
                xCreep.construct();
                break;
            case 'harvester':
                xCreep.harvestEnergy();
                break;
            default: 
                var build = creepName.match(/^([a-zA-Z]+)[0-9]+/)[1];
                switch (build) {
                    case 'Worker':
                        xCreep.setRole('harvester');
                        break;
                    case 'Guard':
                        xCreep.setRole('guard');
                        break;
                    case 'Builder':
                        xCreep.setRole('builder');
                        break;
                }
        }
    }
}
