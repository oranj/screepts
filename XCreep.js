module.exports = function(decorator) {

    var X = decorator.accessor;

    decorator.decorate("creep", {

        findNearest: function(type) {
            var objsOfType = this.room.find(type),
                i, minDistance = Infinity, minObj = null, path;

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
                    console.log(X(this).distanceTo(nearest));
                    if (X(this).distanceTo(nearest) === 1) {
                        this.transferEnergy(nearest);

                    }
                }
            }
        }

    });
};