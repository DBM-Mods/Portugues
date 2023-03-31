module.exports = {
  name: "Store Thread Channel Info MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
      "Objeto do topico",
      "ID do topico",
      "Nome do topico",
      "O topico foi arquivado?",
      "O topico está bloqueado?",
      "O topico é convidativo?",
      "Data de arquivamento do topico",
      "Timestamp de arquivamento do topico",
      "Proprietario do topico",
      "Número de mensagens no topico",
      "Número de membros no topico",
      "Modo lento do topico [segundos]",
      "Duração do arquivamento do topico [segundos]",
      "ID do canal na qual o topico está",
      "ID do servidor na qual o topico está",
      "ID da última mensagem do topico",
    ];
    return `${presets.getChannelText(data.thread, data.threadVarName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Unknown Type";
    switch (info) {
      case 0:
        dataType = "Objeto";
        break;
      case 1:
        dataType = "Numero";
        break;
      case 2:
        dataType = "Texto";
        break;
        case 3:
          dataType = "true/false";
          break;
          case 4:
            dataType = "true/false";
            break;
      case 5:
        dataType = "true/false";
        break;
      case 6:
        dataType = "Data";
        break;
      case 7:
        dataType = "Timestamp";
        break;
        case 8:
          dataType = "Numero";
          break;
          case 9:
            dataType = "Numero";
            break;
            case 10:
              dataType = "Numero";
              break;
              case 11:
                dataType = "Numero";
                break;
                    case 12:
                      dataType = "Numero";
                      break;
                      case 13:
                        dataType = "Numero";
                        break;
                        case 14:
                          dataType = "Numero";
                          break;
                          case 15:
                            dataType = "Numero";
                            break;
    }
    return [data.storageVarName, dataType];
  },


  fields: ["thread", "threadVarName", "info", "storage", "storageVarName"],

   html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<thread-channel-input dropdownLabel="Canal" selectId="thread" variableContainerId="varNameContainer" variableInputId="threadVarName"></thread-channel-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Informação</span><br>
	<select id="info" class="round">
		<option value="0" selected>Objeto do topico</option>
		<option value="1">ID do topico</option>
		<option value="2">Nome do topico</option>
		<option value="3">O topico foi arquivado?</option>
		<option value="4">O topico está bloqueado?</option>
		<option value="5">O topico é convidativo?</option>
		<option value="6">Data de arquivamento do topico</option>
		<option value="7">Timestamp de arquivamento do topico</option>
    <option value="8">ID do proprietario do topico</option>
    <option value="9">Número de mensagens no topico</option>
    <option value="10">Número de membros no topico</option>
    <option value="11">Modo lento do topico [segundos]</option>
    <option value="12">Duração do arquivamento do topico [segundos]</option>
    <option value="13">ID do canal na qual o topico está</option>
    <option value="14">ID do servidor na qual o topico está</option>
    <option value="15">ID da última mensagem do topico</option>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="storageVarName"></store-in-variable>`;
  },


  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];

    const targetChannel = await this.getChannelFromData(data.thread, data.threadVarName, cache);

    if (!targetChannel) {
      this.callNextAction(cache);
      return;
    }

    let result;
    const info = parseInt(data.info, 10);
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
        result = targetChannel.archived;
        break;
      case 4:
        result = targetChannel.locked;
        break;
      case 5:
        result = targetChannel.invitable;
        break;
      case 6:
        result = targetChannel.archivedAt;
        break;
      case 7:
        result = targetChannel.archiveTimestamp;
        break;
      case 8:
        result = targetChannel.ownerId;
        break;
      case 9:
        result = targetChannel.messageCount;
        break;
      case 10:
        result = targetChannel.memberCount;
        break;
      case 11:
        result = targetChannel.rateLimitPerUser;
        break;
      case 12:
        result = targetChannel.autoArchiveDuration;
        break;
      case 13:
        result = targetChannel.parentId;
        break;
      case 14:
        result = targetChannel.guildId;
        break;
      case 15:
      result = targetChannel.lastMessageId
        break;
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const storageVarName = this.evalMessage(data.storageVarName, cache);
      this.storeValue(result, storage, storageVarName, cache);
    }

    this.callNextAction(cache);
  },


  mod() {},
};
