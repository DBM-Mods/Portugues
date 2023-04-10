module.exports = {
  name: 'Replace Text MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {

    const info = ['Substitua o primeiro resultado', 'Substitua todos os resultados', 'Substitua o último resultado', 'Substitua o resultado de número X', 'Substitua todos os resultados pares', 'Substitua todos os resultados impares'];


    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${info[data.info]} "${data.text2}" por "${data.text3}" de "${data.text}"</font>`
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ['text', 'text2', 'text3', 'info', 'storage', 'varName', 'descriptioncolor', 'description', 'descriptionx', 'resultado'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.4</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

    <div style="padding-top: 3px;">
	  <span class="dbminputlabel">Texto original</span>
		  <textarea id="text" rows="3" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	  </div>
	  <div>
		  <div style="padding-top: 8px; width: 100%;">
		  <span class="dbminputlabel">Substituir</span><br>
			  <textarea id="text2" rows="1" class="round" style="width:100%;"></textarea>
		  </div><div style=" padding-top: 8px; width: 100%;">
      <span class="dbminputlabel">Para isso</span><br>
			  <textarea id="text3" rows="1" class="round" style="width:100%"></textarea>
		  </div>
	  </div>
	  <div style="padding-top: 8px; width: 100%;">
    <table style="width:100%"><tr><td style="width:70%">
	  <span class="dbminputlabel">Modelo</span><br>
	  <select id="info" class="round" onchange="glob.onChange(this)">
		  <option value="0" selected>Substitua o primeiro resultado</option>
		  <option value="1">Substitua todos os resultados</option>
      <option value="2">Substitua o último resultado</option>
      <option value="3">Substitua o resultado de número X</option>
      <option value="4">Substitua todos os resultados pares</option>
      <option value="5">Substitua todos os resultados impares</option>
	  </select>
    </td><td id="xinelas" style=";padding:0px 0px 0px 4px">
    <span class="dbminputlabel">Nº do Resultado</span><br>
    <input id="resultado" value="1" class="round" type="text">
    </td></tr></table>
	  </div>
	  <div style="padding-top: 8px;">
		  <div style="float: left; width: 35%;">
		  <span class="dbminputlabel">Armazenar em</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
			  <span class="dbminputlabel">Nome da variável</span><br>
			  <input id="varName" class="round" type="text">
		  </div>
	  </div>

    </div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },

  init() {
    const { glob, document } = this;

    glob.onChange = function (event) {
      const value = parseInt(event.value, 10);
      if (value == 3) {
        document.getElementById("xinelas").style.display = null;
      } else {
        document.getElementById("xinelas").style.display = "none";
      }
    };


    glob.onChange(document.getElementById("info"));

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
    text = this.evalMessage(data.text, cache);
    const oldValue = this.evalMessage(data.text2, cache);
    const newValue = this.evalMessage(data.text3, cache);
    const info = parseInt(data.info, 10);

    let result;
    switch (info) {
      case 0:
        result = text.replace(oldValue, newValue);
        break;
      case 1:
        result = text.split(oldValue).join(newValue);
        break;
      case 2:
        lastIndex = text.lastIndexOf(oldValue)
        if (lastIndex !== -1) {
          result = text.slice(0, lastIndex) + newValue + text.slice(lastIndex + oldValue.length)
        }
        break;
      case 3:
        const resultado = this.evalMessage(data.resultado, cache);
        function replaceNthOccurrence(text, oldValue, n, newValue) {
          let firstIndex = text.indexOf(oldValue);
          for (let i = 1; i < n && firstIndex !== -1; i++) {
            firstIndex = text.indexOf(oldValue, firstIndex + 1);
          }
          if (firstIndex !== -1) {
            let novaString = text.slice(0, firstIndex) + newValue + text.slice(firstIndex + oldValue.length);
            return novaString;
          }
          return text;
        }

        let novaString = replaceNthOccurrence(text, oldValue, resultado, newValue);
        result = novaString
        break;
      case 4:
        function replaceEvenOccurrences(text, oldValue, newValue) {
          let index = -1;
          let count = 0;
          while ((index = text.indexOf(oldValue, index + 1)) !== -1) {
            count++;
            if (count % 2 === 0) {
              text = text.slice(0, index) + newValue + text.slice(index + oldValue.length);
              index += newValue.length - oldValue.length;
            }
          }
          return text;
        }
        result = replaceEvenOccurrences(text, oldValue, newValue);
        break;
      case 5:
        function replaceEvenOccurrences(text, oldValue, newValue) {
          let index = -1;
          let count = 0;
          while ((index = text.indexOf(oldValue, index + 1)) !== -1) {
            count++;
            if (count % 2 !== 0) {
              text = text.slice(0, index) + newValue + text.slice(index + oldValue.length);
              index += newValue.length - oldValue.length;
            }
          }
          return text;
        }
        result = replaceEvenOccurrences(text, oldValue, newValue);
        break;
    }
    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() { },
};
