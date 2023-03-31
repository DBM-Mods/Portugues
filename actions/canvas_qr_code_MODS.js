module.exports = {
  name: 'Canvas QR Code MOD',
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

    const storage = presets.variables;

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.draw} - ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['draw', 'largura', 'altura', 'fcolor', 'color', 'margem', 'storage', 'varName', 'iffalse', 'iffalseVal', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

      <tab-system style="margin-top: 5px">
        <tab label="Texto" icon="align left">
          <div style="padding:8px">

        <span class="dbminputlabel">Texto a transformar</span><br>
    <textarea id="draw" rows="6" style="width: 100%; white-space: nowrap; resize:yes"></textarea>

</div>
  </tab>
    <tab label="Tamanho & Cores" icon="align left">
      <div style="padding:8px">
   
      <table><tr><td style="width:50%;padding:0px 4px 0px 0px">
    <span class="dbminputlabel">Largura (px)</span><br>

      <input id="largura" class="round" type="text" placeholder="Opcional">
      </td><td style="padding:0px 0px 0px 4px">

    <span class="dbminputlabel">Altura (px)</span><br>
      <input id="altura" class="round" type="text" placeholder="Opcional">
    
   </td></tr></table>
   <br>
  

    <table><tr><td>
    <div id="Solid" style="float: left; width: 100%;">
    <span class="dbminputlabel">Fundo do QR CODE (HEX)</span><br>
      <table style="width:100%"><tr><td><input id="fcolor" name="actionxinxyla" class="round" type="text" value="#FFFFFF" placeholder="#FFFFFF ou rgba(0,0,0,0.5)"><td>
      <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
        document.getElementById('fcolor').type = 'color'
        document.getElementById('btr1').style.display = 'none';
        document.getElementById('btr2').style.display = 'block';
        })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
          document.getElementById('fcolor').type = 'text';
          document.getElementById('btr1').style.display = 'block';
          document.getElementById('btr2').style.display = 'none';
          })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
    </div>

</td><td>

 <div id="Solid" style="float: left; width: 100%;">
  <span class="dbminputlabel">Cor do QR CODE (HEX)</span><br>
    <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)"><td>
    <td style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('2btr1').style.display = 'none';
      document.getElementById('2btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('2btr1').style.display = 'block';
        document.getElementById('2btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
  </div>

  </td></tr></table>

  <br>

  <span class="dbminputlabel">Margem</span><br>
  <input id="margem" class="round" value="0" type="text" placeholder="Opcional">


<br>

  
  </div>
  </tab>
    <tab label="Config & Armazenar" icon="settings">
      <div style="padding:8px">

      <div style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<div style="padding-top: 8px;">
  <div style="float: left; width: 38%">
  <span class="dbminputlabel">Se o qr code não for gerado</span><br>
  <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
  <option value="0" selected>Continuar ações</option>
  <option value="1">Parar sequência de ação</option>
  <option value="2">Ir para a ação</option>
  <option value="3">Pular as próximas ações</option>
  <option value="4">Ir para a âncora de ação</option>
  </select>
  </div>
  
  <div id="iffalseContainer" style="display: none; float: right; width: 60%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
  </div>

  <br><br><br><br>
 

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
</tab>
</tab-system>

</div>

<style>
.xin {background:#222;padding:2px 4px;}
table{width:100%}

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`
  },

  init() {
    const { glob, document } = this

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
    var largura = parseInt(this.evalMessage(data.largura, cache))
    if(this.evalMessage(data.largura, cache) == ""){largura = 256}
    var altura = parseInt(this.evalMessage(data.altura, cache))
    if(this.evalMessage(data.altura, cache) == ""){altura = 256}
    var margem = parseInt(this.evalMessage(data.margem, cache))
    if(this.evalMessage(data.margem, cache) == ""){margem = 0}
    const draw = this.evalMessage(data.draw, cache)
    var fcolor = this.evalMessage(data.fcolor, cache)
    if(this.evalMessage(data.fcolor, cache) == ""){fcolor = "#ffffff"}
    var color = this.evalMessage(data.color, cache)
    if(this.evalMessage(data.color, cache) == ""){color = "#000000"}
    const canvas = Canvas.createCanvas(largura, altura)
    const ctx = canvas.getContext('2d')
    const _this = this
    var QRCode = require('qrcode')

    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 1,
      width: largura,
      margin: margem,
      color: {
        dark: color,
        light: fcolor
      }
    }

    try{
    QRCode.toDataURL(draw, opts, function (error, url) {
      if (error){ console.error(error)
      }

      const image2 = new Canvas.Image()
      image2.src = url
      ctx.drawImage(image2, 0, 0, largura, altura)

      result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')


      const varName = _this.evalMessage(data.varName, cache)
      const storage = parseInt(data.storage)
      _this.storeValue(result, storage, varName, cache)
      _this.callNextAction(cache)
    })
  }
  catch (err) {this.executeResults(false, data, cache)}



  },

  mod() { }
}
