import HeroSheet from "./hero.js"

export default class GMSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["style_doc"],
            width: 400,
            height: 800,
            tabs: [
                {navSelector: ".gm-tabs",     contentSelector: ".gm-body",     initial: "system"},
                {navSelector: ".system-tabs", contentSelector: ".system-body", initial: "races"},
                {navSelector: ".entity-tabs", contentSelector: ".entity-body", initial: "stats"},
            ],
        });
    }

    /** @override */
    get template() {
        return `systems/dc/templates/${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
        const data    = super.getData();
        data.template = utils.game_data;
        //console.log(this);
        return data;
    }
  
    activateListeners(html) {
        //Buttons:
        //System Editor
        html.find(".create").click(this._on_create.bind(this));
        html.find(".edit").click(this._on_edit.bind(this));
        html.find(".delete").click(this._on_delete.bind(this));
        return super.activateListeners(html);
    }

    //System Editor Functions:
    _on_create(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        let changes = {};
        for (const key in el.dataset) {
            if (Object.hasOwnProperty.call(el.dataset, key)) {
                console.log('converting ', el.dataset[key], utils.tools.convert_type(el.dataset[key]));
                changes[key] = utils.tools.convert_type(el.dataset[key]);
            }
        }
        console.log('converted ', changes);
        new BaseEditor(el.dataset.type, {path: el.dataset.path, template_data: changes}).render(true);
    }

    _on_edit(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        let changes = {};
        for (const key in el.dataset) {
            if (Object.hasOwnProperty.call(el.dataset, key)) {
                console.log('converting ', el.dataset[key], utils.tools.convert_type(el.dataset[key]));
                changes[key] = utils.tools.convert_type(el.dataset[key]);
            }
        }
        console.log('converted ', changes);
        new BaseEditor(el.dataset.type, {path: el.dataset.path, template_data: changes}).render(true);
    }

    _on_delete(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        utils.tools.path.delete(utils.game_data, el.dataset.path);
        utils.gm.save_system();
    }

}