module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Call Button/Select Menu MOD",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data) {

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Chamar o ${data.type == "0" ? "botão" : "menu"}: ${data.id}</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Texto ~ Erro"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["callType", "type", "id", "listType", "branches", "storage2", "varName2", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal", "actions", "storage", "varName", "errcmd"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
        <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

        <tab-system>

            <tab label="Botão & Menu" icon="align left">

              <div style="overflow: auto; height: calc(100vh - 210px); padding: 5px;">
                <span class="dbminputlabel">Tipo de chamada</span>
                <select id="callType" class="round">
                  <option value="true" selected>Aguarde a conclusão</option>
                  <option value="false">Executar simultaneamente</option>
                </select>

                <br>

                <span class="dbminputlabel">Tipo</span>
                <select id="type" class="round" onchange="glob.onChange(this)">
                  <option value="0">Botão</option>
                  <option value="1">Menu</option>
                </select>

                <br>

                <span class="dbminputlabel" id="label">ID do botão</span>
                <input id="id" type="text" class="round">

                <div id="divValue">
                  <br>

                  <span class="dbminputlabel">Modo da lista</span>
                  <select id="listType" class="round" onchange="glob.list(this)">
                    <option value="0" selected>Construir lista de opções</option>
                    <option value="1">Receber lista de opções</option>
                  </select>

                  <br>

                  <div id="divValue5">
                    <dialog-list id="branches" fields='["option", "option2", "eval"]' dialogResizable dialogTitle="Opção" dialogWidth="400" dialogHeight="150" listLabel="Opções" listStyle="height: calc(100vh - 400px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
                      <div style="margin: 10px;" onmouseover='(function(){
                          const checkbox = document.getElementById("eval").value.toString();

                          if(checkbox == "false") {
                            document.getElementById("divValue3").style.display = "block";
                            document.getElementById("divValue4").style.display = "none";
                          } else {
                            document.getElementById("divValue3").style.display = "none";
                            document.getElementById("divValue4").style.display = "block";
                          }
                      })()'>
                  
                        <dbm-checkbox id="eval" label="Eval" style="float: right;" onchange='(function(){
                          const checkbox = document.getElementById("eval").value.toString();

                          if(checkbox == "false") {
                            document.getElementById("divValue3").style.display = "block";
                            document.getElementById("divValue4").style.display = "none";
                          } else {
                            document.getElementById("divValue3").style.display = "none";
                            document.getElementById("divValue4").style.display = "block";
                          }
                        })()'></dbm-checkbox>

                        <div id="divValue3">
                          <span class="dbminputlabel" style="float: left; margin-top: 5px;">Opção</span>
                          <input id="option" class="round" placeholder="Nome ou valor da opção">
                        </div>

                        <div id="divValue4">
                          <span class="dbminputlabel" style="float: left; margin-top: 5px;">Opção</span>
                          <input id="option2" class="round" placeholder="Nome ou valor da opção" name="is-eval">
                        </div>
                  
                      </div>
                    </dialog-list>
                  </div>

                  <div id="divValue6">
                    <retrieve-from-variable dropdownLabel="Lista" selectId="storage2" variableContainerId="varNameContainer2" variableInputId="varName2"></retrieve-from-variable>
                  </div>
                </div>
              </div>

            </tab>

            <tab label="Config" icon="cogs">

              <div style="overflow: auto; height: calc(100vh - 210px);">
                <div id="flutuador" style="padding: 0px 0px 15px 0px; margin-top: 10px;">
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

                <div style="float: left; width: 40%">
                    <span class="dbminputlabel">Se ocorrer um erro</span>
                    <select id="iffalse" class="round" onchange="glob.change(this)">
                        <option value="0" selected>Continuar ações</option>
                        <option value="1">Parar sequência de ação</option>
                        <option value="2">Ir para a ação</option>
                        <option value="3">Pular as próximas ações</option>
                        <option value="4">Ir para a âncora de ação</option>
                        <option value="5">Realizar ações e parar</option>
                        <option value="99">Realizar ações e continuar</option>
                    </select>
                </div>
        
                <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
                    <span id="xinelas" class="dbminputlabel">Para</span>
                    <br>
                    <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
                </div>

                <action-list-input id="actions" style="margin-top: 50px;" height="calc(100vh - 430px)"></action-list-input>
              
                <br><br><br>

                <div id="divValue2" style="margin-top: 10px;">
                  <div style="float: left; width: 35%;">
                    <span class="dbminputlabel">Armazenar erro em</span>
                    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
                      ${data.variables[0]}
                    </select>
                  </div>
                
                  <div id="varNameContainer" style="float: right; display: none; width: 60%;">
                    <span class="dbminputlabel">Nome da Variável</span><br>
                    <input id="varName" class="round" type="text">
                  </div>
                </div>

              </div>
            </tab>

        </tab-system>

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
            cursor: pointer
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
            cursor: pointer
          }
        </style>
    `;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init() {
    const xinelaslinks = document.getElementsByClassName("xinelaslink");
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

    glob.list = function(event) {
      if(event.value == "0") {
        document.getElementById("divValue5").style.display = "block";
        document.getElementById("divValue6").style.display = "none";
      } else {
        document.getElementById("divValue6").style.display = "block";
        document.getElementById("divValue5").style.display = "none";
      }
    };

    glob.list(document.getElementById("listType"));

    glob.variableChange(document.getElementById("storage"), "varNameContainer");

    glob.onChange = function(event) {
      if(event.value == "0") {
        document.getElementById("label").textContent = "ID do Botão";
        document.getElementById("divValue").style.display = "none";
      } else {
        document.getElementById("label").textContent = "ID do Menu";
        document.getElementById("divValue").style.display = "block";
      }
    }

    glob.onChange(document.getElementById("type"));

    glob.change = function (event) {
        if(event.value == "0" || event.value == "1" || event.value == "7") {
          document.getElementById("iffalseContainer").style.display = "none";
          document.getElementById("actions").style.display = "none";
        } else if(event.value == "5" || event.value == "99") {
          document.getElementById("iffalseContainer").style.display = "none";
          document.getElementById("actions").style.display = null;
        } else {
          document.getElementById("iffalseContainer").style.display = null;
          document.getElementById("actions").style.display = "none";
        }

        if(event.value > "4") {
          document.getElementById("divValue2").style.marginTop = "-50px";
        } else {
          document.getElementById("divValue2").style.marginTop = "10px";
        }

        if (event.value == "2") {
          document.querySelector("[id='xinelas']").innerText = "Número da ação";
        }

        if (event.value == "3") {
          document.querySelector("[id='xinelas']").innerText = "Pular ações";
        }

        if (event.value == "4") {
          document.querySelector("[id='xinelas']").innerText = "Nome da âncora";
        }
    }

    glob.change(document.getElementById("iffalse"));

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
      result += `${data.eval ? "(EVAL) " : ""}Opção > ${data.eval ? data.option2 : data.option}</div>`;
      return result;
    };
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  action(cache) {
    const data = cache.actions[cache.index];
    const Mods = this.getdbmmods();

    const DBM = this.getDBM();

    const { $button, $select } = DBM.Bot;
    const _this = this;

    const events = DBM.Files.data.events;
    const commands = DBM.Files.data.commands.concat(events);

    const $tempButton = Mods.jsonPath(commands, '$..buttons[?(@.mode != "PERSISTENT")]');
    const $tempSelect = Mods.jsonPath(commands, '$..selectMenus[?(@.mode != "PERSISTENT")]');
    
    const callType = Boolean(data.callType);
    const id = this.evalMessage(data.id, cache);
    const interaction = cache.interaction;
    
    function erro(err) {
      if(data.errcmd) _this.displayError(data, cache, err);

      _this.storeValue(err, parseInt(data.storage), _this.evalMessage(data.varName, cache), cache);

      if(data.iffalse == "5") return _this.executeSubActions(data.actions, cache);
      if(data.iffalse == "99") return _this.executeSubActionsThenNextAction(data.actions, cache);
      
      return _this.executeResults(false, data, cache);
    }

    if(!interaction) return erro("O cache da interação não foi encontrado");

    const waitForCompletion = callType == true;
    let callback = null;

    if(data.type == "0") {
      const button = $button[id] || $tempButton.find((el) => el.id == id);

      if(!button) return erro("O botão não foi encontrado");

      if (waitForCompletion) {
        callback = () => this.callNextAction(cache);
      }

      this.executeSubActions(button.actions, cache, callback);

      if (!waitForCompletion) {
        this.callNextAction(cache);
      }
    } else {
      const menu = $select[id] || $tempSelect.find((el) => el.id == id);

      if(!menu) return erro("O menu não foi encontrado");

      let options = [];

      if(data.listType == "0") {
        const branches = data.branches;
        if(branches.length == 0) return erro("A lista precisa conter pelo menos uma opção");

        for(var i = 0; i < branches.length; i++) {
          const option = branches[i];
          
          if(option.eval == true) {
            try {
              options.push(this.eval(option.option2, cache));
            } catch (e) {
              this.displayError(data, cache, e);
            }
          } else {
            options.push(this.evalMessage(option.option, cache));
          }
        }
      } else {
        options = this.getVariable(parseInt(data.storage2), this.evalMessage(data.varName2, cache), cache);

        if(!Array.isArray(options)) return erro("Insira uma lista válida");
        if(options.length == 0) return erro("A lista precisa conter pelo menos uma opção");
      }

      const values = options;
      const value = !values || values.length === 0 ? 0 : values.length === 1 ? values[0] : values;
      this.storeValue(value, 1, menu.tempVarName, cache);

      if (waitForCompletion) {
        callback = () => this.callNextAction(cache);
      }

      this.executeSubActions(menu.actions, cache, callback);

      if (!waitForCompletion) {
        this.callNextAction(cache);
      }
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() {},
};