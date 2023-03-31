module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Multi-Check Variable MOD",

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
    return `Checar ${presets.getVariableText(data.storage, data.varName)} com ${data.branches.length} possibilidades`;
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
<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<retrieve-from-variable allowSlashParams dropdownLabel="Variável" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br><br>

<dialog-list id="branches" fields='["comparison", "value", "value2", "actions"]' dialogResizable dialogTitle="Check Variable Info" dialogWidth="600" dialogHeight="400" listLabel="Comparações e ações" listStyle="height: calc(100vh - 290px);" itemName="Condition" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
  <div onmouseover="(function(){
      var aselect = document.getElementById('comparison');
      var avalue = aselect.options[aselect.selectedIndex].value

      if (avalue == '0' || avalue == '16' || avalue == '19' || avalue == '20' || avalue == '21' || avalue == '24' || avalue == '22' || avalue == '23' || avalue == '25') {
        document.getElementById('divValue').style.display = 'none';
        document.getElementById('divValue2').style.display = 'none';
      } else if(avalue == '15') {
        document.getElementById('divValue').style.display = 'block';
        document.getElementById('divValue').style.width = '35%';
        document.getElementById('divValue2').style.display = 'block';
      } else {
        document.getElementById('divValue').style.display = 'block';
        document.getElementById('divValue').style.width = '65%';
        document.getElementById('divValue2').style.display = 'none';
      }
  })()">
    <div style="padding: 16px;">
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Comparação</span><br>
        <select id="comparison" class="round" onchange="(function(){

            var aselect = document.getElementById('comparison');
            var avalue = aselect.options[aselect.selectedIndex].value

            if (avalue == '0' || avalue == '16' || avalue == '19' || avalue == '20' || avalue == '21' || avalue == '24' || avalue == '22' || avalue == '23' || avalue == '25') {
              document.getElementById('divValue').style.display = 'none';
              document.getElementById('divValue2').style.display = 'none';
            } else if(avalue == '15') {
              document.getElementById('divValue').style.display = 'block';
              document.getElementById('divValue').style.width = '35%';
              document.getElementById('divValue2').style.display = 'block';
            } else {
              document.getElementById('divValue').style.display = 'block';
              document.getElementById('divValue').style.width = '65%';
              document.getElementById('divValue2').style.display = 'none';
            }

        })()">
          <option value="0">Existe</option>
          <option value="1" selected>Igual a</option>
          <option value="2">Exatamente igual</option>
          <option value="3">Menor que</option>
          <option value="13">Menor ou igual a</option>
          <option value="4">Maior que</option>
          <option value="12">Maior ou igual a</option>
          <option value="5">Inclui</option>
          <option value="6">Matches Regex</option>
          <option value="14">Matches Full Regex</option>
          <option value="7">O comprimento é maior que</option>
          <option value="8">O comprimento é menor que</option>
          <option value="9">O comprimento é igual a</option>
          <option value="10">Começa com</option>
          <option value="11">Termina com</option>
          <option value="15">Entre</option>
          <option value="16">Possui acentuações?</option>
          <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
          <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
          <option value="19">É um número par?</option>
          <option value="20">É um número ímpar?</option>
          <option value="21">É um número?</option>
          <option value="24">É um texto?</option>
          <option value="22">É uma lista?</option>
          <option value="23">É um URL de imagem?</option>
          <option value="25">É um URL?</option>
        </select>
      </div>
      <div style="float: left; width: 35%; padding-left: 18px;" id="divValue">
        <span class="dbminputlabel">Valor</span><br>
        <input id="value" class="round" type="text" name="is-eval">
      </div>

      <div style="float: left; width: 30%; padding-left: 18px;" id="divValue2">
        <span class="dbminputlabel">e</span><br>
        <input id="value2" class="round" type="text" name="is-eval">
      </div>

      <br><br><br><br>

      <action-list-input id="actions" height="calc(100vh - 220px)"></action-list-input>

    </div>
  </div>
