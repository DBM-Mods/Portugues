module.exports = {
  name: 'Canvas Save Image MOD',
  section: 'Image Editing',
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
      : `<font style="color:${desccor}">Salvar em "${data.Path}${data.fileName}"</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage2)
    if (type !== varType) return
    return ([data.varName2, 'Image URL'])
  },

  fields: ['storage', 'varName', 'Path', 'fileName', 'storage2', 'varName2', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
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

<div>
  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Imagem Canvas</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="padding-left: 2%; float: left; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Pasta (Salvar no Local)</span><br>
    <input id="Path" class="round" value="./resources/" type="text" placeholder="./resources/"><br>
  </div>
</div><br><br>
<span class="dbminputlabel">Nome do arquivo + Formato</span><br>
<input id="fileName" class="round" value="imagem.png" type="text" placeholder="imagem.png">
<br>
<div>
  <div style="float: left; width: 40%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage2" onchange="glob.onComparisonChanged(this)" class="round">
      ${data.variables[0]}
    </select><br>
  </div>
  <div style="padding-left: 2%; float: left; width: 60%;" id="containerxin">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName2" class="round" type="text"><br>
  </div>
</div>

</div>

<style>
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.xinelaslink{margin-top:-4px}
.xinelaslink:hover{opacity:0.8 !important}
</style>`
  },

  init() {
    const { document, glob } = this

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
      if (event.value == 0) {
        document.getElementById("containerxin").style.display = "none";
      } else { document.getElementById("containerxin").style.display = "block"; }
    };

    glob.onComparisonChanged(document.getElementById("storage2"));
    glob.refreshVariableList(document.getElementById('storage'))
  },

  action(cache) {
    const data = cache.actions[cache.index]
    fs = require('fs-extra')
    const Canvas = require('canvas')
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    const canvas = Canvas.createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    const buffer = canvas.toBuffer()
    Path = this.evalMessage(data.Path, cache)
    const fileName = this.evalMessage(data.fileName, cache)
  
    if (fileName) {
      if (!fs.existsSync(Path) && Path) {
        fs.mkdirSync(Path, {
          recursive: true
        });
      }
      Path += fileName
    }
    if (Path) {
      fs.writeFileSync(Path, buffer)
      const varName2 = this.evalMessage(data.varName2, cache)
      const storage2 = parseInt(data.storage2)
      if (varName2 && storage2) {
        this.storeValue(Path, storage2, varName2, cache)
      }
    }
    this.callNextAction(cache)
  },

  mod() { }
}
