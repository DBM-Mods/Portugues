module.exports = {
  name: 'Check If Member MOD',
  section: 'Conditions',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const info = [
      "É um Bot?",
      "Pode ser banido?",
      "Pode ser kickado?",
      "",
      "Está em um canal de voz?",
      "É gerenciável pelo usuário?",
      "É o proprietário do bot?",
      "Está mutado?",
      "Está ensurrecido?",
      "É o autor do comando?",
      "É o proprietário atual do servidor?",
      "Está no canal AFK?",
      "Impulsionou o servidor?",
      "É um usuário?",
      "Está no servidor atual?",
      "Foi banido do servidor atual?",
      "Possui convites no servidor atual?",
      "Está no tópico/postagem?",
      "Está de castigo no servidor?",
      "Já foi castigado no servidor?",
    ];

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${info[parseInt(data.info, 10)]} > ${presets.getConditionsText(data)}</font>`
  },

  fields: ['member', 'varName', 'info', 'varName2', "comparison", "branch", "thread", "threadVarName", "descriptioncolor", "description", "descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.8</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<div>
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
</div><br><br><br>
<div>
  <div style="float: left; width: 100%;padding-top:8px">
  <span class="dbminputlabel">Verifique se o membro</span><br>
    <select id="info" class="round" onchange="glob.change(this)">
      <option value="0" selected>É um Bot?</option>
      <option value="13">É um usuário?</option>
      <option value="1">Pode ser banido?</option>
      <option value="2">Pode ser kickado?</option>
      <option value="4">Está em um canal de voz?</option>
      <option value="5">É gerenciável pelo usuário?</option>
      <option value="6">É o proprietário do bot?</option>
      <option value="7">Está mutado?</option>
      <option value="8">Está ensurrecido?</option>
      ${!isEvent && '<option value="9">É o autor do comando?</option>'}
      <option value="10">É o proprietário atual do servidor?</option>
      <option value="11">Está no canal AFK?</option>
      <option value="12">Impulsionou o servidor?</option>
      <option value="14">Está no servidor atual?</option>
      <option value="15">Foi banido do servidor atual?</option>
      <option value="16">Possui convites no servidor atual?</option>
      <option value="17">Está no tópico/postagem?</option>
      <option value="18">Está de castigo no servidor?</option>
      <option value="19">Já foi castigado no servidor?</option>
    </select>
  </div>
</div><br><br><br>

<div id="thrxin" style="overflow:hidden">
<br>
<thread-channel-input dropdownLabel="Canal" selectId="thread" variableContainerId="varNameContainer2" variableInputId="threadVarName"></thread-channel-input>
<br><br>
</div>
<xinspace>

<hr class="subtlebar">
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input>

</div>
<style>
xinspace{padding:10px 0px 0px 0px;display:block}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() {
    const { glob, document } = this;

    glob.change = function (event) {
      if (event.value == "17") {
        document.getElementById("thrxin").style.display = null;
      } else {
        document.getElementById("thrxin").style.display = "none";
      }
    }

    glob.change(document.getElementById("info"));

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
    const type = parseInt(data.member, 10);
    const varName = this.evalMessage(data.varName, cache);
    const member = await this.getMember(type, varName, cache);
    const autor = await this.getMember(1, varName, cache);
    const targetServer = await this.getServerFromData(0, data.varName, cache);
    const info = parseInt(data.info, 10);
    const { Files } = this.getDBM();

    if (!member) {
      console.error('Você precisa fornecer um membro de algum tipo para a ação "Verificar se membro"');
      return this.executeResults(false, data, cache);
    }

    let result = false;
    switch (info) {
      case 0:
        result = member.user?.bot || member.bot;
        break;
      case 1:
        result = member.bannable;
        break;
      case 2:
        result = member.kickable;
        break;
      case 4:
        result = Boolean(member.voice?.channel);
        break;
      case 5:
        result = member.manageable;
        break;
      case 6: {
        const fs = require('fs');
        const filePath = require('path').join(__dirname, '../data', 'multiple_bot_owners.json');
        if (!fs.existsSync(filePath)) {
          result = member.id === Files.data.settings.ownerId;
        } else {
          result =
            JSON.parse(fs.readFileSync(filePath, 'utf8')).includes(member.id) ||
            member.id === Files.data.settings.ownerId;
        }
        break;
      }
      case 7:
        result = Boolean(member.voice?.mute);
        break;
      case 8:
        result = Boolean(member.voice?.deaf);
        break;
      case 9:
        result = member.id === autor.id;
        break;
      case 10:
        result = member.id === targetServer.ownerId;
        break;
      case 11:
        result = member.voice?.channel === targetServer.afkChannel;
        break;
      case 12:
        result = Boolean(member.premiumSinceTimestamp);
        break;
      case 13:
        if (member.user?.bot || member.bot) {
          result = false;
        } else {
          result = true;
        }
        break;
      case 14:
        const server = cache.server;

        if (!server?.members) {
          result = false;
        } else {
          if (server.memberCount !== server.members.cache.size) {
            server.members.fetch();
          }

          const members = server.members.cache;

          result = Boolean(members.get(member.id));
        }
        break;
      case 15:
        const bans = await targetServer.bans.fetch();
        banidos = [...bans.values()];
        banidos = banidos.map(v => v.user)
        banido = banidos.findIndex((item) => item.id == member.id)
        if (banido == -1) { result = false } else { result = true }
        break;
      case 16:
        const invites = await targetServer.invites.fetch();
        convites = [...invites.values()];
        convites = convites.map(v => v.inviter)
        convite = convites.findIndex((item) => item.id == member.id)
        if (convite == -1) { result = false } else { result = true }
        break;
      case 17:
        const targetChannel = await this.getChannelFromData(data.thread, data.threadVarName, cache);
        const members = await targetChannel.members.fetch();
        const ids = Array.from(members.keys());
        id = ids.findIndex((item) => item == member.id)
        if (id == -1) { result = false } else { result = true }
        break;
      case 18:
        result = member.communicationDisabledUntilTimestamp > Date.now()
        break;
      case 19:
        result = member.communicationDisabledUntilTimestamp > 0
        break;
      default:
        console.log('Verifique sua ação "Verifique se o membro"! Há algo errado...');
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
