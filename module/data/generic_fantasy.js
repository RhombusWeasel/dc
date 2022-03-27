function basic_data() {

}

function import_generic_templates() {
    let max_stat = 5
    return {
        stats: [
            {mode: 'ensure', path: 'stats.butch',  type: 'dict', value: {label: 'Butch',  value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.spry',   type: 'dict', value: {label: 'Spry',   value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.buff',   type: 'dict', value: {label: 'Buff',   value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.suave',  type: 'dict', value: {label: 'Suave',  value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.brainy', type: 'dict', value: {label: 'Brainy', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.savvy',  type: 'dict', value: {label: 'Savvy',  value: 2, max: max_stat}},
        ],
        pools: [
            {mode: 'ensure', path: 'pools.xp', type: 'dict', value: {label: 'XP', min: 0, value: 0, max: 100}},
            {mode: 'ensure', path: 'pools.hp', type: 'dict', value: {label: 'HP', min: 0, value: 5, max: 5}},
            {mode: 'ensure', path: 'pools.mp', type: 'dict', value: {label: 'MP', min: 0, value: 5, max: 5}},
        ],
        skills: [],
        spells: [],
        entity: [
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
        ],
        race: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Race'},
            {mode: 'ensure', path: 'bloodline',      type: 'string', value: 'None'},
            {mode: 'ensure', path: 'playable',       type: 'bool',   value: false},
            {mode: 'ensure', path: 'allow_variants', type: 'bool',   value: false},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'modifiers',      type: 'array',  value: []},
        ],
        class: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Class'},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'requirements',   type: 'array',  value: []},
            {mode: 'ensure', path: 'modifiers',      type: 'array',  value: []},
        ],
        ability: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Ability'},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'ap_cost',        type: 'int',    value: 1},
            {mode: 'ensure', path: 'use_cost',       type: 'dict',   value: {path: 'pools.ap.value', amount: 0}},
            {mode: 'ensure', path: 'active_when',    type: 'string', value: 'always'},
            {mode: 'ensure', path: 'expire_when',    type: 'string', value: 'never'},
            {mode: 'ensure', path: 'expired',        type: 'bool',   value: false},
            {mode: 'ensure', path: 'requirements',   type: 'array',  value: []},
            {mode: 'ensure', path: 'modifiers',      type: 'array',  value: []},
        ],
        skill: [
            {mode: 'ensure', path: 'label',          type: 'string', value: 'New Skill'},
            {mode: 'ensure', path: 'descriptions',   type: 'dict',   value: {main: [''], flavor: ['']}},
            {mode: 'ensure', path: 'stat' ,          type: 'string', value: 'butch'},
            {mode: 'ensure', path: 'level',          type: 'int',    value: 0},
        ],
        modifiers: [
            {label: 'Stat Modifier',  template: [
                {mode: 'ensure', path: 'mode',         type: 'string', value: 'modify', lock: true},
                {mode: 'ensure', path: 'action',       type: 'string', value: 'add'},
                {mode: 'ensure', path: 'path',         type: 'string', value: 'stats.butch'},
                {mode: 'ensure', path: 'label',        type: 'string', value: 'New Stat Mod'},
                {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
                {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
            ]},
            {label: 'Skill Modifier', template: [
                {mode: 'ensure', path: 'mode',         type: 'string', value: 'modify', lock: true},
                {mode: 'ensure', path: 'action',       type: 'string', value: 'add'},
                {mode: 'ensure', path: 'path',         type: 'string', value: 'skills.observation'},
                {mode: 'ensure', path: 'label',        type: 'string', value: 'New Skill Mod'},
                {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
                {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
            ]},
            {label: 'Create Pool',    template: [
                {mode: 'ensure', path: 'mode',         type: 'string', value: 'ensure', lock: true},
                {mode: 'ensure', path: 'path',         type: 'string', value: 'skills.observation'},
                {mode: 'ensure', path: 'label',        type: 'string', value: 'New Resource Pool'},
                {mode: 'ensure', path: 'descriptions', type: 'dict',   value: {main: [''], flavor: ['']}},
                {mode: 'ensure', path: 'min',          type: 'int',    value: 0},
                {mode: 'ensure', path: 'value',        type: 'int',    value: 0},
                {mode: 'ensure', path: 'max',          type: 'int',    value: 0},
            ]},
        ],
    };
}

function import_fantasy_system() {
    return {
        races: {
            human: utils.system.new.race({
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
            al_geberans: utils.system.new.race({
                label: "Al'Geberans",
                playable: true,
                bloodline: "human",
                allow_variants: false,
                stat_bonuses: {
                    brainy: 1,
                    savvy: -1
                },
                descriptions: {
                    main: [
                        "Al'Gebera is the jewel of the sands, famed for it's many Universities and Colleges of Mathemagic.  It is said their famed sorcerers can unleash infinite power by dividing by the essence of nothing.",
                        "The people of Al'Gebera have thrown themselves into the rigorus persuit of science and are fiercely intelligent.",
                        "This single-minded focus is often mistaken for arrogance and can sometimes lead to them missing the wood for the trees."
                    ],
                    flavor: ['']
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.brainy', value:  1, label: 'Fierce Intellect',   description: `+1 Brains`},
                    {mode: 'modify', action: 'add', path: 'stats.savvy',  value: -1, label: 'Head in the clouds', description: `-1 Savvy`},
                ],
            }),
            dwarf: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.buff',  value:  1, label: 'Dwarven Constitution', description: `+1 Buff`},
                    {mode: 'modify', action: 'add', path: 'stats.spry',  value: -1, label: 'Stout Frame',          description: `-1 Spry`},
                ],
            }),
            tunnel_dwarves: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.butch',  value:  1, label: '',   description: `+1 Butch`},
                    {mode: 'modify', action: 'add', path: 'stats.suave',  value: -1, label: '',   description: `-1 Suave`},
                ],
            }),
            outer_dwarves: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.savvy',  value:  1, label: '',   description: `+1 Savvy`},
                    {mode: 'modify', action: 'add', path: 'stats.suave',  value: -1, label: '',   description: `-1 Suave`},
                ],
            }),
            elf: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.spry',  value:  1, label: '',   description: `+1 Spry`},
                    {mode: 'modify', action: 'add', path: 'stats.buff',  value: -1, label: '',   description: `-1 Buff`},
                ],
            }),
            high_elf: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.suave',  value:  1, label: '',   description: `+1 Suave`},
                    {mode: 'modify', action: 'add', path: 'stats.butch',  value: -1, label: '',   description: `-1 Butch`},
                ],
            }),
            wood_elf: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.savvy',  value:  1, label: '',   description: `+1 Savvy`},
                    {mode: 'modify', action: 'add', path: 'stats.suave',  value: -1, label: '',   description: `-1 Suave`},
                ],
            }),
            half_blood: utils.system.new.race({
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
            half_orc: utils.system.new.race({
                label: 'Half Orc',
                bloodline: 'half_blood',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    butch:   1,
                    buff:    1,
                    brainy: -1,
                    suave:  -1,
                },
                descriptions: { 
                    main: [
                        "Half man, half Orc.  Total badass."
                    ],
                    flavor: [''],
                },
                modifiers: [
                    {mode: 'modify', action: 'add', path: 'stats.butch',  value:  1, label: '',   description: `+1 Butch`},
                    {mode: 'modify', action: 'add', path: 'stats.buff',   value:  1, label: '',   description: `+1 Buff`},
                    {mode: 'modify', action: 'add', path: 'stats.brainy', value: -1, label: '',   description: `-1 Brainy`},
                    {mode: 'modify', action: 'add', path: 'stats.suave',  value: -1, label: '',   description: `-1 Suave`},
                ],
            }),
            half_elf: utils.system.new.race({
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
                    {mode: 'modify', action: 'add', path: 'stats.spry',  value:  1, label: '',   description: `+1 Spry`},
                    {mode: 'modify', action: 'add', path: 'stats.buff',  value: -1, label: '',   description: `-1 Buff`},
                ],
            }),
        },
        classes: {},
        skills: {},
        spells: {},
    };
}