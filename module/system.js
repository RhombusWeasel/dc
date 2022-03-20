//import item_sheet from "./sheets/item.js";
import hero_sheet from "./sheets/hero.js"
import npc_sheet from "./sheets/npc.js"
import enemy_sheet from "./sheets/enemy.js"
import gm_sheet from "./sheets/gm.js"

let SYSTEM_NAME = 'dc'

function register_sheets() {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet(SYSTEM_NAME, hero_sheet, {makeDefault: true});
    Actors.registerSheet(SYSTEM_NAME, npc_sheet, {makeDefault: false});
    Actors.registerSheet(SYSTEM_NAME, enemy_sheet, {makeDefault: false});
    Actors.registerSheet(SYSTEM_NAME, gm_sheet, {makeDefault: false});
    console.log("DC: Actor sheets registered.");
}

function register_settings() {
    game.settings.register('dc', 'system_journal', {
        name: 'System Journal',
        hint: 'The journal containing system json data',
        scope: 'world',     // "world" = sync to db, "client" = local storage 
        config: true,       // false if you dont want it to show in module config
        type: String,       // Number, Boolean, String,  
        default: 'Generic Fantasy System',
        onChange: value => {
            console.log('DC: Settings : system_journal', value);
        }
    });
    game.settings.register('dc', 'maximum_ability', {
        name: 'Maximum Ability Score',
        hint: 'The maximum ability score any character can acheive',
        scope: 'world',     // "world" = sync to db, "client" = local storage 
        config: false,       // false if you dont want it to show in module config
        type: Number,       // Number, Boolean, String,  
        default: 5,
        onChange: value => {
            console.log('DC: Settings : Maximum ability score: ', value);
        }
    });
    console.log("DC: Game settings registered.");
}

async function preload_handlebars_templates() {
    const template_paths = [
        'systems/dc/templates/tabs/core.hbs',
    ];
    return loadTemplates(template_paths);
}

function load_handlebars_helpers() {
    Handlebars.registerHelper('isGM', function (options) {
        if (game.user.isGM) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper("sum", function(lvalue, operator, rvalue, options) {
        if (typeof(lvalue) == 'string') {
            lvalue = parseInt(lvalue.slice(1, lvalue.length));
        }else {
            lvalue = parseInt(lvalue);
        }
        rvalue = parseInt(rvalue);
        return {
            "+": `${(lvalue + rvalue)}`,
            "-": `${(lvalue - rvalue)}`,
            "*": `${(lvalue * rvalue)}`,
            "/": `${(lvalue / rvalue)}`,
            "%": `${(lvalue % rvalue)}`,
        }[operator];
    });

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
}

function load_system() {
    if (!game.user.isGM) return;
    let j_name = game.settings.get('dc', 'system_journal');
    let journal = game.journal.getName(j_name);
    if (journal) {
        utils.template = utils.journal.load(jname);
    }else{
        utils.template = utils.journal.load('Generic Fantasy System', import_fantasy_system());
    }
}

Hooks.once("init", function () {
    console.log("DC: Initializing System.");
    register_sheets();
    register_settings();
    load_handlebars_helpers();
    preload_handlebars_templates();
    load_system();
});