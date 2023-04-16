module.exports = {

   
    name: "Store Date Info Plus MOD",
    section: "Other Stuff",
    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[XinXyla - 172782058396057602]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
      },
   
    subtitle: function(data) {

        if(data.descriptionx == true){
            desccor = data.descriptioncolor
            } else {
              desccor = 'none'
            }

        const info = ['Dia da semana', 'Dia (número)', 'Dia do ano', 'Semana do ano', 'Mês do ano', 'Mês (número)', 'Ano', 'Hora', 'Minutos', 'Segundos', 'Milissegundos', 'Fuso horário', 'Unix Timestamp', 'Data completa']
        const storage = ['', 'Variável Temporária', 'Variável Servidor', 'Variável Global']
        const formato = ['uma Data', 'um timestamp', 'um timestamp milissegundos']
        return data.description
        ? `<font style="color:${desccor}">${data.description}</font>`
        : `<font style="color:${desccor}">${data.modeStorage === "0" ? '"' + info[data.info] + '"' : data.buildInput === "" ? '"Não configurado"' : '"' + data.buildInput + '"'} de ${formato[data.formato]||'uma data'} ~ ${storage[data.storage]}</font>`
      },
    
 
    short_description: "Armazena algo de uma data de forma mais completa!",
    
    variableStorage: function (data, varType) {
        const type = parseInt(data.storage);
        if (type !== varType) return;
        let dataType = 'Date';
        return ([data.varName, dataType]);
    },
        
    fields: ["formato", "timezone", "soma", "sourceDate", "dateLanguage", "format", "modeStorage", "info", "buildInput", "storage", "varName","descriptioncolor","description","descriptionx"],
    
        html: function(isEvent, data) {
        return `
        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.7</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

        <div style="float: left; width: 50%;" id="manipulador">
        <span class="dbminputlabel">Formato</span><br>
        <select id="formato" class="round" onchange="glob.onChangeMode2(this)">
            <option value="0" selected>Data</option>
            <option value="1">Timestamp</option>
            <option value="2">Timestamp milissegundos</option>
            <option value="3">Data em um formato</option>
        </select>
        </div>
        <div style="float: right; width: 48%" id="dataxin">
        <span class="dbminputlabel">Idioma da data (iniciais)</span><br>
        <input id="dateLanguage" class="round" placeholder='O padrão é "en" (Inglês)'>
        </div>
<br><br><br>
        <div style="float: left;width: 50%" id="manipulador2">
        <span class="dbminputlabel" name="xinelas">Data de origem</span><br>
            <input id="sourceDate" class="round" type="text" placeholder="Deixe em branco para a data atual">
        </div>
        <div style="float: right;width: 48%" id="dataxin3">
        <span class="dbminputlabel">Formato da Data</span><br>
        <input id="format" class="round" value="DD/MM/YYYY HH:mm:ss" placeholder='DD/MM/YYYY HH:mm:ss'>
        </div>
        <div style="float: right; width: 48%" id="dataxin2">
        <span class="dbminputlabel">Adicionar segundos</span><br>
           <input id="soma" class="round" value="0" placeholder='Ex: 86400 para +1 dia'>
        </div>
        <br><br><br>
        <div style="float: left; width: 35%">
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
        <span class="dbminputlabel">Construir (<span class="xinelaslink" data-url="https://momentjs.com/docs/#/displaying/format/">Documento</span>)</span><br>
            <input id="buildInput" class="round" placeholder="Ex: DD/MM/YYYY [às] HH:mm:ss">
        </div><br><br><br>
        <span class="dbminputlabel">Timezone (<span class="xinelaslink" data-url="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Timezones</span>)</span><br>
        <input id="timezone" class="round" type="text" value="America/Sao_Paulo" placeholder="Ex: America/Sao_Paulo ou deixe vazio para o local">
        <br>

        <div style="float: left; width: 35%">
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

        </div>
        <style>
             span.xinelaslink {
		color: #99b3ff;
		text-decoration: underline;
                cursor: pointer
            }

	     span.xinelaslink:hover { 
                color:#4676b9
            }

            #code {
                background: #2C313C;
                color: white;
                padding: 3px;
                font-size: 12px;
                border-radius: 2px
              }
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

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

        glob.onChangeMode2 = function(event) {
            const value = parseInt(event.value);
            if (value == 0) {
                document.querySelector("[name='xinelas']").innerText = (`Data de origem`);
                document.getElementById("dataxin").style.display = null;
                document.getElementById("dataxin2").style.display = "none";
                document.getElementById("manipulador").style.width = "50%";
                document.getElementById("manipulador2").style.width = "100%";
                document.getElementById("dataxin3").style.display = "none";
            }
            if (value == 1) {
                document.querySelector("[name='xinelas']").innerText = (`Timestamp`);
                document.getElementById("dataxin").style.display = "none";
                document.getElementById("dataxin2").style.display = null;
                document.getElementById("manipulador").style.width = "100%";
                document.getElementById("manipulador2").style.width = "50%";
                document.getElementById("dataxin3").style.display = "none";
            }
            if (value == 2) {
                document.querySelector("[name='xinelas']").innerText = (`Timestamp milissegundos`);
                document.getElementById("dataxin").style.display = "none";
                document.getElementById("dataxin2").style.display = null;
                document.getElementById("manipulador").style.width = "100%";
                document.getElementById("manipulador2").style.width = "50%";
                document.getElementById("dataxin3").style.display = "none";
            }
            if (value == 3) {
                document.querySelector("[name='xinelas']").innerText = (`Data de origem`);
                document.getElementById("dataxin").style.display = null;
                document.getElementById("dataxin2").style.display = "none";
                document.getElementById("manipulador").style.width = "50%";
                document.getElementById("manipulador2").style.width = "50%";
                document.getElementById("dataxin3").style.display = null;
            }
            }

        glob.onChangeMode2(document.getElementById("formato"));

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
    

    
    action: function(cache) {
        const data = cache.actions[cache.index];
        moment = require("moment");

        const format = this.evalMessage(data.format, cache) || "DD/MM/YYYY HH:mm:ss";

        var soma = parseFloat(this.evalMessage(data.soma, cache))
        if(data.soma == "" || data.soma == undefined || data.soma == "undefined" || data.soma == "NaN" || data.soma == NaN){
        soma = 0
        }

        if(data.sourceDate == ""){

        if(data.formato == "0"){
        sourceDate = new Date
        }
        if(data.formato == "1"){
        const datar =  moment(Date.parse(new Date))
        sourceDate = parseFloat(datar.format("X")) + soma
        }
        if(data.formato == "2"){
        const datar =  moment(Date.parse(new Date))
        sourceDate = parseFloat(datar.format("X")) + soma
        }
        if(data.formato == "3"){
        sourceDate = new Date
        }

        } else {

        if(data.formato == "0"){
        sourceDate = this.evalMessage(data.sourceDate, cache)
        }
        if(data.formato == "1"){
        sourceDate = parseFloat(this.evalMessage(data.sourceDate, cache)) + soma
        }
        if(data.formato == "2"){
        sourceDate = parseFloat(this.evalMessage(data.sourceDate, cache)) + soma*1000
        }
        if(data.formato == "3"){
        sourceDate = this.evalMessage(data.sourceDate, cache)
        }
        }

        timezone = this.evalMessage(data.timezone, cache);
        timezonegat = "on"
        if(timezone == "" || timezone == "undefined" || timezone == undefined){timezonegat = "off"}

        if (data.formato == "0" || data.formato == undefined || data.formato == "undefined"){
        dateLanguage = this.evalMessage(data.dateLanguage, cache);
        date = moment(Date.parse(sourceDate), "", dateLanguage === "" ? "en" : dateLanguage)
        
        if(timezonegat == "on"){
            moment = require("moment-timezone");
            date.tz(timezone)}
        }

        if(data.formato == "1" || data.formato == "2"){

        toDate = require('normalize-date')

        if(data.formato == "2"){

            if(data.sourceDate == ""){
            date = sourceDate
            } else {
            datafonte = parseFloat(sourceDate)
            date = Math.floor(datafonte/1000)}
        } 
        else { date = sourceDate }
        
        if (/^\d+(?:\.\d*)?$/.exec(date)) { unix = toDate((+date).toFixed(3)) }
        else { unix = toDate(date) }

         date = moment(unix)
         if(timezonegat == "on"){
            moment = require("moment-timezone");
            date.tz(timezone)}

        }

        if (data.formato == "3"){
            dateLanguage = this.evalMessage(data.dateLanguage, cache);
            date = moment(sourceDate, format, dateLanguage === "" ? "en" : dateLanguage)
            
            if(timezonegat == "on"){
                moment = require("moment-timezone");
                date.tz(timezone)}
            }


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
    
