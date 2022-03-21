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
        return super.activateListeners(html);
    }

}