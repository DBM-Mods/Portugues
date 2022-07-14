module.exports = {
  name: 'Canvas Create Background MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    const info = parseInt(data.info)
    if (info === 0) {
      return data.color ? `Criar com cor "${data.color}"` : 'Nenhuma cor de fundo foi criada'
    } if (info === 1) {
      return data.gradient ? `Criar com gradiente "${data.gradient}"` : 'Nenhum plano de fundo gradiente foi criado'
    }
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['width', 'height', 'info', 'gradient', 'color', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Largura (px)</span><br>
    <input id="width" class="round" type="text"><br>
  </div>
  <div style="padding-left: 3px; float: left; width: 50%;">
  <span class="dbminputlabel">Altura (px)</span><br>
    <input id="height" class="round" type="text"><br>
  </div>
</div><br><br><br>
<div>
  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Preencher</span>
    <select id="info" class="round" onchange="glob.onChange0(this)">
      <option value="0" selected>Cor Solida</option>
      <option value="1">Cor Gradiente</option>
    </select>
  <div>
<div><br>
  <div id="Gradient" style="display: none; float: left; width: 100%;">
  <span class="dbminputlabel">Gradiente <span class="xinxylalink dbminputlabel" style="float:right" data-url="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient">Exemplos</span></span><br>
    <textarea id="gradient" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea><br>
  </div>
  <div id="Solid" style="float: left; width: 100%;">
  <span class="dbminputlabel">Cor (HEX ou RGBA)</span><br>
    <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)"><td>
    <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table><br>
  </div>
<div><br><br><br>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text"><br>
  </div>
</div>

<style>
span.xinxylalink {
  color: #99b3ff;
  text-decoration:underline;
  cursor:pointer;
}

span.xinxylalink:hover {
  color:#4676b9;
}
</style>`
  },

  init () {
    const { glob, document } = this

    const gradient = document.getElementById('Gradient')
    const solid = document.getElementById('Solid')

    glob.onChange0 = function (event) {
      switch (parseInt(event.value)) {
        case 0:
          gradient.style.display = 'none'
          solid.style.display = null
          break
        case 1:
          gradient.style.display = null
          solid.style.display = 'none'
          break
      }
    }
    glob.onChange0(document.getElementById('info'))


    const xinxylalinks = document.getElementsByClassName('xinxylalink');
    for (let x = 0; x < xinxylalinks.length; x++) {
      const xinxylalink = xinxylalinks[x];
      const url = xinxylalink.getAttribute('data-url');
      if (url) {
        xinxylalink.setAttribute('title', url);
        xinxylalink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`URL: [${url}] em seu navegador padrão.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }

  },

  action (cache) {
    const data = cache.actions[cache.index]
    const Canvas = require('canvas')
    const width = parseInt(this.evalMessage(data.width, cache))
    const height = parseInt(this.evalMessage(data.height, cache))
    const info = parseInt(data.info)
    const canvas = Canvas.createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    let color = this.evalMessage(data.color, cache)
    switch (info) {
      case 0:
        ctx.fillStyle = color
        ctx.rect(0, 0, width, height)
        ctx.fill()
        break
      case 1:
        // eslint-disable-next-line no-eval
        eval(String(this.evalMessage(data.gradient, cache)))
        break
    }
    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const varName = this.evalMessage(data.varName, cache)
    const storage = parseInt(data.storage)
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
