module.exports = {
  name: "Remove Item from List MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const storage = presets.variables;
    return `Remover Item em ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage2, 10);
    if (type !== varType) return;
    return [data.varName2, "Unknown Type"];
  },

  fields: ["storage", "varName", "removeType", "position", "quantidade", "valor", "storage2", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<retrieve-from-variable dropdownLabel="Lista" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div>
	<div style="float: left; width: 100%;">
		<span class="dbminputlabel">Tipo</span><br>
		<select id="removeType" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Remover do fim</option>
      <option value="1">Remover da frente</option>
      <option value="2">Remover de uma posição específica</option>
      <option value="3">Remover vários itens</option>
      <option value="4">Remover todos os itens iguais a</option>
      <option value="5">Remover todos os itens que incluem</option>
		</select><br>
	</div>
	<div id="positionHolder" style="float: right; width: 100%; display: none;">
		<span class="dbminputlabel">Posição</span><br>
		<input id="position" class="round" type="text"><br>
	</div>
  <div id="quantidades" style="float: right; width: 100%; display: none;">
  <span class="dbminputlabel">Quantidade de itens a remover</span><br>
  <input id="quantidade" class="round" type="text"><br>
</div>
<div id="valores" style="float: right; width: 100%; display: none;">
<span class="dbminputlabel">Valor</span><br>
<input id="valor" class="round" type="text"><br>
</div>
</div><br><br><br>
<store-in-variable allowNone dropdownLabel="Armazenar em" style="padding-top: 8px;" selectId="storage2" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("positionHolder");
      const qt = document.getElementById("quantidades");
      const va = document.getElementById("valores");
      if (value < 2) {
        dom.style.display = "none";
        qr.style.display = "none";
        va.style.display = "none";
      }
      if (value == 2) {
        dom.style.display = null;
        qt.style.display = "none";
        va.style.display = "none";
      }
      if (value == 3) {
        dom.style.display = null;
        qt.style.display = null;
        va.style.display = "none";
      }
      if (value > 3) {
        dom.style.display = "none";
        qt.style.display = "none";
        va.style.display = null;
      }
    };

    glob.onChange1(document.getElementById("removeType"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const list = this.getVariable(storage, varName, cache);
    const valor = this.evalMessage(data.valor, cache);
    const type = parseInt(data.removeType);

    let result;
    switch (type) {
      case 0:
        result = list.pop();
        break;
      case 1:
        result = list.shift();
        break;
      case 2:
        const position = parseInt(this.evalMessage(data.position, cache));
        if (position < 0) {
          result = list.shift();
        } else if (position >= list.length) {
          result = list.pop();
        } else {
          result = list[position];
          list.splice(position, 1);
        }
        break;
      case 3:
        const position2 = parseInt(this.evalMessage(data.position, cache));
        const quantidade2 = parseInt(this.evalMessage(data.quantidade, cache));
        if (position2 < 0) {
          result = list.shift();
        } else if (position2 >= list.length) {
          result = list.pop();
        } else {
          calc = quantidade2 + position2;
          result = list.slice(position2, calc);
          list.splice(position2, quantidade2);
        }
        break;
      case 4:
        result = list.filter((el) => el.toString() !== valor.toString());
        break;
      case 5:
        result = list.filter((el) => !el.toString().includes(valor.toString()));
        break;
    }

    const varName2 = this.evalMessage(data.varName2, cache);
    const storage2 = parseInt(data.storage2, 10);
    this.storeValue(result, storage2, varName2, cache);

    this.callNextAction(cache);
  },

  mod() { },
};