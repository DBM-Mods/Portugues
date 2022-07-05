module.exports = {
  name: 'Edit Item from List MOD',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    return `Editar "${data.varName}" da posição ${data.position}`
  },

  fields: ['storage', 'varName', 'position', "addType2", 'value', 'tipo' , "valueeval"],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div>
  <div style="float: left; width: 35%;">
  <span class="dbminputlabel">Lista</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round varSearcher" type="text" list="variableList"><br>
  </div>
</div><br><br><br>
<div>
  <div style="width: 35%;float:left">
  <span class="dbminputlabel">Posição</span><br>
    <input id="position" class="round" type="text"><br>
  </div>
  <div style="float: right; width: 60%;">
		<span class="dbminputlabel">Tipo de controle</span><br>
		<select id="tipo" class="round">
			<option value="0" selected>Alterar valor</option>
			<option value="1">Adicionar texto</option>
      <option value="2">Adicionar valor</option>
		</select>
	</div>
  <br><br><br>
  <div style="float: left; width: 100%;">
<span class="dbminputlabel">Comportamento</span><br>
<select id="addType2" class="round" onchange="glob.onChange2(this)">
  <option value="0" selected>Texto</option>
  <option value="1">Eval</option>
</select>
</div>
<br><br><br><br>
  <div style="padding-top: 8px;" id="valor">
	<span class="dbminputlabel">Valor</span><br>
  <textarea id="value" rows="4" class="round" style="width:100%"></textarea>
</div>
<div style="padding-top: 8px;display:none" id="valoreval">
	<span class="dbminputlabel">Valor</span><br>
  <textarea id="valueeval" rows="4" name="is-eval" class="round" style="width:100%"></textarea>
</div>
</div>`
  },

  init () {
    const { glob, document } = this

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

    glob.refreshVariableList(document.getElementById('storage'))
    glob.onChange2(document.getElementById("addType2"));
  },

  action (cache) {
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const list = this.getVariable(storage, varName, cache)
    const position = this.evalMessage(data.position, cache)
    let val = this.evalMessage(data.value, cache)
    let val2 = this.evalMessage(data.valueeval, cache);
    const compare = parseInt(data.tipo, 10);
    const itemarm = list[position];
    const type2 = parseInt(data.addType2, 10);

    switch (type2) {
      case 0:
    switch (compare) {
      case 0:
        if (list.length > position) {
          list[position] = val
        }
        break;
      case 1:
        if (itemarm === undefined) {
          if (list.length > position) {
            list[position] = val
          }
        } else {
          if (list.length > position) {
            list[position] = itemarm + val;
          }
        }
        break;
        case 2:
          if (itemarm === undefined) {
            if (list.length > position) {
              list[position] = val
            }
          } else {
            if (list.length > position) {
              list[position] = parseFloat(itemarm) + parseFloat(val);
            }
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
    switch (compare) {
      case 0:
        if (list.length > position) {
          list[position] = val2
        }
        break;
      case 1:
        if (itemarm === undefined) {
          if (list.length > position) {
            list[position] = val2
          }
        } else {
          if (list.length > position) {
            list[position] = itemarm + val2;
          }
        }
        break;
        case 2:
          if (itemarm === undefined) {
            if (list.length > position) {
              list[position] = val2
            }
          } else {
            if (list.length > position) {
              list[position] = parseFloat(itemarm) + parseFloat(val2);
            }
          }
          break;
    }
    break;
  }


    this.callNextAction(cache)
  },

  mod () {}
}
