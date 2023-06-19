module.exports = {
  name: "Store Member Info MOD",
  section: "Member Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto do membro",
      "ID de membro",
      "Nome de usuário do membro",
      "Nome de exibição do membro",
      "Cor do Membro",
      "Nome do Servidor do Membro",
      "Última mensagem do membro (removido)",
      "Cargo mais alta do membro",
      "Cargo de elevação do membro",
      "Cargo de cor do membro",
      "Membro é proprietário?",
      "O membro está mudo?",
      "O membro é surdo?",
      "O membro é banível?",
      "Nome do status de jogo do membro",
      "Estado de Membro",
      "URL do avatar do membro",
      "Lista de cargos do Membro",
      "Quantidade de cargos do membro",
      "Canal de voz do membro",
      "Discriminador do membro",
      "Tag do Membro",
      "Conta do membro criada em",
      "Timestamp da conta criada pelo membro",
      "Membro entrou no servidor em",
      "Timestamp do membro que entrou no servidor",
      "ID da última mensagem (removido)",
      "Lista de permissões do membro",
      "Lista de Badges do Membro",
      "Status do cliente membro",
      "Status personalizado de membro",
      "URL do Avatar do Servidor Membro",
      "Membro expirou em",
      "Timestamp do membro castigado",
      "URL do banner do membro",
      "ID do Servidor do Membro",
      "Timestamp do Impulso do Membro",
      "Total de convites do membro no servidor atual",
      "Lista de convites do membro no servidor atual",
      "Lista de usos dos convites do membro no servidor atual",
      "Total de usos dos convites do membro no servidor atual",
    ];

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${presets.getMemberText(data.member, data.varName)} - ${info[parseInt(data.info, 10)]}</font>`
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";

    switch (info) {
      case 0:
        dataType = "Membro do servidor";
        break;
      case 1:
        dataType = "ID";
        break;
      case 2:
        dataType = "Texto";
        break;
      case 3:
        dataType = "Texto";
        break;
      case 4:
        dataType = "Texto";
        break;
      case 5:
        dataType = "Texto";
        break;
      case 6:
        dataType = "Texto";
        break;
      case 7:
        dataType = "Cargo";
        break;
      case 8:
        dataType = "Cargo";
        break;
      case 9:
        dataType = "Cargo";
        break;
      case 10:
        dataType = "Verdadeiro/Falso";
        break;
      case 11:
        dataType = "Verdadeiro/Falso";
        break;
      case 12:
        dataType = "Verdadeiro/Falso";
        break;
      case 13:
        dataType = "Verdadeiro/Falso";
        break;
      case 14:
        dataType = "Texto";
        break;
      case 15:
        dataType = "Texto";
        break;
      case 16:
        dataType = "URL"
        break;
      case 17:
        dataType = "Lista";
        break;
      case 18:
        dataType = "Número";
        break;
      case 19:
        dataType = "Canal";
        break;
      case 20:
        dataType = "Número";
        break;
      case 21:
        dataType = "Texto";
        break;
      case 22:
        dataType = "Data";
        break;
      case 23:
        dataType = "Timestamp";
        break;
      case 24:
        dataType = "Data";
        break;
      case 25:
        dataType = "Timestamp";
        break;
      case 26:
        dataType = "ID";
        break;
      case 27:
        dataType = "Lista";
        break;
      case 28:
        dataType = "Lista";
        break;
      case 29:
        dataType = "Texto";
        break;
      case 30:
        dataType = "Texto";
        break;
      case 31:
        dataType = "URL";
        break;
      case 32:
        dataType = "Data";
        break;
      case 33:
        dataType = "Timestamp";
        break;
      case 34:
        dataType = "URL";
        break;
      case 35:
        dataType = "ID";
        break;
      case 36:
        dataType = "Timestamp";
        break;
      case 37:
        dataType = "Número";
        break;
      case 38:
        dataType = "Lista";
        break;
      case 39:
        dataType = "Lista";
        break;
      case 40:
        dataType = "Número";
        break;
    }

    return [data.varName2, dataType];
  },

  fields: ["member", "varName", "info", "storage", "varName2", "description", "descriptionx", "descriptioncolor"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 1.4</div>

    <div style="width: 100%; padding:5px 0px;height: calc(100vh - 160px);overflow:auto">

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

  <div style="overflow: hidden">
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
</div>


<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informação</span><br>
	<select id="info" class="round2">
  <option value="0" selecionado>Objeto Membro</option>
  <option value="1">ID do membro</option>
  <option value="2">Nome de usuário do membro</option>
  <option value="3">Nome de exibição do membro [Apelido]</option>
  <option value="21">Tag do membro</option>
  <option value="20">Discriminador do membro</option>
  <option value="4">Cor do membro</option>
  <option value="15">Status de membro</option>
  <option value="16">URL do avatar do membro</option>
  <option value="34">URL do banner do membro</option>
  <option value="31">URL do Avatar do Servidor do Membro</option>
  <option value="5">Nome do Servidor do membro</option>
  <option value="35">ID do servidor do membro</option>
  <option value="6">Última mensagem do membro (removida)</option>
  <option value="26">ID da última mensagem do membro (removido)</option>
  <option value="7">Cargo mais alto do membro</option>
  <option value="8">Cargo de elevação do membro</option>
  <option value="9">Cargo de cor do membro</option>
  <option value="17">Lista de cargos do membro</option>
  <option value="18">Quantidade de cargos do membro</option>
  <option value="10">O membro é proprietário?</option>
  <option value="11">O membro está silenciado?</option>
  <option value="12">O membro está surdo?</option>
  <option value="13">O membro pode ser banido?</option>
  <option value="14">Nome do status de jogo do membro</option>
  <option value="30">Status personalizado do membro</option>
  <option value="19">Canal de voz do membro</option>
  <option value="22">Conta do membro criada em</option>
  <option value="23">Timestamp da conta criada pelo membro</option>
  <option value="24">Membro entrou no servidor em</option>
  <option value="25">Timestamp do membro que entrou no servidor</option>
  <option value="27">Lista de permissões do membro</option>
  <option value="28">Lista de badges do membro</option>
  <option value="29">Status do cliente membro [Web ou Mobile]</option>
  <option value="32">Tempo esgotado do membro em</option>
  <option value="33">Timestamp do membro castigado</option>
  <option value="36">Timestamp do Impulso do Membro</option>
  <option value="37">Total de convites do membro no servidor atual</option>
  <option value="38">Lista de convites do membro no servidor atual</option>
  <option value="39">Lista de usos dos convites do membro no servidor atual</option>
  <option value="40">Total de usos dos convites do membro no servidor atual</option>
	</select>
  <input type="text" id="filtrodoxinxyla" class="round" placeholder="Filtrar opções...">
  </div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>

</div>

<style>
.round2{width:100%;height:30px;outline:0}
.round2 option{padding:3px 8px;text-align:left}
.round2 optgroup{text-align:center;padding:4px 0px;}


.abrir {
  min-height: 30px;
  height: 30px;
  animation: abrir .5s forwards;
}

@keyframes abrir {
  from {
    min-height: 30px;
    height: 30px;
  }
  to {
    min-height: 100px;
    height: calc(100vh - 420px);
  }
}

.fechar {
  min-height: 100px;
  height: calc(100vh - 420px);
  animation: fechar .5s forwards;
}

@keyframes fechar {
  from {
    min-height: 100px;
    height: calc(100vh - 420px);
  }
  to {
    min-height: 30px;
    height: 30px;
  }
}
.xin {
  padding: 5px;
  border: 1px solid #777;
  background: rgba(255,255,255,0.1);
}

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
`;
  },

  init() {
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

    document.getElementById("info").addEventListener("click", function () {
      this.size = this.options.length;
      document.getElementById("info").classList.add("abrir");
      document.getElementById("info").classList.remove("fechar");
      document.getElementById("info").style.display = "block";
    });

    document.getElementById("info").addEventListener("blur", function () {
      this.size = 1;
      document.getElementById("info").classList.remove("abrir");
      document.getElementById("info").classList.add("fechar");
      document.getElementById("info").style.height = "30px";
    });
    document.getElementById("filtrodoxinxyla").addEventListener("keyup", function () {
      var filter = this.value.toLowerCase();
      var options = document.getElementById("info").options;
      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.text.toLowerCase().indexOf(filter) === -1) {
          option.style.display = "none";
        } else {
          option.style.display = "";
        }
      }
      document.getElementById("info").dispatchEvent(new Event('click'));
    });




  },


  async action(cache) {
    const data = cache.actions[cache.index];
    const memberfind = this.evalMessage(data.member, cache);
    const find = this.evalMessage(data.varName, cache);
    var member = await this.getMemberFromData(data.member, data.varName, cache);

    if (memberfind == "100" || memberfind == "101") {

      const server = cache.server;
      if (!server?.members) {
        this.callNextAction(cache);
        return;
      }
      if (server.memberCount !== server.members.cache.size) server.members.fetch();
      const members = server.members.cache;

      if (memberfind == "100") { member = members.find((m) => m.user?.username === find); }
      if (memberfind == "101") { member = members.get(find) }
    }

    const targetServer = await this.getServerFromData(0, data.varName, cache);

    if (!member) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = member;
        break;
      case 1:
        result = member.id;
        break;
      case 2:
        result = member.user?.username ?? member.username;
        break;
      case 3:
        result = member.displayName;
        break;
      case 4:
        result = member.displayHexColor;
        break;
      case 5:
        result = member.guild;
        break;
      case 7:
        result = member.roles.highest;
        break;
      case 8:
        result = member.roles.hoist;
        break;
      case 9:
        result = member.roles.color;
        break;
      case 10:
        result = member.id === member.guild?.ownerId;
        break;
      case 11:
        result = member.voice.mute;
        break;
      case 12:
        result = member.voice.deaf;
        break;
      case 13:
        result = member.bannable;
        break;
      case 14:
        if (member.presence?.activities.length) {
          const status = member.presence.activities.filter((s) => s.type !== "CUSTOM");
          result = status[0]?.name;
        }
        break;
      case 15:
        if (member.presence?.status) {
          const status = member.presence.status;
          switch (status) {
            case "online": { result = "Online"; break; }
            case "offline": { result = "Offline"; break; }
            case "idle": { result = "Ausente"; break; }
            case "dnd": { result = "Ocupado"; break; }
          }
        }
        break;
      case 16:
        if (member.user) {
          result = member.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        } else {
          result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        }
        break;
      case 17:
        result = [...member.roles.cache.values()];
        break;
      case 18:
        result = member.roles.cache.size;
        break;
      case 19:
        result = member.voice.channel;
        break;
      case 20:
        result = member.user?.discriminator ?? member.discriminator;
        break;
      case 21:
        result = member.user?.tag ?? member.tag;
        break;
      case 22:
        result = member.user?.createdAt ?? member.createdAt;
        break;
      case 23:
        result = member.user?.createdTimestamp ?? member.createdTimestamp;
        break;
      case 24:
        result = member.joinedAt;
        break;
      case 25:
        result = member.joinedTimestamp;
        break;
      case 27:
        result = member.permissions.toArray();
        break;
      case 28:
        if (member.user) {
          result = member.user?.flags?.toArray() ?? (await member.user?.fetchFlags())?.toArray();
        } else {
          result = member.flags.toArray();
        }
        break;
      case 29:
        const status = member.presence?.clientStatus;
        result = status && Object.keys(status);
        break;
      case 30:
        result = member.presence?.activities.find((s) => s.type === "CUSTOM")?.state;
        break;
      case 31:
        if (member.user) {
          result = member.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
        }
        break;
      case 32:
        result = member.communicationDisabledUntil;
        break;
      case 33:
        result = member.communicationDisabledUntilTimestamp;
        break;
      case 34:
        const user = await member.user.fetch();
        result = member.user.bannerURL({ format: "png", size: 4096, dynamic: true });
        break;
      case 35:
        result = member.guild.id;
        break;
      case 36:
        result = member.premiumSinceTimestamp;
        break;
      case 37:
        invites = await targetServer.invites.fetch();
        convites = [...invites.values()];
        convites = convites.map(v => v.inviter)
        convite = convites.filter((item) => item.id == member.id)
        result = convite.length
        break;
      case 38:
        invites = await targetServer.invites.fetch();
        convites = [...invites.values()];
        convites = convites.map(v => v)
        convite = convites.filter((item) => item.inviter.id == member.id)
        result = convite
        break;
      case 39:
        invites = await targetServer.invites.fetch();
        convites = [...invites.values()];
        convites = convites.map(v => v)
        convite = convites.filter((item) => item.inviter.id == member.id)
        convite = convite.map(v => v.uses)
        result = convite
        break;
      case 40:
        invites = await targetServer.invites.fetch();
        convites = [...invites.values()];
        convites = convites.map(v => v)
        convite = convites.filter((item) => item.inviter.id == member.id)
        convite = convite.map(v => v.uses)
        result = convite.reduce((acumulador, numero) => acumulador + numero, 0);
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }

    this.callNextAction(cache);
  },


  mod() { },
};
