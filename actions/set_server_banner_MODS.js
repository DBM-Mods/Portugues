module.exports = {
  name: "Set Server Banner MOD",
  section: "Server Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    if(data.descriptionx == true){
      desccor = data.descriptioncolor
      } else {
        desccor = 'none'
      }

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${presets.getServerText(data.server, data.varName)}</font>`
  },

 fields: [ "server", "varName", "url", "iffalse", "iffalseVal", "descriptioncolor", "description", "descriptionx" ],

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

<server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Caminho local/Url de imagem</span><br>
	<input id="url" class="round" type="text" value="./resources/"><br>
</div>

<div style="float: left; width: 40%">
<span class="dbminputlabel">Se o banner não for alterado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selecionado>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</div>
<div id="iffalseContainer" style="display: none; float: right; width: 55%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>


</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },

  init() {
    const { glob, document } = this;

	  glob.onComparisonChanged2 = function (event) {
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
  
	  glob.onComparisonChanged2(document.getElementById("iffalse"));

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

    const server = await this.getServerFromData(data.server, data.varName, cache);
    if (!server) {
      return this.executeResults(false, data, cache)
    }
    
    const image = this.evalMessage(data.url, cache);

    if(server.premiumTier == "TIER_2" || server.premiumTier == "TIER_3"){

      try{
        await server.setBanner(image)
        this.callNextAction(cache)
        } catch(err) {this.displayError(data, cache, err)
          this.executeResults(false, data, cache)
        }

    } else {
      this.executeResults(false, data, cache)
    }


  },

  mod() {},
};
