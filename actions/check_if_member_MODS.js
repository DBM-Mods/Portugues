module.exports = {
  name: 'Check If Member MOD',
  section: 'Conditions',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data, presets) {
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
      ];
      return `${info[parseInt(data.info, 10)]} > ${presets.getConditionsText(data)}`;
    },

  fields: ['member', 'varName', 'info', 'varName2', "comparison", "branch"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
<member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer" variableInputId="varName"></member-input>
</div><br><br><br><br>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Verifique se o membro</span><br>
    <select id="info" class="round">
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
      ${!isEvent && '<option value="10">É o proprietário atual do servidor?</option>'}
      <option value="11">Está no canal AFK?</option>
      <option value="12">Impulsionou o servidor?</option>
    </select>
  </div>
</div><br><br><br><br>
<hr class="subtlebar"><br>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input>`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() {},

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
          if(member.user?.bot || member.bot){result = false}else{result = true}
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


  mod() {},
};
