
  module.exports = {
    name: 'Get Text From Image MOD',
    section: 'Other Stuff',
    meta: {
      version: '2.1.7',
      preciseCheck: true,
      author: '[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },
     
  subtitle(data, presets) {

    if(data.descriptionx == true){
      desccor = data.descriptioncolor
      } else {
        desccor = 'none'
      }

    const storage = presets.variables;

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">Obter texto da imagem "${data.image}" e armazenar em ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },


    variableStorage (data, varType) {
      const type = parseInt(data.storage)
      if (type !== varType) return
      return ([data.varName, 'Texto'])
    },
  
    fields: ["image", "lang", "storage", "debug", "varName","descriptioncolor","description","descriptionx","iffalse", "iffalseVal", "errcmd", "errs", "errv", "actionserr"], 

    html(data, isEvent) {
      return `
      <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
      <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>
  
      <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">
  
      <div id="flutuador" style="padding:0px 0px 15px 0px">
  <table style="width:100%;"><tr>
  <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
  <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
  </tr></table>
  </div>
      
        <span class="dbminputlabel">Local/Web URL da imagem</span><br>
        <input id="image" class="round" type="text"><br>

        <table style="width:100%"><tr><td style="padding:0px 4px 0px 0px">
        <span class="dbminputlabel">língua do texto da imagem</span><span class="xinelaslink dbminputlabel" style="float:right" data-url="https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016">Prefixo das Linguas</span><br>
        <input id="lang" class="round" value="por" type="text"><br>

        </td><td>

        <span class="dbminputlabel">Mostrar progresso</span><br>
        <select id="debug" class="round">
        <option value="0" selected>Não</option>
          <option value="1">Sim</option>
        </select><br>
        </td></tr></table>

      
        
        <store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>

        <br><br><br>

        <span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(50,50,50,0.5)">
<dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
</div>

<br>


      <div>
      <div style="float: left; width: 38%" id="xinext">
      <span class="dbminputlabel">Se ocorrer um erro</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selected>Continuar ações</option>
      <option value="1">Parar sequência de ação</option>
      <option value="2">Ir para a ação</option>
      <option value="3">Pular as próximas ações</option>
      <option value="4">Ir para a âncora de ação</option>
      <option value="5">Realizar ações e parar</option>
      <option value="6">Realizar ações e continuar</option>
      </select>
      <br>
      </div>
      <div id="iffalseContainer" style="display: none; float: right; width: 60%;"><div id="xincontrol"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
      </div><br></div>
      <div id="containerxin" style="width:100%">
      <br><br>
      <action-list-input id="actionserr" height="calc(100vh - 450px)"></action-list-input>
      </div>


        </div>

        <style>
span.xinelaslink {
  color: #99b3ff;
  text-decoration:none;
  cursor:pointer;
  height:20px;
}

span.xinelaslink:hover {
  color:#4676b9;
}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
    },


    init () {
      const { document } = this
  
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

      glob.onComparisonChanged2 = function (event) {
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
  
      glob.onComparisonChanged2(document.getElementById("iffalse"));
      glob.variableChange(document.getElementById('errs'), 'varerrsv');
  
    },
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const image = this.evalMessage(data.image, cache)
      const lang = this.evalMessage(data.lang, cache)

      try {
      const Tesseract = require('tesseract.js');

      Tesseract.recognize(image, lang, { logger: m => { if(data.debug == "1"){console.log(m)}} })
      .then(({ data: { text } }) => {
        this.storeValue(text, parseInt(data.storage, 10), data.varName, cache); this.callNextAction(cache);
  })
  .catch((err) => {
 
      if (data.errcmd === true) {
        console.log('ERROR: ' + cache.toString() + ' - Action ' + (cache.index + 1) + '# ' + data.name)
        console.log(err)
      }

      this.storeValue(err.original, parseFloat(data.errs), this.evalMessage(data.errv, cache), cache)

      if (data.iffalse == "5" || data.iffalse == "6") {

        if (data.iffalse == "5") {
          this.executeSubActions(data.actionserr, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionserr, cache)
        }

      } else {
        this.executeResults(false, data, cache);
      }

  });
  
      } catch (error) {

        if (data.errcmd === true) {
          console.log('ERROR: ' + cache.toString() + ' - Action ' + (cache.index + 1) + '# ' + data.name)
          console.log(`${error.stack ? error.stack : error}`)
        }
  
        this.storeValue(error, parseFloat(data.errs), this.evalMessage(data.errv, cache), cache)
  
        if (data.iffalse == "5" || data.iffalse == "6") {
  
          if (data.iffalse == "5") {
            this.executeSubActions(data.actionserr, cache)
          } else {
            this.executeSubActionsThenNextAction(data.actionserr, cache)
          }
  
        } else {
          this.executeResults(false, data, cache);
        }
      }
  




  },
  
    mod() {},
  };
