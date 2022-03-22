import HeroSheet from "./hero.js"

export default class GMSheet extends HeroSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["style_doc"],
            width: 400,
            height: 800,
            tabs: [
            {navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "system"},
            {navSelector: ".system-tabs", contentSelector: ".system-body", initial: "races"},
            ]
        });
    }
  
    /** @override */
    get template() {
        return `systems/dc/templates/${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
        const data = super.getData();
        data.template = utils.template;
        return data;
    }
  
    activateListeners(html) {
        //Buttons:
        //System Editor
        html.find(".race-edit").click(this._on_race_edit.bind(this));
        return super.activateListeners(html);
    }

    //System Editor Functions:
    _on_race_edit(ev) {
        ev.preventDefault()
        let el = ev.currentTarget;
        
    }

}