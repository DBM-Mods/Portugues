module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Multi Store Message Info MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Messaging",

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
                        tipo = "Mensagem";
                        break;
                    case 1:
                        tipo = "ID";
                        break;
                    case 2:
                        tipo = "Texto";
                        break;
                    case 3:
                        tipo = "Membro";
                        break;
                    case 4:
                        tipo = "Canal";
                        break;
                    case 5:
                        tipo = "Texto";
                        break;
                    case 6:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 7:
                        tipo = "Verdadeiro/Falso";
                        break;
                    case 8:
                        tipo = "Data";
                    case 9:
                        tipo = "Lista";
                    case 12:
                        tipo = "Número";
                        break;
                    case 13:
                        tipo = "Lista";
                        break;
                    case 14:
                        tipo = "Número";
                        break;
                    case 15:
                        tipo = "URL";
                        break;
                    case 16:
                        tipo = "Data";
                        break;
                    case 17:
                        tipo = "Número"
                        break;
                    case 18:
                        tipo = "Número";
                        break;
                    case 19:
                        tipo = "Servidor";
                        break;
                    case 20:
                        tipo = "Texto";
                        break;
                    case 21:
                        tipo = "ID";
                        break;
                    case 22:
                        tipo = "Mensagem Embed";
                        break;
                    case 23:
                        tipo = "Mensagem Embed";
                        break;
                    case 24:
                        tipo = "Mensagem Embed";
                        break;
                    case 25:
                        tipo = "Mensagem Embed";
                        break;
                    case 26:
                        tipo = "Mensagem Embed";
                        break;
                    case 27:
                        tipo = "Mensagem Embed";
                        break;
                    case 28:
                        tipo = "Mensagem Embed";
                        break;
                    case 29:
                        tipo = "Mensagem Embed";
                        break;
                    case 30:
                        tipo = "Mensagem Embed";
                        break;
                    case 31:
                        tipo = "Mensagem Embed";
                        break;
                    case 32:
                        tipo = "Mensagem Embed";
                        break;
                    case 33:
                        tipo = "Mensagem Embed";
                        break;
                    case 34:
                        tipo = "Mensagem Embed";
                        break;
                    case 35:
                        tipo = "Mensagem Embed";
                        break;
                    case 36:
                        tipo = "Mensagem Embed";
                        break;
                    case 37:
                        tipo = "Mensagem Embed";
                        break;
                    case 38:
                        tipo = "Número";
                        break;
                    case 39:
                        tipo = "Número";
                        break;
                    case 40:
                        tipo = "Interação";
                        break;
                    case 41:
                        tipo = "Interação";
                        break;
                    case 42:
                        tipo = "Interação";
                        break;
                    case 43:
                        tipo = "Interação";
                        break;
                    case 44:
                        tipo = "Usuário da Interação";
                        break;
                    case 45:
                        tipo = "Usuário da Interação";
                        break;
                    case 46:
                        tipo = "Usuário da Interação";
                        break;
                    case 47:
                        tipo = "Usuário da Interação";
                        break;
                    case 48:
                        tipo = "Usuário da Interação";
                        break;
                    case 49:
                        tipo = "Componente";
                        break;
                    case 50:
                        tipo = "Componente";
                        break;
                    case 51:
                        tipo = "Componente";
                        break;
                    case 52:
                        tipo = "Componente";
                        break;
                    case 53:
                        tipo = "Componente";
                        break;
                    case 54:
                        tipo = "Componente";
                        break;
                    case 55:
                        tipo = "Componente";
                        break;
                    case 56:
                        tipo = "Componente";
                        break;
                    case 57:
                        tipo = "Componente";
                        break;
                    case 58:
                        tipo = "Componente";
                        break;
                    case 59:
                        tipo = "Componente";
                        break;
                    case 60:
                        tipo = "Componente";
                        break;
                    case 61:
                        tipo = "Componente";
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

    fields: ["message", "varName", "description", "descriptionx", "descriptioncolor", "branches"],

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
  
  <message-input dropdownLabel="Mensagem" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>
  
  <br><br><br>
  
  <dialog-list id="branches" fields='["info", "storage", "varName", "embednumero", "field", "comp1", "comp2"]' dialogResizable dialogTitle="Store" dialogWidth="600" dialogHeight="400" listLabel="Stores" listStyle="height: calc(100vh - 320px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
        
    <div style="margin: 10px;" onmouseover='(function(){
        const aselect = document.getElementById("info");
        const value = aselect.options[aselect.selectedIndex].value;

        if (value > 21) {
            document.getElementById("containerxin2").style.display = "block";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value < 22) {
            document.getElementById("containerxin2").style.display = "none";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value < 35) {
            document.getElementById("containerxin").style.display = "none";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          } else {
            document.getElementById("containerxin").style.display = "block";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value > 37) {
            document.getElementById("containerxin").style.display = "none";
            document.getElementById("containerxin2").style.display = "none";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value == 39) {
            document.getElementById("containerxin").style.display = "none";
            document.getElementById("containerxin2").style.display = "block";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value > 50) {
            document.getElementById("containerxin").style.display = "none";
            document.getElementById("containerxin2").style.display = "none";
            document.getElementById("containerxin3").style.display = "block";
            document.getElementById("containerxin4").style.display = "block";
          }
          if (value == 50) {
            document.getElementById("containerxin").style.display = "none";
            document.getElementById("containerxin2").style.display = "none";
            document.getElementById("containerxin3").style.display = "block";
            document.getElementById("containerxin4").style.display = "none";
          }
          if (value == 62) {
            document.getElementById("containerxin2").style.display = "none";
            document.getElementById("containerxin3").style.display = "none";
            document.getElementById("containerxin4").style.display = "none";
          }
    })()'>

        <span class="dbminputlabel">Informações</span>
        <select id="info" class="round" onchange='(function(){
            const aselect = document.getElementById("info");
            const value = aselect.options[aselect.selectedIndex].value;

            if (value > 21) {
                document.getElementById("containerxin2").style.display = "block";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value < 22) {
                document.getElementById("containerxin2").style.display = "none";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value < 35) {
                document.getElementById("containerxin").style.display = "none";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              } else {
                document.getElementById("containerxin").style.display = "block";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value > 37) {
                document.getElementById("containerxin").style.display = "none";
                document.getElementById("containerxin2").style.display = "none";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value == 39) {
                document.getElementById("containerxin").style.display = "none";
                document.getElementById("containerxin2").style.display = "block";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value > 50) {
                document.getElementById("containerxin").style.display = "none";
                document.getElementById("containerxin2").style.display = "none";
                document.getElementById("containerxin3").style.display = "block";
                document.getElementById("containerxin4").style.display = "block";
              }
              if (value == 50) {
                document.getElementById("containerxin").style.display = "none";
                document.getElementById("containerxin2").style.display = "none";
                document.getElementById("containerxin3").style.display = "block";
                document.getElementById("containerxin4").style.display = "none";
              }
              if (value == 62) {
                document.getElementById("containerxin2").style.display = "none";
                document.getElementById("containerxin3").style.display = "none";
                document.getElementById("containerxin4").style.display = "none";
              }
        })()'>
            <option value="0" selected>Objeto da mensagem</option>
            <option value="1">ID da mensagem</option>
            <option value="2">Texto da mensagem</option>
            <option value="3">Autor da mensagem</option>
            <option value="4">Canal da mensagem</option>
            <option value="5">Timestamp da mensagem</option>
            <option value="6">A mensagem está fixada?</option>
            <option value="7">A mensagem é TTS?</option>
            <option value="8">Lista de anexos da mensagem [Objeto]</option>
            <option value="62">Lista de anexos da mensagem [URL]</option>
            <option value="9">Edições da mensagem</option>
            <option value="12">Contagem de reações de mensagens</option>
            <option value="13">Lista de usuários mencionados na mensagem</option>
            <option value="14">Contagem de usuários mencionados na mensagem</option>
            <option value="15">URL da mensagem</option>
            <option value="16">Data de criação da mensagem</option>
            <option value="17">Comprimento do conteúdo da mensagem</option>
            <option value="18">Contagem de anexos da mensagem</option>
            <option value="10">ID do servidor da mensagem</option>
            <option value="19">Servidor da mensagem</option>
            <option value="20">Tipo de mensagem</option>
            <option value="21">ID do webhook da mensagem</option>
            <optgroup label="Informações da Interação">
            <option value="40">Objeto da interação</options>
            <option value="41">ID da interação</options>
            <option value="42">Nome da interação</options>
            <option value="43">Tipo de interação</options>
            <option value="44">ID do Autor da interação</options>
            <option value="45">Nome do Autor da interação</options>
            <option value="46">Discriminador do Autor da interação</options>
            <option value="47">Tag do Autor da interação</options>
            <option value="48">Avatar do Autor da interação</options>
            <optgroup label="Informações da Embed">
            <option value="22">Objeto Embed da mensagem</option>
            <option value="38">Quantidade de Embeds</options>
            <option value="39">Quantidade de Fields</options>
            <option value="23">Titulo</options>
            <option value="24">Descrição</options>
            <option value="25">Url</options>
            <option value="26">Cor</options>
            <option value="27">Timestamp</options>
            <option value="28">Thumbnail</options>
            <option value="29">Imagem</options>
            <option value="30">Nome do autor</options>
            <option value="31">Icone URL do autor</options>
            <option value="32">URL do autor</options>
            <option value="33">Footer texto</options>
            <option value="34">Footer Icon URL</options>
            <option value="35">Nome do Field</options>
            <option value="36">Valor do Field</options>
            <option value="37">Inline do Field</options>
            <optgroup label="Informações dos Componentes">
            <option value="49">Total de linhas</options>
            <option value="50">Total de compenentes na linha</options>
            <option value="51">Objeto do componente</options>
            <option value="52">ID do Componente</options>
            <option value="53">Tipo de Componente</options>
            <option value="54">Etiqueta do Componente</options>
            <option value="55">Estilo do Componente</options>
            <option value="56">URL do Componente</options>
            <option value="57">O Componente está Ativado/Desativado</options>
            <option value="58">Placeholder do componente</options>
            <option value="59">Mínimo de valores do Menu</options>
            <option value="60">Máximo de valores do Menu</options>
            <option value="61">Opções do Menu</options>
            </optgroup>
        </select>
  
        <br>

        <div style="width: 100%; display: none;" id="containerxin2">
            <table style="width:100%">
                <tr>
                    <td style="padding :5px;">
                        <span class="dbminputlabel">Número da Embed</span><br>
                        <input id="embednumero" value="0" class="round" type="text">
                        <br>
                    </td>
                    <td style="padding: 5px;">
                        <div style="width: 100%;" id="containerxin">
                            <span class="dbminputlabel">Número da Field</span><br>
                            <input id="field" value="0" class="round" type="text">
                            <br>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <table style="width:100%">
            <tr>
                <td style="padding: 5px;">
                    <div id="containerxin3">
                        <span class="dbminputlabel">Número da linha</span><br>
                        <input id="comp1" value="0" class="round" type="text">
                        <br>
                    </div>
                </td>
                <td style="padding: 5px;">
                    <div id="containerxin4">
                        <span class="dbminputlabel">Número do componente</span><br>
                        <input id="comp2" value="0" class="round" type="text">
                        <br>
                    </div>
                </td>
            </tr>
        </table>
  
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
                "Objeto da mensagem",
                "ID da mensagem",
                "Texto da mensagem",
                "Autor da Mensagem",
                "Canal da mensagem",
                "Timestamp da mensagem",
                "A mensagem está fixada?",
                "A mensagem é TTS?",
                "Lista de anexos da mensagem [Objeto]",
                "Edições da mensagem",
                "ID do servidor da mensagem",
                "",
                "Contagem de Reações da Mensagem",
                "Lista de usuários mencionados",
                "Contagem de usuários mencionados",
                "URL da mensagem",
                "Data de criação da mensagem",
                "Comprimento do conteúdo da mensagem",
                "Contagem de anexos da mensagem",
                "Servidor da mensagem",
                "Tipo de mensagem",
                "ID do webhook da mensagem",
                "Objeto da Embed da Mensagem",
                "Titulo da embed",
                "Descrição da embed",
                "Url da embed",
                "Cor da embed",
                "Timestamp da embed",
                "Thumbnail da embed",
                "Imagem da embed",
                "Nome do  autor na embed",
                "Icone URL do autor na embed",
                "URL do autor na embed",
                "Footer texto da embed",
                "Footer Icon URL da embed",
                "Nome do Field da embed",
                "Valor do Field da embed",
                "Inline do Field da embed",
                "Quantidade de Embeds",
                "Quantidade de Fields",
                "Objeto da interação",
                "ID da interação",
                "Nome da interação",
                "Tipo de interação",
                "ID do Autor da interação",
                "Nome do Autor da interação",
                "Discriminador do Autor da interação",
                "Tag do Autor da interação",
                "Avatar do Autor da interação",
                "Total de linhas",
                "Total de compenentes na linha",
                "Objeto do componente",
                "ID do Componente",
                "Tipo de Componente",
                "Etiqueta do Componente",
                "Estilo do Componente",
                "URL do Componente",
                "O Componente está Ativado/Desativado",
                "Placeholder do componente",
                "Mínimo de valores do Menu",
                "Máximo de valores do Menu",
                "Opções do Menu",
                "Lista de anexos da mensagem [URL]",
            ];

            result += `${infos[info]} > ${storage[parseInt(data.storage, 10)]} (${data.varName}) </div>`;
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
        const msg = await this.getMessageFromData(data.message, data.varName, cache);

        const branches = data.branches;

        for (var i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const info = parseInt(branch.info);
            let field = this.evalMessage(branch.field, cache);
            let embednumero = this.evalMessage(branch.embednumero, cache);
            let comp1 = this.evalMessage(branch.comp1, cache);
            let comp2 = this.evalMessage(branch.comp2, cache);

            let result;

            switch (info) {
                case 0:
                    result = msg;
                    break;
                case 1:
                    result = msg.id;
                    break;
                case 2:
                    result = msg.content;
                    break;
                case 3:
                    result = msg.member ?? msg.author;
                    break;
                case 4:
                    result = msg.channel;
                    break;
                case 5:
                    result = msg.createdTimestamp;
                    break;
                case 6:
                    result = msg.pinned;
                    break;
                case 7:
                    result = msg.tts;
                    break;
                case 8:
                    result = [...msg.attachments.values()];
                    break;
                case 9:
                    result = msg.edits;
                    break;
                case 10:
                    result = msg.guild.id;
                    break;
                case 12:
                    result = msg.reactions.cache.size;
                    break;
                case 13:
                    result = msg.mentions.users.filter(p => p).map(p => p);
                    break;
                case 14:
                    result = msg.mentions.users.size;
                    break;
                case 15:
                    result = msg.url;
                    break;
                case 16:
                    result = msg.createdAt;
                    break;
                case 17:
                    result = msg.content.length;
                    break;
                case 18:
                    result = msg.attachments.size;
                    break;
                case 19:
                    result = msg.guild;
                    break;
                case 20:
                    result = msg.type;
                    break;
                case 21:
                    result = msg.webhookId;
                    break;
                case 22:
                    if (msg.embeds.length <= embednumero) {
                        result = undefined;
                    } else {
                        result = msg.embeds[embednumero];
                    }
                    break;
                case 23:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].title;
                    }
                    break;
                case 24:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].description;
                    }
                    break;
                case 25:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].url;
                    }
                    break;
                case 26:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].color;
                    }
                    break;
                case 27:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].timestamp;
                    }
                    break;
                case 28:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].thumbnail.url;
                    }
                    break;
                case 29:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].image.url;
                    }
                    break;
                case 30:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].author.name;
                    }
                    break;
                case 31:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].author.iconURL;
                    }
                    break;
                case 32:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].author.url;
                    }
                    break;
                case 33:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].footer.text;
                    }
                    break;
                case 34:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        result = msg.embeds[embednumero].footer.iconURL;
                    }
                    break;
                case 35:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        if (msg.embeds[embednumero].fields.length <= field) {
                            result = "";
                        }
                        else {
                            result = msg.embeds[embednumero].fields[field].name;
                        }
                    }
                    break;
                case 36:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        if (msg.embeds[embednumero].fields.length <= field) {
                            result = "";
                        }
                        else {
                            result = msg.embeds[embednumero].fields[field].value;
                        }
                    }
                    break;
                case 37:
                    if (msg.embeds.length <= embednumero) {
                        result = "";
                    } else {
                        if (msg.embeds[embednumero].fields.length <= field) {
                            result = "";
                        }
                        else {
                            result = msg.embeds[embednumero].fields[field].inline;
                        }
                    }
                    break;
                case 38:
                    if (msg.embeds.length == undefined) {
                        result = 0;
                    } else {
                        result = msg.embeds.length;
                    }
                    break;
                case 39:
                    if (msg.embeds.length <= embednumero) {
                        result = 0;
                    } else {
                        result = msg.embeds[embednumero].fields.length
                    }
                    break;
                case 40:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction
                    }
                    break;
                case 41:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.id
                    }
                    break;
                case 42:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.commandName
                    }
                    break;
                case 43:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.type
                    }
                    break;
                case 44:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.user.id
                    }
                    break;
                case 45:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.user.username
                    }
                    break;
                case 46:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.user.discriminator
                    }
                    break;
                case 47:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.user.tag
                    }
                    break;
                case 48:
                    if (msg.interaction == undefined) {
                        result = null;
                    } else {
                        result = msg.interaction.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })
                    }
                    break;

                case 49:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        result = msg.components.length
                    }
                    break;

                case 50:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components.length
                        }
                    }
                    break;

                case 51:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2]
                        }
                    }
                    break;

                case 52:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].customId
                        }
                    }
                    break;

                case 53:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].type
                        }
                    }
                    break;

                case 54:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].label
                        }
                    }
                    break;

                case 55:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].style
                        }
                    }
                    break;

                case 56:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].url
                        }
                    }
                    break;

                case 57:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].disabled
                        }
                    }
                    break;

                case 58:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].placeholder
                        }
                    }
                    break;

                case 59:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].minValues
                        }
                    }
                    break;

                case 60:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].maxValues
                        }
                    }
                    break;

                case 61:
                    if (msg.components.length == 0) {
                        result = null;
                    } else {
                        if (msg.components.length <= comp1) {
                            result = null;
                        } else {
                            result = msg.components[comp1].components[comp2].options
                        }
                    }
                    break;
                case 62:
                    result = msg.attachments.map((t) => t.attachment);
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