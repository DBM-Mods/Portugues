module.exports = {
  name: 'Find Message MOD',
  section: 'Messaging',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Snull - 612775910449610763]<br>[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const info = [
    "Localizar por conteúdo",
    "Localizar por ID",
    "Localizar por timestamp",
    "Localizar por usuário",
    "Localizar mensagens de BOTs",
    "Localizar mensagens de Humanos",
    "Localizar mensagens fixadas",
    `Localizar mensagens entre ${data.search} e ${data.search2 || "Timestamp atual"}`,
    `Localizar mensagens com o comprimento igual a ${data.search}`,
    `Localizar mensagens com o comprimento maior que ${data.search}`,
    `Localizar mensagens com o comprimento menor que ${data.search}`,
    ];

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${info[parseInt(data.info, 10)]}</font>`
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName3, "Mensagem"];
  },

  fields: ["channel", "info", "member", "search", "search2", "storage", "varName", "varName2", "varName3", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.5</div>

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
        cursor: pointer
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
        cursor: pointer
      }
    </style>

  <channel-input dropdownLabel="Canal de origem" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

  <br><br><br>

  <tab-system>

  <tab label="Busca" icon="align left">

      <div style="float: left; width: 70%;">
        <span class="dbminputlabel">Encontrar por</span><br>
        <select id="info" class="round" onchange="glob.change(this)">
          <option value="0" selected>Localizar por conteúdo</option>
          <option value="1">Localizar por ID</option>
          <option value="2">Localizar por timestamp</option>
          <option value="7">Localizar mensagem entre dois timestamp</option>
          <option value="3">Localizar por usuário</option>
          <option value="4">Localizar mensagem de BOTs</option>
          <option value="5">Localizar mensagem de Humanos</option>
          <option value="6">Localizar mensagem fixada</option>
          <option value="8">Localizar mensagem com o comprimento igual a</option>
          <option value="9">Localizar mensagem com o comprimento maior que</option>
          <option value="10">Localizar mensagem com o comprimento menor que</option>
        </select>
      </div>

      <br><br><br>

      <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>

      <div id="divValue" style="float: left; width: 100%;">
        <span class="dbminputlabel" id="span">Buscar por</span><br>
        <input id="search" class="round" type="text"><br>
      </div>
    </div>

      <div id="divValue2" style="padding-left: 10px; float: left; width: 55%;">
        <span class="dbminputlabel">Timestamp Final</span><br>
        <input id="search2" class="round" type="text" placeholder="Deixe em branco para usar o timestamp atual.">
      </div>

    <br><br><br><br>

    <div>
      <div style="float: left; width: 35%;">
      <span class="dbminputlabel">Armazenar em</span><br>
        <select id="storage" class="round">
          ${data.variables[1]}
        </select>
      </div>
      <div id="varNameContainer3" style="float: right; width: 60%;">
      <span class="dbminputlabel">Nome da variavel</span><br>
        <input id="varName3" class="round" type="text"><br>
      </div>
    </div><br><br><br>
    <div>
      <u>Nota:</u><br>
      Este MOD só pode encontrar mensagens por <b>conteúdo</b> nas últimas 100 mensagens.<br>
      Se houver várias mensagens com o mesmo conteúdo, o bot estará sempre usando a mensagem mais antiga (após o início).
    </div>
  </tab>

  <tab label="Config" icon="cogs">
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

    <br>

    <div style="float: left; width: 40%">
      <span class="dbminputlabel">Caso não encontre</span>
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

  </tab>
<tab-system>`;
  },

  init() {
    glob.change = function (event) {
      if(event.value === "7") {
        document.querySelector("member-input").style.display = "none";
        document.getElementById("divValue").style.display = "block";
        document.getElementById("divValue").style.width = "45%";
        document.getElementById("divValue2").style.display = "block";
        document.getElementById("span").innerHTML = "Timestamp Inicial";
      } else if(event.value === "4" || event.value === "5" || event.value === "6") {
        document.querySelector("member-input").style.display = "none";
        document.getElementById("divValue").style.display = "none";
        document.getElementById("divValue2").style.display = "none";
        document.getElementById("span").innerHTML = "Buscar por";
      } else if(event.value === "3") {
        document.querySelector("member-input").style.display = "block";
        document.getElementById("divValue").style.display = "none";
        document.getElementById("divValue2").style.display = "none";
      } else {
        document.querySelector("member-input").style.display = "none";
        document.getElementById("divValue").style.display = "block";
        document.getElementById("divValue").style.width = "100%";
        document.getElementById("divValue2").style.display = "none";
        document.getElementById("span").innerHTML = "Buscar por";
      }
    };

    glob.change(document.getElementById("info"));

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

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = parseInt(data.channel, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    const search = this.evalMessage(data.search, cache);
    const search2 = this.evalMessage(data.search2, cache) || Math.floor(new Date().getTime()/1000.0);
    const targetChannel = await this.getChannel(channel, varName, cache);
    const storage = parseInt(data.storage, 10);
    const varName3 = this.evalMessage(data.varName3, cache);

    if (!targetChannel) return this.callNextAction(cache);

    if(info == 3 || info == 4 || info == 5 || info == 6) {
    } else {
      if(!search) {
        console.error('Erro: Insira algo para pesquisar na ação Find Message.');
        return this.callNextAction(cache);
      }
    }

    if(info == 7) {
      if(!search2) {
        console.error('Erro: Insira algo para pesquisar em "Timestamp 2" na ação Find Message.');
        return this.callNextAction(cache);
      }
    }

    try {
      const messages = await targetChannel.messages.fetch({ limit: 100 });
      let result;

      switch(info) {
          case 0:
            result = messages.find((el) => el.content.includes(search));
            break;
          case 1:
            result = await targetChannel.messages.fetch(search);
            break;
          case 2:
            result = messages.find((el) => el.createdTimestamp.toString() === search.toString());
            break;
          case 3:
            const member = await this.getMemberFromData(data.member, data.varName2, cache);

            if(!member) return this.callNextAction(cache);

            result = messages.find((el) => el.author.id.toString() === member.id.toString());
            break;
          case 4:
            result = messages.find((el) => el.author.bot === true);
            break;
          case 5:
            result = messages.find((el) => el.author.bot === false);
            break;
          case 6:
            result = messages.find((el) => el.pinned === true)
            break;
          case 7:
            result = messages.find((el) => el.createdTimestamp.toString() >= search.toString() && el.createdTimestamp.toString() <= search2.toString());
            break;
          case 8:
            result = messages.find((el) => el.content.length === parseInt(search.toString().replace(",", ".")));
            break;
          case 9:
            result = messages.find((el) => el.content.length > parseInt(search.toString().replace(",", ".")));
            break;
          case 10:
            result = messages.find((el) => el.content.length < parseInt(search.toString().replace(",", ".")));
            break;
      }
      
      this.storeValue(result, storage, varName3, cache);
      this.callNextAction(cache);
    } catch {
      this.executeResults(false, data, cache);
    }

  },

  mod() {},
};
