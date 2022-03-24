import BaseEditor from "./base-editor.js"

class RaceEditor extends BaseEditor {
    constructor(header, path, bloodline) {
        bloodline = bloodline ? bloodline : 'None';
        super('race', 'races', path);
        this.game_data       = utils.journal.load(game.settings.get('dc', 'system_journal'));
        this.header          = header;
        this.edits           = utils.tools.get_path(this.game_data, `races.${path}`) ? utils.tools.get_path(this.game_data, `races.${path}`) : utils.system.templates.race({bloodline: bloodline});
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