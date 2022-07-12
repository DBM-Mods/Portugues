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

fields: ["storage", "varName", "x", "y", "fontPath", "fontColor", "fontSize", "align", "text"],

html: function(isEvent, data) {
	return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

	<table style="width:100%"><tr>
<td><span class="dbminputlabel">Imagem Canvas</span><br>
<select id="storage" class="round" style="width: 100%" onchange="glob.refreshVariableList(this)">
	${data.variables[1]}
</select></td>
<td><span class="dbminputlabel">Nome da Variavel</span><br>
	<input id="varName" class="round" type="text" value="FFFFFF" list="variableList">
</td>

<tr>
<td>
<span class="dbminputlabel">Fonte do Texto (Local/URL)</span><br>
<input id="fontPath" class="round" type="text" value="fonts/">
</td>

<td>
<span class="dbminputlabel">Cor do texto (Hex)</span><br>
    <table style="width:100%"><tr><th><input id="fontColor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código de cor HEX..."><th>
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

<tr>
<td>
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

<td>
<span class="dbminputlabel">Tamanho do texto</span><br>
	<input id="fontSize" class="round" type="text" placeholder="Default size 10px">
</td>


<tr>
<td>
<span class="dbminputlabel">Posição X</span><br>
	<input id="x" class="round" type="text" value="0">
</td>

<td>
<span class="dbminputlabel">Posição Y</span><br>
	<input id="y" class="round" type="text" value="0">
</td>



</tr></table>


<br>
<span class="dbminputlabel">Texto</span><br>
	<textarea id="text" rows="4" placeholder="Insira seu texto aqui..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
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
	ctx.fillStyle = fontColor;
	ctx.fillText(text, x, y);
	const result = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	this.storeValue(result, storage, varName, cache);
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};