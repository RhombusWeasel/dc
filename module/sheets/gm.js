import HeroSheet from "./hero.js"

export default class GMSheet extends HeroSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["style_doc"],
            width: 400,
            height: 800,
        });
    }

    get tabs() {
        return [
            {navSelector: ".gm-tabs",     contentSelector: ".gm-body",     initial: "system"},
            {navSelector: ".system-tabs", contentSelector: ".system-body", initial: "races"},
        ]
    }

    /** @override */
    get template() {
        return `systems/dc/templates/${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
        const data    = super.getData();
        data.template = utils.game_data;
        return data;
    }
  
    activateListeners(html) {
        //Buttons:
        //System Editor
        html.find(".create-race").click(this._on_create_race.bind(this));
        html.find(".edit-race").click(this._on_edit_race.bind(this));
        return super.activateListeners(html);
    }

    //System Editor Functions:
    _on_create_race(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        new RaceEditor(el.dataset.header, el.dataset.path, el.dataset.bloodline).render(true);
    }

    _on_edit_race(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        new RaceEditor('Race', el.dataset.path).render(true);
    }

    _on_delete(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        utils.tools.path.delete(utils.game_data, el.dataset.path);
    }

}