module.exports = {
  name: 'Youtube Search MOD',
  section: 'Audio Control',
    meta: {
      version: '2.1.7',
      preciseCheck: true,
      author: '[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  subtitle (data) {
    return `Buscar: ${data.Buscar}`;
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'List'])
  },

  fields: ['Buscar', 'Buscarpor', 'console', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
  <div style="padding-top: 8px;">
  <span class="dbminputlabel">Buscar no Youtube</span><br>
    <input class="round" id="Buscar" placeholder="" style="width: 99%; font-family: monospace; white-space: nowrap"/>
  </div>
</div>

<div style="padding-top: 14px;">
<table style="width:100%"><tr><td>
<span class="dbminputlabel">Buscar por</span><br>
  <select id="Buscarpor" class="round">
  <option value="0" selected>Video</option>
  <option value="1">Canal</option>
  <option value="2">Playlist</option>
  <option value="3">Todos</option>
</select>
</td><td>
<span class="dbminputlabel">Console LOG</span><br>
  <select id="console" class="round">
  <option value="0" selected>Desativado</option>
  <option value="1">Ativado</option>
</select>
</td></tr></table>

<div style="padding-top: 14px;">
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variável</span><br>
    <input id="varName" class="round" type="text">
  </div>
  <br><br><br><br>
  Será retornado uma lista, para coletar use as seguintes variaveis de 0 a 9<br>
  \${tempVars("nomedavariavel")[0].id}<br>
  \${tempVars("nomedavariavel")[0].title}<br>
  \${tempVars("nomedavariavel")[0].duration}<br>
  \${tempVars("nomedavariavel")[0].thumbnail}<br>
  \${tempVars("nomedavariavel")[0].uploadDate}<br>
  \${tempVars("nomedavariavel")[0].viewCount}<br>
  <style>td{padding:5px;}</style>
  `
  },

  init () {},

  action (cache) {
    const data = cache.actions[cache.index]
    const scrapeYt = require("scrape-yt")
    const Buscar = this.evalMessage(data.Buscar, cache)
    const consolelog = this.evalMessage(data.console, cache)
    const Buscarpor = this.evalMessage(data.Buscarpor, cache)

    let result
    let busca

    if(Buscarpor == 0){busca = "video"}
    if(Buscarpor == 1){busca = "channel"}
    if(Buscarpor == 2){busca = "playlist"}
    if(Buscarpor == 3){busca = "all"}

    scrapeYt.search(Buscar, {type: busca}).then(videos => {
         
   if(consolelog == 1){
      console.log(videos)}

    result = videos

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
    });
    
  },



  mod () {}
}
