module.exports = {
  name: 'Convert Text to List MOD',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const storeTypes = ['', 'Temp Variable', 'Server Variable', 'Global Variable', 'Command Params'];
    return `Convert Text ${storeTypes[parseInt(data.storage, 10)]} (${data.varName}) to List ${
      storeTypes[parseInt(data.storage2, 10)]
    } (${data.varName2})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'List'];
  },

  fields: ['storage', 'varName', 'separator', 'storage2', 'varName2'],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
<retrieve-from-variable allowSlashParams dropdownLabel="Variavel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
</div><br><br><br>
<div style="display: table; width: 105%;">
  <div style="display: table-cell;">
  <span class="dbminputlabel">Separador</span>
    <input id="separator" class="round" type="text">
  </div>
</div><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em:</span><br>
    <select id="storage2" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName2" class="round" type="text">
  </div>
</div>`;
  },

  init() {
    const { glob, document } = this;
    glob.refreshVariableList(document.getElementById('storage'));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const text = this.getVariable(storage, varName, cache);
    const separator = this.evalMessage(data.separator, cache);
    const params = text.toString().split(new RegExp(separator));

    const storage2 = parseInt(data.storage2, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(params, storage2, varName2, cache);

    this.callNextAction(cache);
  },

  mod() {},
};
