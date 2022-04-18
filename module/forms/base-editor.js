export default class BaseEditor extends FormApplication {
    constructor(editor_type, data) {
        super();
        console.log('base-editor', data);
        let addr       = utils.tools.path.split(data.path);
        this.game_data = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.dc = {
            addr           : addr,
            dict_key       : addr.key,
            uuid           : utils.tools.uuid(4, 4, 4, 4),
            editor_type    : editor_type,
            data_format    : utils.templates[editor_type],
            mod_templates  : utils.templates.modifiers,
            edits          : utils.tools.path.get(this.game_data, data.path) ? utils.tools.path.get(this.game_data, data.path) : utils.system.new.template(editor_type, data.template_data),
            mod_index      : 0,
            tmp_mod        : utils.system.new.modifier(0, {}),
            hide_modifiers : data.template_data?.hide_modifiers ? true : false,
        };
        console.log('base-editor', this.dc.hide_modifiers);
    }
  
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes   : ['style_doc'],
            popOut    : true,
            resizable : true,
        });
    }

    get id() {
        return `${this.dc.uuid}-${this.dc.editor_type}-editor`
    }

    get title() {
        return `${this.dc.editor_type.charAt(0).toUpperCase() + this.dc.editor_type.slice(1)} Editor`
    }

    get template() {
        //return `systems/dc/templates/editor/${this.editor_type}-editor.html`;
        return `systems/dc/templates/editor/editor.html`;
    }
  
    getData() {
        let data            = super.getData();
        data.title          = this.dc.header;
        data.uuid           = this.dc.uuid;
        data.game_data      = utils.game_data;
        data.template_data  = utils.templates;
        data.data_format    = this.dc.data_format;
        data.edits          = this.dc.edits;
        data.mod_templates  = utils.templates.modifiers;
        data.mod_index      = this.dc.mod_index;
        data.mod_format     = utils.templates.modifiers[this.dc.mod_index].template;
        data.tmp_mod        = this.dc.tmp_mod;
        data.hide_modifiers = this.dc.hide_modifiers;
        return data;
    }
  
    activateListeners(html) {
        //Bool Toggles & Buttons
        html.find(".add-line").click(this._on_add_list_element.bind(this));
        html.find(".remove-line").click(this._on_remove_list_element.bind(this));
        html.find(".bool-change").click(this._on_toggle_value.bind(this));
        html.find(".add-modifier").click(this._on_add_modifier.bind(this));

        html.find(".save-changes").click(this._on_save_changes.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        html.find(".key-change").on('input', this._on_key_change.bind(this));
        //Numerical Inputs
        html.find(".int-change").change(this._on_int_change.bind(this));
        //Selectors
        html.find(".modifier-select").change(this._on_mod_select.bind(this));
        html.find(".dropdown-change").change(this._on_dropdown_change.bind(this));
        return super.activateListeners(html);
    }

    _on_add_list_element(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        console.log(el.dataset);
        let list = utils.tools.path.get(this.dc[el.dataset.target], el.dataset.path);
        list.push('');
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, list);
        this.render(true);
    }

    _on_remove_list_element(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        console.log(el.dataset);
        let list = utils.tools.path.get(this.dc[el.dataset.target], el.dataset.path);
        list.splice(parseInt(el.dataset.index), 1);
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, list);
        this.render(true);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, !utils.tools.path.get(this.dc[el.dataset.target], el.dataset.path));
        this.render(true);
    }

    _on_text_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, el.value);
    }

    _on_key_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, el.value);
        this.dc.addr.key = utils.tools.safe_key(el.value);
    }

    _on_int_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.dc[el.dataset.target], el.dataset.path, parseInt(el.value));
        this.render(true);
    }

    _on_save_changes(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(utils.game_data, `${this.dc.addr.root}.${this.dc.addr.key}`, this.dc.edits);
        utils.gm.save_system();
        this.close();
    }

    _on_dropdown_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.dc.tmp_mod, el.dataset.path, el.value);
    }

    _on_mod_select(ev) {
        ev.preventDefault();
        let el            = ev.currentTarget;
        this.dc.mod_index = parseInt(el.value);
        this.dc.tmp_mod   = utils.system.new.modifier(this.dc.mod_index, {});
        this.getData();
        this.render(true);
    }

    _on_add_modifier(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        this.dc.edits.modifiers.push(utils.tools.templates.modifiers.convert(this.dc.tmp_mod));
        this.render(true);
    }

}
  
window.BaseEditor = BaseEditor;