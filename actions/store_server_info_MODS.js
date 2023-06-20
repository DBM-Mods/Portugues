module.exports = {

  name: "Store Server Info MOD",
  section: "Server Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Servidor (Objeto)",
      "ID do servidor",
      "Nome do servidor",
      "Acrônimo do nome do servidor",
      "Idioma Preferido do Servidor",
      "URL do ícone do servidor",
      "Nível de Verificação do Servidor",
      "Canal padrão do servidor",
      "Canal AFK do Servidor",
      "Canal do sistema do servidor",
      "Cargo padrão do servidor",
      "Dono do Servidor (Objeto)",
      "Bot do servidor",
      "Lista de Canais do Servidor",
      "Lista de Cargos do servidor",
      "Lista de Membros do Servidor",
      "Lista de emojis do servidor",
      "Total de membros do servidor",
      "Servidor criado em",
      "Tempo limite do servidor AFK",
      "Servidor disponível",
      "Servidor Grande",
      "Servidor conectado em",
      "Total de Canais do Servidor",
      "Total de emojis do servidor",
      "Incorporação de servidor habilitada",
      "Total de membros ocupados do servidor",
      "Total de membros online do servidor",
      "Total de membros offline do servidor",
      "Total de membros ociosos do servidor",
      "Total de bots do servidor",
      "Lista de IDs de Canais do Servidor",
      "Lista de IDs de Cargos de servidor",
      "Lista de IDs de membros do servidor",
      "",
      "Total de humanos no Servidor",
      "",
      "Total de Cargos do Servidor",
      "Total de canais de texto do servidor",
      "Total de Canais de Voz do Servidor",
      "Servidor verificado",
      "Lista de banidos do servidor",
      "Lista de convites do servidor",
      "Filtro de conteúdo explícito do servidor",
      "Contagem de impulsos do servidor",
      "Nível de aumento de servidor",
      "URL do banner do servidor",
      "Lista de recursos do servidor",
      "ID do Dono do servidor",
      "Código URL do Servidor Vanity",
      "ID do canal do widget do servidor",
      "ID do canal AFK do servidor",
      "Ativar barra de progresso do servidor",
      "Descrição do Servidor",
      "Servidor parceiro",
      "Canal de Regras do Servidor",
      "ID do canal da regra do servidor",
      "Canal de widget do servidor",
      "ID do canal do sistema do servidor",
      "Nível NSFW do Servidor",
      "Nível MFA/2FA do Servidor",
      "Timestamp do Servidor",
      "URL do Template",
      "Código do Template",
      "Nome do Template",
      "Descrição do Template",
      "Vezes que o Template foi usado",
      "ID do criador do Template",
      "Timestamp da criação do Template",
      "Timestamp da atualização do Template",
      "Total de membros no canal de voz",
      "Lista de membros por ID presentes nos canais de voz",
      "Lista de membros presentes nos canais de voz",
      "Lista de canais de texto do servidor",
      "Lista de IDs dos canais de texto do servidor",
      "Lista de canais de voz do servidor",
      "Lista de IDs dos canais de voz do servidor",
      "Lista de categorias do servidor",
      "Lista de IDs das categorias do servidor",
      "Lista de Bots do servidor",
      "Lista de IDs de Bots do servidor",
      "Lista de membros do servidor em ordem de entrada",
      "Lista de IDs de membros do servidor em ordem de entrada",
      "Lista de Webhooks do servidor",
      "Lista de nomes das categorias do servidor",
      "Lista de nomes dos canais do servidor",
      "Lista de nomes dos canais de texto do servidor",
      "Lista de nomes dos canais de voz do servidor",
      "Lista de nomes dos emojis do servidor",
      "Lista de nomes dos Cargos do servidor",
      "Lista de tags dos membros do servidor",
      "Lista de nomes dos membros do servidor",
      "Lista dos discriminadores dos membros do servidor",
      "Lista de tags de membros do servidor em ordem de entrada",
      "Lista de figurinhas do servidor",
      "Lista de nomes de figurinhas do servidor",
      "Lista de descrição das figurinhas do servidor",
      "Lista de id das figurinhas do servidor",
      "Total de figurinhas do servidor",
      "Lista de eventos do servidor",
      "Lista de nome de eventos do servidor",
      "Total de eventos do servidor",
      "Lista de ids de eventos do servidor",
      "Cargo de Server Booster",
      "Lista de membros com impulso por ordem de impulso",
      "Lista de membros de castigo no servidor",
      "Total de membros de castigo no servidor",
      "Total de membros castigados no servidor",
      "Lista de membros castigados no servidor",
    ];

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${presets.getServerText(data.server, data.varName)} - ${info[parseInt(data.info, 10)]}</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Servidor";
        break;
      case 1:
        dataType = "ID Servidor";
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
        dataType = "Icon URL";
        break;
      case 6:
        dataType = "Texto";
        break;
      case 7:
        dataType = "Canal";
        break;
      case 8:
        dataType = "Canal";
        break;
      case 9:
        dataType = "Canal";
        break;
      case 10:
        dataType = "Cargo";
        break;
      case 11:
        dataType = "Membro do Servidor";
        break;
      case 12:
        dataType = "Membro do Servidor";
        break;
      case 13:
        dataType = "Lista";
        break;
      case 14:
        dataType = "Lista";
        break;
      case 15:
        dataType = "Lista";
        break;
      case 16:
        dataType = "Lista";
        break;
      case 17:
        dataType = "Número";
        break;
      case 18:
        dataType = "Data";
        break;
      case 19:
        dataType = "Número";
        break;
      case 20:
        dataType = "Verdadeiro/Falso";
        break;
      case 21:
        dataType = "Verdadeiro/Falso";
        break;
      case 22:
        dataType = "Data";
        break;
      case 23:
        dataType = "Número";
        break;
      case 24:
        dataType = "Número";
        break;
      case 25:
        dataType = "Verdadeiro/Falso";
        break;
      case 26:
        dataType = "Número";
        break;
      case 27:
        dataType = "Número";
        break;
      case 28:
        dataType = "Número";
        break;
      case 29:
        dataType = "Número";
        break;
      case 30:
        dataType = "Número";
        break;
      case 31:
        dataType = "Lista";
        break;
      case 32:
        dataType = "Lista";
        break;
      case 33:
        dataType = "Lista";
        break;
      case 35:
        dataType = "Número";
        break;
      case 37:
        dataType = "Número";
        break;
      case 38:
        dataType = "Número";
        break;
      case 39:
        dataType = "Número";
        break;
      case 40:
        dataType = "Verdadeiro/Falso";
        break;
      case 41:
        dataType = "Lista";
        break;
      case 42:
        dataType = "Lista";
        break;
      case 43:
        dataType = "Texto";
        break;
      case 44:
        dataType = "Número";
        break;
      case 45:
        dataType = "Número";
        break;
      case 46:
        dataType = "Banner URL";
        break;
      case 47:
        dataType = "Lista";
        break;
      case 48:
        dataType = "ID";
        break;
      case 49:
        dataType = "Texto";
        break;
      case 50:
        dataType = "ID";
        break;
      case 51:
        dataType = "ID";
        break;
      case 52:
        dataType = "Verdadeiro/Falso";
        break;
      case 53:
        dataType = "Texto";
        break;
      case 54:
        dataType = "Verdadeiro/Falso";
        break;
      case 55:
        dataType = "Canal";
        break;
      case 56:
        dataType = "ID";
        break;
      case 57:
        dataType = "Canal";
        break;
      case 58:
        dataType = "ID";
        break;
      case 59:
        dataType = "Texto";
        break;
      case 60:
        dataType = "Texto";
        break;
      case 61:
        dataType = "Timestamp";
        break;
      case 62:
        dataType = "URL";
        break;
      case 63:
        dataType = "Código";
        break;
      case 64:
        dataType = "Texto";
        break;
      case 65:
        dataType = "Texto";
        break;
      case 66:
        dataType = "Número";
        break;
      case 67:
        dataType = "ID";
        break;
      case 68:
        dataType = "Timestamp";
        break;
      case 69:
        dataType = "Timestamp";
        break;
      case 70:
        dataType = "Número";
        break;
      case 71:
        dataType = "Lista";
      case 92:
        dataType = "Lista";
      case 102:
        dataType = "Lista";
        break;
      case 103:
        dataType = "Objeto";
        break;
      case 104:
        dataType = "Lista";
        break;
      case 105:
        dataType = "Lista";
        break;
      case 106:
        dataType = "Número";
        break;
      case 107:
        dataType = "Número";
        break;
      case 108:
        dataType = "Lista";
        break;
    }

    return [data.varName2, dataType];
  },



  fields: ["server", "varName", "info", "storage", "varName2", "description", "descriptionx", "descriptioncolor"],



  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 2.0</div>

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

