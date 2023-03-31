module.exports = {
    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Remove Member to Thread MOD",

    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Channel Control",

    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------

    subtitle(data, presets) {
        const storeTypes = presets.variables;
        return `${storeTypes[parseInt(data.storage, 10)]} (${data.varName})`;
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

    fields: ["storage", "varName", "member", "varName2", "iffalse", "iffalseVal"],

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
     <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
     <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

      <retrieve-from-variable dropdownLabel="Thread" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
      
      <br><br><br><br>

      <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
      
      <br><br><br><br>
    
      <div style="float: left; width: 35%">
        <span class="dbminputlabel">Caso falhe</span><br>
        <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
            <option value="0" selecionado>Continuar ações</option>
            <option value="1">Parar sequência de ação</option>
            <option value="2">Ir para a ação</option>
            <option value="3">Pular as próximas ações</option>
            <option value="4">Ir para a âncora de ação</option>
        </select>
      </div>

      <div id="iffalseContainer" style="display: none; float: right; width: 60%;">
        <span id="xinelas" class="dbminputlabel">Para</span>
        <br>
        <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
     </div>
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
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        const th = this.getVariable(storage, varName, cache);
        const member = await this.getMemberFromData(data.member, data.varName2, cache);

        try { 
            await th.members.remove(member.id);
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