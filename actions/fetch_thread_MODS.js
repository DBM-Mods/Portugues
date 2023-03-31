module.exports = {
  name: "Fetch Thred MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle() {
    return "";
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Canal"];
  },

  fields: ["thread", "iffalse", "iffalseVal", "varName", "storage"],

  html(isEvent, data) {
    return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

     <span class="dbminputlabel">ID da thread</span>
     <input type="text" class="round" id="thread">

      <br>
  
      <div style="float: left; width: 40%">
        <span class="dbminputlabel">Se a thread não existir</span>
        <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
            <option value="0" selecionado>Continuar ações</option>
            <option value="1">Parar sequência de ação</option>
            <option value="2">Ir para a ação</option>
            <option value="3">Pular as próximas ações</option>
            <option value="4">Ir para a âncora de ação</option>
        </select>
      </div>

      <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
        <span id="xinelas" class="dbminputlabel">Para</span>
        <br>
        <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
      </div>

      <br><br><br><br>
  
      <div id="varNameContainer" style="float: right; width: 60%;">
        <span class="dbminputlabel">Nome da variável</span>
        <input id="varName" class="round" type="text">
      </div>
  
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Armazenar em</span>
        <select id="storage" class="round">
          ${data.variables[1]}
        </select>
      </div>
      `;
  },

  init() {
    glob.onComparisonChanged = function (event) {
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

    glob.onComparisonChanged(document.getElementById("iffalse"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const find = this.evalMessage(data.channel, cache);
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const threads = this.getDBM().Bot.bot.channels.fetch().filter((el) => el.isThread());

    result = threads.get(find);

    if (Boolean(result)) {
      this.storeValue(result, storage, varName, cache);
      this.callNextAction(cache);
    } else {
      this.executeResults(false, data, cache);
    }
  },

  mod() { },
};