function basic_data() {
    
}

function import_generic_templates() {
    let max_stat = 5
    utils.templates = {
        ability: [
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Ability'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'use_cost',     type: 'dict',   value: {path: 'pools.ap.value', amount: 0}},
            {mode: 'ensure', path: 'target',       type: 'select', value: 'targets.self',    select: 'targets',  action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select', value: 'triggers.always', select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'expire_when',  type: 'select', value: 'triggers.never',  select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'expired',      type: 'bool',   value: false},
            {mode: 'ensure', path: 'requirements', type: 'array',  value: []},
            {mode: 'ensure', path: 'modifiers',    type: 'array',  value: []},
        ],
        class: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Class'},
            {mode: 'ensure', path: 'image',          type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'sub_field',      type: 'string', value: 'None'},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'level',          type: 'int',    value: 0},
            {mode: 'ensure', path: 'playable',       type: 'bool',   value: true},
            {mode: 'ensure', path: 'allow_variants', type: 'bool',   value: false},
            {mode: 'ensure', path: 'requirements',   type: 'array',  value: []},
            {mode: 'ensure', path: 'modifiers',      type: 'array',  value: []},
        ],
        pool: [
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Pool'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'min',          type: 'int',    value: 0},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',    value: max_stat},
            {mode: 'ensure', path: 'requirements', type: 'array',  value: []},
            {mode: 'ensure', path: 'modifiers',    type: 'array',  value: []},
        ],
        race: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Race'},
            {mode: 'ensure', path: 'image',          type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'bloodline',      type: 'string', value: 'None'},
            {mode: 'ensure', path: 'playable',       type: 'bool',   value: false},
            {mode: 'ensure', path: 'allow_variants', type: 'bool',   value: false},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'modifiers',      type: 'array',  value: []},
        ],
        skill: [
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Skill'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'stat' ,        type: 'string', value: 'butch'},
            {mode: 'ensure', path: 'max',          type: 'int',    value: 0},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',    value: max_stat},
        ],
        spell: [],
        stat: [
            {mode: 'ensure', path: 'label', type: 'string', value: 'New Stat'},
            {mode: 'ensure', path: 'image', type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'value', type: 'int',    value: 2},
            {mode: 'ensure', path: 'max',   type: 'int',    value: max_stat},
        ],
        triggers: [
            {mode: 'ensure', path: 'triggers.always',            type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.never',             type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.combat_start',      type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.combat_end',        type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.round_start',       type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.round_end',         type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.turn_start',        type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.turn_end',          type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack',         type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack_hit',     type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_attack_miss',    type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend',         type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend_success', type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_defend_fail',    type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_cast',           type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_deal_damage',    type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_take_damage',    type: 'array', value: {}},
            {mode: 'ensure', path: 'triggers.on_avoid_damage',   type: 'array', value: {}},
        ],
    };
    utils.templates.abilities = [
        {mode: 'ensure',  path: 'triggers.on_take_damage',  type: 'dict', value: {label: 'Anger Management', requirements: [{mode: 'check', action: '>=', path: 'classes.barbarian.level', value: 1}], modifiers: [{mode: 'modify', action: 'add', path: 'pools.rage', value: 1, trigger: 'triggers.on_take_damage'}], image: ''}}
    ];
    utils.templates.pools = [
        {mode: 'ensure', path: 'pools.xp',   type: 'dict', value: utils.system.new.template('pool', {label: 'XP',   value:  0, max: 100})},
        {mode: 'ensure', path: 'pools.hp',   type: 'dict', value: utils.system.new.template('pool', {label: 'HP',   value:  5, max:   5})},
        {mode: 'ensure', path: 'pools.ap',   type: 'dict', value: utils.system.new.template('pool', {label: 'AP',   value: 10, max:  10})},
        {mode: 'ignore', path: 'pools.mana', type: 'dict', value: utils.system.new.template('pool', {label: 'MANA', value:  5, max:   5})},
        {mode: 'ignore', path: 'pools.rage', type: 'dict', value: utils.system.new.template('pool', {label: 'RAGE', value:  0, max:   5})},
    ];
    utils.templates.skills = [
        {mode: 'ensure', path: 'skills.animal_ken',  type: 'dict', value: utils.system.new.template('skill', {label: 'Animal Ken',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to train or calm an animal']}})},
        {mode: 'ensure', path: 'skills.arcane_lore', type: 'dict', value: utils.system.new.template('skill', {label: 'Arcane Lore', stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}})},
        {mode: 'ensure', path: 'skills.fitness',     type: 'dict', value: utils.system.new.template('skill', {label: 'Fitness',     stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}})},
        {mode: 'ensure', path: 'skills.intuition',   type: 'dict', value: utils.system.new.template('skill', {label: 'Intuition',   stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to intuit the motives of another.']}})},
        {mode: 'ensure', path: 'skills.lying',       type: 'dict', value: utils.system.new.template('skill', {label: 'Lying',       stat: 'suave',  descriptions: {flavor: [''], main: ['Your ability to hide information from another.']}})},
        {mode: 'ensure', path: 'skills.observation', type: 'dict', value: utils.system.new.template('skill', {label: 'Observation', stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}})},
        {mode: 'ensure', path: 'skills.tumbling',    type: 'dict', value: utils.system.new.template('skill', {label: 'Tumbling',    stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}})},
        {mode: 'ensure', path: 'skills.world_lore',  type: 'dict', value: utils.system.new.template('skill', {label: 'World Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the history of the world you're in.`]}})},
    ];
    utils.templates.spells = [];
    utils.templates.stats = [
        {mode: 'ensure', path: 'stats.butch',  type: 'dict', value: utils.system.new.template('stat', {label: 'Butch'})},
        {mode: 'ensure', path: 'stats.spry',   type: 'dict', value: utils.system.new.template('stat', {label: 'Spry'})},
        {mode: 'ensure', path: 'stats.buff',   type: 'dict', value: utils.system.new.template('stat', {label: 'Buff'})},
        {mode: 'ensure', path: 'stats.suave',  type: 'dict', value: utils.system.new.template('stat', {label: 'Suave'})},
        {mode: 'ensure', path: 'stats.brainy', type: 'dict', value: utils.system.new.template('stat', {label: 'Brainy'})},
        {mode: 'ensure', path: 'stats.savvy',  type: 'dict', value: utils.system.new.template('stat', {label: 'Savvy'})},
    ];
    utils.templates.entity = [
        {mode: 'ensure', path: 'race',              type: 'string', value: 'None'},
        {mode: 'ensure', path: 'bloodline',         type: 'string', value: 'None'},
        {mode: 'ensure', path: 'stat_points',       type: 'int',    value: 0},
        {mode: 'ensure', path: 'ability_points',    type: 'int',    value: 0},
        {mode: 'ensure', path: 'skill_points',      type: 'int',    value: 0},
        {mode: 'ensure', path: 'spell_points',      type: 'int',    value: 0},
        {mode: 'ensure', path: 'attacks_per_round', type: 'int',    value: 0},
        {mode: 'ensure', path: 'pools',             type: 'dict',   value: {}},
        {mode: 'ensure', path: 'stats',             type: 'dict',   value: {}},
        {mode: 'ensure', path: 'equipment',         type: 'dict',   value: {}},
        {mode: 'ensure', path: 'inventory',         type: 'dict',   value: {}},
        {mode: 'ensure', path: 'skills',            type: 'dict',   value: {}},
        {mode: 'ensure', path: 'triggers',          type: 'dict',   value: {}},
    ];
    utils.templates.modifiers = [
        {label: 'Stat Modifier',  template: [
            {mode: 'ensure', path: 'type',         type: 'string', value: 'stat'},
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Stat Modifier'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select', value: 'stats.butch',     select: 'stats',    action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select', value: 'triggers.always', select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
        ]},
        {label: 'Skill Modifier', template: [
            {mode: 'ensure', path: 'type',         type: 'string', value: 'skill'},
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Skill Modifier'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select', value: 'skills.animal_ken', select: 'skills',   action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select', value: 'triggers.always',   select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
        ]},
        {label: 'Modify Pool',    template: [
            {mode: 'ensure', path: 'type',         type: 'string', value: 'modify_pool'},
            {mode: 'ensure', path: 'label',        type: 'string', value: 'Edit Resource Pool'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select', value: 'pools.xp', select: 'pools', action: 'add'},
            {mode: 'ensure', path: 'trigger',      type: 'select', value: 'triggers.always',   select: 'triggers', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
        ]},
        {label: 'Add Pool',    template: [
            {mode: 'ensure', path: 'type',         type: 'string', value: 'pool'},
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Resource Pool'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select', value: 'pools.hp', select: 'pools', action: 'add'},
            {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
            {mode: 'ensure', path: 'max',          type: 'int',    value: 0},
        ]},
        {label: 'Add Ability', template: [
            {mode: 'ensure', path: 'type',         type: 'string', value: 'ability'},
            {mode: 'ensure', path: 'label',        type: 'string', value: 'New Ability'},
            {mode: 'ensure', path: 'image',        type: 'string', value: 'icons/svg/cowled.svg'},
            {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'path',         type: 'select', value: 'anger_management', select: 'abilities', action: 'add'},
        ]},
    ];
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
                requirements: [
                    {mode: 'check', action: '>=', path: 'classes.barbarian.level', value: 1}
                ],
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'pools.rage', value: 1, trigger: 'triggers.on_take_damage'}
                ],
                image: ''
            }),
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
            }),
            al_geberans: utils.system.new.template('race', {
                label: "Al'Geberans",
                playable: true,
                bloodline: "human",
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
                    {mode: 'modify', action: 'add', path: 'stats.brainy.value', value:  1, label: 'Fierce Intellect',   descriptions: {main: [`+1 Brains`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.savvy.value',  value: -1, label: 'Head in the clouds', descriptions: {main: [`-1 Savvy`],  flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            dwarf: utils.system.new.template('race', {
                label: 'Dwarf',
                playable: true,
                allow_variants: true,
                descriptions: {
                    main: [
                        "Dwarfs were created by the Elves thousands of years ago in the time before the rise of Humans.  The Elves had not intended for the Dwarfs to have the use of magic or in fact even free will but it seems that in the case of the latter at least life found a way.",
                        "There are many types of Dwarf but the most common are Tunnel Dwarfs, because of their inability to naturally use magic the Dwarves had to develop Technomancy."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.buff.value',  value:  1, label: 'Dwarven Constitution', descriptions: {main: [`+1 Buff`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.spry.value',  value: -1, label: 'Stout Frame',          descriptions: {main: [`-1 Spry`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            tunnel_dwarves: utils.system.new.template('race', {
                label:          'Tunnel Dwarf',
                playable:       true,
                bloodline:      'dwarf',
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Tunnel Dwarves are the miners of the dwarven race, these are hardy folk and have a reputation for being hard workers and staunch fighters.",
                        "They live in socialist micro-collectives and are the hardiest and strongest of the Dwarven races.",
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.butch.value',  value:  1, label: '',   descriptions: {main: [`+1 Butch`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.suave.value',  value: -1, label: '',   descriptions: {main: [`-1 Suave`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            outer_dwarves: utils.system.new.template('race', {
                label: 'Outer Dwarf',
                bloodline: 'dwarf',
                playable: true,
                allow_variants: false,
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "Outer Dwarves are the farmers and hunters of the dwarven race, these are skilled craftsmen and have a reputation for being hard workers and staunch fighters.",
                        "They live in the lands outside the Tunnel Dwarves mountains and trade them food for."
                    ],
                    flavor: [""],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.savvy.value',  value:  1, label: '',   descriptions: {main: [`+1 Savvy`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.suave.value',  value: -1, label: '',   descriptions: {main: [`-1 Suave`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            elf: utils.system.new.template('race', {
                label: 'Elf',
                bloodline: 'None',
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
                    {mode: 'modify', action: 'add', path: 'stats.spry.value',  value:  1, label: '',   descriptions: {main: [`+1 Spry`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.buff.value',  value: -1, label: '',   descriptions: {main: [`-1 Buff`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            high_elf: utils.system.new.template('race', {
                label: 'High Elf',
                bloodline: 'elf',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "High Elves take the concept of nobility and grace to etherial levels.  Masters of charm magic and conjuration",
                    ],
                    flavor: [],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.suave.value',  value:  1, label: '',   descriptions: {main: [`+1 Suave`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.butch.value',  value: -1, label: '',   descriptions: {main: [`-1 Butch`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            wood_elf: utils.system.new.template('race', {
                label: 'Wood Elf',
                bloodline: 'elf',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Wood Elves split from their noble cousins and took to the forests of the world.  They are natural Druids and Rangers",
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.savvy.value',  value:  1, label: '',   descriptions: {main: [`+1 Savvy`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.suave.value',  value: -1, label: '',   descriptions: {main: [`-1 Suave`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            half_blood: utils.system.new.template('race', {
                label: 'Half Blood',
                bloodline: 'None',
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
                bloodline: 'half_blood',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Half man, half Orc.  Total badass."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.butch.value',  value:  1, label: '',   descriptions: {main: [`+1 Butch`],  flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.buff.value',   value:  1, label: '',   descriptions: {main: [`+1 Buff`],   flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.brainy.value', value: -1, label: '',   descriptions: {main: [`-1 Brainy`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.suave.value',  value: -1, label: '',   descriptions: {main: [`-1 Suave`],  flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
            half_elf: utils.system.new.template('race', {
                label: 'Half Elf',
                bloodline: 'half_blood',
                playable: true,
                allow_variants: false,
                descriptions: { 
                    main: [
                        "Half Elf, half whatever.  Feel the love baby."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.spry.value',  value:  1, label: '',   descriptions: {main: [`+1 Spry`], flavor: ['']}, trigger: 'triggers.always'},
                    {mode: 'modify', action: 'add', path: 'stats.buff.value',  value: -1, label: '',   descriptions: {main: [`-1 Buff`], flavor: ['']}, trigger: 'triggers.always'},
                ],
            }),
        },
        classes: {
            barbarian: utils.system.new.template('class', {
                label          : 'Barbarian',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main  : [''],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
            paladin: utils.system.new.template('class', {
                label          : 'Paladin',
                playable       : true,
                allow_variants : true,
                descriptions   : {
                    main: [''],
                    flavor: [''],
                },
                requirements   : [],
                modifiers      : [],
            }),
        },
        pools: {
            xp:   utils.system.new.template('pool', {label: 'XP',   value:  0, max: 100}),
            hp:   utils.system.new.template('pool', {label: 'HP',   value:  0, max:   5}),
            ap:   utils.system.new.template('pool', {label: 'AP',   value:  0, max:  10}),
            mana: utils.system.new.template('pool', {label: 'MANA', value:  5, max:   5}),
            rage: utils.system.new.template('pool', {label: 'RAGE', value:  0, max:   5}),
        },
        skills: {
            animal_ken:  utils.system.new.template('skill', {label: 'Animal Ken',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to train or calm an animal']}}),
            arcane_lore: utils.system.new.template('skill', {label: 'Arcane Lore', stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}}),
            fitness:     utils.system.new.template('skill', {label: 'Fitness',     stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}}),
            intuition:   utils.system.new.template('skill', {label: 'Intuition',   stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to intuit the motives of another.']}}),
            lying:       utils.system.new.template('skill', {label: 'Lying',       stat: 'suave',  descriptions: {flavor: [''], main: ['Your ability to hide information from another.']}}),
            observation: utils.system.new.template('skill', {label: 'Observation', stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}}),
            tumbling:    utils.system.new.template('skill', {label: 'Tumbling',    stat: 'butch',  descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}}),
            world_lore:  utils.system.new.template('skill', {label: 'World Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the history of the world you're in.`]}})
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
    };
}