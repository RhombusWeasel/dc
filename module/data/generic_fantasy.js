function import_fantasy_system() {
    return {
        races: {
            human: {
                label: 'Human',
                stat_bonuses: {},
                bonus_feats: 1,
                descriptions: { 
                    main: [
                        "We humans are the youngest amongst the races.",
                        "That's how it always goes in these stories isn't it? As if we're the pinnacle of some fantasy evolutionary tree when the bloody Elves can live forever.",
                        "We don't live long, often rutting like horny teenagers to make up for it so we're always needing to build new cities.",
                        "Apparently all of this means we are completely average at everything and our tendancy to specialize means we get an extra feat.",
                    ],
                    rules: [
                        {label: 'Bonus Feat', text: 'Humans start the game with a feat available to them.'}
                    ],
                },
                playable: true,
            },
            dwarf: {
                label: 'Dwarf',
                stat_bonuses: {
                    'con': 1,
                    'wis': 1,
                    'dex': -1,
                    'cha': -1,
                },
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "Who you callin' short pal? Talk down to me again and I'll force feed you your feckin' kneecaps ye ken?",
                        "We dwarfs are a proud and passionate people, short in stature and temper. That's right, I can say it, it's you that cannae alright?  We were engineered you know! *Quaffs horn of ale* Aye, thas' right, the High Elves feckin made the first of us using their poxy magicks!  With a K no less!",
                        "They bred us durable and stout to work their Mythril mines and d'you know what I think? *leans in* Come here lad *grabs poor orphan* I think those arrogant pricks thought we'd be GRATEFUL!",
                    ],
                    rules: [
                        ['Bonus Feat', 'Humans start the game with a feat available to them.']
                    ],
                },
                playable: true,
            },
            high_elf: {
                label: 'High Elf',
                stat_bonuses: {
                    'dex': 1,
                    'int': 1,
                    'con': -1,
                    'str': -1,
                },
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "",
                        "",
                        "",
                        "",
                    ],
                    rules: [
                        ['Bonus Feat', 'Humans start the game with a feat available to them.']
                    ],
                },
                playable: true,
            },
            wood_elf: {
                label: 'Wood Elf',
                stat_bonuses: {
                    'dex': 1,
                    'wis': 1,
                    'con': -1,
                    'str': -1,
                },
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "",
                        "",
                        "",
                    ],
                    rules: [
                        ['Bonus Feat', 'Humans start the game with a feat available to them.']
                    ],
                },
                playable: true,
            },
            half_orc: {
                label: 'Half Orc',
                stat_bonuses: {
                    'str': 1,
                    'con': 1,
                    'int': -1,
                    'cha': -1,
                },
                bonus_feats: 0,
                descriptions: { 
                    main: [
                        "",
                        "",
                        "",
                    ],
                    rules: [
                        ['Bonus Feat', 'Humans start the game with a feat available to them.']
                    ],
                },
                playable: true,
            },
        },
        entity: {
            race: 'None',
            stat_points: 5,
            feat_points: 0,
            spell_points: 0,
            stats: [
                {
                    label: 'Smashing',
                    key: 'str',
                    value: 2,
                    max: 5
                },
                {
                    label: 'Dodging',
                    key: 'dex',
                    value: 2,
                    max: 5
                },
                {
                    label: 'Flexing',
                    key: 'con',
                    value: 2,
                    max: 5
                },
                {
                    label: 'Brains',
                    key: 'int',
                    value: 2,
                    max: 5
                },
                {
                    label: 'Charm',
                    key: 'cha',
                    value: 2,
                    max: 5
                },
                {
                    label: 'Savvy',
                    key: 'wis',
                    value: 2,
                    max: 5
                },
            ],
            pools: [
                {
                    label: 'HP',
                    key: 'hp',
                    value: 'calculated',
                    formula: '5 + con',
                },
                {
                    label: 'MP',
                    key: 'mp',
                    value: 'calculated',
                    formula: '5 + int + wis',
                },
            ],
            skills: [],
        },
    };
}