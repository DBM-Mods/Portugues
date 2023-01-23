module.exports = {
  name: "Convert List to Text MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const list = presets.lists;

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Converter ${list[parseInt(data.list, 10)]} para texto</font>`
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Text"];
  },


  fields: ["list", "varName", "numero", "start", "start2", "start3", "multi", "end", "end2", "end3", "posicao", "storage", "varName2", "itens", "descriptioncolor", "description", "descriptionx", "limite"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.3</div>

    <tab-system style="margin-top: 0;">
		<tab label="Converter" icon="align left">
    <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">

    <table><tr><td class="col">
     <span class="dbminputlabel">Lista</span><br>
      <select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
        ${data.lists[isEvent ? 1 : 0]}
      </select><br>
    </td>
    <td class="col">
    <div id="varNameContainer">
    <span class="dbminputlabel">Nome da Varivavel</span><br>
      <input id="varName" class="round" type="text" list="variableList"><br></div>
    </td></tr></table>
 

  <table><tr><td class="col">
<span class="dbminputlabel">Resultado em</span><br>
		<select id="storage" class="round">
		${data.variables[1]}
		</select><br>
	</td>
	<td class="col">
  <span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName2" class="round" type="text"><br>
    </td></tr></table>

  </div>
    </tab>
    <tab label="Todos os itens" icon="align left">

<div style="width: 100%; padding: 10px;height: calc(100vh - 210px);overflow:auto">

<dbm-checkbox id="numero" label="Mostrar nº da posição em cada item"></dbm-checkbox>
<br>
	
		<span class="dbminputlabel">Inicio de cada item</span><br>
    <textarea id="start" rows="3" style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
	
<br>
	
		<span class="dbminputlabel">Final de cada item</span><br>
    <textarea id="end" rows="3" style="width: 100%; white-space: nowrap; resize: yes;" value="\\n"></textarea><br>

</div>
</tab>
    <tab label="Itens" icon="align left">
    <div style="width: 100%; padding: 10px;height: calc(100vh - 210px);overflow:auto">


  <span class="dbminputlabel">A cada * itens</span><br>
<input id="multi" class="round" type="text" value="0">
		
<br>

		<span class="dbminputlabel">Adicionar no inicio</span><br>
    <textarea id="start2" rows="3" style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
	
<br>
	
		<span class="dbminputlabel">Adicionar no final</span><br>
    <textarea id="end2" rows="3" style="width: 100%; white-space: nowrap; resize: yes;" value="\\n"></textarea><br>

</div>


</tab>

<tab label="Editar itens" icon="align left">
<dialog-list id="itens" fields='["posicao","start3","end3", "val1", "val2", "comparar", "formula"]' dialogTitle="Editar itens" dialogWidth="500" dialogHeight="510" listLabel="Itens" listStyle="height: calc(100vh - 250px);" itemName="Editar item" itemCols="1" itemHeight="40px;" itemTextFunction="data.formula + ' / Posição: ' + data.posicao" itemStyle="text-align: left; line-height: 40px;">
<div style="padding: 16px;background:rgba(0,0,0,0.3)">
                 <span class="dbminputlabel">Editar</span><br>
                 <select id="formula" class="round">
                 <option value="Editar" selected>Sempre editar o item</option>
                 <option value="Falso">Editar somente se o comparador for falso</option>
                 <option value="Verdadeiro">Editar somente se o comparador for verdadeiro</option>
               </select>
               <br>
                  <table style="width:100%"><tr><td class="col">
                    <span class="dbminputlabel">Valor A</span><br>
                    <input id="val1" class="round" type="text">
                    </td>
                    <td class="col">
                    <span class="dbminputlabel">Comparador</span><br>
                    <select id="comparar" class="round">
                    <option value="0">Valor A - Existe</option>
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
                    <option value="16">Valor A possui acentuações?</option>
                    <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
                    <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                    <option value="19">Valor A é um número par?</option>
                    <option value="20">Valor A é um número ímpar?</option>
                    <option value="21">Valor A é um número?</option>
                    <option value="24">Valor A é um texto?</option>
                    <option value="23">Valor A é um URL de imagem?</option>
                    <option value="25">Valor A é um URL?</option>
                  </select>
                   </td>
                    <td class="col">
                    <span class="dbminputlabel">Valor B</span><br>
                    <input id="val2" class="round" type="text">
                    </td>
                    </tr></table>

        </div>
<div style="width: 100%; padding: 10px">

<span class="dbminputlabel">Posição do item</span><br>
<input id="posicao" class="round" type="text" value="0">
  
<br>

  <span class="dbminputlabel">Adicionar no inicio</span><br>
  <textarea id="start3" rows="3" style="width: 100%; white-space: nowrap; resize: yes;"></textarea>

<br>

  <span class="dbminputlabel">Adicionar no final</span><br>
  <textarea id="end3" rows="3" style="width: 100%; white-space: nowrap; resize: yes;" value="\\n"></textarea><br>

</div>
</dialog-list>
</tab>
<tab label="Config" icon="cogs">
<div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">


<div style="padding-bottom: 12px;padding-top: 12px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:55px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<span class="dbminputlabel">Limite de itens</span><br><input type="text" class="round" id="limite" placeholder="Deixe vazio para desativar">


</div>
</tab>
</tab-system>

<style>
table{width:100%}
.col{padding:0px 5px;width:50%}

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },


  init() {
    const { glob, document } = this;

    glob.listChange(document.getElementById("list"), "varNameContainer");

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
    var list = await this.getListFromData(data.list, data.varName, cache);

    const start = this.evalMessage(data.start, cache).replace("\\n", "\n");
    const end = this.evalMessage(data.end, cache).replace("\\n", "\n");

    const multi = parseFloat(this.evalMessage(data.multi, cache))
    var limite = this.evalMessage(data.limite, cache)
    if (limite == "" || limite == "undefined" || limite == undefined || limite == null) {
      limite = ""
      limiteoff = "off"
    } else {
      limite = parseFloat(this.evalMessage(data.limite, cache))
      list = list.slice(0, limite)
    }

    const start2 = this.evalMessage(data.start2, cache).replace("\\n", "\n");
    const end2 = this.evalMessage(data.end2, cache).replace("\\n", "\n");

    let result = "";
    acont = -1
    acont = acont + multi


    for (let i = 0; i <= (list.length - 1); i++) {

      resultitem = ""

      if (data.numero == true) {
        resultitem = parseFloat(parseFloat([i]) + 1) + resultitem
      }

      if (acont == [i] && multi > 0) {
        acont = acont + multi
        resultitem = resultitem + start + start2 + String(list[i]) + end2
      } else {
        resultitem = resultitem + start + String(list[i]);
      }


      for (let ix = 0; ix < data.itens.length; ix++) {

        const posicao = parseFloat(this.evalMessage(data.itens[ix].posicao, cache))

        if (posicao == [i]) {
          val1 = this.evalMessage(data.itens[ix].val1, cache);
          val2 = this.evalMessage(data.itens[ix].val2, cache);
          resulty = true;

          if (data.itens[i].formula == "Falso" || data.itens[i].formula == "Verdadeiro") {
            const compare = parseInt(data.itens[ix].comparar, 10);
            switch (compare) {
              case 0:
                resulty = val1.toString() !== "undefined";
                break;
              case 1:
                resulty = val1 == val2;
                break;
              case 2:
                resulty = val1 === val2;
                break;
              case 3:
                resulty = parseFloat(val1) < parseFloat(val2);
                break;
              case 4:
                resulty = parseFloat(val1) > parseFloat(val2);
                break;
              case 5:
                if (typeof val1?.toString().includes === "function") {
                  resulty = val1.toString().includes(val2);
                }
                break;
              case 6:
                resulty = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
                break;
              case 7:
                resulty = Boolean(val1.toString().length > val2);
                break;
              case 8:
                resulty = Boolean(val1.toString().length < val2);
                break;
              case 9:
                resulty = Boolean(val1.toString().length == val2);
                break;
              case 10:
                resulty = val1.toString().startsWith(val2);
                break;
              case 11:
                resulty = val1.toString().endsWith(val2);
                break;
              case 12:
                resulty = Boolean(val1 >= val2);
                break;
              case 13:
                resulty = Boolean(val1 <= val2);
                break;
              case 14:
                resulty = Boolean(val1.toString().match(new RegExp(val2)))
                break;
              case 16:
                const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
                resulty = conditions.some(el => val1.includes(el));
                break;
              case 17:
                const conditionsX = val2
                resulty = conditionsX.some(els => val1.includes(els));
                break;
              case 18:
                const conditionsZ = val2
                resulty = conditionsZ.some(elz => val1 == (elz));
                break;
              case 19:
                resulty = val1 % 2 == 0
                break;
              case 20:
                resulty = val1 % 2 == 1
                break;
              case 21:
                resulty = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
                break;
              case 23:
                const isImageUrl = require('is-image-url');
                resulty = isImageUrl(val1);
                break;
              case 24:
                resulty = typeof val1 === "string";
                break;
              case 25:
                const isUrl = require("is-url");
                resulty = isUrl(val1);
            }
          }

          if (data.itens[ix].formula == "Falso") {
            if (resulty == false) {
              resulty = true
            } else { resulty = false }
          }


          if (resulty == true) {
            const start3 = this.evalMessage(data.itens[ix].start3, cache).replace("\\n", "\n");
            const end3 = this.evalMessage(data.itens[ix].end3, cache).replace("\\n", "\n");
            resultitem = start3 + resultitem + end3;
          }

        }

      }



      result += resultitem + end

    }

    if (result) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage2 = parseInt(data.storage, 10);
      this.storeValue(result, storage2, varName2, cache);
    }

    this.callNextAction(cache);
  },


  mod() { },
};
