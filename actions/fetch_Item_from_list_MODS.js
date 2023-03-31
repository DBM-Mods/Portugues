module.exports = {
  name: 'Fetch Item From List MOD',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const list = [
      'Membros do servidor',
      'Canais do servidor',
      'Cargos do servidor',
      'Emojis do servidor',
      'Todos os servidores do bot',
      'Cargos de usuário mencionados',
      'Cargos do autor do comando',
      'Variável Temporaria',
      'Variável Servidor',
      'Variável Global',
    ];
    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }
    const info = ['exatamente igual a', 'inclua', 'matches regex', 'menor que', 'menor ou igual a', 'maior que', 'maior ou igual a', 'comprimento maior que', 'comprimento menor que', 'comprimento igual a', 'começa com', 'termina com', 'possui acentuações', 'É um URL de imagem', 'É um URL', 'Não é um URL de imagem', 'Não é um URL', 'É um número', 'É um texto', 'Que inclua ~ Ignorar Minúscula/Maiúscula', 'Que inclua ~ Ignorar acentuações','Que inclua ~ Ignorar acentuações & Minúscula e Maiúscula</option'];
    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Buscar ${info[parseInt(data.buscadoxin)]} "${data.item}" em "${data.varName}"</font>`;
  },

  variableStorage(data, varType) {
    const prse2 = parseInt(data.buscadoxin);
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'Number'[prse2]];
  },

  fields: ['list', 'varName', 'buscadoxin', 'item', 'storage', 'varName2', 'iffalse', 'iffalseVal', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.8</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<div style="float: left; width: 35%;">
<span class="dbminputlabel">Lista</span><br>
  <select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
    ${data.lists[isEvent ? 1 : 0]}
  </select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
<span class="dbminputlabel">Nome da variavel</span><br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>
<br><br><br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Buscar posição do item</span><br>
			<select id="buscadoxin" class="round" onchange="glob.onComparisonChanged2(this)">
				<option value="0" selected>Exatamente igual a</option>
				<option value="1">Que inclua</option>
        <option value="19">Que inclua ~ Ignorar Minúscula/Maiúscula</option>
        <option value="20">Que inclua ~ Ignorar acentuações</option>
        <option value="21">Que inclua ~ Ignorar acentuações & Minúscula e Maiúscula</option>
        <option value="2">Matches Regex</option>
        <option value="7">O comprimento é maior que</option>
        <option value="8">O comprimento é menor que</option>
        <option value="9">O comprimento e igual a</option>
        <option value="10">Começa com</option>
        <option value="11">Termina com</option>
        <option value="3">Menor que</option>
        <option value="4">Menor ou igual a</option>
        <option value="5">Maior que</option>
        <option value="6">Maior ou igual a</option>
        <option value="12">Possui acentuações</option>
        <option value="13">É um URL de imagem</option>
        <option value="14">É um URL</option>
        <option value="15">Não é um URL de imagem</option>
        <option value="16">Não é um URL</option>
        <option value="17">É um número</option>
        <option value="18">É um texto</option>
			</select>
		</div>
<div style="padding-top: 8px;" id="xingoxyla">
    <textarea id="item" rows="2" placeholder="Insira uma variável ou algum texto. Esses '' não são necessários!" style="width: 100%; font-family: monospace; white-space: nowrap;"></textarea>
</div><br>


<table><tr><td class="col1">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
    </td>
    <td class="col2">
  <div id="varNameContainer2">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName2" class="round" type="text">
  </div>
  </td></tr></table>
<br>
<table><tr><td class="col1">
<span class="dbminputlabel">Se não for encontrado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0">Continuar ações</option>
<option value="1" selecionado>Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</td>
<td class="col2">
<div id="iffalseContainer" style="display: none"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</td></tr></table>


</div>
<style>	

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

table{width:100%}
.col1{width:35%;padding:0px 10px 0px 0px}
.col2{width:65%}
</style>
`;
  },

  init() {
    const { glob, document } = this;

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


    glob.onComparisonChanged2 = function (event) {
      if (event.value <= 11 || event.value >= 19) {
        document.getElementById("xingoxyla").style.display = null;
      } else {
        document.getElementById("xingoxyla").style.display = "none";
      }
    }

    glob.onComparisonChanged2(document.getElementById("buscadoxin"));


    glob.onChange1 = function onChange1(event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById('positionHolder');
      if (value < 3) {
        dom.style.display = 'none';
      } else {
        dom.style.display = null;
      }
    };

    glob.listChange(document.getElementById('list'), 'varNameContainer');

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

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.list, 10);
    const varName = this.evalMessage(data.varName, cache);
    list = await this.getList(storage, varName, cache);
    const buscadoxin = parseInt(data.buscadoxin);
    const item = this.evalMessage(data.item, cache);

    let result;

    switch (buscadoxin) {
      case 0:
        result = list.findIndex((i) => i === item);
        break;
      case 1:
        result = list.findIndex((i) => i.includes(item));
        break;
      case 2:
        result = list.findIndex((i) => Boolean(i.match(new RegExp('^' + item + '$', 'i'))));
        break;
      case 3:
        result = list.findIndex((i) => parseFloat(i) < parseFloat(item));
        break;
      case 4:
        result = list.findIndex((i) => parseFloat(i) <= parseFloat(item));
        break;
      case 5:
        result = list.findIndex((i) => parseFloat(i) > parseFloat(item));
        break;
      case 6:
        result = list.findIndex((i) => parseFloat(i) >= parseFloat(item));
        break;
      case 7:
        result = list.findIndex((i) => Boolean(i.length > parseFloat(item)));
        break;
      case 8:
        result = list.findIndex((i) => Boolean(i.length < parseFloat(item)));
        break;
      case 9:
        result = list.findIndex((i) => Boolean(i.length == parseFloat(item)));
        break;
      case 10:
        result = list.findIndex((i) => i.startsWith(item));
        break;
      case 11:
        result = list.findIndex((i) => i.endsWith(item));
      case 12:
        const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]

        result = list.findIndex((i) => conditions.some(el => i.includes(el)));
        break;
      case 13:
        isImageUrl = require('is-image-url');
        result = list.findIndex((i) => isImageUrl(i));
        break;
      case 14:
        isUrl = require("is-url");
        result = list.findIndex((i) => isUrl(i));
        break;
      case 15:
        isImageUrl = require('is-image-url');
        not = false
        for (var ix = 0; ix < list.length; ix++) {
          if (isImageUrl(list[ix]) == false && not == false) {
            result = [ix]
            not = true
          }
        }
        break;
      case 16:
        isUrl = require("is-url");
        not = false
        for (var ix = 0; ix < list.length; ix++) {
          if (isUrl(list[ix]) == false && not == false) {
            result = [ix]
            not = true
          }
        }
        break;
      case 17:
        result = list.findIndex((i) => Boolean(!isNaN(parseFloat(i.toString().replace(",", ".")))));
        break;
      case 18:
        result = list.findIndex((i) => typeof (i) == "string");
        not = false
        for (var ix = 0; ix < list.length; ix++) {
          if (not == false) {
            itens = Math.floor(list[ix])
            if (itens.toString() == "NaN") {
              not = true
              result = [ix]
            }
          }
        }
        break;
      case 19:
        result = list.findIndex((i) => i.toLowerCase().includes(item.toLowerCase()));
        break;
      case 20:
        var listarem = list.map(item => item.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        tratar = item.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        result = listarem.findIndex((i) => i.includes(tratar));
        break;
      case 21:
        var listarem = list.map(item => item.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
        tratar = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        result = listarem.findIndex((i) => i.toLowerCase().includes(tratar));
        break;
    }


    if (result !== undefined) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage2 = parseInt(data.storage, 10);
      this.storeValue(result, storage2, varName2, cache);
    }

    if (result == -1) { this.executeResults(false, data, cache) } else {
      this.callNextAction(cache)
    }
  },

  mod() { },
};
