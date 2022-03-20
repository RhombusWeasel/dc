function import_fantasy_system() {
    return {
        ability_points: 5,
        abilities: [
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
                label: 'Hardness',
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
        resources: [
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
    };
}