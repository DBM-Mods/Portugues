module.exports = {
  name: "Ban Member MOD",
  section: "Member Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data, presets) {

    if(data.descriptionx == true){
      desccor = data.descriptioncolor
      } else {
        desccor = 'none'
      }

if(data.acao == 0){tipo = "Banir"} else {tipo = "Desbanir"}


    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${tipo}: ${data.User}</font>`
  },

  fields: ["acao", "User", "reason", "days", "iffalse", "iffalseVal", "actionsfalse", "descriptioncolor", "description", "descriptionx", "errcmd"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

    <span class="dbminputlabel">Ação</span><br>
		<select id="acao" class="round" onchange="glob.onChange1(this)">
      <option value="0">Banir usuário</options>
      <option value="1">Revogar banimento do usuário</options>
</select>

      <br>

    <span class="dbminputlabel">ID do Usuário</span><br>
    <input class="round" id="User" placeholder="">

<br>

<div>
	<span class="dbminputlabel">Razão</span><br>
	<textarea id="reason" rows="3" placeholder="Insert reason here..." style="white-space: nowrap; resize: yes;"></textarea>
</div><br>

<div id="xinelas1">
  <span class="dbminputlabel">Apagar mensagens dos últimos X segundos</span>
  <input id="days" placeholder="Opcional" class="round" type="text">
  <br>
</div>

<span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(255,255,255,0.2)">
<dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
</div>

<br>


<div>
<div style="float: left; width: 38%" id="xinxylafalse">
<span class="dbminputlabel">Se não for banido/desbanido</span><br>
  <select id="iffalse" class="round" onchange="glob.onChangeFalse(this)">
  <option value="0" selected>Continuar ações</option>
  <option value="1">Parar sequência de ação</option>
  <option value="2">Ir para a ação</option>
  <option value="3">Pular as próximas ações</option>
  <option value="4">Ir para a âncora de ação</option>
  <option value="5">Realizar ações e parar</option>
  <option value="6">Realizar ações e continuar</option>
  </select>
  <br>
  </div>
  <div id="iffalseContainer" style="display: none; float: right; width: 60%;"><div id="xincontrolf"><span id="iffalseName" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="iffalseVal" type="text"></div>
  </div><br></div>
  <div id="containerxinf" style="width:100%;height:calc(100vh - 410px)">
  <br><br>
  <action-list-input id="actionsfalse" height="calc(100vh - 450px)"></action-list-input>
  </div>
  
  </div>
  <style>
    xinspace{padding:10px 0px 0px 0px;display:block}
   .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
   .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
</style>
`;
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

    glob.onChangeFalse = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
      if (event.value == "5" || event.value == "6") {
        document.getElementById("containerxinf").style.display = null;
        document.getElementById("xincontrolf").style.display = "none";
        document.getElementById("xinxylafalse").style.width = "100%";
      } else {
        document.getElementById("containerxinf").style.display = "none";
        document.getElementById("xincontrolf").style.display = null;
        document.getElementById("xinxylafalse").style.width = "38%";
      }
      if (event.value == "2") {
        document.querySelector("[id='iffalseName']").innerText = (`Número da ação`);
      }
      if (event.value == "3") {
        document.querySelector("[id='iffalseName']").innerText = (`Pular ações`);
      }
      if (event.value == "4") {
        document.querySelector("[id='iffalseName']").innerText = (`Nome da âncora`);
      }
    }

    glob.onChangeFalse(document.getElementById('iffalse'));

    glob.onChange1 = function (event) {
      if (event.value == "0") {
        document.getElementById("xinelas1").style.display = null;
      } else {
        document.getElementById("xinelas1").style.display = "none";
      }
    }

    glob.onChange1(document.getElementById('acao'))

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const targetServer = await this.getServerFromData(0, 0, cache);

    if (!targetServer) {
      if (data.iffalse == "5" || data.iffalse == "6") {

        if (data.iffalse == "5") {
          this.executeSubActions(data.actionsfalse, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionsfalse, cache)
        }

      } else {
        this.executeResults(false, data, cache);
      }
    }

    const User = this.evalMessage(data.User, cache)
    const reason = this.evalMessage(data.reason, cache);
    var deleteMessageSeconds = this.evalMessage(data.days, cache)

    if (deleteMessageSeconds == "") { deleteMessageSeconds = 0 }

    var deleteMessageSeconds = parseInt(deleteMessageSeconds)
    const acao = this.evalMessage(data.acao, cache)

    if (acao == "0") {
      try {
        await targetServer.members.ban(User, { deleteMessageSeconds, reason })
          .then(() => {
            this.callNextAction(cache);
          })
      } catch (err) {
        if (data.errcmd === true) { this.displayError(data, cache, err) }

        if (data.iffalse == "5" || data.iffalse == "6") {

          if (data.iffalse == "5") {
            this.executeSubActions(data.actionsfalse, cache)
          } else {
            this.executeSubActionsThenNextAction(data.actionsfalse, cache)
          }

        } else {
          this.executeResults(false, data, cache);
        }


      }
    }

    if (acao == "1") {
      try {
        await targetServer.bans.remove(User, reason)
          .then(() => {
            this.callNextAction(cache);
          })
      } catch (err) {
        if (data.errcmd === true) { this.displayError(data, cache, err) }


        if (data.iffalse == "5" || data.iffalse == "6") {

          if (data.iffalse == "5") {
            this.executeSubActions(data.actionsfalse, cache)
          } else {
            this.executeSubActionsThenNextAction(data.actionsfalse, cache)
          }

        } else {
          this.executeResults(false, data, cache);
        }

      }
    }


  },

  modInit(data) {
    this.prepareActions(data.actionsfalse);
  },


  mod() { },
};
