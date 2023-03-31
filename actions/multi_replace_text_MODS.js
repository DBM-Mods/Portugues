module.exports = {
  name: 'Multi Replace Text MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle(data) {const info = ['Substitua o primeiro resultado', 'Substitua todos os resultados'];
  return `${info[data.info]} do texto "${data.text}"`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'list','varName2', 'info', 'por', 'storage', 'varName'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div style="overflow:auto;height:380px;padding:5px">
    <div>
	  <span class="dbminputlabel">Texto</span>
		  <textarea id="text" rows="4" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	  </div>
	  <div>
<br>
<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Lista para substituições</span><br>
			<select id="list" class="round" onchange="glob.onComparisonChanged2(this)">
      ${data.lists[isEvent ? 1 : 0]}
			</select><br>
		</div>
		<div id="varNameContainer2" style=" float: right; width: 60%;">
		<span class="dbminputlabel">Nome da variável</span><br>
			<input id="varName2" class="round" type="text" list="variableList"><br>
		</div><br><br><br>

		       <div style="padding-top: 12px;width: 100%">
      <span class="dbminputlabel">Substituir palavras por</span>
     <input id="por" class="round" type="text">
		  </div>
	  </div>
    <div style="padding-top: 12px; width: 100%;">
	  <span class="dbminputlabel">Modelo</span><br>
	  <select id="info" class="round">
		  <option value="0" selected>Substitua o primeiro resultado</option>
		  <option value="1">Substitua todos os resultados</option>
	  </select>
	  </div>
	  <div style="padding-top: 12px;">
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
      </div></div>
    
    <style>td{padding:5px;}</style>`;
  },

  init() {
    const { glob, document } = this;
  
  glob.onComparisonChanged2 = function (event) {
    if (event.value < "7") {
      document.getElementById("varNameContainer2").style.display = "none";
    } else {
      document.getElementById("varNameContainer2").style.display = null;

    }
  };

  glob.onComparisonChanged2(document.getElementById("list"));

},

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage2 = parseInt(data.list, 10);
    const text = this.evalMessage(data.text, cache);
    const varName2 = this.evalMessage(data.varName2, cache);
    const list = await this.getList(storage2, varName2, cache);
    const info = parseInt(data.info, 10);
    const por = this.evalMessage(data.por, cache);
    let result;
    result = text.toString();

    switch (info) {
      case 0:
        for(var i = 0; i <= list.length; i++) {
          result = result.replace(list[i], por);}
        break;
      case 1:
        for(var i = 0; i <= list.length; i++) {
          result = result.replaceAll(list[i], por);}
        break;
    }



    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod: function (DBM) {
  },
};
