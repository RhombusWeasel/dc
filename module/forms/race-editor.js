import BaseEditor from "./base-editor.js"

class RaceEditor extends BaseEditor {
    constructor(race, variant) {
        super();
        this.game_data   = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.editor_type = 'race'
        this.race        = race;
        this.variant     = variant;
        this.header      = 'Race';
        this.race_data   = this.game_data.races[race];
        if (race != 'New Race') {
            if (variant) {
                this.header = 'Bloodline';
                if (variant != 'New Race') {
                    this.race_edits = this.game_data.races[race].variants[variant];
                }else{
                    this.race_edits = utils.system.race_template();
                }
            }else{
                this.race_edits = this.game_data.races[race];
            }
        }else{
            this.race_edits = utils.system.race_template();
        }
        //console.log('DC : Race Editor : constructor :', this.race, this.variant, this.race_edits, tmp.races);
    }
  
    static get defaultOptionsOld() {
        return mergeObject(super.defaultOptions, {
            classes: ['style_doc'],
            popOut: true,
            template: `systems/dc/templates/editor/race-editor.html`,
            id: 'race-editor',
            title: `Editor`,
            width: 500,
            resizable: true,
        });
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
        html.find(".toggle-value").click(this._on_toggle_value.bind(this));
        //Text Inputs
        html.find(".text-change").on('input', this._on_text_change.bind(this));
        //Numerical Inputs
        html.find(".stat-modifier").change(this._on_int_change.bind(this));
        return super.activateListeners(html);
    }

}
  
window.RaceEditor = RaceEditor;