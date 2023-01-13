module.exports = {

    name: "Convert MOD",
    section: "Other Stuff",
    short_description: "Converte uma informação em texto,número ou formato",
    meta: {
        version: '2.1.6',
        preciseCheck: true,
        author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle: function (data, presets) {
        const storage = presets.variables;
        const info = ['Número inteiro (Arredondado)', 'Número inteiro (Para cima)', 'Número inteiro (Para baixo)', 'Texto', 'Texto maiúsculo', 'Texto minúsculo', 'Texto sem espaços', 'Texto (Sem espaços de ambos os lados)', 'Número com pontuações', 'Número resumido', 'Formato de dinheiro R$', 'Formato de dinheiro U$', 'Formato de dinheiro €', 'Texto sem acentos', 'Texto começando com a letra maiuscula', 'Texto espaçado', 'Número resumido com pontuação', 'Número resumido para número', 'Texto para JSON', 'Formato de dinheiro ₽', 'Número inteiro mais próximo', 'Número absoluto', 'Lista', 'JSON para texto', 'Número quebrado', 'Número'];
        const prse = parseInt(data.into);
        const info2 = [`Texto "${data.vAria}"`, `Texto EVAL "${data.vAriaeval}"`, `${storage[parseInt(data.storage0, 10)]} (${data.varName0})`]
        const prse2 = parseInt(data.tipo || 0);

        if (data.descriptionx == true) {
            desccor = data.descriptioncolor
        } else {
            desccor = 'none'
        }

        return data.description
            ? `<font style="color:${desccor}">${data.description}</font>`
            : `<font style="color:${desccor}">Converter ${info2[prse2]} em "${info[prse]}"</font>`
    },



    variableStorage: function (data, varType) {
        const type = parseInt(data.storage);
        const prse2 = parseInt(data.into);
        const info2 = ['Número', 'Número', 'Número', 'Texto', 'Texto', 'Texto', 'Texto', 'Texto', 'Número', 'Número', 'Dinheiro', 'Dinheiro', 'Dinheiro', 'Texto', 'Texto', 'Texto', 'Número', 'Número', 'JSON', 'Dinheiro', 'Número', 'Número', 'Lista', 'Texto', 'Número', 'Número'];
        if (type !== varType) return;
        return ([data.varName2, info2[prse2]]);
    },


    fields: ["vAriavar", "vAriaeval", "separador", "storage0", "varName0", "into", "vAria", "storage", "varName2", "valor", "tipo", "descriptioncolor", "description", "descriptionx"],

    html: function (isEvent, data) {
        return `
        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
        <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 1.3</div>

        <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    
        <div id="flutuador" style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>
       
    <span class="dbminputlabel">Tipo</span><br>
    <select id="tipo" class="round" onchange="glob.onChange2(this)">
    <option value="0" selected>Texto</option>
    <option value="1">Texto Eval</option>
    <option value="2">Variavel</option>
    </select>

    <br>

    <div id="texto">
    <div class="col-3 input-effect" style="width: 100%;">
    <textarea id="vAria" rows="4" class="efeitoala" type="text" style="width:100%"></textarea>
    <label><span class="dbminputlabel">Informação</span><br></label>
    <span class="focus-border"></span></div></div>

    <div id="textoeval">
    <div class="col-3 input-effect" style="width: 100%;">
    <textarea id="vAriaeval" rows="4" class="efeitoala" type="text" name="is-eval" style="width:100%"></textarea>
    <label><span class="dbminputlabel">Informação - EVAL</span><br></label>
    <span class="focus-border"></span></div></div>


    <div id="variavel">
    
            <div style="float: left; width: 35%;">
            <span class="dbminputlabel">Informação</span><br>
                <select id="storage0" class="round">
                    ${data.variables[1]}
                </select>
            </div>
            <div id="varNameContainer2" style="float: right; width: 60%;">
                <div class="col-3 input-effect" style="width: 100%;">
                    <input id="varName0" class="efeitoala" type="text" style="padding:0px 5px;width: 100%;" list="variableList">
                    <label><span class="dbminputlabel">Nome da Variavel</span></label>
                    <span class="focus-border"></span>
                </div><br>
            </div> <br> <br>
        </div>

    
 
            <br>
            <span class="dbminputlabel">Converter em</span><br>
            <select id="into" class="round" onchange="glob.onChange1(this)">
                    <optgroup label="Números">
                    <option value="0" selected>Número inteiro (Arredondado = Ex: 5.52 = 5)</option>
                    <option value="1">Número inteiro (Para cima - Ex: 5.52 = 6)</option>
                    <option value="2">Número inteiro (Para baixo - Ex: 5.52 = 5)</option>
                    <option value="20">Número inteiro mais próximo (Ex: 5.52 = 6)</option>
                    <option value="21">Número absoluto (Ex: -50.5 = 50.5)</option>
                    <option value="17">Número resumido para número (Ex: 1k = 1000)</option>
                    <option value="25">Número</option>
                    <option value="24">Número quebrado (Ex: 50.554554542 = 50.5 indicando as casas decimais)</option>
                    </optgroup>
                    <optgroup label="Números em String">
                    <option value="8">Número com pontuações (Ex: 1000 = 1.000)</option>
                    <option value="9">Número resumido (Ex: 1000 = 1k)</option>
                    <option value="16">Número resumido com pontuação (Ex: 1500 = 1.5k)</option>
                    </optgroup>
                    <optgroup label="Formatos">
                    <option value="10">Formato de dinheiro R$ (Real)</option>
                    <option value="11">Formato de dinheiro U$ (Dollar)</option>
                    <option value="12">Formato de dinheiro € (Euro)</option>
                    <option value="19">Formato de dinheiro ₽ (Ruble)</option>
                    <option value="18">Texto para JSON</option>
                    <option value="23">JSON para Texto</option>
                    <option value="22">Lista (Usar separador)</option>
                    </optgroup>
                    <optgroup label="Converter para String">
                    <option value="3">Texto</option>
                    <option value="4">Texto maiúsculo</option>
                    <option value="5">Texto minúsculo</option>
                    <option value="6">Texto sem espaços</option>
                    <option value="7">Texto (Sem espaços de ambos os lados)</option>
                    <option value="13">Texto sem acentos</option>
                    <option value="14">Texto começando com a letra maiúscula</option>
                    <option value="15">Texto espaçado</option>
                    </optgroup>
            </select>

            <div id="xinxa">
            <br>
                <div class="col-3 input-effect" style="width: 100%;">
                    <input id="valor" class="efeitoala" type="text" placeholder="Deixe em branco para desativar" style="padding:0px 5px;width: 100%;">
                    <label><span name="alternador" class="dbminputlabel">Caso retorne NaN coloque</span></label>
                    <span class="focus-border"></span>
                </div><br>
                <br>
            </div>

            <div id="xinxa2">
            <br>
                <div class="col-3 input-effect" style="width: 100%;">
                    <input id="separador" class="efeitoala" type="text" value="," style="padding:0px 5px;width: 100%;">
                    <label><span name="alternador2" class="dbminputlabel">Separador</span></label>
                    <span class="focus-border"></span>
                </div><br>
                <br>
            </div>
             
            <br>
       <div>
            <div style="float: left; width: 35%;">
            <span class="dbminputlabel">Armazenar em</span><br>
                <select id="storage" class="round">
                    ${data.variables[1]}
                </select>
            </div>
            <div id="varNameContainer2" style="float: right; width: 60%;">
                <div class="col-3 input-effect" style="width: 100%;">
                    <input id="varName2" class="efeitoala" type="text" style="padding:0px 5px;width: 100%;">
                    <label><span class="dbminputlabel">Nome da Variavel</span></label>
                    <span class="focus-border"></span>
                </div><br>
            </div>
        </div>

    <style>
        .codeblock {
            margin: 4px; background-color: rgba(0,0,0,0.20); border-radius: 3.5px; border: 1px solid rgba(255,255,255,0.15); padding: 4px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; transition: border 175ms ease;
        }
        .codeblock:hover{border:1px solid rgba(255,255,255,.45)}.text{color:#0ff}
        select.round{width:100%;border:0 solid #eee !important;border-radius:4px !important;box-sizing:border-box !important;display:block !important;height:28px !important;padding-left:8px !important;box-shadow:-2px 0 0 #fff;transition:box-shadow 150ms ease}
        select.round:focus{outline-width:0;box-shadow:0 1px 0 #0059ff;}
        .col-3 {border: 0px solid #eee;float: left; margin-top: 20px; margin-bottom: 6px; position: relative; background: rgba(0, 0, 0, 0.27); border-radius: 5px;}
        input[type="text"]{font: 15px/24px "Lato"; box-sizing: border-box; padding: 0 0 0 3px;}

        .efeitoala{border: 0; padding: 4px; border-bottom: 1px solid #ccc; background-color: transparent;}
        .efeitoala ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
        .efeitoala:focus ~ .focus-border,
        .has-content.efeitoala ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
        .efeitoala ~ label{position: absolute; left: 0%; width: 100%; top: -21px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
        .efeitoala:focus ~ label, .has-content.efeitoala ~ label{font-size: 12px; color: #4caf50; transition: 0.3s;}
    
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`
    },

    init: function () {
        const { glob, document } = this;

        glob.onChange1 = function (event) {
            const value = parseInt(event.value)
            const dom = document.getElementById('xinxa')
            const dom2 = document.getElementById('xinxa2')

            if (value == 0 || value == 1 || value == 2 || value == 20 || value == 21 || value == 17 || value == 24 || value == 25) {
                dom.style.display = null,
                    document.querySelector("[name='alternador']").innerText = (`Caso retorne NaN coloque`);
            } else {
                dom.style.display = "none"
            }
            if (value == 22) {
                dom2.style.display = null
            } else { dom2.style.display = "none" }

            if (value == 24) {
                dom2.style.display = null,
                    document.querySelector("[name='alternador2']").innerText = (`Casas decimais`);
            }

        };
        glob.onChange1(document.getElementById('into'))

        glob.onChange2 = function (event) {
            const value = parseInt(event.value, 10);
            if (value == 0) {
                document.getElementById("texto").style.display = null;
                document.getElementById("textoeval").style.display = "none";
                document.getElementById("variavel").style.display = "none";
            }
            if (value == 1) {
                document.getElementById("texto").style.display = "none";
                document.getElementById("textoeval").style.display = null;
                document.getElementById("variavel").style.display = "none";
            }
            if (value == 2) {
                document.getElementById("texto").style.display = "none";
                document.getElementById("textoeval").style.display = "none";
                document.getElementById("variavel").style.display = null;
            }
        };

        glob.onChange2(document.getElementById('tipo'))

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


    action: function (cache) {
        const data = cache.actions[cache.index]
        const tipo = this.evalMessage(data.tipo, cache)
        const separador = this.evalMessage(data.separador, cache)

        theVar = this.evalMessage(data.vAria, cache)

        if (tipo == "1") {
            theVar = this.evalMessage(data.vAriaeval, cache)
            try {
                theVar = this.eval(theVar, cache);
            } catch (e) {
                this.displayError(data, cache, e);
            }
        }

        if (tipo == "2") {
            const type = parseInt(data.storage0, 10);
            const varName0 = this.evalMessage(data.varName0, cache);
            theVar = this.getVariable(type, varName0, cache);
        }


        valor = this.evalMessage(data.valor, cache)
        INTO = parseInt(data.into)
        let result

        switch (INTO) {
            case 0:
                result = parseInt(theVar.toString().replace(",", "."));

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 1:
                result = Math.ceil(parseFloat(theVar.toString().replace(',', '.')));

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 2:
                result = Math.floor(parseFloat(theVar.toString().replace(',', '.')));

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 3:
                result = theVar.toString();
                break;
            case 4:
                result = theVar.toString().toUpperCase();
                break;
            case 5:
                result = theVar.toString().toLowerCase();
                break;
            case 6:
                result = theVar.toString().split(' ').join('');
                break;
            case 7:
                result = theVar.toString().trim();
                break;
            case 8:
                if (isNaN(parseFloat(theVar))) {
                    result = theVar;
                } else {
                    result = parseFloat(theVar).toLocaleString("pt-BR");
                }
                break;
            case 9:
                var number = parseInt(this.evalMessage(theVar, cache));

                if (number >= 1000 && number <= 999999) {
                    number = number.toString().slice(0, -3) + "k";
                }

                if (number >= 1e+6 && number <= 999999999) {
                    number = number.toString().slice(0, -6) + "m";
                }

                if (number >= 1e+9 && number <= 999999999999) {
                    number = number.toString().slice(0, -9) + "b";
                }

                if (number >= 1e+12 && number <= 999999999999999) {
                    number = number.toString().slice(0, -12) + "t";
                }
                if (number >= 1e+15 && number <= 999999999999999999) {
                    number = number.toString().slice(0, -15) + "q";
                }
                if (number >= 1e+18 && number <= 999999999999999999999) {
                    number = number.toString().slice(0, -18) + "sx";
                }
                if (number >= 1e+21 && number <= 999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "sp";
                }
                if (number >= 1e+24 && number <= 999999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "o";
                }
                if (number >= 1e+27 && number <= 999999999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "n";
                }
                if (number >= 1e+30 && number <= 999999999999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "d";
                }
                if (number >= 1e+33 && number <= 999999999999999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "u";
                }
                if (number >= 1e+36 && number <= 999999999999999999999999999999999999999) {
                    number = number.toString().slice(0, -4) + "du";
                }
                if (number >= 1e+39) {
                    number = number.toString().slice(0, -4) + "tr";
                }
                result = number;
                break;
            case 10:
                let money = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });
                result = money.format(theVar.toString().replace(',', '.'))
                break;
            case 11:
                let money2 = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                });
                result = money2.format(theVar.toString().replace(',', '.'))
                break;
            case 12:
                let money3 = Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                });
                result = money3.format(theVar.toString().replace(',', '.'))
                break;
            case 13:
                const comAcentos = "ÄÅÁÂÀÃĀĂĄāăąäáâàãÉÊËÈĖĘĚĔĒėęěĕēéêëèÍÎÏÌİĮĪıįīíîïìÖÓÔÒÕŐŌőōöóôòõÜÚÛŲŰŮŪųűůūüúûùÇĆČçćčÑŇŅŃñňņńŸÝÿýŹŻŽźżžŁĽĻĹłľļĺĶķĢĞģğĎďŚŠŞśšşŤȚŢťțţŔŘŕř";
                const semAcentos = "AAAAAAAAAaaaaaaaaEEEEEEEEEeeeeeeeeeIIIIIIIiiiiiiiOOOOOOOoooooooUUUUUUUuuuuuuuuCCCcccNNNNnnnnYYyyZZZzzzLLLLllllKkGGggDdSSSsssTTTtttRRrr";

                result = theVar.toString();

                for (var i = 0; i <= comAcentos.length; i++) {
                    result = result.replaceAll(comAcentos[i], semAcentos[i]);
                }
                break;
            case 14:
                const convertor = theVar[0].toUpperCase() + theVar.substring(1);
                result = convertor;
                break;
            case 15:
                result = theVar.toString().replaceAll("", " ");
                break;
            case 16:
                var number = parseInt(this.evalMessage(theVar, cache));

                if (number >= 1000 && number <= 999999) {
                    number = number / 1000
                    number = number + "k";
                }

                if (number >= 1e+6 && number <= 999999999) {
                    number = number / 1000000
                    number = number + "m";
                }

                if (number >= 1e+9 && number <= 999999999999) {
                    number = number / 1000000000
                    number = number + "b";
                }

                if (number >= 1e+12 && number <= 999999999999999) {
                    number = number / 1e+12
                    number = number + "t";
                }

                if (number >= 1e+15 && number <= 999999999999999999) {
                    number = number / 1e+15
                    number = number + "q";
                }

                if (number >= 1e+18 && number <= 999999999999999999999) {
                    number = number / 1e+18
                    number = number + "sx";
                }

                if (number >= 1e+21 && number <= 999999999999999999999999) {
                    number = number / 1e+21
                    number = number + "sp";
                }

                if (number >= 1e+24 && number <= 999999999999999999999999999) {
                    number = number / 1e+24
                    number = number + "o";
                }

                if (number >= 1e+27 && number <= 999999999999999999999999999999) {
                    number = number / 1e+27
                    number = number + "n";
                }

                if (number >= 1e+30 && number <= 999999999999999999999999999999999) {
                    number = number / 1e+30
                    number = number + "d";
                }

                if (number >= 1e+33 && number <= 999999999999999999999999999999999999) {
                    number = number / 1e+33
                    number = number + "u";
                }

                if (number >= 1e+36 && number <= 999999999999999999999999999999999999999) {
                    number = number / 1e+36
                    number = number + "du";
                }

                if (number >= 1e+39) {
                    number = number / 1e+39
                    number = number + "tr";
                }



                result = number


                break;
            case 17:
                var number = this.evalMessage(theVar, cache);
                number = number.toString();

                if (number.toString().endsWith("k")) {
                    number = number.slice(0, -1) * 1000;
                }

                if (number.toString().endsWith("m")) {
                    number = number.slice(0, -1) * 1e+6;
                }

                if (number.toString().endsWith("b")) {
                    number = number.slice(0, -1) * 1e+9;
                }

                if (number.toString().endsWith("t")) {
                    number = number.slice(0, -1) * 1e+12;
                }

                if (number.toString().endsWith("q")) {
                    number = number.slice(0, -1) * 1e+15;
                }

                if (number.toString().endsWith("sx")) {
                    number = number.slice(0, -1) * 1e+18;
                }

                if (number.toString().endsWith("sp")) {
                    number = number.slice(0, -1) * 1e+21;
                }

                if (number.toString().endsWith("o")) {
                    number = number.slice(0, -1) * 1e+24;
                }

                if (number.toString().endsWith("n")) {
                    number = number.slice(0, -1) * 1e+27;
                }

                if (number.toString().endsWith("d")) {
                    number = number.slice(0, -1) * 1e+30;
                }

                if (number.toString().endsWith("u")) {
                    number = number.slice(0, -1) * 1e+33;
                }

                if (number.toString().endsWith("du")) {
                    number = number.slice(0, -1) * 1e+36;
                }

                if (number.toString().endsWith("tr")) {
                    number = number.slice(0, -1) * 1e+39;
                }

                result = parseFloat(number);

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 18:
                result = JSON.parse(theVar)
                break;
            case 19:
                let money4 = Intl.NumberFormat("Ru-ru", {
                    style: "currency",
                    currency: "RUB",
                });
                result = money4.format(theVar.toString())
                break;
            case 20:
                result = Math.round(parseFloat(theVar.toString().replace(',', '.')));

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 21:
                result = Math.abs(parseFloat(theVar.toString().replace(',', '.')));

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }

                break;
            case 22:
                result = theVar.toString().split(new RegExp(separador))
                break;
            case 23:
                result = JSON.stringify(theVar)
                break;
            case 24:
                result = theVar.toFixed(parseFloat(separador))

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }
                break;
            case 25:
                result = parseFloat(theVar)

                if (valor) {
                    if (result.toString() == "NaN") {
                        result = parseFloat(valor)
                    }
                }
                break;
        }
        if (result !== undefined) {
            const storage = parseInt(data.storage);
            const varName2 = this.evalMessage(data.varName2, cache);
            this.storeValue(result, storage, varName2, cache);
        }
        this.callNextAction(cache);
    },

    mod: function (DBM) {
    }

};
