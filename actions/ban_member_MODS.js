module.exports = {
  name: "Ban Member MOD",
  section: "Member Control",
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${data.User}`;
  },

  fields: ["acao", "User", "reason", "days", "iffalse", "iffalseVal"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

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
  <span class="dbminputlabel">Número de dias de mensagens a serem excluídas</span>
  <input id="days" placeholder="Opcional" class="round" type="text">
  <br>
</div>


<div style="float: left; width: 40%">
<span class="dbminputlabel">Se não for banido/desbanido</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selecionado>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</div>
<div id="iffalseContainer" style="display: none; float: right; width: 55%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
<br><br><br>
`;
  },


  init() {
    const { glob, document } = this;
  
    glob.onComparisonChanged2 = function (event) {
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

    glob.onComparisonChanged2(document.getElementById("iffalse"));
    
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
      return this.callNextAction(cache);
    }

    const User = this.evalMessage(data.User, cache)      
    const reason = this.evalMessage(data.reason, cache);
    const days = parseInt(data.days, 10) || 0;
    const acao = this.evalMessage(data.acao, cache)   

    var erro = 0

    if(acao == "0"){
      try {
        await targetServer.members.ban(User, { days, reason })
        .then(() => {
          this.callNextAction(cache);
        })
      } catch (err) {
        this.displayError(data, cache, err)
        this.executeResults(false, data, cache)
      }     
    }

    if(acao == "1"){
      try {
        await targetServer.bans.remove(User, reason)
        .then(() => {
          this.callNextAction(cache);
        })
      } catch (err) {
        this.displayError(data, cache, err)
        this.executeResults(false, data, cache)
      }     
    }
   
    
  },


  mod() {},
};
