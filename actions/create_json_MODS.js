module.exports = {
  name: "Create JSON MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.7',
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

    const storage = presets.variables;

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "JSON"];
  },


  fields: ["json", "storage", "varName", "valueeval", "descriptioncolor", "description", "descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 140px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<dialog-list id="json" fields='["titulo","itens"]' dialogTitle="Objetos" dialogResizable dialogWidth="500" dialogHeight="510" listLabel="Objetos" listStyle="height: calc(100vh - 360px);" itemName="Item" itemCols="1" itemHeight="40px;" itemTextFunction="data.titulo" itemStyle="text-align: left; line-height: 40px;">

<div style="width: 100%; padding: 10px">

<span class="dbminputlabel">Título do objeto</span><br>
<input id="titulo" class="round" type="text">
  
<br>

<dialog-list id="itens" fields='["posicao","nome"]' dialogTitle="Itens" dialogWidth="500" dialogResizable dialogHeight="510" listLabel="Itens" listStyle="height: calc(100vh - 200px);" itemName="Item" itemCols="1" itemHeight="40px;" itemTextFunction="data.nome + ' ( ' +data.posicao.length + ' informações )'" itemStyle="text-align: left; line-height: 40px;">
<div style="width: 100%; padding: 10px">

<span class="dbminputlabel">Nome do item</span><br>
<input id="nome" class="round" type="text">

<br>

<dialog-list id="posicao" fields='["item","valor"]' dialogTitle="Informações do item" dialogResizable dialogWidth="500" dialogHeight="510" listLabel="Informações do item" listStyle="height: calc(100vh - 190px);" itemName="Item" itemCols="1" itemHeight="40px;" itemTextFunction="data.item + ' = ' + data.valor" itemStyle="text-align: left; line-height: 40px;">
<div style="width: 100%; padding: 10px">


<span class="dbminputlabel">Nome do Subitem</span><br>
<input id="item" class="round" type="text">

<br>

<span class="dbminputlabel">Valor do Subitem</span><br>
<textarea id="valor" rows="6" class="round" name="is-eval" style="width:100%"></textarea>

</div>
</dialog-list>
</div>
</dialog-list>

</div>
</dialog-list>
<br>

<table><tr><td class="td1">
<span class="dbminputlabel">Resultado em</span><br>
		<select id="storage" class="round">
		${data.variables[1]}
		</select><br>
	</td>
	<td class="td2">
  <span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName" class="round" type="text"><br>
    </td></tr></table>

    </div>

<style>
table{width:100%}
.td1{padding:0px 5px;width:50%}
.td2{padding:0px 5px;width:50%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },


  init: function () {
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

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const jsons = data.json;

    const obj = JSON.parse("{}")

    for (var i = 0; i < jsons.length; i++) {
      const json = jsons[i]
      const itens = jsons[i].itens
      titulo = this.evalMessage(json.titulo, cache)

      obj[titulo] = []

      for (var i2 = 0; i2 < itens.length; i2++) {
        const posicoes = jsons[i].itens[i2].posicao

        const infoitens = JSON.parse("{}")

        for (var i3 = 0; i3 < posicoes.length; i3++) {
          var xitens = jsons[i].itens[i2].posicao[i3]

          nome = this.evalMessage(xitens.item, cache)
          valor = this.evalMessage(xitens.valor, cache)

          infoitens[nome] = valor

        }

        obj[titulo].push(infoitens)

      }

    }

    result = JSON.stringify(obj)

    if (result) {
      const varName = this.evalMessage(data.varName, cache);
      const storage = parseInt(data.storage, 10);
      this.storeValue(result, storage, varName, cache);
    }

    this.callNextAction(cache);
  },


  mod() { },
};
