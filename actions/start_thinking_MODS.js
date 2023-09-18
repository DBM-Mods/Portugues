module.exports = {
  name: "Start Thinking MOD",
  section: "Other Stuff",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

  if(data.cx == "0"){addtxt = `Informar o usuário em ` + (data.ephemeral ? "Particular" : "Público")} else {addtxt = `Adicionar "O bot está pensando"`}

    return addtxt;
  },



  fields: ["ephemeral", "ephemeralsub", "cx", "errcmd", "iffalse", "iffalseVal", "actionsError"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

<div style="padding: 4px;">
<span class="dbminputlabel">Tipo</span><br>
<select id="cx" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selected>Caixa de seleção</option>
<option value="1">Caixa de texto</option>
</select>
<br>

  <div id="xinelasum">
  <dbm-checkbox id="ephemeral" label="Informar o usuário em particular (Ephemeral)"></dbm-checkbox>
  </div>
  <div id="xinelasdois">
  <span class="dbminputlabel">Informar o usuário em particular use "true"</span><br>
<input id="ephemeralsub" class="round" name="actionxinxyla" type="text">
  </div>

<br>
<dbm-checkbox id="errcmd" label="Mostrar erro no console log"></dbm-checkbox>

<br>

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
<action-list-input id="actionsError" min-height="100" height="calc(100vh - 450px)"></action-list-input>
</div>

</div>
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

    glob.onComparisonChanged2 = function (event) {
      if (event.value == "0") {
        document.getElementById("xinelasum").style.display = null;
        document.getElementById("xinelasdois").style.display = "none";
      } else {
        document.getElementById("xinelasum").style.display = "none";
        document.getElementById("xinelasdois").style.display = null;
      }
    }

    glob.onComparisonChanged2(document.getElementById("cx"));


    glob.variableChangeError = function (event) {
      if (event.value == "0") {
        document.getElementById("varNameContainerError").style.display = "none";
      } else {
        document.getElementById("varNameContainerError").style.display = null;
      }
    }

    glob.variableChangeError(document.getElementById("storageError"));

  },


  action(cache) {
    const data = cache.actions[cache.index];

    if (data.cx == "0") {
      efemeralxin = data.ephemeral
    } else {
      efemeralxin = this.evalMessage(data.ephemeralsub, cache);
      if (efemeralxin == "true") { efemeralxin = true } else { efemeralxin = false }
    }

    if (cache.interaction) {
      cache.interaction
        .deferReply({ ephemeral: efemeralxin })
        .then(() => this.callNextAction(cache))
        .catch((error) => {
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
        });
    } else {
      this.callNextAction(cache);
    }

  },


  mod() { },
};
