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
    get_enemies: function() {
      return canvas.tokens.placeables.filter((i) => {return i.document.actor.type == 'enemy'});
    },
    update_sheet: function() {
      setTimeout(() => {
        game.user.character.sheet.render(false)
        utils.socket.emit('refresh', {});
      }, 1000);
    },
    save_system: function() {
      utils.journal.save(game.settings.get('dc', 'system_journal'), utils.game_data);
      utils.gm.update_sheet();
    },
    package_system: function() {
      let sys = {
        templates: utils.templates,
        game_data: utils.game_data,
      }
      return JSON.stringify(sys);
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
    key_to_label(str) {
      let r_str = '';
      let list = str.split(/[^a-z]/i);
      let end   = list.pop();
      for (let i = 0; i < list.length; i++) {
        let s = list[i];
        r_str += `${s[0].toUpperCase()}${s.slice(1)}` + ' ';
      }
      return r_str + `${end[0].toUpperCase()}${end.slice(1)}`;
    },
    type: function(val) {
      let t = typeof(val)
      if (t != 'object') return t;
      return Array.isArray(val) ? 'list' : 'dict';
    },
    convert_type: function(val) {
      if (parseInt(val)) return parseInt(val);
      if (String(val).toLowerCase() == 'false') return false;
      if (String(val).toLowerCase() == 'true') return true;
      return val;
    },
    deep_copy: function(data) {
      return $.extend(true,{},data);
    },
    path: {
      split: function(path) {
        let lst = path.split('.');
        let tgt = lst.pop();
        let plt = lst[lst.length - 1];
        let rut = utils.tools.path.join(lst);
        lst.push(plt);
        let addr = {path: lst, key: tgt, root: rut};
        return addr;
      },
      join: function(list) {
        let str = '';
        let end = list.pop();
        for (let i = 0; i < list.length; i++) {
          str += list[i] + '.';
        }
        return str + end;
      },
      navigate: function(dict, addr) {
        let obj  = dict;
        if (addr.root == 'undefined') return obj;
        for (let i = 0; i < addr.path.length; i++) {
          const key = addr.path[i];
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
        let obj  = utils.tools.path.navigate(dict, addr);
        obj[addr.key] = value;
        return dict;
      },
      get: function(dict, path) {
        let addr = utils.tools.path.split(path);
        let obj  = utils.tools.path.navigate(dict, addr);
        return obj ? obj[addr.key] : false;
      },
      insert: function(dict, path, value) {
        let addr = utils.tools.path.split(path);
        let obj  = utils.tools.path.navigate(dict, addr);
        obj[addr.key].push(value);
        return dict;
      },
      delete: function(dict, path) {
        let addr = utils.tools.path.split(path);
        let obj  = utils.tools.path.navigate(dict, addr);
        delete obj[addr.key];
        return obj;
      },
    },
    templates: {
      values: {
        string: function(key, value) {
          return {mode: 'ensure', path: key, type: 'string',    value: value};
        },
        number: function(key, value) {
          return {mode: 'ensure', path: key, type: 'int',       value: value};
        },
        boolean: function(key, value) {
          return {mode: 'ensure', path: key, type: 'bool',      value: value};
        },
        list: function(key, value) {
          return {mode: 'ensure', path: key, type: 'new_array', value: value};
        },
        dict: function(key, value) {
          return {mode: 'ensure', path: key, type: 'new_dict',  value: value};
        },
        select: function(key, value) {
          return {mode: 'ensure', path: key, type: 'select', value: value.default, select: value.select, action: 'add'};
        },
      },
      build: function(data) {
        let tmp = [];
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            let t = utils.tools.type(value);
            if (t == 'dict' && value?.select) t = 'select'
            if (utils.tools.templates.values?.[t]) tmp.push(utils.tools.templates.values[t](key, value));
          }
        }
        return tmp
      },
      operations: {
        ensure: function(data, changes) {
          let val = utils.tools.path.get(data, changes.path);
          if (!(val)) {
            let t = utils.tools.type(changes.value);
            if (t == 'dict') {
              //console.log(changes.path);
              data = utils.tools.path.set(data, changes.path, $.extend(true,{},changes.value));
            }else if (t == 'list') {
              data = utils.tools.path.set(data, changes.path, $.extend(true,[],changes.value));
            }else{
              data = utils.tools.path.set(data, changes.path, changes.value);
            }
          }
          return data;
        },
        modifiers: {
          write: function(data, changes) {
            return utils.tools.path.set(data, changes.path, changes.value);
          },
          add: function(data, changes) {
            return utils.tools.path.set(data, changes.path, parseInt(utils.tools.path.get(data, changes.path)) + parseInt(changes.value));
          },
          subtract: function(data, changes) {
            return utils.tools.path.set(data, changes.path, parseInt(utils.tools.path.get(data, changes.path)) - parseInt(changes.value));
          },
          multiply: function(data, changes) {
            return utils.tools.path.set(data, changes.path, parseInt(utils.tools.path.get(data, changes.path)) * parseInt(changes.value));
          },
          divide: function(data, changes) {
            return utils.tools.path.set(data, changes.path, parseInt(utils.tools.path.get(data, changes.path)) / parseInt(changes.value));
          },
          insert: function(data, changes) {
            return utils.tools.path.insert(data, changes.path, changes.value);
          },
          modify_pool: function(data, changes) {
            let pool = utils.tools.path.get(data, changes.path);
            if (changes.value > 0 && pool.value + changes.value > pool.max) {
              return utils.tools.path.set(data, `${changes.path}.value`, pool.max);
            }else{
              return utils.tools.path.set(data, `${changes.path}.value`, pool.value + changes.value);
            }
          },
        },
        modify: function(data, changes) {
          return utils.tools.templates.operations.modifiers?.[changes.action] ? utils.tools.templates.operations.modifiers[changes.action](data, changes) : false;
        },
        checks: {
          '==': function(data, changes) {
            return utils.tools.path.get(data, changes.path) == changes.target ? true : false;
          },
          '!=': function (data, changes) {
            return utils.tools.path.get(data, changes.path) != changes.target ? true : false;
          },
          '<': function (data, changes) {
            return utils.tools.path.get(data, changes.path)  < changes.target ? true : false;
          },
          '<=': function (data, changes) {
            return utils.tools.path.get(data, changes.path) <= changes.target ? true : false;
          },
          '>': function (data, changes) {
            return utils.tools.path.get(data, changes.path)  > changes.target ? true : false;
          },
          '>=': function (data, changes) {
            return utils.tools.path.get(data, changes.path) >= changes.target ? true : false;
          },
          full_pool: function (data, changes) {
            let pool = utils.tools.path.get(data, changes.path)
            return pool.value == pool.max ? true : false;
          },
        },
        check: function(data, changes) {
          return utils.tools.templates.operations.checks?.[changes.action] ? utils.tools.templates.operations.checks[changes.action](data, changes) : false;
        },
      },
      requirements: {
        operations: {
          class_level: function(data) {
            return {mode: 'check', action: data.action, path: `${data.path}.value`, target: data.target}
          },
          pool_full: function(data) {
            return {mode: 'check', action: 'full_pool', path: data.path}
          }
        },
        convert: function(data){
          return utils.tools.templates.requirements.operations?.[data.type] ? utils.tools.templates.requirements.operations[data.type](data) : false;
        },
      },
      modifiers: {
        operations: {
          stat: function(data) {
            return {mode: 'modify', action: 'add', path: `${data.path}.value`, trigger: data.trigger, value: data.value, label: data.label, descriptions: data.descriptions, image: data.image};
          },
          point: function(data) {
            return {mode: 'modify', action: 'add', path: data.path, value: data.value, label: data.label, descriptions: data.descriptions, image: data.image};
          },
          skill: function(data) {
            return {mode: 'modify', action: 'add', path: `${data.path}.value`, trigger: data.trigger, value: data.value, label: data.label, descriptions: data.descriptions, image: data.image};
          },
          activate_pool: function(data) {
            return {mode: 'modify', action: 'write', path: `${data.path}.active`, value: true, label: data.label, descriptions: data.descriptions};
          },
          modify_pool: function(data) {
            return {mode: 'modify', action: 'modify_pool', path: data.path, trigger: data.trigger, value: data.value, label: data.label, descriptions: data.descriptions, image: data.image};
          },
          increase_pool: function(data) {
            return {mode: 'modify', action: 'add', path: `${data.path}.max`, trigger: data.trigger, value: data.value, label: data.label, descriptions: data.descriptions, image: data.image};
          },
          ability: function(data) {
            return {mode: 'ensure', path: data.trigger, label: data.label, descriptions: data.descriptions, image: data.image};
          },
        },
        convert: function(data) {
          //console.log('Convert modifier: ', data);
          return utils.tools.templates.modifiers.operations?.[data.type] ? utils.tools.templates.modifiers.operations[data.type](data) : false;
        },
      },
      iterate: function(data, changes) {
        let data_type = utils.tools.type(changes);
        //console.log('DC : utils.templates.iterate : ', data_type, data, changes);
        if (data_type == 'list') {
          for (let i = 0; i < changes.length; i++) {
            const change = changes[i];
            if(change?.trigger && change.trigger != 'triggers.once') {
              console.log('Adding modifier', change.label, ' to ', change.trigger, change);
              utils.tools.path.set(data, `${change.trigger}.data.${utils.tools.safe_key(change.label)}`, change);
              if (change?.expires_when) utils.tools.path.set(data, `expiry.${utils.tools.path.split(change.expires_when).key}.data.${utils.tools.safe_key(change.label)}`, change);
            }else{
              console.log('Applying modifier', change.label, change);
              if (utils.tools.templates.operations?.[change.mode]) utils.tools.templates.operations[change.mode](data, change);
            }
          }
        }else if (data_type == 'dict') {
          for (const key in changes) {
            if (Object.hasOwnProperty.call(changes, key)) {
              const change = changes[key];
              if(change?.trigger && change.trigger != 'triggers.once') {
                console.log('Adding modifier', change.label, ' to ', change.trigger, change);
                utils.tools.path.set(data, `${change.trigger}.data.${utils.tools.safe_key(change.label)}`, change);
                if (change?.expires_when) utils.tools.path.set(data, `expiry.${utils.tools.path.split(change.expires_when).key}.data.${utils.tools.safe_key(change.label)}`, change);
              }else{
                console.log('Applying modifier', change.label, change);
                if (utils.tools.templates.operations?.[change.mode]) utils.tools.templates.operations[change.mode](data, change);
              }
            }
          }
        }
        return data;
      },
      apply: function(data, changes) {
        let data_type = utils.tools.type(changes);
        //console.log('DC : utils.templates.apply : ', data_type, data, changes);
        if (data_type == 'list') {
          for (let i = 0; i < changes.length; i++) {
            const change = changes[i];
            if (utils.tools.templates.operations?.[change.mode]) utils.tools.templates.operations[change.mode](data, change);
          }
        }else if (data_type == 'dict') {
          for (const key in changes) {
            if (Object.hasOwnProperty.call(changes, key)) {
              const change = changes[key];
              if (utils.tools.templates.operations?.[change.mode]) utils.tools.templates.operations[change.mode](data, change);
            }
          }
        }
        return data;
      },
      modify: function(data, changes) {
        for (const key in changes) {
          if (Object.hasOwnProperty.call(data, key)) {
            data[key] = changes[key];
          }
        }
        return data;
      },
    },
  },
  act: {
    get: function(name) {
        return game.actors.getName(name);
    },
    get_token: function(act) {
      let tkn = canvas.tokens.placeables.find(i => i.document.actor.id == act.id);
      if (tkn) return tkn;
      return false;
    },
    add: function(act, path, data) {
        act.update({[path]: data});
    },
    add_item: function(act, goods, item) {
        let gear = utils.game_data[goods][item]
        if (!(act.data.data.inventory?.[goods])) act.data.data.inventory[goods] = {};
        if (act.data.data.inventory[goods]?.[item]) {
            act.data.data.inventory[goods][item].amount += 1;
        }else{
            act.data.data.inventory[goods][item] = $.extend(true,{},gear);
        }
    },
    buy_item: function(act, goods, item) {
        let gear = utils.game_data[goods][item];
        act.data.data.currency -= gear.cp_cost;
        utils.act.add_item(act, goods, item);
    },
    add_spell: function(act, school, spell) {
      act.data.data.spells[school][spell].active = true
    },
    buy_spell: function(act, school, spell) {
      let sp = utils.game_data.spells[school][spell];
      act.data.data.points.spell.value -= sp.sp_cost;
      utils.act.add_spell(act, school, spell);
    },
    cast_spell: function(act, school, spell) {
      let sp = utils.game_data.spells[school][spell];
      act.data.data.pools.ap.value -= 3;
      act.data.data.pools.mana.value -= sp.mp_cost;
      let result = utils.act.skill_roll(act, 'arcane_lore', ['on_cast']);
      utils.chat.send(act.name, `${act.name} casts ${sp.label}!`, sp.descriptions.main[0]);
      return result;
    },
    equip_item: function(act, goods, item) {
      let path  = `equipment.${goods}`
      let val   = utils.tools.path.get(act.data.data, path) != item ? item : 'None';
      utils.tools.path.set(act.data.data, path, val);
      let itm = utils.game_data?.[goods]?.[item] ? utils.game_data[goods][item] : {};
      if (itm?.emits_light && itm.emits_light) {
        let tkn = utils.act.get_token(act);
        if (tkn) {
          if (val != 'None'){
            tkn.document.update({light: itm.light});
          }else{
            tkn.document.update({light: {bright: 0, dim: 0}});
          }
        }
      }
    },
    skill_roll: function(act, skill, triggers, target) {
      //console.log(act, skill, triggers);
      triggers = triggers ? triggers : []
      target   = target   ? target   : game.settings.get('dc', "difficulty");
      var mods = act.data.data.triggers.always.data;
      var char = utils.tools.templates.apply(act.data.data, mods);
      for (let t = 0; t < triggers.length; t++) {
        mods = act.data.data.triggers[triggers[t]].data;
        char = utils.tools.templates.apply(act.data.data, mods);
      }
      let sk   = char.skills[skill];
      let st   = char.stats[sk.stat];
      let roll = new Roll(`${st.value}d10cs>=${6 - sk.value}`);
      roll.roll({async: false});
      roll.toMessage({
        speaker: {
          alias: act.name,
        },
        flavor: `${sk.label} roll`,
      });
      return roll.total;
    },
    drink_potion: function(act, potion) {
      let pot = act.data.data.inventory.potions[potion];
      pot.amount -= 1;
      utils.tools.templates.apply(act.data.data, pot.modifiers);
      utils.chat.send(act.name, `${act.name} uses a ${pot.label}!`, pot.descriptions.main[0]);
    },
    modify_pool: function(act, pool, value) {
      if (!(act.data.data.pools?.[pool])) return false;
      let cur = act.data.data.pools[pool].value;
      let max = act.data.data.pools[pool].max;
      act.data.data.pools[pool].value = cur + value > max ? max : cur + value
    },
    get_equipment: function(act, type) {
      let item = act.data.data.equipment[type]
      if (item == 'None') return false;
      return act.data.data.inventory[type][item]
    },
    block: function(act) {
      let buff = act.data.data.stats.buff.value;
      let chk  = utils.act.get_equipment(act, 'armour');
      let av   = chk ? chk.armour_value : 0;
      let roll = new Roll(`${buff}d10cs>=${6 - av}`);
      roll.roll({async: false});
      roll.toMessage({
        speaker: {
          alias: act.name,
        },
        flavor: `Block roll`,
      });
      return roll.total;
    }
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
    clone: function(type, changes) {
      let data = utils.tools.path.get(utils.game_data, type);
      //console.log('clone item: ', type, data, changes);
      return utils.tools.templates.modify($.extend(true,{},data), changes);
    },
    new: {
      entity: function() {
        var e = utils.system.clone('entity', {});
        for (const key in e) {
          if (Object.hasOwnProperty.call(e, key)) {
            if (utils.game_data[key]) {
              e[key] = utils.system.clone(key, {});
            }
          }
        }
        return e;
      },
      modifier: function(index, changes) {
        let mod = $.extend(true,{},utils.game_data.modifiers[index]);
        return utils.tools.templates.modify(mod, changes);
      }
    },
  },
  template: {

  },
}