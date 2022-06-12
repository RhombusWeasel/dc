//import item_sheet from "./sheets/item.js";
import hero_sheet from "./sheets/hero.js"
import npc_sheet from "./sheets/npc.js"
import enemy_sheet from "./sheets/enemy.js"
import gm_sheet from "./sheets/gm.js"

let SYSTEM_NAME = 'dc'

function register_sheets() {
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet(SYSTEM_NAME, hero_sheet,  {makeDefault: true});
    Actors.registerSheet(SYSTEM_NAME, npc_sheet,   {makeDefault: false});
    Actors.registerSheet(SYSTEM_NAME, enemy_sheet, {makeDefault: false});
    Actors.registerSheet(SYSTEM_NAME, gm_sheet,    {makeDefault: false});
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
    game.settings.register('dc', 'difficulty', {
        name: 'Difficulty',
        hint: 'The current target number for any roll.',
        scope: 'world',     // "world" = sync to db, "client" = local storage 
        config: false,      // false if you dont want it to show in module config
        type: Number,       // Number, Boolean, String,  
        default: 6,
        onChange: value => {
            console.log('DC: Settings : Difficulty Target: ', value);
        }
    });
    console.log("DC: Game settings registered.");
}

async function preload_handlebars_templates() {
    const template_paths = [
        //Entity Sheets - Shared
        'systems/dc/templates/shared/option-display.hbs',
        'systems/dc/templates/shared/race-display.hbs',
        'systems/dc/templates/shared/class-display.hbs',
        'systems/dc/templates/shared/sheet-panel.hbs',
        'systems/dc/templates/shared/action-buttons.hbs',
        'systems/dc/templates/shared/stat-block.hbs',
        'systems/dc/templates/shared/skill-block.hbs',
        'systems/dc/templates/shared/inventory.hbs',
        'systems/dc/templates/shared/spell-tab.hbs',
        //Entity Sheets - Tabs
        'systems/dc/templates/tabs/hero/core.hbs',
        'systems/dc/templates/tabs/hero/store.hbs',
        'systems/dc/templates/tabs/hero/spell-store.hbs',
        'systems/dc/templates/tabs/hero/race-select.hbs',
        'systems/dc/templates/tabs/hero/class-select.hbs',
        'systems/dc/templates/tabs/enemy/race-select.hbs',
        'systems/dc/templates/tabs/enemy/class-select.hbs',
        //GM Sheet
        'systems/dc/templates/tabs/gm/system-editor.hbs',
        'systems/dc/templates/tabs/gm/gm-table-row.hbs',
        'systems/dc/templates/tabs/gm/abilities-tab.hbs',
        'systems/dc/templates/tabs/gm/entity-tab.hbs',
        'systems/dc/templates/tabs/gm/race-tab.hbs',
        'systems/dc/templates/tabs/gm/class-tab.hbs',
        'systems/dc/templates/tabs/gm/combat.hbs',
        'systems/dc/templates/tabs/gm/player-table-row.hbs',
        //Editor
        'systems/dc/templates/editor/shared/editor-data.hbs',
        //Editor Table Rows
        'systems/dc/templates/table-rows/race-editor-tr.hbs',
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

    Handlebars.registerHelper('pathLookup', function (obj, path, options) {
        let val = utils.tools.path.get(obj, path);
        return val ? val : 'Value not found.';
    });

    Handlebars.registerHelper('has_spell', function (obj, school, spell, options) {
        if (obj[school][spell].active) {
            return true;
        }
        return false;
    });

    Handlebars.registerHelper('ifInt', function (value, options) {
        if (parseInt(value) || value == '0' && !(value == true || value == false)) return options.fn(this);
        return options.inverse(this);
    });

    Handlebars.registerHelper('pretty_print', function (str, options) {
        return new Handlebars.SafeString(utils.tools.key_to_label(str));
    });

    Handlebars.registerHelper('get_pips', function (value, max, opt) {
        let t = ``;
        for (let i = 0; i < value; i++) {
            t += `<i class="fas fa-circle"/>`;
        }
        for (let i = value; i < max; i++) {
            t += `<i class="far fa-circle"/>`;
        }
        return new Handlebars.SafeString(t + '</p>');
    });
}

function load_system() {
    if (!game.user.isGM) {
        utils.socket.emit('request_system', 'GM');
    }else{
        //utils.templates = utils.journal.load('Templates', import_generic_templates());
        utils.game_data = utils.journal.load(game.settings.get('dc', 'system_journal'), import_fantasy_system());
    }
}

function load_hooks() {
    
}

Hooks.once("init", function () {
    console.log("DC: Initializing System.");
    register_sheets();
    register_settings();
    load_handlebars_helpers();
    preload_handlebars_templates();
});

Hooks.on("ready", function() {
    load_system();
    load_hooks();
});