export default class HeroSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    let tabs = [
      {navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core"},
      {navSelector: ".race-tabs",  contentSelector: ".race-body",  initial: "human"},
      {navSelector: ".class-tabs", contentSelector: ".class-body", initial: "barbarian"},
    ];
    for (const key in utils.game_data.races) {
      if (Object.hasOwnProperty.call(utils.game_data.races, key)) {
        const race = utils.game_data.races[key];
        if (race?.playable && race.playable == true && race?.allow_variants) {
          let initial = Object.keys(Object.fromEntries(Object.entries(utils.game_data.races).filter(([k,v]) => v.sub_field==key)))[0];
          tabs.push({ navSelector: `.${key}-tabs`, contentSelector: `.${key}-body`, initial: initial});
        }
      }
    }
    for (const key in utils.game_data.classes) {
      if (Object.hasOwnProperty.call(utils.game_data.classes, key)) {
        const cl = utils.game_data.classes[key];
        if (cl?.playable && cl.playable == true && cl?.allow_variants) {
          let initial = Object.keys(Object.fromEntries(Object.entries(utils.game_data.classes).filter(([k,v]) => v.sub_field==key)))[0];
          tabs.push({ navSelector: `.${key}-tabs`, contentSelector: `.${key}-body`, initial: initial});
        }
      }
    }
    return mergeObject(super.defaultOptions, {
      classes: ["style_doc"],
      tabs: tabs
    });
  }

  /** @override */
  get template() {
    return `systems/dc/templates/${this.actor.data.type}-sheet.html`;
  }

  /** @override */
  getData() {
    const data   = super.getData();
    var mods     = this.actor.data.data?.triggers?.always ? this.actor.data.data.triggers.always : {};
    data.char    = utils.tools.templates.apply(utils.system.new.entity(), mods);
    data.races   = utils.game_data.races;
    data.classes = utils.game_data.classes;
    data.player  = true;
    return data;
  }

  activateListeners(html) {
    //Example Button Registry
    html.find(".select-option").click(this._on_select_option.bind(this));
    html.find(".skill-buff").click(this._on_skill_buff.bind(this));
    html.find(".skill-roll").click(this._on_skill_roll.bind(this));
    html.find(".target-roll").click(this._on_target_roll.bind(this));
    html.find(".text-change").on('input', this._on_text_change.bind(this));
    html.find(".nuke-sheet").click(this._on_nuke_sheet.bind(this));

    html.find(".class-select").change(this._on_test_dropdown.bind(this));
    return super.activateListeners(html);
  }

  _on_select_option(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    if (el.dataset.target == 'races') this.actor.data.data = utils.system.new.entity();
    if (el.dataset.sub_field != 'None') {
      utils.tools.templates.iterate(this.actor.data.data, utils.game_data[el.dataset.target][el.dataset.sub_field].modifiers);
      this.actor.data.data[el.dataset.sub_target] = el.dataset.sub_field;
    }
    console.log(el.dataset);
    utils.tools.templates.iterate(this.actor.data.data, utils.game_data[el.dataset.target][el.dataset.main_field].modifiers);
    this.actor.data.data[el.dataset.main_target] = el.dataset.main_field;
    // Set Pools
    var mods = this.actor.data.data?.triggers?.always ? this.actor.data.data.triggers.always : {};
    console.log(mods);
    var char = utils.tools.templates.apply(this.actor.data.data, mods);
    this.actor.data.data.pools.hp.value = char.stats.buff.value + 5
    this.actor.data.data.pools.hp.max   = char.stats.buff.value + 5
    this.actor.data.data.pools.ap.value = char.stats.spry.value + 5
    this.actor.data.data.pools.ap.max   = char.stats.spry.value + 5
    if (this.actor.data.data.pools?.mana){
      this.actor.data.data.pools.mana.value = char.stats.brainy.value + 10
      this.actor.data.data.pools.mana.max   = char.stats.brainy.value + 10
    }
    this.actor.update({data: this.actor.data.data});
    this.render(true);
  }

  _on_skill_buff(ev) {
    ev.preventDefault();
    let el      = ev.currentTarget;
    let skill   = this.actor.data.data.skills[el.dataset.skill];
    this.actor.update({
      [`data.${el.dataset.path}`]: skill.value + 1,
      'data.skill_points': this.actor.data.data.skill_points - (skill.value + 1),
    });
  }

  _on_skill_roll(ev) {
    ev.preventDefault();
    let el      = ev.currentTarget;
    var mods    = this.actor.data.data?.triggers?.always ? this.actor.data.data.triggers.always : {};
    let char    = utils.tools.templates.apply(this.actor.data.data, mods);
    let skill   = this.actor.data.data.skills[el.dataset.path];
    let stat    = char.stats[skill.stat];
    let formula = `${stat.value}d10cs>=${6 - skill.value}`;
    new Roll(formula).toMessage({
      speaker: {
        alias: this.actor.name,
      },
      flavor: `${skill.label}`,
    });
  }
  
  _on_target_roll(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    new Roll(el.dataset.formula).toMessage({
      speaker: {
        alias: this.actor.name,
      },
      flavor: `${el.dataset.roll_label}`,
    });
  }

  _on_test_dropdown(ev) {}

  _on_text_change(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    this.actor.update({[el.dataset.path]: el.value})
  }

  _on_nuke_sheet(ev) {
    this.actor.update({data: utils.system.new.entity()}, {diff: false, recursive: false});
  }
}