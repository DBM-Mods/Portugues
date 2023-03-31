module.exports = {
  name: 'Check if File Exists MOD',
  section: 'File Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ['filePath', "branch"],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div style="float: left; width: 60%">
<span class="dbminputlabel">Arquivo</span><br>
  <input id="filePath" placeholder="./resources" class="round" type="text">
</div><br><br><br>
<hr class="subtlebar">

<br>
<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>`
  },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const fs = require('fs')
    const path = this.evalMessage(data.filePath, cache)
    let result
    if (path) {
      result = fs.existsSync(path)
    } else {
      console.log('O caminho está faltando.')
    }
    this.executeResults(result, data?.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
