module.exports = {

  name: "Store Voice Channel Info MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },


  subtitle(data, presets) {
    if(data.descriptionx == true){
      desccor = data.descriptioncolor
      } else {
        desccor = 'none'
      }

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
        "Região definida no canal de voz",
      ];

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${presets.getVoiceChannelText(data.channel, data.varName)} - ${info[parseInt(data.info, 10)]}</font>`
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Desconhecido";
    switch (info) {
      case 0:
        dataType = "Objeto";
        break;
      case 1:
        dataType = "ID";
        break;
      case 2:
        dataType = "Texto";
        break;
      case 3:
      case 4:
      case 5:
        dataType = "Número";
        break;
      case 6:
        dataType = "Lista";
          break;
      case 7:
          dataType = "Número";
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
          dataType = "Data";
                    break;
      case 12:
          dataType = "Timestamp";
                      break;
      case 13:
          dataType = "Texto";
                        break;
      case 14:
          dataType = "Lista";
                          break;
                          case 15:
                            dataType = "Número";
                            break;
    }
    return [data.varName2, dataType];
  },


  fields: ["channel", "varName", "info", "storage", "varName2","descriptioncolor","description","descriptionx"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.6</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

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
    <option value="15">Região definida do canal de voz</option>
	</select>
</div>

<br>

<store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer2" variableInputId="varName2"></store-in-variable>

</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`;
  },


  init() {
    const { glob, document } = this;

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
        case 15:
          result = targetChannel.rtcRegion;
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
