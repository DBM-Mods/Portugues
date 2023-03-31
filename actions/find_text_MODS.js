module.exports = {
name: "Find Text MOD",
section: "Other Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
	return `Encontrar "${data.find}" em "${data.text}"`;
},

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	let dataType = 'Número';
	return ([data.varName, dataType]);
},

fields: ["text", "position", "find", "mai", "ace", "storage", "varName","iffalse", "iffalseVal"],


html: function(isEvent, data) {
	return `
	<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

	<div style="width: 100%; padding:10px 5px;height: calc(100vh - 180px);overflow:auto">

	<span class="dbminputlabel">Texto</span><br>
	<textarea id="text" rows="3" style="width: 100%; font-family: monospace; white-space: nowrap"></textarea>

	<br>

	<table><tr><td class="col1">
	<span class="dbminputlabel">Posição</span><br>
		<select id="position" class="round">
			<option value="0" selected>Início do texto</option>
			<option value="1">Fim do texto</option>
	</select>
	</td>
	<td class="col2">
	<span class="dbminputlabel">Encontrar o texto</span><br>
		<input id="find" class="round" type="text">
		</td></tr></table>

	<br>
	<div style="width:100%">
	<dbm-checkbox id="mai" style="float:left" label="Mesmo com maiúscula/minúscula" checked></dbm-checkbox> <dbm-checkbox style="float:left" id="ace" label="Mesmo com acentuações" checked></dbm-checkbox>
	</div>
	
	<br><br>

<table><tr><td class="col1">
<span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
        ${data.variables[1]}
    </select>
</td>
<td class="col2">
<span class="dbminputlabel">Nome da Variavel</span><br>
        <input id="varName" class="round" type="text">
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
table{width:100%}
.col1{width:35%;padding:0px 10px 0px 0px}
.col2{width:65%}
</style>`
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

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    text = this.evalMessage(data.text, cache);
    find = this.evalMessage(data.find, cache);
    const position = parseInt(data.position, 10);

if(data.mai == true){
	find = find.toString().toLowerCase()
	text = text.toString().toLowerCase()
}

if(data.ace == true){
const comAcentos = "ÄÅÁÂÀÃĀĂĄāăąäáâàãÉÊËÈĖĘĚĔĒėęěĕēéêëèÍÎÏÌİĮĪıįīíîïìÖÓÔÒÕŐŌőōöóôòõÜÚÛŲŰŮŪųűůūüúûùÇĆČçćčÑŇŅŃñňņńŸÝÿýŹŻŽźżžŁĽĻĹłľļĺĶķĢĞģğĎďŚŠŞśšşŤȚŢťțţŔŘŕř";
const semAcentos = "AAAAAAAAAaaaaaaaaEEEEEEEEEeeeeeeeeeIIIIIIIiiiiiiiOOOOOOOoooooooUUUUUUUuuuuuuuuCCCcccNNNNnnnnYYyyZZZzzzLLLLllllKkGGggDdSSSsssTTTtttRRrr";                           

find = find.toString();
text = text.toString();

for(var i = 0; i <= comAcentos.length; i++) {
	text = text.replaceAll(comAcentos[i], semAcentos[i])
	find = find.replaceAll(comAcentos[i], semAcentos[i])
}

}

	let result;

    switch (position) {
      case 0:
        result = text.indexOf(find);
        break;
      case 1:
		if(text.indexOf(find) >= 0){
        result = find.length + text.indexOf(find)} else
		{result = -1}
        break;
      default:
        break;
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(result, storage, varName, cache);

    if(result == -1){this.executeResults(false, data, cache)}else{
    this.callNextAction(cache)}
  },

  mod() {},
};