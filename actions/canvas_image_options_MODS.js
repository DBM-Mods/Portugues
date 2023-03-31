module.exports = {
  name: 'Canvas Image Options MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    const storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']
    return `${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  fields: ['storage', 'varName', 'mirror', 'rotation', 'width', 'height'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Imagem Canvas</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Espelho</span><br>
    <select id="mirror" class="round">
      <option value="0" selected>Nenhum</option>
      <option value="1">Espelho horizontal</option>
      <option value="2">Espelho Vertical</option>
      <option value="3">Espelho Diagonal</option>
    </select><br>
  </div>
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Rotação (graus)</span><br>
    <input id="rotation" class="round" type="text" value="0"><br>
  </div>
</div><br><br><br>
<div
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Largura (px ou %)</span><br>
    <input id="width" class="round" type="text" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Altura (px ou %)</span><br>
    <input id="height" class="round" type="text" value="100%"><br>
  </div>
</div>`
  },

  init () {
    const { glob, document } = this

    glob.refreshVariableList(document.getElementById('storage'))
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
    const minfo = parseInt(data.mirror)
    const degrees = parseInt(data.rotation)
    const radian = Math.PI / 180 * degrees
    const scalex = this.evalMessage(data.width, cache)
    const scaley = this.evalMessage(data.height, cache)
    let imagew = image.width
    let imageh = image.height
    let scalew = 1
    let scaleh = 1
    let mirrorw = 1
    let mirrorh = 1
    rotate(radian)
    mirror(minfo)
    scale(scalex, scaley)
    scalew *= mirrorw
    scaleh *= mirrorh
    const canvas = Canvas.createCanvas(imagew, imageh)
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, imagew, imageh)
    ctx.save()
    ctx.translate(imagew / 2, imageh / 2)
    ctx.rotate(radian)
    ctx.scale(scalew, scaleh)
    ctx.drawImage(image, -image.width / 2, -image.height / 2)
    ctx.restore()
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)

    function rotate (r) {
      const imagex = imagew * Math.abs(Math.cos(r)) + imageh * Math.abs(Math.sin(r))
      const imagey = imageh * Math.abs(Math.cos(r)) + imagew * Math.abs(Math.sin(r))
      imagew = imagex
      imageh = imagey
    }
    function scale (w, h) {
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
    function mirror (m) {
      switch (m) {
        case 0:
          mirrorw = 1
          mirrorh = 1
          break
        case 1:
          mirrorw = -1
          mirrorh = 1
          break
        case 2:
          mirrorw = 1
          mirrorh = -1
          break
        case 3:
          mirrorw = -1
          mirrorh = -1
      }
    }
  },

  mod () {}
}
