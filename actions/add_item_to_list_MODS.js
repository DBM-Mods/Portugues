module.exports = {
  name: "Add Item to List MOD",
  section: "Lists and Loops",
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const storage = presets.variables;
    return `${storage[parseInt(data.storage, 10)]} (${data.varName})`;
  },

  fields: ["storage", "varName", "addType", "addType2", "position", "value" , "valueeval"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<retrieve-from-variable dropdownLabel="Lista" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 45%;">
		<span class="dbminputlabel">Tipo</span><br>
		<select id="addType" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>Add no fim</option>
			<option value="1">Add no início</option>
			<option value="2">Add em uma posição específica</option>
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
</div>`;
  },


  init() {
    const { glob, document } = this;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById("positionHolder");
      if (value < 2) {
        dom.style.display = "none";
      } else {
        dom.style.display = null;
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
  },


  action(cache) {
    const data = cache.actions[cache.index];
    const storage = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const list = this.getVariable(storage, varName, cache);

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
            const position = parseInt(this.evalMessage(data.position), 10);
            if (position < 0) {
              list.unshift(val);
            } else if (position >= list.length) {
              list.push(val);
            } else {
              list.splice(position, 0, val);
            }
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
        const position = parseInt(this.evalMessage(data.position), 10);
        if (position < 0) {
          list.unshift(val2);
        } else if (position >= list.length) {
          list.push(val2);
        } else {
          list.splice(position, 0, val2);
        }
        break;
    }
    break;
  }


    this.callNextAction(cache);
  },


  mod() {},
};
