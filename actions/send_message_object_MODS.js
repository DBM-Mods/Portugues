module.exports = {
  name: 'Send Message Object MOD',
  section: 'Messaging',
  meta: {
    version: '2.1.7',
    preciseCheck: false,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },
  subtitle(data, presets) {
    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${presets.getMessageText(data.storage2, data.varName2)}</font>`

  },
  variableStorage(data, varType) {
    const type = parseInt(data.storage3, 10);
    if (type !== varType) return;
    return [data.varName3, "Mensagem"];
  },
  fields: ['channel', 'varNamex', 'storage', 'varName', 'storage2', 'varName2', 'storage3', 'varName3', 'descriptioncolor', 'description', 'descriptionx', 'notification', 'iffalse', 'iffalseVal',
    'removeComps',
    'removeEmbeds',
    'removeAttachments', 'reply', 'actionsError', 'errcmd'],

  html(_isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

  <tab-system>
   <tab label="Configuração" icon="save outline">

  <send-reply-target-input dropdownLabel="Enviar para" selectId="channel" variableInputId="varNamex"></send-reply-target-input>

   <br><br><br>

    <div style="float: left; width: 35%;">
<span class="dbminputlabel">Mensagem de origem</span><br>
<select id="storage" class="round" onchange="glob.onChangeMode(this)">
<option value="0" selected>Mensagem do comando</option>
<option value="1">Variavel Temporaria</option>
<option value="2">Variavel Servidor</option>
<option value="3">Variavel Global</option>
</select>
</div>
<div id="xinxylagatu" style="float: right; width: 60%;">
<span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>

    <br><br><br>

    <div style="float: left; width: 35%;">
    <span class="dbminputlabel">Objeto</span><br>
    <select id="storage2" class="round" onchange="glob.onChangeMode2(this)">
    <option value="0" selected>Mensagem do comando</option>
    <option value="1">Variavel Temporaria</option>
    <option value="2">Variavel Servidor</option>
    <option value="3">Variavel Global</option>
    </select>
    </div>
    <div id="xinxylagatu2" style="float: right; width: 60%;">
    <span class="dbminputlabel">Nome da Variavel</span><br>
      <input id="varName2" class="round" type="text" list="variableList">
    </div>

    <br><br><br>

    <store-in-variable allowNone dropdownLabel="Store In" selectId="storage3" variableContainerId="varNameContainer3" variableInputId="varName3"></store-in-variable>

  </tab>

  <tab label="Configurações adicionais" icon="external alternate">
  <div style="width: 100%; padding:8px;height: calc(100vh - 270px);overflow:auto">

  <span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
  <dbm-checkbox id="reply" label="Responda a mensagem de origem" checked></dbm-checkbox>
  <xinspace>
  <dbm-checkbox id="notification" label="@ Notificar membros/cargos" checked></dbm-checkbox>
  <xinspace>
  <dbm-checkbox id="removeComps" label="Remover ou não enviar botões/menus"></dbm-checkbox>
  <xinspace>
  <dbm-checkbox id="removeEmbeds" label="Remover ou não enviar embeds"></dbm-checkbox>
  <xinspace>
  <dbm-checkbox id="removeAttachments" label="Remover ou não enviar anexos"></dbm-checkbox>
  <xinspace>
  <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
  </div><br>


<div id="divValueError2" style="float: left; width: 35%">
      <span class="dbminputlabel">Se ocorrer um erro</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0">Continuar ações</option>
        <option value="1" selecionado>Parar sequência de ação</option>
        <option value="2">Ir para a ação</option>
        <option value="3">Pular as próximas ações</option>
        <option value="4">Ir para a âncora de ação</option>
        <option value="5">Realizar ações e parar</option>
        <option value="99">Realizar ações e continuar</option>
      </select>
    </div>

    <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
      <span id="xinelasT" class="dbminputlabel">Para</span>
      <input id="iffalseVal" class="round" type="text">
    </div>

    <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 430px)"></action-list-input>
              
    <br><br><br>

</div>
  </tab>

  <tab label="Ajuda" icon="help">

  <center>
  <tlt><b>Mensagem de origem</b></tlt>
  <tl><span style="color:Khaki">Esta é a mensagem à qual o bot dará sua resposta.</span></tl><br>
  <center>
  <tlt><b>Objeto</b></tlt>
  <tl><span style="color:Khaki">Esta é a mensagem salva na ação Enviar mensagem com a opção "Não enviar mensagem" definida, também pode ser coleta pela action Store Message Info > Objeto</span></tl><br>

  </div>
  </tab>
  </tab-system>

    <style>
    xinspace{padding:5px 0px 0px 0px;display:block}
    tl{background:rgba(0,0,0,0.1);border: 1px solid rgba(50,50,50,0.1);padding:5px;width:100%;display:block}
    tlt{background:rgba(0,0,0,0.2);border: 1px solid rgba(50,50,50,0.2);padding:2px;width:100%;display:block}
     .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
     .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
    </style>`;
  },

  init() {
    const { glob, document } = this;
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

    glob.onChangeMode = function (message) {
      if (parseInt(message.value) == 0) {
        document.getElementById("xinxylagatu").style.display = "none";
      } else {
        document.getElementById("xinxylagatu").style.display = null;
      }
    }

    glob.onChangeMode(document.getElementById("storage"));

    glob.onChangeMode2 = function (message2) {
      if (parseInt(message2.value) == 0) {
        document.getElementById("xinxylagatu2").style.display = "none";
      } else {
        document.getElementById("xinxylagatu2").style.display = null;
      }
    }

    glob.onChangeMode2(document.getElementById("storage2"));

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

      if (event.value > "4") {
        document.getElementById("divValueError").style.marginTop = "0px";
      } else {
        document.getElementById("divValueError").style.marginTop = "10px";
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

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage)
    const message = await this.getMessageFromData(data.storage, data.varName, cache);
    let target = await this.getSendReplyTarget(parseInt(data.channel), this.evalMessage(data.varNamex, cache), cache);

    const messageToReply = await this.getMessageFromData(parseInt(data.storage2), data.varName2, cache);

    let messageToReplyWN = null;
    if (data.notification) {
      messageToReplyWN = messageToReply;
    } else {
      const notificationObj = { allowedMentions: { repliedUser: false } };
      messageToReplyWN = Object.assign(messageToReply, notificationObj);
    }

    messageToReplyWN.nonce = 0

    if(messageToReplyWN.content == ''){messageToReplyWN.content = null}

    try {
      if (data.removeComps == true) messageToReplyWN.components = [];
    } catch { }
    try {
      if (data.removeEmbeds == true) messageToReplyWN.embeds = [];
    } catch { }

    try {
      if (data.removeAttachments == true) messageToReplyWN.files = [];
    } catch { }



    try {

      if (data.reply == true) {

        message.reply(messageToReplyWN)
          .then(resultMsg => {
            if (parseInt(data.storage3, 10) == 0) {
              this.callNextAction(cache);
            } else {
              this.storeValue(resultMsg, parseInt(data.storage3, 10), this.evalMessage(data.varName3, cache), cache)
              this.callNextAction(cache);
            }



          })
          .catch(err => {
            if (data.errcmd) this.displayError(data, cache, err);

            if (data.iffalse > 0) {
              if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
              if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

              return this.executeResults(false, data, cache);
            } else {
              this.callNextAction(cache);
            }

          });

      } else {

        target
          .send(messageToReplyWN)
          .then(resultMsg => {
            if (parseInt(data.storage3, 10) == 0) {
              this.callNextAction(cache);
            } else {
              this.storeValue(resultMsg, parseInt(data.storage3, 10), this.evalMessage(data.varName3, cache), cache)
              this.callNextAction(cache);
            }
          })
          .catch(err => {
            if (data.errcmd) this.displayError(data, cache, err);

            if (data.iffalse > 0) {
              if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
              if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

              return this.executeResults(false, data, cache);
            } else {
              this.callNextAction(cache);
            }

          });

      }


    } catch (err) {
      if (data.errcmd) this.displayError(data, cache, err);

      if (data.iffalse > 0) {
        if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
        if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

        return this.executeResults(false, data, cache);
      } else {
        this.callNextAction(cache);
      }

    }
  },

  modInit(data) {
    this.prepareActions(data.actionsError);
  },

  mod() { },
};
