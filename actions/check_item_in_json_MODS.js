module.exports = {
  name: 'Check Item in JSON MOD',
  section: 'Conditions',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle: function (data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const opcao = [
      "Existe",
      `Igual a "${data.value}"`,
      `Exatamente igual "${data.value}"`,
      `Menor que "${data.value}"`,
      `Maior que "${data.value}"`,
      `Inclui "${data.value}"`,
      `Matches Regex "${data.value}"`,
      `O comprimento é maior que "${data.value}"`,
      `O comprimento é meno que "${data.value}"`,
      `O comprimento é igual a "${data.value}"`,
      `Começa com "${data.value}"`,
      `Termina com "${data.value}"`,
      `Maior ou igual a "${data.value}"`,
      `Menor ou igual a "${data.value}"`,
      `Matches Full Regex "${data.value}"`,
      `Entre ${data.value} e ${data.value2}`,
      "Possui acentuações?",
      `Inclui as palavras "${data.value}"`,
      `É igual as palavras "${data.value}"`,
      "É um número par?",
      "É um número ímpar?",
      "É um número",
      "É um texto?",
      "É uma lista?",
      "É um URL de imagem?",
      "É um URL?",
      `Que inclua ~ Ignorar Minúscula/Maiúscula "${data.value}"`,
      `Que inclua ~ Ignorar acentuações "${data.value}"`,
      `Que inclua ~ Ignorar acentuações & Minúscula e Maiúscula "${data.value}"`,
    ]

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<style>div#myactions{background:#000 !important}</style><font style="color:${desccor}">"${data.coluna}" ${opcao[data.type]}</font>`
  },


  fields: ['storage', 'varName', 'type', 'value', 'value2', 'coluna', 'descriptioncolor', 'description', 'descriptionx', 'iffalse', 'iffalseVal', 'actionsno', 'iftrue', 'iftrueVal', 'actionssim'],

  html(_isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>
  
<div style="overflow: hidden;">
  <retrieve-from-variable allowSlashParams dropdownLabel="Variável" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
</div>

<div style="width: 100%">
  <span class="dbminputlabel">Comparar com base na coluna (Use . para sub-colunas)</span><br>
  <input type="text" class="round" id="coluna">
  </div>

  <br>

  <div style="width: 100%">
    <span class="dbminputlabel">Comparador</span><br>
    <select id="type" class="round" onchange="glob.change(this)">
      <option value="0">Existe</option>
      <option value="1" selected>Igual a</option>
      <option value="2">Exatamente igual</option>
      <option value="3">Menor que</option>
      <option value="13">Menor ou igual a</option>
      <option value="4">Maior que</option>
      <option value="12">Maior ou igual a</option>
      <option value="5">Inclui</option>
      <option value="26">Inclui ~ Ignorar Minúscula/Maiúscula</option>
      <option value="27">Inclui ~ Ignorar acentuações</option>
      <option value="28">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
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

  <br>

  <div id="xinoculta">
  <div style="overflow: hidden;">
  <div id="valueDiv" style="float: left; width: 100%">
    <span class="dbminputlabel">Valor</span><br>
    <input id="value" class="round" type="text">
  </div>

  <div id="valueDiv2" style="float: left; width: calc(49vw - 20px); padding-left: 8px;">
    <span class="dbminputlabel">E</span><br>
    <input id="value2" class="round" type="text">
  </div>
  </div>
  <br></div>
<xinspace>
  <div>

  <div style="float: left; width: 38%" id="xinext2">
  <span class="dbminputlabel">Se o item for encontrado</span><br>
  <select id="iftrue" class="round" onchange="glob.onComparisonChanged2(this)">
  <option value="0" selected>Continuar ações</option>
  <option value="1">Parar sequência de ação</option>
  <option value="2">Ir para a ação</option>
  <option value="3">Pular as próximas ações</option>
  <option value="4">Ir para a âncora de ação</option>
  <option value="5">Realizar ações e parar</option>
  <option value="6">Realizar ações e continuar</option>
  </select>
  </div>

  <div id="iftrueContainer" style="display: none; float: right; width: 60%;">

  <div id="xincontrol2"><span id="xinelas2" class="dbminputlabel">Para</span><br>
  <input id="iftrueVal" class="round" name="actionxinxyla2" type="text">
  </div>
  </div>
  <xinspace>
  </div>
  
  <div id="containerxin2" style="width:100%">
  <br><br><br>
  <action-list-input id="actionssim" style="margin-bottom: -40px" min-height="100" height="calc(100vh - 350px)"></action-list-input>
  </div>

  <br><br><br>

  <div>

  <div style="float: left; width: 38%" id="xinext">
  <span class="dbminputlabel">Se o item não for encontrado</span><br>
  <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
  <option value="0" selected>Continuar ações</option>
  <option value="1">Parar sequência de ação</option>
  <option value="2">Ir para a ação</option>
  <option value="3">Pular as próximas ações</option>
  <option value="4">Ir para a âncora de ação</option>
  <option value="5">Realizar ações e parar</option>
  <option value="6">Realizar ações e continuar</option>
  </select>
  </div>

  <div id="iffalseContainer" style="display: none; float: right; width: 60%;">

  <div id="xincontrol"><span id="xinelas" class="dbminputlabel">Para</span><br>
  <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
  </div>

  </div></div>
  
  <div id="containerxin" style="width:100%">
  <br><br><br>
  <action-list-input id="actionsno" style="margin-bottom: -40px" min-height="100" height="calc(100vh - 350px)"></action-list-input>
  </div>

 

</div>

<style>
table{width:100%}
.col1{width:38%;padding:0px 10px 0px 0px}
.col2{width:60%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
xinspace{padding:5px 0px 0px 0px;display:block}
</style>`;
  },

  init() {
    glob.change = function (event) {
      if (event.value == "0" || event.value == "16" || event.value == "19" || event.value == "20" || event.value == "21" || event.value == "24" || event.value == "22" || event.value == "23" || event.value == "25") {
        document.getElementById("valueDiv").style.display = "none";
        document.getElementById("valueDiv").style.width = "100%";
        document.getElementById("valueDiv2").style.display = "none";
        document.getElementById("xinoculta").style.display = "none";
      } else if (event.value == "15") {
        document.getElementById("valueDiv").style.width = "49%";
        document.getElementById("valueDiv").style.display = "block";
        document.getElementById("valueDiv2").style.display = "block";
        document.getElementById("xinoculta").style.display = "block";
      } else {
        document.getElementById("valueDiv").style.display = "block";
        document.getElementById("valueDiv").style.width = "100%";
        document.getElementById("valueDiv2").style.display = "none";
        document.getElementById("xinoculta").style.display = "block";
      }
    };

    glob.change(document.getElementById("type"));

    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
      if (event.value == "5" || event.value == "6") {
        document.getElementById("containerxin").style.display = null;
        document.getElementById("xincontrol").style.display = "none";
        document.getElementById("xinext").style.width = "100%";
      } else {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("xincontrol").style.display = null;
        document.getElementById("xinext").style.width = "38%";
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

    glob.onComparisonChanged2 = function (event) {
      if (event.value > "1") {
        document.getElementById("iftrueContainer").style.display = null;
      } else {
        document.getElementById("iftrueContainer").style.display = "none";
      }
      if (event.value == "5" || event.value == "6") {
        document.getElementById("containerxin2").style.display = null;
        document.getElementById("xincontrol2").style.display = "none";
        document.getElementById("xinext2").style.width = "100%";
      } else {
        document.getElementById("containerxin2").style.display = "none";
        document.getElementById("xincontrol2").style.display = null;
        document.getElementById("xinext2").style.width = "38%";
      }
      if (event.value == "2") {
        document.querySelector("[id='xinelas2']").innerText = (`Número da ação`);
      }
      if (event.value == "3") {
        document.querySelector("[id='xinelas2']").innerText = (`Pular ações`);
      }
      if (event.value == "4") {
        document.querySelector("[id='xinelas2']").innerText = (`Nome da âncora`);
      }
    }

    glob.onComparisonChanged2(document.getElementById("iftrue"));



    const xinelaslinks = document.getElementsByClassName('xinelaslink');
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

  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(storage, varName, cache);
    const value = this.evalMessage(data.value, cache);
    const coluna = this.evalMessage(data.coluna, cache);

    function getNestedValue(obj, columns) {
      const columnArr = columns.split('.');
      let colunas = obj;

      for (let i = 0; i < columnArr.length; i++) {
        if (colunas && colunas.hasOwnProperty(columnArr[i])) {
          colunas = colunas[columnArr[i]];
        } else {
          return undefined;
        }
      }

      return colunas;
    }

    const colunasAninhadas = coluna;

    let result

    switch (parseInt(data.type, 10)) {
      case 0:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) !== value);
        break;
      case 1:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) == value);
        break;
      case 2:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) === value);
        break;
      case 3:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) < value);
        break;
      case 4:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) > value);
        break;
      case 5:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toString().includes(value));
        break;
      case 6:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toString().match(new RegExp('^' + value + '$', 'i')));
        break;
      case 7:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).length > value);
        break;
      case 8:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).length < value);
        break;
      case 9:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).length == value);
        break;
      case 10:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toString().startsWith(value));
        break;
      case 11:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toString().endsWith(value));
        break;
      case 12:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) >= value);
        break;
      case 13:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) <= value);
        break;
      case 14:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toString().match(new RegExp(value)));
        break;
      case 15:
        const value2 = this.evalMessage(data.value2, cache);
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) >= value && item <= value2);
        break;
      case 16:
        const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
        result = variable.findIndex((item) => conditions.some(el => getNestedValue(item, colunasAninhadas).toString().includes(el)));
        break;
      case 17:
        const conditionsX = [...value];
        result = variable.findIndex((item) => conditionsX.some(els => getNestedValue(item, colunasAninhadas).toString().includes(els)));
        break;
      case 18:
        const conditionsZ = [...value];
        result = variable.findIndex((item) => conditionsZ.some(elz => getNestedValue(item, colunasAninhadas) == (elz)));
        break;
      case 19:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) % 2 == 0);
        break;
      case 20:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas) % 2 == 1);
        break;
      case 21:
        result = variable.findIndex((item) => isNaN(parseFloat(getNestedValue(item, colunasAninhadas).toString().replace(",", "."))) == false);
        break;
      case 22:
        result = variable.findIndex((item) => Array.isArray(getNestedValue(item, colunasAninhadas)) == true);
        break;
      case 23:
        const isImageUrl = require('is-image-url');
        result = variable.findIndex((item) => isImageUrl(getNestedValue(item, colunasAninhadas).toString()) == true);
        break;
      case 24:
        result = variable.findIndex((item) => Boolean(typeof getNestedValue(item, colunasAninhadas) === "string") == true);
        break;
      case 25:
        const isUrl = require("is-url");
        result = variable.findIndex((item) => isUrl(getNestedValue(item, colunasAninhadas).toString()) == true);
        break;
      case 26:
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toLowerCase().includes(value.toLowerCase()))
        break;
      case 27:
        tratar = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(tratar));
        break;
      case 28:
        tratar = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        result = variable.findIndex((item) => getNestedValue(item, colunasAninhadas).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(tratar));
        break;
    }


    if (result == -1) {

      if (data.iffalse == "5" || data.iffalse == "6") {

        if (data.iffalse == "5") {
          this.executeSubActions(data.actionsno, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionsno, cache)
        }

      } else {
        this.executeResults(false, data, cache);
      }

    } else {

      if (data.iftrue == "5" || data.iftrue == "6") {

        if (data.iftrue == "5") {
          this.executeSubActions(data.actionssim, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionssim, cache)
        }

      } else {
        this.executeResults(true, data, cache);
      }

    }

  },

  modInit(data) {
    this.prepareActions(data.actionssim);
    this.prepareActions(data.actionsno);
  },

  mod() { },
};
