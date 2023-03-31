module.exports = {

  name: "Crypto MOD",
  section: "Other Stuff",
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


    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.text}</font>`
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ["text", "acao", "key", "storage", "varName", "descriptioncolor", "description", "descriptionx"],


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

<span class="dbminputlabel">Ação</span><br>
		<select id="acao" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Criptografar</option>
			<option value="1">Descriptografar</option>
		</select>


    <br>

    <span class="dbminputlabel">Chave da criptografia</span><br>
  <input id="key" class="round" type="text">


  <br>

<span class="dbminputlabel" id="xinxyla">Texto ou Código</span>
		  <textarea id="text"rows="3" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
<br>

  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Resultado</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da variável</span><br>
    <input id="varName" class="round" type="text">
  </div>


</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
table{width:100%}
.td1{padding:0px}
.td2{padding:0px 0px 0px 8px}
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

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      if (value == 0) {
        document.querySelector("[id='xinxyla']").innerText = (`Criptografar o texto`);
      } else {
        document.querySelector("[id='xinxyla']").innerText = (`Descriptografar o código`);
      }
    };

    glob.onChange1(document.getElementById("acao"));


  },


  action(cache) {
    const data = cache.actions[cache.index];
    var text = this.evalMessage(data.text, cache)
    const acao = parseInt(data.acao, 10)
    var key = this.evalMessage(data.key, cache)
    let result
    var CryptoJS = require("crypto-js");

    try {

      if (acao == 0) {

        result = CryptoJS.AES.encrypt(text, key).toString();

        const storage = parseInt(data.storage, 10)
        const varName = this.evalMessage(data.varName, cache)
        this.storeValue(result, storage, varName, cache)
        this.callNextAction(cache)

      }

      if (acao == 1) {

        var bytes = CryptoJS.AES.decrypt(text, key);
        result = bytes.toString(CryptoJS.enc.Utf8);

        const storage = parseInt(data.storage, 10)
        const varName = this.evalMessage(data.varName, cache)
        this.storeValue(result, storage, varName, cache)
        this.callNextAction(cache)

      }


    } catch (err) { console.log(err) + this.callNextAction(cache) }




  },


  mod() { },
};
