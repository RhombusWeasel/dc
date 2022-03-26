export default class BaseEditor extends FormApplication {
    constructor(editor_type, path) {
        super();
        console.log('DC : base-editor.constructor : ', path, this.addr);
        this.addr        = utils.tools.path.split(path);
        this.uuid        = utils.tools.uuid(4, 4, 4, 4);
        this.editor_type = editor_type;
    }
  
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            width: 500,
            resizable: true,
        });
    }

    get id() {
        return `${this.uuid}-${this.editor_type}-editor`
    }

    get title() {
        return `${this.editor_type.charAt(0).toUpperCase() + this.editor_type.slice(1)} Editor`
    }

    get template() {
        return `systems/dc/templates/editor/${this.editor_type}-editor.html`;
    }
  
    getData() {
        let data = super.getData();
        data.title    = this.header;
        data.uuid     = this.uuid;
        data.template = utils.game_data;
        return data;
    }
  
    activateListeners(html) {
        //Bool Toggles & Buttons
        html.find(".add-line").click(this._on_add_line.bind(this));
        html.find(".bool-change").click(this._on_toggle_value.bind(this));

        html.find(".save-changes").click(this._on_save_changes.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        //Numerical Inputs
        html.find(".int-change").change(this._on_int_change.bind(this));
        return super.activateListeners(html);
    }

    _on_add_line(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        let list = utils.tools.path.get(this.edits, el.dataset.path);
        list.push('');
        utils.tools.path.set(this.edits, el.dataset.path, list);
        this.render(true);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.edits, el.dataset.path, !utils.tools.path.get(this.edits, el.dataset.path));
        this.render(true);
    }

    _on_text_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.edits, el.dataset.path, el.value);
        if (el.dataset.path == 'label') this.addr.key = utils.tools.safe_key(el.value);
        document.getElementById(`${this.uuid}-${el.dataset.path}`).innerText = el.value;
    }

    _on_int_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.path.set(this.edits, el.dataset.path, parseInt(el.value));
        this.render(true);
    }

    _on_save_changes(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        console.log('DC : base-editor._on_save_changes : ', this.addr);
        utils.tools.path.set(utils.game_data, `${this.addr.root}.${this.addr.key}`, this.edits);
        utils.gm.save_system();
        this.close();
    }

}
  
window.BaseEditor = BaseEditor;