module.exports = {
name: "Delete File MOD",
section: "File Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },


subtitle: function(data) {
	return `Deletar [${data.filePath}]`;
},

fields: ["filePath","iffalse","iffalseVal"],

html: function(isEvent, data) {
	return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    <div style="float: left; width: 99%">
    <span class="dbminputlabel">Arquivo</span><br>
    <input id="filePath" placeholder="./resources" class="round" type="text">
    <br>

        <hr class="subtlebar">

<br>
<div style="padding-top: 8px;">
<div style="float: left; width: 40%">
<span class="dbminputlabel">Se não for deletado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0">Continuar ações</option>
<option value="1" selected>Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</div>

<div id="iffalseContainer" style="display: none; float: right; width: 55%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</div>
<br><br><br><br>

Cuidado, uma vez apagado não será mais possível recuperar o arquivo!
    </div>`
},


init: function () {
    const { glob, document } = this;


    glob.onComparisonChanged = function (event) {
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

    glob.onComparisonChanged(document.getElementById("iffalse"));


  },

action: function (cache) {
    const data = cache.actions[cache.index];
result = false
try {
    const fs = require('fs');
    const filePath = this.evalMessage(data.filePath, cache);
    if (filePath) {
        result = fs.existsSync(filePath)
      } else {
        result = false
      }
    if (filePath) {         
        fs.exists(`${filePath}`, function(exists) {
            if(exists) {
                fs.unlink(`${filePath}`, (err) => {
                    if (err) return console.log(`Algo deu errado ao excluir: [${err}]`);
                    console.log(`Arquivo deletado > [${filePath}]`);
                  });
            } else {
                console.log('Arquivo não encontrado, nada para excluir.');
            }
          });

    } else {
    console.log(`O caminho do arquivo está faltando.`);
    }
} catch (err) {
    console.log("ERRO!" + err.stack ? err.stack : err);

}

if(result == true){this.callNextAction(cache);}else{
this.executeResults(result, data, cache)}
},


  mod() {},
};
