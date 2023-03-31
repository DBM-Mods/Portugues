module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Leave Server MOD",

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
      : `<font style="color:${desccor}">${presets.getServerText(data.server, data.varName)}</font>`
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

  fields: ["server", "varName", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal"],

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

        <div style="text-align:center;">
          <b>NOTA</b>
          <p>Essa action irá fazer seu bot sair do servidor</p>
        </div>

        <br>

        <div style="float: left; width: 40%">
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

        <style>
          .xin {
            padding: 5px;
            border: 1px solid #777;
            background: rgba(255,255,255,0.1);
          }

          .dbmmodsbr1 {
            position: absolute;
            bottom: 0px;
            border: 0px solid rgba(50,50,50,0.7);
            background: rgba(0,0,0,0.7);
            color: #999;
            padding: 5px;
            left: 0px;
            z-index: 999999;
            cursor: pointer
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
            cursor: pointer
          }
        </style>
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
        document.querySelector("[id='xinelas']").innerText = (`Número da ação`);
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelas']").innerText = (`Pular ações`);
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelas']").innerText = (`Nome da âncora`);
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));
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
    const server = await this.getServerFromData(data.server, data.varName, cache);

    try {
      await server.leave();
      this.callNextAction(cache);
    } catch {
      this.executeResults(false, data, cache);
    }
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