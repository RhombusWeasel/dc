let starting_skills = 3;
let starting_currency = 200;
let max_stat = 5;

function import_generic_templates() {
    
    utils.templates = {
        ability: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Ability'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'use_cost',     type: 'new_dict',  value: {path: 'pools.ap.value', amount: 0}},
            {mode: 'ensure', path: 'target',       type: 'select',    value: 'targets.self',    select: 'targets',  action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select',    value: 'triggers.always', select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'expire_when',  type: 'select',    value: 'triggers.never',  select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'expired',      type: 'bool',      value: false},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
            {mode: 'ensure', path: 'modifiers',    type: 'new_array', value: []},
        ],
        class: [
            {mode: 'ensure', path: 'label',          type: 'string',    value: 'New Class'},
            {mode: 'ensure', path: 'image',          type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'sub_field',      type: 'string',    value: 'None'},
            {mode: 'ensure', path: 'descriptions',   type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'level',          type: 'int',       value: 0},
            {mode: 'ensure', path: 'playable',       type: 'bool',      value: true},
            {mode: 'ensure', path: 'allow_variants', type: 'bool',      value: false},
            {mode: 'ensure', path: 'requirements',   type: 'new_array', value: []},
            {mode: 'ensure', path: 'modifiers',      type: 'new_array', value: []},
        ],
        currency: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Coin'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'amount',       type: 'int',       value: 0},
            {mode: 'ensure', path: 'convert',      type: 'new_dict',  value: {up: {coin: 'None', rate: 100}, down: {coin: 'None', rate: 100}}},
        ],
        item: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Item'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
            {mode: 'ensure', path: 'modifiers',    type: 'new_array', value: []},
        ],
        point: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'point'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Pool'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'path',         type: 'string',    value: 'test'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
        ],
        pool: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Pool'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'path',         type: 'string',    value: 'pools.test'},
            {mode: 'ensure', path: 'min',          type: 'int',       value: 0},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',       value: max_stat},
            {mode: 'ensure', path: 'modifiers',    type: 'new_array', value: []},
        ],
        race: [
            {mode: 'ensure', path: 'label',          type: 'string',    value: 'New Race'},
            {mode: 'ensure', path: 'image',          type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'sub_field',      type: 'string',    value: 'None'},
            {mode: 'ensure', path: 'playable',       type: 'bool',      value: false},
            {mode: 'ensure', path: 'allow_variants', type: 'bool',      value: false},
            {mode: 'ensure', path: 'descriptions',   type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'modifiers',      type: 'new_array', value: []},
        ],
        skill: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Skill'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'path',         type: 'string',    value: 'skills.test'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'stat' ,        type: 'string',    value: 'butch'},
            {mode: 'ensure', path: 'max',          type: 'int',       value: 0},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',       value: max_stat},
        ],
        spell: [],
        stat: [
            {mode: 'ensure', path: 'label', type: 'string', value: 'New Stat'},
            {mode: 'ensure', path: 'image', type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'path',  type: 'string', value: 'stats.test'},
            {mode: 'ensure', path: 'value', type: 'int',    value: 2},
            {mode: 'ensure', path: 'max',   type: 'int',    value: max_stat},
        ],
        triggers: [
            {mode: 'ensure', path: 'triggers.once',              type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.always',            type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.never',             type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.combat_start',      type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.combat_end',        type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.round_start',       type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.round_end',         type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.turn_start',        type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.turn_end',          type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack',         type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack_hit',     type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack_miss',    type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend',         type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend_success', type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend_fail',    type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_cast',           type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_deal_damage',    type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_take_damage',    type: 'new_dict', value: {}},
            {mode: 'ensure', path: 'triggers.on_avoid_damage',   type: 'new_dict', value: {}},
        ],
        weapon: [
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Weapon'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'ap_cost',      type: 'int',       value:  2},
            {mode: 'ensure', path: 'cp_cost',      type: 'int',       value: 50},
            {mode: 'ensure', path: 'damage',       type: 'int',       value:  0},
            {mode: 'ensure', path: 'range',        type: 'int',       value:  0},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
            {mode: 'ensure', path: 'modifiers',    type: 'new_array', value: []},
        ],
    };
    utils.templates.abilities = [
        {mode: 'ensure',  path: 'triggers.on_take_damage',  type: 'new_dict', value: {label: 'Anger Management', requirements: [{mode: 'check', action: '>=', path: 'classes.barbarian.level', value: 1}], modifiers: [{mode: 'modify', action: 'add', path: 'pools.rage', value: 1, trigger: 'triggers.on_take_damage'}], image: ''}}
    ];
    utils.templates.pools = [
        {mode: 'ensure', path: 'pools.xp',   type: 'new_dict', value: utils.system.new.template('pool', {label: 'XP',   value:  0, max: 100})},
        {mode: 'ensure', path: 'pools.hp',   type: 'new_dict', value: utils.system.new.template('pool', {label: 'HP',   value:  5, max:   5})},
        {mode: 'ensure', path: 'pools.ap',   type: 'new_dict', value: utils.system.new.template('pool', {label: 'AP',   value: 10, max:  10})},
        {mode: 'ignore', path: 'pools.mana', type: 'new_dict', value: utils.system.new.template('pool', {label: 'MANA', value:  5, max:   5})},
        {mode: 'ignore', path: 'pools.rage', type: 'new_dict', value: utils.system.new.template('pool', {label: 'RAGE', value:  0, max:   5})},
    ];
    utils.templates.skills = [
        {mode: 'ensure', path: 'skills.animal_ken',   type: 'new_dict', value: utils.system.new.template('skill', {label: 'Animal Ken',   stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to train or calm an animal']}})},
        {mode: 'ensure', path: 'skills.arcane_lore',  type: 'new_dict', value: utils.system.new.template('skill', {label: 'Arcane Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}})},
        {mode: 'ensure', path: 'skills.engineering',  type: 'new_dict', value: utils.system.new.template('skill', {label: 'Engineering',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the strange traps and devices you may encounter.`]}})},
        {mode: 'ensure', path: 'skills.melee_skill',  type: 'new_dict', value: utils.system.new.template('skill', {label: 'Melee Skill',  stat: 'butch',  descriptions: {flavor: [''], main: [`How much melee combat prowess your character possesses.`]}})},
        {mode: 'ensure', path: 'skills.fitness',      type: 'new_dict', value: utils.system.new.template('skill', {label: 'Fitness',      stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}})},
        {mode: 'ensure', path: 'skills.intuition',    type: 'new_dict', value: utils.system.new.template('skill', {label: 'Intuition',    stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to intuit the motives of another.']}})},
        {mode: 'ensure', path: 'skills.lockpicking',  type: 'new_dict', value: utils.system.new.template('skill', {label: 'Lockpicking',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to open locks without worrying about trivial matters such as possessing the key.']}})},
        {mode: 'ensure', path: 'skills.lying',        type: 'new_dict', value: utils.system.new.template('skill', {label: 'Lying',        stat: 'suave',  descriptions: {flavor: [''], main: ['Your ability to hide information from another.']}})},
        {mode: 'ensure', path: 'skills.observation',  type: 'new_dict', value: utils.system.new.template('skill', {label: 'Observation',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}})},
        {mode: 'ensure', path: 'skills.ranged_skill', type: 'new_dict', value: utils.system.new.template('skill', {label: 'Ranged Skill', stat: 'spry',   descriptions: {flavor: [''], main: [`How much ranged combat prowess your character possesses.`]}})},
        {mode: 'ensure', path: 'skills.tumbling',     type: 'new_dict', value: utils.system.new.template('skill', {label: 'Tumbling',     stat: 'spry',   descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}})},
        {mode: 'ensure', path: 'skills.world_lore',   type: 'new_dict', value: utils.system.new.template('skill', {label: 'World Lore',   stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the history of the world you're in.`]}})},
    ];
    utils.templates.spells = [];
    utils.templates.stats = [
        {mode: 'ensure', path: 'stats.butch',  type: 'new_dict', value: utils.system.new.template('stat', {label: 'Butch'})},
        {mode: 'ensure', path: 'stats.spry',   type: 'new_dict', value: utils.system.new.template('stat', {label: 'Spry'})},
        {mode: 'ensure', path: 'stats.buff',   type: 'new_dict', value: utils.system.new.template('stat', {label: 'Buff'})},
        {mode: 'ensure', path: 'stats.suave',  type: 'new_dict', value: utils.system.new.template('stat', {label: 'Suave'})},
        {mode: 'ensure', path: 'stats.brainy', type: 'new_dict', value: utils.system.new.template('stat', {label: 'Brainy'})},
        {mode: 'ensure', path: 'stats.savvy',  type: 'new_dict', value: utils.system.new.template('stat', {label: 'Savvy'})},
    ];
    utils.templates.entity = [
        {mode: 'ensure', path: 'race',              type: 'string',   value: 'None'},
        {mode: 'ensure', path: 'bloodline',         type: 'string',   value: 'None'},
        {mode: 'ensure', path: 'class',             type: 'string',   value: 'None'},
        {mode: 'ensure', path: 'notes',             type: 'string',   value: ''},
        {mode: 'ensure', path: 'size',              type: 'string',   value: 'Medium'},
        {mode: 'ensure', path: 'currency',          type: 'int',      value: starting_currency},
        {mode: 'ensure', path: 'stat_points',       type: 'int',      value: 0},
        {mode: 'ensure', path: 'ability_points',    type: 'int',      value: 0},
        {mode: 'ensure', path: 'skill_points',      type: 'int',      value: starting_skills},
        {mode: 'ensure', path: 'spell_points',      type: 'int',      value: 0},
        {mode: 'ensure', path: 'treasure_dice',     type: 'int',      value: 1},
        {mode: 'ensure', path: 'loot_target',       type: 'int',      value: 0},
        {mode: 'ensure', path: 'armour_value',      type: 'int',      value: 0},
        {mode: 'ensure', path: 'abilities',         type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'classes',           type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'equipment',         type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'expiry',            type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'inventory',         type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'pools',             type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'skills',            type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'spells',            type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'stats',             type: 'new_dict', value: {}},
        {mode: 'ensure', path: 'triggers',          type: 'new_dict', value: {}},
    ];
    utils.templates.modifiers = [
        {label: 'Add Point', template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'point'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Skill/Stat Point'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            // ADD A SELECT HERE FOR SKILL/STAT
            {mode: 'ensure', path: 'trigger',      type: 'select',    value: 'triggers.once', select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Stat Modifier',  template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'stat'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Stat Modifier'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'stats.butch',     select: 'stats',    action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select',    value: 'triggers.always', select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Skill Modifier', template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'skill'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Skill Modifier'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'skills.animal_ken', select: 'skills',   action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select',    value: 'triggers.always',   select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Add Pool',    template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'pool'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Resource Pool'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'pools.hp', select: 'pools', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Modify Pool',    template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'modify_pool'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'Edit Resource Pool'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'pools.xp', select: 'pools', action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select',    value: 'triggers.always',   select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Increase Pool', template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'pool'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Resource Pool'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'pools.hp', select: 'pools', action: 'add'},
            {mode: 'ensure', path: 'max',          type: 'int',       value: 0},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
        {label: 'Add Ability', template: [
            {mode: 'ensure', path: 'type',         type: 'string',    value: 'ability'},
            {mode: 'ensure', path: 'label',        type: 'string',    value: 'New Ability'},
            {mode: 'ensure', path: 'image',        type: 'string',    value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'new_dict',  value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select',    value: 'anger_management', select: 'abilities', action: 'add'},
            {mode: 'ensure', path: 'requirements', type: 'new_array', value: []},
        ]},
    ];
    let tmp = {
        ability: {
            label:        'Ability',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            use_cost:     {path: 'pools.ap.value', amount: 3},
            target:       {select: 'targets',  default: 'targets.self'},
            trigger:      {select: 'triggers', default: 'triggers.always'},
            expire:       {select: 'triggers', default: 'triggers.always'},
            requirements: [],
            modifiers:    [],
        },
        class: {
            label:        'Class',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            sub_field:    'None',
            level:        1,
            playable:     false,
            allow_variants: false,
            requirements: [],
            modifiers:    [],
        },
        currency: {
            label:        'Currency',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            convert_up:   {coin: 'None', rate: 100},
            convert_down: {coin: 'None', rate: 100},
        },
        entity: {
            race:         'None',
            bloodline:    'None',
            class:        'None',
            notes:        '',
            size:         'Medium',
            currency:     starting_currency,
            stat_points:  0,
            skill_points: starting_skills,
            spell_points: 0,
            teasure_dice: 1,
            loot_target:  6,
            armour_value: 0,
            abilities:    {},
            inventory:    {}
        },
        events: {
            triggers: {
                once: {},
                always: {},
                never: {},
                combat_start: {},
                combat_end: {},
                round_start: {},
                round_end: {},
                turn_start: {},
                turn_end: {},
                on_attack: {},
                on_attack_hit: {},
                on_attack_miss: {},
                on_defend: {},
                on_defend_success: {},
                on_defend_fail: {},
                on_cast: {},
                on_spell_hit: {},
                on_spell_miss: {},
                on_deal_damage: {},
                on_take_damage: {},
                on_avoid_damage: {},
            },
            expiry: {
                once: {},
                always: {},
                never: {},
                combat_start: {},
                combat_end: {},
                round_start: {},
                round_end: {},
                turn_start: {},
                turn_end: {},
                on_attack: {},
                on_attack_hit: {},
                on_attack_miss: {},
                on_defend: {},
                on_defend_success: {},
                on_defend_fail: {},
                on_cast: {},
                on_spell_hit: {},
                on_spell_miss: {},
                on_deal_damage: {},
                on_take_damage: {},
                on_avoid_damage: {},
            },
        },
        item: {
            label:        'Item',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            price:        100,
            requirements: [],
            modifiers:    [],
        },
        point: {
            label:        'Point',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            type:         'point',
            path:         {select: 'points', default: 'skill_points'},
            value:        0,
        },
        pool: {
            label:        'Pool',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            min:          0,
            value:        0,
            max:          0,
            requirements: [],
            modifiers:    [],
        },
        race: {
            label:        'Race',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            sub_field:    'None',
            level:        1,
            playable:     false,
            allow_variants: false,
            requirements: [],
            modifiers:    [],
        },
        skill: {
            label:        'Skill',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            stat:         {select: 'stats', default: 'stats.butch'},
            min:          0,
            value:        0,
            max:          0,
        },
        spell: {
            label:        'Spell',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            use_cost:     {path: 'pools.ap.value', amount: 3},
            target:       {select: 'targets',  default: 'targets.self'},
            expire:       {select: 'triggers', default: 'triggers.round_start'},
            requirements: [],
            modifiers:    [],
        },
        stat: {
            label:        'Stat',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            path:         'stats.test',
            value:        0,
            max:          max_stat,
        },
    };
    tmp.skills = {
        arcane_lore:  utils.system.new.template('skill', {label: 'Arcane Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}}),
        engineering:  utils.system.new.template('skill', {label: 'Engineering',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the strange traps and devices you may encounter.`]}}),
        melee_skill:  utils.system.new.template('skill', {label: 'Melee Skill',  stat: 'butch',  descriptions: {flavor: [''], main: [`How much melee combat prowess your character possesses.`]}}),
        fitness:      utils.system.new.template('skill', {label: 'Fitness',      stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}}),
        lockpicking:  utils.system.new.template('skill', {label: 'Lockpicking',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to open locks without worrying about trivial matters such as possessing the key.']}}),
        nature_lore:  utils.system.new.template('skill', {label: 'Nature Lore',  stat: 'savvy',  descriptions: {flavor: [''], main: [`How much you know about the natural elements of the world you're in.`]}}),
        observation:  utils.system.new.template('skill', {label: 'Observation',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}}),
        ranged_skill: utils.system.new.template('skill', {label: 'Ranged Skill', stat: 'spry',   descriptions: {flavor: [''], main: [`How much ranged combat prowess your character possesses.`]}}),
        tumbling:     utils.system.new.template('skill', {label: 'Tumbling',     stat: 'spry',   descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}}),
    };
    tmp.stats = {
        butch:  utils.system.new.template('stat', {label: 'Butch'}),
        spry:   utils.system.new.template('stat', {label: 'Spry'}),
        buff:   utils.system.new.template('stat', {label: 'Buff'}),
        suave:  utils.system.new.template('stat', {label: 'Suave'}),
        brainy: utils.system.new.template('stat', {label: 'Brainy'}),
        savvy:  utils.system.new.template('stat', {label: 'Savvy'}),
    };
    utils.tmp = tmp;
    return utils.templates;
}

function import_fantasy_system() {
    return {
        abilities:{
            anger_management: utils.system.new.template('ability', {
                label: 'Anger Management',
                descriptions: {
                    main:   ['A Barbarian can channel their inner rage and gains a RAGE pool to track this.', 'RAGE points can be spent on Barbarian class abilities, at level 1 you gain 1 RAGE every time you take damage.'],
                    flavor: [''],
                },
                requirements: [],
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'pools.rage', value: 1, trigger: 'triggers.on_take_damage', label: 'Anger Management', descriptions: {main: [`+1 RAGE`]}}
                ],
                image: ''
            }),
        },
        coins: {
            platinum: utils.system.new.template('currency', {label: 'Platinum', convert: {up: {coin: 'None',                  rate: 100}, down: {coin: 'coins.gold.amount',   rate: 100}}}),
            gold:     utils.system.new.template('currency', {label: 'Gold',     convert: {up: {coin: 'coins.platinum.amount', rate: 100}, down: {coin: 'coins.silver.amount', rate: 100}}}),
            silver:   utils.system.new.template('currency', {label: 'Silver',   convert: {up: {coin: 'coins.gold.amount',     rate: 100}, down: {coin: 'coins.copper.amount', rate: 100}}}),
            copper:   utils.system.new.template('currency', {label: 'Copper',   convert: {up: {coin: 'coins.silver.amount',   rate: 100}, down: {coin: 'None',                rate: 100}}}),
        },
        races: {
            human: utils.system.new.template('race', {
                label:          'Human',
                playable:       true,
                allow_variants: true,
                descriptions:   { 
                    main: [
                        "Humans are the youngest amongst the races, they actually evolved from Apes deep in the worlds misty mountains.",
                        "Versitility is their strength, they are moderately competent in most tasks and their ability to learn new skills quickly can be an early advantage."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'point', label: 'Versatile', path: 'skill_points', value:  2, descriptions: {main: [`+2 Skill Points.`], flavor: [``]}}),
                ],
            }),
            al_geberan: utils.system.new.template('race', {
                label: "Al'Geberan",
                playable: true,
                sub_field: "human",
                allow_variants: false,
                descriptions: {
                    main: [
                        "Al'Gebera is the jewel of the sands, famed for it's many Universities and Colleges of Mathemagic.  It is said their famed sorcerers can unleash infinite power by dividing by the essence of nothing.",
                        "The people of Al'Gebera have thrown themselves into the rigorus persuit of science and are fiercely intelligent.",
                        "This single-minded focus is often mistaken for arrogance and can sometimes lead to them missing the wood for the trees."
                    ],
                    flavor: ['']
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Fierce Intellect', path: 'stats.brainy', value:   1, descriptions: {main: [`+1 Brains`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Naive Culture',    path: 'stats.savvy',  value:  -1, descriptions: {main: [`-1 Savvy`],  flavor: ['']}}),
                ],
            }),
            njord: utils.system.new.template('race', {
                label: "Njord",
                playable: true,
                sub_field: "human",
                allow_variants: false,
                descriptions: {
                    main: [
                        "The Njordic people form a proud warrior tradition, they are the toughest of the human races and their fierce inter clan rivalry is really the only thing stopping them from conquering all the realms of Humanity.",
                        "The clans of the Njord fight constantly, their great houses have longstanding pacts, alliances and grudges going back centuries.",
                        "Each warrior of a clan is expected to fight and die for the glory of their house and this is the only way to join their ancestors in the afterlife."
                    ],
                    flavor: ['']
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Warrior Culture',   path: 'stats.buff', value:     1, descriptions: {main: [`+1 Buff`],  flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Fierce Reputation', path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Savvy`],  flavor: ['']}}),
                ],
            }),
            dwarf: utils.system.new.template('race', {
                label: 'Dwarf',
                playable: true,
                size: 'Small',
                allow_variants: true,
                descriptions: {
                    main: [
                        "Dwarfs were created by the Elves thousands of years ago in the time before the rise of Humans.  The Elves had not intended for the Dwarfs to have the use of magic or in fact even free will but it seems that in the case of the latter at least life found a way.",
                        "There are many types of Dwarf but the most common are Tunnel Dwarfs, because of their inability to naturally use magic the Dwarves had to develop Technomancy."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Dwarven Constitution', path: 'stats.buff',  value:   1, descriptions: {main: [`+1 Buff`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Stout Frame',          path: 'stats.spry',  value:  -1, descriptions: {main: [`-1 Spry`],  flavor: ['']}}),
                    {mode: 'modify', action: 'write', path: 'size',              value: 'Small', label: 'Vertically Challenged', descriptions: {main: [`Small`],   flavor: ['']}},
                ],
            }),
            cave_dwarf: utils.system.new.template('race', {
                label:          'Cave Dwarf',
                playable:       true,
                sub_field:      'dwarf',
                allow_variants: false,
                size:           'Small',
                descriptions: { 
                    main: [
                        "Cave Dwarves are the miners of the dwarven race, these are hardy folk and have a reputation for being hard workers and staunch fighters.",
                        "They live in socialist micro-collectives and are the hardiest and strongest of the Dwarven races.",
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Heavy Metal', path: 'stats.butch',  value:   1, descriptions: {main: [`+1 Butch`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Mean Temper', path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Suave`], flavor: ['']}}),
                ],
            }),
            sky_dwarf: utils.system.new.template('race', {
                label:          'Sky Dwarf',
                sub_field:      'dwarf',
                playable:       true,
                allow_variants: false,
                bonus_feats:    0,
                size:           'Small',
                descriptions: { 
                    main: [
                        "Sky Dwarves are the farmers and hunters of the dwarven race, these are skilled craftsmen and have a reputation for being hard workers and staunch fighters.",
                        "They live in the lands outside the Tunnel Dwarves mountains and trade them food for."
                    ],
                    flavor: [""],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Hunters Cunning', path: 'stats.savvy',  value:   1, descriptions: {main: [`+1 Savvy`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Mean Temper',     path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Suave`],  flavor: ['']}}),
                ],
            }),
            elf: utils.system.new.template('race', {
                label: 'Elf',
                sub_field: 'None',
                playable: true,
                allow_variants: true,
                descriptions: {
                    main: [
                        "Elves are the oldest of the races, they split philosophically five centuries ago into the noble and proud High Elves and the Wise Wood Elves.",
                        "Very skilled with magic all Elves start with additional Mana points.",
                    ],
                    flavor: [],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Elven Grace',  path: 'stats.spry',  value:   1, descriptions: {main: [`+1 Spry`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Slight Frame', path: 'stats.buff',  value:  -1, descriptions: {main: [`-1 Buff`],  flavor: ['']}}),
                ],
            }),
            high_elf: utils.system.new.template('race', {
                label: 'High Elf',
                sub_field: 'elf',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "High Elves take the concept of nobility and grace to etherial levels.  Masters of charm magic and conjuration",
                    ],
                    flavor: [],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Curious Culture', path: 'stats.brainy',  value:   1, descriptions: {main: [`+1 Brainy`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Solemn Nature',   path: 'stats.butch',   value:  -1, descriptions: {main: [`-1 Butch`],  flavor: ['']}}),
                ],
            }),
            wood_elf: utils.system.new.template('race', {
                label: 'Wood Elf',
                sub_field: 'elf',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Wood Elves split from their noble cousins and took to the forests of the world.  They are natural Druids and Rangers",
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Natural Wisdom', path: 'stats.savvy',  value:   1, descriptions: {main: [`+1 Savvy`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Isolationist',   path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Suave`], flavor: ['']}}),
                ],
            }),
            half_blood: utils.system.new.template('race', {
                label: 'Half Blood',
                sub_field: 'None',
                playable: true,
                allow_variants: true,
                stat_bonuses: {},
                descriptions: {
                    main: [
                        "Half Bloods are often outcasts on the fringe of society, never fully accepted and trusted by either community.",
                    ],
                    flavor: ['']
                },
                modifiers: [],
            }),
            half_orc: utils.system.new.template('race', {
                label: 'Half Orc',
                sub_field: 'half_blood',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Half man, half Orc.  Total badass."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Orcish Strength',   path: 'stats.butch',  value:  1, descriptions: {main: [`+1 Butch`],  flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Enhanced Vitality', path: 'stats.buff',   value:  1, descriptions: {main: [`+1 Buff`],   flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Limited Cognition', path: 'stats.brainy', value: -1, descriptions: {main: [`-1 Brainy`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Short Temper',      path: 'stats.suave',  value: -1, descriptions: {main: [`-1 Suave`],  flavor: ['']}}),
                ],
            }),
            half_elf: utils.system.new.template('race', {
                label: 'Half Elf',
                sub_field: 'half_blood',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Half Elf, half whatever.  Feel the love baby."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Elven Grace',  path: 'stats.spry',  value:   1, descriptions: {main: [`+1 Spry`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Slight Frame', path: 'stats.buff',  value:  -1, descriptions: {main: [`-1 Buff`], flavor: ['']}}),
                ],
            }),
            orkin: utils.system.new.template('race', {
                label: 'Orkin',
                sub_field: 'None',
                playable: false,
                allow_variants: true,
                descriptions: { 
                    main: [
                        `Orkin are a fungal race that breed through spores they release during periods of high stress.  This strange reproductive method is the reason dungeons are often filled with Orcs and Goblins.`,
                        `When you engage them in battle they release these spores that will gestate over the next 7 days to become another fully grown Orkin.`,
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Orcin Barbarism', path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Suave`],  flavor: ['']}}),
                ],
            }),
            goblin: utils.system.new.template('race', {
                label: 'Goblin',
                sub_field: 'orkin',
                playable: false,
                allow_variants: false,
                descriptions: { 
                    main: [
                        `Goblins are small, fast and deadly in large numbers.  They prefer to mob their enemies when possible but have no ethical problem with retreating if the fight is not going their way.`,
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Clever Goblin', path: 'stats.savvy',  value:   1, descriptions: {main: [`+1 Savvy`],  flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Weak Goblin',   path: 'stats.brawny', value:  -1, descriptions: {main: [`-1 Brawny`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Puny Goblin',   path: 'stats.buff',   value:  -1, descriptions: {main: [`-1 Buff`],   flavor: ['']}}),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Stunty',    path: 'skills.tumbling',    value:  1, descriptions: {main: [`+1 Tumbling`], flavor: [``]}})),
                ],
            }),
            orc: utils.system.new.template('race', {
                label: 'Orc',
                sub_field: 'orkin',
                playable: false,
                allow_variants: false,
                descriptions: { 
                    main: [
                        `Orcs are big, slow and deadly.  They prefer to wildly attack any non Orkin in sight at even the slightest provocation and will do so to the death.`,
                    ],
                    flavor: [''],
                },
                modifiers: [
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Orcish Strength', path: 'stats.butch',  value:   1, descriptions: {main: [`+1 Butch`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Enhanced Vitality', path: 'stats.buff',  value:  1, descriptions: {main: [`+1 Buff`],  flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Limited Cognition', path: 'stats.brainy',  value:   -1, descriptions: {main: [`-1 Brainy`], flavor: ['']}}),
                    utils.tools.templates.modifiers.convert({type: 'stat', label: 'Short Temper', path: 'stats.suave',  value:  -1, descriptions: {main: [`-1 Suave`],  flavor: ['']}}),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Athletic Build', path: 'skills.fitness',    value:  1, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
        },
        classes: {
            warrior: utils.system.new.template('class', {
                label          : 'Warrior',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main  : ['Warriors are fighters of all kinds from around the world.  From the Barbarians of the Northern Steppes to the '],
                    flavor: [''],
                },
                modifiers      : [],
            }),
            barbarian: utils.system.new.template('class', {
                label          : 'Barbarian',
                sub_field      : 'warrior',
                playable       : true,
                allow_variants : false,
                descriptions   : {
                    main  : [
                        `Barbarians are the personification of pure rage, although don't say that to one's face if you like your jaw being attached`,
                        `A skilled master of this style of fighting is a terrifying opponent on the battlefield and pretty much anywhere else really.  They can channel their rage into powerful damaging attacks and shouts.`
                    ],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('pool', {label: 'RAGE', path: 'pools.rage', min: 0, value:  0, max:   5, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Combat Mastery', path: 'skills.melee_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            ranger: utils.system.new.template('class', {
                label          : 'Ranger',
                sub_field      : 'warrior',
                playable       : true,
                allow_variants : false,
                descriptions   : {
                    main: [
                        'Rangers are master hunters capable of tracking and killing any creature unlucky enough to be their prey.  They focus primarily on archery and trapmaking but let me be clear. Lying in wait for you or chasing you down, they are deadly either way.',
                    ],
                    flavor: [''],
                },
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('pool',  {label: 'FOCUS', path: 'pools.focus', min: 0, value:  0, max:   5, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Hunting Mastery', path: 'skills.ranged_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            monk: utils.system.new.template('class', {
                label          : 'Monk',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main: ['Monks come in all forms, from the Ki weilding masters of the east to the grizzled battle worn Paladin'],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
            eastern_master: utils.system.new.template('class', {
                label          : 'Eastern Master',
                sub_field      : 'monk',
                playable       : true,
                allow_variants : false,
                descriptions   : {
                    main: ['Eastern Masters are the epitome of what a dedicated human can achieve, they spend their lives training in one of their sacred forms.'],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('pool', {label: 'KI', path: 'pools.ki', min: 0, value:  0, max:   5, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Supernatural Speed', path: 'skills.tumbling', value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            rogue: utils.system.new.template('class', {
                label          : 'Rogue',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main  : ['Rogues cover the classes that excel based on the application of seemingly mundane skills to great effect'],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
            mage: utils.system.new.template('class', {
                label          : 'Mage',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main  : ['Mages are spellcasters. Pure and simple.  From the Sorcerers of the Wood Elves to The Wizards of the High Elves.'],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
            sorcerer: utils.system.new.template('class', {
                label          : 'Sorcerer',
                sub_field      : 'mage',
                playable       : true,
                allow_variants : false,
                descriptions   : {
                    main: ['Sorcerers draw their power from an innate ability to weave the fabric of Magic, their power is strange and they are often shunned from smaller villages through fear of their powers.'],
                    flavor: [''],
                },
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('pool', {label: 'MANA', path: 'pools.mana', min: 0, value:  0, max:   5, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Arcane Mastery', path: 'skills.arcane_lore', value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            tribal: utils.system.new.template('class', {
                label          : 'Tribal',
                sub_field      : 'None',
                playable       : false,
                allow_variants : true,
                descriptions   : {
                    main: [''],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
            tribal_warrior: utils.system.new.template('class', {
                label          : 'Tribal Warrior',
                sub_field      : 'tribal',
                playable       : false,
                allow_variants : false,
                descriptions   : {
                    main: [''],
                    flavor: [''],
                },
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'War Party', path: 'skills.melee_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Spotters',  path: 'skills.observation', value:  2, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Stunty',    path: 'skills.tumbling',    value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            tribal_hunter: utils.system.new.template('class', {
                label          : 'Tribal Hunter',
                sub_field      : 'tribal',
                playable       : false,
                allow_variants : false,
                descriptions   : {
                    main: [''],
                    flavor: [''],
                },
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Hunting Party', path: 'skills.ranged_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Spotters',      path: 'skills.observation',  value:  2, descriptions: {main: [``], flavor: [``]}})),
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Stunty',        path: 'skills.tumbling',     value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
            tribal_shaman: utils.system.new.template('class', {
                label          : 'Tribal Shaman',
                sub_field      : 'tribal',
                playable       : false,
                allow_variants : false,
                descriptions   : {
                    main: [''],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [
                    utils.tools.templates.modifiers.convert(utils.system.new.template('skill', {label: 'Tribal Voodoo', path: 'skills.arcane_lore', value:  2, descriptions: {main: [``], flavor: [``]}})),
                ],
            }),
        },
        equipment_types: {
            weapon     : {label: 'Weapon',  path: 'equipment.weapon'},
            armour     : {label: 'Armour',  path: 'equipment.armour'},
            shield     : {label: 'Shield',  path: 'equipment.shield'},
            utility    : {label: 'Utility', path: 'equipment.utility'},
        },
        item_types: {
            potion : {label: 'Potion', path: 'inventory.potions'},
            scroll : {label: 'Scroll', path: 'inventory.scrolls'},
            quest  : {label: 'Quest',  path: 'inventory.quest'},
        },
        pools: {
            xp:   utils.system.new.template('pool', {label: 'XP',    value:  0, max: 100}),
            hp:   utils.system.new.template('pool', {label: 'HP',    value:  0, max:   5}),
            ap:   utils.system.new.template('pool', {label: 'AP',    value:  0, max:  10}),
        },
        points: {
            skill: {label: 'Skill', path: 'skill_points'},
            stat:  {label: 'Stat',  path: 'stat_points'},
        },
        skills: {
            animal_ken:   utils.system.new.template('skill', {label: 'Animal Ken',   stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to train or calm an animal']}}),
            arcane_lore:  utils.system.new.template('skill', {label: 'Arcane Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}}),
            engineering:  utils.system.new.template('skill', {label: 'Engineering',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to do disarm strange traps.']}}),
            melee_skill:  utils.system.new.template('skill', {label: 'Melee Skill',  stat: 'butch',  descriptions: {flavor: [''], main: [`Your ability to hit others in melee combat.`]}}),
            fitness:      utils.system.new.template('skill', {label: 'Fitness',      stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}}),
            intuition:    utils.system.new.template('skill', {label: 'Intuition',    stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to intuit the motives of another.']}}),
            lockpicking:  utils.system.new.template('skill', {label: 'Lockpicking',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to open locks without worrying about trivial matters such as possessing the key.']}}),
            lying:        utils.system.new.template('skill', {label: 'Lying',        stat: 'suave',  descriptions: {flavor: [''], main: ['Your ability to hide information from another.']}}),
            observation:  utils.system.new.template('skill', {label: 'Observation',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}}),
            ranged_skill: utils.system.new.template('skill', {label: 'Ranged Skill', stat: 'spry',   descriptions: {flavor: [''], main: [`Your ability to hit others in ranged combat.`]}}),
            tumbling:     utils.system.new.template('skill', {label: 'Tumbling',     stat: 'spry',   descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}}),
            world_lore:   utils.system.new.template('skill', {label: 'World Lore',   stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the history of the world you're in.`]}})
        },
        spells: {},
        stats: {
            butch:  utils.system.new.template('stat', {label: 'Butch'}),
            spry:   utils.system.new.template('stat', {label: 'Spry'}),
            buff:   utils.system.new.template('stat', {label: 'Buff'}),
            suave:  utils.system.new.template('stat', {label: 'Suave'}),
            brainy: utils.system.new.template('stat', {label: 'Brainy'}),
            savvy:  utils.system.new.template('stat', {label: 'Savvy'}),
        },
        triggers: {
            once:            {label: 'Once',           path: 'triggers.once'},
            always:          {label: 'Always',         path: 'triggers.always'},
            never:           {label: 'Never',          path: 'triggers.never'},
            combat_start:    {label: 'Combat Start',   path: 'triggers.combat_start'},
            combat_end:      {label: 'Combat End',     path: 'triggers.combat_end'},
            round_start:     {label: 'Round Start',    path: 'triggers.round_start'},
            round_end:       {label: 'Round End',      path: 'triggers.round_end'},
            turn_start:      {label: 'Turn Start',     path: 'triggers.turn_start'},
            turn_end:        {label: 'Turn End',       path: 'triggers.turn_end'},
            on_attack:       {label: 'Attack',         path: 'triggers.on_attack'},
            on_attack_hit:   {label: 'Attack Hit',     path: 'triggers.on_attack_hit'},
            on_attack_miss:  {label: 'Attack Miss',    path: 'triggers.on_attack_miss'},
            on_kill:         {label: 'Kill Opponent',  path: 'triggers.on_kill'},
            on_defend:       {label: 'Defend',         path: 'triggers.on_defend'},
            on_defend_win:   {label: 'Defend Success', path: 'triggers.on_defend_win'},
            on_defend_lose:  {label: 'Defend Failure', path: 'triggers.on_defend_lose'},
            on_cast:         {label: 'Cast Spell',     path: 'triggers.on_cast'},
            on_deal_damage:  {label: 'Deal Damage',    path: 'triggers.on_deal_damage'},
            on_take_damage:  {label: 'Take Damage',    path: 'triggers.on_take_damage'},
            on_avoid_damage: {label: 'Avoid Damage',   path: 'triggers.on_avoid_damage'},
        },
        targets: {
            self  : {label: 'Self'},
            ally  : {label: 'Ally'},
            enemy : {label: 'Enemy'},
            area  : {label: 'AoE'},
        },
        weapons: {
            short_sword: utils.system.new.template('weapon', {Label: 'Short Sword', damage: 2, ap_cost: 2, range:  1, cp_cost:  50}),
            Longsword:   utils.system.new.template('weapon', {Label: 'Longsword',   damage: 3, ap_cost: 3, range:  1, cp_cost: 100}),
            greatsword:  utils.system.new.template('weapon', {Label: 'Greatsword',  damage: 4, ap_cost: 4, range:  1, cp_cost: 200}),
            hand_axe:    utils.system.new.template('weapon', {Label: 'Hand Axe',    damage: 2, ap_cost: 3, range:  1, cp_cost:  25}),
            greataxe:    utils.system.new.template('weapon', {Label: 'Greataxe',    damage: 4, ap_cost: 5, range:  1, cp_cost: 100}),
            staff:       utils.system.new.template('weapon', {Label: 'Staff',       damage: 2, ap_cost: 2, range:  2, cp_cost:  50}),
            polearm:     utils.system.new.template('weapon', {Label: 'Polearm',     damage: 3, ap_cost: 4, range:  2, cp_cost: 150}),
            short_bow:   utils.system.new.template('weapon', {Label: 'Short Bow',   damage: 2, ap_cost: 3, range: 10, cp_cost: 100}),
            long_bow:    utils.system.new.template('weapon', {Label: 'Longbow',     damage: 3, ap_cost: 4, range: 20, cp_cost: 200}),
            crossbow:    utils.system.new.template('weapon', {Label: 'Crossbow',    damage: 4, ap_cost: 4, range: 10, cp_cost: 500}),
        },
    };
}