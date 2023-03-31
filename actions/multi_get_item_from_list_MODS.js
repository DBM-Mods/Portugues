module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Multi Get Item from List MOD",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Lists and Loops",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return `Obter ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}`;
  },

  variableStorage(data, varType) {
    let vars = [];

    for(var i = 0; i < data.branches.length; i++) {
      let type = parseInt(data.branches[i].storage, 10);

      if (type == varType && data.branches[i].varName) {
        let varName = data.branches[i].varName;

        vars.push(varName);
        vars.push("Número");
      }

      let type2 = parseInt(data.branches[i].storage2, 10);

      if (type2 == varType && data.branches[i].varName2) {
        let varName2 = data.branches[i].varName2;

        vars.push(varName2);
        vars.push("Texto");
      }
    }

    if(vars.length > 0) {
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

  fields: ["storage", "varName", "branches"],

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

<retrieve-from-variable dropdownLabel="Lista" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br><br>

<dialog-list id="branches" fields='["info", "position", "storage", "varName", "storage2", "varName2"]' dialogResizable dialogTitle="Item" dialogWidth="600" dialogHeight="400" listLabel="Itens" listStyle="height: calc(100vh - 300px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="padding-top:20px;margin-right:10px;margin-left:10px;" onmouseover="(function(){
        var aselect = document.getElementById('info');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '6') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('span').innerHTML = 'Escolher de X em X';
        } else if(avalue == '2') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('span').innerHTML = 'Posição';
        } else {
          document.getElementById('divValue').style.display = 'none';
        }

        aselect = document.getElementById('storage');
        avalue = aselect.options[aselect.selectedIndex].value;

        if(parseInt(avalue) > 0) {
          document.getElementById('varNameContainer').style.display = 'block';
        } else {
          document.getElementById('varNameContainer').style.display = 'none';
        }
    })()">

      <span class="dbminputlabel">Puxar</span><br>
      <select id="info" class="round" onchange="(function(){
        var aselect = document.getElementById('info');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '6') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('span').innerHTML = 'Escolher de X em X';
        } else if(avalue == '2') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('span').innerHTML = 'Posição';
        } else {
          document.getElementById('divValue').style.display = 'none';
        }

      })()">
        <option value="7" selected>Primeiro item</option>
        <option value="0">Item do meio</option>
        <option value="1">Último item</option>
        <option value="2">Item da posição</option>
        <option value="3">Item aleatório</option>
        <option value="4">Item aleatório [PAR]</option>
        <option value="5">Item aleatório [ÍMPAR]</option>
        <option value="6">Item aleatório [Escolher]</option>
      </select>

      <br>

      <div id="divValue">
        <span id="span" class="dbminputlabel">Posição</span>
        <input type="text" id="position" class="round">
      </div>

      <br>

      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Armazenar posição do item</span><br>
          <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
            ${data.variables[0]}
          </select>
      </div>

      <div id="varNameContainer" style="float: right; display: none; width: 60%;">
        <span class="dbminputlabel">Nome da Variável</span><br>
        <input id="varName" class="round" type="text">
      </div>

    <br><br><br><br>

    <div style="float: left; width: 35%;">
      <span class="dbminputlabel">Armazenar info do item</span><br>
      <select id="storage2" class="round">
        ${data.variables[1]}
      </select>
    </div>

    <div style="float: right; width: 60%;">
      <span class="dbminputlabel">Nome da Variável</span><br>
      <input id="varName2" class="round" type="text">
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
    
    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">Puxar: ';
      const info = parseInt(data.info);

      switch(info) {
        case 0:
          result += "Item do meio";
          break;
        case 1:
          result += "Último item";
          break;
        case 2:
          result += `Item da posição ${data.position}`;
          break;
        case 3:
          result += "Item aleatório";
          break;
        case 4:
          result += "Item aleatório [PAR]";
          break;
        case 5:
          result += "Item aleatório [ÍMPAR]";
          break;
        case 6:
          result += "Item aleatório [Escolher]";
          break;
        case 7:
          result += "Primeiro item";
          break;
      }

      result += "</div>";
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

  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const list = this.getVariable(type, varName, cache);

    if(Array.isArray(list)) {
      const branches = data.branches;

      for(var i = 0; i < branches.length; i++) {
        let branch = branches[i];
        let info = parseInt(branch.info);
        let result;
        let result2;

        switch(info) {
          case 0:
            var calc = Math.floor(list.length / 2);
            result2 = Math.floor(calc);
            result = list[result2];
            break;
          case 1:
            result = list[list.length - 1];
            result2 = Math.floor(list.length - 1);
            break;
          case 2:
            var position = parseInt(this.evalMessage(branch.position, cache), 10);
            if (position < 0) {
              result = list[0];
              result2 = 0;
            } else if (position >= list.length) {
              result = list[list.length - 1];
              result2 = Math.floor(list.length - 1);
            } else {
              result = list[position];
              result2 = Math.floor(position);
            }
            break;
          case 3:
            result2 = Math.floor(Math.random() * list.length);
            result = list[result2];
            break;
          case 4:
            var calc = Math.floor(list.length / 2);
            var calc2 = Math.floor(Math.random() * calc);
            var calc3 = Math.floor(calc2 * 2);
            result2 = Math.floor(calc3 + 1)
            result = list[result2];
            break;
          case 5:
            var calc = Math.ceil(list.length / 2);
            var calc2 = Math.floor(Math.random() * calc);
            result2 = Math.floor(calc2 * 2);
            result = list[result2];
            break;
          case 6:
            var position = parseInt(this.evalMessage(branch.position, cache), 10);
            var calc = Math.floor(list.length / position);
            var calc2 = Math.floor(Math.random() * calc);
            var calc3 = Math.floor(position * calc2);
            result2 = Math.floor(calc3)
            result = list[result2];
            break;
          case 7:
            result = list[0];
            result2 = 0;
            break;
        }

        let varName = this.evalMessage(branch.varName, cache);
        let storage = parseInt(branch.storage, 10);
        this.storeValue(result2, storage, varName, cache);

        let varName2 = this.evalMessage(branch.varName2, cache);
        let storage2 = parseInt(branch.storage2, 10);
        this.storeValue(result, storage2, varName2, cache);
      }
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

  mod() {},
};