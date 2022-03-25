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
        save_system: function() {
            utils.journal.save(game.settings.get('dc', 'system_journal'), utils.game_data);
            utils.gm.update_sheet()
        },
    },
    tools: {
        /** UUID
        * Pass any number of integers, returns a uuid with char blocks equal to each int '-' seperated
        */
        uuid_keys: `0123456789aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ`,
        uuid: function() {
            let str = ''
            for (let a = 0; a < arguments.length; a++) {
                for (let i = 0; i < arguments[a]; i++) {
                    str += utils.tools.uuid_keys[Math.floor(Math.random() * utils.tools.uuid_keys.length)];
                }
                if (a < arguments.length - 1) {
                    str += '-'
                }
            }
            return str
        },
        safe_key: function(str) {
            let list  = str.split(/[^a-z]/i);
            let end   = list.pop();
            let r_str = '';
            for (let i = 0; i < list.length; i++) {
                r_str += list[i].toLowerCase() + '_';
            }
            return r_str + end.toLowerCase();
        },
        path: {
            split: function(path) {
                let list = path.split('.');
                let tgt  = list.pop();
                return {path: list, key: tgt, root: utils.tools.path.join(list)};
            },
            join: function(list) {
                let str = '';
                let end = list.pop();
                for (let i = 0; i < list.length; i++) {
                    str += list[i] + '.';
                }
                return str + end;
            },
            navigate: function(dict, list) {
                let obj  = dict;
                for (let i = 0; i < list.length; i++) {
                    const key = list[i];
                    if (obj?.[key]) {
                        obj = obj[key];
                    }else{
                        return false;
                    }
                }
                return obj;
            },
            set: function(dict, path, value) {
                let addr = utils.tools.path.split(path);
                let obj  = utils.tools.path.navigate(dict, addr.path)
                obj[addr.key] = value;
                return dict;
            },
            get: function(dict, path) {
                let addr = utils.tools.path.split(path);
                let obj  = utils.tools.path.navigate(dict, addr.path)
                return obj ? obj[addr.key] : false;
            },
            delete: function(dict, path) {
                let addr = utils.tools.path.split(path);
                let obj  = utils.tools.path.navigate(dict, addr.path)
                delete obj[addr.key];
                return obj;
            },
        },
        modify_template: function(data, changes) {
            for (const key in changes) {
                if (Object.hasOwnProperty.call(data, key)) {
                    data[key] = changes[key];
                }
            }
            return data;
        },
        apply_template: function(data, changes) {
            for (const key in changes) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const type = typeof(data[key]);
                    if (type == 'number') {
                        data[key] += changes[key];
                    } else {
                        data[key] = changes[key];
                    }
                }
            }
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
                return journal.update({content: JSON.stringify(content, null, 2)});
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
            console.log('DC : socket : EMIT:', op, tgt, data);
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
    },
    system: {
        operations: {
            ensure: function(data, changes) {
                let val = utils.tools.path.get(data, changes.path);
                if (!(val)) {
                    utils.tools.path.set(data, changes.path, changes.value);
                }
                return data;
            },
            modify: function(data, changes) {
                if (changes.action == 'overwrite') return utils.tools.path.set(data, changes.path, changes.value);
                if (changes.action == 'add')       return utils.tools.path.set(data, changes.path, utils.tools.path.get(changes.path) + changes.value);
                if (changes.action == 'subtract')  return utils.tools.path.set(data, changes.path, utils.tools.path.get(changes.path) - changes.value);
                if (changes.action == 'multiply')  return utils.tools.path.set(data, changes.path, utils.tools.path.get(changes.path) * changes.value);
                if (changes.action == 'divide')    return utils.tools.path.set(data, changes.path, utils.tools.path.get(changes.path) / changes.value);
            },
        },
        templates: {
            iterate: function(data, changes) {
                for (let i = 0; i < changes.length; i++) {
                    if (utils.system.operations?.[changes.mode]) utils.system.operations[mode](data, changes);
                }
                return data
            },
            character: function(changes) {
                let char = {};
                utils.system.templates.iterate(char, utils.game_data.templates.entity);
                utils.system.templates.iterate(char, utils.game_data.templates.stats);
                utils.system.templates.iterate(char, utils.game_data.templates.pools);
                utils.system.templates.iterate(char, utils.game_data.templates.skills);
                return char;
            },
            race: function(changes) {
                let char = utils.system.templates.character();
                let stat_bonuses = {};
                for (let i = 0; i < char.stats.length; i++) {
                    stat_bonuses[char.stats[i].key] = 0;
                }
                let data = {
                    label:          'New Race',
                    playable:       false,
                    bloodline:      'None',
                    allow_variants: false,
                    stat_bonuses:   stat_bonuses,
                    descriptions: {
                        main: [''],
                        flavor: [''],
                    },
                    rules: [],
                };
                return utils.tools.modify_template(data, changes);
            },
            class: function(changes) {},
        },
    }
}