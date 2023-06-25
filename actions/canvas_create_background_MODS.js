module.exports = {
  name: 'Canvas Create Background MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data, presets) {
    const info = parseInt(data.info)
    const storage = presets.variables;

    if (info === 0) {
      intro = `Criar com cor: ${data.color}`
    } 
    if (info === 1) {
      intro = `Criar com gradiente: ${data.gradient}`
    }
    if (info === 2) {
      intro = `Criar com gradiente guiado: ${data.gradient2.length} grades`
    }


    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
  } else {
      desccor = 'none'
  }

    return data.description
        ? `<font style="color:${desccor}">${data.description}</font>`
        : `<font style="color:${desccor}">${intro} ~ ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
},

  variableStorage(data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['width', 'height', 'info', 'gradient', 'gradient2', 'apartir', 'color', 'storage', 'varName', 'descriptioncolor','description','descriptionx'],

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
    
    <div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">

  <div style="float: left; width: 50%;">
  <span class="dbminputlabel">Largura (px)</span><br>
    <input id="width" class="round" type="text"><br>
  </div>

  <div style="padding-left: 3px; float: left; width: 50%;">
  <span class="dbminputlabel">Altura (px)</span><br>
    <input id="height" class="round" type="text"><br>
  </div>

</div>

<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">

  <div style="float: left; width: 100%;" id="xinxyludob">
  <span class="dbminputlabel">Preencher</span>
    <select id="info" class="round" onchange="glob.onChange0(this)">
      <option value="0" selected>Cor (HEX ou RGBA)</option>
      <option value="1">Cor Gradiente / EVAL</option>
      <option value="2">Cor Gradiente / Guiado</option>
    </select>
  </div>

  <div style="float: left; width: 60%;padding-left:4px" id="xinxyludo">
  <span class="dbminputlabel">A partir</span>
    <select id="apartir" class="round">
      <option value="0" selected>Cima para baixo</option>
      <option value="1">Diagonal esquerda de cima para baixo</option>
      <option value="2">Direita para esquerda</option>
      <option value="3">Diagonal direita de cima para baixo</option>
      <option value="4">De baixo para cima</option>
      <option value="5">Diagonal esquerda de baixo para cima</option>
      <option value="6">Esquerda para direita</option>
      <option value="7">Diagonal direita de baixo para cima</option>
    </select>
  </div>

</div>

<br>

<div id="Gradient2" style="display: none; float: left; width: 100%;">

<dialog-list id="gradient2" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 400px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
<div style="padding: 12px">

<span class="dbminputlabel">Posição</span><br>
<input id="posicao" class="round" type="text" placeholder="Coloque de 0 a 100">
<br>

<span class="dbminputlabel">Cor (HEX, RGBA ou nome da cor)</span><br>
<table style="width:100%"><tr><td><input id="cor" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)"><td>
<td style="width:40px;text-align:center;padding:4px"><a id="btr1b" style="cursor:pointer" onclick="(function(){
  document.getElementById('cor').type = 'color'
  document.getElementById('btr1b').style.display = 'none';
  document.getElementById('btr2b').style.display = 'block';
  })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2b" style="cursor:pointer;display:none" onclick="(function(){
    document.getElementById('cor').type = 'text';
    document.getElementById('btr1b').style.display = 'block';
    document.getElementById('btr2b').style.display = 'none';
    })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table><br>

</div>
</dialog-list>

<br>
</div>


  <div id="Gradient" style="display: none; float: left; width: 100%;">
  <span class="dbminputlabel">Gradiente / EVAL<span class="xinelaslink dbminputlabel" style="float:right;cursor:pointer" data-url="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createLinearGradient">Exemplos</span></span><br>
    <textarea id="gradient" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea><br>
  </div>

  <div id="Solid" style="float: left; width: 100%;">
  <span class="dbminputlabel">Cor (HEX ou RGBA)</span><br>
    <table style="width:100%"><tr><td><input style="float:left;width:calc(100% - 10px)" id="color" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)" onchange="(function(){
      var input = document.getElementById('color');
      var valor = input.value;
      document.getElementById('exib').style.background = valor;
      })()"><td>
    <td style="width:60px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button style="float:left" class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib">&#8203;</div></div></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table><br>
  </div>



<br>

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

  init() {
    const { glob, document } = this

    var input = document.getElementById('color');
    var valor = input.value;
    document.getElementById('exib').style.background = valor;

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

    glob.formatItem = function (data) {
      function verificarCor(cor) {
        var regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        var regexRgba = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+(?:\.\d+)?)?\s*\)$/;
        var nomesCores = [
          "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
          "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
          "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki",
          "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
          "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray",
          "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold",
          "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory",
          "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
          "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen",
          "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
          "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
          "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
          "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange",
          "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip",
          "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown",
          "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
          "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato",
          "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
        ];

        if (regexHex.test(cor)) {
          setcor = data.cor
        } else if (regexRgba.test(cor)) {
          setcor = data.cor
        } else if (nomesCores.includes(cor.toLowerCase())) {
          setcor = data.cor
        } else if (CSS.supports("color", cor)) {
          setcor = data.cor
        } else {
          setcor = ""
        }
      }
      
      verificarCor(data.cor);
      
      let result = ``;
      result += `<div style="margin-left:-10px;background:${setcor};float:left;width:10px;overflow:hidden;height:30px;"><br></div>`
      result += `<div style="float:left;width:50%;overflow:hidden;padding-left:10px;"> Posição: ${data.posicao} </div>`
      result += `<div style="float:right;width:50%;overflow:hidden;"> Cor: ${data.cor} </div>`
      return result;
    }

    const gradient2 = document.getElementById('Gradient2')
    const gradient = document.getElementById('Gradient')
    const solid = document.getElementById('Solid')
    const xinxyludo = document.getElementById('xinxyludo')
    const xinxyludob = document.getElementById('xinxyludob')

    glob.onChange0 = function (event) {
      switch (parseInt(event.value)) {
        case 0:
          gradient2.style.display = 'none'
          gradient.style.display = 'none'
          solid.style.display = null
          xinxyludo.style.display = 'none'
          xinxyludob.style.width = "100%"
          break
        case 1:
          gradient2.style.display = 'none'
          gradient.style.display = null
          solid.style.display = 'none'
          xinxyludo.style.display = 'none'
          xinxyludob.style.width = "100%"
          break
        case 2:
          gradient2.style.display = null
          gradient.style.display = 'none'
          solid.style.display = 'none'
          xinxyludo.style.display = null
          xinxyludob.style.width = "40%"
          break
      }
    }
    glob.onChange0(document.getElementById('info'))



  },

  action(cache) {
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
        eval(String(this.evalMessage(data.gradient, cache)))
        break
      case 2:

        const gradients = data.gradient2;

        if(data.apartir == "0"){var gradientx = ctx.createLinearGradient(0, 0, 0, height)}
        if(data.apartir == "1"){var gradientx = ctx.createLinearGradient(0, 0, width, height)}
        if(data.apartir == "2"){var gradientx = ctx.createLinearGradient(0, 0, width, 0)}
        if(data.apartir == "3"){var gradientx = ctx.createLinearGradient(width, 0, 0, height)}
        if(data.apartir == "4"){var gradientx = ctx.createLinearGradient(0, height, 0, 0)}
        if(data.apartir == "5"){var gradientx = ctx.createLinearGradient(width, height, 0, 0)}
        if(data.apartir == "6"){var gradientx = ctx.createLinearGradient(width, 0, 0, 0)}
        if(data.apartir == "7"){var gradientx = ctx.createLinearGradient(0, height, width, 0)}

        for (let i = 0; i < gradients.length; i++) {
          const gradient = gradients[i];
          var posicao = this.evalMessage(gradient.posicao, cache);
          var posicao = (posicao / 100)
          const cor = this.evalMessage(gradient.cor, cache);
          gradientx.addColorStop(posicao, cor)
        }
        ctx.fillStyle = gradientx;
        ctx.fillRect(0, 0, width, height);
        break
    }

    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const varName = this.evalMessage(data.varName, cache)
    const storage = parseInt(data.storage)
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod() { }
}