<server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

<br><br><br>

<div>
	<div style="padding-top: 8px; width: 100%;">
		<span class="dbminputlabel">Informações</span><br>
		<select id="info" class="round2">
      <optgroup label="Informações Gerais do Servidor">
      <option value="0">Servidor (Objeto)</options>
      <option value="1">ID do servidor</options>
      <option value="2">Nome do servidor</options>
      <option value="3">Acrônimo do nome do servidor</options>
      <option value="53">Descrição do servidor</options>
      <option value="5">URL do ícone do servidor</options>
      <option value="7">Canal padrão do servidor</options>
      <option value="58">ID do canal do sistema do servidor</options>
      <option value="9">Canal do sistema do servidor</options>
      <option value="21">Servidor grande</options>
      <option value="43">Filtro de conteúdo explícito do servidor</options>
      <option value="10">Cargo padrão do servidor</options>
      <option value="12">Bot do servidor</options>
      <option value="20">Servidor disponível</options>
      </optgroup>
      <optgroup label="Informações AFK do Servidor">
      <option value="8">Canal AFK do servidor</options>
      <option value="51">ID do canal AFK do servidor</options>
      <option value="19">Tempo limite de AFK do servidor</options>
      </optgroup>
      <optgroup label="Informações sobre impulso do Servidor">
      <option value="44">Contagem de impulsos do servidor</options>
      <option value="45">Nível de aumento de servidor</options>
      <option value="103">Cargo do Server Booster</options>
      <option value="104">Lista de membros com impulso por ordem de impulso</options>
      </optgroup>
      <optgroup label="Contagens">
      <option value="17">Total de membros do servidor</options>
      <option value="35">Total de humanos no Servidor</options>
      <option value="30">Total de bots do servidor</options>
      <option value="24">Total de emojis do servidor</options>
      <option value="37">Total de Cargos do servidor</options>
      <option value="23">Total de canais do servidor</options>
      <option value="38">Total de canais de texto do servidor</options>
      <option value="39">Total de canais de voz do servidor</options>
      <option value="70">Total de membros nos canais de voz</options>
      <option value="98">Total de figurinhas do servidor</option>
      <option value="101">Total de eventos do servidor</option>
      <option value="106">Total de membros de castigo no servidor</option>
      <option value="107">Total de membros castigados no servidor</option>
      </optgroup>
      <optgroup label="Informações da comunidade do servidor"">
      <option value="54">Servidor em parceria</options>
      <option value="55">Canal de regras do servidor</options>
      <option value="56">ID do canal da regra do servidor</options>
      <option value="4">Idioma preferencial do servidor</options>
      <option value="40">Servidor verificado</options>
      <option value="52">Barra de progresso do Server Premium ativada</options>
      <option value="46">URL do banner do servidor</options>
      <option value="47">Lista de recursos do servidor</options>
      <option value="49">Código de URL personalizado do servidor</options>
      <option value="57">Canal de widget do servidor</options>
      <option value="50">ID do canal do widget do servidor</options>
      <option value="25">Incorporação de servidor ativada</options>
      </optgroup>
      <optgroup label="Informações de datas do servidor">
      <option value="61">Carimbo de data e hora do servidor</options>
      <option value="18">Servidor criado em</options>
      <option value="22">Servidor conectado em</options>
      </optgroup>
      <optgroup label="Níveis do Servidor">
      <option value="59">Nível NSFW do servidor</options>
      <option value="6">Nível de verificação do servidor</options>
      <option value="60">Nível MFA/2FA do servidor</options>
      </optgroup>
      <optgroup label="Informações da Lista de Servidores">
      <option value="15">Lista de membros do servidor</options>
      <option value="90">Lista de tags dos membros do servidor</options>
      <option value="91">Lista de nomes dos membros do servidor</options>
      <option value="92">Lista dos discriminadores dos membros do servidor</options>
      <option value="33">Lista de IDs de membros do servidor</options>
      <option value="79">Lista de Bots do servidor</options>
      <option value="80">Lista de IDs de Bots do servidor</options>
      <option value="77">Lista de categorias do servidor</options>
      <option value="84">Lista de nomes das categorias do servidor</options>
      <option value="78">Lista de IDs das categorias do servidor</options>
      <option value="13">Lista de canais do servidor</options>
      <option value="85">Lista de nomes dos canais do servidor</options>
      <option value="31">Lista de IDs de canais de servidor</options>
      <option value="73">Lista de canais de texto do servidor</options>
      <option value="86">Lista de nomes dos canais de texto do servidor</options>
      <option value="74">Lista de IDs dos canais de texto do servidor</options>
      <option value="75">Lista de canais de voz do servidor</options>
      <option value="87">Lista de nomes dos canais de voz do servidor</options>
      <option value="76">Lista de IDs dos canais de voz do servidor</options>
      <option value="16">Lista de emojis do servidor</options>
      <option value="88">Lista de nomes dos emojis do servidor</options>
      <option value="14">Lista de Cargos do servidor</options>
      <option value="89">Lista de nomes dos Cargos do servidor</options>
      <option value="32">Lista de IDs de cargos de servidor</options>
      <option value="41">Lista de banidos do servidor</options>
      <option value="42">Lista de convites do servidor</options>
      <option value="71">Lista de membros por ID presentes nos canais de voz</options>
      <option value="72">Lista de membros presentes nos canais de voz</options>
      <option value="81">Lista de membros do servidor em ordem de entrada</option>
      <option value="93">Lista de tags de membros do servidor em ordem de entrada</option>
      <option value="82">Lista de IDs de membros do servidor em ordem de entrada</option>
      <option value="83">Lista de Webhooks do servidor</option>
      <option value="94">Lista de figurinhas do servidor</option>
      <option value="95">Lista de nomes de figurinhas do servidor</option>
      <option value="96">Lista de descrição das figurinhas do servidor</option>
      <option value="97">Lista de id das figurinhas do servidor</option>
      <option value="99">Lista de eventos do servidor</option>
      <option value="100">Lista de nome de eventos do servidor</option>
      <option value="102">Lista de ids de eventos do servidor</option>
      <option value="105">Lista de membros de castigo no servidor</option>
      <option value="108">Lista de membros que já foram castigados no servidor</option>
      </optgroup>
      <optgroup label="Informações do Dono do servidor">
      <option value="48">ID do Dono do servidor</options>
      <option value="11">Dono do Servidor (Objeto)</options>
      </optgroup>
      <optgroup label="Contagem de Status do Servidor">
      <option value="27">Total de membros online do servidor</options>
      <option value="29">Total de membros inativos do servidor</options>
      <option value="26">Total de membros ocupados do servidor</options>
      <option value="28">Total de membros offline do servidor</options>
      </optgroup>
      <optgroup label="Template do Servidor">
      <option value="62">URL do Template</options>
      <option value="63">Código do Template</options>
      <option value="64">Nome do Template</options>
      <option value="65">Descrição do Template</options>
      <option value="66">Vezes que o Template foi usado</options>
      <option value="67">ID do criador do Template</options>
      <option value="68">Timestamp da criação do Template</options>
      <option value="69">Timestamp da atualização do Template</options>
      </optgroup>
		</select>
    <input type="text" id="filtrodoxinxyla" class="round" placeholder="Filtrar itens...">
	</div>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>

