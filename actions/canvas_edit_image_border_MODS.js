module.exports = {
  name: 'Canvas Edit Image Border MOD',
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
    const corte = ['Raio do canto redondo', 'Circular', 'Pentagonal', 'Hexagonal', 'Número de pontos', 'Estrela', 'Livre / EVAL', 'Coração' , 'Trapezóide']

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Corte: ${corte[parseInt(data.circleinfo)]} ~ ${storeTypes[parseInt(data.storage)]} (${data.varName})</font>`
  },

  fields: ['storage', 'varName', 'circleinfo', 'radius', 'cor', 'lados', 'borda', 'shadowcor', 'girarb', 'livre', 'atk', 'blur', 'shadowh', 'shadowv', 'gradiente', 'tipocor', 'gradient2', 'apartir', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.5</div>

	<div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <table style="width:100%;">
		<tr>
			<td>
				<span class="dbminputlabel">Imagem Canvas</span><br>
				<select id="storage" class="round" style="width: 100%" onchange="glob.refreshVariableList(this)">
					${data.variables[1]}
				</select>
			</td>
			<td>
				<span class="dbminputlabel">Nome da Variavel</span><br>
				<input id="varName" class="round" type="text" list="variableList2">
			</td>
		</tr>
	</table>
<xinspace>

	<tab-system style="margin-top: 0">
		<tab label="Corte" icon="cut">
				<div style="padding:8px">

    <span class="dbminputlabel">Tipo de Corte</span><br>
    <select id="circleinfo" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0" selected>Raio do canto redondo</option>
      <option value="1">Circular</option>
      <option value="2">Pentagonal</option>
      <option value="3">Hexagonal</option>
      <option value="4">Número de pontos</option>
      <option value="5">Estrela</option>
      <option value="7">Coração</option>
      <option value="8">Trapezóide</option>
      <option value="6">Livre / EVAL</option>
    </select>
    <div style="width: 100%;display:none;padding-top:12px" id="containerxin">
    <span class="dbminputlabel">Raio do canto redondo</span><br>
      <input id="radius" class="round" type="text" value="0">
    </div>
  
    <div style="width: 100%;display:none;padding-top:12px" id="containerxin3">
    <span class="dbminputlabel">Número de pontos</span><br>
      <input id="lados" class="round" type="text" value="6">
    </div>

    <div style="width: 100%;display:none;padding-top:12px" id="containerxin7">
    <span class="dbminputlabel" name="renomexin">Ataque</span><br>
      <input id="atk" class="round" type="text" value="100">
    </div>

    <div style="width: 100%;display:none;padding-top:12px" id="containerxin5">
    <span class="dbminputlabel">Girar o corte</span><br>
    <input id="girarb" class="round" type="text" value="0">
    </div>

    <div style="width: 100%;display:none;padding-top:12px" id="containerxin6">
    <span class="dbminputlabel">Livre / EVAL</span><span style="float:right"><button class="tiny compact ui icon button" onclick="(function(){document.getElementById('xinxylainfo').style.display = 'block';})()">Informações</button></span><br>
    <textarea id="livre" rows="5" style="height: calc(100vh - 370px);width: 100%; white-space: nowrap; resize:yes" ></textarea>
    </div>


</div>
  
<div id="xinxylainfo" style="top:0px;left:10px;position:absolute;background-color:#333;color:#aaa;z-index:99999;width:calc(100% - 20px);height:calc(100% - 10px);display:none">
<div style="width:100%;padding:10px"><span style="float:right"><button class="tiny compact ui icon button" onclick="(function(){document.getElementById('xinxylainfo').style.display = 'none';})()">Fechar [X]</button></span>
<b>Informações</b></div>
<div style="padding:10px;background:#222;height:calc(100% - 30px);overflow:auto">
<table><tr><th class="col">Variavel</th><th class="col">Informação</th></tr>
<tr><td class="col">imagew</td><td class="col">Largura da imagem</td></tr>
<tr><td class="col">imageh</td><td class="col">Altura da imagem</td></tr>
<tr><td class="col">ctx</td><td class="col">getContext('2d')</td></tr>
</table>
</div>
</div>


</tab>

<tab label="Cor & Tamanho" icon="flask">
		<div style="padding:8px">
			
    <div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
		<div style="float: left; width: 100%;" id="xinxyludob">
  <span class="dbminputlabel">Tipo de Cor</span>
    <select id="tipocor" class="round" onchange="glob.onChange0(this)">
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

	
    <div style="width: 100%;padding-top:12px" id="containerxin2">

    <span class="dbminputlabel">Tamanho da borda (px)</span><br>
      <input id="borda" name="actionxinxyla" class="round" value="0" type="text" placeholder="2">

    </div>

    <div id="Gradient2" style="display: none; float: left; width: 100%;">

<br>
<dialog-list id="gradient2" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 380px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
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
</div>


		<div id="gradient" style="padding-top:12px">
			<span class="dbminputlabel">Gradiente</span>
			<textarea id="gradiente" name="gradientes" rows="4" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>

      <div style="width: 100%;padding-top:12px" id="containerxin4">
    <span class="dbminputlabel">Cor da Borda</span><br>
      <table style="width:100%"><tr><th><input id="cor" value="FFFFFF" name="actionxinxyla" class="round" type="text" placeholder="Insira uma cor HEX ou RGBA" onchange="(function(){
        var input = document.getElementById('cor');
        var valor = input.value;
        document.getElementById('exib').style.background = valor;
        })()"></th>
      <th style="width:60px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
        document.getElementById('cor').type = 'color'
        document.getElementById('btr1').style.display = 'none';
        document.getElementById('btr2').style.display = 'block';
        })()"><button style="float:left" class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib">&#8203;</div></div></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
          document.getElementById('cor').type = 'text';
          document.getElementById('btr1').style.display = 'block';
          document.getElementById('btr2').style.display = 'none';
          })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

          
          </div>
	
	</div>
	</tab>

<tab label="Sombra" icon="cloud">
		<div style="padding:8px">
	<table style="width:100%"><tr>
	<td style="width:100px">
	<span class="dbminputlabel">Borrar Sombras</span><br>
	<input id="blur" class="round" type="text" value="0" placeholder="Opcional">
	</td>
	<td style="width:100px"><span class="dbminputlabel">+ Arrastar Sombra X</span><br>
	<input id="shadowh" class="round" type="text" value="0" placeholder="Opcional"></td>
	<td style="width:100px"><span class="dbminputlabel">+ Arrastar Sombra Y</span><br>
	<input id="shadowv" class="round" type="text" value="0" placeholder="Opcional"></td>
	</tr></table>

		
		<div id="corshadow" style="padding-top:15px">
		<span class="dbminputlabel">Cor da Sombra (HEX / RGBA)</span><br>
			<table style="width:100%"><tr><th><input value="#FFFFFF" id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..." onchange="(function(){
        var input = document.getElementById('shadowcor');
        var valor = input.value;
        document.getElementById('exib2').style.background = valor;
        })()"></th>
			<th style="width:60px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
			document.getElementById('shadowcor').type = 'color'
			document.getElementById('2btr1').style.display = 'none';
			document.getElementById('2btr2').style.display = 'block';
			})()"><button style="float:left" class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib2">&#8203;</div></div></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
				document.getElementById('shadowcor').type = 'text';
				document.getElementById('2btr1').style.display = 'block';
				document.getElementById('2btr2').style.display = 'none';
				})()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

		
		</div>
		</div>
	</tab>

  <tab label="Config" icon="cogs">
  
  <div style="padding:8px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

</tab>
    </tab-system>
    
<style>
    td{padding:2px}
    xinspace{padding:5px 0px 0px 0px;display:block}
    .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
    .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.col{padding:6px;text-align:left;border:1px solid #777}
    .xin {background:#111;padding:2px 4px;}
    </style>`
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
      if (event.value === "0") {
        document.getElementById("containerxin").style.display = null;
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin5").style.display = "none";
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = "none";
      }
      if (event.value === "1" || event.value === "2" || event.value === "3") {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin5").style.display = "none";
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = "none";
      }
      if (event.value === "4") {
        document.getElementById("containerxin3").style.display = null;
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin5").style.display = null;
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = "none";
      }
      if (event.value === "5") {
        document.getElementById("containerxin3").style.display = null;
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin5").style.display = null;
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = null;
        document.querySelector("[name='renomexin']").innerText = 'Ataque';
      }
      if (event.value === "6") {
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin5").style.display = "none";
        document.getElementById("containerxin6").style.display = null;
        document.getElementById("containerxin7").style.display = "none";
      }
      if (event.value === "7") {
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin5").style.display = "none";
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = "none";
      }
      if (event.value === "8") {
        document.getElementById("containerxin3").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
        document.getElementById("containerxin5").style.display = "none";
        document.getElementById("containerxin6").style.display = "none";
        document.getElementById("containerxin7").style.display = null;
        document.querySelector("[name='renomexin']").innerText = 'Fechamento do trapézio ( % )';
      }
    }


    var input = document.getElementById('cor');
    var valor = input.value;
    document.getElementById('exib').style.background = valor;

    var input2 = document.getElementById('shadowcor');
    var valor2 = input2.value;
    document.getElementById('exib2').style.background = valor2;

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
    const gradient = document.getElementById('gradient')
    const solid = document.getElementById('containerxin4')
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

    glob.onChange0(document.getElementById('tipocor'))


    glob.onComparisonChanged(document.getElementById("circleinfo"));
    glob.refreshVariableList(document.getElementById('storage'))

    glob.refreshVariableListm(document.getElementById('storagem'))
  },

  action(cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const borda = this.evalMessage(data.borda, cache);
    const cor = this.evalMessage(data.cor, cache);
    if (parseInt(this.evalMessage(data.girarb, cache)) > 0 || parseInt(this.evalMessage(data.girarb, cache)) < 0) { girarb = parseInt(this.evalMessage(data.girarb, cache)) } else { girarb = 0 }
    rotationDegrees = girarb
    const imagedata = this.getVariable(storage, varName, cache)
    if (!imagedata) {
      this.callNextAction(cache)
      return
    }
    const image = new Canvas.Image()
    image.src = imagedata
    var radius = this.evalMessage(data.radius, cache)
    if (radius == undefined) { radius = 0 }
    const lados = parseInt(this.evalMessage(data.lados, cache))
    atk = parseInt(this.evalMessage(data.atk, cache))
    if (atk <= 0) { atk = 0 }
    const imagew = image.width
    const imageh = image.height
    var tipocor = this.evalMessage(data.tipocor, cache);
    if (tipocor == undefined || tipocor == "") { tipocor = 0 }
    const canvas = Canvas.createCanvas(imagew, imageh)
    const ctx = canvas.getContext('2d')
    const circleinfo = parseInt(data.circleinfo, 10);

    const shadowcor = this.evalMessage(data.shadowcor, cache);
    let blur = parseInt(this.evalMessage(data.blur, cache));
    if (isNaN(blur)) {
      blur = 0;
    }
    let shadowh = parseInt(this.evalMessage(data.shadowh, cache));
    if (isNaN(shadowh)) {
      shadowh = 0;
    }
    let shadowv = parseInt(this.evalMessage(data.shadowv, cache));
    if (isNaN(shadowv)) {
      shadowv = 0;
    }
    ctx.shadowColor = shadowcor
    ctx.shadowOffsetX = shadowh;
    ctx.shadowOffsetY = shadowv;
    ctx.shadowBlur = blur;
    ctx.fillstyle = shadowcor
    ctx.fill()

    if (circleinfo == 0) { corner(radius) }
    if (circleinfo == 1) { circle() }
    if (circleinfo == 2) { pentagono() }
    if (circleinfo == 3) { hexagono() }
    if (circleinfo == 4) { nlados() }
    if (circleinfo == 5) { estrela() }
    if (circleinfo == 6) {
      eval(String(this.evalMessage(data.livre, cache) + '\n ctx.clip()'))
    }
    if (circleinfo == 7) { coracao() }
    if (circleinfo == 8) { trapezoide() }


    ctx.drawImage(image, 0, 0)
    if (borda > 0) {


      if (tipocor == 2) {

        const gradients = data.gradient2;

        if (data.apartir == "0") { var gradientx = ctx.createLinearGradient(0, 0, 0, imageh) }
        if (data.apartir == "1") { var gradientx = ctx.createLinearGradient(0, 0, imagew, imageh) }
        if (data.apartir == "2") { var gradientx = ctx.createLinearGradient(0, 0, imagew, 0) }
        if (data.apartir == "3") { var gradientx = ctx.createLinearGradient(imagew, 0, 0, imageh) }
        if (data.apartir == "4") { var gradientx = ctx.createLinearGradient(0, imageh, 0, 0) }
        if (data.apartir == "5") { var gradientx = ctx.createLinearGradient(imagew, imageh, 0, 0) }
        if (data.apartir == "6") { var gradientx = ctx.createLinearGradient(imagew, 0, 0, 0) }
        if (data.apartir == "7") { var gradientx = ctx.createLinearGradient(0, imageh, imagew, 0) }

        for (let i = 0; i < gradients.length; i++) {
          const gradient = gradients[i];
          var posicao = this.evalMessage(gradient.posicao, cache);
          var posicao = (posicao / 100)
          const cor = this.evalMessage(gradient.cor, cache);
          gradientx.addColorStop(posicao, cor)
        }
        ctx.strokeStyle = gradientx;

      }
      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 0 || tipocor == undefined) {
        ctx.strokeStyle = cor
      }

      ctx.lineWidth = borda;
      ctx.lineHeight = borda;
      ctx.stroke();
    }




    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)

    function circle() {
      ctx.beginPath()
      ctx.arc(imagew / 2, imageh / 2, (imagew + imageh) / 4, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
    }
    function corner(r) {
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

    function hexagono() {
      side = 0;
      size = imagew / 2,
        x = imagew / 2,
        y = imageh / 2;
      ctx.beginPath();
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
      for (side; side < 7; side++) {
        ctx.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
      }
      ctx.closePath()
      ctx.clip()
    }


    function pentagono() {
      var numberOfSides = 5,
        side = 0;
      size = imagew / 2,
        x = imagew / 2,
        y = imageh / 2;

      ctx.beginPath();
      ctx.moveTo(x + size * Math.cos(0), y + size * Math.sin());
      for (var i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides), y + size * Math.sin(i * 2 * Math.PI / numberOfSides));
      }
      ctx.closePath()
      ctx.clip()
    }

    function nlados() {
      var numberOfSides = lados;
      var rotationAngle = (rotationDegrees * Math.PI) / 180; // x i n x y la
      var side = 0;
      size = imagew / 2,
        x = imagew / 2,
        y = imageh / 2;

      ctx.beginPath();
      ctx.moveTo(x + size * Math.cos(0 + rotationAngle), y + size * Math.sin(0 + rotationAngle));
      for (var i = 1; i <= numberOfSides; i += 1) {
        ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / numberOfSides + rotationAngle), y + size * Math.sin(i * 2 * Math.PI / numberOfSides + rotationAngle));
      }
      ctx.closePath()
      ctx.clip()
    }


    function estrela() {
      const x = imagew / 2;
      const y = imageh / 2;
      const outerRadius = imagew / 2;
      const innerRadius = outerRadius / (0.01 * atk + 1);
      const numPoints = lados;
      const angleIncrement = (2 * Math.PI) / numPoints;
      const rotationAngle = (rotationDegrees * Math.PI) / 180; // x i n x y la

      ctx.beginPath();
      ctx.moveTo(x + outerRadius * Math.cos(-Math.PI / 2 + rotationAngle), y + outerRadius * Math.sin(-Math.PI / 2 + rotationAngle));

      for (let i = 0; i < numPoints; i++) {
        const outerX = x + outerRadius * Math.cos((i * angleIncrement) - (Math.PI / 2) + rotationAngle);
        const outerY = y + outerRadius * Math.sin((i * angleIncrement) - (Math.PI / 2) + rotationAngle);
        ctx.lineTo(outerX, outerY);

        const innerX = x + innerRadius * Math.cos(((i + 0.5) * angleIncrement) - (Math.PI / 2) + rotationAngle);
        const innerY = y + innerRadius * Math.sin(((i + 0.5) * angleIncrement) - (Math.PI / 2) + rotationAngle);
        ctx.lineTo(innerX, innerY);
      }


      ctx.closePath();
      ctx.clip();
    }


    function coracao() {
      const x = imagew / 2; // Ajuste fino para a curva de bezier
      const y = imageh / 1.72; // Ajuste fino para a curva de bezier
      const radius = Math.min(imagew, imageh) / 2;
      const scale = 1.66; // Ajuste fino para a curva de bezier

      ctx.beginPath();
      ctx.moveTo(x, y + radius / 2 * scale);
      ctx.bezierCurveTo(x + radius * scale, y - radius / 2 * scale, x + radius / 2 * scale, y - radius * scale, x, y - radius / 2 * scale);
      ctx.bezierCurveTo(x - radius / 2 * scale, y - radius * scale, x - radius * scale, y - radius / 2 * scale, x, y + radius / 2 * scale);
      ctx.closePath();
      ctx.clip()
    }

    function trapezoide() {
      if (atk > 100) { atk = 100 }
      var topWidth = imagew - ((imagew / 100) * atk);
      var bottomWidth = imagew;
      var height = imageh;
      var x = imagew / 2
      var y = imageh / 2;

      ctx.beginPath();
      ctx.moveTo(x - topWidth / 2, y - height / 2);
      ctx.lineTo(x + topWidth / 2, y - height / 2);
      ctx.lineTo(x + bottomWidth / 2, y + height / 2);
      ctx.lineTo(x - bottomWidth / 2, y + height / 2);
      ctx.closePath();
      ctx.clip();
    }

    


  },

  mod() { }
}
