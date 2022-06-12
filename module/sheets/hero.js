export default class HeroSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    let tabs = [
      {navSelector: ".sheet-tabs",  contentSelector: ".sheet-body",  initial: "core"},
      {navSelector: ".race-tabs",   contentSelector: ".race-body",   initial: "human"},
      {navSelector: ".class-tabs",  contentSelector: ".class-body",  initial: "barbarian"},
      {navSelector: ".panel1-tabs", contentSelector: ".panel1-body", initial: "traits"},
      {navSelector: ".panel2-tabs", contentSelector: ".panel2-body", initial: "inventory"},
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
    
    // Shopping Data:
    data.item_list = {
      weapons: utils.game_data.weapons,
      armour:  utils.game_data.armour,
      utility: utils.game_data.utility,
      potions: utils.game_data.potions,
    };
    // Spell Data:
    data.spell_list = {
      elemental: utils.game_data.spells.elemental,
    };

    return data;
  }

  activateListeners(html) {
    //Example Button Registry
    html.find(".select-option").click(this._on_select_option.bind(this));
    html.find(".skill-buff").click(this._on_skill_buff.bind(this));
    html.find(".skill-roll").click(this._on_skill_roll.bind(this));
    html.find(".target-roll").click(this._on_target_roll.bind(this));
    html.find(".attack-roll").click(this._on_attack_roll.bind(this));
    html.find(".block-roll").click(this._on_block_roll.bind(this));
    html.find(".buy-item").click(this._on_buy_item.bind(this));
    html.find(".buy-spell").click(this._on_buy_spell.bind(this));
    html.find(".cast-spell").click(this._on_cast_spell.bind(this));
    html.find(".action-button").click(this._on_action_button.bind(this));
    html.find(".equip-item").click(this._on_equip_item.bind(this));
    html.find(".use-potion").click(this._on_use_potion.bind(this));
    html.find(".text-change").on('input', this._on_text_change.bind(this));
    html.find(".nuke-sheet").click(this._on_nuke_sheet.bind(this));

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
    utils.tools.templates.iterate(this.actor.data.data, utils.game_data[el.dataset.target][el.dataset.main_field].modifiers);
    this.actor.data.data[el.dataset.main_target] = el.dataset.main_field;
    // Set Pools
    var mods = this.actor.data.data?.triggers?.always ? this.actor.data.data.triggers.always : {};
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
      'data.points.skill.value': this.actor.data.data.points.skill.value - (skill.value + 1),
    });
  }

  _on_skill_roll(ev) {
    ev.preventDefault();
    let el     = ev.currentTarget;
    let result = utils.act.skill_roll(this.actor, el.dataset.path);
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

  _on_action_button(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    utils.act.modify_pool(this.actor, 'ap', -parseInt(el.dataset.ap_cost));
    this.actor.update({data: this.actor.data.data});
  }

  _on_attack_roll(ev) {
    ev.preventDefault();
    let el     = ev.currentTarget;
    utils.act.modify_pool(this.actor, 'ap', -parseInt(el.dataset.ap_cost));
    let result = utils.act.skill_roll(this.actor, el.dataset.skill, ['on_attack']);
    this.actor.update({data: this.actor.data.data});
  }

  _on_block_roll(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let result = utils.act.block(this.actor);
  }

  _on_text_change(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    this.actor.update({[el.dataset.path]: el.value});
  }

  _on_buy_item(ev) {
    ev.preventDefault();
    let el    = ev.currentTarget;
    let goods = el.dataset.type;
    let item  = el.dataset.item;
    utils.act.buy_item(this.actor, goods, item);
    this.actor.update({data: this.actor.data.data});
  }

  _on_equip_item(ev) {
    ev.preventDefault();
    let el    = ev.currentTarget;
    utils.act.equip_item(this.actor, el.dataset.target, el.dataset.item);
    this.actor.update({data: this.actor.data.data});
  }

  _on_buy_spell(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    utils.act.buy_spell(this.actor, el.dataset.school, el.dataset.spell);
    this.actor.update({data: this.actor.data.data});
  }

  _on_cast_spell(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    let result = utils.act.cast_spell(this.actor, el.dataset.school, el.dataset.spell);
    this.actor.update({data: this.actor.data.data});
  }

  _on_use_potion(ev) {
    ev.preventDefault();
    let el = ev.currentTarget;
    utils.act.drink_potion(this.actor, el.dataset.potion);
    this.actor.update({data: this.actor.data.data});
  }

  _on_nuke_sheet(ev) {
    this.actor.update({data: utils.system.new.entity()}, {diff: false, recursive: false});
  }
}