</div>

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
    const targetServer = await this.getServerFromData(data.server, data.varName, cache);

    if (!targetServer) {
      return this.callNextAction(cache);
    }

    const fetchMembers = async (withPresences = false) => {
      if (targetServer.memberCount !== targetServer.members.cache.size) {
        await targetServer.members.fetch({ withPresences });
      }
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = targetServer;
        break;
      case 1:
        result = targetServer.id;
        break;
      case 2:
        result = targetServer.name;
        break;
      case 3:
        result = targetServer.nameAcronym;
        break;
      case 4:
        result = targetServer.preferredLocale;
        break;
      case 5:
        result = targetServer.iconURL({ dynamic: true, format: "png", size: 4096 });
        break;
      case 6:
        result = targetServer.verificationLevel;
        break;
      case 7:
        result = targetServer.getDefaultChannel();
        break;
      case 8:
        result = targetServer.afkChannel;
        break;
      case 9:
        result = targetServer.systemChannel;
        break;
      case 10:
        result = targetServer.roles.resolve(targetServer.id);
        break;
      case 11:
        result = await targetServer.fetchOwner();
        break;
      case 12:
        result = targetServer.members.me;
        break;
      case 13:
        result = [...targetServer.channels.cache.values()];
        break;
      case 14:
        result = [...targetServer.roles.cache.values()];
        break;
      case 15:
        result = [...targetServer.members.cache.values()];
        break;
      case 16:
        result = [...targetServer.emojis.cache.values()];
        break;
      case 17:
        result = targetServer.memberCount;
        break;
      case 18:
        result = targetServer.createdAt;
        break;
      case 19:
        result = targetServer.afkTimeout ?? 0;
        break;
      case 20:
        result = targetServer.available;
        break;
      case 21:
        result = targetServer.large;
        break;
      case 22:
        result = targetServer.joinedAt;
        break;
      case 23:
        result = targetServer.channels.cache.size;
        break;
      case 24:
        result = targetServer.emojis.cache.size;
        break;
      case 25:
        result = !!targetServer.widgetEnabled;
        break;
      case 26:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "dnd").size;
        break;
      case 27:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "online").size;
        break;
      case 28:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "offline").size;
        break;
      case 29:
        await fetchMembers(true);
        result = targetServer.members.cache.filter((m) => m.presence?.status === "idle").size;
        break;
      case 30:
        result = targetServer.members.cache.filter((m) => m.user?.bot).size;
        break;
      case 31:
        result = [...targetServer.channels.cache.keys()];
        break;
      case 32:
        result = [...targetServer.roles.cache.keys()];
        break;
      case 33:
        await fetchMembers();
        result = [...targetServer.members.cache.keys()];
        break;
      case 35:
        await fetchMembers();
        result = targetServer.members.cache.filter((m) => !m.user?.bot).size;
        break;
      case 37:
        result = targetServer.roles.cache.size;
        break;
      case 38:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_NEWS").size;
        break;
      case 39:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").size;
        break;
      case 40:
        result = targetServer.verified;
        break;
      case 41:
        const bans = await targetServer.bans.fetch();
        result = [...bans.values()];
        break;
      case 42:
        const invites = await targetServer.invites.fetch();
        result = [...invites.values()];
        break;
      case 43:
        result = targetServer.explicitContentFilter;
        break;
      case 44:
        result = targetServer.premiumSubscriptionCount ?? 0;
        break;
      case 45:
        result = targetServer.premiumTier;
        break;
      case 46:
        result = targetServer.bannerURL({ format: "png", size: 4096 });
        break;
      case 47:
        result = targetServer.features;
        break;
      case 48:
        result = targetServer.ownerId;
        break;
      case 49:
        result = targetServer.vanityURLCode;
        break;
      case 50:
        result = targetServer.widgetChannelId;
        break;
      case 51:
        result = targetServer.afkChannelId;
        break;
      case 52:
        result = targetServer.premiumProgressBarEnabled;
        break;
      case 53:
        result = targetServer.description;
        break;
      case 54:
        result = targetServer.partnered;
        break;
      case 55:
        result = targetServer.rulesChannel;
        break;
      case 56:
        result = targetServer.rulesChannelId;
        break;
      case 57:
        result = targetServer.widgetChannel;
        break;
      case 58:
        result = targetServer.systemChannelId;
        break;
      case 59:
        result = targetServer.nsfwLevel;
        break;
      case 60:
        result = targetServer.mfaLevel;
        break;
      case 61:
        result = targetServer.createdTimestamp;
        break;
      case 62:
        result = `https://discord.new/${(await targetServer.fetchTemplates()).map(v => v.code)}`;
        break;
      case 63:
        result = `${(await targetServer.fetchTemplates()).map(v => v.code)}`;
        break;
      case 64:
        result = `${(await targetServer.fetchTemplates()).map(v => v.name)}`;
        break;
      case 65:
        result = `${(await targetServer.fetchTemplates()).map(v => v.description)}`;
        break;
      case 66:
        result = `${(await targetServer.fetchTemplates()).map(v => v.usageCount)}`;
        break;
      case 67:
        result = `${(await targetServer.fetchTemplates()).map(v => v.creatorId)}`;
        break;
      case 68:
        result = `${(await targetServer.fetchTemplates()).map(v => v.createdAt)}`;
        break;
      case 69:
        result = `${(await targetServer.fetchTemplates()).map(v => v.updatedAt)}`;
        break;
      case 70:
        result = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.size).reduce((s, a) => s + a, 0);
        break;
      case 71:
        const str = targetServer.channels.cache.filter(c => c.type === 'GUILD_VOICE').map(c => c.members.map(member => member.user.id + ',').join('')).join('');
        result = str.substring(0, str.length - 1).split(new RegExp(","));
        break;
      case 72:
        let channels = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE");
        let members = new Array();

        for (const [channelID, channel] of channels) {
          for (const [memberID, member] of channel.members) {
            members.push(member);
          }
        }

        result = members;
        break;
      case 73:
        result = targetServer.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type)).map(channels => channels);
        break;
      case 74:
        result = targetServer.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type)).map(channels => channels.id);
        break;
      case 75:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").map(channels => channels);
        break;
      case 76:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").map(channels => channels.id);
        break;
      case 77:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map(channels => channels);
        break;
      case 78:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map(channels => channels.id);
        break;
      case 79:
        result = targetServer.members.cache.filter((m) => m.user?.bot).map((m) => m);
        break;
      case 80:
        result = targetServer.members.cache.filter((m) => m.user?.bot).map((m) => m.id);
        break;
      case 81:
        result = targetServer.members.cache.sort((a, b) => parseFloat(a.joinedTimestamp) - parseFloat(b.joinedTimestamp)).map((m) => m);
        break;
      case 82:
        result = targetServer.members.cache.sort((a, b) => parseFloat(a.joinedTimestamp) - parseFloat(b.joinedTimestamp)).map((m) => m.id);
        break;
      case 83:
        const webhooks = await targetServer.fetchWebhooks();
        result = webhooks.map((w) => w);
        break;
      case 84:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").map(channels => channels.name);
        break;
      case 85:
        result = targetServer.channels.cache.map(channels => channels.name);
        break;
      case 86:
        result = targetServer.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type)).map(channels => channels.name);
        break;
      case 87:
        result = targetServer.channels.cache.filter((c) => c.type === "GUILD_VOICE").map(channels => channels.name);
        break;
      case 88:
        result = targetServer.emojis.cache.map(emoji => emoji.name);
        break;
      case 89:
        result = targetServer.roles.cache.map(roles => roles.name);
        break;
      case 90:
        result = targetServer.members.cache.filter((m) => m).map((m) => m.user.tag);
        break;
      case 91:
        result = targetServer.members.cache.filter((m) => m).map((m) => m.user.username);
        break;
      case 92:
        result = targetServer.members.cache.filter((m) => m).map((m) => m.user.discriminator);
        break;
      case 93:
        result = targetServer.members.cache.sort((a, b) => parseFloat(a.joinedTimestamp) - parseFloat(b.joinedTimestamp)).map((m) => m.user.tag);
        break;
      case 94:
        result = [...targetServer.stickers.cache.values()];
        break;
      case 95:
        result = targetServer.stickers.cache.map(sticker => sticker.name);
        break;
      case 96:
        result = targetServer.stickers.cache.map(sticker => sticker.description);
        break;
      case 97:
        result = targetServer.stickers.cache.map(sticker => sticker.id);
        break;
      case 98:
        result = targetServer.stickers.cache.size;
        break;
      case 99:
        result = [...targetServer.scheduledEvents.cache.values()];
        break;
      case 100:
        result = targetServer.scheduledEvents.cache.map(scheduledEvents => scheduledEvents.name);
        break;
      case 101:
        result = targetServer.scheduledEvents.cache.size;
        break;
      case 102:
        result = targetServer.scheduledEvents.cache.map(scheduledEvents => scheduledEvents.id);
        break;
      case 103:
        result = targetServer.roles.cache.find((item) => item.tags && item.tags.premiumSubscriberRole === true);
        break;
      case 104:
        result = targetServer.members.cache.filter((m) => m.premiumSinceTimestamp).sort((a, b) => parseFloat(a.premiumSinceTimestamp) - parseFloat(b.premiumSinceTimestamp)).map(a => a)
        break;
      case 105:
        result = targetServer.members.cache.filter((m) => m.communicationDisabledUntilTimestamp > Date.now()).sort((a, b) => parseFloat(a.communicationDisabledUntilTimestamp) - parseFloat(b.communicationDisabledUntilTimestamp)).map(a => a)
        break;
      case 106:
        result = targetServer.members.cache.filter((m) => m.communicationDisabledUntilTimestamp > Date.now()).map(a => a).length
        break;
      case 107:
        result = targetServer.members.cache.filter((m) => m.communicationDisabledUntilTimestamp > 0).map(a => a).length
        break;
      case 108:
        result = targetServer.members.cache.filter((m) => m.communicationDisabledUntilTimestamp > 0).sort((a, b) => parseFloat(a.communicationDisabledUntilTimestamp) - parseFloat(b.communicationDisabledUntilTimestamp)).map(a => a)
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