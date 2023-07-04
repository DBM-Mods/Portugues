module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Find Channel MOD",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Channel Control",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data) {
    const info = ["ID do Canal", "Nome do Canal", "Tópico do Canal", "Posição do Canal", "ID da Categoria do Canal", "Nome do Canal que Inclui", "Tópico do Canal que Inclui"];

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Buscando canal por ${info[parseInt(data.info)]}</font>`
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Canal"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "[Tempest - 321400509326032897]",
    authorUrl: "https://github.com/DBM-Mods/Portugues",
    downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["info", "find", "text", "announcement", "forum", "voice", "staige", "thread", "privateThread", "post", "storage", "varName", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal", "actionsError"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
<div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

<div style="height: calc(100vh - 110px); overflow-y: auto;">

<div id="flutuador" style="padding:0px 0px 15px 0px; margin-top: 5px;">
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

<div style="float: left; width: 40%;">
    <span class="dbminputlabel">Buscar por</span>
    <select id="info" class="round">
        <option value="0" selected>ID do Canal</option>
        <option value="1">Nome do Canal</option>
        <option value="5">Nome do Canal Inclui</option>
        <option value="2">Tópico do Canal</option>
        <option value="6">Tópico do Canal Inclui</option>
        <option value="3">Posição do Canal</option>
        <option value="4">ID da Categoria do Canal</option>
    </select>
</div>
<div style="float: right; width: 55%;">
    <span class="dbminputlabel">Pesquisar por</span>
    <input id="find" class="round" type="text">
</div>

<br><br><br>

<span class="dbminputlabel">Buscar canais de</span>
<div style="background: rgba(33, 33, 33, 0.8); padding: 10px; border-radius: 10px; display: flex; align-items: left; justify-content: left; flex-wrap: wrap;">
    <table style="margin-top: 10px; display: flex; align-items: left; justify-content: left;">
        <td>
          <dbm-checkbox id="text" label="Texto" checked></dbm-checkbox>
        </td>
        <td>
          <dbm-checkbox id="announcement" label="Anúncio"></dbm-checkbox>
        </td>
        <td>
          <dbm-checkbox id="forum" label="Fórum"></dbm-checkbox>
        </td>
        <td>
          <dbm-checkbox id="voice" label="Voz"></dbm-checkbox>
        </td>
        <td>
          <dbm-checkbox id="staige" label="Palco"></dbm-checkbox>
        </td>
    </table>
    <table style="margin-top: 10px; display: flex; align-items: left; justify-content: left;">
      <td>
        <dbm-checkbox id="post" label="Postagem"></dbm-checkbox>
      </td>
      <td>
        <dbm-checkbox id="thread" label="Tópico público"></dbm-checkbox>
      </td>
      <td>
        <dbm-checkbox id="privateThread" label="Tópico privado"></dbm-checkbox>
      </td>
    </table>
</div>

<store-in-variable style="padding-top: 8px;" dropdownLabel="Armazenar canal em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="40%" variableInputWidth="55%"></store-in-variable>

<br><br><br>

<div style="float: left; width: 40%">
  <span class="dbminputlabel">Caso não encontre o canal</span>
  <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
    <option value="0">Continuar ações</option>
    <option value="1">Parar sequência de ação</option>
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

<action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 400px)"></action-list-input>

<br><br><br>

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
</style>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {
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

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  action(cache) {
    const server = cache.server;
    if (!server?.channels) return this.callNextAction(cache);

    const data = cache.actions[cache.index];
    const info = parseInt(data.info);
    const find = this.evalMessage(data.find, cache);

    let channels = server.channels.cache;
    channels = channels.filter((c) => [
      data.text ? "GUILD_TEXT" : "",
      data.announcement ? "GUILD_NEWS" : "",
      data.forum ? "GUILD_FORUM" : "",
      data.voice ? "GUILD_VOICE" : "",
      data.staige ? "GUILD_STAGE_VOICE" : "",
    ].includes(c.type)
    ||
    (data.thread ? c.type === "GUILD_PUBLIC_THREAD" && channels.get(c.parentId)?.type === "GUILD_FORUM" === false : "")
    ||
    (data.privateThread ? c.type === "GUILD_PRIVATE_THREAD" && channels.get(c.parentId)?.type === "GUILD_FORUM" === false : "")
    ||
    (data.post ? [
      "GUILD_PUBLIC_THREAD",
      "GUILD_PRIVATE_THREAD"
    ].includes(c.type) && channels.get(c.parentId)?.type === "GUILD_FORUM" : "" === true));

    let result;
    switch (info) {
      case 0:
        result = channels.get(find);
        break;
      case 1:
        result = channels.find((c) => c.name === find);
        break;
      case 2:
        result = channels.find((c) => c.topic === find);
        break;
      case 3:
        const position = parseInt(find);
        result = channels.find((c) => c.position === position);
        break;
      case 4:
        result = channels.find((c) => c.parentId === find);
        break;
      case 5:
        result = channels.find((c) => c.name.includes(find));
        break;
      case 6:
        result = channels.find((c) => c.topic.includes(find));
        break;
    }

    const storage = parseInt(data.storage);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(result, storage, varName, cache);

    if (Boolean(result)) {
      this.callNextAction(cache);
    } else {
      if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
      if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

      this.executeResults(false, data, cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() { },

  modInit(data) {
    this.prepareActions(data.actionsError);
  },
};