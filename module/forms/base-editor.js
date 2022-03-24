export default class BaseEditor extends FormApplication {
    constructor(editor_type) {
        super();
        //console.log('DC : BaseEditor : constructor :', editor_type);
        this.editor_type = editor_type;
        this.uuid        = utils.tools.uuid(4, 4, 4, 4)
    }
  
    static get defaultOptions() {
        console.log('DC : BaseEditor : defaultOptions :', this.editor_type, this.uuid);
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            template: `systems/dc/templates/editor/${this.editor_type}-editor.html`,
            id: `${this.editor_type}-editor-${this.uuid}`,
            title: `Editor`,
            width: 500,
            resizable: true,
        });
    }

    get template() {
        return `systems/dc/templates/editor/${this.editor_type}-editor.html`;
    }
  
    getData() {
        // Return data to the template
        return {
            title:     this.header,
            race:      this.variant == false ? this.race_edits : this.race_data,
            bloodline: this.variant == false ? utils.system.race_template() : this.race_edits,
            stats:     utils.template.entity_template.stats,
        };
    }
  
    activateListeners(html) {
        //Bool Toggles
        html.find(".toggle-value").click(this._on_toggle_value.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        //Numerical Inputs
        html.find(".stat-modifier").change(this._on_int_change.bind(this));
        return super.activateListeners(html);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, !utils.tools.get_path(el.dataset.path));
        this.render(true);
    }

    _on_text_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, el.value);
        document.getElementById(el.dataset.path).innerText = el.value;
    }

    _on_int_change(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        utils.tools.set_path(this.race_edits, el.dataset.path, parseInt(el.value));
        this.render(true);
    }
}
  
window.BaseEditor = BaseEditor;