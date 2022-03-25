function import_generic_templates() {
    let max_stat = 5
    return {
        stats: [
            {mode: 'ensure', path: 'stats.butch', type: 'dict', value: {label: 'Butch', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.spry', type: 'dict', value: {label: 'Spry', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.buff', type: 'dict', value: {label: 'Buff', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.suave', type: 'dict', value: {label: 'Suave', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.brainy', type: 'dict', value: {label: 'Brainy', value: 2, max: max_stat}},
            {mode: 'ensure', path: 'stats.savvy', type: 'dict', value: {label: 'Savvy', value: 2, max: max_stat}},
        ],
        pools: [
            {mode: 'ensure', path: 'pools.hp', type: 'dict', value: {label: 'HP', min: 0, value: 2, max: 5}},
            {mode: 'ensure', path: 'pools.mp', type: 'dict', value: {label: 'MP', min: 0, value: 2, max: 5}},
        ],
        skills: [],
        spells:[],
        entity: [
            {mode: 'ensure', path: 'race', type: 'string', value: 'None'},
            {mode: 'ensure', path: 'bloodline', type: 'string', value: 'None'},
            {mode: 'ensure', path: 'stat_points', type: 'int', value: 0},
            {mode: 'ensure', path: 'ability_points', type: 'int', value: 0},
            {mode: 'ensure', path: 'skill_points', type: 'int', value: 0},
            {mode: 'ensure', path: 'spell_points', type: 'int', value: 0},
            {mode: 'ensure', path: 'pools', type: 'dict', value: {}},
            {mode: 'ensure', path: 'stats', type: 'dict', value: {}},
            {mode: 'ensure', path: 'equipment', type: 'dict', value: {}},
            {mode: 'ensure', path: 'inventory', type: 'dict', value: {}},
            {mode: 'ensure', path: 'skills', type: 'dict', value: {}},
        ],
    };
}

function import_fantasy_system() {
    return {
        race_template: {
            label: '',
            stat_bonuses: {},
            bonus_feats: 0,
            descriptions: {
                main: [],
                flavor: [],
            },
            rules: [
                {label: '', text: '', effects: []},
            ],
            playable: false,
        },
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
                rules: [
                    {label: 'Bonus Feat', text: 'Humans start the game with a feat available to them.'}
                ],
            }),
            al_geberans: utils.system.new.race({
                label: "Al'Geberans",
                playable: true,
                bloodline: "human",
                allow_variants: false,
                stat_bonuses: {
                    int: 1,
                    wis: -1
                },
                descriptions: {
                    main: [
                        "Al'Gebera is the jewel of the sands, famed for it's many Universities and Colleges of Magic",
                        "The people of Al'Gebera have thrown themselves into the rigorus persuit of science and are fiercely intelligent.",
                        "This single-minded focus is often mistaken for arrogance and can sometimes lead to them missing the wood for the trees."
                    ],
                    flavor: ['']
                },
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
                stat_bonuses: {
                    'con': 1,
                    'dex': -1,
                },
            }),
            tunnel_dwarves: utils.system.new.race({
                label:          'Tunnel Dwarf',
                playable:       true,
                bloodline:      'dwarf',
                allow_variants: false,
                stat_bonuses: {
                    'str': 1,
                    'cha': -1,
                },
                descriptions: { 
                    main: [
                        "Tunnel Dwarves are the miners of the dwarven race, these are hardy folk and have a reputation for being hard workers and staunch fighters.",
                        "They live in socialist micro-collectives and are the hardiest and strongest of the Dwarven races.",
                    ],
                    flavor: [''],
                },
            }),
            outer_dwarves: utils.system.new.race({
                label: 'Outer Dwarf',
                bloodline: 'dwarf',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    'wis': 1,
                    'cha': -1,
                },
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "Outer Dwarves are the farmers and hunters of the dwarven race, these are skilled craftsmen and have a reputation for being hard workers and staunch fighters.",
                        "They live in the lands outside the Tunnel Dwarves mountains and trade them food for."
                    ],
                    flavor: [""],
                },
            }),
            elf: utils.system.new.race({
                label: 'Elf',
                bloodline: 'None',
                playable: true,
                allow_variants: true,
                stat_bonuses: {
                    'con': -1,
                    'dex': 1,
                },
                descriptions: {
                    main: [
                        "Elves are the oldest of the races, they split philosophically five centuries ago into the noble and proud High Elves and the Wise Wood Elves.",
                        "Very skilled with magic all Elves start with additional Mana points.",
                    ],
                    flavor: [],
                },
            }),
            high_elf: utils.system.new.race({
                label: 'High Elf',
                bloodline: 'elf',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    'cha': 1,
                    'str': -1,
                },
                descriptions: { 
                    main: [
                        "High Elves take the concept of nobility and grace to etherial levels.  Masters of charm magic and conjuration",
                    ],
                    flavor: [],
                },
                rules: [
                    {label: '', text: '', effects: []},
                ],
            }),
            wood_elf: utils.system.new.race({
                label: 'Wood Elf',
                bloodline: 'elf',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    'wis': 1,
                    'cha': -1,
                },
                descriptions: { 
                    main: [
                        "Wood Elves split from their noble cousins and took to the forests of the world.  They are natural Druids and Rangers",
                    ],
                    flavor: [''],
                },
            }),
            half_blood: utils.system.new.race({
                label: 'Half Blood',
                bloodline: 'None',
                playable: true,
                allow_variants: true,
                descriptions: {
                    main: [
                        "Half Bloods are often outcasts on the fringe of society, never fully accepted and trusted by either community.",
                    ],
                    flavor: ['']
                },
            }),
            half_orc: utils.system.new.race({
                label: 'Half Orc',
                bloodline: 'half_blood',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    'str': 1,
                    'con': 1,
                    'int': -1,
                    'cha': -1,
                },
                descriptions: { 
                    main: [
                        "Half man, half Orc.  Total badass."
                    ],
                    flavor: [''],
                },
            }),
            half_elf: utils.system.new.race({
                label: 'Half Elf',
                bloodline: 'half_bloods',
                playable: true,
                allow_variants: false,
                stat_bonuses: {
                    'con': -1,
                    'dex': 1,
                },
                descriptions: { 
                    main: [
                        "Half Elf, half whatever.  Feel the love baby."
                    ],
                    flavor: [''],
                },
            }),
        },
        templates: {
            stats: [
                {mode: 'ensure', path: 'stats.butch', type: 'dict', value: {label: 'Butch', value: 2}},
                {mode: 'ensure', path: 'stats.spry', type: 'dict', value: {label: 'Spry', value: 2}},
                {mode: 'ensure', path: 'stats.buff', type: 'dict', value: {label: 'Buff', value: 2}},
                {mode: 'ensure', path: 'stats.suave', type: 'dict', value: {label: 'Suave', value: 2}},
                {mode: 'ensure', path: 'stats.brainy', type: 'dict', value: {label: 'Brainy', value: 2}},
                {mode: 'ensure', path: 'stats.savvy', type: 'dict', value: {label: 'Savvy', value: 2}},
            ],
            pools: [],
            skills: [],
            entity: [
                {mode: 'ensure', path: 'race', type: 'string', value: 'None'},
                {mode: 'ensure', path: 'bloodline', type: 'string', value: 'None'},
                {mode: 'ensure', path: 'stat_points', type: 'int', value: 0},
                {mode: 'ensure', path: 'ability_points', type: 'int', value: 0},
                {mode: 'ensure', path: 'skill_points', type: 'int', value: 0},
                {mode: 'ensure', path: 'spell_points', type: 'int', value: 0},
                {mode: 'ensure', path: 'pools', type: 'dict', value: {}},
                {mode: 'ensure', path: 'stats', type: 'dict', value: {}},
                {mode: 'ensure', path: 'equipment', type: 'dict', value: {}},
                {mode: 'ensure', path: 'inventory', type: 'dict', value: {}},
                {mode: 'ensure', path: 'skills', type: 'dict', value: {}},
            ],
        },
    };
}