module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Multi Edit Item from List MOD",

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
    return `Editar ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}`;
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

<dialog-list id="branches" fields='["modo", "mode", "controle", "position", "val" ,"value", "valueeval"]' dialogResizable dialogTitle="Item" dialogWidth="600" dialogHeight="525" listLabel="Itens" listStyle="height: calc(100vh - 300px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="padding-top:20px;margin-right:10px;margin-left:10px;" onmouseover="(function(){
        var aselect = document.getElementById('modo');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '0') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('divValue2').style.display = 'none';
        } else {
          document.getElementById('divValue2').style.display = 'block';
          document.getElementById('divValue').style.display = 'none';
        }

        aselect = document.getElementById('mode');
        avalue = parseInt(aselect.options[aselect.selectedIndex].value);

        document.getElementById('divValue3').style.display = 'none';
        document.getElementById('divValue4').style.display = 'none';

        if(avalue == 2) {
          document.getElementById('divValue3').style.display = 'block';
        } else if(avalue >= 5 && avalue <= 15) {
          document.getElementById('divValue4').style.display = 'block';
        }
    })()">

      <span class="dbminputlabel">Comportamento</span>
      <select id="modo" class="round" onchange="(function(){
        var aselect = document.getElementById('modo');
        var avalue = aselect.options[aselect.selectedIndex].value;

        if(avalue == '0') {
          document.getElementById('divValue').style.display = 'block';
          document.getElementById('divValue2').style.display = 'none';
        } else {
          document.getElementById('divValue2').style.display = 'block';
          document.getElementById('divValue').style.display = 'none';
        }
      })()">
        <option value="0">Texto</option>
        <option value="1">Eval</option>
      </select>

      <br>

      <span class="dbminputlabel">Editar</span><br>
      <select id="mode" class="round" onchange="(function(){
        var aselect = document.getElementById('mode');
        var avalue = parseInt(aselect.options[aselect.selectedIndex].value);

        document.getElementById('divValue3').style.display = 'none';
        document.getElementById('divValue4').style.display = 'none';

        if(avalue == 2) {
          document.getElementById('divValue3').style.display = 'block';
        } else if(avalue >= 5 && avalue <= 15) {
          document.getElementById('divValue4').style.display = 'block';
        }
      })()">
        <option value="4" selected>Editar todos os itens</option>
        <option value="0">Editar último item</option>
        <option value="1">Editar primeiro item</option>
        <option value="2">Editar posição específica</option>
        <option value="3">Editar posição aleatória</option>
        <option value="5">Editar todos os itens iguais a</option>
        <option value="6">Editar todos os itens que incluem</option>
        <option value="7">Editar todos os itens menores que</option>
        <option value="8">Editar todos os itens menores que ou igual a</option>
        <option value="9">Editar todos os itens maiores que</option>
        <option value="10">Editar todos os itens maiores que ou igual a</option>
        <option value="11">Editar todos os itens que comprimento é maior que</option>
        <option value="12">Editar todos os itens que comprimento é menor que</option>
        <option value="13">Editar todos os itens que comprimento é igual a</option>
        <option value="14">Editar todos os itens que começam com</option>
        <option value="15">Editar todos os itens que terminam com</option>
        <option value="16">Editar todos os itens que possuem acentuações</option>
        <option value="17">Editar todos os itens que são números par</option>
        <option value="18">Editar todos os itens que são números ímpar</option>
        <option value="19">Editar todos os itens que são um números</option>
        <option value="20">Editar todos os itens que são um texto</option>
        <option value="21">Editar todos os itens que são uma lista</option>
        <option value="22">Editar todos os itens que são um URL de imagem</option>
        <option value="23">Editar todos os itens que são um URL</option>
      </select>

      <br>

      <div id="divValue3">
        <span class="dbminputlabel">Posição</span>
        <input class="round" id="position" type="text">
        <br>
      </div>

      <div id="divValue4">
        <span class="dbminputlabel">Valor</span>
        <input class="round" id="val" type="text">
        <br>
      </div>

      <span class="dbminputlabel">Tipo de controle</span>
      <select id="controle" class="round">
        <option value="0">Alterar valor</option>
        <option value="1">Adicionar valor</option>
      </select>

      <br>

      <div id="divValue">
        <span class="dbminputlabel">Valor</span>
        <textarea class="round" id="value" rows="3"></textarea>
      </div>

      <div id="divValue2">
        <span class="dbminputlabel">Valor</span>
        <textarea class="round" id="valueeval" rows="3" name="is-eval"></textarea>
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
          result += "Editar último item";
          break;
        case 1:
          result += "Editar primeiro item";
          break;
        case 2:
          result += `Editar posição ${data.position}`;
          break;
        case 3:
          result += "Editar posição aleatória";
          break;
        case 4:
          result += "Editar todos os itens";
          break;
        case 5:
          result += `Editar itens iguais: ${data.val}`;
          break;
        case 6:
          result += `Editar itens que incluem: ${data.val}`;
          break;
        case 7:
          result += `Editar itens menores que ${data.val}`;
          break;
        case 8:
          result += `Editar itens menores que ou igual a ${data.val}`;
          break;
        case 9:
          result += `Editar itens maiores que ${data.val}`;
          break;
        case 10:
          result += `Editar itens maiores que ou igual a ${data.val}`;
          break;
        case 11:
          result += `Editar itens que o comprimento é maior que ${data.val}`;
          break;
        case 12:
          result += `Editar itens que o comprimento é menor que ${data.val}`;
          break;
        case 13:
          result += `Editar itens que o comprimento é igual a ${data.val}`;;
          break;
        case 14:
          result += `Editar itens que começam com: ${data.val}`;
          break;
        case 15:
          result += `Editar itens que terminam com: ${data.val}`;
          break;
        case 16:
          result += "Editar itens que possuem acentuações";
          break;
        case 17:
          result += "Editar itens que são números par";
          break;
        case 18:
          result += "Editar itens que são números ímpar"
          break;
        case 19:
          result += "Editar itens que são números";
          break;
        case 20:
          result += "Editar itens que são texto";
          break;
        case 21:
          result += "Editar itens que são lista";
          break;
        case 22:
          result += "Editar itens que são URL de imagem";
          break;
        case 23:
          result += "Editar itens que são URL";
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
        let valor = this.evalMessage(branch.value, cache);
        let controle = parseInt(branch.controle);
        let val = this.evalMessage(branch.val, cache);

        if(parseInt(branch.modo) == 1) {
          try {
            valor = this.eval(branch.valueeval, cache);
          } catch {
            this.displayError(data, cache, e);
            return this.callNextAction(cache);
          }
        }

        switch(mode) {
          case 0:
            if(controle == 0) {
              list[list.length - 1] = valor;
            } else {
              list[list.length - 1] += valor;
            }
            break;
          case 1:
            if(controle == 0) {
              list[0] = valor;
            } else {
              list[0] += valor;
            }
            break;
          case 2:
            var position = parseInt(this.evalMessage(branch.position, cache));
            if(controle == 0) {
              list[position] = valor;
            } else {
              list[position] += valor;
            }
            break;
          case 3:
            var position = Math.abs(parseInt(Math.random() * list.length));
            if(controle == 0) {
              list[position] = valor;
            } else {
              list[position] += valor;
            }
            break;
          case 4:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                list[i] = valor;
              }
            } else {
              for(var i = 0; i < list.length; i++) {
                list[i] += valor;
              }
            }
            break;
          case 5:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].toString() == val.toString()) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].toString() == val.toString()) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 6:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].toString().includes(val.toString())) {
                  list[i] = valor;
                }
              }
            } else {
              for(var i = 0; i < list.length; i++) {
                if(list[i].toString().includes(val.toString())) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 7:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] < val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] < val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 8:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] <= val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] <= val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 9:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] > val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] > val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 10:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] >= val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] >= val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 11:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].length > val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].length > val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 12:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].length < val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].length < val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 13:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].length == val) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].length == val) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 14:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].toString().startsWith(val.toString())) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].toString().startsWith(val.toString())) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 15:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].toString().endsWith(val.toString())) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i].toString().endsWith(val.toString())) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 16:
            const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"];
           
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(conditions.some(el => list[i].toString().includes(el))) {
                  list[i] = valor;
                }
              }
            } else {
              for(var i = 0; i < list.length; i++) {
                if(conditions.some(el => list[i].toString().includes(el))) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 17:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] % 2 == 0) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] % 2 == 0) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 18:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(list[i] % 2 == 1) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(list[i] % 2 == 1) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 19:
            if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(!isNaN(parseFloat(list[i].toString().replace(",", ".")))) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(!isNaN(parseFloat(list[i].toString().replace(",", ".")))) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 20:
           if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(typeof list[i] === "string") {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(typeof list[i] === "string") {
                  list[i] += valor;
                }
              }
            }
            break;
          case 21:
           if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(Array.isArray(list[i])) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(Array.isArray(list[i])) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 22:
           const isImageUrl = require('is-image-url');

           if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(isImageUrl(list[i])) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(isImageUrl(list[i])) {
                  list[i] += valor;
                }
              }
            }
            break;
          case 23:
           const isUrl = require('is-url');

           if(controle == 0) {
              for(var i = 0; i < list.length; i++) {
                if(isUrl(list[i])) {
                  list[i] = valor;
                }
              }
            } else {
             for(var i = 0; i < list.length; i++) {
                if(isUrl(list[i])) {
                  list[i] += valor;
                }
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