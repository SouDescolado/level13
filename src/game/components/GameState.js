define(['ash', 'game/WorldCreator'], function (Ash, WorldCreator) {
    var GameState = Ash.Class.extend({
        
        constructor: function () {
            this.reset();
        },
        
        reset: function () {
            this.stage = 1;
            this.worldSeed = 0;
            this.numCamps = 0;
            this.numTradePostCamps = 0;
            
            this.unlockedFeatures = {
                vision: false,
                fight: false,
                investigate: false,
                bag: false,
                upgrades: false,
                resources: {
                    food: false,
                    water: false,
                    metal: false,
                    rope: false,
                    herbs: false,
                    fuel: false,
                    medicine: false,
                    tools: false,
                    concrete: false,
                },
                sectors: false,
                levels: false,
                trade: false,
                followers: false,
                favour: false,
                evidence: false,
            };
            
            this.uiStatus = {
                currentTab: null,
                leaveCampRes: {},
            };
            
            this.actionCooldownEndTimestamps = {};
        },
        
        getLevelOrdinal: function (level) {
            return WorldCreator.getLevelOrdinal(this.worldSeed, level);
        },
        
        getCampOrdinal: function (level) {
            return WorldCreator.getCampOrdinal(this.worldSeed, level);
        },
        
        getTotalLevels: function () {
            return WorldCreator.getHighestLevel(this.worldSeed) - WorldCreator.getBottomLevel(this.worldSeed) + 1;
        },
        
        getGroundLevelOrdinal: function () {
            return WorldCreator.getBottomLevel(this.worldSeed);
        },
        
        setActionCooldown: function (action, key, cooldown) {
            var actionKey = action;
            if (key.length > 0) actionKey += "-" + key;
            this.actionCooldownEndTimestamps[actionKey] = new Date().getTime() + cooldown * 1000;
        },
        
        getActionCooldown: function (action, key) {
            var actionKey = action;
            if (key.length > 0) actionKey += "-" + key;
            var timestamp = this.actionCooldownEndTimestamps[actionKey];
            if (timestamp) {
                var now = new Date().getTime();
                var diff = timestamp - now;
                if (diff > 0) return timestamp - now;
            }
            return 0;
        },
    });

    return GameState;
});
