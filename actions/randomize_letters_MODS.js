module.exports = {
  name: 'Randomize Letters MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    return `Gerar ${data.wordLength} caracteres`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Texto'];
  },

  fields: [
    'wordLength',
    'maiusculas',
    'minusculas',
    'numeros',
    'caracteresEspeciais',
    'storage',
    'varName'
  ],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
      

    <span class="dbminputlabel">Quantidade de caracteres</span>
    <input id="wordLength" class="round" type="text">

    <br>

    <table>
      <tr>
        <td><dbm-checkbox id="maiusculas" label="Letras maiúsculas"></dbm-checkbox></td>
        <td><dbm-checkbox id="minusculas" label="Letras minúsculas "></dbm-checkbox></td>
        <td><dbm-checkbox id="numeros" label="Números"></dbm-checkbox></td>
      </tr>
      <tr>
        <td><br><dbm-checkbox id="caracteresEspeciais" label="Caracteres especiais"></dbm-checkbox></td>
      </tr>
    </table>

    <br>

  <div style="float: left; width: 35%; padding-top: 8px;">
    <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
    <span class="dbminputlabel">Nome da variável</span><br>
    <input id="varName" class="round" type="text">
  </div>

  <br><br><br><br>

  <div id="commentSection" style="padding-top: 8px;">
    <p>
    <b>Opções:</b><br>
    Letras minúsculas: abcdefghijklmnopqrstuvwxyz<br>
    Letras maiúsculas: ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
    Números: 0123456789<br>
    Caracteres especiais: ~!@#$%¨&*_´\`~^;:.,|\\/<br>
    </p>
  </div>
`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const wordLength = this.evalMessage(data.wordLength, cache);

    if(!wordLength) {
      this.displayError(data, cache, "Especifique a quantidade de caracteres");
      return this.callNextAction(cache);
    }

    let caracs = "";

    if(data.maiusculas) {
      caracs += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(data.minusculas) {
      caracs += "abcdefghijklmnopqrstuvwxyz";
    }

    if(data.numeros) {
      caracs += "0123456789";
    }

    if(data.caracteresEspeciais) {
      caracs += "~!@#$%¨&*_´`~^;:.,|\\/'\"";
    }

    if(!caracs) {
      this.displayError(data, cache, "Informe ao menos uma opção de caracteres!");
      return this.callNextAction(cache);
    } else {
      caracs = caracs.split("");
    }

    let random = "";

    for(var i = 0; i < parseInt(wordLength); i++) {
      let n = Math.abs(parseInt(Math.random() * caracs.length));
      random += caracs[n];
    }

    let result = random;

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    this.storeValue(result, storage, varName, cache);
    this.callNextAction(cache);
  },

  mod() {},
};
