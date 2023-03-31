module.exports = {
  name: "Timeout Member MOD",
  section: "Member Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]<br>[XinXyla - 172782058396057602]',
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
      : `<font style="color:${desccor}">${presets.getMemberText(data.member, data.varName)}</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.errs, 10);
    if (type !== varType) return;
    return [data.errv, "Texto ~ Erro" ];
  },

  fields: ["opcao", "member", "varName", "tempo", "time", "reason", "iffalse", "iffalseVal", "descriptioncolor", "description", "descriptionx", "errcmd", "errs", "errv", "actionserr"],

  html(isEvent, data) {
    return `
    
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.3</div>

    <div style="width: 100%; padding:1px 5px;height: calc(100vh - 160px);overflow:auto">

    <tab-system style="margin-top: 5px;">
    <tab label="Ação" icon="align left">
    <div style="padding: 8px;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;width:100%">

    <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>

    <br><br><br>

    <div style="float: left; width: 33%">
      <span class="dbminputlabel">Opção</span>
      <select id="opcao" class="round" onchange="glob.change(this)">
        <option value="0" selected>Setar castigo</option>
        <option value="1">Remover castigo</option>
      </select>
    </div>
    
    <div id="campo1" style="float: left; width: 34%;padding:0px 3px">
      <span class="dbminputlabel">Tempo</span><br>
      <select id="tempo" class="round">
        <option value="0" selected>Segundos</option>
        <option value="1">Minutos</option>
        <option value="2">Horas</option>
        <option value="3">Dias</option>
      </select>
    </div>
    <div id="campo2" style="float: left; width: 33%">
      <span class="dbminputlabel">Quantidade</span><br>
      <input id="time" class="round" type="text">
    </div>
    <br><br><br>
    <div>
      <span class="dbminputlabel">Razão</span><br>
      <textarea id="reason" class="dbm_monospace" rows="3" placeholder="Insira a razão aqui..." style="white-space: nowrap; resize: none;"></textarea>
    </div>

<br>

</div>
</tab>
<tab label="Config" icon="settings">
<div style="padding: 8px;height: calc(100vh - 210px);overflow-y: auto;overflow-x: hidden;width:100%">

<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
<br>

<span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
<dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
</div>

<br>

<div>
<div style="float: left; width: 38%" id="xinext">
<span class="dbminputlabel">Se ocorrer um erro</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
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
<div id="iffalseContainer" style="display: none; float: right; width: 60%;"><div id="xincontrol"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</div><br></div>
<div id="containerxin" style="width:100%">
<br><br>
<action-list-input id="actionserr" height="calc(100vh - 450px)"></action-list-input>
</div>

<div style="padding-top:8px">
<table>
  <tr>
  <td class="col1"><span class="dbminputlabel">Mensagem de erro em</span><br>
  <select id="errs" value="0" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
    ${data.variables[0]}
  </select></td>
  <td class="col2"><div id="varNameContainer2"><span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="errv" class="round" type="text"></div></td>
  </tr>
  </table>
</div>
    
    </div>

    </tab>
    </tab-system>

    </div>

<style>
table{width:100%}
.col1{width:38%;padding:0px 10px 0px 0px}
.col2{width:60%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`;
  },


  init() {
    glob.change = function(event) {
      if(event.value === "0") {
        document.getElementById("campo1").style.display = "block";
        document.getElementById("campo2").style.display = "block";
      } else {
        document.getElementById("campo1").style.display = "none";
        document.getElementById("campo2").style.display = "none";
      }
    }

    glob.change(document.getElementById("opcao"));

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
    glob.variableChange(document.getElementById('errs'), 'varNameContainer2');

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    var find = this.evalMessage(data.varName, cache);
    var memberfind = this.evalMessage(data.member, cache);
    var member = await this.getMemberFromData(data.member, data.varName, cache);
    const tempo = parseInt(data.tempo, 10);

    let time = this.evalMessage(data.time, cache);
    if(data.opcao === "0") {
      switch (tempo) {
        case 0: 
        time = time ? Date.now() + time * 1000 : null;
        break;
        case 1: 
        time = time ? Date.now() + time * 60000 : null;
        break;
        case 2:
        time = time ? Date.now() + time * 3600000 : null;
        break;
        case 3:
        time = time ? Date.now() + time * 86400000 : null;
        break;
        default:
        break;
      }
    } else {
      time = time ? Date.now() + 0 : null;
    }
    const reason = this.evalMessage(data.reason, cache);

    if(memberfind == "100" || memberfind == "101"){

      const server = cache.server;
      if (!server?.members) {

        this.storeValue("Cache do Servidor não encontrado", data.errs, this.evalMessage(data.errv, cache), cache)
        if(data.iffalse == "5" || data.iffalse == "6"){

          if(data.iffalse == "5"){
            this.executeSubActions(data.actionserr, cache)
            } else 
            {
            this.executeSubActionsThenNextAction(data.actionserr, cache)
            }

        } else {
          this.executeResults(false, data, cache);
        }

        return;
      }
      if (server.memberCount !== server.members.cache.size) server.members.fetch();
      const members = server.members.cache;

      if(memberfind == "100"){member = members.find((m) => m.user?.username === find);}
      if(memberfind == "101"){member = members.get(find)}
    }

    if (Array.isArray(member)) {
      this.callListFunc(member, "disableCommunicationUntil", [time, reason])
        .then(() => this.callNextAction(cache))
        .catch((err) => {

          if (data.errcmd === true){this.displayError(data, cache, err)}

          this.storeValue(err, parseFloat(data.errs), this.evalMessage(data.errv, cache), cache)

          if(data.iffalse == "5" || data.iffalse == "6"){

            if(data.iffalse == "5"){
            this.executeSubActions(data.actionserr, cache)
            } else 
            {
            this.executeSubActionsThenNextAction(data.actionserr, cache)
            }

          } else {
            this.executeResults(false, data, cache);
          }
        });
    } else if (member?.disableCommunicationUntil) {
      member.disableCommunicationUntil(time, reason)
        .then(() => this.callNextAction(cache))
        .catch((err) => {
          
          if (data.errcmd === true){this.displayError(data, cache, err)}

          this.storeValue(err, parseFloat(data.errs), this.evalMessage(data.errv, cache), cache)

          if(data.iffalse == "5" || data.iffalse == "6"){

            if(data.iffalse == "5"){
              this.executeSubActions(data.actionserr, cache)
              } else 
              {
              this.executeSubActionsThenNextAction(data.actionserr, cache)
              }

          } else {
            this.executeResults(false, data, cache);
          }
        });
    } else {
      this.callNextAction(cache);
    }
  },


  mod() {},
};
