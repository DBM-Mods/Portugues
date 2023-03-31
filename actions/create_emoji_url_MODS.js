module.exports = {
  name: "Create Emoji URL MOD",
  section: "Emoji/Sticker Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${data.emojiName}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage2, 10);
    if (type !== varType) return;
    return [data.varName2, "Emoji"];
  },


 fields: ["emojiName", "storage", "varName", "storage2", "varName2", "iffalse", "iffalseVal"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
	<span class="dbminputlabel">Nome do Emoji</span><br>
	<input id="emojiName" class="round" type="text">
</div>

<br>

<retrieve-from-variable allowSlashParams dropdownLabel="Url da Imagem" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable

<br><br><br><br>

<div style="padding-top: 8px;">
<div style="float: left; width: 40%">
<span class="dbminputlabel">Se o emoji não for adicionado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selecionado>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</div>
<div id="iffalseContainer" style="display: none; float: right; width: 55%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
<br><br><br>

<br>

<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Armazenar em</span><br>
			<select id="storage2" class="round" onchange="glob.onComparisonChanged(this)">
				${data.variables[0]}
			</select>
		</div>
		<div id="varNameContainer2" style="float: right; width: 60%;">
		<span class="dbminputlabel">Nome da Variável</span><br>
			<input id="varName2" class="round" type="text">
		</div>
	</div>

`;
  },


  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("varNameContainer2").style.display = "none";
      } else {
        document.getElementById("varNameContainer2").style.display = null;
      }
    };

    glob.onComparisonChanged(document.getElementById("storage2"));

    
    glob.onComparisonChanged2 = function (event) {
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

    glob.onComparisonChanged2(document.getElementById("iffalse"));

    },

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = cache.server;
    if (!server?.emojis) return this.callNextAction(cache);
    const varName2 = this.evalMessage(data.varName2, cache)
    const storage2 = parseInt(data.storage2, 10)
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const image = this.getVariable(type, varName, cache);

    try {
      await server.emojis
      .create(image, this.evalMessage(data.emojiName, cache))
      .then((emoji) => {
        this.storeValue(emoji, storage2, varName2, cache);
        this.callNextAction(cache);
      })
    } catch (err) {
      this.displayError(data, cache, err)
      erros = err.stack
      this.storeValue(erros, storage2, varName2, cache)
      this.executeResults(false, data, cache)
    }    


  },

  mod() {},
};
