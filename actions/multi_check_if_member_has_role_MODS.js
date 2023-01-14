module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Multi Check If Member has Role MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Conditions",

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
            : `<font style="color:${desccor}">Checar ${data.branches.length == 1 ? data.branches.length + " cargo" : data.branches.length + " cargos"}</font>`
    },

    variableStorage(data, varType) { },

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
        version: '2.1.6',
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

    fields: [
        "member",
        "varName",
        "description",
        "descriptionx",
        "descriptioncolor",
        "info",
        "branches",
        "branch",
        "iffalse",
        "iffalseVal",
    ],

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

  <tab-system>

    <tab label="Condições" icon="list alternate">

    <div style="margin-top: 10px;">

        <span class="dbminputlabel">Caso o membro</span>
        <select id="info" class="round">
            <option value="0">Tenha todos os cargos</option>
            <option value="1">Não tenha todos os cargos</option>
            <option value="2">Tenha um dos cargos</option>
            <option value="3">Não tenha um dos cargos</option>
        </select>

        <br>

        <conditional-input id="branch"></conditional-input>
    </div>

    </tab>

    <tab label="Checks" icon="align left">

        <div style="margin-top: 10px;">

            <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
        
            <br><br><br>
            
            <dialog-list id="branches" fields='["role", "varName"]' dialogResizable dialogTitle="Check" dialogWidth="600" dialogHeight="400" listLabel="Checks" listStyle="height: calc(100vh - 310px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
                
            <div style="margin: 10px;">

                <role-input dropdownLabel="Cargo" selectId="role" variableContainerId="varNameContainer" variableInputId="varName"></role-input>
        
            </div>
            
            </dialog-list>

        </div>

    </tab>

    <tab label="Config" icon="cogs">

        <div id="flutuador" style="padding:0px 0px 15px 0px; margin-top: 10px;">
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

        <div style="float: left; width: 40%;">
            <span class="dbminputlabel">Caso falhe</span>
            <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
                <option value="0" selecionado>Continuar ações</option>
                <option value="1">Parar sequência de ação</option>
                <option value="2">Ir para a ação</option>
                <option value="3">Pular as próximas ações</option>
                <option value="4">Ir para a âncora de ação</option>
            </select>
        </div>

        <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
            <span id="xinelas" class="dbminputlabel">Para</span>
            <br>
            <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
        </div>

    </tab>

  </tab-system>
  `;
    },

    //---------------------------------------------------------------------
    // Action Editor Init Code
    //
    // When the HTML is first applied to the action editor, this code
    // is also run. This helps add modifications or setup reactionary
    // functions for the DOM elements.
    //---------------------------------------------------------------------

    preInit(data, formatters) {
        return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
    },

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

        glob.onComparisonChanged = function (event) {
            if (event.value > "1") {
                document.getElementById("iffalseContainer").style.display = null;
            } else {
                document.getElementById("iffalseContainer").style.display = "none";
            }

            if (event.value == "2") {
                document.querySelector(`[id='xinelas']`).innerText = (`Número da ação`);
            }

            if (event.value == "3") {
                document.querySelector(`[id='xinelas']`).innerText = (`Pular ações`);
            }

            if (event.value == "4") {
                document.querySelector(`[id='xinelas']`).innerText = (`Nome da âncora`);
            }
        }

        glob.onComparisonChanged(document.getElementById("iffalse"));

        glob.formatItem = function (data) {
            let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
            const cargo = parseInt(data.role);

            switch (cargo) {
                case 0:
                    result += "Checar Cargo Mencionado";
                    break;
                case 1:
                    result += "Checar Primeiro Cargo do Autor";
                    break;
                case 2:
                    result += "Checar Primeiro Cargo do Servidor";
                    break;
                case 3:
                    result += `Checar Variável Temporária (${data.varName})`;
                    break;
                case 4:
                    result += `Checar Variável Servidor (${data.varName})`;
                    break;
                case 5:
                    result += `Checar Variável Global (${data.varName})`;
                    break;
                case 6:
                    result += `Checar Parâmetro Cmd. Barra (${data.varName})`;
                    break;
                case 100:
                    result += `Checar Cargo por Nome (${data.varName})`;
                    break;
                case 101:
                    result += `Checar Cargo por ID (${data.varName})`;
                    break;
            }

            result += `</div>`;
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
        const _this = this;
        const info = parseInt(data.info);
        var member = await this.getMemberFromData(data.member, data.varName, cache);
        const memberfind = this.evalMessage(data.member, cache);
        const find = this.evalMessage(data.varName, cache);

        if (memberfind == "100" || memberfind == "101") {

            const server = cache.server;

            if (!server?.members) {
                return this.callNextAction(cache);
            }

            if (server.memberCount !== server.members.cache.size) server.members.fetch();

            const members = server.members.cache;

            if (memberfind == "100") member = members.find((m) => m.user?.username === find);
            if (memberfind == "101") member = members.get(find);
        }


        const branches = data.branches;
        let results = [];
        let resultado = false;

        for (var i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const cargo = await this.getRoleFromData(branch.role, branch.varName, cache);
            let result;

            result = Boolean(member.roles.cache.has(cargo.id));

            results.push(result);
        }

        switch (info) {
            case 0:
                resultado = results.every((r) => r == true);
                break;
            case 1:
                resultado = results.every((r) => r == false);
                break;
            case 2:
                resultado = results.some((r) => r == true);
                break;
            case 3:
                resultado = results.some((r) => r == false);
                break;
        }

        this.executeResults(resultado, data?.branch ?? data, cache);
    },

    //---------------------------------------------------------------------
    // Action Bot Mod
    //
    // Upon initialization of the bot, this code is run. Using the bot's
    // DBM namespace, one can add/modify existing functions if necessary.
    // In order to reduce conflicts between mods, be sure to alias
    // functions you wish to overwrite.
    //---------------------------------------------------------------------

    modInit(data) {
        this.prepareActions(data.branch?.iftrueActions);
        this.prepareActions(data.branch?.iffalseActions);
    },

    mod() { },
};