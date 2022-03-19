export default class GMSheet extends HeroSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["style_doc"],
        width: 400,
        height: 800,
        tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core" }]
      });
    }
  
    /** @override */
    get template() {
      return `systems/hq/templates/actor/${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
        const data = super.getData();
        return data;
    }
  
    activateListeners(html) {
        return super.activateListeners(html);
    }

}