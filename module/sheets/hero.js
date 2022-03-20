export default class HeroSheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["style_doc"],
        width: 400,
        height: 800,
        tabs: [
          { navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core" },
          { navSelector: ".race-tabs", contentSelector: ".race-body", initial: "human" },
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
        data.stats = utils.template.entity.stats;
        if (this.actor.data.data.race == 'None') data.races = utils.template.races
        return data;
    }
  
    activateListeners(html) {
        //Example Button Registry
        html.find(".test-button").click(this._on_test_button.bind(this));
  
        html.find(".class-select").change(this._on_test_dropdown.bind(this));
        return super.activateListeners(html);
    }

    _on_test_button(ev) {}

    _on_test_dropdown(ev) {}

}