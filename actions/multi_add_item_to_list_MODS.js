module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Multi Add Item to List MOD",

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
    return `Adicionar ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}`;
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

<dialog-list id="branches" fields='["value", "valueeval", "mode", "position", "positionvalue"]' dialogResizable dialogTitle="Item" dialogWidth="600" dialogHeight="400" listLabel="Itens" listStyle="height: calc(100vh - 300px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="padding-top:20px;margin-right:10px;margin-left:10px;" onmouseover="(function(){
      var aselect = document.getElementById('mode');
      var avalue = aselect.options[aselect.selectedIndex].value;

      if(avalue == '0') {
        document.getElementById('divValue').style.display = 'block';
        document.getElementById('divValue2').style.display = 'none';
      } else {
        document.getElementById('divValue').style.display = 'none';
        document.getElementById('divValue2').style.display = 'block';
      }

      aselect = document.getElementById('position');
      avalue = aselect.options[aselect.selectedIndex].value;

      if(avalue == '2') {
        document.getElementById('divValue3').style.display = 'block';
      } else {
        document.getElementById('divValue3').style.display = 'none';
      }
    })()">

      <span class="dbminputlabel">Comportamento</span><br>
      <select id="mode" class="round" onchange="(function(){
        var aselect = document.getElementById('mode');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '0') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('divValue2').style.display = 'none';
        } else {
          document.getElementById('divValue').style.display = 'none';
          document.getElementById('divValue2').style.display = 'block';
        }
      })()">
        <option value="0" selected>Texto</option>
        <option value="1">Eval</option>
      </select>

      <br>

      <span class="dbminputlabel">Tipo</span><br>
      <select id="position" class="round" onchange="(function(){
        var aselect = document.getElementById('position');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '2') {
          document.getElementById('divValue3').style.display = 'block';
        } else {
          document.getElementById('divValue3').style.display = 'none';
        }
      })()">
        <option value="0" selected>Add no fim</option>
        <option value="1">Add no início</option>
        <option value="3">Add em uma posição aleatória</option>
        <option value="2">Add em uma posição específica</option>
      </select>

      <br>

      <div id="divValue3">
        <span class="dbminputlabel">Posição</span>
        <input id="positionvalue" class="round" type="text">
      </div>

      <br>

      <div id="divValue">
        <span class="dbminputlabel">Valor</span>
        <textarea id="value" class="round" rows="4"></textarea>
      </div>

      <div id="divValue2">
        <span class="dbminputlabel">Valor</span>
        <textarea id="valueeval" class="round" rows="4" name="is-eval"></textarea>
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
    
    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
      const position = parseInt(data.position);
      const comp = data.mode;

      if(comp == "1") {
        result += "(Eval) ";
      }

      switch(position) {
        case 0:
          result += "ADD ao fim: ";
          break;
        case 1:
          result += "ADD ao ínicio: ";
          break;
        case 2:
          result += `ADD na posição ${data.positionvalue}: `;
          break;
        case 3:
          result += "ADD aleatório: ";
          break;
      }

      if(comp == "0") {
        result += data.value;
      } else {
        result += data.valueeval;
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
        let modo = parseInt(branch.mode);
        let position = parseInt(branch.position);
        let positionvalue = parseInt(this.evalMessage(branch.positionvalue, cache));
        let value = this.evalMessage(branch.value, cache);

        if(modo == 1) {
          try {
            value = this.eval(branch.valueeval, cache);
          } catch {
            this.displayError(data, cache, e);
            return this.callNextAction(cache);
          }
        }

        switch(position) {
          case 0:
            list.push(value);
            break;
          case 1:
            list.unshift(value);
            break;
          case 2:
            if (positionvalue < 0) {
              list.unshift(value);
            } else if (positionvalue >= list.length) {
              list.push(value);
            } else {
              list.splice(positionvalue, 0, value);
            }
            break;
          case 3:
            positionvalue = Math.abs(parseInt(Math.random() * list.length));

            if (positionvalue < 0) {
              list.unshift(value);
            } else if (positionvalue >= list.length) {
              list.push(value);
            } else {
              list.splice(positionvalue, 0, value);
            }
            break;
        }
      }

      this.callNextAction(cache);
    } else {
      this.callNextAction(cache);
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

  mod() {},
};