module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Check if Channel Exists MOD",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Conditions",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    return ``;
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

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
    version: "2.1.6",
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["info", "find", "branch", "server", "varName", "voz"],

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
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

    <br><br><br>

    <div>
      <div style="float: left; width: 40%;">
        <span class="dbminputlabel">Buscar por</span><br>
        <select id="info" class="round">
          <option value="0" selected>ID</option>
          <option value="1">Nome</option>
          <option value="2">Tópico do Canal</option>
          <option value="3">Posição do Canal</option>
          <option value="4">ID da Categoria do Canal</option>
        </select>
      </div>
      <div style="float: right; width: 55%;">
        <span class="dbminputlabel">Pesquisar por</span><br>
        <input id="find" class="round" type="text">
      </div>
    </div>

    <br><br><br><br>

    <dbm-checkbox id="voz" label="Incluir Canais de Voz" checked></dbm-checkbox></td>

    <br>

    <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {},

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {
    const data = cache.actions[cache.index];
    const server = await this.getServerFromData(data.server, data.varName, cache);
    const find = this.evalMessage(data.find, cache);
    const info = parseInt(data.info, 10);

    if (!server?.channels) return this.callNextAction(cache);

    let channels;

    if(data.voz) {
      channels = server.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS", "GUILD_VOICE"].includes(c.type));
    } else {
      channels = server.channels.cache.filter((c) => ["GUILD_TEXT", "GUILD_NEWS"].includes(c.type));
    }

    switch(info) {
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
          result = channels.find((c) => c.rawPosition === parseInt(find));
          break;
        case 4:
          result = channels.find((c) => c.parentId === find);
          break;
    }

    this.executeResults(Boolean(result), data?.branch ?? data, cache);
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() {},
};
