let commands = {
    update: function(pkt) {
        game.user.character.sheet.render(false);
    },
    
}

Hooks.on("ready", () => {
    console.log("HQ | Initializing socket listeners...")
    game.socket.on('system.dc', (data) => {
        if (game.user.id == data.tgt) {
            console.log('RECEIVE:', data);
            if (data.operation in commands) {
                commands[data.operation](data.pkt);
                utils.gm.update_sheet();
                return true;
            }
        }
    });
});