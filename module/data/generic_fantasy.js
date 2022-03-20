function import_fantasy_system() {
    return {
        races: {
            human: {
                label: 'Human',
                stat_bonuses: {},
                bonus_feats: 1,
                descriptions: { 
                    main: [
                        `Humans are young amongst the other races, that's how it always goes isn't it?`
                        `They don't live long, often rutting like horny teenagers to make up for it so they're always needing to build new cities.`,
                        `Apparently all of this means they are somehow more able to dedicate their short lives to honing one set of skills well`
                    ],
                    rules: [
                        ['Bonus Feat', 'Humans start the game with a feat available to them.']
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