module.exports = {

	name: "Sort List MOD",
	section: "Lists and Loops",
	meta: {
		version: '2.1.7',
		preciseCheck: true,
		author: '[xinxyla - 172782058396057602]',
		authorUrl: 'https://github.com/DBM-Mods/Portugues',
		downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
	},


	subtitle: function (data) {

		if (data.descriptionx == true) {
			desccor = data.descriptioncolor
		} else {
			desccor = 'none'
		}

		const list = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global'];
		const classic = ['Ordem crescente [0-9]', 'Ordem decrescente [9-0]', 'Ordem alfabética [A-Z]', 'Ordem alfabética reversa [Z-A]', 'Comprimento [ordem crescente]', 'Comprimento [ordem decrescente]'];

		return data.description
			? `<font style="color:${desccor}">${data.description}</font>`
			: `<font style="color:${desccor}">(${classic[parseInt(data.sorte)]}) ${list[parseInt(data.list)]} (${data.varName}) para ${list[parseInt(data.storage)]} (${data.varName2})</font>`
	},


	variableStorage(data, varType) {
		if (parseInt(data.storage, 10) !== varType) return;
		return [data.varName2, 'List'];
	},


	fields: ["list", "varName", "storage", "varName2", "sorte", "descriptioncolor", "description", "descriptionx"],

	html: function (isEvent, data) {
		return `
		<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
		<div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.3</div>

		<div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
<br>

	<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Fonte da Lista</span><br>
			<select id="list" class="round" onchange="glob.refreshVariableList(this)">
				${data.variables[1]}
			</select><br>
		</div>
		<div id="varNameContainer" style=" float: right; width: 60%;">
		<span class="dbminputlabel">Nome da variável</span><br>
			<input id="varName" class="round" type="text" list="variableList"><br>
		</div><br><br><br>
		<div style=" float: right; width: 100%;">
		<span class="dbminputlabel">Classificar lista</span><br>
			<select id="sorte" class="round" style="width: 100%;">
			<option value="0" selected>Ordenar números ordem crescente [0-9]</option>
			<option value="1">Ordenar números ordem decrescente [9-0]</option>
				<option value="2">Classificar por ordem alfabética [A-Z]</option>
				<option value="3">Classificar por ordem alfabética reversa [Z-A]</option>
				<option value="4">Classificar por comprimento [ordem crescente]</option>
				<option value="5">Classificar por comprimento [ordem decrescente]</option>
				<option value="6">Embaralhar</option>
			</select>
		</div>
	</div><br><br><br><br>
	<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Armazenar em</span><br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer2" style="float: right; width: 60%;">
		<span class="dbminputlabel">Nome da Variável</span><br>
			<input id="varName2" class="round" type="text">
		</div>
	</div>
	

	</div>
	<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`
	},

	init: function () {
		const { glob, document } = this;

		glob.refreshVariableList(document.getElementById('list'));

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

	action: function (cache) {
		const data = cache.actions[cache.index];
		const storage = parseInt(data.list);
		const varName = this.evalMessage(data.varName, cache);
		const list = this.getVariable(storage, varName, cache);
		const sorte = parseInt(data.sorte);

		let result;


		switch (sorte) {
			case 0:
				result = list.slice().sort((a, b) => a - b);
				break;
			case 1:
				result = list.slice().sort((a, b) => b - a);
				break;
			case 2:
				result = list.slice().sort();
				break;
			case 3:
				result = list.slice().sort().reverse();
				break;
			case 4:
				result = list.slice().sort(function (a, b) { return a.length - b.length });
				break;
			case 5:
				result = list.slice().sort(function (a, b) { return b.length - a.length });
				break;
			case 6:

			const shuffledList = list.slice();

			for (let i = shuffledList.length - 1; i > 0; i--) {
			  const j = Math.floor(Math.random() * (i + 1));
			  [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
			}


				result = shuffledList

				break;
		}

		if (result !== undefined) {
			const storage2 = parseInt(data.storage, 10);
			const varName2 = this.evalMessage(data.varName2, cache);
			this.storeValue(result, storage2, varName2, cache);
		}

		this.callNextAction(cache);
	},

	mod() { },
};
