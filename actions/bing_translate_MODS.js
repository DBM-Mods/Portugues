module.exports = {
  name: "Bing translate MOD",
  section: "Translate",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[lik_rus - 866884416151355392]<br>[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Traduzir texto para: ${data.to}</font>`
  },

  variableStorage(data, varType) {
    let vars = [];

    for (var i = 0; i < data.branches.length; i++) {
      const type = parseInt(data.branches[i].storage, 10);
      const varName = data.branches[i].varName;

      if (type == varType && varName) {
        let tipo;

        switch (parseInt(data.branches[i].info)) {
          case 0:
            tipo = "Texto";
            break;
          case 1:
            tipo = "Texto";
            break;
          case 2:
            tipo = "Texto";
            break;
          case 3:
            tipo = "Texto";
            break;
        }

        vars.push(varName);
        vars.push(tipo);
      }
    }

    if (vars.length > 0) {
      return vars;
    }
  },

  fields: ["varName", "branches", "description", "descriptionx", "descriptioncolor", "message", "from", "to", "errcmd", "iffalse", "iffalseVal", "storageError", "varNameError", "actionsError"],

  html(isEvent, data) {
    return `
      <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
      <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

<div style="width: 100%; padding:0px 5px;height: calc(100vh - 160px);overflow:auto">

<tab-system>
<tab label="Texto" icon="cloud download">
<div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

<textarea id="message" class="dbm_monospace" rows="6" placeholder="Insira o texto aqui..." style="height: calc(100vh - 320px); white-space: nowrap;"></textarea>
<xinspace>
<div id="contador" style="float:right;text-align:right;position:relative;width:22%">0 caracteres</div>

<br>

<table style="width: 100%;">
<td>
  <span class="dbminputlabel">Traduzir de</span>
  <input id="from" placeholder="Vazio para detecção automática" class="round" type="text">
</td>
<td style="padding-left: 18px;">
  <span class="dbminputlabel">Para</span>
  <input id="to" placeholder="en" value="en" class="round" type="text">
</td>
</table>

</div>

</dialog-list>

</tab>

<tab label="Armazenar" icon="save">
<div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

<dialog-list id="branches" fields='["info", "storage", "varName"]' dialogResizable dialogTitle="Armazenar" dialogWidth="600" dialogHeight="200" listLabel="Lista" listStyle="height: calc(100vh - 280px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
      
  <div style="margin: 10px;">

      <span class="dbminputlabel">Informação</span>
      <select id="info" class="round">
        <optgroup label="Texto">
          <option value="0">Texto traduzido</option>
          <option value="1">Texto original</option>
        </optgroup>
        <optgroup label="Lingua">
            <option value="2">Traduzido do idioma</option>
            <option value="3">Traduzido para o idioma</option>
      </select>

      <br>

      <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Armazenar em</span>
          <select id="storage" class="round">
              ${data.variables[1]}
          </select>
      </div>

      <div style="float: right; width: 60%;">
          <span class="dbminputlabel">Nome da Variável</span>
          <input id="varName" class="round" type="text">
      </div>

      </div>
      </dialog-list>
    
      </div>
</tab>

<tab label="Configuração" icon="settings">
<div style="padding:8px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>

<br>

<span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
<dbm-checkbox id="errcmd" label="Mostrar erro no console log" checked></dbm-checkbox>
</div>
</table>

<br>

<div id="divValueError">
<div style="float: left; width: 35%;">
<span class="dbminputlabel">Armazenar erro em</span>
<select id="storageError" class="round" onchange="glob.variableChangeError(this, 'varNameContainer')">
${data.variables[0]}
</select>
</div>

<div id="varNameContainerError" style="float: right; display: none; width: 60%;">
<span class="dbminputlabel">Nome da Variável</span>
<input id="varNameError" class="round" type="text">
</div>


</div>

<br><br><br>

<div style="overflow:hidden;padding:4px 0px 0px 0px">
<div style="float: left; width: 38%" id="xinext">
<span class="dbminputlabel">Se ocorrer um erro</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0" selected>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
<option value="5">Realizar ações e parar</option>
<option value="6">Realizar ações e continuar</option>
</select>
</div>

<div id="iffalseContainer" style="display: none; float: right; width: 60%;">
<div id="xincontrol"><span id="xinelas" class="dbminputlabel">Para</span><br>
<input id="iffalseVal" class="round" name="actionxinxyla" type="text">
</div>
</div>

<div id="containerxin" style="width:100%;overflow:hidden">
<br>
<action-list-input id="actionsError" min-height="100" height="calc(100vh - 350px)"></action-list-input>
</div>

</div>
</div>
</tab>
</tab-system>

<style>

table{width:100%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
xinspace{margin:10px 0px 0px 0px;display:block}
</style>
`;
  },
  init() {

    const { glob, document } = this;

    const textarea = document.getElementById('message');
    const contador = document.getElementById('contador');
    const comprimentoTexto = textarea.value.length;
    contador.textContent = `${comprimentoTexto} caracteres`;
    textarea.addEventListener('input', () => {
      const comprimentoTexto = textarea.value.length;
      contador.textContent = `${comprimentoTexto} caracteres`;
    });

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">Manter "';
      const info = parseInt(data.info);

      switch (info) {
        case 0:
          result += "texto traduzido";
          break;
        case 1:
          result += "texto original";
          break;
        case 2:
          result += "Traduzido do idioma";
          break;
        case 3:
          result += "Traduzido para o idioma";
          break;
      }

      result += ` "${data.varName}" </div>`;
      return result;
    };

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

    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
      if (event.value == "5" || event.value == "6") {
        document.getElementById("containerxin").style.display = null;
        document.getElementById("xincontrol").style.display = "none";
        document.getElementById("xinext").style.width = "100%";
      } else {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("xincontrol").style.display = null;
        document.getElementById("xinext").style.width = "38%";
      }
      if (event.value == "2") {
        document.querySelector("[id='xinelas']").innerText = (`Número da ação`);
      }
      if (event.value == "3") {
        document.querySelector("[id='xinelas']").innerText = (`Pular ações`);
      }
      if (event.value == "4") {
        document.querySelector("[id='xinelas']").innerText = (`Nome da âncora`);
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));


    glob.variableChangeError = function (event) {
      if (event.value == "0") {
        document.getElementById("varNameContainerError").style.display = "none";
      } else {
        document.getElementById("varNameContainerError").style.display = null;
      }
    }

    glob.variableChangeError(document.getElementById("storageError"));

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const { translate } = require('bing-translate-api');
    const text = this.evalMessage(data.message, cache);
    const froms = this.evalMessage(data.from, cache);
    const to = this.evalMessage(data.to, cache);

    const from = froms ? froms : 'auto-detect';


    const branches = data.branches;

    try {
      const translates = await translate(text, from, to);

      for (var i = 0; i < branches.length; i++) {
        const branch = branches[i];
        const info = parseInt(branch.info);

        try {
          let result;

          switch (info) {
            case 0:
              result = translates.translation;
              break;
            case 1:
              result = translates.text;
              break;
            case 2:
              result = translates.language.to;
              break;
            case 3:
              result = translates.language.from;
              break;
          }

          const varName = this.evalMessage(branch.varName, cache);
          const storage = parseInt(branch.storage, 10);
          this.storeValue(result, storage, varName, cache);
        } catch (error) {

          this.storeValue(error, parseInt(data.storageError), this.evalMessage(data.varNameError, cache), cache)

          if (data.errcmd === true) {
            console.log('ERROR: ' + cache.toString() + ' - Action ' + (cache.index + 1) + '# ' + data.name);
            console.log(error);
          }
    
          if (data.iffalse == "5" || data.iffalse == "6") {
    
            if (data.iffalse == "5") {
              this.executeSubActions(data.actionsError, cache)
            } else {
              this.executeSubActionsThenNextAction(data.actionsError, cache)
            }
    
          } else {
            this.executeResults(false, data, cache);
          }

        }
      }

      this.callNextAction(cache);
    } catch (error) {

      this.storeValue(error, parseInt(data.storageError), this.evalMessage(data.varNameError, cache), cache)

      if (data.errcmd === true) {
        console.log('ERROR: ' + cache.toString() + ' - Action ' + (cache.index + 1) + '# ' + data.name);
        console.log(error);
      }

      if (data.iffalse == "5" || data.iffalse == "6") {

        if (data.iffalse == "5") {
          this.executeSubActions(data.actionsError, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionsError, cache)
        }

      } else {
        this.executeResults(false, data, cache);
      }


    }
  },

  modInit(data) {
    this.prepareActions(data.actionsError);
  },


  mod() { },
};