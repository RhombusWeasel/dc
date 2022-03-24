class RaceEditor extends FormApplication {
    constructor(race, variant) {
        super();
        let tmp = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.race = race;
        this.variant = variant;
        if (race != 'New Race') {
            this.race_data  = tmp.races[race];
            if (variant) {
                if (variant != 'New Race') {
                    this.race_edits = tmp.races[race].variants[variant];
                }else{
                    this.race_edits = utils.system.race_template();
                }
            }else{
                this.race_edits = tmp.races[race];
            }
        }else{
            this.race_edits = utils.system.race_template();
        }
        console.log('DC : Race Editor : constructor :', this.race, this.variant, this.race_edits, tmp.races);
    }
  
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            template: `systems/dc/templates/editor/race-editor.html`,
            id: 'race-editor',
            title: 'Race Editor',
            width: 500,
            resizable: true,
        });
    }
  
    getData() {
        // Return data to the template
        return {
            race:      this.race_edits,
            bloodline: this.variant != false ? this.
            stats: utils.template.entity_template.stats,
        };
    }
  
    activateListeners(html) {
        html.find(".toggle-value").click(this._on_toggle_value.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        //Numerical Inputs
        html.find(".stat-modifier").change(this._on_int_change.bind(this));
        return super.activateListeners(html);
    }
  
    async _updateObject(event, formData) {
        console.log(formData.exampleInput);
    }

    _on_toggle_value(ev) {
        ev.preventDefault();
        let el = ev.currentTarget;
        this.race_edits[el.dataset.key] = !this.race_edits[el.dataset.key];
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
  
window.RaceEditor = RaceEditor;