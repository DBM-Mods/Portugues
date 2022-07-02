module.exports = {
  name: "Create Emoji URL MOD",
  section: "Emoji/Sticker Control",
  meta: {
    version: '2.1.5',
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


 fields: ["emojiName", "storage", "varName", "storage2", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
	<span class="dbminputlabel">Nome do Emoji</span><br>
	<input id="emojiName" class="round" type="text">
</div>

<br>

<div>
		<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Url da Imagem</span><br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div style="float: right; width: 60%;">
		<span class="dbminputlabel">Nome da Variável</span><br>
			<input id="varName" class="round" type="text">
		</div>
	</div>

<br><br><br><br>

<hr class="subtlebar" style="margin-top: 0px;">

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

    },

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = cache.server;
    if (!server?.emojis) return this.callNextAction(cache);

    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const image = this.getVariable(type, varName, cache);
    server.emojis
      .create(image, this.evalMessage(data.emojiName, cache))
      .then((emoji) => {
        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(emoji, storage, varName2, cache);
        this.callNextAction(cache);
      })
      .catch((err) => this.displayError(data, cache, err));
  },

  mod() {},
};
