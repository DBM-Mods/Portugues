module.exports = {

    name: 'Backup MOD',
    section: 'Other Stuff',
    meta: {
      version: '2.1.6',
      preciseCheck: true,
      author: '[Tempest - 321400509326032897]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data) {
      return `Backup ${data.pastaBackup}`;
    },

    fields: ['pastaBackup', 'backupNome', 'log', 'nextAction'],
  
    html(_isEvent, data) {
      return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
   <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
   <span class="dbminputlabel">Pasta a fazer Backup</span>
    <input id="pastaBackup" class="round" type="text" placeholder="Ex: data">
  </div>
  <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Nome do Backup</span>
    <input id="backupNome" class="round" type="text" placeholder="Ex: backup">
  </div>
  <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Log no console</span>
  <select id="log" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>
  <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Chamar próxima action</span>
  <select id="nextAction" class="round">
      <option value="0" selected>Sim</option>
      <option value="1">Não</option>
  </select>
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const zip = require('zip-local');

        var pastaBackup = this.evalMessage(data.pastaBackup, cache);
        pastaBackup = "./" + pastaBackup.toString().replace("./", "");
        var backupNome = this.evalMessage(data.backupNome, cache);
        backupNome = backupNome.toString().replace(".zip", "").replace(".rar", "") + ".zip";
        const log = parseInt(data.log, 10);
        const nextAction = parseInt(data.nextAction, 10);

        zip.sync.zip(pastaBackup).compress().save(backupNome);

        switch (log) {
          case 0:
              console.log("Backup feito com sucesso!");
            break;
          case 1:
            break;
        }

        switch (nextAction) {
            case 0:
                this.callNextAction(cache);
              break;
            case 1:
                this.endActions(cache);
              break;
          }
    },
  
    mod() {},
  };
  
