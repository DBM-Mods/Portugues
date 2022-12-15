module.exports = {
  name: "Fetch Channel MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">Buscar por ${data.channel}</font>`
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, "Canal"];
  },

  fields: ["modo", "channel", "voz", "iffalse", "iffalseVal", "varName", "storage", "description", "descriptionx", "descriptioncolor"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>
  
    <style>
      .dbmmodsbr1 {
        position: absolute;
        bottom: 0px;
        border: 0px solid rgba(50,50,50,0.7);
        background: rgba(0,0,0,0.7);
        color: #999;
        padding: 5px;
        left: 0px;
        z-index: 999999;
        cursor: pointer;
      }
  
      .dbmmodsbr2 {
        position: absolute;
        bottom: 0px;
        border: 0px solid rgba(50,50,50,0.7);
        background: rgba(0,0,0,0.7);
        color: #999;
        padding: 5px;
        right: 0px;
        z-index: 999999;
        cursor: pointer;
      }
    </style>

    <div id="flutuador" style="padding:0px 0px 15px 0px">
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

    <div style="float: left; width: 25%;">
     <span class="dbminputlabel">Buscar por</span>
     <select id="modo" class="round">
        <option value="0">ID</option>
        <option value="1">Nome</option>
     </select>
    </div>

    <div style="float: left; width: 75%; padding-left: 18px;">
      <span class="dbminputlabel">Pesquisar por</span>
      <input type="text" class="round" id="channel">
    </div>

      <br><br><br><br>
      
      <dbm-checkbox id="voz" label="Incluir canais de voz"></dbm-checkbox>
      
      <br>
  
      <div style="float: left; width: 40%">
        <span class="dbminputlabel">Se o canal não existir</span>
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

    const xinelaslinks = document.getElementsByClassName("xinelaslink");
    for (let x = 0; x < xinelaslinks.length; x++) {
      const xinelaslink = xinelaslinks[x];
      const url = xinelaslink.getAttribute('data-url');
      if (url) {
        xinelaslink.setAttribute('title', url);
        xinelaslink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const find = this.evalMessage(data.channel, cache);
    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    let channels;

    if(data.voz) {
      channels = this.getDBM().Bot.bot.channels.cache;
    } else {
      channels = this.getDBM().Bot.bot.channels.cache.filter((c) => c.type != "GUILD_VOICE");
    }

    if(data.modo == "0") {
      result = channels.get(find);
    } else {
      result = channels.find((c) => c.name === find);
    }

    if (Boolean(result)) {
      this.storeValue(result, storage, varName, cache);
      this.callNextAction(cache);
    } else {
      this.executeResults(false, data, cache);
    }
  },

  mod() {},
};