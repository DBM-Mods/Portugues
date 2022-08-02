module.exports = {
  name: "Store Channel Info MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle(data, presets) {
    const info = [
      "Objeto do Canal",
      "ID do canal",
      "Nome do canal",
      "Tópico do canal",
      "Última mensagem do canal",
      "Posição do canal",
      "O canal é NSFW?",
      "É uma mensagem direta?",
      "O canal pode ser excluído?",
      "Data da criação do canal",
      "ID da categoria do canal",
      "Nome da categoria do canal",
      "Timestamp da criação do canal",
      "É um canal de texto?",
      "É um canal de voz?",
      "É uma categoria?",
      "È um canal de noticias?",
      "É um canal de Palco?",
      "Tipo de canal",
      "Permissões de usuários do canal [Modo Texto]",
      "Permissões de cargos do canal [Modo Texto]",
      "Permissões de usuários do canal [Modo Object]",
      "Permissões de cargos do canal [Modo Object]",
      "Permissões de usuários do canal [Modo Lista]",
      "Permissões de cargos do canal [Modo Lista]",
      "Modo lento do canal [segundos]",
      "Tópicos do canal [Modo Lista com Object]",
    ];
    return `${presets.getChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}`;
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
        dataType = "Texto";
        break;
        case 4:
          dataType = "Texto";
          break;
      case 5:
        dataType = "Numero";
        break;
        case 6:
          dataType = "true/false";
          break;
          case 7:
            dataType = "true/false";
            break;
      case 8:
        dataType = "true/false";
        break;
        case 9:
          dataType = "Data";
          break;
      case 10:
        dataType = "Numero";
        break;
      case 11:
        dataType = "Texto";
        break;
      case 12:
        dataType = "Timestamp";
        break;
        case 13:
          dataType = "true/false";
          break;
          case 14:
            dataType = "true/false";
            break;
            case 15:
              dataType = "true/false";
              break;
              case 16:
                dataType = "true/false";
                break;
                case 17:
                  dataType = "true/false";
                  break;
                  case 18:
                    dataType = "Texto";
                    break;
                    case 19:
                      dataType = "Texto";
                      break;
                      case 20:
                        dataType = "Texto";
                        break;
                        case 21:
                          dataType = "Objeto";
                          break;
                          case 22:
                            dataType = "Objeto";
                            break;
                            case 23:
                              dataType = "Lista";
                              break;
                              case 24:
                                dataType = "Lista";
                                break;
                                case 25:
                                  dataType = "Numero";
                                  break;
                                  case 26:
                                    dataType = "Lista/Objeto";
                                    break;
    }
    return [data.varName2, dataType];
  },

  fields: ["channel", "varName", "info", "storage", "varName2"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<channel-input dropdownLabel="Source Channel" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Source Info</span><br>
	<select id="info" class="round">
  <optgroup label="Informações do Canal">
  <option value="0" selecionado>Objeto do canal</option>
  <option value="1">ID do canal</option>
  <option value="2">Nome do canal</option>
  <option value="3">Tópico do canal</option>
  <option value="4">Última mensagem do canal</option>
  <option value="5">Posição do canal</option>
  <option value="9">Data da criação do canal</option>
  <option value="12">Timestamp da criação do canal</option>
  <option value="18">Tipo de canal</option>
  <option value="25">Modo lento do canal [segundos]</option>
  <option value="26">Tópicos abertos do canal [Modo Lista com Object]</option>
  </optgroup>
  <optgroup label="Categoria do Canal">
  <option value="10">ID da categoria do canal</option>
  <option value="11">Nome da categoria do canal</option>
  </optgroup>
  <optgroup label="true/false">
  <option value="6">O canal é NSFW?</option>
  <option value="7">É uma mensagem direta?</option>
  <option value="8">O canal pode ser excluído?</option>
  <option value="13">É um canal de texto?</option>
  <option value="14">É um canal de voz?</option>
  <option value="15">É uma categoria?</option>
  <option value="16">È um canal de noticias?</option>
  <option value="17">É um canal de Palco?</option>
  </optgroup>
  <optgroup label="Permissões do Canal">
  <option value="19">Permissões de usuários do canal [Modo Texto]</option>
  <option value="20">Permissões de cargos do canal [Modo Texto]</option>
  <option value="21">Permissões de usuários do canal [Modo Object]</option>
  <option value="22">Permissões de cargos do canal [Modo Object]</option>
  <option value="23">Permissões de usuários do canal [Modo Lista]</option>
  <option value="24">Permissões de cargos do canal [Modo Lista]</option>
  </optgroup>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const DiscordJS = this.getDBM().DiscordJS;

    const targetChannel = await this.getChannelFromData(data.channel, data.varName, cache);

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
        result = targetChannel.topic;
        break;
      case 4:
        result = targetChannel.lastMessage;
        break;
      case 5:
        result = targetChannel.position;
        break;
      case 6:
        result = targetChannel.nsfw;
        break;
      case 7:
        result = targetChannel.type === "DM";
        break;
      case 8:
        result = targetChannel.deletable;
        break;
      case 9:
        result = targetChannel.createdAt;
        break;
      case 10:
        result = targetChannel.parentId;
        break;
      case 11:
        result = targetChannel.parent;
        break;
      case 12:
        result = targetChannel.createdTimestamp;
        break;
      case 13:
        result = targetChannel instanceof DiscordJS.TextChannel;
        break;
      case 14:
        result = targetChannel instanceof DiscordJS.VoiceChannel;
        break;
      case 15:
        result = targetChannel instanceof DiscordJS.CategoryChannel;
        break;
      case 16:
        result = targetChannel instanceof DiscordJS.NewsChannel;
        break;
      case 17: 
        result = targetChannel instanceof DiscordJS.StoreChannel;
        break
      case 18:
        result = targetChannel.type;
        break;
      case 19:
        result = await targetChannel.permissionOverwrites.cache.filter(p => p.type=='member').map(p => `**Usuário**: <@${p.id}>\n • Habilitado: ${p.allow.toArray().length>=1?p.allow.toArray():'Nada'}\n • Desabilitado: ${p.deny.toArray().length>=1?p.deny.toArray():'Nada'}`).join('\n\n');
        break;
       case 20:
        result = await targetChannel.permissionOverwrites.cache.filter(p => p.type=='role').map(p => `**Cargo**: <@&${p.id}>\n • Habilitado: ${p.allow.toArray().length>=1?p.allow.toArray():'Nada'}\n • Desabilitado: ${p.deny.toArray().length>=1?p.deny.toArray():'Nada'}`).join('\n\n');
        break;
      case 21:
        result = await targetChannel.permissionOverwrites.cache;
        break;
      case 22:
        result = await targetChannel.permissionOverwrites.cache;
        break;
      case 23:
        result = await targetChannel.permissionOverwrites.cache.filter(p => p.type=='member').map(p => `**Usuário**: <@${p.id}>\n • Habilitado: ${p.allow.toArray().length>=1?p.allow.toArray():'Nada'}\n • Desabilitado: ${p.deny.toArray().length>=1?p.deny.toArray():'Nada'}`);
        break;
      case 24:
       result = await targetChannel.permissionOverwrites.cache.filter(p => p.type=='role').map(p => `**Cargo**: <@&${p.id}>\n • Habilitado: ${p.allow.toArray().length>=1?p.allow.toArray():'Nada'}\n • Desabilitado: ${p.deny.toArray().length>=1?p.deny.toArray():'Nada'}`);
       break;
       case 25:
       result = targetChannel.rateLimitPerUser;
       break;
       case 26:
      result = targetChannel.threads.cache.filter(p => p).map(p => p);
        break;
      default:
        break;
    }
    /* Copyright XinXyla#0001 - Replicating to another GitHub is not allowed */
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
