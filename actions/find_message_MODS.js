module.exports = {
  name: 'Find Message MOD',
  section: 'Messaging',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[Snull - 612775910449610763]<br>[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const info = [
    'Localizar por conteúdo',
    'Localizar por ID',
    'Localizar por timestamp',
    'Localizar por usuário',
    'Localizar mensagens de BOTs',
    'Localizar mensagens de Humanos',
    'Localizar mensagens fixadas',
    `Localizar mensagens entre ${data.search} e ${data.search2}`,
    `Localizar mensagens com o comprimento igual a ${data.search}`,
    `Localizar mensagens com o comprimento maior que ${data.search}`,
    `Localizar mensagens com o comprimento menor que ${data.search}`,
    ];
    return `${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName3, 'Message'];
  },

  fields: ['channel', 'info', 'member', 'search', 'search2', 'storage', 'varName', 'varName2', 'varName3'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

  <channel-input dropdownLabel="Canal de origem" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

  <br><br><br>

  <div style="float: left; width: 70%;">
    <span class="dbminputlabel">Encontrar por</span><br>
    <select id="info" class="round" onchange="glob.change(this)">
      <option value="0" selected>Localizar por conteúdo</option>
      <option value="1">Localizar por ID</option>
      <option value="2">Localizar por timestamp</option>
      <option value="7">Localizar mensagens entre dois timestamp</option>
      <option value="3">Localizar por usuário</option>
      <option value="4">Localizar mensagens de BOTs</option>
      <option value="5">Localizar mensagens de Humanos</option>
      <option value="6">Localizar mensagens fixadas</option>
      <option value="8">Localizar mensagens com o comprimento igual a</option>
      <option value="9">Localizar mensagens com o comprimento maior que</option>
      <option value="10">Localizar mensagens com o comprimento menor que</option>
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
    <input id="search2" class="round" type="text" placeholder='Use "new" para usar o timestamp atual'>
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
<br><br><p>
  <u>Nota:</u><br>
  Este MOD só pode encontrar mensagens por <b>conteúdo</b> nas últimas 100 mensagens.<br>
  Se houver várias mensagens com o mesmo conteúdo, o bot estará sempre usando a mensagem mais antiga (após o início).
</div>`;
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
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = parseInt(data.channel, 10);
    const varName = this.evalMessage(data.varName, cache);
    const info = parseInt(data.info, 10);
    const search = this.evalMessage(data.search, cache);
    const search2 = this.evalMessage(data.search2, cache) === "new" ? Math.floor(new Date().getTime()/1000.0) : this.evalMessage(data.search2, cache);
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


    switch (info) {
      case 0:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            const message = messages.find((el) => el.content.includes(search));
            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 1:
        targetChannel.messages
          .fetch(search)
          .then((message) => {
            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error();
            this.callNextAction(cache);
          });
        break;
      case 2:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            const message = messages.find((el) => el.createdTimestamp.toString() === search.toString());
            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 3:
        const member = await this.getMemberFromData(data.member, data.varName2, cache);

        if (!member) return this.callNextAction(cache);

        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.author.id.toString() === member.id.toString()).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.author.id.toString() === member.id.toString());
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 4:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.author.bot === true).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.author.bot === true);
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 5:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.author.bot === false).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.author.bot === false);
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 6:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.pinned === true).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.pinned === true);
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 7:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.createdTimestamp.toString() >= search.toString() && el.createdTimestamp.toString() <= search2.toString()).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.createdTimestamp.toString() >= search.toString() && el.createdTimestamp.toString() <= search2.toString());
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 8:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.content.length === parseInt(search.toString().replace(",", "."))).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.content.length === parseInt(search.toString().replace(",", ".")));
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 9:
       targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.content.length > parseInt(search.toString().replace(",", "."))).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.content.length > parseInt(search.toString().replace(",", ".")));
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      case 10:
        targetChannel.messages
          .fetch({ limit: 100 })
          .then((messages) => {
            let message = messages.filter((el) => el.content.length < parseInt(search.toString().replace(",", "."))).map(msg => msg);

            if(message.length == 1) {
              message = messages.find((el) => el.content.length < parseInt(search.toString().replace(",", ".")));
            }

            if (message !== undefined) {
              this.storeValue(message, storage, varName3, cache);
            }
            this.callNextAction(cache);
          })
          .catch((err) => {
            console.error(err);
            this.callNextAction(cache);
          });
        break;
      default:
        this.callNextAction(cache);
    }
  },

  mod() {},
};
