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
        set_path: function(dict, path, value) {
            let list = path.split('.');
            let tgt  = list.pop();
            let obj  = dict;
            for (let i = 0; i < list.length; i++) {
                const key = list[i];
                if (obj?.[key]) {
                    obj = obj[key];
                }else{
                    throw new Error('Specified key not found. ' + list[i]);
                }
            }
            obj[tgt] = value;
        },
        get_path: function(dict, path) {
            let list = path.split('.');
            let tgt  = list.pop();
            let obj  = dict;
            for (let i = 0; i < list.length; i++) {
                const key = list[i];
                if (obj?.[key]) {
                    obj = obj[key];
                }else{
                    return false;
                }
            }
            return obj[tgt];
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
        templates: {
            character: function(changes) {
                let max_stat = 5;
                return {
                    race: 'None',
                    classes: {},
                    stat_points: 5,
                    feat_points: 0,
                    spell_points: 0,
                    stats: {
                        str: {
                            label: 'Butch',
                            key: 'str',
                            value: 2,
                            max: max_stat,
                        },
                        dex: {
                            label: 'Spry',
                            key: 'dex',
                            value: 2,
                            max: max_stat,
                        },
                        con: {
                            label: 'Buff',
                            key: 'con',
                            value: 2,
                            max: max_stat,
                        },
                        cha: {
                            label: 'Suave',
                            key: 'cha',
                            value: 2,
                            max: max_stat,
                        },
                        int: {
                            label: 'Brainy',
                            key: 'int',
                            value: 2,
                            max: max_stat,
                        },
                        wis: {
                            label: 'Sage',
                            key: 'wis',
                            value: 2,
                            max: max_stat,
                        },
                    },
                    pools: {
                        health: {
                            label: 'HP',
                            key: 'hp',
                            value: 'calculated',
                            formula: '5 + con',
                        },
                        mana: {
                            label: 'MP',
                            key: 'mp',
                            value: 'calculated',
                            formula: '5 + int + wis',
                        },
                    },
                    skills: {},
                };
            },
            race: function(changes) {
                let char = utils.system.templates.character();
                let stat_bonuses = [];
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
        },
    }
}