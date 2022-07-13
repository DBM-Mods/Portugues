module.exports = {
  name: 'Canvas Edit Image Border MOD',
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
    return `${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  fields: ['storage', 'varName', 'circleinfo', 'radius' , 'cor' , 'lados' , 'borda'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

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
<div style="padding-top: 8px;">
  <div style="width: 100%;">
  <span class="dbminputlabel">Tipo de Borda</span><br>
    <select id="circleinfo" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0" selected>Raio do canto redondo</option>
      <option value="1">Circular</option>
      <option value="2">Pentagonal</option>
      <option value="3">Hexagonal</option>
      <option value="4">Número de lados</option>
    </select><br>
  </div>
  <div style="width: 100%;display:none" id="containerxin">
  <span class="dbminputlabel">Raio do canto redondo</span><br>
    <input id="radius" class="round" type="text" value="0"><br>
  </div>

  <div style="width: 100%;display:none" id="containerxin3">
  <span class="dbminputlabel">Número de lados</span><br>
    <input id="lados" class="round" type="text" value="6"><br>
  </div>

  <div style="width: 100%;" id="containerxin2">
  <div style="float: left; width: 50%;padding:5px">
  <span class="dbminputlabel">Tamanho da borda (px)</span><br>
    <input id="borda" name="actionxinxyla" class="round" value="0" type="text" placeholder="2">
  </div>

  
  <div style="float: right; width: 50%;padding:5px">
  <span class="dbminputlabel">Cor da Borda</span><br>
    <table style="width:100%"><tr><td><input id="cor" value="FFFFFF" name="actionxinxyla" class="round" type="text" placeholder="Insira um código de cor HEX..."><td>
    <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('cor').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('cor').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
  </div></div>

</div>`
  },

  init () {
    const { glob, document } = this
  
      glob.onComparisonChanged = function (event) {
        if (event.value === "0") {
          document.getElementById("containerxin").style.display = null;
          document.getElementById("containerxin3").style.display = "none"; 
        }
        if (event.value === "1" || event.value === "2" || event.value === "3") {
          document.getElementById("containerxin").style.display = "none"; 
          document.getElementById("containerxin3").style.display = "none";
        }
        if (event.value === "4") {
          document.getElementById("containerxin3").style.display = null;
          document.getElementById("containerxin").style.display = "none";
        }
      }
  
      glob.onComparisonChanged(document.getElementById("circleinfo"));
    glob.refreshVariableList(document.getElementById('storage'))
  },

  action (cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const borda = this.evalMessage(data.borda, cache);
    const cor = this.evalMessage(data.cor, cache);
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    const radius = parseInt(this.evalMessage(data.radius, cache))
    const lados = parseInt(this.evalMessage(data.lados, cache))
    const imagew = image.width
    const imageh = image.height
    const canvas = Canvas.createCanvas(imagew, imageh)
    const ctx = canvas.getContext('2d')
    const circleinfo = parseInt(data.circleinfo, 10);
    switch (circleinfo) {
      case 0:
        corner(radius)
        break;
      case 1:
        circle()
        break;
      case 2:
        pentagono()
        break;
      case 3:
        hexagono()
        break;
      case 4:
        nlados()
        break;
    }
    ctx.drawImage(image, 0, 0)
    if (borda > 0) {   
    if (cor.startsWith('#')) {
      ctx.strokeStyle = cor
    } else {
      ctx.strokeStyle = `#${cor}`
    }
    ctx.lineWidth = borda;
    ctx.lineHeight = borda;
    ctx.stroke();}
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)

    function circle () {
      ctx.beginPath()
      ctx.arc(imagew / 2, imageh / 2, (imagew-borda + imageh-borda) / 4, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
    }
    function corner (r) {
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.lineTo(imagew - r, 0)
      ctx.quadraticCurveTo(imagew, 0, imagew, r)
      ctx.lineTo(imagew, imageh - r)
      ctx.quadraticCurveTo(imagew, imageh, imagew - r, imageh)
      ctx.lineTo(r, imageh)
      ctx.quadraticCurveTo(0, imageh, 0, imageh - r)
      ctx.lineTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.closePath()
      ctx.clip()
    }

    function hexagono () {
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;
      ctx.beginPath();
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
      for (side; side < 7; side++) {
       ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }
      ctx.closePath()
      ctx.clip()
    }


    function pentagono () {
      var numberOfSides = 5,
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;

      ctx.beginPath();
      ctx.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin());          
      for (var i = 1; i <= numberOfSides;i += 1) {
      ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      ctx.closePath()
      ctx.clip()
    }

    function nlados () {
      var numberOfSides = lados,
      side = 0;
      size = imagew/2,
      x = imagew/2,
      y = imageh/2;

      ctx.beginPath();
      ctx.moveTo (x +  size * Math.cos(0), y +  size *  Math.sin(0));          
      for (var i = 1; i <= numberOfSides;i += 1) {
      ctx.lineTo (x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      ctx.closePath()
      ctx.clip()
    }
  },

  mod () {}
}
