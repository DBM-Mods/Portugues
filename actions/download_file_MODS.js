module.exports = {
  name: 'Download File MOD',
  section: 'File Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    return `Baixar "${data.url}" para "${data.filePath}/${data.fileName || 'arquivo'}.${data.fileFormat || 'png'}"`;
  },

  fields: ['url', 'fileName', 'fileFormat', 'filePath'],

  html() {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    <div style="width: 100%">
<div style="width: 100%">
<span class="dbminputlabel">URL do arquivo</span><br>
  <input id="url" class="round" type="text"><br>
</div>

<table style="width:100%"><tr><td style="calc(width:100% - 150px)">
  <span class="dbminputlabel">Nome do arquivo</span><br>
  <input id="fileName" class="round" type="text">
  </td><td style="width:150px;padding:0px 0px 0px 20px">
  <span class="dbminputlabel">Formato</span><br>
  <input id="fileFormat" class="round" placeholder="png" type="text">
  </td></tr></table>

<br>
<div style="width: 100%">
<span class="dbminputlabel">Local para armazenar</span><br>
  <input id="filePath" class="round" type="text" placeholder="./resources" value="./resources"><br>
</div>
</div>
`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];

    let url = this.evalMessage(data.url, cache);
    const fileName = this.evalMessage(data.fileName, cache);
    const fileFormat = this.evalMessage(data.fileFormat, cache);
    const filePath = this.evalMessage(data.filePath, cache);
    const Mods = this.getMods();
    const http = require('https');
    const fs = require('fs');
    const path = `${filePath}/${fileName || 'arquivo'}.${fileFormat || 'png'}`;

    if (!Mods.checkURL(url)) {
      url = encodeURI(url);
    }

    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '');
    }

    const ws = fs.createWriteStream(path);
    ws.on('open', () => {
      http.get(url, (res) => res.pipe(ws));
    });

    this.callNextAction(cache);
  },

  mod() {},
};
