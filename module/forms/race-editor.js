class RaceEditor extends FormApplication {
    constructor(race, variant) {
        super();
        let tmp = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.race = race;
        this.variant = variant;
        if (race != 'New Race') {
            if (variant) {
                this.race_edits = tmp.races[race].variants[variant];
            }
        }else{
            this.race_edits = utils.system.race_template();
        }
    }
  
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            template: `systems/dc/templates/editor/race-editor.html`,
            id: 'race-editor',
            title: 'Race Editor',
        });
    }
  
    getData() {
        // Return data to the template
        return {
            msg: this.exampleOption,
            color: 'red',
        };
    }
  
    activateListeners(html) {
        super.activateListeners(html);
    }
  
    async _updateObject(event, formData) {
        console.log(formData.exampleInput);
    }
}
  
window.RaceEditor = RaceEditor;