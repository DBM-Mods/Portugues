module.exports = {
		name: "Data Ranking MOD",
		section: "Data",
		meta: {
		  version: '2.1.7',
		  preciseCheck: true,
		  author: '[XinXyla - 172782058396057602]',
		  authorUrl: 'https://github.com/DBM-Mods/Portugues',
		  downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
		},

		subtitle(data, presets) {
			const storage = presets.variables;
			const ordem = [`Ordem de entrada`,`Ordem decrescente`,`Ordem crescente`];
		return `Coluna (${[(data.dataName)]}) / Classificar (${ordem[parseInt(data.sort, 10)]}) / ${storage[parseInt(data.storage, 10)]} (${data.varName2})`
	},

	variableStorage: function (data, varType) {
		const type = parseInt(data.storage);
		if (type !== varType) return;
		return ([data.varName2, 'JSON']);
	},

	fields: ["alvo", "dataName", "debug", "sort", "inicio", "maxresult", "rankid", "retornar", "resultFormat", "varName2", "storage"],

	html: function (isEvent, data) {
		return `
		<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
		<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


		<span class="dbminputlabel">Local do arquivo data</span><br>
		<input id="alvo" value="./data/players" class="round" type="text">
<br>
		<span class="dbminputlabel">Nome da coluna</span><br>
		<input id="dataName" class="round" type="text">
<br>

<table>
  		<tr>
 		<td class="sep3"><span class="dbminputlabel">Classificar</span><br>
		<select id="sort" class="round" style="width: 100%;">
		<option value="0" selected>Ordem de entrada</option>
		<option value="1" selected>Ordem decrescente</option>
		<option value="2">Ordem crescente</option>
	   	</select></td>
		<td class="sep4">
		<span class="dbminputlabel">A partir de</span><br>
		<input id="inicio" class="round" type="text" placeholder="Opcional">
		</td>
		<td class="sep4">
		<span class="dbminputlabel">Até</span><br>
		<input id="maxresult" class="round" type="text" placeholder="Opcional">
		</td>
  		<td class="sep5"><br><dbm-checkbox id="debug" label="Modo de depuração" checked></dbm-checkbox></td>
 		</tr>
  		</table>		
<br>
		<span class="dbminputlabel">Retornar como</span><br>
		<select id="retornar" class="round" style="width: 100%;" onchange="glob.onChange1(this)">
		<option value="0" selected>Objeto JSON</option>
		<option value="1">Personalizado / LISTA</option>
		<option value="2">Personalizado / TEXTO</option>
		<option value="3">Ranking do ID</option>
   		</select>
   		<div id="personalizado">
   		<textarea id="resultFormat" rows="2" placeholder="RANK + ') ' + TAG + ' : ' + VALOR + ' money'" style="width: 100%;" >RANK + ') ' + TAG + ' : ' + VALOR + ' money'</textarea>
		</div>
		<div id="ranking">
		<input id="rankid" class="round" type="text" placeholder="ID para saber o ranking">
		</div>
<br>
		<table>
  		<tr>
 		<td class="sep1"><span class="dbminputlabel">Armazenar em</span><br>
 		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
  		${data.variables[1]}
  		</select></td>
  		<td class="sep2"><div id="varNameContainer2"><span class="dbminputlabel">Nome da Variavel</span><br>
  		<input id="varName2" class="round" type="text"></div></td>
 		</tr>
  		</table>

<style>
table{width:100%}
.sep1{width:50%;padding:0px 8px 0px 0px}
.sep2{width:50%;padding:0px 0px 0px 0px}
.sep3{width:38%;padding:0px 8px 0px 0px}
.sep4{width:21%;padding:0px 8px 0px 0px}
.sep5{width:20%;padding:0px 0px 0px 0px}
#xin{padding:12px 8px 8px 8px}
</style>
  `
	},

	init () {
		const { glob, document } = this

		glob.onChange1 = function (event) {
			if (event.value == "0") {
			document.getElementById("personalizado").style.display = "none";
			document.getElementById("ranking").style.display = "none";
			} 
			if (event.value == "1" || event.value == "2") {
			document.getElementById("personalizado").style.display = null;
			document.getElementById("ranking").style.display = "none";
			}
			if (event.value == "3") {
				document.getElementById("personalizado").style.display = "none";
				document.getElementById("ranking").style.display = null;
				}
		  }	
			glob.onChange1(document.getElementById("retornar"));
	},

	async action (cache) {
		const data = cache.actions[cache.index];
		const storage = parseInt(data.storage);
		const varName2 = this.evalMessage(data.varName2, cache);
		const alvo = this.evalMessage(data.alvo, cache);
		const rankid = this.evalMessage(data.rankid, cache);
		const retornar = parseInt(data.retornar);
		const sort = parseInt(data.sort)
		const debug = data.debug
		resultFormat = String(this.evalMessage(data.resultFormat, cache));
		if (!resultFormat) {
		  resultFormat = String('TAG + " " + DataValue');
		}
		let TAG
		let ID
		let USERNAME
		let OBJECT
		const {
		JSONPath
		} = require('jsonpath-plus');
		fs = require('fs')

		var file = fs.readFileSync(alvo+'.json', 'utf8');

		if (file) {
			var dataName = this.evalMessage(data.dataName, cache);
			dataName = '[' + "'" + dataName + "'" + ']'

			const isAdd = Boolean(data.changeType === "1");
			let val = this.evalMessage(data.value, cache);

			if(debug == true){
					console.log(`Organizando a coluna (${this.evalMessage(data.dataName, cache)})`)
				}

			if (val !== undefined) {
				var file = JSON.parse(file)
				try {
					var list = []
					var list2 = []
					result = JSONPath({
						path: '$.[?(@' + dataName + ')]*~',
						json: file
					});
					var pull = result;


					ranking = result.length

					var maxresult = parseInt(this.evalMessage(data.maxresult, cache));
					if (!maxresult) {maxresult = result.length;}
					if (maxresult > result.length){maxresult = result.length}

					var inicio = parseInt(this.evalMessage(data.inicio, cache));
					if (!inicio) {inicio = 1}
					if (inicio > result.length){inicio = result.length}

					if(debug == true){
						if(retornar == 3){
							console.log(`Pesquisando ranking de (${rankid}) das ${result.length} colunas ordenadas`)
						} else {
					console.log(`Coletando de ${inicio} a ${maxresult} das ${result.length} colunas ordenadas`)}
				}
					for (var i = 0; i < result.length; i++) {

						var result2 = JSONPath({
							path: '$.' + result[i] + dataName,
							json: file
							
						});


						try {

		
							id = result[i]
							if(result2 == null || result2 == "" || result2 == undefined || result2 == "NaN"){result2 = 0}
							valor = parseFloat(result2)
							if(valor == null || valor == "" || valor == undefined || valor == "NaN"){valor = 0}
							if(id == rankid){ranking = i}
							add = {"id":id,"valor":valor}
							list.push(add);
									

						} catch (err) {if(debug == true){this.displayError(data, cache, err)}}
					}
					switch (sort) {
						case 1:

							result = list.sort(function(a, b){
								return b.valor - a.valor;
							});
							  
							break;
						case 2:

							result = list.sort(function(a, b){
								return a.valor - b.valor;
							});

							break;
						case 0:

							result = list
							
							break;
					}

					if(retornar == 0){
						result = []
						for (let i = (inicio - 1); i < maxresult; i++) {
							result.push(list[i])
							}
					}

					if(retornar == 1 || retornar == 2){
					for (var i = (inicio - 1); i < maxresult; i++) {
						
							try {

							id = list[i].id
							VALOR = list[i].valor
							RANK = i + 1
							const client = this.getDBM().Bot.bot
							object = await client.users.fetch(id);
							let TAG
							let ID
							let USERNAME
							let OBJECT
							if (object) {
								TAG = object.tag || object.user.tag
								ID = object.id || object.user.id
								USERNAME = object.username || object.user.username
								OBJECT = `${object}`
								list2.push(`${eval(resultFormat)}`);
							  }
							
		

						} catch (err) {if(debug == true){this.displayError(data, cache, err)}}
					}

					if(retornar == 1){
						result = ""
						for (let i = 0; i < list2.length; i++) {
							result += list2[i]
							}
					}
					if(retornar == 2){
						result = ""
					    for (let i = 0; i < list2.length; i++) {
							  result += String(list2[i]) + "\n"
							  }
					
					}
				}

				if(retornar == 3){
					result = ranking
				}
                 
	
				} catch (err) {if(debug == true){this.displayError(data, cache, err)}}

				if(debug == true){
				if(result.length > 0 || retornar == 3){
				console.log(result)} else {
				console.log("Data Ranking MOD: A coluna não existe!")}
				}

				this.storeValue(result, storage, varName2, cache)
				this.callNextAction(cache);
			}
		}



	},

	mod: function (DBM) {}

};
