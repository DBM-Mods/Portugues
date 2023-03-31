module.exports = {
  name: 'Canvas Draw MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    return `${data.draw}`;
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['draw', 'largura', 'altura', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    <div>
    <div style="float: left; width: 50%;">
    <span class="dbminputlabel">Largura (px)</span><br>
      <input id="largura" class="round" type="text" placeholder="Requerido"><br>
    </div>
    <div style="padding-left: 3px; float: left; width: 50%;">
    <span class="dbminputlabel">Altura (px)</span><br>
      <input id="altura" class="round" type="text" placeholder="Requerido"><br>
    </div>
  </div><br><br><br>

    <div>
  <span class="dbminputlabel">Desenhar</span><span style="float:right"><button class="tiny compact ui icon button" onclick="(function(){document.getElementById('xinxylainfo').style.display = 'block';})()">Informações</button></span><br>
    <textarea id="draw" rows="10" style="width: 100%; white-space: nowrap; resize:yes"></textarea><br>
 
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text"><br>
  </div>
</div>

<div id="xinxylainfo" style="top:75px;left:10px;position:absolute;background-color:#444;color:#aaa;z-index:99999;width:calc(100% - 20px);height:400px;display:none">
<div style="width:100%;background:#333;padding:10px"><span style="float:right"><button class="tiny compact ui icon button" onclick="(function(){document.getElementById('xinxylainfo').style.display = 'none';})()">Fechar [X]</button></span>
<b>Informações</b></div>
<div style="padding:10px">
Para o contexto do canvas use <span class="xin">ctx.</span> ou <span class="xin">context.</span><br><br>
Para coletar a largura da imagem use <span class="xin">width</span> ou <span class="xin">largura</span><br><br>
Para coletar a altura da imagem use <span class="xin">height</span> ou <span class="xin">altura</span><br><br>
O Objeto da imagem está em uma variavel chamada <span class="xin">canvas</span><br><br>
Lembre-se, o código está rodando na String EVAL<br><br>
Para tutoriais de como desenhar usando o canvas <a style="cursor:pointer" class="xinxylalink" data-url="https://www.html5canvastutorials.com/tutorials/html5-canvas-linear-gradients">Clique aqui</a>
</div>
</div>

<style>.xin {background:#222;padding:2px 4px;}</style>
`
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

  action (cache) {
    const data = cache.actions[cache.index]
    const Canvas = require('canvas')
    const largura = parseInt(this.evalMessage(data.largura, cache))
    const altura = parseInt(this.evalMessage(data.altura, cache))
    const width = parseInt(this.evalMessage(data.largura, cache))
    const height = parseInt(this.evalMessage(data.altura, cache))
    const canvas = Canvas.createCanvas(largura, altura)
    const ctx = canvas.getContext('2d')
    const context = canvas.getContext('2d')
    eval(String(this.evalMessage(data.draw, cache)))

    const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const varName = this.evalMessage(data.varName, cache)
    const storage = parseInt(data.storage)
    this.storeValue(result, storage, varName, cache)
    this.callNextAction(cache)
  },

  mod () {}
}
