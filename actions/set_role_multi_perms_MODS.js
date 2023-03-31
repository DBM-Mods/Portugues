module.exports = {
name: "Set Role Multi Permissions MOD",
section: "Role Control",
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

  return data.description
  ? `<font style="color:${desccor}">${data.description}</font>`
  : `<font style="color:${desccor}">${presets.getRoleText(data.role, data.varName)}</font>`
},


fields: ["role", "varName", "state1", "state2","state3","state4","state5","state6","state7","state8","state9","state10","state11","state12","state13","state14","state15","state16","state17","state18","state19","state20","state21","state22","state23","state24","state25","state26","state27","state28","state29","state30","state31","state32","state33","state34","state35","state36","state37","state38","state39", "reason", "iffalse", "iffalseVal", "reason", "descriptioncolor","description","descriptionx"],

html: function(isEvent, data) {
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

<div style="padding-top: 8px;">
<div style="float: left; width: 35%;">
<span class="dbminputlabel">Cargo</span><br>
<select id="role" class="round" onchange="glob.roleChange(this, 'varNameContainer')">
  ${data.roles[isEvent ? 1 : 0]}
</select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
<span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName" class="round" type="text" list="variableList"><br>
</div>
</div>



<br><br><br>
<br>


<center>
Use 2 para Manter a permissão, 1 para Permitir, 0 para Não permitir<br><br>
<table style="width:96%">
<tr><th><span class="dbminputlabel">Permissões</span></th><th><span class="dbminputlabel">Alterar para</span></th></tr>

<tr><td class="xin">Ver canais</td><td class="xin"><input id="state1" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Criar convite</td><td class="xin"><input id="state4" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Enviar mensagens</td><td class="xin"><input id="state5" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Enviar mensagens em tópicos</td><td class="xin"><input id="state6" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Criar tópicos públicos</td><td class="xin"><input id="state7" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Criar tópicos privados</td><td class="xin"><input id="state8" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Inserir links</td><td class="xin"><input id="state9" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Anexar arquivos</td><td class="xin"><input id="state10" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Adicionar reações</td><td class="xin"><input id="state11" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Usar emojis externos</td><td class="xin"><input id="state12" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Usar figurinhas externas</td><td class="xin"><input id="state13" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Mencionar @everyone</td><td class="xin"><input id="state14" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Ver histórico de mensagens</td><td class="xin"><input id="state17" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Enviar mensagens de Texto-para-voz</td><td class="xin"><input id="state18" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Usar comandos de aplicativos</td><td class="xin"><input id="state19" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Conectar</td><td class="xin"><input id="state20" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Falar</td><td class="xin"><input id="state21" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Video</td><td class="xin"><input id="state22" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Usar detecção de voz</td><td class="xin"><input id="state23" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Voz Prioritária</td><td class="xin"><input id="state24" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">SIlenciar membros</td><td class="xin"><input id="state25" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Ensurdercer membros</td><td class="xin"><input id="state26" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Mover membros</td><td class="xin"><input id="state27" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Expulsar Membros</td><td class="xin"><input id="state33" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Banir Membros</td><td class="xin"><input id="state34" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Ver o registro de auditoria</td><td class="xin"><input id="state35" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Alterar apelido</td><td class="xin"><input id="state36" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Membros de Castigo</td><td class="xin"><input id="state38" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Usar atividades</td><td class="xin"><input id="state39" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Canais</td><td class="xin"><input id="state2" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Webhooks</td><td class="xin"><input id="state3" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Servidor</td><td class="xin"><input id="state29" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Apelidos</td><td class="xin"><input id="state30" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Cargos</td><td class="xin"><input id="state31" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Mensagens</td><td class="xin"><input id="state15" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Tópicos</td><td class="xin"><input id="state16" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Emojis e Figurinhas</td><td class="xin"><input id="state32" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Gerenciar Eventos</td><td class="xin"><input id="state37" class="round" type="text" value="2"></td></tr>

<tr><td class="xin">Administrador</td><td class="xin"><input id="state28" class="round" type="text" value="2"></td></tr>


</table></center>

<br>


<div style="padding-top: 8px;">
  <span class="dbminputlabel">Razão</span>
  <input id="reason" placeholder="Optional" class="round" type="text">
</div>


<br>

<div style="float: left; width: 40%">
<span class="dbminputlabel">Se a permissão não for set</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selecionado>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</div>
<div id="iffalseContainer" style="display: none; float: right; width: 55%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>

	
</div>


</div>

<style>
.xin{padding:5px;border:1px solid #777;background:rgba(255,255,255,0.1)}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`
},

init: function() {
	const {glob, document} = this;

	glob.roleChange(document.getElementById('role'), 'varNameContainer')

 
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

},

 async action(cache) {
    const data = cache.actions[cache.index];
	  const { FLAGS, ALL } = this.getDBM().DiscordJS.Permissions;
    const role = await this.getRoleFromData(data.role, data.varName, cache);
    const reason = this.evalMessage(data.reason, cache);

  var options = 0n
  var perms = role.permissions.toArray();

  if(this.evalMessage(data.state1, cache) == "1"){options = (options + FLAGS.VIEW_CHANNEL)}
  if(this.evalMessage(data.state1, cache) == "2"){if(perms.findIndex((i) => i === "VIEW_CHANNEL") !== -1){options = (options + FLAGS.VIEW_CHANNEL)}}

  if(this.evalMessage(data.state2, cache) == "1"){options = (options + FLAGS.MANAGE_CHANNELS)}
  if(this.evalMessage(data.state2, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_CHANNELS") !== -1){options = (options + FLAGS.MANAGE_CHANNELS)}}

  if(this.evalMessage(data.state3, cache) == "1"){options = (options + FLAGS.MANAGE_WEBHOOKS)}
  if(this.evalMessage(data.state3, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_WEBHOOKS") !== -1){options = (options + FLAGS.MANAGE_WEBHOOKS)}}

  if(this.evalMessage(data.state4, cache) == "1"){options = (options + FLAGS.CREATE_INSTANT_INVITE)}
  if(this.evalMessage(data.state4, cache) == "2"){if(perms.findIndex((i) => i === "CREATE_INSTANT_INVITE") !== -1){options = (options + FLAGS.CREATE_INSTANT_INVITE)}}

  if(this.evalMessage(data.state5, cache) == "1"){options = (options + FLAGS.SEND_MESSAGES)}
  if(this.evalMessage(data.state5, cache) == "2"){if(perms.findIndex((i) => i === "SEND_MESSAGES") !== -1){options = (options + FLAGS.SEND_MESSAGES)}}

  if(this.evalMessage(data.state6, cache) == "1"){options = (options + FLAGS.SEND_MESSAGES_IN_THREADS)}
  if(this.evalMessage(data.state6, cache) == "2"){if(perms.findIndex((i) => i === "SEND_MESSAGES_IN_THREADS") !== -1){options = (options + FLAGS.SEND_MESSAGES_IN_THREADS)}}

  if(this.evalMessage(data.state7, cache) == "1"){options = (options + FLAGS.CREATE_PUBLIC_THREADS)}
  if(this.evalMessage(data.state7, cache) == "2"){if(perms.findIndex((i) => i === "CREATE_PUBLIC_THREADS") !== -1){options = (options + FLAGS.CREATE_PUBLIC_THREADS)}}

  if(this.evalMessage(data.state8, cache) == "1"){options = (options + FLAGS.CREATE_PRIVATE_THREADS)}
  if(this.evalMessage(data.state8, cache) == "2"){if(perms.findIndex((i) => i === "CREATE_PRIVATE_THREADS") !== -1){options = (options + FLAGS.CREATE_PRIVATE_THREADS)}}

  if(this.evalMessage(data.state9, cache) == "1"){options = (options + FLAGS.EMBED_LINKS)}
  if(this.evalMessage(data.state9, cache) == "2"){if(perms.findIndex((i) => i === "EMBED_LINKS") !== -1){options = (options + FLAGS.EMBED_LINKS)}}

  if(this.evalMessage(data.state10, cache) == "1"){options = (options + FLAGS.ATTACH_FILES)}
  if(this.evalMessage(data.state10, cache) == "2"){if(perms.findIndex((i) => i === "ATTACH_FILES") !== -1){options = (options + FLAGS.ATTACH_FILES)}}

  if(this.evalMessage(data.state11, cache) == "1"){options = (options + FLAGS.ADD_REACTIONS)}
  if(this.evalMessage(data.state11, cache) == "2"){if(perms.findIndex((i) => i === "ADD_REACTIONS") !== -1){options = (options + FLAGS.ADD_REACTIONS)}}

  if(this.evalMessage(data.state12, cache) == "1"){options = (options + FLAGS.USE_EXTERNAL_EMOJIS)}
  if(this.evalMessage(data.state12, cache) == "2"){if(perms.findIndex((i) => i === "USE_EXTERNAL_EMOJIS") !== -1){options = (options + FLAGS.USE_EXTERNAL_EMOJIS)}}

  if(this.evalMessage(data.state13, cache) == "1"){options = (options + FLAGS.USE_EXTERNAL_STICKERS)}
  if(this.evalMessage(data.state13, cache) == "2"){if(perms.findIndex((i) => i === "USE_EXTERNAL_STICKERS") !== -1){options = (options + FLAGS.USE_EXTERNAL_STICKERS)}}

  if(this.evalMessage(data.state14, cache) == "1"){options = (options + FLAGS.MENTION_EVERYONE)}
  if(this.evalMessage(data.state14, cache) == "2"){if(perms.findIndex((i) => i === "MENTION_EVERYONE") !== -1){options = (options + FLAGS.MENTION_EVERYONE)}}

  if(this.evalMessage(data.state15, cache) == "1"){options = (options + FLAGS.MANAGE_MESSAGES)}
  if(this.evalMessage(data.state15, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_MESSAGES") !== -1){options = (options + FLAGS.MANAGE_MESSAGES)}}

  if(this.evalMessage(data.state16, cache) == "1"){options = (options + FLAGS.MANAGE_THREADS)}
  if(this.evalMessage(data.state16, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_THREADS") !== -1){options = (options + FLAGS.MANAGE_THREADS)}}

  if(this.evalMessage(data.state17, cache) == "1"){options = (options + FLAGS.READ_MESSAGE_HISTORY)}
  if(this.evalMessage(data.state17, cache) == "2"){if(perms.findIndex((i) => i === "READ_MESSAGE_HISTORY") !== -1){options = (options + FLAGS.READ_MESSAGE_HISTORY)}}

  if(this.evalMessage(data.state18, cache) == "1"){options = (options + FLAGS.SEND_TTS_MESSAGES)}
  if(this.evalMessage(data.state18, cache) == "2"){if(perms.findIndex((i) => i === "SEND_TTS_MESSAGES") !== -1){options = (options + FLAGS.SEND_TTS_MESSAGES)}}

  if(this.evalMessage(data.state19, cache) == "1"){options = (options + FLAGS.USE_APPLICATION_COMMANDS)}
  if(this.evalMessage(data.state19, cache) == "2"){if(perms.findIndex((i) => i === "USE_APPLICATION_COMMANDS") !== -1){options = (options + FLAGS.USE_APPLICATION_COMMANDS)}}

  if(this.evalMessage(data.state20, cache) == "1"){options = (options + FLAGS.CONNECT)}
  if(this.evalMessage(data.state20, cache) == "2"){if(perms.findIndex((i) => i === "CONNECT") !== -1){options = (options + FLAGS.CONNECT)}}

  if(this.evalMessage(data.state21, cache) == "1"){options = (options + FLAGS.SPEAK)}
  if(this.evalMessage(data.state21, cache) == "2"){if(perms.findIndex((i) => i === "SPEAK") !== -1){options = (options + FLAGS.SPEAK)}}

  if(this.evalMessage(data.state22, cache) == "1"){options = (options + FLAGS.STREAM)}
  if(this.evalMessage(data.state22, cache) == "2"){if(perms.findIndex((i) => i === "STREAM") !== -1){options = (options + FLAGS.STREAM)}}

  if(this.evalMessage(data.state23, cache) == "1"){options = (options + FLAGS.USE_VAD)}
  if(this.evalMessage(data.state23, cache) == "2"){if(perms.findIndex((i) => i === "USE_VAD") !== -1){options = (options + FLAGS.USE_VAD)}}

  if(this.evalMessage(data.state24, cache) == "1"){options = (options + FLAGS.PRIORITY_SPEAKER)}
  if(this.evalMessage(data.state24, cache) == "2"){if(perms.findIndex((i) => i === "PRIORITY_SPEAKER") !== -1){options = (options + FLAGS.PRIORITY_SPEAKER)}}

  if(this.evalMessage(data.state25, cache) == "1"){options = (options + FLAGS.MUTE_MEMBERS)}
  if(this.evalMessage(data.state25, cache) == "2"){if(perms.findIndex((i) => i === "MUTE_MEMBERS") !== -1){options = (options + FLAGS.MUTE_MEMBERS)}}

  if(this.evalMessage(data.state26, cache) == "1"){options = (options + FLAGS.DEAFEN_MEMBERS)}
  if(this.evalMessage(data.state26, cache) == "2"){if(perms.findIndex((i) => i === "DEAFEN_MEMBERS") !== -1){options = (options + FLAGS.DEAFEN_MEMBERS)}}

  if(this.evalMessage(data.state27, cache) == "1"){options = (options + FLAGS.MOVE_MEMBERS)}
  if(this.evalMessage(data.state27, cache) == "2"){if(perms.findIndex((i) => i === "MOVE_MEMBERS") !== -1){options = (options + FLAGS.MOVE_MEMBERS)}}

  if(this.evalMessage(data.state28, cache) == "1"){options = (options + FLAGS.ADMINISTRATOR)}
  if(this.evalMessage(data.state28, cache) == "2"){if(perms.findIndex((i) => i === "ADMINISTRATOR") !== -1){options = (options + FLAGS.ADMINISTRATOR)}}

  if(this.evalMessage(data.state29, cache) == "1"){options = (options + FLAGS.MANAGE_GUILD)}
  if(this.evalMessage(data.state29, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_GUILD") !== -1){options = (options + FLAGS.MANAGE_GUILD)}}

  if(this.evalMessage(data.state30, cache) == "1"){options = (options + FLAGS.MANAGE_NICKNAMES)}
  if(this.evalMessage(data.state30, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_NICKNAMES") !== -1){options = (options + FLAGS.MANAGE_NICKNAMES)}}

  if(this.evalMessage(data.state31, cache) == "1"){options = (options + FLAGS.MANAGE_ROLES)}
  if(this.evalMessage(data.state31, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_ROLES") !== -1){options = (options + FLAGS.MANAGE_ROLES)}}

  if(this.evalMessage(data.state32, cache) == "1"){options = (options + FLAGS.MANAGE_EMOJIS_AND_STICKERS)}
  if(this.evalMessage(data.state32, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_EMOJIS_AND_STICKERS") !== -1){options = (options + FLAGS.MANAGE_EMOJIS_AND_STICKERS)}}

  if(this.evalMessage(data.state33, cache) == "1"){options = (options + FLAGS.KICK_MEMBERS)}
  if(this.evalMessage(data.state33, cache) == "2"){if(perms.findIndex((i) => i === "KICK_MEMBERS") !== -1){options = (options + FLAGS.KICK_MEMBERS)}}

  if(this.evalMessage(data.state34, cache) == "1"){options = (options + FLAGS.BAN_MEMBERS)}
  if(this.evalMessage(data.state34, cache) == "2"){if(perms.findIndex((i) => i === "BAN_MEMBERS") !== -1){options = (options + FLAGS.BAN_MEMBERS)}}

  if(this.evalMessage(data.state35, cache) == "1"){options = (options + FLAGS.VIEW_AUDIT_LOG)}
  if(this.evalMessage(data.state35, cache) == "2"){if(perms.findIndex((i) => i === "VIEW_AUDIT_LOG") !== -1){options = (options + FLAGS.VIEW_AUDIT_LOG)}}

  if(this.evalMessage(data.state36, cache) == "1"){options = (options + FLAGS.CHANGE_NICKNAME)}
  if(this.evalMessage(data.state36, cache) == "2"){if(perms.findIndex((i) => i === "CHANGE_NICKNAME") !== -1){options = (options + FLAGS.CHANGE_NICKNAME)}}

  if(this.evalMessage(data.state37, cache) == "1"){options = (options + FLAGS.MANAGE_EVENTS)}
  if(this.evalMessage(data.state37, cache) == "2"){if(perms.findIndex((i) => i === "MANAGE_EVENTS") !== -1){options = (options + FLAGS.MANAGE_EVENTS)}}

  if(this.evalMessage(data.state38, cache) == "1"){options = (options + FLAGS.MODERATE_MEMBERS)}
  if(this.evalMessage(data.state38, cache) == "2"){if(perms.findIndex((i) => i === "MODERATE_MEMBERS") !== -1){options = (options + FLAGS.MODERATE_MEMBERS)}}

  if(this.evalMessage(data.state39, cache) == "1"){options = (options + FLAGS.START_EMBEDDED_ACTIVITIES)}
  if(this.evalMessage(data.state39, cache) == "2"){if(perms.findIndex((i) => i === "START_EMBEDDED_ACTIVITIES") !== -1){options = (options + FLAGS.START_EMBEDDED_ACTIVITIES)}}


      try{await role
      .setPermissions([options], reason)
			.then(() => this.callNextAction(cache))
		  }
			catch(err) {this.displayError(data, cache, err)
			  this.executeResults(false, data, cache)
			};

	    
  },

  mod() {},
};
