module.exports = {
  name: 'Check If Message MOD',
  section: 'Conditions',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
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
      : `<font style="color:${desccor}">${presets.getConditionsText(data)}</font>`
  },


  fields: ['message', 'varName', 'info', 'descriptioncolor', 'description', 'descriptionx', 'branch'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>


    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    <br>


<message-input dropdownLabel="Mensagem" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br><br>

<div>

  <div style="width: 100%;">
  <span class="dbminputlabel">Verifique se a mensagem</span><br>
    <select id="info" class="round">
    <option value="0">Pode ser fixada?</option>
    <option value="1">Está fixada?</option>
    <option value="2">É apagável?</option>
    <option value="3">Foi excluída?</option>
    <option value="4">É TTS?</option>
    <option value="5">É uma mensagem de sistema?</option>
    <option value="6">Menciona um membro/bot?</option>
    <option value="7">Menciona mais de um membro/bot?</option>
    <option value="8">Possui reações?</option>
    <option value="9">Possui um anexo?</option>
    <option value="10">Possui mais de um anexo?</option>
    <option value="11">Possui convite do Discord?</option>
    <option value="12">Possui embeds?</option>
    <option value="13">Possui duas embeds?</option>
    </select>
  </div>

</div>
<br>
<hr class="subtlebar">

<br>
<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>

<style>
table{width:100%}
.col1{width:38%;padding:0px 10px 0px 0px}
.col2{width:60%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() { 
    
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
    const message = parseInt(data.message, 10);
    const varName = this.evalMessage(data.varName, cache);
    const msg = await this.getMessage(message, varName, cache);
    const info = parseInt(data.info, 10);
    let result = false;
    switch (info) {
      case 0:
        result = msg.pinnable;
        break;
      case 1:
        result = msg.pinned;
        break;
      case 2:
        result = msg.deletable;
        break;
      case 3:
        result = msg.deleted;
        break;
      case 4:
        result = msg.tts;
        break;
      case 5:
        result = msg.system;
        break;
      case 6:
        mentions = msg.mentions.users.size
        if (mentions == 1) { result = true } else { result = false }
        console.log(mentions)
        break;
      case 7:
        mentions = msg.mentions.users.size
        if (mentions > 1) { result = true } else { result = false }
        break;
      case 8:
        react = msg.reactions.cache.size
        if (react > 0) { result = true } else { result = false }
        break;
      case 9:
        att = msg.attachments.size
        if (att == 1) { result = true } else { result = false }
        break;
      case 10:
        att = msg.attachments.size
        if (att > 1) { result = true } else { result = false }
        break;
      case 11:
        invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
        if (invite.test(msg.content)) { result = true } else { result = false }
        break;
      case 12:
        react = msg.embeds.length
        if (react > 0) { result = true } else { result = false }
        break;
      case 13:
        react = msg.embeds.length
        if (react = 2) { result = true } else { result = false }
        break;
      default:
        break;
    }
    this.executeResults(result, data?.branch ?? data, cache);
  },

  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },

  mod() { },
};
