module.exports = {

name: "Canvas Draw Text on Image MOD",
section: "Image Editing",
meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
	return `${data.text}`;
},

fields: ["storage", "varName", "x", "y", "fontPath", "fontColor", "fontSize", "align", "text", "shadowcor", "blur", "shadowh", "shadowv", "fontColor2", "fontColor3", "largura" , "larguramax" , "rotacionar", "x2" , "y2" , "tipocor", "gradiente", "nqp" , "distancia"],

html: function(isEvent, data) {
	return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

	<div style="height: 370px; overflow-y: scroll;padding:0px 10px">

	<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Imagem Canvas</span><br>
<select id="storage" class="round" style="width: 100%" onchange="glob.refreshVariableList(this)">
	${data.variables[1]}
</select></td>
<td><span class="dbminputlabel">Nome da Variavel</span><br>
	<input id="varName" class="round" type="text" list="variableList">
</td></tr>

</table>

<div style="padding-top:12px">
<span class="dbminputlabel">Fonte do Texto (Local/URL)</span><br>
<input id="fontPath" class="round" type="text" value="fonts/">
<div>

<div style="padding-top:12px">
<span class="dbminputlabel">Sombra do Texto</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<table style="width:100%"><tr>
<td style="width:30px"><span class="dbminputlabel">Borrão</span><br>
<input id="blur" class="round" type="text" value="0"></td>

<td style="width:100px"><span class="dbminputlabel">Mover X</span><br>
<input id="shadowh" class="round" type="text" value="0"></td>
<td style="width:100px"><span class="dbminputlabel">Mover Y</span><br>
<input id="shadowv" class="round" type="text" value="0"></td>

<td style="width:200px !important">
<span class="dbminputlabel">Cor (HEX / RGBA)</span><br>
    <table style="width:100%"><tr><th><input value="#FFFFFF" id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('shadowcor').type = 'color'
      document.getElementById('2btr1').style.display = 'none';
      document.getElementById('2btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('shadowcor').type = 'text';
        document.getElementById('2btr1').style.display = 'block';
        document.getElementById('2btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
</td>

</tr></table></div></div>

<div style="padding-top:12px">
<span class="dbminputlabel">Cor do Texto (HEX ou RGBA)</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">

<span class="dbminputlabel">Tipo de Cor</span>
<select id="tipocor" class="round" onchange="glob.onChange0(this)">
  <option value="0" selected>Cor (HEX ou RGBA)</option>
  <option value="1">Cor Gradiente</option>
</select>
<br>
<div id="gradient">
<span class="dbminputlabel">Gradiente</span>
<textarea id="gradiente" name="gradientes" rows="4" style="width: 100%; white-space: nowrap; resize:yes"></textarea><br>
</div>

<div id="cor">
<table style="width:100%"><tr>
<td style="width:33% !important">
<span class="dbminputlabel">Cor Principal</span><br>
    <table style="width:100%"><tr><th><input value="#FFFFFF" id="fontColor" name="actionxinxyla" class="round" type="text" placeholder="Requerido"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('fontColor').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('fontColor').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
</td>

<td style="width:33% !important">
<span class="dbminputlabel">Cor Diagonal 1</span><br>
    <table style="width:100%"><tr><th><input id="fontColor2" name="actionxinxyla" class="round" type="text" placeholder="Opcional"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('fontColor2').type = 'color'
      document.getElementById('3btr1').style.display = 'none';
      document.getElementById('3btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('fontColor2').type = 'text';
        document.getElementById('3btr1').style.display = 'block';
        document.getElementById('3btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
</td>

<td style="width:33% !important">
<span class="dbminputlabel">Cor Diagonal 2</span><br>
    <table style="width:100%"><tr><th><input id="fontColor3" name="actionxinxyla" class="round" type="text" placeholder="Opcional"><th>
    <th style="width:40px;text-align:center;padding:4px"><a id="4btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('fontColor3').type = 'color'
      document.getElementById('4btr1').style.display = 'none';
      document.getElementById('4btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="4btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('fontColor3').type = 'text';
        document.getElementById('4btr1').style.display = 'block';
        document.getElementById('4btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><th></tr></table>
</td>

</tr></table></div>

</div></div>

<div style="padding-top:12px">
<span class="dbminputlabel">Definições do Texto</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<table style="width:100%"><tr>
<td style="width:48%">
<span class="dbminputlabel">Tamanho do Texto</span><br>
	<input id="fontSize" class="round" type="text" placeholder="Tamanho padrão 10px">
</td>
<td style="width:48% !important">
<span class="dbminputlabel">Largura Fixa</span><br>
	<input id="largura" class="round" type="text" placeholder="Opcional">
</td></tr></table><br>

<table style="width:100%"><tr>

<td style="width:32%">
<span class="dbminputlabel">Largura Máxima</span><br>
	<input id="larguramax" class="round" type="text" placeholder="Opcional">
</td>
<td style="width:4% !important;text-align:center"><br><b>></b></td>
<td style="width:32%">
<span class="dbminputlabel">Quebrar palavras?</span>
<select id="nqp" class="round">
  <option value="0" selected>Sim</option>
  <option value="1">Não</option>
</select></td>
<td style="width:32%">
<span class="dbminputlabel">Altura de distancia</span>
<input id="distancia" class="round" type="text" placeholder="Opcional"></td></tr></table>
</div></div>

<div style="padding-top:12px">
<span class="dbminputlabel">Girar texto</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<table style="width:100%"><tr>
<td style="width:33% !important">
<span class="dbminputlabel">Girar (Graus)</span><br>
	<input id="rotacionar" class="round" type="text" value="0">
</td>

<td style="width:33% !important">
<span class="dbminputlabel">Correção X</span><br>
	<input id="x2" class="round" type="text" value="0">
</td>

<td style="width:33% !important">
<span class="dbminputlabel">Correção Y</span><br>
	<input id="y2" class="round" type="text" value="0">
</td>



</tr></table></div></div>

<div style="padding-top:12px">
<span class="dbminputlabel">Posição do Texto</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<table style="width:100%"><tr>
<td style="width:33% !important">
<span class="dbminputlabel">Posição X</span><br>
	<input id="x" class="round" type="text" value="0">
</td>

<td style="width:33% !important">
<span class="dbminputlabel">Posição Y</span><br>
	<input id="y" class="round" type="text" value="0">
</td>
<td style="width:33% !important">
<span class="dbminputlabel">Alinhamento</span><br>
	<select id="align" class="round" style="width: 100%;">
	<option value="0" selected>Superior esquerdo</option>
	<option value="1">Centro superior</option>
	<option value="2">Canto superior direito</option>
	<option value="3">Meio esquerdo</option>
	<option value="4">Centro Central</option>
	<option value="5">Meio direito</option>
	<option value="6">Inferior esquerdo</option>
	<option value="7">Centro inferior</option>
	<option value="8">Inferior direito</option>
	</select>
</td>



</tr></table></div></div>


<br>
<span class="dbminputlabel">Texto</span><br>
	<textarea id="text" rows="3" placeholder="Insira seu texto aqui..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
</div>

</div>

<style>
td{width:50%;padding:2px;}
</style>`
},

init: function() {
	const {glob, document} = this;

	glob.onChange0 = function (event) {
		switch (parseInt(event.value)) {
		  case 0:
			gradient.style.display = 'none'
			cor.style.display = null
			break
		  case 1:
			gradient.style.display = null
			cor.style.display = 'none'
			break
		}
	  }
	  glob.onChange0(document.getElementById('tipocor'))


	glob.refreshVariableList(document.getElementById('storage'));
},

action: function(cache) {
	const Canvas = require('canvas');
	const data = cache.actions[cache.index];
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.varName, cache);
	const imagedata = this.getVariable(storage, varName, cache);
	if(!imagedata) {
		this.callNextAction(cache);
		return;
	}
	const fontPath = this.evalMessage(data.fontPath, cache);
	const fontName = fontPath.slice(fontPath.lastIndexOf("/")+1,fontPath.lastIndexOf("."))
	const fontColor = this.evalMessage(data.fontColor, cache);
	const largura = this.evalMessage(data.largura, cache);
	const larguramax = this.evalMessage(data.larguramax, cache);
	const nqp = this.evalMessage(data.nqp, cache);
	var distancia = this.evalMessage(data.distancia, cache);

	let fontSize = parseInt(this.evalMessage(data.fontSize, cache));
	if (isNaN(fontSize)) {
		fontSize = 10;
	}
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
	if (data.distancia > 0) {distancia = (fontSize + parseInt(distancia))} else {distancia = fontSize + 2}

	const shadowcor = this.evalMessage(data.shadowcor, cache);
	const fontColor2 = this.evalMessage(data.fontColor2, cache);
	const fontColor3 = this.evalMessage(data.fontColor3, cache);
	const align = parseInt(data.align);
	const tipocor = parseInt(data.tipocor);
	const x = parseInt(this.evalMessage(data.x, cache));
	const y = parseInt(this.evalMessage(data.y, cache));
	const rotacionar = parseInt(this.evalMessage(data.rotacionar, cache));
	const x2 = parseInt(this.evalMessage(data.x2, cache));
	const y2 = parseInt(this.evalMessage(data.y2, cache));
	const text = this.evalMessage(data.text, cache);
	const image = new Canvas.Image();
	image.src = imagedata;
	const canvas = Canvas.createCanvas(image.width,image.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(image, 0, 0, image.width, image.height);
	Canvas.registerFont(fontPath, {family:fontName})
	ctx.font = fontSize+"px "+fontName;
	ctx.shadowColor = shadowcor
	ctx.shadowOffsetX = shadowh;
	ctx.shadowOffsetY = shadowv;
	ctx.shadowBlur = blur;
	switch(align) {
		case 0:
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			break;
		case 1:
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			break;
		case 2:
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			break;
		case 3:
			ctx.textAlign = "left";
			ctx.textBaseline = "middle";
			break;
		case 4:
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			break;
		case 5:
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			break;
		case 6:
			ctx.textAlign = "left";
			ctx.textBaseline = "bottom"; 
			break;
		case 7:
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom"; 
			break;
		case 8:
			ctx.textAlign = "right";
			ctx.textBaseline = "bottom"; 
	}

	ctx.translate(x2, y2);
	ctx.rotate(rotacionar * Math.PI / 180)

	if(tipocor == 1) {
	eval(String(this.evalMessage(data.gradiente, cache)))
	ctx.fillStyle = gradient;

	if (larguramax > 0){
		if(nqp == 0){
	printAt(ctx, text, x, y, distancia, 250);
	function printAt(ctx, text, x, y, lineHeight, fitWidth) {
	  fitWidth = fitWidth || 0;
		  if (fitWidth <= 0) {
		ctx.fillText(text, x, y);
		return;
	  }
	  for (var idx = 1; idx <= text.length; idx++) {
		var str = text.substr(0, idx);
		if (ctx.measureText(str).width > fitWidth) {
			ctx.fillText(text.substr(0, idx - 1), x, y);
		  printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
		  return;
		}
	  }
	  ctx.fillText(text, x, y);

	}

	}
	if (nqp == 1) {
		printAt(ctx, text, x, y, distancia, larguramax);
		function printAt(ctx, text, x, y, lineHeight, fitWidth) {
		fitWidth = fitWidth || 0;
		if (fitWidth <= 0) {
		ctx.fillText(text, x, y);
		return;}
		var words = text.split(' ');
		var currentLine = 0;
		var idx = 1;
		while (words.length > 0 && idx <= words.length)
		{   var str = words.slice(0,idx).join(' ');
		var w = ctx.measureText(str).width;
		if ( w > fitWidth )
		{if (idx==1)
		{idx=2;}
		ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
		currentLine++;
		words = words.splice(idx-1);
		idx = 1;
		}
		else
		{idx++;}
		}
		if  (idx > 0)
		ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
		}
		}

} else {ctx.fillText(text, x, y)}


		} else {
			if (largura > 0){
				if (fontColor2 !== "") {
					ctx.fillStyle = fontColor2
					  ctx.fillText(text, x-(fontSize/15), y-(fontSize/15), largura);
					

				}
				if (fontColor3 !== "") {
					ctx.fillStyle = fontColor3
					  ctx.fillText(text, x+(fontSize/15), y+(fontSize/15), largura);

			}
					ctx.fillStyle = fontColor;
					ctx.fillText(text, x, y, largura);
					


				}
				else {


					if (larguramax !== undefined){
					if (fontColor !== "") {

						if (nqp == 0) {
										
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						  fitWidth = fitWidth || 0;
							  if (fitWidth <= 0) {
								ctx.fillStyle = fontColor
								ctx.fillText(text, x, y);
							return;
						  }
						  for (var idx = 1; idx <= text.length; idx++) {
							var str = text.substr(0, idx);
							if (ctx.measureText(str).width > fitWidth) {
								ctx.fillStyle = fontColor
								ctx.fillText(text.substr(0, idx - 1), x, y);
							  printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
							  return;
							}
						  }
						  ctx.fillStyle = fontColor
						  ctx.fillText(text, x, y);
						}
					}
					if (nqp == 1) {
printAt(ctx, text, x, y, distancia, larguramax);
function printAt(ctx, text, x, y, lineHeight, fitWidth) {
fitWidth = fitWidth || 0;
if (fitWidth <= 0) {
ctx.fillStyle = fontColor
ctx.fillText(text, x, y);
return;}
var words = text.split(' ');
var currentLine = 0;
var idx = 1;
while (words.length > 0 && idx <= words.length)
{   var str = words.slice(0,idx).join(' ');
var w = ctx.measureText(str).width;
if ( w > fitWidth )
{if (idx==1)
{idx=2;}
ctx.fillStyle = fontColor;
ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
currentLine++;
words = words.splice(idx-1);
idx = 1;
}
else
{idx++;}
}
if  (idx > 0)
ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
}
}

					}

					if (fontColor2 !== "" & fontColor !== "") {
										
if(nqp == 0){
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						  fitWidth = fitWidth || 0;
							  if (fitWidth <= 0) {
								ctx.fillStyle = fontColor2
								ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text, x, y);
							return;
						  }
						  for (var idx = 1; idx <= text.length; idx++) {
							var str = text.substr(0, idx);
							if (ctx.measureText(str).width > fitWidth) {
								ctx.fillStyle = fontColor2
								ctx.fillText(text.substr(0, idx - 1), x-(fontSize/15), y-(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text.substr(0, idx - 1), x, y);
							  printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
							  return;
							}
						  }
						  ctx.fillStyle = fontColor2
						  ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
						  ctx.fillStyle = fontColor
						  ctx.fillText(text, x, y);
						}
					}
					if (nqp == 1) {
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						fitWidth = fitWidth || 0;
						if (fitWidth <= 0) {
							ctx.fillStyle = fontColor2
							ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
						ctx.fillStyle = fontColor
						ctx.fillText(text, x, y);
						return;}
						var words = text.split(' ');
						var currentLine = 0;
						var idx = 1;
						while (words.length > 0 && idx <= words.length)
						{   var str = words.slice(0,idx).join(' ');
						var w = ctx.measureText(str).width;
						if ( w > fitWidth )
						{if (idx==1)
						{idx=2;}
						ctx.fillStyle = fontColor2;
						ctx.fillText( words.slice(0,idx-1).join(' '), x-(fontSize/15), y-(fontSize/15) + (lineHeight*currentLine) );
						ctx.fillStyle = fontColor;
						ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
						currentLine++;
						words = words.splice(idx-1);
						idx = 1;
						}
						else
						{idx++;}
						}
						if  (idx > 0)
						ctx.fillStyle = fontColor2
						ctx.fillText( words.join(' '), x-(fontSize/15), y-(fontSize/15) + (lineHeight*currentLine));
						ctx.fillStyle = fontColor
						ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
						}
						}

					}

					if (fontColor3 !== "" & fontColor !== "") {
						if(nqp == 0){

						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						  fitWidth = fitWidth || 0;
							  if (fitWidth <= 0) {
								ctx.fillStyle = fontColor3
								ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text, x, y);
							return;
						  }
						  for (var idx = 1; idx <= text.length; idx++) {
							var str = text.substr(0, idx);
							if (ctx.measureText(str).width > fitWidth) {
								ctx.fillStyle = fontColor3
								ctx.fillText(text.substr(0, idx - 1), x+(fontSize/15), y+(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text.substr(0, idx - 1), x, y);
							  printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
							  return;
							}
						  }
						  ctx.fillStyle = fontColor3
						  ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
						  ctx.fillStyle = fontColor
						  ctx.fillText(text, x, y);
						}
					}
					if (nqp == 1) {
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						fitWidth = fitWidth || 0;
						if (fitWidth <= 0) {
							ctx.fillStyle = fontColor3
							ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
						ctx.fillStyle = fontColor
						ctx.fillText(text, x, y);
						return;}
						var words = text.split(' ');
						var currentLine = 0;
						var idx = 1;
						while (words.length > 0 && idx <= words.length)
						{   var str = words.slice(0,idx).join(' ');
						var w = ctx.measureText(str).width;
						if ( w > fitWidth )
						{if (idx==1)
						{idx=2;}
						ctx.fillStyle = fontColor3;
						ctx.fillText( words.slice(0,idx-1).join(' '), x+(fontSize/15), y+(fontSize/15) + (lineHeight*currentLine) );
						ctx.fillStyle = fontColor;
						ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
						currentLine++;
						words = words.splice(idx-1);
						idx = 1;
						}
						else
						{idx++;}
						}
						if  (idx > 0)
						ctx.fillStyle = fontColor3
						ctx.fillText( words.join(' '), x+(fontSize/15), y+(fontSize/15) + (lineHeight*currentLine));
						ctx.fillStyle = fontColor
						ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
						}
						}
					}
					

					if (fontColor3 !== "" & fontColor2 !== "" & fontColor !== "") {
										
						if(nqp == 0){
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						  fitWidth = fitWidth || 0;
							  if (fitWidth <= 0) {
								ctx.fillStyle = fontColor2
								ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
								ctx.fillStyle = fontColor3
								ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text, x, y);
							return;
						  }
						  for (var idx = 1; idx <= text.length; idx++) {
							var str = text.substr(0, idx);
							if (ctx.measureText(str).width > fitWidth) {
								ctx.fillStyle = fontColor2
								ctx.fillText(text.substr(0, idx - 1), x-(fontSize/15), y-(fontSize/15));
								ctx.fillStyle = fontColor3
								ctx.fillText(text.substr(0, idx - 1), x+(fontSize/15), y+(fontSize/15));
								ctx.fillStyle = fontColor
								ctx.fillText(text.substr(0, idx - 1), x, y);
							  printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
							  return;
							}
						  }
						  ctx.fillStyle = fontColor2
						  ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
						  ctx.fillStyle = fontColor3
						  ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
						  ctx.fillStyle = fontColor
						  ctx.fillText(text, x, y);
						}
					}

					if (nqp == 1) {
						printAt(ctx, text, x, y, distancia, larguramax);
						function printAt(ctx, text, x, y, lineHeight, fitWidth) {
						fitWidth = fitWidth || 0;
						if (fitWidth <= 0) {
							ctx.fillStyle = fontColor2
							ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
							ctx.fillStyle = fontColor3
							ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
						ctx.fillStyle = fontColor
						ctx.fillText(text, x, y);
						return;}
						var words = text.split(' ');
						var currentLine = 0;
						var idx = 1;
						while (words.length > 0 && idx <= words.length)
						{   var str = words.slice(0,idx).join(' ');
						var w = ctx.measureText(str).width;
						if ( w > fitWidth )
						{if (idx==1)
						{idx=2;}
						ctx.fillStyle = fontColor2;
						ctx.fillText( words.slice(0,idx-1).join(' '), x-(fontSize/15), y-(fontSize/15) + (lineHeight*currentLine) );
						ctx.fillStyle = fontColor3;
						ctx.fillText( words.slice(0,idx-1).join(' '), x+(fontSize/15), y+(fontSize/15) + (lineHeight*currentLine) );
						ctx.fillStyle = fontColor;
						ctx.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
						currentLine++;
						words = words.splice(idx-1);
						idx = 1;
						}
						else
						{idx++;}
						}
						if  (idx > 0)
						ctx.fillStyle = fontColor2
						ctx.fillText( words.join(' '), x-(fontSize/15), y-(fontSize/15) + (lineHeight*currentLine));
						ctx.fillStyle = fontColor3
						ctx.fillText( words.join(' '), x+(fontSize/15), y+(fontSize/15) + (lineHeight*currentLine));
						ctx.fillStyle = fontColor
						ctx.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
						}
						}
				}


					} else {

						if (fontColor2 !== "") {
							ctx.fillStyle = fontColor2
							ctx.fillText(text, x-(fontSize/15), y-(fontSize/15));
						}
						if (fontColor3 !== "") {
							ctx.fillStyle = fontColor3
							ctx.fillText(text, x+(fontSize/15), y+(fontSize/15));
						}
							ctx.fillStyle = fontColor;
							ctx.fillText(text, x, y);

					}
			
				

				}
		}
	const result = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	this.storeValue(result, storage, varName, cache);
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
