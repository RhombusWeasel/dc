import BaseEditor from "./base-editor.js"

class RaceEditor extends BaseEditor {
    constructor(header, path) {
        super('race');
        this.game_data   = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.header      = header;
        this.race_edits  = utils.tools.get_path(this.game_data, path) ? utils.tools.get_path(this.game_data, path) : utils.system.race_template();
    }
  
    getData() {
        return {
            title:     this.header,
            race:      this.race_edits,
            stats:     utils.template.entity_template.stats,
        };
    }

}
  
window.RaceEditor = RaceEditor;