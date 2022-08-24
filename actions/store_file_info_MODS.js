module.exports = {
  name: 'Store File Info MOD',
  section: 'File Stuff',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const info = [
      'Tamanho do arquivo (bytes)',
      'Formato do arquivo',
      'Contagem de caracteres do arquivo',
      'Timestamp da última modificação do arquivo',
      'Data da última modificação do arquivo',
      'O arquivo existe?<',
      'Conteúdo do arquivo',
      'Nome do arquivo',
      'Timestamp da criação do arquivo',
      'Data da criação do arquivo',
    ];
    const storage = ['', 'Variavel Temporária', 'Variavel Servidor', 'Variavel Global'];
    return `${info[parseInt(data.info, 10)]} - ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  fields: ['filePath', 'info', 'storage', 'varName'],

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    let dataType = 'Unknown type';
    switch (data.info) {
      case 0:
        dataType = 'Numero';
        break;
      case 1:
        dataType = 'Texto';
        break;
      case 2:
        dataType = 'Numero';
        break;
      case 3:
        dataType = 'Timestamp';
        break;
        case 4:
          dataType = 'Data';
        break;
      case 5:
        dataType = 'true/false';
        break;
      case 6:
        dataType = 'Texto';
        break;
      case 7:
        dataType = 'Texto';
        break;
      case 8:
        dataType = 'Timestamp';
        break;
      case 9:
        dataType = 'Data';
        break;
    }
    return [data.varName, dataType];
  },

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<span class="dbminputlabel">Local do Arquivo</span><br>
<input class='round' id='filePath' placeholder='./resources/teste.txt' /><br>

<span class="dbminputlabel">informação</span>
<select class='round' id='info'>
  <option value='0'>Tamanho do arquivo (bytes)</option>
  <option value='1'>Formato do arquivo</option>
  <option value='2'>Contagem de caracteres do arquivo</option>
  <option value='3'>Timestamp da última modificação do arquivo</option>
  <option value='4'>Data da última modificação do arquivo</option>
  <option value='5'>O arquivo existe?</option>
  <option value='6'>Conteúdo do arquivo</option>
  <option value='7'>Nome do arquivo</option>
  <option value='8'>Timestamp da criação do arquivo</option>
  <option value='9'>Data da criação do arquivo</option>
</select><br>
<table>
<tr>
<td class="sep1"><span class="dbminputlabel">Armazenar em</span><br>
<select id="storage" class="round">
  ${data.variables[1]}
</select></td>
<td class="sep2"><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName" class="round" type="text"></td>
</tr>

</table>
<style>
table{width:100%}
.sep1{padding:0px 8px 0px 0px}
.sep2{padding:0px 0px 0px 0px}
</style>`;
  },

  init() {},

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const info = parseInt(data.info, 10);
    const path = require('path');
    const fs = require('fs');
    const varName = this.evalMessage(data.varName, cache);
    const filePath = this.evalMessage(data.filePath, cache);

    if (!filePath) return this.displayError('Insert a file path!');

    let result;
    switch (info) {
      case 0:
        result = fs.statSync(filePath).size;
        break;
      case 1:
        result = path.extname(/[^/]*$/.exec(filePath)[0]);
        break;
      case 2:
        result = fs.readFileSync(filePath).toString().length;
        break;
      case 3:
        result = Math.round(fs.statSync(filePath).mtimeMs / 1000);
        break;
      case 4:
        result = fs.statSync(filePath).mtime;
        break;
      case 5:
        result = fs.existsSync(filePath);
        break;
      case 6:
        result = fs.readFileSync(filePath).toString();
        break;
      case 7:
        result = path.basename(filePath);
        break;
      case 8:
        result = Math.round(fs.statSync(filePath).birthtimeMs / 1000);
        break;
      case 9:
        result = fs.statSync(filePath).birthtime;
        break;
    }
    this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
