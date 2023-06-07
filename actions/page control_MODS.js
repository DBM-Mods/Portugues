module.exports = {
  name: 'Page Control MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.color
    } else {
      desccor = 'none'
    }


    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Total(${data.total}) Itens por página(${data.pag})</font>`
  },

  variableStorage(data, varType) {

    let vars = [];


            const type1 = parseInt(data.storage, 10)
            const varName1 = data.varName;

            if (type1 == varType && varName1) {
                vars.push(varName1);
                vars.push("Número");
            }
            const type2 = parseInt(data.storage2, 10)
            const varName2 = data.varName2;

            if (type2 == varType && varName2) {
                vars.push(varName2);
                vars.push("Número");
            }
            const type3 = parseInt(data.storage3, 10)
            const varName3 = data.varName3;

            if (type3 == varType && varName3) {
                vars.push(varName3);
                vars.push("Número");
            }
        

        if (vars.length > 0) {
            return vars;
        }

  },

  fields: ['total', 'pag', 'storage', 'varName', 'storage2', 'varName2','storage3', 'varName3', 'color', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="color"></td>
</tr></table>
</div>

<table><tr><td class="td1">
<span class="dbminputlabel">Total de itens</span><br>
<input id="total" class="round" type="text" value="">
</td><td class="td2">
<span class="dbminputlabel">Itens por página</span>
<input id="pag" class="round" type="text" value="10">
</td></tr></table>

<br>

    <table><tr><td class="td1">
    <span class="dbminputlabel">Armazenar pagina total em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
      ${data.variables[0]}
    </select>
	</td><td class="td2" id="varNameContainer2">
  <span class="dbminputlabel">Nome da variável</span><br>
  <input id="varName" class="round" type="text">
</td></tr></table>

<br>

<table><tr><td class="td1">
<span class="dbminputlabel">Armazenar nº do item inicial em</span><br>
<select id="storage3" class="round" onchange="glob.variableChange(this, 'varNameContainer3')">
  ${data.variables[0]}
</select>
</td><td class="td2" id="varNameContainer3">
<span class="dbminputlabel">Nome da variável</span><br>
<input id="varName3" class="round" type="text">
</td></tr></table>

<br>

<table><tr><td class="td1">
<span class="dbminputlabel">Armazenar pagina em</span><br>
<select id="storage2" class="round">
  ${data.variables[1]}
</select>
</td><td class="td2">
<span class="dbminputlabel">Nome da variável</span><br>
<input id="varName2" class="round" type="text">
</td></tr></table>



    </div>
    
    <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
table{width:100%}
.td1{padding:0px;width:50%}
.td2{padding:0px 0px 0px 8px}
</style>
`;
  },

  init() {
    const { glob, document } = this;

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

    glob.onChange2 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("varNameContainer2");
      if (value == 0) {
        dom.style.display = "none";
      } else {
        dom.style.display = null;
      }
    }
    glob.onChange2(document.getElementById("storage"));

    glob.onChange3 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("varNameContainer3");
      if (value == 0) {
        dom.style.display = "none";
      } else {
        dom.style.display = null;
      }
    }
    glob.onChange3(document.getElementById("storage3"));

  },

  action(cache) {
    const data = cache.actions[cache.index]

    total = parseInt(this.evalMessage(data.total, cache))
    itensporpag = parseInt(this.evalMessage(data.pag, cache))

    if(itensporpag > 0){}else{itensporpag = 10}
    if(total > 0){}else{total = 10}

    paginatotal = Math.ceil(total / itensporpag)

    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(paginatotal, type, varName, cache);

    const type2 = parseInt(data.storage2, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const storage2 = this.getVariable(type2, varName2, cache);

    valueiro = parseInt(storage2)

    if (valueiro > 0) { } else { valueiro = 0 }

    if (valueiro > paginatotal) { valueiro = paginatotal }
    if (valueiro <= 0) { valueiro = 1 }

    result = valueiro;
    this.storeValue(result, type, varName2, cache);

    sessao = (valueiro * itensporpag)-itensporpag
    const type3 = parseInt(data.storage3, 10);
    const varName3 = this.evalMessage(data.varName3, cache);
    this.storeValue(sessao, type3, varName3, cache);


    this.callNextAction(cache);
  },

  mod() { },
};
