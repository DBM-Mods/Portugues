module.exports = {

name: "Comment MOD",
section: "Other Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

subtitle: function(data) {
	return '<font color="' + data.color +'">' + data.comment + '</font>';
},

fields: ["comment", "save", "color"],

html: function(isEvent, data) {
	return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

	<div style="width: 100%; padding:10px 5px;height: calc(100vh - 180px);overflow:auto">

	<span class="dbminputlabel">Título</span>
	<textarea id="comment" rows="3" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>

<br>

<span class="dbminputlabel">Informações</span>
<textarea id="save" rows="6" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>


		 <br>
		<div style="width: 24%">
		<span class="dbminputlabel">Cor</span><br>
		<input type="color" class="round" id="color">
		</div>
		  
		  </div>
		  `
},

init: function() {
},

action: function(cache) {
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};
