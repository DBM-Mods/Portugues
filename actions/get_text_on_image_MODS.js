
  module.exports = {
    name: 'Get Text From Image MOD',
    section: 'Other Stuff',
    meta: {
      version: '2.1.6',
      preciseCheck: true,
      author: '[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },
  
    subtitle(data) {
      return `Obter texto da imagem "${data.image}"` 
    },

    variableStorage (data, varType) {
      const type = parseInt(data.storage)
      if (type !== varType) return
      return ([data.varName, 'Texto'])
    },
  
    fields: ["image", "lang", "storage", "debug", "varName"], 

    html(data, isEvent) {
      return `
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
      <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
      
        <span class="dbminputlabel">Local/Web URL da imagem</span><br>
        <input id="image" class="round" type="text"><br>

        <span class="dbminputlabel">língua do texto da imagem</span><span class="xinxylalink dbminputlabel" style="float:right" data-url="https://tesseract-ocr.github.io/tessdoc/Data-Files#data-files-for-version-400-november-29-2016">Prefixo das Linguas</span><br>
        <input id="lang" class="round" value="por" type="text"><br>

        <span class="dbminputlabel">Mostrar progresso</span><br>
        <select id="debug" class="round">
        <option value="0" selected>Não</option>
          <option value="1">Sim</option>
        </select><br>
        
        <store-in-variable dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
        
        <style>
span.xinxylalink {
  color: #99b3ff;
  text-decoration:underline;
  cursor:pointer;
}

span.xinxylalink:hover {
  color:#4676b9;
}
</style>`;
    },


    init () {
      const { document } = this
  
            const xinxylalinks = document.getElementsByClassName('xinxylalink');
      for (let x = 0; x < xinxylalinks.length; x++) {
        const xinxylalink = xinxylalinks[x];
        const url = xinxylalink.getAttribute('data-url');
        if (url) {
          xinxylalink.setAttribute('title', url);
          xinxylalink.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            console.log(`URL: [${url}] em seu navegador padrão.`);
            require('child_process').execSync(`start ${url}`);
          });
        }
      }
  
    },
  
    async action(cache) {
      const data = cache.actions[cache.index];
      const image = this.evalMessage(data.image, cache)
      const lang = this.evalMessage(data.lang, cache)

      const { createWorker } = require('tesseract.js')

      const worker = createWorker({
        logger: l => {
          if(data.debug == "1"){
          console.log(`${l.status}: ${l.progress}`)
        }},});

      (async () => {
        await worker.load()
        await worker.loadLanguage(lang)
        await worker.initialize(lang)
        await worker.recognize(image)
        .then(text => {this.storeValue(text.data.text, parseInt(data.storage, 10), data.varName, cache); this.callNextAction(cache)})
        await worker.terminate()
      })();
  },
  
    mod() {},
  };
