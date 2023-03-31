module.exports = {

    name: 'Difference Between Dates MOD',
    section: 'Other Stuff',
    meta: {
      version: '2.1.7',
      preciseCheck: true,
      author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data) {
      return `Diferença entre ${data.date || "Nova data"} e ${data.date2 || "Nova data"}`;
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      if (data.mode) {
        return [data.varName, "Texto"];
      } else {
        return [data.varName, "Número"];
      }
    },
  
    fields: ['date', 'date2', 'format','mode', 'storage', 'varName'],
  
    html(_isEvent, data) {
      return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

      <div style="float: left; width: 65%">
        <span class="dbminputlabel">Formato da data</span>
        <input type="text" id="format" class="round" placeholder="Ex: DD/MM/YYYY HH:mm:ss">
      </div>

    <dbm-checkbox id="mode" label="Converter segundos" style="float: right;margin-top: 10px;"></dbm-checkbox>
    
    <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
    <span class="dbminputlabel">Data 1</span>
    <input id="date" class="round" type="text" placeholder='22/02/2022 22:22:22 ou deixe em branco para uma nova data.'>
  </div>
  <div style="float: left; width: 100%; padding-top: 10px; padding-bottom: 15px;">
  <span class="dbminputlabel">Data 2</span>
    <input id="date2" class="round" type="text" placeholder='22/02/2022 22:22:22 ou deixe em branco para uma nova data.'>
  </div>
  <div style="float: left; width: 35%; padding-top: 8px;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
  <span class="dbminputlabel">Nome da variável</span><br>
    <input id="varName" class="round" type="text">
  </div>`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const moment = require('moment');

        const date = this.evalMessage(data.date, cache) || new Date();
        const date2 = this.evalMessage(data.date2, cache) || new Date();
        const format = this.evalMessage(data.format, cache) || "DD/MM/YYYY HH:mm:ss";

        let conta = parseFloat(moment(date2, format).format("X"));
        conta -= parseFloat(moment(date, format).format("X"));

        if(isNaN(conta)) {
          result = "Invalid Date";
        } else {
          if(data.mode) {
            let time = conta;

            let s = time;

            let m = Math.floor(s / 60);
            s = s % 60;
            let h = Math.floor(m / 60);
            m = m % 60;
            let a = Math.floor(time / 60 / 60 / 24 / 365.242214);
            let mes = Math.floor(time / 60 / 60 / 24 / 30.43685116666667 - (a * 12));
            let d = Math.floor(h / 24 - (a * 365.242214) - (30.43685116666667 * mes));
            h = h % 24;

            result = (a > 1 ? '' + a + 'anos ' : '') + (a == 1 ? '' + a + 'ano ' : '') + (mes > 1 ? '' + mes + 'meses ' : '') + (mes == 1 ? '' + mes + 'mês ' : '') + (d > 1 ? d + 'd ' : '') + (d == 1 ? ''+ d + 'd ' : '') + (h > 1 ? h + 'h ' : '') + (h == 1 ? ''+ h + 'h ' : '') + (m > 0 ? m + 'm ' : '') + (s > 0 ? s + 's' : '');
          } else {
            result = conta;
          }
        }

        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };