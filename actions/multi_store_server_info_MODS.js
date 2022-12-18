module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Multi Store Server Info MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Server Control",

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
                        tipo = "Servidor";
                        break;
                    case 1:
                        tipo = "ID Servidor";
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
                        tipo = "Icon URL";
                        break;
                    case 6:
                        tipo = "Texto";
                        break;
                    case 7:
                        tipo = "Canal";
                        break;
                    case 8:
                        tipo = "Canal";
                        break;
                    case 9:
                        tipo = "Canal";
                        break;
                    case 10:
                        tipo = "Cargo";
                        break;
                    case 11:
                        tipo = "Membro do Servidor";
                        break;
                    case 12:
                        tipo = "Membro do Servidor";
                        break;
                    case 13:
                        tipo = "Lista";
                        break;
                    case 14:
                        tipo = "Lista";
                        break;
                    case 15:
                        tipo = "Lista";
                        break;
                    case 16:
                        tipo = "Lista";
                        break;
                    case 17:
                        tipo = "Número";
                        break;
                    case 18:
                        tipo = "Data";
                        break;
                    case 19:
                        tipo = "Número";
                        break;
                    case 20:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 21:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 22:
                        tipo = "Data";
                        break;
                    case 23:
                        tipo = "Número";
                        break;
                    case 24:
                        tipo = "Número";
                        break;
                    case 25:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 26:
                        tipo = "Número";
                        break;
                    case 27:
                        tipo = "Número";
                        break;
                    case 28:
                        tipo = "Número";
                        break;
                    case 29:
                        tipo = "Número";
                        break;
                    case 30:
                        tipo = "Número";
                        break;
                    case 31:
                        tipo = "Lista";
                        break;
                    case 32:
                        tipo = "Lista";
                        break;
                    case 33:
                        tipo = "Lista";
                        break;
                    case 35:
                        tipo = "Número";
                        break;
                    case 37:
                        tipo = "Número";
                        break;
                    case 38:
                        tipo = "Número";
                        break;
                    case 39:
                        tipo = "Número";
                        break;
                    case 40:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 41:
                        tipo = "Lista";
                        break;
                    case 42:
                        tipo = "Lista";
                        break;
                    case 43:
                        tipo = "Texto";
                        break;
                    case 44:
                        tipo = "Número";
                        break;
                    case 45:
                        tipo = "Número";
                        break;
                    case 46:
                        tipo = "Banner URL";
                        break;
                    case 47:
                        tipo = "Lista";
                        break;
                    case 48:
                        tipo = "ID";
                        break;
                    case 49:
                        tipo = "Texto";
                        break;
                    case 50:
                        tipo = "ID";
                        break;
                    case 51:
                        tipo = "ID";
                        break;
                    case 52:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 53:
                        tipo = "Texto";
                        break;
                    case 54:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 55:
                        tipo = "Canal";
                        break;
                    case 56:
                        tipo = "ID";
                        break;
                    case 57:
                        tipo = "Canal";
                        break;
                    case 58:
                        tipo = "ID";
                        break;
                    case 59:
                        tipo = "Texto";
                        break;
                    case 60:
                        tipo = "Texto";
                        break;
                    case 61:
                        tipo = "Timestamp";
                        break;
                    case 62:
                        tipo = "URL";
                        break;
                    case 63:
                        tipo = "Código";
                        break;
                    case 64:
                        tipo = "Texto";
                        break;
                    case 65:
                        tipo = "Texto";
                        break;
                    case 66:
                        tipo = "Número";
                        break;
                    case 67:
                        tipo = "ID";
                        break;
                    case 68:
                        tipo = "Timestamp";
                        break;
                    case 69:
                        tipo = "Timestamp";
                        break;
                    case 70:
                        tipo = "Número";
                        break;
                    case 71:
                        tipo = "Lista";
                        break;
                    case 72:
                        tipo = "Lista";
                        break;
                    case 73:
                        tipo = "Lista";
                        break;
                    case 74:
                        tipo = "Lista";
                        break;
                    case 75:
                        tipo = "Lista";
                        break;
                    case 76:
                        tipo = "Lista";
                        break;
                    case 77:
                        tipo = "Lista";
                        break;
                    case 78:
                        tipo = "Lista";
                        break;
                    case 79:
                        tipo = "Lista";
                        break;
                    case 80:
                        tipo = "Lista";
                        break;
                    case 81:
                        tipo = "Lista";
                        break;
                    case 82:
                        tipo = "Lista";
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

    fields: ["server", "varName", "description", "descriptionx", "descriptioncolor", "branches"],

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
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

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
  
  <server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>
  
  <br><br><br>
  
  <dialog-list id="branches" fields='["info", "storage", "varName"]' dialogResizable dialogTitle="Store" dialogWidth="600" dialogHeight="400" listLabel="Stores" listStyle="height: calc(100vh - 320px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
        
    <div style="margin: 10px;">

        <span class="dbminputlabel">Informações</span>
        <select id="info" class="round">
            <optgroup label="Informações Gerais do Servidor">
            <option value="0">Servidor (Objeto)</options>
            <option value="1">ID do servidor</options>
            <option value="2">Nome do servidor</options>
            <option value="3">Acrônimo do nome do servidor</options>
            <option value="53">Descrição do servidor</options>
            <option value="5">URL do ícone do servidor</options>
            <option value="7">Canal padrão do servidor</options>
            <option value="58">ID do canal do sistema do servidor</options>
            <option value="9">Canal do sistema do servidor</options>
            <option value="21">Servidor grande</options>
            <option value="43">Filtro de conteúdo explícito do servidor</options>
            <option value="10">Cargo padrão do servidor</options>
            <option value="12">Bot do servidor</options>
            <option value="20">Servidor disponível</options>
            </optgroup>
            <optgroup label="Informações AFK do Servidor">
            <option value="8">Canal AFK do servidor</options>
            <option value="51">ID do canal AFK do servidor</options>
            <option value="19">Tempo limite de AFK do servidor</options>
            </optgroup>
            <optgroup label="Informações sobre impulso do Servidor">
            <option value="44">Contagem de reforços do servidor</options>
            <option value="45">Nível de aumento de servidor</options>
            </optgroup>
            <optgroup label="Contagens de Servidores">
            <option value="17">Contagem de membros do servidor</options>
            <option value="35">Contagem Humana do Servidor</options>
            <option value="30">Contagem de bots do servidor</options>
            <option value="24">Contagem de emojis do servidor</options>
            <option value="37">Contagem de Cargos do servidor</options>
            <option value="23">Contagem de canais do servidor</options>
            <option value="38">Contagem de canais de texto do servidor</options>
            <option value="39">Contagem de canais de voz do servidor</options>
            <option value="70">Total de membros nos canais de voz</options>
            </optgroup>
            <optgroup label="Informações da comunidade do servidor"">
            <option value="54">Servidor em parceria</options>
            <option value="55">Canal de regras do servidor</options>
            <option value="56">ID do canal da regra do servidor</options>
            <option value="4">Idioma preferencial do servidor</options>
            <option value="40">Servidor verificado</options>
            <option value="52">Barra de progresso do Server Premium ativada</options>
            <option value="46">URL do banner do servidor</options>
            <option value="47">Lista de recursos do servidor</options>
            <option value="49">Código de URL personalizado do servidor</options>
            <option value="57">Canal de widget do servidor</options>
            <option value="50">ID do canal do widget do servidor</options>
            <option value="25">Incorporação de servidor ativada</options>
            </optgroup>
            <optgroup label="Informações de datas do servidor">
            <option value="61">Carimbo de data e hora do servidor</options>
            <option value="18">Servidor criado em</options>
            <option value="22">Servidor conectado em</options>
            </optgroup>
            <optgroup label="Níveis do Servidor">
            <option value="59">Nível NSFW do servidor</options>
            <option value="6">Nível de verificação do servidor</options>
            <option value="60">Nível MFA/2FA do servidor</options>
            </optgroup>
            <optgroup label="Informações da Lista de Servidores">
            <option value="15">Lista de membros do servidor</options>
            <option value="33">Lista de IDs de membros do servidor</options>
            <option value="79">Lista de Bots do servidor</options>
            <option value="80">Lista de IDs de Bots do servidor</options>
            <option value="77">Lista de categorias do servidor</options>
            <option value="78">Lista de IDs das categorias do servidor</options>
            <option value="13">Lista de canais do servidor</options>
            <option value="31">Lista de IDs de canais de servidor</options>
            <option value="73">Lista de canais de texto do servidor</options>
            <option value="74">Lista de IDs dos canais de texto do servidor</options>
            <option value="75">Lista de canais de voz do servidor</options>
            <option value="76">Lista de IDs dos canais de voz do servidor</options>
            <option value="16">Lista de emojis do servidor</options>
            <option value="14">Lista de Cargos do servidor</options>
            <option value="32">Lista de IDs de cargos de servidor</options>
            <option value="41">Lista de banidos do servidor</options>
            <option value="42">Lista de convites do servidor</options>
            <option value="71">Lista de membros por ID presentes nos canais de voz</options>
            <option value="72">Lista de membros presentes nos canais de voz</options>
            <option value="81">Lista de membros do servidor em ordem de entrada</option>
            <option value="82">Lista de IDs de membros do servidor em ordem de entrada</option>
            </optgroup>
            <optgroup label="Informações do Dono do servidor">
            <option value="48">ID do Dono do servidor</options>
            <option value="11">Dono do Servidor (Objeto)</options>
            </optgroup>
            <optgroup label="Contagem de Status do Servidor">
            <option value="27">Contagem de membros online do servidor</options>
            <option value="29">Contagem de membros inativos do servidor</options>
            <option value="26">Contagem de membros ocupados do servidor</options>
            <option value="28">Contagem de membros offline do servidor</options>
            </optgroup>
            <optgroup label="Template do Servidor">
            <option value="62">URL do Template</options>
            <option value="63">Código do Template</options>
            <option value="64">Nome do Template</options>
            <option value="65">Descrição do Template</options>
            <option value="66">Vezes que o Template foi usado</options>
            <option value="67">ID do criador do Template</options>
            <option value="68">Timestamp da criação do Template</options>
            <option value="69">Timestamp da atualização do Template</options>
            </optgroup>
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

            const infos = [
                "Servidor (Objeto)",
                "ID do servidor",
                "Nome do servidor",
                "Acrônimo do nome do servidor",
                "Idioma Preferido do Servidor",
                "URL do ícone do servidor",
                "Nível de Verificação do Servidor",
                "Canal padrão do servidor",
                "Canal AFK do Servidor",
                "Canal do sistema do servidor",
                "Cargo padrão do servidor",
                "Dono do Servidor (Objeto)",
                "Bot do servidor",
                "Lista de Canais do Servidor",
                "Lista de Cargos do servidor",
                "Lista de Membros do Servidor",
                "Lista de emojis do servidor",
                "Contagem de membros do servidor",
                "Servidor criado em",
                "Tempo limite do servidor AFK",
                "Servidor disponível",
                "Servidor Grande",
                "Servidor conectado em",
                "Contagem de Canais do Servidor",
                "Contagem de emojis do servidor",
                "Incorporação de servidor habilitada",
                "Contagem de membros ocupados do servidor",
                "Contagem de membros online do servidor",
                "Contagem de membros offline do servidor",
                "Contagem de membros ociosos do servidor",
                "Contagem de bots do servidor",
                "Lista de IDs de Canais do Servidor",
                "Lista de IDs de Cargos de servidor",
                "Lista de IDs de membros do servidor",
                "",
                "Contagem Humana do Servidor",
                "",
                "Contagem de Cargos do Servidor",
                "Contagem de canais de texto do servidor",
                "Contagem de Canais de Voz do Servidor",
                "Servidor verificado",
                "Lista de banidos do servidor",
                "Lista de convites do servidor",
                "Filtro de conteúdo explícito do servidor",
                "Contagem de reforços do servidor",
                "Nível de aumento de servidor",
                "URL do banner do servidor",
                "Lista de recursos do servidor",
                "ID do Dono do servidor",
                "Código URL do Servidor Vanity",
                "ID do canal do widget do servidor",
                "ID do canal AFK do servidor",
                "Ativar barra de progresso do servidor",
                "Descrição do Servidor",
                "Servidor parceiro",
                "Canal de Regras do Servidor",
                "ID do canal da regra do servidor",
                "Canal de widget do servidor",
                "ID do canal do sistema do servidor",
                "Nível NSFW do Servidor",
                "Nível MFA/2FA do Servidor",
                "Timestamp do Servidor",
                "URL do Template",
                "Código do Template",
                "Nome do Template",
                "Descrição do Template",
                "Vezes que o Template foi usado",
                "ID do criador do Template",
                "Timestamp da criação do Template",
                "Timestamp da atualização do Template",
                "Total de membros no canal de voz",
                "Lista de membros por ID presentes nos canais de voz",
                "Lista de membros presentes nos canais de voz",
                "Lista de canais de texto do servidor",
                "Lista de IDs dos canais de texto do servidor",
                "Lista de canais de voz do servidor",
                "Lista de IDs dos canais de voz do servidor",
                "Lista de categorias do servidor",
                "Lista de IDs das categorias do servidor",
                "Lista de Bots do servidor",
                "Lista de IDs de Bots do servidor",
                "Lista de membros do servidor em ordem de entrada",
                "Lista de IDs de membros do servidor em ordem de entrada",
            ];

            result += `${infos[info]} > ${storage[parseInt(data.storage, 10)]} (${data.varName})</div>`;
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
        const targetServer = await this.getServerFromData(data.server, data.varName, cache);

        const branches = data.branches;

        for (var i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const info = parseInt(branch.info);
            let result;

            switch (info) {
                case 0:
                    result = targetServer;
                    break;
                case 1:
                    result = targetServer.id;
                    break;
                case 2:
                    result = targetServer.name;
                    break;
                case 3:
                    result = targetServer.nameAcronym;
                    break;
                case 4:
                    result = targetServer.preferredLocale;
                    break;
                case 5:
                    result = targetServer.iconURL({ dynamic: true, format: "png", size: 4096 });
                    break;
                case 6:
                    result = targetServer.verificationLevel;
                    break;
                case 7:
                    result = targetServer.getDefaultChannel();
                    break;
                case 8:
                    result = targetServer.afkChannel;
                    break;
                case 9:
                    result = targetServer.systemChannel;
                    break;
                case 10:
                    result = targetServer.roles.resolve(targetServer.id);
                    break;
                case 11:
                    result = await targetServer.fetchOwner();
                    break;
                case 12:
                    result = targetServer.me;
                    break;
                case 13:
                    result = [...targetServer.channels.cache.values()];
                    break;
                case 14:
                    result = [...targetServer.roles.cache.values()];
                    break;
                case 15:
                    result = [...targetServer.members.cache.values()];
                    break;
                case 16:
                    result = [...targetServer.emojis.cache.values()];
                    break;
                case 17:
                    result = targetServer.memberCount;
                    break;
                case 18:
                    result = targetServer.createdAt;
                    break;
                case 19:
                    result = targetServer.afkTimeout ?? 0;
                    break;
                case 20:
                    result = targetServer.available;
                    break;
                case 21:
                    result = targetServer.large;
                    break;
                case 22:
                    result = targetServer.joinedAt;
                    break;
                case 23:
                    result = targetServer.channels.cache.size;
                    break;
                case 24:
                    result = targetServer.emojis.cache.size;
                    break;
                case 25:
                    result = !!targetServer.widgetEnabled;
                    break;
                case 26:
                    await fetchMembers(true);
                    result = targetServer.members.cache.filter((m) => m.presence?.status === "dnd").size;
                    break;
                case 27:
                    await fetchMembers(true);
                    result = targetServer.members.cache.filter((m) => m.presence?.status === "online").size;
                    break;
                case 28:
                    await fetchMembers(true);
                    result = targetServer.members.cache.filter((m) => m.presence?.status === "offline").size;
                    break;
                case 29:
                    await fetchMembers(true);
                    result = targetServer.members.cache.filter((m) => m.presence?.status === "idle").size;
                    break;
                case 30:
                    result = targetServer.members.cache.filter((m) => m.user?.bot).size;
                    break;
                case 31:
                    result = [...targetServer.channels.cache.keys()];
                    break;
                case 32:
                    result = [...targetServer.roles.cache.keys()];
                    break;
                case 33:
                    await fetchMembers();
                    result = [...targetServer.members.cache.keys()];
                    break;
                case 35:
                    await fetchMembers();
                    result = targetServer.members.cache.filter((m) => !m.user?.bot).size;
                    break;
                case 37:
                    result = targetServer.roles.cache.size;
                    break;
                case 38:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_NEWS").size;
                    break;
                case 39:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
                    break;
                case 40:
                    result = targetServer.verified;
                    break;
                case 41:
                    const bans = await targetServer.bans.fetch();
                    result = [...bans.values()];
                    break;
                case 42:
                    const invites = await targetServer.invites.fetch();
                    result = [...invites.values()];
                    break;
                case 43:
                    result = targetServer.explicitContentFilter;
                    break;
                case 44:
                    result = targetServer.premiumSubscriptionCount ?? 0;
                    break;
                case 45:
                    result = targetServer.premiumTier;
                    break;
                case 46:
                    result = targetServer.bannerURL({ format: "png", size: 4096 });
                    break;
                case 47:
                    result = targetServer.features;
                    break;
                case 48:
                    result = targetServer.ownerId;
                    break;
                case 49:
                    result = targetServer.vanityURLCode;
                    break;
                case 50:
                    result = targetServer.widgetChannelId;
                    break;
                case 51:
                    result = targetServer.afkChannelId;
                    break;
                case 52:
                    result = targetServer.premiumProgressBarEnabled;
                    break;
                case 53:
                    result = targetServer.description;
                    break;
                case 54:
                    result = targetServer.partnered;
                    break;
                case 55:
                    result = targetServer.rulesChannel;
                    break;
                case 56:
                    result = targetServer.rulesChannelId;
                    break;
                case 57:
                    result = targetServer.widgetChannel;
                    break;
                case 58:
                    result = targetServer.systemChannelId;
                    break;
                case 59:
                    result = targetServer.nsfwLevel;
                    break;
                case 60:
                    result = targetServer.mfaLevel;
                    break;
                case 61:
                    result = targetServer.createdTimestamp;
                    break;
                case 62:
                    result = `https://discord.new/${(await targetServer.fetchTemplates()).map(v => v.code)}`;
                    break;
                case 63:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.code)}`;
                    break;
                case 64:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.name)}`;
                    break;
                case 65:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.description)}`;
                    break;
                case 66:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.usageCount)}`;
                    break;
                case 67:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.creatorId)}`;
                    break;
                case 68:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.createdAt)}`;
                    break;
                case 69:
                    result = `${(await targetServer.fetchTemplates()).map(v => v.updatedAt)}`;
                    break;
                case 70:
                    result = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.size).reduce((s, a) => s + a, 0);
                    break;
                case 71:
                    const str = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.map(member => member.user.id + ',').join('')).join('');
                    result = str.substring(0, str.length - 1).split(new RegExp(","));
                    break;
                case 72:
                    let channels = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE");
                    let members = new Array();

                    for (const [channelID, channel] of channels) {
                        for (const [memberID, member] of channel.members) {
                            members.push(member);
                        }
                    }

                    result = members;
                    break;
                case 73:
                    result = targetServer.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type)).map(channels => channels);
                    break;
                case 74:
                    result = targetServer.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type)).map(channels => channels.id);
                    break;
                case 75:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").map(channels => channels);
                    break;
                case 76:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").map(channels => channels.id);
                    break;
                case 77:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map(channels => channels);
                    break;
                case 78:
                    result = targetServer.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map(channels => channels.id);
                    break;
                case 79:
                    result = targetServer.members.cache.filter((m) => m.user?.bot).map((m) => m);
                    break;
                case 80:
                    result = targetServer.members.cache.filter((m) => m.user?.bot).map((m) => m.id);
                    break;
                case 81:
                    result = targetServer.members.cache.sort((a, b) => parseFloat(a.joinedTimestamp) - parseFloat(b.joinedTimestamp)).map((m) => m);
                    break;
                case 82:
                    result = targetServer.members.cache.sort((a, b) => parseFloat(a.joinedTimestamp) - parseFloat(b.joinedTimestamp)).map((m) => m.id);
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
