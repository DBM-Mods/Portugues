module.exports = {
  name: 'Canvas Generate Progress Bar MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    const storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']
    const type = ['Basica', 'Circulo']
    const index = parseInt(data.type)
    return `Barra de progresso ${type[index]} - ${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },
  fields: ['storage', 'varName', 'type', 'width', 'height', 'lineWidth', 'lineCap', 'percent', 'color'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div style="padding-top: 8px;">
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Tipo</span><br>
    <select id="type" class="round" onchange="glob.onChange1(this)">
      <option value="0" selected>Basico</option>
      <option value="1">Circulo</option><br>
    </select>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel"><span id="Change1text">Largura</span></span><br>
    <input id="width" class="round" type="text"><br>
  </div>
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel"><span id="Change2text">Altura</span></span><br>
    <input id="height" class="round" type="text"><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Espessura da linha</span><br>
    <input id="lineWidth" class="round" type="text"><br>
  </div>
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Tipo de linha</span><br>
    <select id="lineCap" class="round">
      <option value="0" selected>Quadrada</option>
      <option value="1">Redonda</option>
    </select><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Porcentagem</span><br>
    <input id="percent" class="round" type="text"><br>
  </div>
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Cor</span><br>
    <table style="width:100%"><tr><th><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Insira um código de cor HEX..."><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
  </div>
</div><br><br><br><br>
<div>
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text">
  </div>
</div>`
  },

  init () {
    const { glob, document } = this

    glob.onChange1 = function (event) {
      const Change1text = document.getElementById('Change1text')
      const Change2text = document.getElementById('Change2text')
      if (event.value === '0') {
        Change1text.innerHTML = 'Largura'
        Change2text.innerHTML = 'Altura'
      } else if (event.value === '1') {
        Change1text.innerHTML = 'Raio'
        Change2text.innerHTML = 'Tamanho'
      }
    }
    glob.onChange1(document.getElementById('type'))
  },

  action (cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const type = parseInt(data.type)
    const width = parseInt(data.width)
    const height = parseInt(data.height)
    const percent = this.evalMessage(data.percent, cache)
    const lineWidth = parseInt(data.lineWidth)
    const lineCap = parseInt(data.lineCap)
    let Cap
    switch (lineCap) {
      case 0:
        Cap = 'square'
        break
      case 1:
        Cap = 'round'
        break
    }
    const color = this.evalMessage(data.color, cache)
    let canvas
    if (type === 0) {
      canvas = Canvas.createCanvas(width, height)
    } else if (type === 1) {
      canvas = Canvas.createCanvas(height, height)
    }
    const ctx = canvas.getContext('2d')
    if (color.startsWith('#')) {
      ctx.strokeStyle = color
    } else {
      ctx.strokeStyle = `#${color}`
    }
    ctx.lineWidth = lineWidth
    if (type === 0) {
      ctx.beginPath()
      switch (lineCap) {
        case 0:
          ctx.moveTo(0, height / 2)
          ctx.lineTo(width * percent / 100, height / 2)
          break
        case 1:
          const center = lineWidth / 2
          const top = height / 2 - center
          const bottom = height / 2 + center
          ctx.moveTo(center, top)
          ctx.lineTo(width - lineWidth, top)
          ctx.arcTo(width, top, width, height / 2, center)
          ctx.arcTo(width, bottom, top, bottom, center)
          ctx.lineTo(center, bottom)
          ctx.arcTo(0, bottom, 0, height / 2, center)
          ctx.arcTo(0, top, center, top, center)
          ctx.closePath()
          ctx.clip()
          ctx.beginPath()
          ctx.moveTo(-center, height / 2)
          ctx.lineTo(width * percent / 100 - center, height / 2)
          break
      }
    } else if (type === 1) {
      ctx.translate(height / 2, height / 2)
      ctx.rotate(-0.5 * Math.PI)
      ctx.beginPath()
      ctx.arc(0, 0, width, 0, Math.PI * 2 * percent / 100, false)
    }
    ctx.lineCap = Cap
    ctx.stroke()
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
