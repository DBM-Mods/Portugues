module.exports = {
  name: "Delete Bulk Messages MOD",
  section: "Messaging",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]<br>[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Deletar ${data.count} mensagens de ${presets.getChannelText(data.channel, data.varName)}</font>`
  },


  variableStorage: function (data, varType) {
    const type = parseInt(data.storage);
    if (type !== varType) return;
    return ([data.varName3, 'Número']);
  },


  fields: [
    "channel",
    "count",
    "varName",
    "fixed",
    "bots",
    "hum",
    "user",
    "member",
    "varName2",
    "acao",
    "storage",
    "varName3",
    "iffalse",
    "iffalseVal",
    "description",
    "descriptionx",
    "descriptioncolor",
    "actionsError"
  ],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

    <div style="width: 100%; padding:0px 6px;height: calc(100vh - 160px);overflow:auto">

<tab-system>
  <tab label="Config" icon="cogs">
  <div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

  <div style="overflow:hidden;padding-top:2px">
  <channel-input dropdownLabel="Canal" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
</div>
<br>

    <span class="dbminputlabel">Quantidade a deletar</span>
    <input id="count" class="round" type="text">

    <br>

    <span class="dbminputlabel">Ignorar mensagens fixadas (true para ativar)</span>
    <input id="fixed" class="round" type="text" value="false" placeholder="true para ignorar">

    <br>

    <span class="dbminputlabel">Ignorar mensagens de Bots (true para ativar)</span>
    <input id="bots" class="round" type="text" value="false" placeholder="true para ignorar">

    <br>

    <span class="dbminputlabel">Ignorar mensagens de Humanos (true para ativar)</span>
    <input id="hum" class="round" type="text" value="false" placeholder="true para ignorar">

    <br>

    
    
    <table style="width:100%"><tr><td>
    <span class="dbminputlabel">Mensagens do membro...</span>
    <input id="user" class="round" type="text" value="false" placeholder="false para desativar o recurso"></td><td>
    <span class="dbminputlabel">ignore / delete</span>
    <input id="acao" class="round" type="text" value="ignore" placeholder="ignore/delete"></td></tr></table>

<br>

    <div id="divValue">
      <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
      <br><br><br>
    </div>

    </div>
  </tab>

  <tab label="Armazenar & Erros" icon="file image">
  <div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

  <div style="padding:0px 0px 15px 0px">
  <table style="width:100%;"><tr>
  <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
  <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
  </tr></table>
  </div>

  
    <div style="float: left; width: 35%; padding-top: 8px;">
      <span class="dbminputlabel">Mensagens apagadas</span><br>
      <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer3')">
        ${data.variables[0]}
      </select>
    </div>

    <div id="varNameContainer3" style="float: right; display: none; width: 60%; padding-top: 8px;">
      <span class="dbminputlabel">Nome da variável</span><br>
      <input id="varName3" class="round" type="text">
    </div>

    <br><br><br><br>


    <div style="overflow:hidden;padding:4px 0px 0px 0px">
    <div style="float: left; width: 38%" id="xinext">
    <span class="dbminputlabel">Caso não apague</span><br>
    <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
    <option value="0" selected>Continuar ações</option>
    <option value="1">Parar sequência de ação</option>
    <option value="2">Ir para a ação</option>
    <option value="3">Pular as próximas ações</option>
    <option value="4">Ir para a âncora de ação</option>
    <option value="5">Realizar ações e parar</option>
    <option value="6">Realizar ações e continuar</option>
    </select>
    </div>
    
    <div id="iffalseContainer" style="display: none; float: right; width: 60%;">
    <div id="xincontrol"><span id="xinelas" class="dbminputlabel">Para</span><br>
    <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
    </div>
    </div>
    
    <div id="containerxin" style="width:100%;overflow:hidden">
    <br>
    <action-list-input id="actionsError" min-height="100" height="calc(100vh - 350px)"></action-list-input>
    </div>

    </div>
  </tab>
</tab-system>

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
.options {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.options dbm-checkbox {
  margin: 5px;
}
</style>
`;
  },


  init() {

    glob.variableChange(document.getElementById('storage'), 'varNameContainer3');

    const xinelaslinks = document.getElementsByClassName('xinelaslink');
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
      if (event.value == "5" || event.value == "6") {
        document.getElementById("containerxin").style.display = null;
        document.getElementById("xincontrol").style.display = "none";
        document.getElementById("xinext").style.width = "100%";
      } else {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("xincontrol").style.display = null;
        document.getElementById("xinext").style.width = "38%";
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
    const channel = await this.getChannelFromData(data.channel, data.varName, cache);
    const member = await this.getMemberFromData(data.member, data.varName2, cache);
    const memberfind = this.evalMessage(data.member, cache);
    const filtrofixed = this.evalMessage(data.fixed, cache);
    const filtrobots = this.evalMessage(data.bots, cache);
    const filtrohum = this.evalMessage(data.hum, cache);
    const filtrouser = this.evalMessage(data.user, cache);


    if (!channel?.messages) return this.callNextAction(cache);

    const count = Math.min(parseInt(this.evalMessage(data.count, cache), 10), 100);
    const options = {
      limit: count
    };

    if (cache.msg) {
      options.before = cache.msg.id;
    }

    channel.messages
      .fetch(options)
      .then((messages) => {

        if (filtrofixed == true || filtrofixed == "true") {
          messages = messages.filter((el) => el.pinned === false);
        }

        if (filtrobots == true || filtrobots == "true") {
          messages = messages.filter((el) => el.author.bot === false);
        }

        if (filtrohum == true || filtrohum == "true") {
          messages = messages.filter((el) => el.author.bot === true);
        }

        if (filtrouser == true || filtrouser == "true") {

          if (memberfind == "100" || memberfind == "101") {
            const find = this.evalMessage(data.varName2, cache);

            const server = cache.server;
            if (!server?.members) {
              this.callNextAction(cache);
              return;
            }

            if (server.memberCount !== server.members.cache.size) server.members.fetch();
            const members = server.members.cache;

            if (memberfind == "100") {
              member = members.find((m) => m.user?.username === find);
            }

            if (memberfind == "101") {
              member = members.get(find);
            }

          }

          if (this.evalMessage(data.acao, cache) == "delete") {
            messages = messages.filter((el) => el.author.id.toString() == member.id.toString())
          } else {
            messages = messages.filter((el) => el.author.id.toString() !== member.id.toString())
          }
        }

        const storage = parseInt(data.storage);
        const varName3 = this.evalMessage(data.varName3, cache);
        this.storeValue(messages.size, storage, varName3, cache);

        channel
          .bulkDelete(messages, true)
          .then(() => this.callNextAction(cache))
          .catch((err) => {

            this.displayError(data, cache, err)

            if (data.iffalse == "5" || data.iffalse == "6") {

              if (data.iffalse == "5") {
                this.executeSubActions(data.actionsError, cache)
              } else {
                this.executeSubActionsThenNextAction(data.actionsError, cache)
              }

            } else {
              this.executeResults(false, data, cache);
            }
          }
          );
      })
      .catch((err) => {
        this.displayError(data, cache, err)

        if (data.iffalse == "5" || data.iffalse == "6") {

          if (data.iffalse == "5") {
            this.executeSubActions(data.actionsError, cache)
          } else {
            this.executeSubActionsThenNextAction(data.actionsError, cache)
          }

        } else {
          this.executeResults(false, data, cache);
        }
      }
      );
  },

  modInit(data) {
    this.prepareActions(data.actionsError);
  },

  mod(DBM) { },
};
