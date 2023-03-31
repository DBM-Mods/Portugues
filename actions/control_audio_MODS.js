module.exports = {
  name: "Control Audio MOD",
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

    const actions = ["Parar completamente", "Pausar Audio", "Continuar Audio", "Reiniciar Audio", "Pular Audio", "Voltar para o Audio anterior"];

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${actions[parseInt(data.action, 10)]}</font>`
  },

  fields: ["action", "descriptioncolor", "description", "descriptionx"],


  html(isEvent, data) {
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

<div>
	<span class="dbminputlabel">Ação</span><br>
	<select id="action" class="round">
		<option value="0" selected>Parar completamente</option>
		<option value="1">Pausar Audio</option>
		<option value="2">Continuar Audio</option>
    <option value="3">Reiniciar Audio</option>
    <option value="4">Pular Audio</option>
    <option value="5">Voltar para o Audio anterior</option>
	</select>
</div><br>

Esta action requer o bot.js modificado!<br>
</div>


<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>

`;
  },


  init() {
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

  action(cache) {

    const data = cache.actions[cache.index];
    const { Audio } = this.getDBM();
    const server = cache.server;
    const subscription = server && Audio.subscriptions.get(server.id);
    if (!subscription) return this.callNextAction(cache);
    const Audiox = this.getDBM().Audio;
    const subscriptionx = Audiox.getSubscription(server);
    const action = parseInt(data.action, 10);
    switch (action) {
      case 0:
        subscription.stop();
        break;
      case 1:
        subscription.audioPlayer.pause()
        break;
      case 2:
        subscription.audioPlayer.unpause();
        break;
      case 3:
        var queue = subscriptionx?.queue.slice();

        subscriptionx.queueLock = true;

        if (queue.length === 0) { queue = [] }

        queue.unshift(subscription.currentsongobj)

        subscriptionx.queue = queue;
        subscriptionx.queueLock = false;
        subscriptionx.processQueue();
        subscription.audioPlayer.stop()

        subscription.previouslist.shift()

        break;
      case 4:
        subscription.audioPlayer.stop();
        break;
      case 5:
        var queue = subscriptionx?.queue.slice();

        subscriptionx.queueLock = true;

        if (queue.length === 0) { queue = [] }

        queue.unshift(subscription.currentsongobj)
        queue.unshift(subscription.previouslist[1])

        subscriptionx.queue = queue;
        subscription.previouslist.shift()
        subscription.previouslist.shift()

        subscriptionx.queueLock = false;
        subscriptionx.processQueue();
        subscription.audioPlayer.stop()
        
        break;
    }
    this.callNextAction(cache);


  },

  mod() { },
};

