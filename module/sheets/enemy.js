import HeroSheet from "./hero.js"

export default class EnemySheet extends HeroSheet {

    /** @override */
  static get defaultOptions() {
    let enemy_tabs = [
      {navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core"},
      {navSelector: ".race-tabs",  contentSelector: ".race-body",  initial: "orkin"},
      {navSelector: ".class-tabs", contentSelector: ".class-body", initial: "mook"},
      {navSelector: ".panel1-tabs", contentSelector: ".panel1-body", initial: "traits"},
      {navSelector: ".panel2-tabs", contentSelector: ".panel2-body", initial: "inventory"},
    ];
    for (const key in utils.game_data.races) {
      if (Object.hasOwnProperty.call(utils.game_data.races, key)) {
        const race = utils.game_data.races[key];
        if (race?.allow_variants) {
          let initial = Object.keys(Object.fromEntries(Object.entries(utils.game_data.races).filter(([k,v]) => v.sub_field==key)))[0];
          enemy_tabs.push({ navSelector: `.${key}-tabs`, contentSelector: `.${key}-body`, initial: initial});
        }
      }
    }
    for (const key in utils.game_data.classes) {
      if (Object.hasOwnProperty.call(utils.game_data.classes, key)) {
        const cl = utils.game_data.classes[key];
        if (cl?.allow_variants) {
          let initial = Object.keys(Object.fromEntries(Object.entries(utils.game_data.classes).filter(([k,v]) => v.sub_field==key)))[0];
          enemy_tabs.push({ navSelector: `.${key}-tabs`, contentSelector: `.${key}-body`, initial: initial});
        }
      }
    }
    return mergeObject(super.defaultOptions, {
      classes: ["style_doc"],
      tabs: enemy_tabs
    });
  }
  
    /** @override */
    get template() {
      return `systems/dc/templates/${this.actor.data.type}-sheet.html`;
    }
  
    /** @override */
    getData() {
        const data = super.getData();
        if (!(this.actor.data.data?.pools)) {
          let char = utils.system.new.entity();
          this.actor.update({data: char});
        }
        data.races = utils.game_data.races;
        data.player  = false;
        return data;
    }
  
    activateListeners(html) {
        //Example Button Registry
        html.find(".test-button").click(this._on_test_button.bind(this));
  
        html.find(".class-select").change(this._on_test_dropdown.bind(this));
        return super.activateListeners(html);
    }

    _on_skill_roll(ev) {
      ev.preventDefault();
      let el      = ev.currentTarget;
      var mods    = this.actor.data.data?.triggers?.always ? this.actor.data.data.triggers.always : {};
      let char    = utils.tools.templates.apply(this.actor.data.data, mods);
      let skill   = this.actor.data.data.skills[el.dataset.path];
      let stat    = char.stats[skill.stat];
      let formula = `${stat.value}d10cs>=${10 - skill.value}`;
      new Roll(formula).toMessage({
        speaker: {
          alias: this.actor.name,
        },
        flavor: `${skill.label}`,
      });
    }

    _on_test_button(ev) {}

    _on_test_dropdown(ev) {}

}