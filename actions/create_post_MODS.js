module.exports = {
  name: "Create Post MOD",
  section: "Channel Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "[Tempest - 321400509326032897]",
    authorUrl: "https://github.com/DBM-Mods/Portugues",
    downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
  },

  subtitle(data, presets) {
    if (data.descriptionx == true) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.channelName} > ${presets.getChannelText(data.channel, data.channelVarName)}</font>`
  },

  variableStorage(data, varType) {
    if (data.storage == varType) return [data.varName3, "Canal"];
  },

  fields: ["channel", "channelVarName", "channelName", "message", "varName2", "autoArchiveDuration", "reason", "slowmode", "tags", "locked", "descriptioncolor", "description", "descriptionx", "storage", "varName3"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding: 5px 5px; height: calc(100vh - 160px); overflow: auto;">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

    <channel-input dropdownLabel="Canal da postagem" selectId="channel" variableContainerId="varNameContainer" variableInputId="channelVarName"></channel-input>
   
    <br><br><br>

    <message-input dropdownLabel="Mensagem" selectId="message" variableContainerId="varNameContainer2" variableInputId="varName2"></message-input>

    <br><br><br>

        <div style="padding-top: 8px;">

        <table style="width: 100%;">
          <td>
            <span class="dbminputlabel">Nome da postagem</span>
            <input id="channelName" class="round" type="text">
          </td>
          <td style="padding-left: 18px;">
            <span class="dbminputlabel">Razão</span>
            <input id="reason" placeholder="Opcional" class="round" type="text">
          </td>
        </table>

        <br>

        <table style="width: 100%;">
            <td style="width: 33%;">
              <span class="dbminputlabel">Duração do auto arquivar</span>
              <select id="autoArchiveDuration" class="round">
                <option value="60">1 hora</option>
                <option value="1440">24 horas</option>
                <option value="4320">3 dias (Requer booster LVL 1)</option>
                <option value="10080">1 semana (Requer booster LVL 2)</option>
                <option value="max">Máximo</option>
              </select>
            </td>
            <td style="width: 33%; padding-left: 8px;">
              <span class="dbminputlabel">Bloquear postagem [true/false]</span>
              <input id="locked" class="round" type="text" placeholder="Deixe em branco para false">
            </td>
        </table>

        <br>

        <span class="dbminputlabel">Modo lento (segundos)</span>
        <input id="slowmode" class="round" type="text" placeholder="Deixe em branco para desativar">

        <br>
  
        <span class="dbminputlabel">Lista de Tags [Modo EVAL]</span>
        <input id="tags" name="is-eval" class="round" type="text" placeholder="Deixe em branco para nenhuma">
        <br>
        ["1118344873095987211" , "1118344873095988452"] = Adiciona 2 tags
        <br><br>

        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Armazenar em</span>
          <select id="storage" class="round">
            ${data.variables[1]}
          </select>
        </div>

        <div style="float: right; width: 60%;">
          <span class="dbminputlabel">Nome da Variável</span>
          <input id="varName3" class="round" type="text">
        </div>

      </div>

      <style>
      .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
      .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
      </style>

`;
  },

  init() {
    const xinelaslinks = document.getElementsByClassName("xinelaslink");
    for (let x = 0; x < xinelaslinks.length; x++) {
      const xinelaslink = xinelaslinks[x];
      const url = xinelaslink.getAttribute("data-url");
      if (url) {
        xinelaslink.setAttribute("title", url);
        xinelaslink.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require("child_process").execSync(`start ${url}`);
        });
      }
    }
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const channel = await this.getAnyChannel(data.channel, data.channelVarName, cache);
    const msg = await this.getMessageFromData(data.message, data.varName2, cache);

    const channelData = {
      reason: this.evalMessage(data.reason, cache),
      message: String(msg) == "[object Object]" ? msg : String(msg),
      name: this.evalMessage(data.channelName, cache),
      autoArchiveDuration: data.autoArchiveDuration === "max" ? "MAX" : parseInt(data.autoArchiveDuration),
      locked: String(this.evalMessage(data.locked, cache)) === "true" ? true : false,
      rateLimitPerUser: parseInt(this.evalMessage(data.slowmode, cache))
    };

    if (data.tags) channelData.appliedTags = this.evalIfPossible(this.evalMessage(data.tags, cache), cache);

    const post = await channel.threads.create(channelData);

    this.storeValue(post, parseInt(data.storage), this.evalMessage(data.varName3, cache), cache);
    this.callNextAction(cache);
  },

  mod() { },
};