module.exports = {
  name: 'Canvas Crop Image MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storeTypes[parseInt(data.storage)]} (${data.varName})</font>`
  },

  fields: ['storage', 'varName', 'align', 'align2', 'width', 'height', 'positionx', 'positiony', 'descriptioncolor', 'description', 'descriptionx'],

  html (isEvent, data) {
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
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Imagem Canvas</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>

  <div id="varNameContainer" style="float: right; width: 50%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>

<div>
  <div style="float: left; width: 50%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Cortar largura (px ou %)</span><br>
    <input id="width" class="round" type="text" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px 0px 0px 5px">
  <span class="dbminputlabel">Cortar altura (px ou %)</span><br>
    <input id="height" class="round" type="text" value="100%"><br>
  </div>
</div><br><br><br>

  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Alinhamento</span><br>
    <select id="align" class="round" onchange="glob.onChange0(this)">
    <option value="0" selected>Superior esquerdo</option>
    <option value="1">Centro superior</option>
    <option value="2">Canto superior direito</option>
    <option value="3">Meio esquerdo</option>
    <option value="4">Centro</option>
    <option value="5">Meio direito</option>
    <option value="6">Inferior esquerdo</option>
    <option value="7">Centro inferior</option>
    <option value="8">Inferior direito</option>
    <option value="9">Posição específica</option>
    </select><br>
  </div>

  <div id="specific" style="display: none; float: left; width: 100%;">
  <span class="dbminputlabel">Alinhamento customizado</span><br>
    <select id="align2" class="round">
    <option value="0" selected>Superior esquerdo</option>
    <option value="1">Centro superior</option>
    <option value="2">Canto superior direito</option>
    <option value="3">Meio esquerdo</option>
    <option value="4">Centro</option>
    <option value="5">Meio direito</option>
    <option value="6">Inferior esquerdo</option>
    <option value="7">Centro inferior</option>
    <option value="8">Inferior direito</option>
    </select><br>
  </div>

  
<div id="position" style="display: none">
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Posição X</span><br>
    <input id="positionx" class="round" type="text" value="0"><br>
  </div>
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Posição Y</span><br>
    <input id="positiony" class="round" type="text" value="0"><br>
  </div>
</div>

</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`
  },

  init () {
    const { glob, document } = this

    const position = document.getElementById('position')
    const specific = document.getElementById('specific')

    glob.onChange0 = function (event) {
      if (parseInt(event.value) === 9) {
        position.style.display = null
        specific.style.display = null
      } else {
        position.style.display = 'none'
        specific.style.display = 'none'
      }
    }

    glob.refreshVariableList(document.getElementById('storage'))
    glob.onChange0(document.getElementById('align'))

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

  action (cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    let cropw = this.evalMessage(data.width, cache)
    let croph = this.evalMessage(data.height, cache)
    if (cropw.endsWith('%')) {
      cropw = image.width * parseFloat(cropw) / 100
    } else {
      cropw = parseFloat(cropw)
    }
    if (croph.endsWith('%')) {
      croph = image.height * parseFloat(croph) / 100
    } else {
      croph = parseFloat(croph)
    }
    const align = parseInt(data.align)
    let positionx
    let positiony
    switch (align) {
      case 0:
        positionx = 0
        positiony = 0
        break
      case 1:
        positionx = (cropw / 2) - (image.width / 2)
        positiony = 0
        break
      case 2:
        positionx = cropw - image.width
        positiony = 0
        break
      case 3:
        positionx = 0
        positiony = (croph / 2) - (image.height / 2)
        break
      case 4:
        positionx = (cropw / 2) - (image.width / 2)
        positiony = (croph / 2) - (image.height / 2)
        break
      case 5:
        positionx = cropw - image.width
        positiony = (croph / 2) - (image.height / 2)
        break
      case 6:
        positionx = 0
        positiony = croph - image.height
        break
      case 7:
        positionx = (cropw / 2) - (image.width / 2)
        positiony = croph - image.height
        break
      case 8:
        positionx = cropw - image.width
        positiony = croph - image.height
        break
      case 9:
        const align2 = parseInt(data.align2)
        const pX = parseFloat(this.evalMessage(data.positionx, cache))
        const pY = parseFloat(this.evalMessage(data.positiony, cache))
        switch (align2) {
          case 0:
            positionx = -pX
            positiony = -pY
            break
          case 1:
            positionx = -(pX - (cropw / 2))
            positiony = -pY
            break
          case 2:
            positionx = -(pX - cropw)
            positiony = -pY
            break
          case 3:
            positionx = -pX
            positiony = -(pY - (croph / 2))
            break
          case 4:
            positionx = -(pX - (cropw / 2))
            positiony = -(pY - (croph / 2))
            break
          case 5:
            positionx = -(pX - cropw)
            positiony = -(pY - (croph / 2))
            break
          case 6:
            positionx = -pX
            positiony = -(pY - croph)
            break
          case 7:
            positionx = -(pX - (cropw / 2))
            positiony = -(pY - croph)
            break
          case 8:
            positionx = -(pX - cropw)
            positiony = -(pY - croph)
            break
        }
        break
    }
    const canvas = Canvas.createCanvas(cropw, croph)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, positionx, positiony)
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
