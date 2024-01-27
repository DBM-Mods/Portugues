module.exports = {
  name: "Transfer Variable MOD",
  section: "Other Stuff",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


  subtitle(data, presets) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const storeTypes = presets.variables;

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storeTypes[parseInt(data.storage, 10)]} (${data.varName}) -> ${storeTypes[parseInt(data.storage2, 10)]} (${data.varName2})</font>`
  },


  fields: ["storage", "varName", "storage2", "varName2", "descriptioncolor", "description", "descriptionx"],


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


<retrieve-from-variable dropdownLabel="Transferir valor de" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<retrieve-from-variable style="padding-top: 8px;" dropdownLabel="Transferir valor para" selectId="storage2" variableContainerId="varNameContainer2" variableInputId="varName2"></retrieve-from-variable>
</div>

<style>
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.xinelaslink{margin-top:-4px}
.xinelaslink:hover{opacity:0.8 !important}
</style>
`;
  },


  init() {
    const { document, glob } = this

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

    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const var1 = this.getVariable(storage, varName, cache);
    if (!var1) {
      this.callNextAction(cache);
      return;
    }

    const storage2 = parseInt(data.storage2, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    this.storeValue(var1, storage2, varName2, cache);
    this.callNextAction(cache);
  },


  mod(DBM) {},
};
