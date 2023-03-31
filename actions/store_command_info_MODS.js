module.exports = {
  name: 'Store Command Info MOD',
  section: 'Bot Client Control',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle(data) {
    const info = [
      'Nome do Comando',
      'ID do comando',
      'Tipo de Comando',
      'Restrição do Comando',
      'Permissão primária requerida',
      'Aliases do Comando',
      'Restrição de tempo do comando',
      'Quantidade de actions do comando',
      'Permissão secundaria requerida',
      'Descrição do comando',
      'Parametros do comando',
    ];
    const storage = ['', 'Temp Variable', 'Server Variable', 'Global Variable'];
    return `${info[parseInt(data.info, 10)]} - ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown Type';
    switch (parseInt(data.info, 10)) {
      case 0:
        dataType = 'Text';
        break;
      case 1:
        dataType = 'Text';
        break;
      case 2:
        dataType = 'Text';
        break;
      case 3:
        dataType = 'Text';
        break;
      case 4:
        dataType = 'Text';
        break;
      case 5:
        dataType = 'List';
        break;
      case 6:
        dataType = 'Number';
        break;
      case 7:
        dataType = 'Number';
        break;
        case 8:
        dataType = 'Number';
        break;
        case 9:
          dataType = 'Text';
          break;
          case 10:
            dataType = 'List';
            break;
        break;
      default:
        break;
    }
    return [data.varName, dataType];
  },

  fields: ['searchCommandBy', 'valueToSearch', 'info', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<div style="float: left; width: 44%">
<span class="dbminputlabel">Buscar comando</span><br>
  <select id="searchCommandBy" class="round" onchange="glob.onChangeSame(this)">
  <option value="2" selected>Mesmo comando por texto</option>
  <option value="3">Mesmo comando de interação</option>
    <option value="0">Nome</option>
    <option value="1">ID</option>
  </select>
</div>
<div id="vtsContainer" style="display: none; float: right; width: 55%">
<span class="dbminputlabel">Pesquisar</span><br>
  <input id="valueToSearch" type="text" class="round">
</div><br><br><br>
<div style="float: left; width: 100%; padding-top: 8px">
<span class="dbminputlabel">Informação</span><br>
  <select id="info" class="round">
  <option value="0" selecionado>Nome do comando</option>
  <option value="1">ID do comando</option>
  <option value="2">Tipo de comando</option>
  <option value="3">Restrição do Comando</option>
  <option value="4">Permissão primária requerida</option>
  <option value="8">Permissão secundária requerida</option>
  <option value="5">Aliases do Comando</option>
  <option value="6">Restrição de tempo do comando</option>
  <option value="7">Quantidade de actions do comando</option>
  <option value="9">Descrição do comando</option>
  <option value="10">Parametros do comando</option>
  </select>
</div><br><br><br>
<div style="float: left; width: 35%; padding-top: 12px">
<span class="dbminputlabel">Armazenar em</span><br>
  <select id="storage" class="round">
    ${data.variables[1]}
  </select>
</div>
<div id="varNameContainer" style="float: right; width: 60%; padding-top: 12px">
<span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="varName" class="round" type="text">
</div>`;
  },

  init() {
    const { glob, document } = this;

    glob.onChangeSame = function onChangeSame(searchCommandBy) {
      if (parseInt(searchCommandBy.value, 10) === 2 || parseInt(searchCommandBy.value, 10) === 3) {
        document.getElementById('vtsContainer').style.display = 'none';
      } else {
        document.getElementById('vtsContainer').style.display = null;
      }
    };

    glob.onChangeSame(document.getElementById('searchCommandBy'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const jp = this.getMods().require('jsonpath');
    var interaction = cache.interaction;

    if(parseInt(data.searchCommandBy, 10) === 0){
    command = jp.query(this.getDBM().Files.data.commands,
            `$..[?(@.name=="${this.evalMessage(data.valueToSearch, cache)}")]`,)
    }

    if(parseInt(data.searchCommandBy, 10) === 1){
      command = jp.query(this.getDBM().Files.data.commands, `$..[?(@._id=="${this.evalMessage(data.valueToSearch, cache)}")]`)
      }

      if(parseInt(data.searchCommandBy, 10) === 2){
        command = jp.query(
          this.getDBM().Files.data.commands,
          `$..[?(@.name=="${cache.msg.content
            .slice(this.getDBM().Files.data.settings.tag.length || cache.server.tag.length)
            .split(/ +/)
            .shift()}")]`,
        )
        }

        if(parseInt(data.searchCommandBy, 10) === 3){
         command = jp.query(
            this.getDBM().Files.data.commands,
            `$..[?(@.name=="${interaction.commandName}")]`,
          );
          }

 

    let result;
    switch (parseInt(data.info, 10)) {
      case 0:
 if(parseInt(data.searchCommandBy, 10) === 2){
          result = cache.msg.content
              .slice(this.getDBM().Files.data.settings.tag.length || cache.server.tag.length)
              .split(/ +/)
              .shift()
          } else {
            result =
            jp.query(command, '$..name').length > 1 ? jp.query(command, '$..name')[0] : jp.query(command, '$..name'); }
        break;
      case 1:
        result = jp.query(command, '$.._id');
        break;
      case 2:
        if(jp.query(command, '$..comType') == "0"){ result = "Comando por texto" }
        if(jp.query(command, '$..comType') == "1"){ result = "Inclui a palavra na mensagem" }
        if(jp.query(command, '$..comType') == "2"){ result = "Expressão regular" }
        if(jp.query(command, '$..comType') == "3"){ result = "Qualquer mensagem" }
        if(jp.query(command, '$..comType') == "4"){ result = "Comando de barra" }
        if(jp.query(command, '$..comType') == "5"){ result = "Menu de comando do usuário" }
        if(jp.query(command, '$..comType') == "6"){ result = "Menu de comando da mensagem" }
        break;
      case 3:
        if(jp.query(command, '$..restriction') == "0"){ result = "Nenhuma" }
        if(jp.query(command, '$..restriction') == "1"){ result = "Somente no servidor" }
        if(jp.query(command, '$..restriction') == "2"){ result = "Somente o dono do servidor" }
        if(jp.query(command, '$..restriction') == "3"){ result = "Somente mensagens diretas" }
        if(jp.query(command, '$..restriction') == "4"){ result = "Somente o dono do bot" }
        break;
      case 4:
        result = JSON.stringify(jp.query(command, '$..permissions')).slice(2, -2).replace('_', ' ').toLowerCase();
        break;
      case 5:
        result = jp.query(command, '$.._aliases') === '' ? 'none' : jp.query(command, '$.._aliases');
        break;
      case 6:
        result =
          jp.query(command, '$.._timeRestriction') === ''
            ? 'none'
            : parseInt(jp.query(command, '$.._timeRestriction'), 10);
        break;
      case 7:
        result =
          parseInt(jp.query(command, '$..name').length, 10) - 1 === ''
            ? 'none'
            : parseInt(jp.query(command, '$..name').length, 10) - 1;
        break;
        case 8:
          result = JSON.stringify(jp.query(command, '$..permissions2')).slice(2, -2).replace('_', ' ').toLowerCase();
          break;
          case 9:
            desc = jp.query(command, '$..description')
            result = desc[0];
            break;
            case 10:
              result = jp.query(command, '$..parameters');
              break;
      default:
        break;
    }

    if (!result) result = 'invalido';

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },
  mod() {},
};
