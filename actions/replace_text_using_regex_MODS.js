module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Replace Text using Regex MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Other Stuff",

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
            : `<font style="color:${desccor}">${presets.variables[parseInt(data.storage, 10)]} (${data.varName})</font>`
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage, 10);
        if (type !== varType) return;
        return [data.varName, "Texto"];
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

    fields: ["text", "regex", "text2", "global", "insensitive", "storage", "varName", "description", "descriptionx", "descriptioncolor"],

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
  
          <div style="height: calc(100vh - 160px); overflow: auto;">

          <div id="flutuador" style="padding:0px 0px 15px 0px; margin-top: 5px;">
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
  
          <span class="dbminputlabel">Texto original</span>
          <textarea id="text" rows="4" placeholder="Insira o texto aqui..."></textarea>

          <br>

          <span class="dbminputlabel">Regex</span>
          <textarea id="regex" rows="3" placeholder="Insira o regex aqui..."></textarea>

         <br>

          <span class="dbminputlabel">Substituir para</span>
          <textarea id="text2" rows="3" placeholder="Insira o texto aqui..."></textarea>
  
          <br>
  
          <span class="dbminputlabel">Configurações</span>
          <div style="display: flex; justify-content: center; align-items: center; background: #333; padding: 5px; border-radius: 5px;">
            <dbm-checkbox id="global" label="Global" checked></dbm-checkbox>
            <dbm-checkbox id="insensitive" label="Ignorar letras maiúsculas" checked></dbm-checkbox>
          </div>
  
          <br>

		  <div style="float: left; width: 35%;">
		    <span class="dbminputlabel">Armazenar em</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>

		  <div id="varNameContainer" style="float: right; width: 60%;">
			  <span class="dbminputlabel">Nome da variável</span><br>
			  <input id="varName" class="round" type="text">
		  </div>

          </div>
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
    },

    //---------------------------------------------------------------------
    // Action Bot Function
    //
    // This is the function for the action within the Bot's Action class.
    // Keep in mind event calls won't have access to the "msg" parameter,
    // so be sure to provide checks for variable existence.
    //---------------------------------------------------------------------

    action(cache) {
        const data = cache.actions[cache.index];
        const text = this.evalMessage(data.text, cache);
        const regex = new RegExp(this.evalMessage(data.regex, cache), (data.global ? "g" : "") + (data.insensitive ? "i" : ""));
        const text2 = this.evalMessage(data.text2, cache);
        
        const result = text.replace(regex, text2);

        const storage = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

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