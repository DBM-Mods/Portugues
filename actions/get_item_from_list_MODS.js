module.exports = {
  name: "Get Item from List MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data, presets) {
    const list = presets.lists;
    return `Obter item de "${list[parseInt(data.list, 10)]}"`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const list = parseInt(data.list, 10);
    let dataType = "Unknown Type";
    switch (list) {
      case 0:
        dataType = "Server Member";
        break;
      case 1:
        dataType = "Channel";
        break;
      case 2:
      case 5:
      case 6:
        dataType = "Role";
        break;
      case 3:
        dataType = "Emoji";
        break;
      case 4:
        dataType = "Server";
        break;
    }
    return [data.varName2, dataType];
  },


  fields: ["list", "varName", "getType", "position", "escolher", "storage3", "varName3", "storage", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
	<div style="float: left; width: 35%;">
  <span class="dbminputlabel">Lista</span><br>
		<select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
			${data.lists[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Puxar o</span><br>
		<select id="getType" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Primeiro item</option>
      <option value="6">Item do meio</option>
			<option value="1">Último item</option>
      <option value="3">Item na posição</option>
			<option value="2">Item aleatório</option>
      <option value="4">Item aleatório [PAR]</option>
      <option value="5">Item aleatório [ÍMPAR]</option>
      <option value="7">Item aleatório [Escolher]</option>
		</select>
	</div>
	<div id="positionHolder" style="float: right; width: 60%; display: none;">
		<span class="dbminputlabel">Posição</span><br>
		<input id="position" class="round" type="text"><br>
	</div>
  <div id="escolherHolder" style="float: right; width: 60%; display: none;">
		<span class="dbminputlabel">Escolher de X em X</span><br>
		<input id="escolher" class="round" type="text"><br>
	</div>
</div>

<br><br><br><br>

<div style="float: left; width: 35%;">
	<span class="dbminputlabel">Armazenar posição do item</span><br>
		<select id="storage3" class="round" onchange="glob.variableChange(this, 'varNameContainer3')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer3" style="float: right; display: none; width: 60%;">
	<span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName3" class="round" type="text">
	</div>
  <br><br><br><br>
<div style="float: left; width: 35%;">
	<span class="dbminputlabel">Armazenar info do item</span><br>
		<select id="storage" class="round">
		${data.variables[1]}
		</select>
	</div>
	<div style="float: right; width: 60%;">
	<span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName2" class="round" type="text">
	</div>

`
  },


  init() {
    const { glob, document } = this;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("positionHolder");
      const dom2 = document.getElementById("escolherHolder");
      if (value == 3) {
        dom.style.display = null;
      } else {
        dom.style.display = "none";
      }
      if (value == 7) {
        dom2.style.display = null;
      } else {
        dom2.style.display = "none";
      }
    };

    glob.onChange2 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("varNameContainer3");
      if (value == 0) {
        dom.style.display = "none";
      } else {
        dom.style.display = null;
      }
    };



    glob.listChange(document.getElementById("list"), "varNameContainer");
    glob.onChange1(document.getElementById("getType"));
    glob.onChange2(document.getElementById("storage3"));
  },


  async action(cache) {
    const data = cache.actions[cache.index];
    const list = await this.getListFromData(data.list, data.varName, cache);

    const type = parseInt(data.getType, 10);
    let result;
    let result2;
    switch (type) {
      case 0:
        result = list[0];
        result2 = 0;
        break;
      case 1:
        result = list[list.length - 1];
        result2 = Math.floor(list.length - 1);
        break;
      case 2:
        result2 = Math.floor(Math.random() * list.length);
        result = list[result2];
        break;
      case 3:
        const position = parseInt(this.evalMessage(data.position, cache), 10);
        if (position < 0) {
          result = list[0];
          result2 = 0;
        } else if (position >= list.length) {
          result = list[list.length - 1];
          result2 = Math.floor(list.length - 1);
        } else {
          result = list[position];
          result2 = Math.floor(position);
        }
        break;
        case 4:
          calc1 = Math.floor(list.length / 2);
          calc2 = Math.floor(Math.random() * calc1);
          calc3 = Math.floor(calc2 * 2);
          result2 = Math.floor(calc3 + 1)
          result = list[result2];
          break;
        case 5:
          calc1 = Math.ceil(list.length / 2);
          calc2 = Math.floor(Math.random() * calc1);
          result2 = Math.floor(calc2 * 2);
          result = list[result2];
          break;
          case 6:
          calc1 = Math.floor(list.length / 2);
          result2 = Math.floor(calc1);
          result = list[result2];
          break;
          case 7:
            const escolher = parseInt(this.evalMessage(data.escolher, cache), 10);
            calc1 = Math.floor(list.length / escolher);
            calc2 = Math.floor(Math.random() * calc1);
            calc3 = Math.floor(escolher * calc2);
            result2 = Math.floor(calc3)
            result = list[result2];
    }

    if (result) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage2 = parseInt(data.storage, 10);
      this.storeValue(result, storage2, varName2, cache);
    }

    if (result2 !== undefined) {
      const varName3 = this.evalMessage(data.varName3, cache);
      const storage3 = parseInt(data.storage3, 10);
      this.storeValue(result2, storage3, varName3, cache);
    }

    this.callNextAction(cache);
  },


  mod() {},
};
