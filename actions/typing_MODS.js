module.exports = {
  name: 'Bot Typing MOD',
  section: 'Bot Client Control',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },
  
  subtitle(data, presets) {
    return `${presets.getChannelText(data.channel, data.varName)}`;
  },

  fields: ['channel', 'varName'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<channel-input dropdownLabel="Canal de origem" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

<br><br><br>

  <p>
    <b>Após 10 segundos o Bot vai parar de digitar automaticamente ou quando uma mensagem é enviada.<b>
  </p>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = await this.getChannelFromData(data.channel, data.varName, cache);

    channel.sendTyping();

    this.callNextAction(cache);
  },

  mod() {},
};
