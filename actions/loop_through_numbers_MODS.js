module.exports = {
  name: "Loop Through Numbers MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : Math.abs(parseInt(data.increment, 10)) === 1
        ? `<font style="color:${desccor}">Chamar ${data.actions?.length ?? 0} actions ${isNaN(Math.abs(data.endNum - data.startNum) + 1) ? "pelo número de vezes de ( " + data.endNum + " )"  : Math.abs(data.endNum - data.startNum) + 1 + " vezes"}</font>`
        : `<font style="color:${desccor}">Chamar ${data.actions?.length ?? 0} actions enquanto conta por ${data.increment}, de ${data.startNum} para ${data.endNum}.</font>`;
  },


  fields: ["startNum", "endNum", "endNum2", "increment", "tempVarName", "stop", "type", "descriptioncolor", "description", "descriptionx", "actions"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

<tab-system>
  <tab label="Actions" icon="align right">

  <action-list-input id="actions" height="calc(100vh - 240px)">

  </tab>

  <tab label="Loop Options" icon="cogs">
  <div style="width: 100%; padding:8px;height: calc(100vh - 200px);overflow:auto">
  <table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
<br>

  <div style="display: flex; justify-content: space-between;">
    <div style="width: calc(50% - 8px);">
      <span class="dbminputlabel">Número inicial</span><br>
      <input id="startNum" class="round" type="text" value="0">
    </div>

    <div style="width: calc(50% - 8px);">
      <span class="dbminputlabel">Adicionar número</span><br>
      <input id="increment" class="round" type="text" value="1">
    </div>
  </div>

  <br>

  <div style="display: flex; justify-content: space-between;">
  <div style="width: calc(50% - 8px);">
  <span class="dbminputlabel">Parar se o nº for igual ou maior que</span><br>
  <input id="endNum" class="round" type="text" value="9">
</div>

<div style="width: calc(50% - 8px);">
<span class="dbminputlabel">Parar se o nº for igual ou maior que</span><br>
<input id="endNum2" class="round" type="text" placeholder="Deixe em branco para desabilitar" value="">
</div>
</div>
  <br>
  <span class="dbminputlabel">Parar loop se o campo abaixo possuir a informação stop</span><br>
  <input id="stop" class="round" type="text" placeholder="Deixe em branco para desabilitar" value="">
  <br>

      <div style="">
        <div style="width: 100%;">
          <span class="dbminputlabel">Nome Temp Var. (Armazenar número)</span><br>
          <input id="tempVarName" class="round" type="text" placeholder="Deixe em branco para não usar">
        </div>
<br>
        <div style="width: 100%">
          <span class="dbminputlabel">Tipo de chamada</span><br>
          <select id="type" class="round">
            <option value="true" selected>Esperar completar o loop</option>
            <option value="false">Continuar executando as ações & executar o loop ao mesmo tempo</option>
          </select>
        </div>
      </div>
    </div>
  </tab>
</tab-system>

  <script class="setupTempVars">
    const elem = document.getElementById("tempVarName");
    if(elem?.value) {
      tempVars.push([elem.value, "Number"]);
    }
  </script>
</action-list-input>

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

  action(cache) {
    const data = cache.actions[cache.index];

    const actions = data.actions;
    if (!actions || actions.length <= 0) {
      this.callNextAction(cache);
      return;
    }

    const startNumText = this.evalMessage(data.startNum, cache);
    const endNumText = this.evalMessage(data.endNum, cache);
    const incrementText = this.evalMessage(data.increment, cache);
    let startNum = parseInt(startNumText);
    let endNum = parseInt(endNumText);

    const endNumText2 = this.evalMessage(data.endNum2, cache);

    if (endNumText2 == "") {
      var endNum2 = endNum
    } else {
     var endNum2 = parseInt(endNumText2);
    }

    let increment = parseInt(incrementText);

    let valid = isNaN(startNum) ? 1 : (isNaN(endNum) ? 2 : (isNaN(increment) ? 3 : 0));
    if (valid === 0) {
      if (increment === 0) {
        valid = 4;
      } else if (increment > 0 && startNum > endNum) {
        valid = 5;
      } else if (increment < 0 && startNum < endNum) {
        valid = 6;
      }
    }

    switch (valid) {
      case 1: { this.displayError(data, cache, `Start Number (${startNumText}) is not a valid number.`); break; }
      case 2: { this.displayError(data, cache, `End Number (${endNumText}) is not a valid number.`); break; }
      case 3: { this.displayError(data, cache, `Increment (${incrementText}) is not a valid number.`); break; }
      case 4: { this.displayError(data, cache, `Increment cannot be 0.`); break; }
      case 5:
      case 6: { this.displayError(data, cache, `Increment detected to cause infinite loop.`); break; }
    }

    if (valid !== 0) {
      this.callNextAction(cache);
      return;
    }

    const waitForCompletion = data.type === "true";

    var stop = false

    const looper = (i) => {
      if(this.evalMessage(data.stop, cache) == "stop"){stop = true}
      if ((startNum !== endNum || startNum !== endNum2) && (stop == false)) {
        if ((startNum < endNum && i > endNum) || (startNum > endNum && i < endNum) || (startNum < endNum2 && i > endNum2) || (startNum > endNum2 && i < endNum2)) {
          if (waitForCompletion) {
            this.callNextAction(cache);
          }
          return;
        }

        this.storeValue(i, 1, data.tempVarName, cache);
        this.executeSubActions(actions, cache, () => looper(i + increment));
      } else {
        this.storeValue(i, 1, data.tempVarName, cache);
        this.callNextAction(cache);
      }
    };

    looper(startNum);

    if (!waitForCompletion) {
      this.callNextAction(cache);
    }
  },

  modInit(data) {
    this.prepareActions(data.actions);
  },

  mod() { },
};
