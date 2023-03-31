module.exports = {
  name: "Add Playlist File MOD",
  section: "Audio Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },
  requiresAudioLibraries: true,

  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const storage = presets.variables

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Add playlist: ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },


  fields: ["pasta", "storage", "varName", "seek", "type", "volume", "bitrate", "iffalse", "iffalseVal", "descriptioncolor", "description", "descriptionx"],

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


	<span class="dbminputlabel">Pasta</span><br>
	<input id="pasta" class="round" type="text" value="./resources/"><br>

  <div>
  <div style="float: left; width: 35%">
  <span class="dbminputlabel">Playlist ~ Lista</span><br>
  <select id="storage" class="round">
  ${data.variables[1]}
  </select>
</div>
<div id="varNameContainer" style="float: right; width: 60%">
<span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="varName" class="round" type="text" list="variableList">
</div>
</div>


  <br> <br> <br>

  <div style="width:100%;padding-top: 8px">
<div style="float: left; width: 33%">
  <span class="dbminputlabel">Volume</span><br>
  <input id="volume" class="round" type="text" placeholder="Deixe em branco para automático..."><br>
  </div>

  <div style="float: left; width: calc(34% - 12px);padding:0px 6px">
	<span class="dbminputlabel">Bitrate</span><br>
	<input id="bitrate" class="round" type="text" placeholder="Deixe em branco para automático..."><br>
  </div>

<div style="float: left; width: 33%">
	<span class="dbminputlabel">Seek Position</span><br>
	<input id="seek" class="round" type="text" value="0"><br>
</div>

</div>
<br><br><br><br>

<div>
	<span class="dbminputlabel">Ação</span><br>
	<select id="type" class="round" style="width: 100%;">
		<option value="0" selected>Adicionar no final da fila</option>
		<option value="1">Adicionar no inicio da fila e tocar o primeiro audio</option>
	</select>
</div>

</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`;
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

  async action(cache) {
    const data = cache.actions[cache.index];
    const Audio = this.getDBM().Audio;
    const options = {};
    if (data.seek) {
      options.seek = parseInt(this.evalMessage(data.seek, cache), 10);
    }
    if (data.volume) {
      options.volume = parseInt(this.evalMessage(data.volume, cache), 10) / 100;
    }
    if (data.bitrate) {
      options.bitrate = parseInt(this.evalMessage(data.bitrate, cache), 10);
    }

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    var playlist = this.getVariable(storage, varName, cache)
    const pasta = this.evalMessage(data.pasta, cache)

    for (let i = 0; i < playlist.length; i++) {
      
    var add = pasta + playlist[i]
    var info = ["file", options, add];
    Audio.addAudio(info, cache.server, data.type === "0")
    }



    this.callNextAction(cache);
  },

  mod() { },
};
