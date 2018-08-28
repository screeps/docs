# Constants

All the following constant names are available in the global scope:

```javascript-content
{
    OK: 0,
    ERR_NOT_OWNER: -1,
    ERR_NO_PATH: -2,
    ERR_NAME_EXISTS: -3,
    ERR_BUSY: -4,
    ERR_NOT_FOUND: -5,
    ERR_NOT_ENOUGH_ENERGY: -6,
    ERR_NOT_ENOUGH_RESOURCES: -6,
    ERR_INVALID_TARGET: -7,
    ERR_FULL: -8,
    ERR_NOT_IN_RANGE: -9,
    ERR_INVALID_ARGS: -10,
    ERR_TIRED: -11,
    ERR_NO_BODYPART: -12,
    ERR_NOT_ENOUGH_EXTENSIONS: -6,
    ERR_RCL_NOT_ENOUGH: -14,
    ERR_GCL_NOT_ENOUGH: -15,

    FIND_EXIT_TOP: 1,
    FIND_EXIT_RIGHT: 3,
    FIND_EXIT_BOTTOM: 5,
    FIND_EXIT_LEFT: 7,
    FIND_EXIT: 10,
    FIND_CREEPS: 101,
    FIND_MY_CREEPS: 102,
    FIND_HOSTILE_CREEPS: 103,
    FIND_SOURCES_ACTIVE: 104,
    FIND_SOURCES: 105,
    FIND_DROPPED_ENERGY: -106,
    FIND_DROPPED_RESOURCES: 106,
    FIND_STRUCTURES: 107,
    FIND_MY_STRUCTURES: 108,
    FIND_HOSTILE_STRUCTURES: 109,
    FIND_FLAGS: 110,
    FIND_CONSTRUCTION_SITES: 111,
    FIND_MY_SPAWNS: 112,
    FIND_HOSTILE_SPAWNS: 113,
    FIND_MY_CONSTRUCTION_SITES: 114,
    FIND_HOSTILE_CONSTRUCTION_SITES: 115,
    FIND_MINERALS: 116,
    FIND_NUKES: 117,
    FIND_TOMBSTONES: 118,

    TOP: 1,
    TOP_RIGHT: 2,
    RIGHT: 3,
    BOTTOM_RIGHT: 4,
    BOTTOM: 5,
    BOTTOM_LEFT: 6,
    LEFT: 7,
    TOP_LEFT: 8,

    COLOR_RED: 1,
    COLOR_PURPLE: 2,
    COLOR_BLUE: 3,
    COLOR_CYAN: 4,
    COLOR_GREEN: 5,
    COLOR_YELLOW: 6,
    COLOR_ORANGE: 7,
    COLOR_BROWN: 8,
    COLOR_GREY: 9,
    COLOR_WHITE: 10,

    LOOK_CREEPS: "creep",
    LOOK_ENERGY: "energy",
    LOOK_RESOURCES: "resource",
    LOOK_SOURCES: "source",
    LOOK_MINERALS: "mineral",
    LOOK_STRUCTURES: "structure",
    LOOK_FLAGS: "flag",
    LOOK_CONSTRUCTION_SITES: "constructionSite",
    LOOK_NUKES: "nuke",
    LOOK_TERRAIN: "terrain",
    LOOK_TOMBSTONES: "tombstone",

    OBSTACLE_OBJECT_TYPES: ["spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal","nuker"],

    MOVE: "move",
    WORK: "work",
    CARRY: "carry",
    ATTACK: "attack",
    RANGED_ATTACK: "ranged_attack",
    TOUGH: "tough",
    HEAL: "heal",
    CLAIM: "claim",

    BODYPART_COST: {
        "move": 50,
        "work": 100,
        "attack": 80,
        "carry": 50,
        "heal": 250,
        "ranged_attack": 150,
        "tough": 10,
        "claim": 600
    },

    // WORLD_WIDTH and WORLD_HEIGHT constants are deprecated, please use Game.map.getWorldSize() instead
    WORLD_WIDTH: 202,
    WORLD_HEIGHT: 202,

    CREEP_LIFE_TIME: 1500,
    CREEP_CLAIM_LIFE_TIME: 500,
    CREEP_CORPSE_RATE: 0.2,

    CARRY_CAPACITY: 50,
    HARVEST_POWER: 2,
    HARVEST_MINERAL_POWER: 1,
    REPAIR_POWER: 100,
    DISMANTLE_POWER: 50,
    BUILD_POWER: 5,
    ATTACK_POWER: 30,
    UPGRADE_CONTROLLER_POWER: 1,
    RANGED_ATTACK_POWER: 10,
    HEAL_POWER: 12,
    RANGED_HEAL_POWER: 4,
    REPAIR_COST: 0.01,
    DISMANTLE_COST: 0.005,

    RAMPART_DECAY_AMOUNT: 300,
    RAMPART_DECAY_TIME: 100,
    RAMPART_HITS: 1,
    RAMPART_HITS_MAX: {2: 300000, 3: 1000000, 4: 3000000, 5: 10000000, 6: 30000000, 7: 100000000, 8: 300000000},

    ENERGY_REGEN_TIME: 300,
    ENERGY_DECAY: 1000,

    SPAWN_HITS: 5000,
    SPAWN_ENERGY_START: 300,
    SPAWN_ENERGY_CAPACITY: 300,
    CREEP_SPAWN_TIME: 3,
    SPAWN_RENEW_RATIO: 1.2,

    SOURCE_ENERGY_CAPACITY: 3000,
    SOURCE_ENERGY_NEUTRAL_CAPACITY: 1500,
    SOURCE_ENERGY_KEEPER_CAPACITY: 4000,

    WALL_HITS: 1,
    WALL_HITS_MAX: 300000000,

    EXTENSION_HITS: 1000,
    EXTENSION_ENERGY_CAPACITY: {0: 50, 1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 100, 8: 200},

    ROAD_HITS: 5000,
    ROAD_WEAROUT: 1,
    ROAD_DECAY_AMOUNT: 100,
    ROAD_DECAY_TIME: 1000,

    LINK_HITS: 1000,
    LINK_HITS_MAX: 1000,
    LINK_CAPACITY: 800,
    LINK_COOLDOWN: 1,
    LINK_LOSS_RATIO: 0.03,

    STORAGE_CAPACITY: 1000000,
    STORAGE_HITS: 10000,

    STRUCTURE_SPAWN: "spawn",
    STRUCTURE_EXTENSION: "extension",
    STRUCTURE_ROAD: "road",
    STRUCTURE_WALL: "constructedWall",
    STRUCTURE_RAMPART: "rampart",
    STRUCTURE_KEEPER_LAIR: "keeperLair",
    STRUCTURE_PORTAL: "portal",
    STRUCTURE_CONTROLLER: "controller",
    STRUCTURE_LINK: "link",
    STRUCTURE_STORAGE: "storage",
    STRUCTURE_TOWER: "tower",
    STRUCTURE_OBSERVER: "observer",
    STRUCTURE_POWER_BANK: "powerBank",
    STRUCTURE_POWER_SPAWN: "powerSpawn",
    STRUCTURE_EXTRACTOR: "extractor",
    STRUCTURE_LAB: "lab",
    STRUCTURE_TERMINAL: "terminal",
    STRUCTURE_CONTAINER: "container",
    STRUCTURE_NUKER: "nuker",

    CONSTRUCTION_COST: {
        "spawn": 15000,
        "extension": 3000,
        "road": 300,
        "constructedWall": 1,
        "rampart": 1,
        "link": 5000,
        "storage": 30000,
        "tower": 5000,
        "observer": 8000,
        "powerSpawn": 100000,
        "extractor": 5000,
        "lab": 50000,
        "terminal": 100000,
        "container": 5000,
        "nuker": 100000
    },
    CONSTRUCTION_COST_ROAD_SWAMP_RATIO: 5,

    CONTROLLER_LEVELS: {1: 200, 2: 45000, 3: 135000, 4: 405000, 5: 1215000, 6: 3645000, 7: 10935000},
    CONTROLLER_STRUCTURES: {
        "spawn": {0: 0, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 3},
        "extension": {0: 0, 1: 0, 2: 5, 3: 10, 4: 20, 5: 30, 6: 40, 7: 50, 8: 60},
        "link": {1: 0, 2: 0, 3: 0, 4: 0, 5: 2, 6: 3, 7: 4, 8: 6},
        "road": {0: 2500, 1: 2500, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        "constructedWall": {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        "rampart": {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
        "storage": {1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1},
        "tower": {1: 0, 2: 0, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 6},
        "observer": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
        "powerSpawn": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
        "extractor": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
        "terminal": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
        "lab": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 3, 7: 6, 8: 10},
        "container": {0: 5, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5},
        "nuker": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1}
    },
    CONTROLLER_DOWNGRADE: {1: 20000, 2: 5000, 3: 10000, 4: 20000, 5: 40000, 6: 60000, 7: 100000, 8: 150000},
    CONTROLLER_DOWNGRADE_RESTORE: 100,
    CONTROLLER_DOWNGRADE_SAFEMODE_THRESHOLD: 5000,
    CONTROLLER_CLAIM_DOWNGRADE: 300,
    CONTROLLER_RESERVE: 1,
    CONTROLLER_RESERVE_MAX: 5000,
    CONTROLLER_MAX_UPGRADE_PER_TICK: 15,
    CONTROLLER_ATTACK_BLOCKED_UPGRADE: 1000,
    CONTROLLER_NUKE_BLOCKED_UPGRADE: 200,

    SAFE_MODE_DURATION: 20000,
    SAFE_MODE_COOLDOWN: 50000,
    SAFE_MODE_COST: 1000,

    TOWER_HITS: 3000,
    TOWER_CAPACITY: 1000,
    TOWER_ENERGY_COST: 10,
    TOWER_POWER_ATTACK: 600,
    TOWER_POWER_HEAL: 400,
    TOWER_POWER_REPAIR: 800,
    TOWER_OPTIMAL_RANGE: 5,
    TOWER_FALLOFF_RANGE: 20,
    TOWER_FALLOFF: 0.75,

    OBSERVER_HITS: 500,
    OBSERVER_RANGE: 10,

    POWER_BANK_HITS: 2000000,
    POWER_BANK_CAPACITY_MAX: 5000,
    POWER_BANK_CAPACITY_MIN: 500,
    POWER_BANK_CAPACITY_CRIT: 0.3,
    POWER_BANK_DECAY: 5000,
    POWER_BANK_HIT_BACK: 0.5,

    POWER_SPAWN_HITS: 5000,
    POWER_SPAWN_ENERGY_CAPACITY: 5000,
    POWER_SPAWN_POWER_CAPACITY: 100,
    POWER_SPAWN_ENERGY_RATIO: 50,

    EXTRACTOR_HITS: 500,
    EXTRACTOR_COOLDOWN: 5,

    LAB_HITS: 500,
    LAB_MINERAL_CAPACITY: 3000,
    LAB_ENERGY_CAPACITY: 2000,
    LAB_BOOST_ENERGY: 20,
    LAB_BOOST_MINERAL: 30,
    LAB_COOLDOWN: 10,
    LAB_REACTION_AMOUNT: 5,

    GCL_POW: 2.4,
    GCL_MULTIPLY: 1000000,
    GCL_NOVICE: 3,

    MODE_SIMULATION: null,
    MODE_WORLD: null,

    TERRAIN_MASK_WALL: 1,
    TERRAIN_MASK_SWAMP: 2,
    TERRAIN_MASK_LAVA: 4,

    MAX_CONSTRUCTION_SITES: 100,
    MAX_CREEP_SIZE: 50,

    MINERAL_REGEN_TIME: 50000,
    MINERAL_MIN_AMOUNT: {
        "H": 35000,
        "O": 35000,
        "L": 35000,
        "K": 35000,
        "Z": 35000,
        "U": 35000,
        "X": 35000
    },
    MINERAL_RANDOM_FACTOR: 2,

    MINERAL_DENSITY: {
        1: 15000,
        2: 35000,
        3: 70000,
        4: 100000
    },
    MINERAL_DENSITY_PROBABILITY  : {
        1: 0.1,
        2: 0.5,
        3: 0.9,
        4: 1.0
    },
    MINERAL_DENSITY_CHANGE: 0.05,

    DENSITY_LOW: 1,
    DENSITY_MODERATE: 2,
    DENSITY_HIGH: 3,
    DENSITY_ULTRA: 4,

    TERMINAL_CAPACITY: 300000,
    TERMINAL_HITS: 3000,
    TERMINAL_SEND_COST: 0.1,
    TERMINAL_MIN_SEND: 100,
    TERMINAL_COOLDOWN: 10,

    CONTAINER_HITS: 250000,
    CONTAINER_CAPACITY: 2000,
    CONTAINER_DECAY: 5000,
    CONTAINER_DECAY_TIME: 100,
    CONTAINER_DECAY_TIME_OWNED: 500,

    NUKER_HITS: 1000,
    NUKER_COOLDOWN: 100000,
    NUKER_ENERGY_CAPACITY: 300000,
    NUKER_GHODIUM_CAPACITY: 5000,
    NUKE_LAND_TIME: 50000,
    NUKE_RANGE: 10,
    NUKE_DAMAGE: {
        0: 10000000,
        2: 5000000
    },

    TOMBSTONE_DECAY_PER_PART: 5,

    PORTAL_DECAY: 30000,

    ORDER_SELL: "sell",
    ORDER_BUY: "buy",

    MARKET_FEE: 0.05,

    FLAGS_LIMIT: 10000,

    SUBSCRIPTION_TOKEN: "token",

    RESOURCE_ENERGY: "energy",
    RESOURCE_POWER: "power",

    RESOURCE_HYDROGEN: "H",
    RESOURCE_OXYGEN: "O",
    RESOURCE_UTRIUM: "U",
    RESOURCE_LEMERGIUM: "L",
    RESOURCE_KEANIUM: "K",
    RESOURCE_ZYNTHIUM: "Z",
    RESOURCE_CATALYST: "X",
    RESOURCE_GHODIUM: "G",

    RESOURCE_HYDROXIDE: "OH",
    RESOURCE_ZYNTHIUM_KEANITE: "ZK",
    RESOURCE_UTRIUM_LEMERGITE: "UL",

    RESOURCE_UTRIUM_HYDRIDE: "UH",
    RESOURCE_UTRIUM_OXIDE: "UO",
    RESOURCE_KEANIUM_HYDRIDE: "KH",
    RESOURCE_KEANIUM_OXIDE: "KO",
    RESOURCE_LEMERGIUM_HYDRIDE: "LH",
    RESOURCE_LEMERGIUM_OXIDE: "LO",
    RESOURCE_ZYNTHIUM_HYDRIDE: "ZH",
    RESOURCE_ZYNTHIUM_OXIDE: "ZO",
    RESOURCE_GHODIUM_HYDRIDE: "GH",
    RESOURCE_GHODIUM_OXIDE: "GO",

    RESOURCE_UTRIUM_ACID: "UH2O",
    RESOURCE_UTRIUM_ALKALIDE: "UHO2",
    RESOURCE_KEANIUM_ACID: "KH2O",
    RESOURCE_KEANIUM_ALKALIDE: "KHO2",
    RESOURCE_LEMERGIUM_ACID: "LH2O",
    RESOURCE_LEMERGIUM_ALKALIDE: "LHO2",
    RESOURCE_ZYNTHIUM_ACID: "ZH2O",
    RESOURCE_ZYNTHIUM_ALKALIDE: "ZHO2",
    RESOURCE_GHODIUM_ACID: "GH2O",
    RESOURCE_GHODIUM_ALKALIDE: "GHO2",

    RESOURCE_CATALYZED_UTRIUM_ACID: "XUH2O",
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE: "XUHO2",
    RESOURCE_CATALYZED_KEANIUM_ACID: "XKH2O",
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE: "XKHO2",
    RESOURCE_CATALYZED_LEMERGIUM_ACID: "XLH2O",
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE: "XLHO2",
    RESOURCE_CATALYZED_ZYNTHIUM_ACID: "XZH2O",
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE: "XZHO2",
    RESOURCE_CATALYZED_GHODIUM_ACID: "XGH2O",
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE: "XGHO2",

    REACTIONS: {
        H: {
            O: "OH",
            L: "LH",
            K: "KH",
            U: "UH",
            Z: "ZH",
            G: "GH"
        },
        O: {
            H: "OH",
            L: "LO",
            K: "KO",
            U: "UO",
            Z: "ZO",
            G: "GO"
        },
        Z: {
            K: "ZK",
            H: "ZH",
            O: "ZO"
        },
        L: {
            U: "UL",
            H: "LH",
            O: "LO"
        },
        K: {
            Z: "ZK",
            H: "KH",
            O: "KO"
        },
        G: {
            H: "GH",
            O: "GO"
        },
        U: {
            L: "UL",
            H: "UH",
            O: "UO"
        },
        OH: {
            UH: "UH2O",
            UO: "UHO2",
            ZH: "ZH2O",
            ZO: "ZHO2",
            KH: "KH2O",
            KO: "KHO2",
            LH: "LH2O",
            LO: "LHO2",
            GH: "GH2O",
            GO: "GHO2"
        },
        X: {
            UH2O: "XUH2O",
            UHO2: "XUHO2",
            LH2O: "XLH2O",
            LHO2: "XLHO2",
            KH2O: "XKH2O",
            KHO2: "XKHO2",
            ZH2O: "XZH2O",
            ZHO2: "XZHO2",
            GH2O: "XGH2O",
            GHO2: "XGHO2"
        },
        ZK: {
            UL: "G"
        },
        UL: {
            ZK: "G"
        },
        LH: {
            OH: "LH2O"
        },
        ZH: {
            OH: "ZH2O"
        },
        GH: {
            OH: "GH2O"
        },
        KH: {
            OH: "KH2O"
        },
        UH: {
            OH: "UH2O"
        },
        LO: {
            OH: "LHO2"
        },
        ZO: {
            OH: "ZHO2"
        },
        KO: {
            OH: "KHO2"
        },
        UO: {
            OH: "UHO2"
        },
        GO: {
            OH: "GHO2"
        },
        LH2O: {
            X: "XLH2O"
        },
        KH2O: {
            X: "XKH2O"
        },
        ZH2O: {
            X: "XZH2O"
        },
        UH2O: {
            X: "XUH2O"
        },
        GH2O: {
            X: "XGH2O"
        },
        LHO2: {
            X: "XLHO2"
        },
        UHO2: {
            X: "XUHO2"
        },
        KHO2: {
            X: "XKHO2"
        },
        ZHO2: {
            X: "XZHO2"
        },
        GHO2: {
            X: "XGHO2"
        }
    },

    BOOSTS: {
        work: {
            UO: {
                harvest: 3
            },
            UHO2: {
                harvest: 5
            },
            XUHO2: {
                harvest: 7
            },
            LH: {
                build: 1.5,
                repair: 1.5
            },
            LH2O: {
                build: 1.8,
                repair: 1.8
            },
            XLH2O: {
                build: 2,
                repair: 2
            },
            ZH: {
                dismantle: 2
            },
            ZH2O: {
                dismantle: 3
            },
            XZH2O: {
                dismantle: 4
            },
            GH: {
                upgradeController: 1.5
            },
            GH2O: {
                upgradeController: 1.8
            },
            XGH2O: {
                upgradeController: 2
            }
        },
        attack: {
            UH: {
                attack: 2
            },
            UH2O: {
                attack: 3
            },
            XUH2O: {
                attack: 4
            }
        },
        ranged_attack: {
            KO: {
                rangedAttack: 2,
                rangedMassAttack: 2
            },
            KHO2: {
                rangedAttack: 3,
                rangedMassAttack: 3
            },
            XKHO2: {
                rangedAttack: 4,
                rangedMassAttack: 4
            }
        },
        heal: {
            LO: {
                heal: 2,
                rangedHeal: 2
            },
            LHO2: {
                heal: 3,
                rangedHeal: 3
            },
            XLHO2: {
                heal: 4,
                rangedHeal: 4
            }
        },
        carry: {
            KH: {
                capacity: 2
            },
            KH2O: {
                capacity: 3
            },
            XKH2O: {
                capacity: 4
            }
        },
        move: {
            ZO: {
                fatigue: 2
            },
            ZHO2: {
                fatigue: 3
            },
            XZHO2: {
                fatigue: 4
            }
        },
        tough: {
            GO: {
                damage: .7
            },
            GHO2: {
                damage: .5
            },
            XGHO2: {
                damage: .3
            }
        }
    },

    REACTION_TIME: {
        OH: 20,
        ZK: 5,
        UL: 5,
        G: 5,
        UH: 10,
        UH2O: 5,
        XUH2O: 60,
        UO: 10,
        UHO2: 5,
        XUHO2: 60,
        KH: 10,
        KH2O: 5,
        XKH2O: 60,
        KO: 10,
        KHO2: 5,
        XKHO2: 60,
        LH: 15,
        LH2O: 10,
        XLH2O: 65,
        LO: 10,
        LHO2: 5,
        XLHO2: 60,
        ZH: 20,
        ZH2O: 40,
        XZH2O: 160,
        ZO: 10,
        ZHO2: 5,
        XZHO2: 60,
        GH: 10,
        GH2O: 15,
        XGH2O: 80,
        GO: 10,
        GHO2: 30,
        XGHO2: 150,
    },

    PORTAL_UNSTABLE: 10*24*3600*1000,
    PORTAL_MIN_TIMEOUT: 12*24*3600*1000,
    PORTAL_MAX_TIMEOUT: 22*24*3600*1000,

    POWER_BANK_RESPAWN_TIME: 50000,

    INVADERS_ENERGY_GOAL: 100000,

    SYSTEM_USERNAME: 'Screeps',

    // SIGN_NOVICE_AREA and SIGN_RESPAWN_AREA constants are deprecated, please use SIGN_PLANNED_AREA instead
    SIGN_NOVICE_AREA: 'A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.',
    SIGN_RESPAWN_AREA: 'A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.',
    SIGN_PLANNED_AREA: 'A new Novice or Respawn Area is being planned somewhere in this sector. Please make sure all important rooms are reserved.'

    EVENT_ATTACK: 1,
    EVENT_OBJECT_DESTROYED: 2,
    EVENT_ATTACK_CONTROLLER: 3,
    EVENT_BUILD: 4,
    EVENT_HARVEST: 5,
    EVENT_HEAL: 6,
    EVENT_REPAIR: 7,
    EVENT_RESERVE_CONTROLLER: 8,
    EVENT_UPGRADE_CONTROLLER: 9,
    EVENT_EXIT: 10,

    EVENT_ATTACK_TYPE_MELEE: 1,
    EVENT_ATTACK_TYPE_RANGED: 2,
    EVENT_ATTACK_TYPE_RANGED_MASS: 3,
    EVENT_ATTACK_TYPE_DISMANTLE: 4,
    EVENT_ATTACK_TYPE_HIT_BACK: 5,
    EVENT_ATTACK_TYPE_NUKE: 6,

    EVENT_HEAL_TYPE_MELEE: 1,
    EVENT_HEAL_TYPE_RANGED: 2,
};


BODYPARTS_ALL = [
    MOVE,
    WORK,
    CARRY,
    ATTACK,
    RANGED_ATTACK,
    TOUGH,
    HEAL,
    CLAIM
];

RESOURCES_ALL = [
    RESOURCE_ENERGY,
    RESOURCE_POWER,

    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_UTRIUM,
    RESOURCE_KEANIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_CATALYST,
    RESOURCE_GHODIUM,

    RESOURCE_HYDROXIDE,
    RESOURCE_ZYNTHIUM_KEANITE,
    RESOURCE_UTRIUM_LEMERGITE,

    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_UTRIUM_OXIDE,
    RESOURCE_KEANIUM_HYDRIDE,
    RESOURCE_KEANIUM_OXIDE,
    RESOURCE_LEMERGIUM_HYDRIDE,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_ZYNTHIUM_HYDRIDE,
    RESOURCE_ZYNTHIUM_OXIDE,
    RESOURCE_GHODIUM_HYDRIDE,
    RESOURCE_GHODIUM_OXIDE,

    RESOURCE_UTRIUM_ACID,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_KEANIUM_ACID,
    RESOURCE_KEANIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_ACID,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_GHODIUM_ACID,
    RESOURCE_GHODIUM_ALKALIDE,

    RESOURCE_CATALYZED_UTRIUM_ACID,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ACID,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE
];

COLORS_ALL = [
    COLOR_RED,
    COLOR_PURPLE,
    COLOR_BLUE,
    COLOR_CYAN,
    COLOR_GREEN,
    COLOR_YELLOW,
    COLOR_ORANGE,
    COLOR_BROWN,
    COLOR_GREY,
    COLOR_WHITE
];

```
