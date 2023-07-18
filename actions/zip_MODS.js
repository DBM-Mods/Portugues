module.exports = {
    name: "Zip MOD",
    section: "Other Stuff",
    meta: {
        version: "2.1.7",
        preciseCheck: true,
        author: "[Tempest - 321400509326032897]<br>[xinxyla - 172782058396057602]",
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
            : `<font style="color:${desccor}">Zipando ${data.branches.length == 1 ? data.branches.length + " arquivo/pasta" : data.branches.length + " arquivos/pastas"}</font>`
    },


    fields: ["path", "nome", "branches", "description", "descriptionx", "descriptioncolor", "progresso", "progressostore", "progressovar", "abort", "errcmd", "iffalse", "iffalseVal", "storageError", "varNameError", "actionsError"],


    html(isEvent, data) {
        return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

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

  <tab-system>

    <tab label="Zips" icon="folder">
    <div style="margin: 5px;">
        <table style="width: 100%;">
            <td>
            <span class="dbminputlabel">Armazenar em</span>
            <input type="text" id="path" class="round" placeholder="Ex: ./resources/zips">
            </td>
            <td style="padding-left: 18px;">
            <span class="dbminputlabel">Nome do Arquivo</span>
            <input type="text" id="nome" class="round" placeholder="Ex: dbmmods">
            </td>
        </table>

        <br>
        
        <dialog-list id="branches" fields='["folder", "path", "name", "extension"]' dialogResizable dialogTitle="Zip" dialogWidth="600" dialogHeight="160" listLabel="Zips" listStyle="height: calc(100vh - 330px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
                
            <div style="margin: 10px;" onmouseover="(function(){
                const check = document.getElementById('folder');
                const value = folder.value;

                if (value) {
                    document.getElementById('label').style.display = 'none';
                    document.getElementById('label2').style.display = 'none';
                    document.getElementById('label3').textContent = 'Localização da pasta';
                } else {
                    document.getElementById('label').style.display = null;
                    document.getElementById('label2').style.display = null;
                    document.getElementById('label3').textContent = 'Localização do arquivo';
                }
            })()">
                <dbm-checkbox id="folder" label="Pasta" onchange="(function(){
                    const check = document.getElementById('folder');
                    const value = folder.value;

                    if (value) {
                        document.getElementById('label').style.display = 'none';
                        document.getElementById('label2').style.display = 'none';
                        document.getElementById('label3').textContent = 'Localização da pasta';
                    } else {
                        document.getElementById('label').style.display = null;
                        document.getElementById('label2').style.display = null;
                        document.getElementById('label3').textContent = 'Localização do arquivo';
                    }
                })()"></dbm-checkbox>

                <br>

                <table style="width: 100%;">
                    <td>
                        <span class="dbminputlabel" id="label3">Localização do arquivo</span>
                        <input type="text" id="path" class="round" placeholder="Deixe em branco para pasta principal">
                    </td>
                    <td id="label" style="padding-left: 18px;">
                        <span class="dbminputlabel">Nome do Arquivo</span>
                        <input type="text" id="name" class="round" placeholder="Ex: dbmmods">
                    </td>
                    <td id="label2" style="padding-left: 18px;">
                        <span class="dbminputlabel">Extensão do Arquivo</span>
                        <input type="text" id="extension" class="round" placeholder="Ex: js">
                    </td>
                </table>
            </div>
        </dialog-list>
    </div>
    </tab>

    <tab label="Progresso" icon="cogs">
        <div style="padding: 5px; height: calc(100vh - 210px); overflow-y: auto;">

        <span class="dbminputlabel">Opções</span>
        <br>
        <div style="padding: 10px; background: rgba(0,0,0,0.2);">
        <dbm-checkbox id="progresso" label="Exibir o progresso no console"></dbm-checkbox>
        </div>
        <br>

        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Armazenar progresso em</span>
          <select id="progressostore" class="round" onchange="glob.variableChange2(this, 'varNameContainer2')">
            ${data.variables[0]}
          </select>
        </div>
      
        <div id="varNameContainer2" style="float: right; display: none; width: 60%;">
          <span class="dbminputlabel">Nome da Variável</span>
          <input id="progressovar" class="round" type="text">
        </div>

   
        <br> <br> <br><br> 

        <span class="dbminputlabel">Coloque "true" para abortar a operação</span>
        <input id="abort" class="round" type="text" value="false">

    

        </div>

    </tab>

    <tab label="Config" icon="cogs">
        <div style="padding: 5px; height: calc(100vh - 210px); overflow-y: auto;">

            <div id="flutuador" style="padding: 0px 0px 15px 0px;">
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

        <span class="dbminputlabel">Opções</span>
        <br>
        <div style="padding: 10px; background: rgba(0,0,0,0.2);">
        <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
        </div>
        <br>

        <div style="float: left; width: 35%">
          <span class="dbminputlabel">Se ocorrer um erro</span>
          <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
            <option value="0">Continuar ações</option>
            <option value="1" selecionado>Parar sequência de ação</option>
            <option value="2">Ir para a ação</option>
            <option value="3">Pular as próximas ações</option>
            <option value="4">Ir para a âncora de ação</option>
            <option value="5">Realizar ações e parar</option>
            <option value="99">Realizar ações e continuar</option>
          </select>
        </div>
  
        <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
          <span id="xinelasT" class="dbminputlabel">Para</span>
          <input id="iffalseVal" class="round" type="text">
        </div>
  
        <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 430px)"></action-list-input>
       
        <br><br><br>

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
    </tab>

  </tab-system>
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

        glob.formatItem = function (data) {
            let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
            result += `${data.folder ? "Pasta" : "Arquivo"}: > ${data.path}${data.folder ? "" : `/${data.name}.${data.extension}`}</div>`;
            return result;
        };

        glob.onComparisonChanged = function (event) {
            if (event.value == "0" || event.value == "1" || event.value == "7") {
                document.getElementById("iffalseContainer").style.display = "none";
                document.getElementById("actionsError").style.display = "none";
            } else if (event.value == "5" || event.value == "99") {
                document.getElementById("iffalseContainer").style.display = "none";
                document.getElementById("actionsError").style.display = null;
            } else {
                document.getElementById("iffalseContainer").style.display = null;
                document.getElementById("actionsError").style.display = "none";
            }

            if (event.value > "4") {
                document.getElementById("divValueError").style.marginTop = "-40px";
            } else {
                document.getElementById("divValueError").style.marginTop = "0";
            }

            if (event.value == "2") {
                document.querySelector("[id='xinelasT']").innerText = "Número da ação";
            }

            if (event.value == "3") {
                document.querySelector("[id='xinelasT']").innerText = "Pular ações";
            }

            if (event.value == "4") {
                document.querySelector("[id='xinelasT']").innerText = "Nome da âncora";
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

        glob.variableChange2 = function (event) {
            if (event.value == "0") {
                document.getElementById("varNameContainer2").style.display = "none";
            } else {
                document.getElementById("varNameContainer2").style.display = null;
            }
        }

        glob.variableChange2(document.getElementById("progressostore"));
    },


    action(cache) {
        const data = cache.actions[cache.index];
        const _this = this;
        const branches = data.branches;
        const fs = require("fs");
        const archiver = require("archiver");
        const archive = archiver("zip");
        const directoryPath = `${this.evalMessage(data.path, cache)}${this.evalMessage(data.nome, cache)}.zip`;
        const directory = `${this.evalMessage(data.path, cache)}`

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
          recursive: true
        });
      }

        const output = fs.createWriteStream(directoryPath);
        abortar = 1

        archive.pipe(output);

        branches.forEach((branch) => {
            path = this.evalMessage(branch.path, cache);
            if (path == "") {
                path = '.'
            }
            const name = this.evalMessage(branch.name, cache);
            const extension = this.evalMessage(branch.extension, cache);

            const file = branch.folder ? path : `${path}/${name}.${extension}`;
            if (branch.folder) {
                archive.directory(file, true);
            } else {
                archive.file(file, { name: `${name}.${extension}` });
            }
        });


        if (data.progresso == true) {
            mensagemProgresso = "";
            totalzip = 0

            function logMensagem(mensagem) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(mensagem);
            }


            const texto = 'Iniciando';
            logMensagem(texto);
        }

        archive.on("progress", (progress) => {
            totalzip = progress.entries.total
            mensagemProgresso = `Arquivos sendo zipados: ${progress.entries.total}`;
            _this.storeValue(totalzip, parseInt(data.progressostore), _this.evalMessage(data.progressovar, cache), cache);

            if (this.evalMessage(data.abort, cache) == "true") {
                archive.abort();
                mensagemProgresso = `Arquivos zipados: ${progress.entries.total} / Operação abortada`;
            }
            if (data.progresso == true) {
                logMensagem(mensagemProgresso);
            }
        });


        archive.finalize();


        output.on("finish", () => {
            if (data.progresso == true) {
                mensagemProgresso = `Arquivos zipados: ${totalzip}`;
                logMensagem(mensagemProgresso);
            }
            this.storeValue(totalzip, parseInt(data.progressostore), _this.evalMessage(data.progressovar, cache), cache);
            this.callNextAction(cache);
        });

        output.on("error", (er) => {
            erro(er);
        });

        function erro(err) {
            if (data.errcmd) _this.displayError(data, cache, err);

            _this.storeValue(err, parseInt(data.storageError), _this.evalMessage(data.varNameError, cache), cache);

            if (data.iffalse == "5") return _this.executeSubActions(data.actionsError, cache);
            if (data.iffalse == "99") return _this.executeSubActionsThenNextAction(data.actionsError, cache);

            return _this.executeResults(false, data, cache);
        }
    },

    mod() { },

    modInit(data) {
        this.prepareActions(data.actionsError);
    },
};