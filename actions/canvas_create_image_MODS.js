module.exports = {
  name: 'Canvas Create Image MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    return `${data.url}`
  },

  subtitle(data, presets) {
    const storage = presets.variables;

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.url} ~ ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['url', 'width', 'height', 'iffalse', 'iffalseVal', 'storage', 'varName', 'descriptioncolor', 'description', 'descriptionx', 'actionsno'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.3</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>


  <span class="dbminputlabel">Local/Web URL</span><br>
  <input id="url" class="round" type="text" value="resources/"><br>


<div style="overflow:hidden;padding:4px 0px 0px 0px">

  <div style="float: left; width: 50%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Largura (px ou %)</span><br>
    <input id="width" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px">
  <span class="dbminputlabel">Altura (px ou %)</span><br>
    <input id="height" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>

</div>


  <div style="overflow:hidden;padding:4px 0px 0px 0px">
<div style="float: left; width: 38%" id="xinext">
<span class="dbminputlabel">Se a imagem falhar</span><br>
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
<action-list-input id="actionsno" min-height="100" height="calc(100vh - 350px)"></action-list-input>
</div>
</div>


<br>

<div style="overflow:hidden;padding:4px 0px 0px 0px">

  <div style="float: left; width: 38%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>

  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text"><br>
  </div>

  </div>


</div>

<style>
table{width:100%}
.col1{width:38%;padding:0px 10px 0px 0px}
.col2{width:60%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.xinelaslink{margin-top:-4px}
.xinelaslink:hover{opacity:0.8 !important}
</style>
`
  },

  init: function () {
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
    const data = cache.actions[cache.index]
    const Canvas = require('canvas')
    try {
      await Canvas.loadImage(this.evalMessage(data.url, cache)).then((image) => {
        var scalex = this.evalMessage(data.width, cache)
        var scaley = this.evalMessage(data.height, cache)
        if (scalex == '') { scalex = "100%" }
        if (scaley == '') { scaley = "100%" }
        let imagew = image.width
        let imageh = image.height
        let scalew = 1
        let scaleh = 1
        scale(scalex, scaley)
        const canvas = Canvas.createCanvas(imagew, imageh)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, imagew, imageh)
        const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        const varName = this.evalMessage(data.varName, cache)
        const storage = parseInt(data.storage)
        this.storeValue(result, storage, varName, cache)
        this.callNextAction(cache)

        function scale(w, h) {
          if (w.endsWith('%')) {
            const percent = w.replace('%', '')
            scalew = parseInt(percent) / 100
          } else {
            scalew = parseInt(w) / imagew
          }
          if (h.endsWith('%')) {
            const percent = h.replace('%', '')
            scaleh = parseInt(percent) / 100
          } else {
            scaleh = parseInt(h) / imageh
          }
          imagew *= scalew
          imageh *= scaleh
        }

      })
    }
    catch (err) { 

            if (data.iffalse == "5" || data.iffalse == "6") {

        if (data.iffalse == "5") {
          this.executeSubActions(data.actionsno, cache)
        } else {
          this.executeSubActionsThenNextAction(data.actionsno, cache)
        }

      } else {
        this.executeResults(false, data, cache);
      }
    
    }


  },

  modInit(data) {
    this.prepareActions(data.actionsno);
  },

  mod() { }
}
