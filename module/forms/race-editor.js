import BaseEditor from "./base-editor.js"

class RaceEditor extends BaseEditor {
    constructor(header, path, bloodline) {
        super('race', path);
        this.game_data = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.header    = header;
        this.race      = header == 'Bloodline' ? this.game_data[race] : false;
        this.bloodline = bloodline;
        this.edits     = utils.tools.get_path(this.game_data, path) ? utils.tools.get_path(this.game_data, path) : utils.system.race_template();
    }
  
    getData() {
        let data   = super.getData();
        data.title = this.header;
        data.race  = this.edits;
        data.stats = utils.template.entity_template.stats;
        return data;
    }

}
  
window.RaceEditor = RaceEditor;