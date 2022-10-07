module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Multi Remove Item from List MOD",

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
    return `Remover ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}`;
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

<dialog-list id="branches" fields='["mode", "position", "quantidade", "value"]' dialogResizable dialogTitle="Item" dialogWidth="600" dialogHeight="400" listLabel="Itens" listStyle="height: calc(100vh - 300px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="padding-top:20px;margin-right:10px;margin-left:10px;" onmouseover="(function(){
        var aselect = document.getElementById('mode');
        var avalue = aselect.options[aselect.selectedIndex].value;

        document.getElementById('divValue').style.display = 'none';
        document.getElementById('divValue2').style.display = 'none';
        document.getElementById('divValue3').style.display = 'none';



        if(avalue == '2') {
          document.getElementById('divValue').style.display = 'block';
        } else if(avalue == '4') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('divValue2').style.display = 'block';
        } else if(parseInt(avalue) >= 5 && parseInt(avalue) <= 15) {
          document.getElementById('divValue3').style.display = 'block';
        }
    })()">

      <span class="dbminputlabel">Tipo</span><br>
      <select id="mode" class="round" onchange="(function(){
        var aselect = document.getElementById('mode');
        var avalue = aselect.options[aselect.selectedIndex].value;

        document.getElementById('divValue').style.display = 'none';
        document.getElementById('divValue2').style.display = 'none';
        document.getElementById('divValue3').style.display = 'none';



        if(avalue == '2') {
          document.getElementById('divValue').style.display = 'block';
        } else if(avalue == '4') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('divValue2').style.display = 'block';
        } else if(parseInt(avalue) >= 5 && parseInt(avalue) <= 15) {
          document.getElementById('divValue3').style.display = 'block';
        }
      })()">
        <option value="0" selected>Remover do fim</option>
        <option value="1">Remover da frente</option>
        <option value="2">Remover de uma posição específica</option>
        <option value="3">Remover de uma posição aleatória</option>
        <option value="4">Remover vários itens</option>
        <option value="5">Remover todos os itens iguais a</option>
        <option value="6">Remover todos os itens que incluem</option>
        <option value="7">Remover todos os itens menores que</option>
        <option value="8">Remover todos os itens menores que ou igual a</option>
        <option value="9">Remover todos os itens maiores que</option>
        <option value="10">Remover todos os itens maiores que ou igual a</option>
        <option value="11">Remover todos os itens que comprimento é maior que</option>
        <option value="12">Remover todos os itens que comprimento é menor que</option>
        <option value="13">Remover todos os itens que comprimento é igual a</option>
        <option value="14">Remover todos os itens que começam com</option>
        <option value="15">Remover todos os itens que terminam com</option>
        <option value="16">Remover todos os itens que possuem acentuações</option>
        <option value="17">Remover todos os itens que são números par</option>
        <option value="18">Remover todos os itens que são números ímpar</option>
        <option value="19">Remover todos os itens que são um números</option>
        <option value="20">Remover todos os itens que são um texto</option>
        <option value="21">Remover todos os itens que são uma lista</option>
        <option value="22">Remover todos os itens que são um URL de imagem</option>
        <option value="23">Remover todos os itens que são um URL</option>
      </select>

      <div id="divValue">
        <br>
        <span class="dbminputlabel">Posição</span>
        <input id="position" class="round" type="text">
      </div>

      <div id="divValue2">
        <br>
        <span class="dbminputlabel">Quantidade de itens a remover</span>
        <input id="quantidade" class="round" type="text">
      </div>

      <div id="divValue3">
        <br>
        <span class="dbminputlabel">Valor</span>
        <input id="value" class="round" type="text">
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
      const mode = parseInt(data.mode);

      switch(mode) {
        case 0:
          result += "Remover do fim";
          break;
        case 1:
          result += "Remover da frente";
          break;
        case 2:
          result += `Remover da posição ${data.position}`;
          break;
        case 3:
          result += "Remover de uma posição aleatória";
          break;
        case 4:
          result += `Remover ${data.quantidade == 1 ? data.quantidade + " item" : data.quantidade + " itens"} da posição ${data.position}`;
          break;
        case 5:
          result += `Remover itens iguais: ${data.value}`;
          break;
        case 6:
          result += `Remover itens que incluem: ${data.value}`;
          break;
        case 7:
          result += `Remover itens menores que ${data.value}`;
          break;
        case 8:
          result += `Remover itens menores que ou igual a ${data.value}`;
          break;
        case 9:
          result += `Remover itens maiores que ${data.value}`;
          break;
        case 10:
          result += `Remover itens maiores que ou igual a ${data.value}`;
          break;
        case 11:
          result += `Remover itens que o comprimento é maior que ${data.value}`;
          break;
        case 12:
          result += `Remover itens que o comprimento é menor que ${data.value}`;
          break;
        case 13:
          result += `Remover itens que o comprimento é igual a ${data.value}`;;
          break;
        case 14:
          result += `Remover itens que começam com: ${data.value}`;
          break;
        case 15:
          result += `Remover itens que terminam com: ${data.value}`;
          break;
        case 16:
          result += "Remover itens que possuem acentuações";
          break;
        case 17:
          result += "Remover itens que são números par";
          break;
        case 18:
          result += "Remover itens que são números ímpar"
          break;
        case 19:
          result += "Remover itens que são números";
          break;
        case 20:
          result += "Remover itens que são texto";
          break;
        case 21:
          result += "Remover itens que são lista";
          break;
        case 22:
          result += "Remover itens que são URL de imagem";
          break;
        case 23:
          result += "Remover itens que são URL";
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
    let list = this.getVariable(type, varName, cache);

    if(Array.isArray(list)) {
      const branches = data.branches;

      for(var i = 0; i < branches.length; i++) {
        let branch = branches[i];
        let mode = parseInt(branch.mode);
        let position = parseInt(this.evalMessage(branch.position, cache), 10);
        let quantidade = parseInt(this.evalMessage(branch.quantidade, cache), 10);
        let valor = this.evalMessage(branch.value, cache);

        switch(mode) {
          case 0:
            list.pop();
            break;
          case 1:
            list.shift();
            break;
          case 2:
            if (position < 0) {
              list.shift();
            } else if (position >= list.length) {
              list.pop();
            } else {
              list.splice(position, 1);
            }
            break;
          case 3:
            position = Math.abs(parseInt(Math.random() * list.length));
            if (position < 0) {
              list.shift();
            } else if (position >= list.length) {
              list.pop();
            } else {
              list.splice(position, 1);
            }
            break;
          case 4:
            if (position < 0) {
              list.shift();
            } else if (position >= list.length) {
              list.pop();
            } else {
              let calc = quantidade + position
              list.splice(position, quantidade);
            }
            break;
          case 5:
            for(var i = 0; i < list.length; i++) {
              if(valor.toString() == list[i].toString()) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 6:
            for(var i = 0; i < list.length; i++) {
              if(list[i].includes(valor)) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 7:
            for(var i = 0; i < list.length; i++) {
              if(list[i] < valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 8:
            for(var i = 0; i < list.length; i++) {
                if(list[i] <= valor) {
                  list.splice(i, 1);
                  i -= 1;
                }
            }
            break;
          case 9:
            for(var i = 0; i < list.length; i++) {
              if(list[i] > valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 10:
            for(var i = 0; i < list.length; i++) {
              if(list[i] >= valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 11:
            for(var i = 0; i < list.length; i++) {
              if(list[i].toString().length > valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 12:
            for(var i = 0; i < list.length; i++) {
              if(list[i].toString().length < valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 13:
            for(var i = 0; i < list.length; i++) {
              if(list[i].toString().length == valor) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 14:
            for(var i = 0; i < list.length; i++) {
              if(list[i].toString().startsWith(valor.toString())) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 15:
            for(var i = 0; i < list.length; i++) {
              if(list[i].toString().endsWith(valor.toString())) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 16:
            const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"];
            for(var i = 0; i < list.length; i++) {
              if(conditions.some(el => list[i].toString().includes(el))) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 17:
            for(var i = 0; i < list.length; i++) {
              if(list[i] % 2 == 0) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 18:
            for(var i = 0; i < list.length; i++) {
              if(list[i] % 2 == 1) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 19:
            for(var i = 0; i < list.length; i++) {
              if(!isNaN(parseFloat(list[i].toString().replace(",", ".")))) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 20:
            for(var i = 0; i < list.length; i++) {
              if(typeof list[i] === "string") {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 21:
            for(var i = 0; i < list.length; i++) {
              if(Array.isArray(list[i])) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 22:
            const isImageUrl = require('is-image-url');
            for(var i = 0; i < list.length; i++) {
              if(isImageUrl(list[i])) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
          case 23:
            const isUrl = require('is-url');
            for(var i = 0; i < list.length; i++) {
              if(isUrl(list[i])) {
                list.splice(i, 1);
                i -= 1;
              }
            }
            break;
        }
      }

      this.storeValue(list, type, varName, cache);
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