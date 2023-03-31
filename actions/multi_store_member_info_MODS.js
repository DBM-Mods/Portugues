module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Multi Store Member Info MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Member Control",

    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------

    subtitle(data, presets) {
        if (data.descriptionx) {
            desccor = data.descriptioncolor;
        } else {
            desccor = "none";
        }

        return data.description
            ? `<font style="color:${desccor}">${data.description}</font>`
            : `<font style="color:${desccor}">Obter ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}</font>`
    },

    variableStorage(data, varType) {
        let vars = [];

        for (var i = 0; i < data.branches.length; i++) {
            const type = parseInt(data.branches[i].storage, 10);
            const varName = data.branches[i].varName;

            if (type == varType && varName) {
                let tipo;

                switch (parseInt(data.branches[i].info)) {
                    case 0:
                        tipo = "Membro do servidor";
                        break;
                    case 1:
                        tipo = "ID";
                        break;
                    case 2:
                        tipo = "Texto";
                        break;
                    case 3:
                        tipo = "Texto";
                        break;
                    case 4:
                        tipo = "Texto";
                        break;
                    case 5:
                        tipo = "Texto";
                        break;
                    case 6:
                        tipo = "Texto";
                        break;
                    case 7:
                        tipo = "Cargo";
                        break;
                    case 8:
                        tipo = "Cargo";
                        break;
                    case 9:
                        tipo = "Cargo";
                        break;
                    case 10:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 11:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 12:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 13:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 14:
                        tipo = "Texto";
                        break;
                    case 15:
                        tipo = "Texto";
                        break;
                    case 16:
                        tipo = "URL"
                        break;
                    case 17:
                        tipo = "Lista";
                        break;
                    case 18:
                        tipo = "Número";
                        break;
                    case 19:
                        tipo = "Canal";
                        break;
                    case 20:
                        tipo = "Número";
                        break;
                    case 21:
                        tipo = "Texto";
                        break;
                    case 22:
                        tipo = "Data";
                        break;
                    case 23:
                        tipo = "Timestamp";
                        break;
                    case 24:
                        tipo = "Data";
                        break;
                    case 25:
                        tipo = "Timestamp";
                        break;
                    case 26:
                        tipo = "ID";
                        break;
                    case 27:
                        tipo = "Lista";
                        break;
                    case 28:
                        tipo = "Lista";
                        break;
                    case 29:
                        tipo = "Texto";
                        break;
                    case 30:
                        tipo = "Texto";
                        break;
                    case 31:
                        tipo = "URL";
                        break;
                    case 32:
                        tipo = "Data";
                        break;
                    case 33:
                        tipo = "Timestamp";
                        break;
                    case 34:
                        tipo = "URL";
                        break;
                    case 35:
                        tipo = "ID";
                        break;
                    case 36:
                        tipo = "Timestamp";
                        break;
                }

                vars.push(varName);
                vars.push(tipo);
            }
        }

        if (vars.length > 0) {
            return vars;
        }
    },

    //---------------------------------------------------------------------
    // Action Meta Data
    //
    // Helps check for updates and provides info if a custom mod.
    // If this is a third-party mod, please set "author" and "authorUrl".
    //
    // It's highly recommended "preciseCheck" is set to false for third-party mods.
    // This will make it so the patch version (0.0.X) is not checked.
    //---------------------------------------------------------------------

    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    //---------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------

    fields: ["member", "varName", "description", "descriptionx", "descriptioncolor", "branches"],

    //---------------------------------------------------------------------
    // Command HTML
    //
    // This function returns a string containing the HTML used for
    // editing actions.
    //
    // The "isEvent" parameter will be true if this action is being used
    // for an event. Due to their nature, events lack certain information,
    // so edit the HTML to reflect this.
    //---------------------------------------------------------------------

    html(isEvent, data) {
        return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

  <style>
    .dbmmodsbr1 {
      position: absolute;
      bottom: 0px;
      border: 0px solid rgba(50,50,50,0.7);
      background: rgba(0,0,0,0.7);
      color: #999;
      padding: 5px;
      left: 0px;
      z-index: 999999;
      cursor: pointer;
    }

    .dbmmodsbr2 {
      position: absolute;
      bottom: 0px;
      border: 0px solid rgba(50,50,50,0.7);
      background: rgba(0,0,0,0.7);
      color: #999;
      padding: 5px;
      right: 0px;
      z-index: 999999;
      cursor: pointer;
    }
  </style>

  <div id="flutuador" style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
        <td>
        <span class="dbminputlabel">Descrição da Action</span>
        <br>
        <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
        </td>
        <td style="padding:0px 0px 0px 10px;width:70px">
        <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px">
            <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
        </div>
        <br>
        <input type="color" value="#ffffff" class="round" id="descriptioncolor">
        </td>
    </table>
  </div>
  
  <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
  
  <br><br><br>
  
  <dialog-list id="branches" fields='["info", "storage", "varName"]' dialogResizable dialogTitle="Store" dialogWidth="600" dialogHeight="400" listLabel="Stores" listStyle="height: calc(100vh - 320px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
        
    <div style="margin: 10px;">

        <span class="dbminputlabel">Informações</span>
        <select id="info" class="round">
            <option value="0" selecionado>Objeto Membro</option>
            <option value="1">ID do membro</option>
            <option value="2">Nome de usuário do membro</option>
            <option value="3">Nome de exibição do membro [Apelido]</option>
            <option value="21">Tag do membro</option>
            <option value="20">Discriminador do membro</option>
            <option value="4">Cor do membro</option>
            <option value="15">Status de membro</option>
            <option value="16">URL do avatar do membro</option>
            <option value="34">URL do banner do membro</option>
            <option value="31">URL do Avatar do Servidor do Membro</option>
            <option value="5">Nome do Servidor do membro</option>
            <option value="35">ID do servidor do membro</option>
            <option value="6">Última mensagem do membro (removida)</option>
            <option value="26">ID da última mensagem do membro (removido)</option>
            <option value="7">Cargo mais alto do membro</option>
            <option value="8">Cargo de elevação do membro</option>
            <option value="9">Cargo de cor do membro</option>
            <option value="17">Lista de cargos do membro</option>
            <option value="18">Quantidade de cargos do membro</option>
            <option value="10">O membro é proprietário?</option>
            <option value="11">O membro está silenciado?</option>
            <option value="12">O membro está surdo?</option>
            <option value="13">O membro pode ser banido?</option>
            <option value="14">Nome do status de jogo do membro</option>
            <option value="30">Status personalizado do membro</option>
            <option value="19">Canal de voz do membro</option>
            <option value="22">Conta do membro criada em</option>
            <option value="23">Timestamp da conta criada pelo membro</option>
            <option value="24">Membro entrou no servidor em</option>
            <option value="25">Timestamp do membro que entrou no servidor</option>
            <option value="27">Lista de permissões do membro</option>
            <option value="28">Lista de badges do membro</option>
            <option value="29">Status do cliente membro [Web ou Mobile]</option>
            <option value="32">Tempo esgotado do membro em</option>
            <option value="33">Timestamp do membro expirado</option>
            <option value="36">Timestamp do Impulso do Membro</option>
        </select>
  
        <br>
  
        <div style="float: left; width: 35%;">
            <span class="dbminputlabel">Armazenar em</span>
            <select id="storage" class="round">
                ${data.variables[1]}
            </select>
        </div>
  
        <div style="float: right; width: 60%;">
            <span class="dbminputlabel">Nome da Variável</span>
            <input id="varName" class="round" type="text">
        </div>

    </div>
  </dialog-list>
  `;
    },

    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------

    init() {
        const { glob, document } = this;

        const xinelaslinks = document.getElementsByClassName("xinelaslink");
        for (let x = 0; x < xinelaslinks.length; x++) {
            const xinelaslink = xinelaslinks[x];
            const url = xinelaslink.getAttribute('data-url');
            if (url) {
                xinelaslink.setAttribute('title', url);
                xinelaslink.addEventListener('click', (e) => {
                    e.stopImmediatePropagation();
                    console.log(`Launching URL: [${url}] in your default browser.`);
                    require('child_process').execSync(`start ${url}`);
                });
            }
        }

        glob.formatItem = function (data) {
            let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
            const info = parseInt(data.info);
            const storage = ["Easter Egg", "Variável Temporária", "Variável Servidor", "Variável Global"];

            switch (info) {
                case 0:
                    result += "Objeto Membro";
                    break;
                case 1:
                    result += "ID do Membro";
                    break;
                case 2:
                    result += "Nome de usuário do membro";
                    break;
                case 3:
                    result += "Nome de exibição do membro [Apelido]";
                    break;
                case 4:
                    result += "Cor do membro";
                    break;
                case 5:
                    result += "Nome do Servidor do membro";
                    break;
                case 6:
                    result += "Última mensagem do membro (removida)";
                    break;
                case 7:
                    result += "Cargo mais alto do membro";
                    break;
                case 8:
                    result += "Cargo de elevação do membro";
                    break;
                case 9:
                    result += "Cargo de cor do membro";
                    break;
                case 10:
                    result += "O membro é proprietário?";
                    break;
                case 11:
                    result += "O membro está silenciado?";
                    break;
                case 12:
                    result += "O membro está surdo?";
                    break;
                case 13:
                    result += "O membro pode ser banido?";
                    break;
                case 14:
                    result += "Nome do status de jogo do membro";
                    break;
                case 15:
                    result += "Status de membro";
                    break;
                case 16:
                    result += "URL do avatar do membro";
                    break;
                case 17:
                    result += "Lista de cargos do membro";
                    break;
                case 18:
                    result += "Quantidade de cargos do membro";
                    break;
                case 19:
                    result += "Canal de voz do membro";
                    break;
                case 20:
                    result += "Discriminador do membro";
                    break;
                case 21:
                    result += "Tag do membro";
                    break;
                case 22:
                    result += "Conta do membro criada em";
                    break;
                case 23:
                    result += "Timestamp da conta criada pelo membro";
                    break;
                case 24:
                    result += "Membro entrou no servidor em";
                    break;
                case 25:
                    result += "Timestamp do membro que entrou no servidor";
                    break;
                case 26:
                    result += "ID da última mensagem do membro (removido)";
                    break;
                case 27:
                    result += "Lista de permissões do membro";
                    break;
                case 28:
                    result += "Lista de badges do membro";
                    break;
                case 29:
                    result += "Status do cliente membro [Web ou Mobile]";
                    break;
                case 30:
                    result += "Status personalizado do membro";
                    break;
                case 31:
                    result += "URL do Avatar do Servidor do Membro";
                    break;
                case 32:
                    result += "Tempo esgotado do membro em";
                    break;
                case 33:
                    result += "Timestamp do membro expirado";
                    break;
                case 34:
                    result += "URL do banner do membro";
                    break;
                case 35:
                    result += "ID do servidor do membro";
                    break;
                case 36:
                    result += "Timestamp do Impulso do Membro";
                    break;
            }

            result += ` > ${storage[parseInt(data.storage, 10)]} (${data.varName}) </div>`;
            return result;
        };
    },

    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------

    async action(cache) {
        const data = cache.actions[cache.index];
        const member = await this.getMemberFromData(data.member, data.varName, cache);

        const branches = data.branches;

        for (var i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const info = parseInt(branch.info);
            let result;

            switch (info) {
                case 0:
                    result = member;
                    break;
                case 1:
                    result = member.id;
                    break;
                case 2:
                    result = member.user?.username ?? member.username;
                    break;
                case 3:
                    result = member.displayName;
                    break;
                case 4:
                    result = member.displayHexColor;
                    break;
                case 5:
                    result = member.guild;
                    break;
                case 7:
                    result = member.roles.highest;
                    break;
                case 8:
                    result = member.roles.hoist;
                    break;
                case 9:
                    result = member.roles.color;
                    break;
                case 10:
                    result = member.id === member.guild?.ownerId;
                    break;
                case 11:
                    result = member.voice.mute;
                    break;
                case 12:
                    result = member.voice.deaf;
                    break;
                case 13:
                    result = member.bannable;
                    break;
                case 14:
                    if (member.presence?.activities.length) {
                        const status = member.presence.activities.filter((s) => s.type !== "CUSTOM");
                        result = status[0]?.name;
                    }
                    break;
                case 15:
                    if (member.presence?.status) {
                        const status = member.presence.status;
                        switch (status) {
                            case "online": { result = "Online"; break; }
                            case "offline": { result = "Offline"; break; }
                            case "idle": { result = "Ausente"; break; }
                            case "dnd": { result = "Ocupado"; break; }
                        }
                    }
                    break;
                case 16:
                    if (member.user) {
                        result = member.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
                    } else {
                        result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
                    }
                    break;
                case 17:
                    result = [...member.roles.cache.values()];
                    break;
                case 18:
                    result = member.roles.cache.size;
                    break;
                case 19:
                    result = member.voice.channel;
                    break;
                case 20:
                    result = member.user?.discriminator ?? member.discriminator;
                    break;
                case 21:
                    result = member.user?.tag ?? member.tag;
                    break;
                case 22:
                    result = member.user?.createdAt ?? member.createdAt;
                    break;
                case 23:
                    result = member.user?.createdTimestamp ?? member.createdTimestamp;
                    break;
                case 24:
                    result = member.joinedAt;
                    break;
                case 25:
                    result = member.joinedTimestamp;
                    break;
                case 27:
                    result = member.permissions.toArray();
                    break;
                case 28:
                    if (member.user) {
                        result = member.user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray();
                    } else {
                        result = member.flags.toArray();
                    }
                    break;
                case 29:
                    const status = member.presence?.clientStatus;
                    result = status && Object.keys(status);
                    break;
                case 30:
                    result = member.presence?.activities.find((s) => s.type === "CUSTOM")?.state;
                    break;
                case 31:
                    if (member.user) {
                        result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
                    }
                    break;
                case 32:
                    result = member.communicationDisabledUntil;
                    break;
                case 33:
                    result = member.communicationDisabledUntilTimestamp;
                    break;
                case 34:
                    const user = await member.user.fetch();
                    result = member.user.bannerURL({ format: "png", size: 4096, dynamic: true });
                    break;
                case 35:
                    result = member.guild.id;
                    break;
                case 36:
                    result = member.premiumSinceTimestamp;
                    break;
            }

            const varName = this.evalMessage(branch.varName, cache);
            const storage = parseInt(branch.storage, 10);
            this.storeValue(result, storage, varName, cache);
        }

        this.callNextAction(cache);
    },

    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflicts between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------

    mod() { },
};