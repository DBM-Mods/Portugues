module.exports = {

  name: "Create PDF MOD",
  section: "Other Stuff",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Salvar pdf em ${data.filePath}</font>`

  },



  fields: ["descriptioncolor", "description", "descriptionx", "html", "filePath", "pdfname", "iffalse", "iffalseVal", "actionsError"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">


    <tab-system>
    <tab label="Ação" icon="wizard">
    <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">


    <span class="dbminputlabel">Código HTML</span><br>
    <textarea id="html" rows="12" style="width: 100%; font-family: monospace; white-space: nowrap;height: calc(100vh - 260px)">
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Meu PDF&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Conteúdo do PDF gerado&lt;/h1&gt;
&lt;p&gt;Isso é um exemplo de PDF gerado a partir de HTML&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
</textarea>

  


    </div>
    </tab>

    
    <tab label="Config" icon="settings">
    <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">

   
    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<span class="dbminputlabel">Nome do PDF</span><br>
<input id="pdfname" class="round" type="text" placeholder="" value="documento">

<br>

<span class="dbminputlabel">Local para armazenar o PDF</span><br>
<input id="filePath" class="round" type="text" placeholder="./resources/" value="./resources/">


<br>

<div style="overflow:hidden;padding:4px 0px 0px 0px">
<div style="float: left; width: 38%" id="xinext">
<span class="dbminputlabel">Em caso de erro</span><br>
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
    </tab>
</tab-system>
    


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

  },


  async action(cache) {
    const data = cache.actions[cache.index];

    try {

      filePath = this.evalMessage(data.filePath, cache);
      namePath = this.evalMessage(data.pdfname, cache);

      const { ReadableStream } = require('web-streams-polyfill');
      if (typeof global.ReadableStream === 'undefined') {
        global.ReadableStream = ReadableStream;
      }


      const puppeteer = require('puppeteer');
      const fs = require('fs');
  
      code = this.evalMessage(data.code, cache);
      const htmlContent = this.evalMessage(data.html, cache);



      async function generatePDF(htmlContent, outputPath) {
        const browser = await puppeteer.launch({
          headless: true,
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        await page.pdf({ path: outputPath, format: 'A4' });
        await browser.close();
      }

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {
          recursive: true
        });
      }

      const outputPath = `${filePath}${namePath}.pdf`


      await generatePDF(htmlContent, outputPath)


      this.callNextAction(cache);


    } catch (err) {

      this.displayError(data, cache, err)

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

  modInit(data) {
    this.prepareActions(data.actionsError);
  },


  mod() { },
};