</dialog-list>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {
    const { glob } = this;

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">VAR ';
      const comp = data.comparison;
      switch (comp) {
        case "0":
          result += "Existe";
          break;
        case "1":
          result += "= " + data.value;
          break;
        case "2":
          result += "= " + data.value;
          break;
        case "3":
          result += "< " + data.value;
          break;
        case "4":
          result += "> " + data.value;
          break;
        case "5":
          result += "Inclui " + data.value;
          break;
        case "6":
          result += "Matches Regex " + data.value;
          break;
        case "7":
          result += "Comprimento > " + data.value;
          break;
        case "8":
          result += "Comprimento < " + data.value;
          break;
        case "9":
          result += "Comprimento = " + data.value;
          break;
        case "10":
          result += "Começa com " + data.value;
          break;
        case "11":
          result += "Termina com " + data.value;
          break;
        case "12":
          result += ">= " + data.value;
          break;
        case "13":
          result += "<= " + data.value;
          break;
        case "14":
          result += "Matches Full Regex " + data.value;
          break;
        case "15":
          result += "Entre " + data.value + " e " + data.value2;
          break;
        case "16":
          result += "Possui acentuações?";
          break;
        case "17":
          result += "Inclui " + data.value;
          break;
        case "18":
          result += "Igual " + data.value;
          break;
        case "19":
          result += "É um número par?"
          break;
        case "20":
          result += "É um número ímpar?"
          break;
        case "21":
          result += "É um número?"
          break;
        case "22":
          result += "É uma lista?";
          break;
        case "23":
          result += "É um URL de imagem?";
          break;
        case "24":
          result += "É um texto?";
          break;
        case "25":
          result += "É um URL?";
          break;
      }
      result += "</div><span>Chamar " + data.actions.length + " Actions</span>";
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
    const variable = this.getVariable(type, varName, cache);
    let result = false;
    if (variable) {
      const val1 = variable;
      const branches = data.branches;
      for (let i = 0; i < branches.length; i++) {
        const branch = branches[i];
        const compare = parseInt(branch.comparison, 10);
        let val2 = branch.value;
        if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
        switch (compare) {
          case 0:
            result = val1 !== undefined;
            break;
          case 1:
            result = val1 == val2;
            break;
          case 2:
            result = val1 === val2;
            break;
          case 3:
            result = val1 < val2;
            break;
          case 4:
            result = val1 > val2;
            break;
          case 5:
            if (typeof val1?.toString().includes === "function") {
              result = val1.toString().includes(val2);
            }
            break;
          case 6:
            result = Boolean(val1.toString().match(new RegExp("^" + val2 + "$", "i")));
            break;
          case 7:
            result = val1.length > val2;
            break;
          case 8:
            result = val1.length < val2;
            break;
          case 9:
            result = val1.length == val2;
            break;
          case 10:
            result = val1.toString().startsWith(val2);
            break;
          case 11:
            result = val1.toString().endsWith(val2);
            break;
          case 12:
            result = Boolean(val1 >= val2);
            break;
          case 13:
            result = Boolean(val1 <= val2);
            break;
          case 14:
            result = Boolean(val1.toString().match(new RegExp(val2)));
            break;
          case 15:
            const val3 = branch.value2;
            if(parseFloat(val1.toString().replace(",", ".")) >= parseFloat(val2.toString().replace(",", ".")) && parseFloat(val1.toString().replace(",", ".")) <= parseFloat(val3.toString().replace(",", "."))) {
              result = true;
            }
            break;
          case 16:
            const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"]
            result = conditions.some(el => val1.includes(el));
            break;
          case 17:
            const conditionsX = val2
            result = conditionsX.some(els => val1.includes(els));
            break;
          case 18:
            const conditionsZ = val2
            result = conditionsZ.some(elz => val1 == (elz));
            break;
          case 19:
            result = val1 % 2 == 0
            break;
          case 20:
            result = val1 % 2 == 1
            break;
          case 21:
            result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
            break;
          case 22:
            result = Boolean(Array.isArray(val1));
            break;
          case 23:
            const isImageUrl = require('is-image-url');
            result = isImageUrl(val1);
            break;
          case 24:
            result = typeof val1 === "string";
            break;
          case 25:
            const isUrl = require("is-url");
            result = isUrl(val1);
            break;
        }
        if (result) {
          this.executeSubActionsThenNextAction(branch.actions, cache);
          break;
        }
      }
    }
    if (!result) {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

  modInit(data) {
    if (Array.isArray(data?.branches)) {
      for (let i = 0; i < data.branches.length; i++) {
        const branch = data.branches[i];
        this.prepareActions(branch.actions);
      }
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
