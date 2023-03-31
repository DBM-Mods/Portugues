module.exports = { 
    name: "Check if Thread Exists MOD",  
    section: "Conditions",
    meta: {
      version: "2.1.7",
      preciseCheck: true,
      author: '[Tempest - 321400509326032897]<br>[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },
  
    subtitle(data, presets) {

      if(data.descriptionx == true){
        desccor = data.descriptioncolor
        } else {
          desccor = 'none'
        }
  
      const storage = presets.variables;
  
      return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storage[parseInt(data.storage, 10)]} (${data.varName2})</font>`
    },
   
    fields: ["channel", "varName", "info", "find", "branch", "storage", "varName2","descriptioncolor","description","descriptionx"],

    variableStorage(data, varType) {
      const type = parseInt(data.storage, 10);
      if (type !== varType) return;
      return [data.varName2, "Canal"];
    },
  
  
    html(isEvent, data) {
      return `
      <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
      <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>
  
      <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">
  
      <div id="flutuador" style="padding:0px 0px 15px 0px">
  <table style="width:100%;"><tr>
  <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
  <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
  </tr></table>
  </div>
  
      <channel-input dropdownLabel="Canal" selectId="channel" variableContainerId="varNameContainer" variableInputId="varName"></channel-input>
  
      <br><br><br>
  
      <div style="padding:8px 0px;">
        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Buscar por</span><br>
          <select id="info" class="round">
            <option value="0" selected>ID</option>
            <option value="1">Nome</option>
          </select>
        </div>
        <div style="float: right; width: 60%;">
          <span class="dbminputlabel">Pesquisar por</span><br>
          <input id="find" class="round" type="text">
        </div>
      </div>
  
      <br><br>
      <div style="padding:8px 0px;">
      <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>
      </div>
      <br><br>
      <div style="padding:8px 0px;">
      <store-in-variable allowNone style="padding-top: 8px;" selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      </div>

            <style>
            table{width:100%}
            .col1{width:32%}
            .col2{width:60%;padding:0px 0px 0px 20px}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
      
      `
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
      const channel = await this.getChannelFromData(data.channel, data.varName, cache);
      const threads = channel.threads.cache;
      const find = this.evalMessage(data.find, cache);
      const info = parseInt(data.info, 10);
      let result;
  
      if (!channel) {
        this.callNextAction(cache);
        return;
      }
  
      switch(info) {
            case 0:
                result = threads.get(find);
                break;
            case 1:
                result = threads.find((c) => c.name === find);
                break;
      }
  
      var result2 = Boolean(result)
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result, storage, varName2, cache);
    }
      this.executeResults(result2, data?.branch ?? data, cache);
    },
    
    modInit(data) {
      this.prepareActions(data.branch?.iftrueActions);
      this.prepareActions(data.branch?.iffalseActions);
    },
  
    mod() {},
  };
  