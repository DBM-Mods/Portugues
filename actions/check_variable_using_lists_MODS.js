module.exports = {

  name: "Check Variable Using Lists MOD",
  section: "Conditions",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "varName", "comparison", "list","varName2","branch"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<retrieve-from-variable allowSlashParams dropdownLabel="Variavel" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 100%;">
		<span class="dbminputlabel">Tipo de comparação</span><br>
		<select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0">É igual a um dos elementos da lista</option>
      <option value="1">Inclui em algum dos elementos da lista</option>
		</select>
	</div>


<div style="float: left; width: 100%;"><br>
<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Lista</span><br>
			<select id="list" class="round" onchange="glob.onComparisonChanged2(this)">
      ${data.lists[isEvent ? 1 : 0]}
			</select><br>
		</div>
		<div id="varNameContainer2" style=" float: right; width: 60%;">
		<span class="dbminputlabel">Nome da variável</span><br>
			<input id="varName2" class="round" type="text" list="variableList"><br>
		</div>
</div>

<br><br><br><br>


<hr class="subtlebar">
<br>
<br>
<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>`;
  },


  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },



  init() {
    const { glob, document } = this;


    glob.onComparisonChanged2 = function (event) {
      if (event.value < "7") {
        document.getElementById("varNameContainer2").style.display = "none";
      } else {
        document.getElementById("varNameContainer2").style.display = null;

      }
    };

    glob.onComparisonChanged2(document.getElementById("list"));
  



  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const variable = this.getVariable(type, varName, cache);
    const storage2 = parseInt(data.list, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const list = await this.getList(storage2, varName2, cache);
    let result = false;

    const val1 = variable;
    const compare = parseInt(data.comparison, 10);
    let val2 = this.evalMessage(data.value, cache);
    let val3 = this.evalMessage(data.value2, cache);
    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
    switch (compare) {
        case 0:
            result = list.toString().includes(val1);
        break;
        case 1:
          const conditionslist = list
          result = conditionslist.some(elx => val1.includes(elx));
        break;
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
