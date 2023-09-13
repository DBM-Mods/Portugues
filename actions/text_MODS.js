module.exports = {
  name: 'Text MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data, presets) {

      if(data.descriptionx == true){
        desccor = data.color
        } else {
          desccor = 'none'
        }
  
 
      return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.text}</font>`
    },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'color', 'storage', 'tipo', 'separador' , 'varName', 'description','descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.4</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="color"></td>
</tr></table>
</div>

<span class="dbminputlabel">Texto</span>
		  <textarea id="text"rows="6" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;height: calc(100vh - 400px)"></textarea>
	
      <br>

    <table><tr><td class="td1">
		<span class="dbminputlabel">Tipo</span><br>
		<select id="tipo" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Texto</option>
			<option value="1">Converter texto em lista</option>
		</select>
	</td><td class="td2">
	<div id="xinxylasep">
		<span class="dbminputlabel">Separador</span><br>
		<input id="separador" class="round" type="text" value=",">
	</div>
</td></tr></table>

<br>

		  <div style="float: left; width: 35%;">
		  <span class="dbminputlabel">Armazenar em</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
      <span class="dbminputlabel">Nome da variável</span><br>
			  <input id="varName" class="round" type="text">
		  </div>
	  </div>

    </div>
    
    <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
table{width:100%}
.td1{padding:0px}
.td2{padding:0px 0px 0px 8px}
</style>
`;
  },

  init() {
    const { glob, document } = this;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      if (value == 1) {
        document.getElementById("xinxylasep").style.display = null;
      } else {
        document.getElementById("xinxylasep").style.display = "none";
      }
    };

    glob.onChange1(document.getElementById("tipo"));

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
    const data = cache.actions[cache.index]
    var text = this.evalMessage(data.text, cache)
    const tipo = this.evalMessage(data.tipo, cache)
    const separador = this.evalMessage(data.separador, cache)


    if(tipo == "1"){
    text = text.toString().split(new RegExp(separador))
    }

    if (text !== undefined) {
      const storage = parseInt(data.storage, 10)
      const varName = this.evalMessage(data.varName, cache)
      this.storeValue(text, storage, varName, cache)
    }
    this.callNextAction(cache);
  },

  mod() {},
};
