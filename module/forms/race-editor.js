class RaceEditor extends FormApplication {
    constructor(race, variant) {
        super();
        let tmp = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.race = race;
        this.variant = variant;
        if (race != 'New Race') {
            if (variant) {
                this.race_edits = tmp.races[race].variants[variant];
            }else{
                this.race_edits = tmp.races[race];
            }
        }else{
            this.race_edits = utils.system.race_template();
        }
        console.log('DC : Race Editor : constructor :', this.race, this.variant, this.race_edits);
    }
  
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            template: `systems/dc/templates/editor/race-editor.html`,
            id: 'race-editor',
            title: 'Race Editor',
            width: 500,
        });
    }
  
    getData() {
        // Return data to the template
        return {
            race: this.race_edits,
            stats: utils.template.entity_template.stats,
        };
    }
  
    activateListeners(html) {
        html.find(".toggle-value").click(this._on_toggle_value.bind(this));
        //Text Inputs

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
}
  
window.RaceEditor = RaceEditor;