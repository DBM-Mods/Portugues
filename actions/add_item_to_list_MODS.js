module.exports = {
  name: "Add Item to List MOD",
  section: "Lists and Loops",
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

    const storage = presets.variables;

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
  },

  fields: ["storage", "varName", "addType", "addType2", "position", "value", "valueeval", "descriptioncolor", "description", "descriptionx"],


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

<retrieve-from-variable dropdownLabel="Lista" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 45%;">
		<span class="dbminputlabel">Tipo</span><br>
		<select id="addType" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Add no fim</option>
			<option value="1">Add no início</option>
			<option value="2">Add em uma posição específica</option>
      <option value="3">Add no meio</option>
		</select>
	</div>
	<div id="positionHolder" style="float: right; width: 50%; display: none;">
		<span class="dbminputlabel">Posição</span><br>
		<input id="position" class="round" type="text"><br>
	</div>
</div>

<br><br><br>
<div style="float: left; width: 100%;">
<span class="dbminputlabel">Comportamento</span><br>
<select id="addType2" class="round" onchange="glob.onChange2(this)">
  <option value="0" selected>Texto</option>
  <option value="1">Eval</option>
</select>
</div>
<br><br><br>
<div style="padding-top: 8px;" id="valor">
	<span class="dbminputlabel">Valor</span><br>
  <textarea id="value" rows="4" class="round" style="width:100%"></textarea>
</div>
<div style="padding-top: 8px;display:none" id="valoreval">
	<span class="dbminputlabel">Valor</span><br>
  <textarea id="valueeval" rows="4" name="is-eval" class="round" style="width:100%"></textarea>
</div>

</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`;
  },


  init() {
    const { glob, document } = this;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("positionHolder");
      if (value == 2) {
        dom.style.display = null;
      } else {
        dom.style.display = "none";
      }
    };

    glob.onChange2 = function (event) {
      const value = parseInt(event.value, 10);
      if (value == 0) {
        document.getElementById("valor").style.display = null;
        document.getElementById("valoreval").style.display = "none";
      } else {
        document.getElementById("valor").style.display = "none";
        document.getElementById("valoreval").style.display = null;
      }
    };


    glob.onChange1(document.getElementById("addType"));
    glob.onChange2(document.getElementById("addType2"));

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
    var list = this.getVariable(storage, varName, cache);

    if (Array.isArray(list)) {
    } else {
      list = []
    }

    const type = parseInt(data.addType, 10);
    const type2 = parseInt(data.addType2, 10);
    let val = this.evalMessage(data.value, cache);
    let val2 = this.evalMessage(data.valueeval, cache);

    switch (type2) {
      case 0:
        switch (type) {
          case 0:
            list.push(val);
            break;
          case 1:
            list.unshift(val);
            break;
          case 2:
            const position = parseInt(this.evalMessage(data.position, cache));
            if (position < 0) {
              list.unshift(val);
            } else if (position >= list.length) {
              list.push(val);
            } else {
              list.splice(position, 0, val);
            }
            break;
          case 3:
            var meio = parseInt(list.length / 2)
            list.splice(meio, 0, val);
            break;
        }
        break;
      case 1:
        try {
          val2 = this.eval(val2, cache);
        } catch (e) {
          this.displayError(data, cache, e);
        }
        switch (type) {
          case 0:
            list.push(val2);
            break;
          case 1:
            list.unshift(val2);
            break;
          case 2:
            const position = parseInt(this.evalMessage(data.position, cache));
            if (position < 0) {
              list.unshift(val2);
            } else if (position >= list.length) {
              list.push(val2);
            } else {
              list.splice(position, 0, val2);
            }
            break;
            case 3:
              var meio = parseInt(list.length / 2)
              list.splice(meio, 0, val2);
              break;
        }
        break;
    }


    this.storeValue(list, storage, varName, cache);
    this.callNextAction(cache);
  },


  mod() { },
};
