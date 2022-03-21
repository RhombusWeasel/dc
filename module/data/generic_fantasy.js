function import_fantasy_system() {
    return {
        races: {
            human: {
                label: 'Human',
                stat_bonuses: {},
                bonus_feats: 1,
                descriptions: { 
                    main: [
                        "Humans are the youngest amongst the races, they actually evolved from Apes deep in the worlds misty mountains.",
                        "Versitility is their strength, they are moderately competent in most tasks and their ability to learn new skills quickly can be an early advantage."
                    ],
                    rules: [
                        {label: 'Bonus Feat', text: 'Humans start the game with a feat available to them.'}
                    ],
                },
                playable: true,
            },
            dwarf: {
                label: 'Dwarf',
                playable: true,
                descriptions: {
                    main: [
                        "Dwarfs were created by the Elves thousands of years ago in the time before the rise of Humans.  The Elves had not intended for the Dwarfs to have the use of magic or in fact even free will but it seems that in the case of the latter at least life found a way.",
                        "There are many types of Dwarf but the most common are Tunnel Dwarfs, because of their inability to naturally use magic the Dwarves had to develop Technomancy."
                    ],
                },
                variants: {
                    tunnel_dwarves: {
                        label: 'Tunnel Dwarf',
                        stat_bonuses: {
                            'str': 1,
                            'con': 1,
                            'dex': -1,
                            'cha': -1,
                        },
                        bonus_feats: 0,
                        descriptions: { 
                            main: [
                                "Tunnel Dwarves are the miners of the dwarven race, these are hardy folk and have a reputation for being hard workers and staunch fighters.",
                                "They live in socialist micro-collectives and are the hardiest and strongest of the Dwarven races.",
                            ],
                            flavor: [
                                "Who you callin' short pal? Talk down to me again and I'll force feed you your feckin' kneecaps ye ken?",
                                "We dwarves are a proud and passionate people, short in stature and temper. That's right, I can say it, it's you that cannae alright?  We were engineered you know! *Quaffs horn of ale* Aye, thas' right, the High Elves feckin made the first of us using their poxy magicks!  With a K no less!",
                                "They bred us durable and stout to work their Mythril mines and d'you know what I think? *leans in* Come here lad *grabs poor orphan* I think those arrogant pricks thought we'd be GRATEFUL!",
                            ],
                            rules: [
                                ['Darkvision', 'Tunnel Dwarves raised in the underground have darkvision for 30ft']
                            ],
                        },
                        playable: true,
                    },
                    outer_dwarves: {
                        label: 'Outer Dwarf',
                        stat_bonuses: {
                            'int': 1,
                            'wis': 1,
                            'dex': -1,
                            'cha': -1,
                        },
                        bonus_feats: 0,
                        descriptions: { 
                            main: [
                                "Outer Dwarves are the farmers and hunters of the dwarven race, these are skilled craftsmen and have a reputation for being hard workers and staunch fighters.",
                                "They live in the lands outside the Tunnel Dwarves mountains and trade them food for."
                            ],
                            flavor: ["",],
                            rules: [
                                ['Bonus Feat', 'Humans start the game with a feat available to them.']
                            ],
                        },
                        playable: true,
                    },
                },
            },
            elf: {
                label: 'Elf',
                playable: true,
                descriptions: {
                    main: [
                        "Elves are the oldest of the races, they split philosophically five centuries ago into the noble and proud High Elves and the Wise Wood Elves.",
                        "Very skilled with magic all Elves start with additional Mana points.",
                    ],
                },
                variants: {
                    high_elf: {
                        label: 'High Elf',
                        stat_bonuses: {
                            'dex': 1,
                            'cha': 1,
                            'con': -1,
                            'str': -1,
                        },
                        bonus_feats: 0,
                        descriptions: { 
                            main: [
                                "High Elves take the concept of nobility and grace to etherial levels.  Masters of charm magic and conjuration",
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
                                "Wood Elves split from their noble cousins and took to the forests of the world.  They are natural Druids and Rangers",
                            ],
                            rules: [
                                ['Bonus Feat', 'Humans start the game with a feat available to them.']
                            ],
                        },
                        playable: true,
                    },
                },
            },
            half_bloods: {
                label: 'Half Bloods',
                playable: true,
                descriptions: {
                    main: [
                        "Half Bloods are often outcasts on the fringe of society, never fully accepted and trusted by either community.",
                    ],
                },
                variants: {
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
                                "Half man, half Orc.  Total badass."
                            ],
                            rules: [
                                ['Bonus Feat', 'Humans start the game with a feat available to them.']
                            ],
                        },
                        playable: true,
                    },
                },
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