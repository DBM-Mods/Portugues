module.exports = {

    name: 'Convert Date MOD',
    section: 'Other Stuff',
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
  
      const storage = presets.variables;
  
      return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Converter "${data.date}" para o formato "${data.format2}" ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
    },
  
    variableStorage(data, varType) {
      if (parseInt(data.storage, 10) !== varType) return;
      if (data.mode) {
        return [data.varName, "Texto"];
      } else {
        return [data.varName, "Número"];
      }
    },
  
    fields: ['date', 'format', 'format2','mode', 'storage', 'varName','descriptioncolor','description','descriptionx'],
  
    html(_isEvent, data) {
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

      <div style="width: 100%">
        <span class="dbminputlabel">Formato da data (<span class="xinelaslink" data-url="https://momentjs.com/docs/#/displaying/format/">Documento</span>)</span>
        <input type="text" id="format" class="round" placeholder="Ex: MM/DD/YYYY HH:mm:ss">
      </div>
   
    <div style="width: 100%; padding-top: 16px;">
    <span class="dbminputlabel">Data</span>
    <input id="date" class="round" type="text" placeholder='22/02/2022 22:22:22'></div>

      <div style="width: 100%;padding-top: 16px;">
        <span class="dbminputlabel">Converter para o formato (<span class="xinelaslink" data-url="https://momentjs.com/docs/#/displaying/format/">Documento</span>)</span>
        <input type="text" id="format2" class="round" placeholder="Ex: DD/MM/YYYY HH:mm:ss">
      </div>

  <div style="float: left; width: 35%; padding-top: 16px;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
    ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 16px;">
  <span class="dbminputlabel">Nome da variável</span><br>
    <input id="varName" class="round" type="text">
  </div>
  
  </div>
  <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
span.xinelaslink {
  color: #99b3ff;
  text-decoration: underline;
              cursor: pointer
          }

     span.xinelaslink:hover { 
              color:#4676b9
          }
</style>
`;
    },
  
    init() {
      const { glob, document } = this;
      glob.variableChange(document.getElementById('storage'), 'varNameContainer');

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
        const moment = require('moment');

        const date = this.evalMessage(data.date, cache) || new Date();
        const format = this.evalMessage(data.format, cache) || "MM/DD/YYYY HH:mm:ss";
        const format2 = this.evalMessage(data.format2, cache) || "DD/MM/YYYY HH:mm:ss";

        let result
        result = moment(date, format).format(format2)

           const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(result, storage, varName, cache);

      this.callNextAction(cache);
    },
  
    mod() {},
  };