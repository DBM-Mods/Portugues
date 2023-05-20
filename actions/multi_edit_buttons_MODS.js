module.exports = {
    name: "Multi Edit Buttons MOD",
    section: "Messaging",
    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]<br>[XinXyla#0001 - 172782058396057602]',
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
            : `<font style="color:${desccor}">Editar ${data.branches.length == 1 ? data.branches.length + "  botão" : data.branches.length + " botões"}</font>`
    },


    fields: ["message", "varName", "description", "descriptionx", "descriptioncolor", "branches"],

    html(isEvent, data) {
        return `
  <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
  <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

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

  <div id="flutuador" style="padding:0px 0px 15px 0px">
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
  
  <message-input dropdownLabel="Mensagem" selectId="message" variableContainerId="varNameContainer" variableInputId="varName"></message-input>
  
  <br><br><br>
  
  <dialog-list id="branches" fields='["btn", "name", "emoji", "url", "type", "nomecheck", "emojicheck", "urlcheck", "typecheck", "val1", "val2", "comparar", "formula"]' dialogResizable dialogTitle="Editar botão" dialogWidth="600" dialogHeight="500" listLabel="Editar botões" listStyle="height: calc(100vh - 320px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="width: 100%; padding:8px; height: calc(100vh - 60px); overflow: auto;" onmouseover="(function(){
        if(document.getElementById('urlcheck').value) {
            document.getElementById('divValue').style.display = 'none';
        } else {
            document.getElementById('divValue').style.display = 'block';
        }

        const select = document.getElementById('formula');
        const value = select.options[select.selectedIndex].value;

        if(value == '9') {
            document.getElementById('divValue2').style.display = 'none';
        } else {
            document.getElementById('divValue2').style.display = 'block';
        }
    })()">
        <div style="padding: 16px; background: rgba(0,0,0,0.3);">
            <span class="dbminputlabel">Exibir</span>
            <select id="formula" class="round" onchange="(function(){
                const select = document.getElementById('formula');
                const value = select.options[select.selectedIndex].value;
        
                if(value == '9') {
                    document.getElementById('divValue2').style.display = 'none';
                } else {
                    document.getElementById('divValue2').style.display = 'block';
                }
            })()">
                <option value="0" selected>Editar botão / Ignorar o comparador abaixo</option>
                <option value="1">Editar o botão somente se o comparador for falso</option>
                <option value="2">Editar o botão somente se o comparador for verdadeiro</option>
                <option value="3">Desabilitar o botão / Ignorar o comparador abaixo</option>
                <option value="4">Desabilitar o botão somente se o comparador for falso</option>
                <option value="5">Desabilitar o botão somente se o comparador for verdadeiro</option>
                <option value="6">Habilitar o botão / Ignorar o comparador abaixo</option>
                <option value="7">Habilitar o botão somente se o comparador for falso</option>
                <option value="8">Habilitar o botão somente se o comparador for verdadeiro</option>
                <option value="9">Remover o botão / Ignorar o comparador abaixo</option>
                <option value="10">Remover o botão somente se o comparador for falso</option>
                <option value="11">Remover o botão somente se o comparador for verdadeiro</option>
            </select>
            <br>
   <table style="width:100%"><tr><td>
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
     <span class="dbminputlabel">Valor B</span><br>
     <input id="val2" class="round" type="text">
     </td>
     </tr></table>

</div>
    <div style="margin: 10px;">
    
        <span class="dbminputlabel">ID do botão</span>
        <input type="text" id="btn" class="round">
        
        <div id="divValue2">
        <br>

        <table style="width:100%"><tr><td>
        <span class="dbminputlabel">Alterar o nome para</span>
        <input type="text" id="name" class="round">
        </td>
        <td style="width:50px"><br><dbm-checkbox id="nomecheck" label="Editar" checked></dbm-checkbox></td></tr></table>
        <br>

        <table style="width:100%"><tr><td>
        <span class="dbminputlabel">Alterar o emoji para</span>
        <input type="text" id="emoji" class="round">
        </td>
        <td style="width:50px"><br><dbm-checkbox id="emojicheck" label="Editar" checked></dbm-checkbox></td></tr></table>
        <br>

        <table style="width:100%"><tr><td>
        <span class="dbminputlabel">Alterar o URL para</span>
        <input type="text" id="url" class="round">
        </td>
        <td style="width:50px"><br><dbm-checkbox id="urlcheck" label="Editar" onchange="(function(){
            if(document.getElementById('urlcheck').value) {
                document.getElementById('divValue').style.display = 'none';
            } else {
                document.getElementById('divValue').style.display = 'block';
            }
        })()"></dbm-checkbox></td></tr></table>
        <br>

        <div id="divValue">
        <table style="width:100%"><tr><td>
        <span class="dbminputlabel">Alterar o tipo de botão para</span>
        <br>
        <input id="type" value="PRIMARY" class="round" type="text">
        </td>
        <td style="width:50px"><br><dbm-checkbox id="typecheck" label="Editar" checked></dbm-checkbox></td></tr></table>
        <br>

        <div style="padding: 10px; background :rgba(0, 0, 0, 0.2);">
        PRIMARY (Azul)<br>
        SECONDARY (Cinza)<br>
        SUCCESS (Verde)<br>
        DANGER (Vermelho)<br>
        Ou use uma variável, exemplo \${tempVars("cor")}
        </div></div></div></div>
    </div>
    </div>
  </dialog-list>
  `;
    },

    init() {
        const { glob, document } = this;

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

        glob.formatItem = function (data) {
            let cor = "rgb(78,80,88)";
            const type = data.type;

            if (type == "PRIMARY") {
                cor = "rgb(88,101,242)";
            } else if (type == "SUCCESS") {
                cor = "rgb(36,128,70)";
            } else if (type == "DANGER") {
                cor = "rgb(218,55,60)";
            }

            if(!data.typecheck || data.urlcheck) cor = "rgb(78,80,88)";

            let result = `<div style="display: inline-block; width: 100%;"><div style="width:10px;background:${cor};float:left;margin-left:-10px"><br></div><table style="margin-left:10px"><tr><td style="width:100%">`;

            result += `${data.emojicheck ? data.emoji : ""} ${data.nomecheck ? data.name : ""}`;

            result += `</td><td style='width:120px;text-align:right;padding:0px 10px 0px 0px'>${data.btn}</td></tr></table></div>`;
            return result;
        }
    },

    async action(cache) {
        const data = cache.actions[cache.index];
        const message = await this.getMessageFromData(data.message, data.varName, cache);

        const branches = data.branches;

        const { MessageActionRow } = this.getDBM().DiscordJS;
        const oldComponents = message.components;
        const newComponents = [];

        for (var i = 0; i < oldComponents.length; i++) {
            const compData = oldComponents[i];
            const comps = (compData instanceof MessageActionRow) ? compData.toJSON() : compData;

            for (var j = 0; j < comps.components.length; j++) {
                const comp = comps.components[j];
                if (comp.type != 2) continue;

                const id = comp.custom_id || comp.customId;

                for (var t = 0; t < branches.length; t++) {
                    const branch = branches[t];
                    const formula = parseInt(branch.formula);

                    val1 = this.evalMessage(branch.val1, cache);
                    val2 = this.evalMessage(branch.val2, cache);
                    result = true;

                    if (formula == 1 || formula == 2 || formula == 4 || formula == 5 || formula == 7 || formula == 8 || formula == 10 || formula == 11) {
                        const compare = parseInt(branch.comparar, 10);
                        if (compare !== 6) {
                            val1 = this.evalIfPossible(val1, cache);
                            val2 = this.evalIfPossible(val2, cache);
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
                                result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
                                break;
                            case 36:
                                var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ")
                                var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",")
                                result = separador.some(els => valor2.includes(els));
                                break;
                        }

                        result = Boolean(result);
                    }

                    if (formula == 1 && result != false) continue;
                    if (formula == 2 && result != true) continue;

                    if (id == this.evalMessage(branch.btn, cache)) {
                        if (formula == 9 || formula == 10 && result == false || formula == 11 && result == true) {
                            comp.remove = true;
                            continue;
                        }

                        if (formula == 3) comp.disabled = true;
                        if (formula == 4 && result == false) comp.disabled = true;
                        if (formula == 5 && result == true) comp.disabled = true;

                        if (formula == 6) comp.disabled = false;
                        if (formula == 7 && result == false) comp.disabled = false;
                        if (formula == 8 && result == true) comp.disabled = false;

                        if (branch.typecheck) comp.style = this.evalMessage(branch.type, cache);
                        if (branch.nomecheck) comp.label = this.evalMessage(branch.name, cache);
                        if (branch.emojicheck) comp.emoji = this.evalMessage(branch.emoji, cache);

                        if (branch.urlcheck) {
                            comp.url = this.evalMessage(branch.url, cache);
                            comp.style = "LINK";
                            delete comp.custom_id;
                            delete comp.customId;
                        }
                    }
                }
            }

            comps.components = comps.components.filter((b) => b.remove != true);

            newComponents.push(comps);
        }

        const components = newComponents;

        if (cache.interaction?.message?.id === message?.id && cache.interaction?.update && !cache.interaction?.replied) {
            cache.interaction
                .update({ components })
                .then(() => this.callNextAction(cache))
                .catch((err) => this.displayError(data, cache, err));
        } else if (message?.edit) {
            message
                .edit({ components })
                .then(() => this.callNextAction(cache))
                .catch((err) => this.displayError(data, cache, err));
        } else {
            if (message.components) message.components = components;
            this.callNextAction(cache);
        }

    },

    mod() { },
};