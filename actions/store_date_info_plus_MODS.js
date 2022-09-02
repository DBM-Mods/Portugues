module.exports = {

   
    name: "Store Date Info Plus MOD",
    section: "Other Stuff",
    meta: {
        version: '2.1.6',
        preciseCheck: true,
        author: '[XinXyla - 172782058396057602]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
      },
   
    subtitle: function(data) {
        const info = ['Dia da semana', 'Dia (número)', 'Dia do ano', 'Semana do ano', 'Mês do ano', 'Mês (número)', 'Ano', 'Hora', 'Minutos', 'Segundos', 'Milissegundos', 'Fuso horário', 'Unix Timestamp', 'Data completa']
        const storage = ['', 'Variável Temporária', 'Variável Servidor', 'Variável Global']
        return `${data.modeStorage === "0" ? '"' + info[data.info] + '"' : data.buildInput === "" ? '"Não configurado"' : '"' + data.buildInput + '"'} de uma data ~ ${storage[data.storage]}`;
    },
    
 
    short_description: "Armazena algo de uma data de forma mais completa!",
    
    variableStorage: function (data, varType) {
        const type = parseInt(data.storage);
        if (type !== varType) return;
        let dataType = 'Date';
        return ([data.varName, dataType]);
    },
        
    fields: ["sourceDate", "dateLanguage", "modeStorage", "info", "buildInput", "storage", "varName"],
    
        html: function(isEvent, data) {
        return `
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

        <div style="float: left; width: 62%;margin:0px 4px;">
        <span class="dbminputlabel">Data de origem</span><br>
            <input id="sourceDate" class="round" type="text" placeholder="Ex: Sun Oct 26 2019 10:38:01 GMT+0200">
        </div>
        <div style="float: right; width: 35%">
        <span class="dbminputlabel">Idioma da data (iniciais)</span><br>
           <input id="dateLanguage" class="round" placeholder='O padrão é "en" (Inglês)'>
        </div><br><br><br>
        <div style="float: left; width: 35%; margin:0px 4px">
        <span class="dbminputlabel">Modo</span><br>
            <select id="modeStorage" class="round" onchange="glob.onChangeMode(this)">
                <option value="0" selected>Selecionar</option>
                <option value="1">Construir</option>
            </select>
        </div>
        <div id="selectMode" style="display: none; float: right; width: 62%">
        <span class="dbminputlabel">Informação</span><br>
            <select id="info" class="round">
                <option value="0" selected>Dia da semana</option>
                <option value="1">Dia [número]</option>
                <option value="2">Dia do ano [número]</option>
                <option value="3">Semana do ano [número]</option>
                <option value="4">Mês do ano</option>
                <option value="5">Mês [número]</option>
                <option value="6">Ano</option>
                <option value="7">Hora</option>
                <option value="8">Minutos</option>
                <option value="9">Segundos</option>
                <option value="10">Milissegundos</option>
                <option value="11">Fuso horário</option>
                <option value="12">Unix Timestamp</option>
                <option value="13">Data completa</option>
            </select>
        </div>
        <div id="buildMode" style="display: none; float: right; width: 62%">
        <span class="dbminputlabel">Construir (<span class="wrexlink" data-url="https://momentjs.com/docs/#/displaying/format/">Documento</span>)</span><br>
            <input id="buildInput" class="round" placeholder="Ex: DD/MM/YYYY [às] HH:mm:ss">
        </div><br><br><br>
        <div style="float: left; width: 35%;margin:0px 4px">
        <span class="dbminputlabel">Armazenar em</span><br>
            <select id="storage" class="round">
                ${data.variables[1]}
            </select>
        </div>
        <div id="varNameContainer" style="float: right; width: 62%">
        <span class="dbminputlabel">Nome da variável</span><br>
            <input id="varName" class="round" type="text">
        </div><br><br><br>
        <div id="noteContainer" style="display: none; padding-top: 16px">
            <b>Nota:</b> Você pode usar colchetes para colocar o texto em <b>Construir</b><br>
            <b>Ex:</b> <span id="code">DD/MM/YYYY [ás] HH:mm:ss</span> = <span id="code">30/01/2022 ás 13:38:20</span>
        </div>
        <style>
             span.wrexlink {
		color: #99b3ff;
		text-decoration: underline;
                cursor: pointer
            }

	     span.wrexlink:hover { 
                color:#4676b9
            }

            #code {
                background: #2C313C;
                color: white;
                padding: 3px;
                font-size: 12px;
                border-radius: 2px
              }
        </style>
        `
    },

    
    init: function() {
        const {glob, document} = this;

        glob.onChangeMode = function(modeStorage) {
            switch(parseInt(modeStorage.value)) {
                case 0:
                    document.getElementById("selectMode").style.display = null;
                    document.getElementById("buildMode").style.display = "none";
                    document.getElementById("noteContainer").style.display = "none";
                    break;
                case 1:
                    document.getElementById("selectMode").style.display = "none";
                    document.getElementById("buildMode").style.display = null;
                    document.getElementById("noteContainer").style.display = null;
                    break;
                }
            }

        glob.onChangeMode(document.getElementById("modeStorage"));

        var wrexlinks = document.getElementsByClassName("wrexlink")
        for(var x = 0; x < wrexlinks.length; x++) {
          
          var wrexlink = wrexlinks[x];
          var url = wrexlink.getAttribute('data-url');   
          if (url) {
            wrexlink.setAttribute("title", url);
            wrexlink.addEventListener("click", function(e){
              e.stopImmediatePropagation();
              console.log("Launching URL: [" + url + "] in your default browser.")
              require('child_process').execSync('start ' + url);
            });
          }   
        }  
    },
    

    
    action: function(cache) {
        const data = cache.actions[cache.index];
        const moment = require("moment");
        const dateLanguage = this.evalMessage(data.dateLanguage, cache);
        const date = moment(Date.parse(this.evalMessage(data.sourceDate, cache)), "", dateLanguage === "" ? "en" : dateLanguage);
        const buildInput = this.evalMessage(data.buildInput, cache);
        const modeType = parseInt(this.evalMessage(data.modeStorage, cache));
        const info = parseInt(data.info);

        let result;
        
        if (modeType === 0) {
            switch(info) {
                case 0:
                    result = date.format("dddd");
                    break;
                case 1:
                    result = date.format("DD");
                    break;
                case 2:
                    result = date.format("DDD");
                    break;
                case 3:
                    result = date.format("ww");
                    break;
                case 4:
                    result = date.format("MMMMM");
                    break;
                case 5:
                    result = date.format("MM");
                    break;
                case 6:
                    result = date.format("YYYY");
                    break;
                case 7:
                    result = date.format("hh");
                    break;
                case 8:
                    result = date.format("mm");
                    break;
                case 9:
                    result = date.format("ss");
                    break;
                case 10:
                    result = date.format("SS");
                    break;
                case 11:
                    result = date.format("ZZ");
                    break;
                case 12:
                    result = date.format("X");
                    break;
                case 13:
                    result = date.format("DD/MM/YYYY HH:mm:ss");
                    break;
               }
          } else {
             result = date.format(buildInput);
          }

          if (result === "Data invalida") {
             return console.log('Data inválida! Verifique se sua data é válida em "Store Date Info Plus". Uma Data geralmente se parece com a armazenada na "Data de Criação" de um servidor. (as variáveis funcionam)');
          }
    
          if (result !== undefined) {
              const storage = parseInt(data.storage);
              const varName = this.evalMessage(data.varName, cache);
              this.storeValue(result, storage, varName, cache);
          }
	   
        this.callNextAction(cache);
    },
    

    
    mod: function(DBM) {
    }
    
    };
    
