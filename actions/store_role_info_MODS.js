module.exports = {


  name: "Store Role Info MOD",
  section: "Role Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Role Object",
      "ID do Cargo",
      "Nome do Cargo",
      "Cor do Cargo",
      "Posição do Cargo",
      "Timestamp de criação do Cargo",
      "O Cargo é mencionavel?",
      "O Cargo é separado dos outros",
      "O Cargo é gerenciavel",
      "Lista de membros do Cargo",
      "Data da criação do Cargo",
      "Lista de permissões do Cargo",
      "Quantidade de Membros do Cargo",
      "Icone do Cargo",
      "Tag do Cargo",
      "Servidor do Cargo",
      "ID do Servidor do Cargo",
      "O Cargo e editavel?",
      "Lista de IDs de membros do Cargo",
      "Lista de membros online do Cargo",
      "Lista de membros offline do Cargo",
      "Lista de membros ausentes do Cargo",
      "Lista de membros ocupados do Cargo",
      "Total de membros online do Cargo",
      "Total de membros offline do Cargo",
      "Total de membros ausentes do Cargo",
      "Total de membros ocupados do Cargo",
      "Lista de nome de membros do Cargo",
      "Lista de avatares de membros do Cargo",
      "Lista de membros no Cargo",
      "Lista de IDs de humanos no Cargo",
      "Lista de nome de humanos no Cargo",
      "Lista de avatares de humanos no Cargo",
      "Lista de bots do Cargo",
      "Lista de IDs de bots do Cargo",
      "Lista de nome de bots do Cargo",
      "Lista de avatares de bots do Cargo",
    ];
  if (data.descriptionx) {
    desccor = data.descriptioncolor;
  } else {
    desccor = "none";
  }

  return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${presets.getRoleText(data.role, data.varName)} - ${info[parseInt(data.info, 10)]} para (${data.varName2})</font>`
},

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Cargo";
        break;
      case 1:
        dataType = "Cargo ID";
        break;
      case 2:
        dataType = "Texto";
        break;
      case 3:
        dataType = "Cor";
        break;
      case 4:
        dataType = "Número";
        break;
      case 5:
        dataType = "Timestamp";
        break;
      case 6:
      case 7:
        dataType = "Boolean";
        break;
      case 8:
        dataType = "Boolean";
        break;
      case 9:
        dataType = "Lista de membros";
        break;
      case 10:
        dataType = "Data";
        break;
      case 11:
      case 12:
        dataType = "Número";
        break;
      case 13:
        dataType = "URL de imagem";
        break;
      case 14:
        dataType = "Objeto";
        break;
      case 15:
        dataType = "Servidor";
        break;
      case 16:
        dataType = "Servidor ID";
        break;
      case 17:
        dataType = "Boolean";
        break;
      case 18:
        dataType = "Lista";
        break;
      case 19:
        dataType = "Lista";
        break;
      case 20:
        dataType = "Lista";
        break;
      case 21:
        dataType = "Lista";
        break;
      case 22:
        dataType = "Lista";
        break;
      case 23:
        dataType = "Número";
        break;
      case 24:
        dataType = "Número";
        break;
      case 25:
        dataType = "Número";
        break;
      case 26:
        dataType = "Número";
        break;
      case 27:
        dataType = "lista";
        break;
      case 28:
        dataType = "lista";
        break;
      case 29:
        dataType = "lista";
        break;
      case 30:
        dataType = "lista";
        break;
      case 31:
        dataType = "lista";
        break;
      case 32:
        dataType = "lista";
        break;
      case 33:
        dataType = "lista";
        break;
      case 34:
        dataType = "lista";
        break;
      case 35:
        dataType = "lista";
        break;
      case 36:
        dataType = "lista";
        break;
    }
    return [data.varName2, dataType];
  },


  fields: ["role", "varName", "info", "storage", "varName2", "description", "descriptionx", "descriptioncolor"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.6</div>

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


<role-input dropdownLabel="Função de origem" selectId="role" variableContainerId="varNameContainer" variableInputId="varName"></role-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informações de origem</span><br>
	<select id="info" class="round2">
    <optgroup label="Informações do Cargo">
		<option value="0" selected>Cargo - Objeto</option>
		<option value="1">ID do Cargo</option>
		<option value="2">Nome do Cargo</option>
		<option value="3">Cor do Cargo</option>
		<option value="4">Posição do Cargo</option>
    <option value="14">Tag do Cargo</option>
    <option value="13">Icone do Cargo</option>
    </optgroup>
    <optgroup label="Condições do Cargo">
		<option value="6">O Cargo é mencionavel?</option>
		<option value="17">O Cargo e editavel?</option>
    <option value="7">O Cargo é separado dos outros?</option>
    <option value="8">O Cargo é gerenciado pelo bot/integração?</option>
    </optgroup>
    <optgroup label="Datas do Cargo">
		<option value="5">Timestamp de criação do Cargo</option>
    <option value="10">Data da criação do Cargo</option>
    </optgroup>
    <optgroup label="Informações do Cargo">
    <option value="15">Servidor do Cargo</option>
    <option value="16">ID do Servidor do Cargo</option>
    </optgroup>
    <optgroup label="Contadores do Cargo">
    <option value="12">Quantidade de Membros do Cargo</option>
    <option value="23">Total de membros online do Cargo</option>
    <option value="24">Total de membros offline do Cargo</option>
    <option value="25">Total de membros ausentes do Cargo</option>
    <option value="26">Total de membros ocupados do Cargo</option>
    </optgroup>
    <optgroup label="Informações do Cargo em Listas">
    <option value="9">Lista de membros do Cargo</option>
    <option value="18">Lista de IDs de membros do Cargo</option>
    <option value="27">Lista de nome de membros do Cargo</option>
    <option value="28">Lista de avatares de membros do Cargo</option>
    <option value="11">Lista de permissões do Cargo</option>
    <option value="19">Lista de membros online do Cargo</option>
    <option value="20">Lista de membros offline do Cargo</option>
    <option value="21">Lista de membros ausentes do Cargo</option>
    <option value="22">Lista de membros ocupados do Cargo</option>
    <option value="29">Lista de humanos no Cargo</option>
    <option value="30">Lista de IDs de humanos no Cargo</option>
    <option value="31">Lista de nome de humanos no Cargo</option>
    <option value="32">Lista de avatares de humanos no Cargo</option>
    <option value="33">Lista de bots do Cargo</option>
    <option value="34">Lista de IDs de bots do Cargo</option>
    <option value="35">Lista de nome de bots do Cargo</option>
    <option value="36">Lista de avatares de bots do Cargo</option>
    </optgroup>
	</select>
  <input type="text" id="filtrodoxinxyla" class="round" placeholder="Filtrar opções...">
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>

</div>

<style>
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
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
</style>`;
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
      document.getElementById("info").classList.add("abrir");
      document.getElementById("info").classList.remove("fechar");
      this.size = this.options.length;
    });

    document.getElementById("info").addEventListener("blur", function () {
      this.size = 1;
      document.getElementById("info").classList.remove("abrir");
      document.getElementById("info").classList.add("fechar");
      document.getElementById("info").style.height = "30px";
    });

    document.getElementById("filtrodoxinxyla").addEventListener("keyup", function () {
      var select = document.getElementById("info");
      var optgroups = select.getElementsByTagName("optgroup");
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

      for (var i = 0; i < optgroups.length; i++) {
        var optgroup = optgroups[i];
        var options = optgroup.getElementsByTagName("option");
        var visibleOptions = 0;
        for (var j = 0; j < options.length; j++) {
          if (options[j].style.display !== "none") {
            visibleOptions++;
          }
        }
        if (visibleOptions === 0) {
          optgroup.style.display = "none";
        } else {
          optgroup.style.display = "";
        }
      }

      document.getElementById("info").dispatchEvent(new Event("click"));
    });

    var select = document.getElementById("my-select");
    var optgroups = select.getElementsByTagName("optgroup");

    for (var i = 0; i < optgroups.length; i++) {
      var optgroup = optgroups[i];
      var options = optgroup.getElementsByTagName("option");
      var visibleOptions = 0;
      for (var j = 0; j < options.length; j++) {
        if (options[j].style.display !== "none") {
          visibleOptions++;
        }
      }
      if (visibleOptions === 0) {
        optgroup.style.display = "none";
      } else {
        optgroup.style.display = "";
      }
    }
  },


  async action(cache) {
    const data = cache.actions[cache.index];
    const targetRole = await this.getRoleFromData(data.role, data.varName, cache);
    const info = parseInt(data.info, 10);
    if (!targetRole) {
      this.callNextAction(cache);
      return;
    }
    let result;
    switch (info) {
      case 0:
        result = targetRole;
        break;
      case 1:
        result = targetRole.id;
        break;
      case 2:
        result = targetRole.name;
        break;
      case 3:
        result = targetRole.hexColor;
        break;
      case 4:
        result = targetRole.position;
        break;
      case 5:
        result = targetRole.createdTimestamp;
        break;
      case 6:
        result = targetRole.mentionable;
        break;
      case 7:
        result = targetRole.hoist;
        break;
      case 8:
        result = targetRole.managed;
        break;
      case 9:
        result = [...targetRole.members.values()];
        break;
      case 10:
        result = targetRole.createdAt;
        break;
      case 11:
        result = targetRole.permissions.toArray().map(v => v.replace(/_/g, ' ').toLowerCase());
        break;
      case 12:
        result = targetRole.members.size;
        break;
      case 13:
        result = targetRole.iconURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 14:
        result = targetRole.tags;
        break;
      case 15:
        result = targetRole.guild;
        break;
      case 16:
        result = targetRole.guild.id;
        break;
      case 17:
        result = targetRole.editable;
        break;
      case 18:
        result = [...targetRole.members.keys()];
        break;
      case 19:
        result = targetRole.members.filter((m) => m.presence?.status == "online").map((c) => c);
        break;
      case 20:
        result = targetRole.members.filter((m) => m.presence?.status == "offline").map((c) => c);
        break;
      case 21:
        result = targetRole.members.filter((m) => m.presence?.status == "idle").map((c) => c);
        break;
      case 22:
        result = targetRole.members.filter((m) => m.presence?.status == "dnd").map((c) => c);
        break;
      case 23:
        result = targetRole.members.filter((m) => m.presence?.status == "online").map((c) => c).length;
        break;
      case 24:
        result = targetRole.members.filter((m) => m.presence?.status == "offline").map((c) => c).length;
        break;
      case 25:
        result = targetRole.members.filter((m) => m.presence?.status == "idle").map((c) => c).length;
        break;
      case 26:
        result = targetRole.members.filter((m) => m.presence?.status == "dnd").map((c) => c).length;
        break;
      case 27:
        result = targetRole.members.map(v => v.user.username);
        break;
      case 28:
        result = targetRole.members.map(v => v.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 }));
        break;
      case 29:
        result = targetRole.members.filter((v) => v.user.bot === false).map(v => v.user);
        break;
      case 30:
        result = targetRole.members.filter((v) => v.user.bot === false).map(v => v.id);
        break;
      case 31:
        result = targetRole.members.filter((v) => v.user.bot === false).map(v => v.user.username);
        break;
      case 32:
        result = targetRole.members.filter((v) => v.user.bot === false).map(v => v.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 }));
        break;
      case 33:
        result = targetRole.members.filter((v) => v.user.bot === true).map(v => v.user);
        break;
      case 34:
        result = targetRole.members.filter((v) => v.user.bot === true).map(v => v.id);
        break;
      case 35:
        result = targetRole.members.filter((v) => v.user.bot === true).map(v => v.user.username);
        break;
      case 36:
        result = targetRole.members.filter((v) => v.user.bot === true).map(v => v.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 }));
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
