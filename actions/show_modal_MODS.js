module.exports = {
  name: "Show Modal MOD",
  section: "Messaging",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]<br>[tempestdbm - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data) {
    if (data.descriptionx == true) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">"${data.title}" com ${data.textInputs.length} inputs</font>`;
  },

  variableStorage(data, varType) {
    let vars = [];

    for (var i = 0; i < data.textInputs.length; i++) {
      if (data.textInputs[i].storage == varType) {
        vars.push(data.textInputs[i].varName);
        vars.push("Texto");
      }
    }

    const type = parseInt(data.storageError);

    if (type == varType) {
      vars.push(data.varNameError);
      vars.push("Texto ~ Erro");
    }

    if (vars.length > 0) return vars;
  },


  fields: ["title", "textInputs", "description", "descriptionx", "descriptioncolor", "errcmd", "iffalse", "iffalseVal", "storageError", "varNameError", "actionsError"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

    <tab-system>

      <tab label="Inputs" icon="align left">

      <div style="margin: 5px;">
      <span class="dbminputlabel">Título do modal</span>
      <input id="title" class="round" type="text" value="Meu Modal">
  
      <br>

      <dialog-list id="textInputs" fields='["formato", "formula", "val1", "comparar", "val2", "id", "name", "placeholder", "value", "minLength", "maxLength", "row", "style", "required", "storage", "varName"]' dialogTitle="Input" dialogWidth="600" dialogHeight="615" listLabel="Inputs" listStyle="height: calc(100vh - 315px);" itemName="Input" itemCols="1" itemHeight="80px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 40px;">
        <div style="padding: 10px;">

          <span class="dbminputlabel">Exibir</span>
          <select id="formula" class="round">
            <option value="0" selected>Sempre exibir o input / Ignorar o comparador abaixo</option>
            <option value="1">Exibir o input somente se o comparador for falso</option>
            <option value="2">Exibir o input somente se o comparador for verdadeiro</option>
          </select>

          <br>

          <table style="width:100%">
            <tr>
              <td>
                <span class="dbminputlabel">Valor A</span>
                <input id="val1" class="round" type="text">
              </td>
              <td>
                <span class="dbminputlabel">Comparador</span>
                <select id="comparar" class="round">
                    <optgroup label="Número ou Texto">
                        <option value="0">Valor A - Existe</option>
                        <option value="1" selected>Igual a</option>
                        <option value="2">Exatamente igual</option>
                    </optgroup>
                    <optgroup label="Número">
                        <option value="3">Menor que</option>
                        <option value="13">Menor ou igual a</option>
                        <option value="4">Maior que</option>
                        <option value="12">Maior ou igual a</option>
                        <option value="19">Valor A - É um número par?</option>
                        <option value="20">Valor A - É um número ímpar?</option>
                        <option value="21">Valor A - É um número?</option>
                    </optgroup>
                    <optgroup label="Texto">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7">O comprimento é maior que</option>
                        <option value="8">O comprimento é menor que</option>
                        <option value="9">O comprimento é igual a</option>
                        <option value="10">Começa com</option>
                        <option value="11">Termina com</option>
                        <option value="16">Valor A - Possui acentuações?</option>
                        <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                        <option value="24">Valor A - É um texto?</option>
                        <option value="23">Valor A - É um URL de imagem?</option>
                        <option value="25">Valor A - É um URL?</option>
                        <option value="26">Valor A - O email existe?</option>
                    </optgroup>
                    <optgroup label="Texto ~ Inclui">
                        <option value="5">Inclui exatamente</option>
                        <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="30">Inclui ~ Ignorar acentuações</option>
                        <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
                        <option value="27">Inclui algum URL?</option>
                        <option value="28">Inclui algum convite do Discord?</option>
                        <option value="32">Inclui exatamente a palavra</option>
                        <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
                        <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                    </optgroup>
                    <optgroup label="Outros">
                        <option value="22">Valor A - É uma lista?</option>
                    </optgroup>
                </select>
              </td>
              <td>
                <span class="dbminputlabel">Valor B</span>
                <input id="val2" class="round" type="text">
              </td>
            </tr>
          </table>

          <br>

          <span class="dbminputlabel">Nome</span>
          <input id="name" class="round" type="text">

          <br>

          <span class="dbminputlabel">Placeholder</span>
          <input id="placeholder" class="round" type="text">

          <br>

          <span class="dbminputlabel">Valor</span>
          <input id="value" placeholder="Deixe em branco para desativar..." class="round" type="text">

          <br>

          <table style="width: 100%;">
            <td>
              <span class="dbminputlabel">Comprimento máximo</span>
              <input id="maxLength" placeholder="1000" class="round" type="text" value="1000">
            </td>
            <td style="padding-left: 18px;">
              <span class="dbminputlabel">Comprimento mínimo</span>
              <input id="minLength" placeholder="0" class="round" type="text" value="1">
            </td>
          </table>

          <br>

          <table style="width: 100%;">
            <td>
              <span class="dbminputlabel">Linha da ação (1 - 5)</span>
              <input id="row" placeholder="Deixe em branco para o padrão..." class="round" type="text">
            </td>
            <td style="padding-left: 15px;">
              <span class="dbminputlabel">Estilo</span>
              <select id="style" class="round">
                <option value="SHORT">Linha</option>
                <option value="PARAGRAPH">Parágrafo</option>
              </select>
            </td>
            <td style="padding-left: 15px;">
              <span class="dbminputlabel">Requerido?</span>
              <select id="required" class="round">
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </td>
            <td style="padding-left: 15px;">
              <span class="dbminputlabel">Formato</span>
              <select id="formato" class="round">
                <option value="0">Fonte</option>
                <option value="1">Número</option>
                <option value="2">Texto</option>
                <option value="3">Lista</option>
                <option value="4">True/False</option>
              </select>
            </td>
          </table>

          <br>
          
          <store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>

        </div>
      </dialog-list>
      </div>
      </tab>

      <tab label="Config" icon="cogs">
      <div style="height: calc(100vh - 210px); overflow-y: auto;">
        <div id="flutuador" style="padding: 0px 0px 15px 0px; margin-top: 5px;">
            <table style="width:100%;"><tr>
                <td>
                  <span class="dbminputlabel">Descrição da Action</span>
                  <br>
                  <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
                </td>
                <td style="padding:0px 0px 0px 10px; width:70px";>
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
    </style>`;
  },

  init() {
    glob.formatItem = function (data) {
      const storage = ["Easter Egg", "Variável Temporária", "Variável Servidor", "Variável Global"];

      let result = `<div style="display: inline-block; width: 100%; padding-left: 8px"><div style="float: left; width: calc(100% - 200px); overflow: hidden; text-align: left;">Nome: ${data.name}<br>Formato: `;

      switch (parseInt(data.formato)) {
        case 0:
          result += "Fonte";
          break;
        case 1:
          result += "Número";
          break;
        case 2:
          result += "Texto";
          break;
        case 3:
          result += "Lista";
          break;
        case 4:
          result += "True/False";
          break;
      }

      return result += `</div><div style="float: right; width: 190px; text-align: left; padding: 0px 10px 0px 0px;">Estilo: ${data.style == "SHORT" ? "Linha" : "Parágrafo"}<br>${storage[parseInt(data.storage)]} (${data.varName})</div></div>`;
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
    const _this = this;



    let componentsArr = [];
    const variables = [];

    if (this.evalMessage(data.title, cache).length > 45) return erro("O título do modal deve ter no máximo 45 caracteres.");

    let cont = 0;

    for (var i = 0; i < data.textInputs.length; i++) {
      const textInput = data.textInputs[i];
      const formula = parseInt(textInput.formula);

      if (formula != 0) {
        const compare = parseInt(textInput.comparar);
        let result;
        if (compare !== 6) {
          var val1 = this.evalIfPossible(textInput.val1, cache);
          var val2 = this.evalIfPossible(textInput.val2, cache);
        }
        switch (compare) {
          case 0:
            result = val1 !== undefined;
            break;
          case 1:
            result = val1 == val2;
            break;
          case 2:
            result = val1 === val2;
            break;
          case 3:
            result = val1 < val2;
            break;
          case 4:
            result = val1 > val2;
            break;
          case 5:
            if (typeof val1?.toString().includes === "function") {
              result = val1.toString().includes(val2);
            }
            break;
          case 6:
            result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
            break;
          case 7:
            result = Boolean(val1.toString().length > val2);
            break;
          case 8:
            result = Boolean(val1.toString().length < val2);
            break;
          case 9:
            result = Boolean(val1.toString().length == val2);
            break;
          case 10:
            result = val1.toString().startsWith(val2);
            break;
          case 11:
            result = val1.toString().endsWith(val2);
            break;
          case 12:
            result = Boolean(val1 >= val2);
            break;
          case 13:
            result = Boolean(val1 <= val2);
            break;
          case 14:
            result = Boolean(val1.toString().match(new RegExp(val2)))
            break;
          case 15:
            var numberj = val1.toString();
            if (numberj >= val2 && val1 <= val3) {
              result = numberj
            }
            break;
          case 16:
            const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
            result = conditions.some(el => val1.includes(el));
            break;
          case 17:
            const conditionsX = val2
            result = conditionsX.some(els => val1.includes(els));
            break;
          case 18:
            const conditionsZ = val2
            result = conditionsZ.some(elz => val1 == (elz));
            break;
          case 19:
            result = val1 % 2 == 0
            break;
          case 20:
            result = val1 % 2 == 1
            break;
          case 21:
            result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
            break;
          case 22:
            result = Boolean(Array.isArray(val1));
            break;
          case 23:
            const isImageUrl = require("is-image-url");
            result = isImageUrl(val1);
            break;
          case 24:
            result = typeof val1 === "string";
            break;
          case 25:
            const isUrl = require("is-url");
            result = isUrl(val1);
            break;
          case 26:
            _this = this;

            const mail = require("email-existence");
            ignorar = 2
            mail.check(val1, (error, response) => {
              result = response;
            });
            break;
          case 27:
            let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
            result = val1.match(pattern);
            break;
          case 28:
            invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
            result = invite.test(val1);
            break;
          case 29:
            result = val1.toLowerCase().includes(val2.toLowerCase());
            break;
          case 30:
            tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            result = tratarval1.includes(tratar);
            break;
          case 31:
            tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            result = tratarval1.toLowerCase().includes(tratar);
            break;
          case 32:
            var words = val1.split(" ");
            result = words.includes(val2);
            break;
          case 33:
            var words = val1.toLowerCase().split(" ");
            result = words.includes(val2.toLowerCase());
            break;
          case 34:
            var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
            result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            break;
          case 35:
            var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
            result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
            break;
          case 36:
            var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
            var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
            result = separador.some(els => valor2.includes(els));
            break;
        }

        result = Boolean(result);

        if (formula == 1 && result != false) continue;
        if (formula == 2 && result != true) continue;
      }

      if (cont > 4) return erro("O modal deve ter no máximo 5 inputs.");
      cont++;

      if (this.evalMessage(textInput.name, cache).length > 45) return erro("O nome da opção deve ter no máximo 45 caracteres.");

      const id = "Modal-" + Math.floor(Math.random() * 1e12);
      const format = parseInt(textInput.formato);
      const textInputData = this.generateTextInput(textInput, id, cache);

      const value = this.evalMessage(textInput.value, cache);
      if (value) textInputData.value = value;

      this.addTextInputToActionRowArray(componentsArr, this.evalMessage(textInput.row, cache), textInputData, cache);

      variables.push({
        customId: id,
        format: format,
        name: textInput.varName,
        type: parseInt(textInput.storage)
      });
    }

    if (componentsArr.length > 0) {
      componentsArr = componentsArr.filter((comps) => comps.length > 0).map((comps) => {
        return {
          type: "ACTION_ROW",
          components: comps,
        };
      });
    }


    if (cache.interaction) {
      if (cache.interaction.showModal) {
        const modalData = {
          customId: cache.interaction.id,
          title: this.evalMessage(data.title, cache),
          components: componentsArr
        };

        this.registerModalSubmitResponses(cache.interaction.id, (newInteraction) => {
          newInteraction.__originalInteraction = cache.interaction;
          cache.interaction = newInteraction;

          for (var i = 0; i < variables.length; i++) {
            const id = variables[i].customId;
            const format = variables[i].format;
            const name = variables[i].name;
            const type = variables[i].type;
            let val = newInteraction.fields.getTextInputValue(id);

            switch (format) {
              case 1:
                val = parseFloat(val);
                break;
              case 2:
                val = String(val);
                break;
              case 3:
                val = String(val).split(",");
                break;
              case 4:
                val = Boolean(val);
                break;
            }

            this.storeValue(val, type, name, cache);
          }

          this.callNextAction(cache);
        });

   
        cache.interaction.showModal(modalData).catch((err) => {erro(err)});
       

      } else {
        erro("Não é possível mostrar o modal na interação atual, talvez o bot já tenha respondido a interação.");
      }
    } else {
      erro("Não foi possível encontrar a interação atual.");
    }


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