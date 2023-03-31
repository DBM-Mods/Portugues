module.exports = {
  name: "Store interaction Info MOD",
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto da interação",
      "ID da interação",
      "Linguagem do autor",
      "Tipo de interação",
      "Token da interação",
      "Canal da interação",
      "ID do canal da interação",
      "Objeto > Opções da Interação",
      "Total de parâmetros",
      "Mensagem da interação",
      "ID da mensagem da interação",
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },


  variableStorage: function (data, varType) {
    const type = parseInt(data.storage);
    const prse2 = parseInt(data.info);
    const info2 = ['Objeto', 'ID', 'Linguagem', 'Tipo', 'Token', 'Canal', 'ID Canal', 'Objeto > Opções', 'Número', 'Mensagem', 'ID Mensagem'];
    if (type !== varType) return;
    return ([data.varName2, info2[prse2]]);
  },


  fields: ["info", "storage", "varName2"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div>
<div style="padding-top: 8px;">
	<span class="dbminputlabel">informação</span><br>
	<select id="info" class="round">
  <option value="0 selected">Objeto da interação</option>
  <option value="1">ID da interação</option>
  <option value="2">Linguagem do autor</option>
  <option value="3">Tipo de interação</option>
  <option value="4">Token da interação</option>
  <option value="9">Mensagem da interação</option>
  <option value="10">ID da mensagem da interação</option>
  <option value="5">Canal da interação</option>
  <option value="6">ID do canal da interação</option>
  <option value="8">Total de parâmetros</option>
  <option value="7">Objeto > Opções da Interação</option>
	</select>
</div>

<br>

<div style="float: left; width: 35%; padding-top: 8px;">
<span class="dbminputlabel">Resultado em</span><br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName2" class="round" type="text">
	</div>`;
  },

  init: function () {
    const { glob, document } = this;

    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const interaction = cache.interaction;
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = interaction;
        break;
      case 1:
        result = interaction.id;
        break;
      case 2:
        result = interaction.locale;
        break;
      case 3:
        result = interaction.type;
        break;
      case 4:
        result = interaction.token;
        break;
      case 5:
        result = interaction.channel;
        break;
      case 6:
        result = interaction.channel.id;
        break;
      case 7:
        result = interaction.options._hoistedOptions;
        break;
      case 8:
        parametros = interaction.options._hoistedOptions
        result = parametros.length
        break;
      case 9:
        result = interaction.message;
        break;
      case 10:
        result = interaction.message.id;
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() { },
};
