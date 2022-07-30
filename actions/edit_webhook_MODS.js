module.exports = {
  name: 'Edit Webhook MOD',
  section: 'Webhook Control',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle(data) {
    return `${data.webhookName}`;
  },
  fields: ['webhookName', 'webhookIcon', 'webhook', 'varName'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

      <div style="float: left; width: 35%;">
      <span class="dbminputlabel">Webhook</span><br>
      <select id="webhook" class="round" onchange="glob.refreshVariableList(this)">
        ${data.variables[1]}
      </select>
    </div>
  
    <div id="varNameContainer" style="float: right; width: 60%;">
    <span class="dbminputlabel">Nome da Variavel</span><br>
      <input id="varName" class="round" type="text" list="variableList"><br>
    </div>
  </div><br><br><br>
  <div style="padding-top: 8px;width: 100%;">
  <span class="dbminputlabel">Novo nome do Webhook</span><br>
    <input id="webhookName" class="round" type="text">
  </div><br>
  <div style="width: 100%;">
  <span class="dbminputlabel">Novo icone URL do webhook</span><br>
    <input id="webhookIcon" class="round" type="text">
  </div>
  <div>
  </div>`;
  },

  init() {
    const { glob, document } = this;
    glob.channelChange(document.getElementById('webhook'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const webhookobj = parseInt(data.webhook, 10);
    const varName = this.evalMessage(data.varName, cache);
    const Mods = this.getMods();
    const webhook = Mods.getWebhook(webhookobj, varName, cache);

    if (!webhook) return this.callNextAction(cache);

    const avatar = this.evalMessage(data.webhookIcon, cache);
    const name = this.evalMessage(data.webhookName, cache);
    if (avatar && name) {
      webhook.edit({ avatar, name });
    } else if (avatar) {
      webhook.edit({ avatar });
    } else if (name) {
      webhook.edit({ name });
    }
    this.callNextAction(cache);
  },
  mod() {},
};
