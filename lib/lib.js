utils = {
    gm: {
        get_online_users: function() {
            return game.users.contents.filter(function(i) {return i.active});
        },
        get_player_owned_actors: function() {
            return game.actors.contents.filter(function(i) {return i.hasPlayerOwner && i.type == 'hero'});
        },
        get_online_actors: function(act) {
            let users = utils.gm.get_online_users();
            let pcs   = utils.gm.get_player_owned_actors();
            let r_tab = []
            for (let i = 0; i < users.length; i++) {
                if (!(users[i].isGM)) {
                    for (let p = 0; p < pcs.length; p++) {
                        let char = pcs[p];
                        if ('permission' in char.data && users[i].id in char.data.permission) {
                            r_tab.push(char);
                        }
                    }
                }
            }
            return r_tab;
        },
        update_sheet: function() {
            setTimeout(() => {
                game.user.character.sheet.render(false)
                utils.socket.emit('refresh', {});
            }, 1000);
        },
    },
    act: {
        add: function(act, path, data) {
            act.update({[path]: data});
        },
    },
    chat: {
        send: function(alias, title) {
            let sheet = `
                <h3 class="center typed">${title}</h3>
            `;
            for (let i = 2; i < arguments.length; i++) {
                sheet += `
                <p class="center typed">${arguments[i]}</p>
                `;
            }
            ChatMessage.create({
                speaker: {
                    alias: alias,
                },
                content: sheet,
            });
        },
    },
    text: {
        /** PLURALIZE
        * @param {INT} amt The numerical value to check against
        * @param {STR} a The Singular version
        * @param {STR} b The Plural version
        * @returns STR The singular or Plural provided as a and b
        */
        pluralize: function(amt, a, b) {
            if (amt == 1) return `${amt} ${a}`;
            return `${amt} ${b}`
        },
    },
    journal: {
        new_data: function(name, content) {
            return JournalEntry.create({
                name: name,
                content: JSON.stringify(content)
            });
        },
        load: function(name, content) {
            let journal = game.journal.getName(name);
            if (journal) {
                return JSON.parse(journal.data.content);
            }else{
                utils.journal.new_data(name, content);
                return content;
            }
        },
        save: function(name, content) {
            let journal = game.journal.getName(name);
            if (journal) {
                return journal.update({content: JSON.stringify(content)});
            } else {
                return utils.journal.new_data(name, content);
            }
        },
    },
    socket: {
        /** EMIT
         * @param {STR} op    The operation to be called by the GM player
         * @param {STR} tgt   The player the message is for
         * @param {*}   data  Any piece of data that needs to be sent
         * Gathers data about the sender to pass over the socket connection to the specified user
         */
        emit: function(op, tgt, data) {
            console.log('EMIT:', op, tgt, data);
            game.socket.emit("system.dc", {
                operation: op,
                tgt: tgt,
                pkt: {
                    sender: {
                        user: {
                            id: game.user.id,
                            name: game.user.name,
                        },
                        character: {
                            id: game.user.character.id,
                            name: game.user.character.name,
                        },
                    },
                    data: data,
                }
            });
        }
    }
}