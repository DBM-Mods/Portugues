module.exports = {
	name: "Remove from Queue MOD",
	section: "Audio Control",
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

		return data.description
			? `<font style="color:${desccor}">${data.description}</font>`
			: `<font style="color:${desccor}">Remover ${data.amount} audios</font>`
	},


	fields: ["position", "amount", "descriptioncolor", "description", "descriptionx"],

	html: function (isEvent, data) {
		return `
	<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>


<table>
<tr>
<td class="sep1">
	<span class="dbminputlabel">Posição</span><br>
		<input id="position" type="text" class="round" value="0" placeholder="Começe com 0">
	</td>
	<td class="sep2">
	<span class="dbminputlabel">Remover quantidade</span><br>
		<input id="amount" type="text" class="round" value="1">
		</td>
		</tr>
		
		</table>

</div>
<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

table{width:100%}
.sep1{padding:0px 8px 0px 0px}
.sep2{padding:0px 0px 0px 0px}
</style>

`
	},

	init: function () {
		const { glob, document } = this;

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

	},

	action: function (cache) {
		const data = cache.actions[cache.index];

		const { Audio } = this.getDBM();
		const server = cache.server;
		const subscription = server && Audio.subscriptions.get(server.id);
		if (!subscription) return this.callNextAction(cache);

		const position = parseInt(this.evalMessage(data.position, cache));
		const amount = parseInt(this.evalMessage(data.amount, cache));

		let queue;
		if (server) {
			queue = subscription.queue.map((m) => m)
		};
		if (queue.length >= 1 && queue.length >= (position + 1)) {
			queue.splice(position, amount);
			subscription.queue = queue;
		};
		this.callNextAction(cache);
	},

	mod: function (DBM) {
	}

};