module.exports = {
  name: "Fetch Thred MOD",
  section: "Channel Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "[Tempest - 321400509326032897]",
    authorUrl: "https://github.com/DBM-Mods/Portugues",
    downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
  },

  subtitle(data) {
    let desccor;

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.thread}</font>`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Canal"];
  },

  fields: ["thread", "description", "descriptionx", "descriptioncolor", "varName", "storage", "iffalse", "iffalseVal", "actionsError"],

  html(isEvent, data) {
    return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
      
      <div id="flutuador" style="padding:0px 0px 15px 0px; margin-top: 5px;">
      <table style="width:100%;"><tr>
          <td>
          <span class="dbminputlabel">Descrição da Action</span>
          <br>
          <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
          </td>
          <td style="padding:0px 0px 0px 10px;width:70px">
          <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px">
              <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
          </div>
          <br>
          <input type="color" value="#ffffff" class="round" id="descriptioncolor">
          </td>
      </table>
      </div>

     <span class="dbminputlabel">ID</span>
     <input type="text" class="round" id="thread" placeholder="ID da thread">

     <br>
  
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

     <br><br><br><br>

      <div style="float: left; width: 40%">
        <span class="dbminputlabel">Se a thread não existir</span>
        <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
            <option value="0" selecionado>Continuar ações</option>
            <option value="1">Parar sequência de ação</option>
            <option value="2">Ir para a ação</option>
            <option value="3">Pular as próximas ações</option>
            <option value="4">Ir para a âncora de ação</option>
            <option value="5">Realizar ações e parar</option>
            <option value="99">Realizar ações e continuar</option>
        </select>
      </div>

      <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
        <span id="xinelasT" class="dbminputlabel">Para</span>
        <br>
        <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
      </div>

      <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 460px)"></action-list-input>
      `;
  },

  init() {
    glob.onComparisonChanged = function (event) {
      if (event.value == "0" || event.value == "1" || event.value == "7") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = "none";
      } else if (event.value == "5" || event.value == "99") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = null;
        document.getElementById("actionsError").style.display = "none";
      }

      if (event.value == "2") {
        document.querySelector("[id='xinelasT']").innerText = "Número da ação";
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelasT']").innerText = "Pular ações";
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelasT']").innerText = "Nome da âncora";
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const find = this.evalMessage(data.thread, cache);
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    const threads = this.getDBM().Bot.bot.channels.cache.filter((el) => el.isThread());

    const result = threads.get(find);

    if (Boolean(result)) {
      this.storeValue(result, storage, varName, cache);
      this.callNextAction(cache);
    } else {
      if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
      if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

      this.executeResults(false, data, cache);
    }
  },

  mod() { },

  modInit(data) {
    this.prepareActions(data.actionsError);
  }
};