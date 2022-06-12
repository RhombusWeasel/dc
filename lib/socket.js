let commands = {
    //SYSTEM COMMANDS:
    request_system: function(pkt) {
        utils.socket.emit('load_system', pkt.sender.user.id, utils.gm.package_system());
    },
    load_system: function(pkt) {
        let sys = JSON.parse(pkt.data);
        utils.templates = sys.templates;
        utils.game_data = sys.game_data;
    },
    update_sheet: function(pkt) {
        game.user.character.sheet.render(false);
    },
    new_round: function(pkt) {
        let my_chars = game.actors.filter((a) => {return a.isOwner});
        for (let i = 0; i < my_chars.length; i++) {
            let char = my_chars[i];
            setTimeout(() => {
                utils.tools.templates.apply(char.data.data, char.data.data.triggers.round_start.data);
                char.data.data.pools.ap.value = char.data.data.pools.ap.max;
                char.update({data: char.data.data});
            }, Math.random() * 1000);
        }
    },
}

function run_command(op, pkt) {
    if (op in commands) {
        commands[op](pkt);
    }
}

Hooks.on("ready", () => {
    console.log("DC : socket : Initializing socket listeners...")
    game.socket.on('system.dc', (data) => {
        console.log('DC : socket : RECEIVE:', data);
        if (data.tgt == 'GM' && game.user.isGM) {
            run_command(data.operation, data.pkt);
        }else{
            if (game.user.id == data.tgt || data.tgt == 'all') {
                run_command(data.operation, data.pkt);
            }
        }
    });
});