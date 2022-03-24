export default class BaseEditor extends FormApplication {
    constructor(editor_type) {
        super();
        //console.log('DC : BaseEditor : constructor :', editor_type);
        this.editor_type = editor_type;
        this.uuid        = utils.tools.uuid(4, 4, 4, 4)
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
        data.template = utils.template;
        return data;
    }
  
    activateListeners(html) {
        //Bool Toggles & Buttons
        html.find(".add-line").click(this._on_add_line.bind(this));
        html.find(".bool-change").click(this._on_toggle_value.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        //Numerical Inputs
        html.find(".int-change").change(this._on_int_change.bind(this));
        return super.activateListeners(html);
    }

    _on_add_line(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        let list = utils.tools.get_path(this.race_edits, el.dataset.path);
        list.push('');
        utils.tools.set_path(this.race_edits, el.dataset.path, list);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, !utils.tools.get_path(this.race_edits, el.dataset.path));
        this.render(true);
    }

    _on_text_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, el.value);
        console.log(`${this.uuid}-${el.dataset.path}`);
        document.getElementById(`${this.uuid}-${el.dataset.path}`).innerText = el.value;
    }

    _on_int_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, parseInt(el.value));
        this.render(true);
    }
}
  
window.BaseEditor = BaseEditor;