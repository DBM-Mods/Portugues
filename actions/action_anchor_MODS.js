module.exports = {
  name: 'Action Anchor MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },
  
  subtitle(data) {
    if(data.descriptionx == true){
      desccor = data.color
      } else {
        desccor = 'none'
      }

    return data.description
      ? `<font style="color:${desccor}">Âncora: ${data.anchorName} | ${data.description}</font>`
      : `<font style="color:${desccor}">Âncora: ${data.anchorName}</font>`},

  fields: ['anchorName', 'color', 'description', 'config', 'actions',"descriptionx"],

  html() {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.5</div>
<tab-system>

    <tab label="Âncora" icon="anchor">
    <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">

<div style="float:left;width:75%">
<span class="dbminputlabel">Nome da âncora</span><br>
  <input type="text" class="round" id="anchorName"><br>
</div>

<div style="float: right; width: 24%;text-align:center">
<div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" class="round" id="color">
</div>

  <div style="float: left; width: 100%;">
  <span class="dbminputlabel">Descrição</span><br>
    <input type="text" class="round" id="description">
  </div>

  </div>
  </tab>
  <tab label="Ações / Config" icon="list layout">
  <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">
  <span class="dbminputlabel">Configuração</span>
  <select id="config" class="round" onchange="glob.onComparisonChanged(this)">
    <option value="0" selected>Continuar ações</option>
    <option value="1">Parar ações</option>
    <option value="2">Usar as seguintes ações e continuar</option>
    <option value="3">Usar somente as seguintes ações e parar</option>
  </select>
<br>
<div id="containerxin">
  <action-list-input id="actions" height="calc(100vh - 340px)"></action-list-input>
  </div>
  </div>
  </tab-system>

  <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
  `;
  },

  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value == 2 || event.value == 3) {
        document.getElementById("containerxin").style.display = "block";
      }
      else {
        document.getElementById("containerxin").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("config"));

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
    const config = parseFloat(data.config)

    if(config == 0 || data.config == undefined){
    this.callNextAction(cache)
    }

    if(config == 1){
      this.endActions(cache)
      }

    if(config == 2){
      const actions = data.actions;
      this.executeSubActionsThenNextAction(actions, cache)
    }

    if(config == 3){
    const actions = data.actions;
    this.executeSubActions(actions, cache)
    }
  
  },

  modInit(data, customData, index) {
    if (!customData.anchors) {
      customData.anchors = {};
    }
    customData.anchors[data.anchorName] = index;
    this.prepareActions(data.actions);
  },


  mod() {},
};
