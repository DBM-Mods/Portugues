module.exports = {
	name: "Google Search MOD",
	section: "Other Stuff",
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


		return data.description
			? `<font style="color:${desccor}">${data.description}</font>`
			: `<font style="color:${desccor}">Obter ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}</font>`
	},

	variableStorage(data, varType) {
		let vars = [];

		for (var i = 0; i < data.branches.length; i++) {
			const type = parseInt(data.branches[i].storage, 10);
			const varName = data.branches[i].varName;

			if (type == varType && varName) {
				let tipo;

				switch (parseInt(data.branches[i].info)) {
					case 0:
						tipo = "Objeto";
						break;
					case 1:
						tipo = "Objeto";
						break;
					case 2:
						tipo = "texto";
						break;
					case 3:
						tipo = "texto";
						break;
					case 4:
						tipo = "URL";
						break;
					case 5:
						tipo = "Número";
						break;

				}

				vars.push(varName);
				vars.push(tipo);
			}
		}

		if (vars.length > 0) {
			return vars;
		}
	},

	fields: ["busca", "descriptioncolor", "description", "descriptionx", "branches"],

	html: function (isEvent, data) {
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


	<div style="width: 100%; padding-top: 8px;">
	<span class="dbminputlabel">Buscar</span><br>
		<textarea id="busca" rows="2" style="width: 100%; font-family: monospace; white-space: nowrap; resize: yes;"></textarea>
	 </div><br>

	 <dialog-list id="branches" fields='["info", "resultado", "storage", "varName"]' dialogResizable dialogTitle="Store" dialogWidth="500" dialogHeight="260" listLabel="Informações" listStyle="height: calc(100vh - 380px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
        
      <div style="margin: 10px;">

      <span class="dbminputlabel">Nº do Resultado</span><br>
        <input id="resultado" value="0" class="round" type="text">

		<br>
	  
      <span class="dbminputlabel">Informação</span><br>
      <select id="info" class="round">
        <option value="0">Objeto</option>
		<option value="1">Objeto do resultado</option>
        <option value="2">Titulo do resultado</option>
        <option value="3">Descrição do resultado</option>
        <option value="4">URL do resultado</option>
		<option value="5">Total de resultados</option>
      </select>
    
      
      <br>
   
      <div style="float: left; width: 35%;">
      <span class="dbminputlabel">Armazenar em</span><br>
        <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
          ${data.variables[1]}
        </select>
      </div>
      <div id="varNameContainer" style="float: right; width: 60%;">
      <span class="dbminputlabel">Nome da Variavel</span><br>
        <input id="varName" class="round" type="text"><br>
      </div>
  
    </div>
    </dialog-list>


<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`
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

		glob.formatItem = function (data, presets) {
			let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
			const info = parseInt(data.info);
			const storage = ['Seu xitadu', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global'];

			switch (info) {
				case 0:
					result += "Objeto";
					break;
				case 1:
					result += "Objeto do resultado";
					break;
				case 2:
					result += "Título do resultado";
					break;
				case 3:
					result += "Descrição do resultado";
					break;
				case 4:
					result += "URL do resultado";
					break;
				case 5:
					result += "Total de resultados";
					break;
			}

			result += ` > ${storage[parseInt(data.storage, 10)]} (${data.varName}) </div>`;
			return result;
		}
	},

	async action(cache) {
		const data = cache.actions[cache.index];
		const busca = this.evalMessage(data.busca, cache).replace(/[\u{0080}-\u{FFFF}]/gu, '');
		const branches = data.branches;

		if (!busca) return console.log('Por favor, escreva algo para o Google!');

		const googleIt = require('google-it')

		googleIt({ query: `${busca}`, 'no-display': 1, limit: 100 })
			.then((retorno) => {

				for (var i = 0; i < branches.length; i++) {
					const branch = branches[i];
					const info = parseInt(branch.info);
					var resultado = parseInt(this.evalMessage(branch.resultado))

					if(resultado > 0){} else {resultado = 0}

					let result

					switch (info) {
						case 0:
							result = retorno
							break
						case 1:
							try {
								result = retorno[resultado]
							} catch (err) { result = undefined }
							break
						case 2:
							try {
								result = retorno[resultado].title
							} catch (err) { result = undefined }
							break
						case 3:
							try {
								result = retorno[resultado].snippet
							} catch (err) { result = undefined }
							break
						case 4:
							try {
								result = retorno[resultado].link
							} catch (err) { result = undefined }
							break
						case 5:
							try {
								result = retorno.length
							} catch (err) { result = 0 }
							break
						default:
							break
					}

					if (result !== undefined) {
						const storage = parseInt(branch.storage, 10);
						const varName = this.evalMessage(branch.varName, cache);
						this.storeValue(result, storage, varName, cache)
					}
				}

				this.callNextAction(cache);

			})
			.catch((e) => {
				console.log(`Google Search MOD: ${e}`);
				this.callNextAction(cache);
			});
	},

	mod() { },
};