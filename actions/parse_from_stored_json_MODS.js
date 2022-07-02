module.exports = {
  name: 'Parse From Stored Json MOD',
  section: 'JSON Things',
  meta: {
    version: '2.1.5',
    preciseCheck: false,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    return `${data.varName}`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    if (varType === 'object') return [data.varName, 'JSON Object'];
    return [data.varName, `JSON ${varType} Value`];
  },

  fields: ['debugMode', 'behavior', 'varStorage', 'jsonObjectVarName', 'path', 'storage', 'varName'],

  html(_isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<div style="margin: 0; overflow-y: none;">
    <div style="width: 100%;">
        <div style="float: left; width: 38%;">
              <span class="dbminputlabel">Variável</span><br>
              <select id="varStorage" class="round" onchange="glob.refreshVariableList(this)">
                  ${data.variables[1]}
              </select>
        </div>
        <div id="jsonObjectVarNameContainer" style="float: right; width: 59%;">
            <span class="dbminputlabel">Nome da variável</span><br>
            <input id="jsonObjectVarName" class="round" type="text" list="variableList">
        </div><br><br><br>
        <div id="pathContainer" style="padding-top: 8px;">
            <span class="dbminputlabel">JSON Path: (suporta o uso de <a href="http://goessner.net/articles/JsonPath/index.html#e2" target="_blank">JSON Path (Regex)</a>)</span><br>
            <input id="path" class="round" ;" type="text"><br>
        </div>
    </div>
    <div style="width: 100%;">
        <div style="float: left; width: 38%;">
            <label for="storage">
                <font color="white"><span class="dbminputlabel">Armazenar em:</span></font>
            </label>
            <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
                ${data.variables[1]}
            </select>
        </div>
        <div id="varNameContainer" style="margin-left: 10px; float: left; width: 59%;">
            <label for="varName">
                <font color="white"><span class="dbminputlabel">Nome da variável</span></font>
            </label>
            <input id="varName" class="round" type="text">
        </div>
    </div>
    <div style="width:100%">
        <div style="float: left;width: 48%">
            <br>
            <label for="behavior">
                <font color="white"><span class="dbminputlabel">Continuar sequência de ações</span></font>
            </label>
            <select id="behavior" class="round" ;>
                <option value="0" selected>Sim</option>
                <option value="1">Não</option>
            </select>
        </div>
        <div style="float: left; margin-left: 10px; width: 48%;">
            <br>
            <label for="debugMode">
                <font color="white"><span class="dbminputlabel">Modo de depuração</span></font>
            </label>
            <select id="debugMode" class="round">
                <option value="0" selected>Desabilitado</option>
                <option value="1">Habilitado</option>
            </select>
        </div>
    </div>
</div>
`;
  },

  init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    glob.refreshVariableList(document.getElementById('storage'));
  },

  async action(cache) {
    const Mods = this.getMods();
    const data = cache.actions[cache.index];
    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage, 10);
    const type = parseInt(data.varStorage, 10);
    const jsonObjectVarName = this.evalMessage(data.jsonObjectVarName, cache);
    const path = this.evalMessage(data.path, cache);
    const jsonRaw = this.getVariable(type, jsonObjectVarName, cache);
    const DEBUG = parseInt(data.debugMode, 10);

    let jsonData = jsonRaw;
    if (typeof jsonRaw !== 'object') {
      jsonData = JSON.parse(jsonRaw);
    }

    try {
      if (path && jsonData) {
        let outData = Mods.jsonPath(jsonData, path);

        if (outData === false) {
          outData = Mods.jsonPath(jsonData, `$.${path}`);
        }

        if (outData === false) {
          outData = Mods.jsonPath(jsonData, `$..${path}`);
        }

        if (DEBUG) console.log(outData);

        try {
          JSON.parse(JSON.stringify(outData));
        } catch (error) {
          const errorJson = JSON.stringify({ error, success: false });
          this.storeValue(errorJson, storage, varName, cache);
          console.error(error.stack ? error.stack : error);
        }

        const outValue = JSON.stringify(outData);

        if (outData.success === null || outValue.success === null) {
          const errorJson = JSON.stringify({
            error: 'error',
            statusCode: 0,
            success: false,
          });
          this.storeValue(errorJson, storage, varName, cache);
          console.log(`1: WebAPI Parser: Error Invalid JSON, is the Path set correctly? [${path}]`);
        } else if (!outValue || outValue.success === null) {
          const errorJson = JSON.stringify({
            error: 'error',
            statusCode: 0,
            success: false,
          });
          this.storeValue(errorJson, storage, varName, cache);
          console.log(`2: WebAPI Parser: Error Invalid JSON, is the Path set correctly? [${path}]`);
        } else {
          this.storeValue(outValue, storage, varName, cache);
          if (DEBUG) {
            console.log(`WebAPI Parser: Armazenando os valores de [${path}] para: [${varName}]`);
          }
        }
      }
    } catch (error) {
      const errorJson = JSON.stringify({
        error,
        statusCode: 0,
        success: false,
      });
      this.storeValue(errorJson, storage, varName, cache);
      console.error(`WebAPI Parser: Error: ${errorJson} stored to: [${varName}]`);
    }

    if (data.behavior === '0') {
      this.callNextAction(cache);
    } else {
      this.endActions(cache);
    }
  },

  mod() {},
};
