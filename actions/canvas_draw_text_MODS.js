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

fields: ["storage", "varName", "x", "y", "fontPath", "fontColor", "fontSize", "align", "text", "shadowcor", "blur", "shadowh", "shadowv", "fontColor2", "fontColor3",],

html: function(isEvent, data) {
	return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
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

<tr>
<td>
<span class="dbminputlabel">Fonte do Texto (Local/URL)</span><br>
<input id="fontPath" class="round" type="text" value="fonts/">
</td>
<td style="width:175px">
<span class="dbminputlabel">Tamanho</span><br>
	<input id="fontSize" class="round" type="text" placeholder="Default size 10px">
</td>
</tr>

</table>


<div style="padding-top:8px">
<span class="dbminputlabel">Sombra do Texto</span>
<table style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;"><tr>
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

</tr></table></div>

<div style="padding-top:8px">
<span class="dbminputlabel">Cor do Texto (HEX ou RGBA)</span>
<table style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;"><tr>
<td style="width:33% !important">
<span class="dbminputlabel">Cor Principal</span><br>
    <table style="width:100%"><tr><th><input value="#FFFFFF" id="fontColor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."><th>
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
    <table style="width:100%"><tr><th><input id="fontColor2" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."><th>
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
    <table style="width:100%"><tr><th><input id="fontColor3" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."><th>
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

<div style="padding-top:8px">
<span class="dbminputlabel">Posição do Texto</span>
<table style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;"><tr>
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



</tr></table></div>


<br>
<span class="dbminputlabel">Texto</span><br>
	<textarea id="text" rows="3" placeholder="Insira seu texto aqui..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
</div>

</div>

<style>
td{width:50%;padding:5px;}
</style>`
},

init: function() {
	const {glob, document} = this;

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
	const shadowcor = this.evalMessage(data.shadowcor, cache);
	const fontColor2 = this.evalMessage(data.fontColor2, cache);
	const fontColor3 = this.evalMessage(data.fontColor3, cache);
	const align = parseInt(data.align);
	const x = parseInt(this.evalMessage(data.x, cache));
	const y = parseInt(this.evalMessage(data.y, cache));
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
	const result = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	this.storeValue(result, storage, varName, cache);
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
