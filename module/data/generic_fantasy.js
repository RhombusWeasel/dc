function import_fantasy_system() {
    return {
        races: {
            human: {
                label: 'Human',
                stat_bonuses: {},
                bonus_feats: 1,
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
                label: 'Elf',
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
            race: 'Unset',
            stat_points: 5,
            stats: [
                {
                    label: 'Smashing',
                    key: 'str',
                    value: 1,
                    max: 5
                },
                {
                    label: 'Dodging',
                    key: 'dex',
                    value: 1,
                    max: 5
                },
                {
                    label: 'Flexing',
                    key: 'con',
                    value: 1,
                    max: 5
                },
                {
                    label: 'Brains',
                    key: 'int',
                    value: 1,
                    max: 5
                },
                {
                    label: 'Charm',
                    key: 'cha',
                    value: 1,
                    max: 5
                },
                {
                    label: 'Savvy',
                    key: 'wis',
                    value: 1,
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