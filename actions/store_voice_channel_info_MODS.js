module.exports = {

  name: "Store Voice Channel Info MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },


  subtitle(data, presets) {
    const info = [
      "Objeto do canal de voz",
      "ID do canal de voz",
      "Nome do canal de voz",
      "Posição do canal de voz",
      "Limite de usuários do canal de voz",
      "Bitrate do canal de voz",
      "Membros conectados no canal de voz",
      "Quantidade de membros no canal de voz",
      "Pode falar?",
      "Pode entrar?",
      "È deletable?",
      "Data de criação do canal de voz",
      "Timestamp de criação do canal de voz",
      "Nome da categoria do canal de voz",
      "Lista de convites do canal de voz",
    ];
    return `${presets.getVoiceChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Voice Channel";
        break;
      case 1:
        dataType = "Voice Channel ID";
        break;
      case 2:
        dataType = "Text";
        break;
      case 3:
      case 4:
      case 5:
        dataType = "Number";
        break;
      case 6:
        dataType = "List";
          break;
      case 7:
          dataType = "Number";
            break;
      case 8:
          dataType = "True or False";
              break;
      case 9:
          dataType = "True or False";
                break;
      case 10:
          dataType = "True or False";
                  break;
      case 11:
          dataType = "Date";
                    break;
      case 12:
          dataType = "Timestamp";
                      break;
      case 13:
          dataType = "Text";
                        break;
      case 14:
          dataType = "List";
                          break;
    }
    return [data.varName2, dataType];
  },


  fields: ["channel", "varName", "info", "storage", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.5</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<voice-channel-input dropdownLabel="Canal de origem" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName" selectWidth="45%" variableInputWidth="50%"></voice-channel-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informações da fonte</span><br>
	<select id="info" class="round">
		<option value="0" selected>Objeto do canal de voz</option>
		<option value="1">ID do canal de voz</option>
		<option value="2">Nome do canal de voz</option>
		<option value="3">Posição do canal de voz</option>
		<option value="4">Limite de usuários do canal de voz</option>
		<option value="5">Bitrate do canal de voz</option>
    <option value="6">Membros conectados no canal de voz</option>
    <option value="7">Quantidade de membros no canal de voz</option>
    <option value="8">Pode falar?</option>
    <option value="9">Pode entrar?</option>
    <option value="10">É deletable?</option>
    <option value="11">Data de criação do canal de voz</option>
    <option value="12">Timestamp de criação do canal de voz</option>
    <option value="13">Nome da categoria do canal de voz</option>
    <option value="14">Lista de convites do canal de voz</option>
    
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },


  init() {},



  async action(cache) {
    const data = cache.actions[cache.index];
    const targetChannel = await this.getVoiceChannelFromData(data.channel, data.varName, cache);
    
    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }

    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = targetChannel;
        break;
      case 1:
        result = targetChannel.id;
        break;
      case 2:
        result = targetChannel.name;
        break;
      case 3:
        result = targetChannel.position;
        break;
      case 4:
        result = targetChannel.userLimit;
        break;
      case 5:
        result = targetChannel.bitrate;
        break;
      case 6:
          result = targetChannel.members.filter(member => member).map(member => member);
          break;
      case 7:
        result = targetChannel.members.size;
            break;
      case 8:
            result = targetChannel.speakable;
            break;
      case 9:
            result = targetChannel.joinable;
            break;
      case 10:
            result = targetChannel.deletable;
            break;
      			case 11:
				result = targetChannel.createdAt;
				break;
			case 12:
				result = targetChannel.createdTimestamp;
				break;
			case 13:
				result = targetChannel.parent;
				break;
			case 14:
				const invites = await targetChannel.fetchInvites();
				if(invites.size == 0) {
					result = "Não há convites"
				} else {
					result = invites.filter(code => code).map(code => code).join(", ");
				}
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



  mod() {},
};
