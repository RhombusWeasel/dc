let starting_skills = 3;
let starting_currency = 200;
let max_stat = 5;

function import_fantasy_system() {
    utils.game_data = {
        ability_tmp: {
            label:        'Ability',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            use_cost:     {path: 'pools.ap.value', amount: 3},
            target:       {path: 'target',  select: 'targets',  default: 'targets.self'},
            trigger:      {path: 'trigger', select: 'triggers', default: 'triggers.once'},
            expire:       {path: 'expire',  select: 'expires',  default: 'triggers.once'},
            requirements: [],
            modifiers:    [],
        },
        armour_tmp: {
            label:        'Armour',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            cp_cost:      150,
            armour_value:   1,
            temp_hp:        2,
            requirements: [],
            modifiers:    [],
        },
        class_tmp: {
            label:          'Class',
            image:          'icons/svg/cowled.svg',
            descriptions:   {main: [``], flavor: [``]},
            sub_field:      'None',
            playable:       false,
            allow_variants: false,
            active:         false,
            requirements:   [],
            modifiers:      [],
        },
        currency_tmp: {
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
            teasure_dice: 1,
            loot_target:  6,
            armour_value: 0,
            points:       {},
            stats:        {},
            pools:        {},
            abilities:    {},
            equipment:    {},
            inventory:    {},
            skills:       {},
            spells:       {},
            triggers:     {},
            expiry:       {},
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
            path:         {path: 'path', select: 'points', default: 'skill_points'},
            value:        0,
        },
        pool_tmp: {
            label:        'Pool',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            min:          0,
            value:        0,
            max:          0,
            active:       false,
            requirements: [],
            modifiers:    [],
        },
        potion_tmp: {
            label:        'Potion',
            cp_cost:      50,
            descriptions: {main: [``], flavor: [``]},
            modifiers:    [],
        },
        race_tmp: {
            label:        'Race',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            sub_field:    'None',
            playable:     false,
            allow_variants: false,
            requirements: [],
            modifiers:    [],
        },
        skill_tmp: {
            label:        'Skill',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            stat:         {path: 'stats', select: 'stats', default: 'stats.butch'},
            min:          0,
            value:        0,
            max:          max_stat,
        },
        spell_tmp: {
            label:        'Spell',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            sp_cost:      1,
            mp_cost:      2,
            target:       {path: 'target', select: 'targets',  default: 'targets.self'},
            expire:       {path: 'expire', select: 'triggers', default: 'triggers.round_start'},
            active:       false,
            requirements: [],
            modifiers:    [],
        },
        stat_tmp: {
            label:          'Stat',
            image:          'icons/svg/cowled.svg',
            descriptions:   {main: [``], flavor: [``]},
            path:           'stats.test',
            value:          2,
            max:            max_stat,
            hide_modifiers: true,
        },
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
        utility_tmp: {
            label:            'Wooden Shield',
            image:            'icons/svg/cowled.svg',
            descriptions:     {main: [``], flavor: [``]},
            cp_cost:          50,
            can_block_ranged: false,
            emits_light:      false,
            light:            {dim: 0, bright: 0, angle: 360},
        },
        weapon_tmp: {
            label:        'Weapon',
            image:        'icons/svg/cowled.svg',
            descriptions: {main: [``], flavor: [``]},
            damage:         2,
            ap_cost:        3,
            range:          1,
            cp_cost:      100,
            hands:          1,
            skill:        'melee_skill',
            requirements: [],
            modifiers:    [],
        },
    };

    utils.game_data.modifiers = {
        point: {
            type:         'point',
            label:        'Add Point',
            image:        'icons/svg/cowled.svg',
            path:         {path: 'path', select: 'points', default: 'skill_point'},
            value:        2,
            descriptions: {main: [`For adding skill points, stat points, ability points and spell points.`], flavor: [``]}
        },
        stat: {
            type:         'stat',
            label:        'Stat Point',
            path:         {path: 'path',    select: 'stats',    default: 'stats.butch'},
            trigger:      {path: 'trigger', select: 'triggers', default: 'triggers.once'},
            value:        1,
            descriptions: {main: [`Buffs a specific stat.`], flavor: ['']},
        },
        skill: {
            type:         'skill',
            label:        'Skill Point',
            path:         {path: 'path',    select: 'skills',   default: 'skills.animal_ken'},
            trigger:      {path: 'trigger', select: 'triggers', default: 'triggers.once'},
            value:        2,
            descriptions: {main: [`Buffs a specific skill`], flavor: [``]},
        },
        add_pool: {
            type:         'activate_pool',
            label:        'Add Pool',
            path:         {path: 'path', select: 'pools', default: 'pools.rage'},
            trigger:      'triggers.once',
            value:        true,
            descriptions: {main: [`Adds a pool to a character`], flavor: [``]}
        },
        modify_pool: {
            type:         'modify_pool',
            label:        'Modify Pool',
            path:         {path: 'path', select: 'pools', default: 'pools.rage'},
            trigger:      {path: 'trigger', select: 'triggers', default: 'triggers.once'},
            value:        2,
            descriptions: {main: [`Modifies the value of a pool on a given trigger`], flavor: [``]}
        },
        increase_pool: {
            type:         'increase_pool',
            label:        'Increase Pool',
            path:         {path: 'path',    select: 'pools',    default: 'pools.hp'},
            trigger:      {path: 'trigger', select: 'triggers', default: 'triggers.once'},
            value:        2,
            descriptions: {main: [`Modifies the maximum value of a pool on a given trigger`], flavor: [``]}
        },
    };

    utils.game_data.abilities = {
        anger_management: utils.system.clone('ability_tmp', {
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
    };
    utils.game_data.armour = {
        leather:    utils.system.clone('armour_tmp', {label: 'Leather',    cp_cost:  150, armour_value: 1, temp_hp:  2}),
        chainmail:  utils.system.clone('armour_tmp', {label: 'Chainmail',  cp_cost:  400, armour_value: 2, temp_hp:  4}),
        scalemail:  utils.system.clone('armour_tmp', {label: 'Scalemail',  cp_cost: 1000, armour_value: 3, temp_hp:  6}),
        half_plate: utils.system.clone('armour_tmp', {label: 'Half Plate', cp_cost: 2500, armour_value: 4, temp_hp:  8}),
        full_plate: utils.system.clone('armour_tmp', {label: 'Full Plate', cp_cost: 6000, armour_value: 5, temp_hp: 10}),
    };
    utils.game_data.classes = {
        warrior: utils.system.clone('class_tmp', {
            label          : 'Warrior',
            playable       : true,
            allow_variants : true,
            descriptions   : {
                main  : ['Warriors are fighters of all kinds from around the world.  From the Barbarians of the Northern Steppes to the '],
                flavor: [''],
            },
            modifiers      : [],
        }),
        barbarian: utils.system.clone('class_tmp', {
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
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.add_pool',    {path: 'pools.rage',         label: 'Focussed Rage',    trigger: 'triggers.once',           value: true, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.modify_pool', {path: 'pools.rage',         label: 'STOP HITTING ME!', trigger: 'triggers.on_take_damage', value:    1, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.skill',       {path: 'skills.melee_skill', label: 'Combat Mastery',   trigger: 'triggers.once',           value:    2, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
        ranger: utils.system.clone('class_tmp', {
            label          : 'Ranger',
            sub_field      : 'rogue',
            playable       : true,
            allow_variants : false,
            descriptions   : {
                main: [
                    'Rangers are master hunters capable of tracking and killing any creature unlucky enough to be their prey.  They focus primarily on archery and trapmaking but let me be clear. Lying in wait for you or chasing you down, they are deadly either way.',
                ],
                flavor: [''],
            },
            modifiers      : [
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.add_pool',    {path: 'pools.focus',         label: 'Focussed Rage',    trigger: 'triggers.once',             value: true, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.modify_pool', {path: 'pools.focus',         label: 'Concentration',    trigger: 'triggers.on_skill_succeed', value:    1, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.skill',       {path: 'skills.ranged_skill', label: 'Hunting Mastery',  trigger: 'triggers.once',             value:    2, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
        monk: utils.system.clone('class_tmp', {
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
        eastern_master: utils.system.clone('class_tmp', {
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
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.add_pool',    {path: 'pools.ki',        label: 'Channel Ki',      trigger: 'triggers.once',            value: true, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.modify_pool', {path: 'pools.ki',        label: 'Flow State',      trigger: 'triggers.on_avoid_damage', value:    1, descriptions: {main: [`+1 KI per successful Dodge.`], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.skill',       {path: 'skills.tumbling', label: 'Temple Training', trigger: 'triggers.once',            value:    2, descriptions: {main: [`+2 Tumbling skill`], flavor: [``]}})),
            ],
        }),
        rogue: utils.system.clone('class_tmp', {
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
        mage: utils.system.clone('class_tmp', {
            label          : 'Mage',
            playable       : true,
            allow_variants : true,
            descriptions   : {
                main  : ['Mages are spellcasters. Pure and simple.  From the Sorcerers of the Wood Elves to The Wizards of the High Elves.'],
                flavor: [''],
            },
            requirements   : [],
            modifiers      : [
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.add_pool', {path: 'pools.mana', label: 'Channel Mana', trigger: 'triggers.once', value: true, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
        sorcerer: utils.system.clone('class_tmp', {
            label          : 'Sorcerer',
            sub_field      : 'mage',
            playable       : true,
            allow_variants : false,
            descriptions   : {
                main: ['Sorcerers draw their power from an innate ability to weave the fabric of Magic, their power is strange and they are often shunned from smaller villages through fear of their powers.'],
                flavor: [''],
            },
            modifiers      : [
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.modify_pool', {path: 'pools.mana',         label: 'Mana Channelling', trigger: 'triggers.round_start', value: 1, descriptions: {main: [`+1 Mana per round.`], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.skill',       {path: 'skills.arcane_lore', label: 'College Training', trigger: 'triggers.once',        value: 2, descriptions: {main: [`+2 Arcane Lore skill`], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('modifiers.point',       {path: 'points.spell.value', label: 'Arcane Study',     trigger: 'triggers.once',        value: 3, descriptions: {main: [`3 Spell Points`], flavor: [``]}})),
            ],
        }),
        tribal: utils.system.clone('class_tmp', {
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
        tribal_warrior: utils.system.clone('class_tmp', {
            label          : 'Tribal Warrior',
            sub_field      : 'tribal',
            playable       : false,
            allow_variants : false,
            descriptions   : {
                main: [''],
                flavor: [''],
            },
            modifiers      : [
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'War Party', path: 'skills.melee_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Spotters',  path: 'skills.observation', value:  2, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Stunty',    path: 'skills.tumbling',    value:  2, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
        tribal_hunter: utils.system.clone('class_tmp', {
            label          : 'Tribal Hunter',
            sub_field      : 'tribal',
            playable       : false,
            allow_variants : false,
            descriptions   : {
                main: [''],
                flavor: [''],
            },
            modifiers      : [
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Hunting Party', path: 'skills.ranged_skill', value:  2, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Spotters',      path: 'skills.observation',  value:  2, descriptions: {main: [``], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Stunty',        path: 'skills.tumbling',     value:  2, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
        tribal_shaman: utils.system.clone('class_tmp', {
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
                utils.tools.templates.modifiers.convert({type: 'point', label: 'Arcane Background', path: 'spell_points', value:   3, descriptions: {main: [`+3 Spell Points`], flavor: ['']}}),
                utils.tools.templates.modifiers.convert(utils.system.clone('pool_tmp', {label: 'Mana Pool', path: 'pools.mana', min: 0, value:  0, max:   5, descriptions: {main: [`Mages can access a Mana pool to cast their spells`], flavor: [``]}})),
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Tribal Voodoo', path: 'skills.arcane_lore', value:  2, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
    };
    utils.game_data.coins = {
        platinum: utils.system.clone('currency_tmp', {label: 'Platinum', convert: {up: {coin: 'None',                  rate: 100}, down: {coin: 'coins.gold.amount',   rate: 100}}}),
        gold:     utils.system.clone('currency_tmp', {label: 'Gold',     convert: {up: {coin: 'coins.platinum.amount', rate: 100}, down: {coin: 'coins.silver.amount', rate: 100}}}),
        silver:   utils.system.clone('currency_tmp', {label: 'Silver',   convert: {up: {coin: 'coins.gold.amount',     rate: 100}, down: {coin: 'coins.copper.amount', rate: 100}}}),
        copper:   utils.system.clone('currency_tmp', {label: 'Copper',   convert: {up: {coin: 'coins.silver.amount',   rate: 100}, down: {coin: 'None',                rate: 100}}}),
    };
    utils.game_data.equipment = {
        weapon:  'None',
        armour:  'None',
        utility: 'None'
    };
    utils.game_data.equipment_types = {
        weapon     : {label: 'Weapon',  path: 'equipment.weapon'},
        armour     : {label: 'Armour',  path: 'equipment.armour'},
        shield     : {label: 'Shield',  path: 'equipment.shield'},
        utility    : {label: 'Utility', path: 'equipment.utility'},
    };
    utils.game_data.expiry = $.extend(true,{},utils.game_data.triggers);
    utils.game_data.item_types = {
        potion : {label: 'Potion', path: 'inventory.potions'},
        scroll : {label: 'Scroll', path: 'inventory.scrolls'},
        quest  : {label: 'Quest',  path: 'inventory.quest'},
    };
    utils.game_data.points = {
        skill:   {label: 'Skill',   path: 'points.skill',   value: starting_skills},
        stat:    {label: 'Stat',    path: 'points.stat',    value: 0},
        ability: {label: 'Ability', path: 'points.ability', value: 0},
        spell:   {label: 'Spell',   path: 'points.spell',   value: 0},
    };
    utils.game_data.pools = {
        xp:    utils.system.clone('pool_tmp', {label: 'XP',    value:  0, max: 100, path: 'pools.xp', active: true}),
        hp:    utils.system.clone('pool_tmp', {label: 'HP',    value:  0, max:   5, path: 'pools.hp', active: true}),
        ap:    utils.system.clone('pool_tmp', {label: 'AP',    value:  0, max:  10, path: 'pools.ap', active: true}),
        rage:  utils.system.clone('pool_tmp', {label: 'RAGE',  value:  0, max:   5, path: 'pools.rage'}),
        ki:    utils.system.clone('pool_tmp', {label: 'KI',    value:  0, max:   5, path: 'pools.ki'}),
        focus: utils.system.clone('pool_tmp', {label: 'FOCUS', value:  0, max:   5, path: 'pools.focus'}),
        mana:  utils.system.clone('pool_tmp', {label: 'MANA',  value:  0, max:  10, path: 'pools.mana'}),
    };
    utils.game_data.potions = {
        weak_health_potion: utils.system.clone('potion_tmp', {
            label:        'Weak Health Potion',
            cp_cost:      50,
            descriptions: {main: [`+2 HP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.hp', value: 2, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
        health_potion: utils.system.clone('potion_tmp', {
            label:        'Health Potion',
            cp_cost:      150,
            descriptions: {main: [`+4 HP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.hp', value: 4, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
        strong_health_potion: utils.system.clone('potion_tmp', {
            label:        'Strong Health Potion',
            cp_cost:      400,
            descriptions: {main: [`+6 HP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.hp', value: 6, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
        weak_action_potion: utils.system.clone('potion_tmp', {
            label:        'Weak Action Potion',
            cp_cost:      50,
            descriptions: {main: [`+2 AP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.ap', value: 2, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
        action_potion: utils.system.clone('potion_tmp', {
            label:        'Action Potion',
            cp_cost:      150,
            descriptions: {main: [`+4 AP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.ap', value: 4, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
        strong_action_potion: utils.system.clone('potion_tmp', {
            label:        'Strong Action Potion',
            cp_cost:      400,
            descriptions: {main: [`+6 AP`]},
            modifiers:    [
                utils.tools.templates.modifiers.convert(
                    {type: 'modify_pool', path: 'pools.ap', value: 6, trigger: 'triggers.once', label: '', descriptions: {main: [``], flavor: [``]}}
                ),
            ],
        }),
    };
    utils.game_data.races = {
        human: utils.system.clone('race_tmp', {
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
        al_geberan: utils.system.clone('race_tmp', {
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
                utils.tools.templates.modifiers.convert({type: 'stat', label: 'Fierce Intellect', path: 'stats.brainy', value:   1, trigger: 'triggers.once', descriptions: {main: [`+1 Brains`], flavor: ['']}}),
                utils.tools.templates.modifiers.convert({type: 'stat', label: 'Naive Culture',    path: 'stats.savvy',  value:  -1, trigger: 'triggers.once', descriptions: {main: [`-1 Savvy`],  flavor: ['']}}),
            ],
        }),
        njord: utils.system.clone('race_tmp', {
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
        dwarf: utils.system.clone('race_tmp', {
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
        cave_dwarf: utils.system.clone('race_tmp', {
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
        sky_dwarf: utils.system.clone('race_tmp', {
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
        elf: utils.system.clone('race_tmp', {
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
        high_elf: utils.system.clone('race_tmp', {
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
        wood_elf: utils.system.clone('race_tmp', {
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
        half_blood: utils.system.clone('race_tmp', {
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
        half_orc: utils.system.clone('race_tmp', {
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
        half_elf: utils.system.clone('race_tmp', {
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
        orkin: utils.system.clone('race_tmp', {
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
        goblin: utils.system.clone('race_tmp', {
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
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Stunty',    path: 'skills.tumbling',    value:  1, descriptions: {main: [`+1 Tumbling`], flavor: [``]}})),
            ],
        }),
        orc: utils.system.clone('race_tmp', {
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
                utils.tools.templates.modifiers.convert(utils.system.clone('race_tmp', {label: 'Athletic Build', path: 'skills.fitness',    value:  1, descriptions: {main: [``], flavor: [``]}})),
            ],
        }),
    };
    utils.game_data.rarity_levels = {
        common:    5000,
        uncommon:  9900,
        rare:      9999,
        epic:     10000,
    };
    utils.game_data.skills = {
        animal_ken:   utils.system.clone('skill_tmp', {label: 'Animal Ken',   stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to train or calm an animal']}}),
        arcane_lore:  utils.system.clone('skill_tmp', {label: 'Arcane Lore',  stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the arcane elements of the world you're in.`]}}),
        engineering:  utils.system.clone('skill_tmp', {label: 'Engineering',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to do disarm strange traps.']}}),
        melee_skill:  utils.system.clone('skill_tmp', {label: 'Melee Skill',  stat: 'butch',  descriptions: {flavor: [''], main: [`Your ability to hit others in melee combat.`]}}),
        fitness:      utils.system.clone('skill_tmp', {label: 'Fitness',      stat: 'buff',   descriptions: {flavor: [''], main: ['Your ability to swim or do Track and Field type shit.']}}),
        intuition:    utils.system.clone('skill_tmp', {label: 'Intuition',    stat: 'savvy',  descriptions: {flavor: [''], main: ['Your ability to intuit the motives of another.']}}),
        lockpicking:  utils.system.clone('skill_tmp', {label: 'Lockpicking',  stat: 'brainy', descriptions: {flavor: [''], main: ['Your ability to open locks without worrying about trivial matters such as possessing the key.']}}),
        lying:        utils.system.clone('skill_tmp', {label: 'Lying',        stat: 'suave',  descriptions: {flavor: [''], main: ['Your ability to hide information from another.']}}),
        observation:  utils.system.clone('skill_tmp', {label: 'Observation',  stat: 'savvy',  descriptions: {flavor: [''], main: ['Want to spot the things that go bump in the night before they spot you?  This is the skill for you.']}}),
        ranged_skill: utils.system.clone('skill_tmp', {label: 'Ranged Skill', stat: 'spry',   descriptions: {flavor: [''], main: [`Your ability to hit others in ranged combat.`]}}),
        tumbling:     utils.system.clone('skill_tmp', {label: 'Tumbling',     stat: 'spry',   descriptions: {flavor: [''], main: ['Your ability to do sweet backflips and other Ninja type shit.']}}),
        world_lore:   utils.system.clone('skill_tmp', {label: 'World Lore',   stat: 'brainy', descriptions: {flavor: [''], main: [`How much you know about the history of the world you're in.`]}})
    };
    utils.game_data.spells = {
        elemental: {
            gust:          utils.system.clone('spell_tmp', {label: 'Gust',          sp_cost: 1, mp_cost: 2, descriptions: {main: [`Target a Creature you can see and make a Spell Attack against the targets Fitness Skill if you win, the target is Thrown 2 squares per success in a direction chosen by the caster.`], flavor: [``]}}),
            whirlwind:     utils.system.clone('spell_tmp', {label: 'Whirlwind',     sp_cost: 2, mp_cost: 4, descriptions: {main: [`Make a Spell Attack, any Creature adjacent to you must beat this target on a Fitness skill roll or be Thrown up to 3 squares directly away from the caster.`], flavor: [``]}}),
            quicksand:     utils.system.clone('spell_tmp', {label: 'Quicksand',     sp_cost: 1, mp_cost: 2, descriptions: {main: [`Target a square you can see and make a Spell Attack, until the end of the next round the floor of this square turns to quicksand.  Any Creature trying to enter or exit the square must beat your initial Spell Attack on a Fitness skill roll  or become Trapped.  A Creature still in quicksand when it becomes solid is sucked under and is considered dead, do not make a Treasure roll for this Creature.`], flavor: [``]}}),
            pillar:        utils.system.clone('spell_tmp', {label: 'Pillar',        sp_cost: 2, mp_cost: 4, descriptions: {main: [`Target a square you can see, the floor of the square rumbles and shoots toward the ceiling!  The square becomes Impassable until the start of the next turn.  Any entity stood on the square must beat your Spell Attack on a Tumbling skill roll or take 4 damage per hit from the ceiling.  If the entity passes their check they may choose an unoccupied adjacent square to land in.`], flavor: [``]}}),
            fireburst:     utils.system.clone('spell_tmp', {label: 'Fireburst',     sp_cost: 1, mp_cost: 2, descriptions: {main: [`Target a Creature you can see and make a Spell Attack against the targets Tumbling skill.  If the target fails they take 2 damage per hit and become Ignited.`], flavor: [``]}}),
            inferno:       utils.system.clone('spell_tmp', {label: 'Inferno',       sp_cost: 2, mp_cost: 4, descriptions: {main: [`Make a Spell Attack, any Creature adjacent to you must beat this target on a Tumbling skill roll or take 2 damage and become Ignited.`], flavor: [``]}}),
            erode:         utils.system.clone('spell_tmp', {label: 'Erode',         sp_cost: 1, mp_cost: 2, descriptions: {main: [`Target a Mundane lock, this spell may be Overcharged. Make a Spell Attack if the number of successes plus any Overcharge amount is greater than the lock level then the lock erodes away in front of your eyes.`], flavor: [``]}}),
            water_of_life: utils.system.clone('spell_tmp', {label: 'Water of Life', sp_cost: 2, mp_cost: 4, descriptions: {main: [`Target a Creature you can see, the Creature gains 2 HP.`], flavor: [``]}}),
        },
    };
    utils.game_data.stats = {
        butch:  utils.system.clone('stat_tmp', {label: 'Butch',  path: 'stats.butch'}),
        spry:   utils.system.clone('stat_tmp', {label: 'Spry',   path: 'stats.spry'}),
        buff:   utils.system.clone('stat_tmp', {label: 'Buff',   path: 'stats.buff'}),
        suave:  utils.system.clone('stat_tmp', {label: 'Suave',  path: 'stats.suave'}),
        brainy: utils.system.clone('stat_tmp', {label: 'Brainy', path: 'stats.brainy'}),
        savvy:  utils.system.clone('stat_tmp', {label: 'Savvy',  path: 'stats.savvy'}),
    };
    utils.game_data.triggers = {
        once:            {label: 'Once',           path: 'triggers.once',            data: {}},
        always:          {label: 'Always',         path: 'triggers.always',          data: {}},
        never:           {label: 'Never',          path: 'triggers.never',           data: {}},
        combat_start:    {label: 'Combat Start',   path: 'triggers.combat_start',    data: {}},
        combat_end:      {label: 'Combat End',     path: 'triggers.combat_end',      data: {}},
        round_start:     {label: 'Round Start',    path: 'triggers.round_start',     data: {}},
        round_end:       {label: 'Round End',      path: 'triggers.round_end',       data: {}},
        turn_start:      {label: 'Turn Start',     path: 'triggers.turn_start',      data: {}},
        turn_end:        {label: 'Turn End',       path: 'triggers.turn_end',        data: {}},
        on_attack:       {label: 'Attack',         path: 'triggers.on_attack',       data: {}},
        on_attack_hit:   {label: 'Attack Hit',     path: 'triggers.on_attack_hit',   data: {}},
        on_attack_miss:  {label: 'Attack Miss',    path: 'triggers.on_attack_miss',  data: {}},
        on_kill:         {label: 'Kill Opponent',  path: 'triggers.on_kill',         data: {}},
        on_defend:       {label: 'Defend',         path: 'triggers.on_defend',       data: {}},
        on_defend_win:   {label: 'Defend Success', path: 'triggers.on_defend_win',   data: {}},
        on_defend_lose:  {label: 'Defend Failure', path: 'triggers.on_defend_lose',  data: {}},
        on_cast:         {label: 'Cast Spell',     path: 'triggers.on_cast',         data: {}},
        on_deal_damage:  {label: 'Deal Damage',    path: 'triggers.on_deal_damage',  data: {}},
        on_take_damage:  {label: 'Take Damage',    path: 'triggers.on_take_damage',  data: {}},
        on_avoid_damage: {label: 'Avoid Damage',   path: 'triggers.on_avoid_damage', data: {}},
    };
    utils.game_data.expires = $.extend(true,{},utils.game_data.triggers);
    utils.game_data.targets = {
        self  : {label: 'Self'},
        ally  : {label: 'Ally'},
        enemy : {label: 'Enemy'},
        area  : {label: 'AoE'},
    };
    utils.game_data.utility = {
        shield: utils.system.clone('utility_tmp', {label: 'Wooden Shield', cp_cost: 50, can_block_ranged: true, descriptions: {main: [`Can block ranged attacks.`], flavor: [``]}}),
        torch:  utils.system.clone('utility_tmp', {label: 'Torch',         cp_cost: 10, emits_light: true, light: {angle: 360, bright: 3, dim: 6, animation: {type: 'torch', speed: 1, intensity: 2}}, descriptions: {main: [`Can see in dark places.`], flavor: [``]}}),
    };
    utils.game_data.weapons = {
        short_sword: utils.system.clone('weapon_tmp', {label: 'Short Sword', damage: 2, ap_cost: 2, range:  1, cp_cost:  50}),
        Longsword:   utils.system.clone('weapon_tmp', {label: 'Longsword',   damage: 3, ap_cost: 3, range:  1, cp_cost: 100}),
        greatsword:  utils.system.clone('weapon_tmp', {label: 'Greatsword',  damage: 4, ap_cost: 4, range:  1, cp_cost: 200, hands: 2}),
        hand_axe:    utils.system.clone('weapon_tmp', {label: 'Hand Axe',    damage: 2, ap_cost: 3, range:  1, cp_cost:  25}),
        greataxe:    utils.system.clone('weapon_tmp', {label: 'Greataxe',    damage: 4, ap_cost: 5, range:  1, cp_cost: 100, hands: 2}),
        staff:       utils.system.clone('weapon_tmp', {label: 'Staff',       damage: 2, ap_cost: 2, range:  2, cp_cost:  50, hands: 2}),
        polearm:     utils.system.clone('weapon_tmp', {label: 'Polearm',     damage: 3, ap_cost: 4, range:  2, cp_cost: 150, hands: 2}),
        short_bow:   utils.system.clone('weapon_tmp', {label: 'Short Bow',   damage: 2, ap_cost: 3, range: 10, cp_cost: 100, hands: 2, skill: 'ranged_skill'}),
        long_bow:    utils.system.clone('weapon_tmp', {label: 'Longbow',     damage: 3, ap_cost: 4, range: 20, cp_cost: 200, hands: 2, skill: 'ranged_skill'}),
        crossbow:    utils.system.clone('weapon_tmp', {label: 'Crossbow',    damage: 4, ap_cost: 4, range: 10, cp_cost: 500, hands: 2, skill: 'ranged_skill'}),
    };
    
    utils.game_data.scrolls = {};
    return utils.game_data;
}