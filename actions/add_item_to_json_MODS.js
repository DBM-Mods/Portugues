module.exports = {
  name: "Add Item to JSON MOD",
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


  fields: ["storage", "varName", "addType", "titulo", "itens","position", "descriptioncolor", "description", "descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 140px);overflow:auto">

    <tab-system style="margin-top: 5px;">

        <tab label="Json & Config" icon="align left">
        <div style="padding:8px;height: calc(100vh - 220px);overflow:auto"">


    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<retrieve-from-variable dropdownLabel="JSON" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
<br><br><br>

<div style="padding:8px 0px 0px 0px">
<span class="dbminputlabel">Nome do Objeto</span><br>
		<input id="titulo" class="round" type="text">
</div>
    <br>

    <div>
	<div style="float: left; width: 45%;">
		<span class="dbminputlabel">Tipo</span><br>
		<select id="addType" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Add no fim</option>
			<option value="1">Add no início</option>
			<option value="2">Add em uma posição específica</option>
		</select>
	</div>

	<div id="positionHolder" style="float: right; width: 50%; display: none;">
		<span class="dbminputlabel">Posição</span><br>
		<input id="position" class="round" type="text"><br>
	</div>
</div>

<br><br><br>
</div>
</tab>
<tab label="Item" icon="align left">
<div style="padding:8px">

    <dialog-list id="itens" fields='["item","valor"]' dialogTitle="Informações do item" dialogResizable dialogWidth="500" dialogHeight="510" listLabel="Informações do item" listStyle="height: calc(100vh - 280px);" itemName="Item" itemCols="1" itemHeight="40px;" itemTextFunction="data.item + ' = ' + data.valor" itemStyle="text-align: left; line-height: 40px;">
    <div style="width: 100%; padding: 10px">
        
    <span class="dbminputlabel">Nome do Subitem</span><br>
    <input id="item" class="round" type="text">
    
    <br>
    
    <span class="dbminputlabel">Valor do Subitem</span><br>
    <textarea id="valor" rows="6" class="round" name="is-eval" style="width:100%"></textarea>
    
    </div>
    </dialog-list>
</div>
</tab>
</tab-system>

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

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("positionHolder");
      if (value < 2) {
        dom.style.display = "none";
      } else {
        dom.style.display = null;
      }
    };

    glob.onChange1(document.getElementById("addType"));

  },

  async action(cache) {
    const data = cache.actions[cache.index];

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);

    if (typeof jsonRaw !== "object") {
      var obj = JSON.parse(this.getVariable(storage, varName, cache));
    } else {
      var obj = this.getVariable(storage, varName, cache);
    }
    const titulo = this.evalMessage(data.titulo, cache);
    const type = parseInt(data.addType, 10);
    const infoitens = JSON.parse("{}")

    if(obj[titulo] == undefined){
      obj[titulo] = []
    }

     for (var i3 = 0; i3 < data.itens.length; i3++) {
      var xitens = data.itens[i3]

      nome = this.evalMessage(xitens.item, cache)
      valor = this.evalMessage(xitens.valor, cache)

      infoitens[nome] = valor

    }


    switch (type) {
      case 0:
        obj[titulo].push(infoitens)
        break;
      case 1:
        obj[titulo].unshift(infoitens)
        break;
      case 2:
        const position = parseInt(this.evalMessage(data.position), 10);
        if (position < 0) {
          obj[titulo].unshift(infoitens);
        } else if (position >= obj[titulo].length) {
          obj[titulo].push(infoitens);
        } else {
          obj[titulo].splice(position, 0, infoitens);
        }
        break;
    }

    console.log(obj)

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
