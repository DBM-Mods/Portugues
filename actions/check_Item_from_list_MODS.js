module.exports = {
  name: 'Check Item From List MOD',
  section: 'Lists and Loops',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const list = [
      'Server Members',
      'Server Channels',
      'Server Roles',
      'Server Emojis',
      'All Bot Servers',
      'Mentioned User Roles',
      'Command Author Roles',
      'Temp Variable',
      'Server Variable',
      'Global Variable',
    ];
    const info = ['exatamente igual a', 'inclua', 'matches regex','menor que', 'menor ou igual a', 'maior que', 'maior ou igual a', 'comprimento maior que', 'comprimento menor que', 'comprimento igual a', 'começa com', 'termina com'];
     return `Buscar ${info[parseInt(data.buscadoxin)]} "${data.item}" em "${data.varName}"`;
  },

  variableStorage(data, varType) {
    const prse2 = parseInt(data.buscadoxin);
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName2, 'Number'[prse2]];
  },

  fields: ['list', 'varName', 'buscadoxin', 'item', 'storage', 'varName2' , "branch"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div style="float: left; width: 35%;">
<span class="dbminputlabel">Lista</span><br>
  <select id="list" class="round" onchange="glob.listChange(this, 'varNameContainer')">
    ${data.lists[isEvent ? 1 : 0]}
  </select>
</div>
<div id="varNameContainer" style="display: none; float: right; width: 60%;">
<span class="dbminputlabel">Nome da variavel</span><br>
  <input id="varName" class="round" type="text" list="variableList"><br>
</div>
</div><br><br><br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Tipo de comparação</span><br>
			<select id="buscadoxin" class="round">
				<option value="0" selected>Exatamente igual a</option>
				<option value="1">Que inclua</option>
        <option value="2">Matches Regex</option>
        <option value="7">O comprimento é maior que</option>
        <option value="8">O comprimento é menor que</option>
        <option value="9">O comprimento e igual a</option>
        <option value="10">Começa com</option>
        <option value="11">Termina com</option>
        <option value="3">Menor que [Requer somente números na lista]</option>
        <option value="4">Menor ou igual a [Requer somente números na lista]</option>
        <option value="5">Maior que [Requer somente números na lista]</option>
        <option value="6">Maior ou igual a [Requer somente números na lista]</option>
			</select>
		</div>
<div style="padding-top: 8px;">
    <textarea id="item" rows="3" placeholder="Insira uma variável ou algum texto. Esses '' não são necessários!" style="width: 100%; font-family: monospace; white-space: nowrap;"></textarea>
</div><br>

<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>

`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init() {
    const { glob, document } = this;

    glob.onChange1 = function onChange1(event) {
      const value = parseInt(event.value, 10);
      const dom = document.getElementById('positionHolder');
      if (value < 3) {
        dom.style.display = 'none';
      } else {
        dom.style.display = null;
      }
    };

    glob.listChange(document.getElementById('list'), 'varNameContainer');
  },

  async action(cache) {
        const data = cache.actions[cache.index];
    const storage = parseInt(data.list, 10);
    const varName = this.evalMessage(data.varName, cache);
    const list = await this.getList(storage, varName, cache);
    const buscadoxin = parseInt(data.buscadoxin);
    const item = this.evalMessage(data.item, cache);
    let result;

            
    if (Array.isArray(list) == true) {
      switch (buscadoxin) {
        case 0:
          result = list.findIndex((i) => i === item);
          break;
        case 1:
          result = list.findIndex((i) => i.includes(item));
          break;
        case 2:
          result = list.findIndex((i) => Boolean(i.match(new RegExp('^' + item + '$', 'i'))));
          break;
        case 3:
          result = list.findIndex((i) => i < item);
          break;
        case 4:
          result = list.findIndex((i) => i <= item);
          break;
        case 5:
          result = list.findIndex((i) => i > item);
          break;
        case 6:
          result = list.findIndex((i) => i >= item);
          break;
        case 7:
          result = list.findIndex((i) => Boolean(i.length > item));
          break;
        case 8:
          result = list.findIndex((i) => Boolean(i.length < item));
          break;
        case 9:
          result = list.findIndex((i) => Boolean(i.length == item));
          break;
        case 10:
          result = list.findIndex((i) => i.startsWith(item));
          break;
        case 11:
          result = list.findIndex((i) => i.endsWith(item));
          break;
      }
    } else {
      console.log("O objeto não é uma lista")
      result = -1
       }
  
    
        
    if (parseInt(result) >= 0) {
      result = true
    } else {
      result = false
    }
    

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
