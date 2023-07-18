module.exports = {
    name: "Unzip MOD",
    section: "Other Stuff",
    meta: {
        version: "2.1.7",
        preciseCheck: true,
        author: "[xinxyla - 172782058396057602]",
        authorUrl: "https://github.com/DBM-Mods/Portugues",
        downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
    },

    subtitle(data) {
        if (data.descriptionx) {
            desccor = data.descriptioncolor;
        } else {
            desccor = "none";
        }

        return data.description
            ? `<font style="color:${desccor}">${data.description}</font>`
            : `<font style="color:${desccor}">Extrair "${data.origem}" para "${data.pasta}"`
    },


    fields: ["origem", "pasta", "description", "descriptionx", "descriptioncolor", "errcmd", "iffalse", "iffalseVal", "storageError", "varNameError", "actionsError"],

    variableStorage(data, varType) {
        const type = parseInt(data.storageError)
        if (type !== varType) return
        return ([data.varNameError, 'Erro'])
    },

    html(isEvent, data) {
        return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

  <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

  <div id="flutuador" style="padding: 0px;">
  <table style="width:100%;"><tr>
      <td>
          <span class="dbminputlabel">Descrição da Action</span>
          <br>
          <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
      </td>
      <td style="padding:0px 0px 0px 10px;width:70px">
          <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px">
              <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
          </div>
          <br>
          <input type="color" value="#ffffff" class="round" id="descriptioncolor">
      </td>
  </table>
</div>

<br>
            <span class="dbminputlabel">Arquivo ZIP</span>
            <input type="text" id="origem" class="round" placeholder="resources/arquivo.zip">

            <br>

            <span class="dbminputlabel">Extrair para a pasta (Deixe em branco para a pasta principal)</span>
            <input type="text" id="pasta" class="round" placeholder="resources">

            <br>

            <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
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
<span class="dbminputlabel">Se a extração falhar</span><br>
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
       
  

            <style>
            .dbmmodsbr1 {
              position: absolute;
              bottom: 0px;
              border: 0px solid rgba(50,50,50,0.7);
              background: rgba(0,0,0,0.7);
              color: #999;
              padding: 5px;
              left: 0px;
              z-index: 999999;
              cursor: pointer;
            }
        
            .dbmmodsbr2 {
              position: absolute;
              bottom: 0px;
              border: 0px solid rgba(50,50,50,0.7);
              background: rgba(0,0,0,0.7);
              color: #999;
              padding: 5px;
              right: 0px;
              z-index: 999999;
              cursor: pointer;
            }
          </style>
 


  `;
    },

    init() {
        const xinelaslinks = document.getElementsByClassName("xinelaslink");
        for (let x = 0; x < xinelaslinks.length; x++) {
            const xinelaslink = xinelaslinks[x];
            const url = xinelaslink.getAttribute("data-url");
            if (url) {
                xinelaslink.setAttribute("title", url);
                xinelaslink.addEventListener("click", (e) => {
                    e.stopImmediatePropagation();
                    console.log(`Launching URL: [${url}] in your default browser.`);
                    require("child_process").execSync(`start ${url}`);
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


    action(cache) {
        const data = cache.actions[cache.index];
        const unzipper = require('unzipper');
        const fs = require('fs');

        const zipFilePath = this.evalMessage(data.origem, cache)
        const destinationPath = this.evalMessage(data.pasta, cache)

        erro = 1

        try {

            const output = fs.createReadStream(zipFilePath)
            output.pipe(unzipper.Extract({ path: destinationPath }))
            output.on('close', () => {
                if (erro == 1) {
                    this.callNextAction(cache)
                }
            })
            output.on('error', (err) => {

                erro = 2

                this.storeValue(err, parseInt(data.storageError), this.evalMessage(data.varNameError, cache), cache)

                if (data.errcmd) { this.displayError(data, cache, err) }

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


        } catch (err) {

            erro = 2
            
            this.storeValue(err, parseInt(data.storageError), this.evalMessage(data.varNameError, cache), cache)

            if (data.errcmd) { this.displayError(data, cache, err) }

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

    mod() { },

    modInit(data) {
        this.prepareActions(data.actionsError);
    },

};