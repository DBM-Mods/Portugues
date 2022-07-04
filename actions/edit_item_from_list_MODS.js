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
    return `Editar "${data.value}" na posição ${data.position}`
  },

  fields: ['storage', 'varName', 'position', 'value', 'tipo'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
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
  <div style="width: 100%;float:left">
  <span class="dbminputlabel">Valor</span><br>
     <textarea id="value" rows="6" class="round" style="width:100%"></textarea>
  </div>
</div>`
  },

  init () {
    const { glob, document } = this

    glob.refreshVariableList(document.getElementById('storage'))
  },

  action (cache) {
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const list = this.getVariable(storage, varName, cache)
    const position = this.evalMessage(data.position, cache)
    const val = this.evalMessage(data.value, cache)
    const compare = parseInt(data.tipo, 10);
    const itemarm = list[position];
    const itemnumero = itemarm.toString();
    const valnumero = val.toString();

    let result;
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

    this.callNextAction(cache)
  },

  mod () {}
}
