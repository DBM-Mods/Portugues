module.exports = {

  name: "Check Info MOD",
  section: "Conditions",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getConditionsText(data)}`;
  },

  fields: ["storage", "comparison", "value", "value2", "branch"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 1.5</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    <span class="dbminputlabel">Informação</span><br>
<textarea id="storage" rows="3" placeholder="Insira a informação aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>

<br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Tipo de comparação</span><br>
		<select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
			<option value="0">Existe</option>
			<option value="1" selected>Igual a</option>
			<option value="2">Exatamente igual</option>
			<option value="3">Menor que</option>
      <option value="13">Menor ou igual a</option>
			<option value="4">Maior que</option>
      <option value="12">Maior ou igual a</option>
			<option value="5">Inclui</option>
			<option value="6">Matches Regex</option>
      <option value="14">Matches Full Regex</option>
      <option value="7">O comprimento é maior que</option>
			<option value="8">O comprimento é menor que</option>
			<option value="9">O comprimento e igual a</option>
			<option value="10">Começa com</option>
			<option value="11">Termina com</option>
      <option value="15">Entre</option>
      <option value="16">Possui acentuações?</option>
      <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
      <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
      <option value="19">É um número par?</option>
      <option value="20">É um número ímpar?</option>
      <option value="21">É um número?</option>
      <option value="24">É um texto?</option>
      <option value="22">É uma lista?</option>
      <option value="23">É um URL de imagem?</option>
      <option value="25">É um URL?</option>
		</select>
	</div>
	<table style="float: right;width: 65%;"><tr><td style="padding:0px 8px";><div style="width: 100%" id="directValue">
		<span class="dbminputlabel">Valor para comparar</span>
		<input id="value" class="round" type="text" name="is-eval">
	</div></td><td style="padding:0px 3px";> <div style="width: 100%;" id="containerxin">
  <span class="dbminputlabel">e</span><br>
  <input id="value2" class="round" type="text" name="is-eval"></td></tr></table>
</div>
</div>

<br><br><br><br>

<hr class="subtlebar">
<br>
<div>
<conditional-input id="branch" style="padding-top: 8px;"></conditional-input></div>`;
  },


  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },



  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";   
      } else {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = "none";
      }
      if (event.value === "15") {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = null;
        document.getElementById("containerxin2").style.display = "none";
      }
      if (event.value === "16" || event.value === "19" || event.value === "20" || event.value === "21" || event.value === "22" || event.value === "23" || event.value === "24" || event.value === "25") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
      }
    };


    glob.onComparisonChanged(document.getElementById("comparison"));


  },

  


  action(cache) {
    const data = cache.actions[cache.index];
    const val1 = this.evalMessage(data.storage, cache);
    let result = false;
    const compare = parseInt(data.comparison, 10);
    let val2 = data.value;
    let val3 = data.value2;
    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
    switch (compare) {
      case 0:
        result = val1 !== undefined;
        break;
      case 1:
        result = val1 == val2;
        break;
      case 2:
        result = val1 === val2;
        break;
      case 3:
        result = val1 < val2;
        break;
      case 4:
        result = val1 > val2;
        break;
      case 5:
        if (typeof val1?.toString().includes === "function") {
          result = val1.toString().includes(val2);
        }
        break;
        case 6:
          result = Boolean(val1.toString().match(new RegExp('^' + val2 + '$', 'i')));
          break;
        case 7:
          result = Boolean(val1.toString().length > val2);
          break;
        case 8:
          result = Boolean(val1.toString().length < val2);
          break;
        case 9:
          result = Boolean(val1.toString().length == val2);
          break;
        case 10:
          result = val1.toString().startsWith(val2);
          break;
        case 11:
          result = val1.toString().endsWith(val2);
          break;
          case 12:
          result = Boolean(val1 >= val2);
          break;
          case 13:
          result = Boolean(val1 <= val2);
          break;
          case 14:
          result = Boolean(val1.toString().match(new RegExp(val2)))
          break;
          case 15:
            var numberj = val1.toString();
            if(numberj >= val2 && val1 <= val3) {
            result = numberj}
          break;
          case 16:
          const conditions = ["Ä","Å","Á","Â","À","Ã","Ā","Ă","Ą","ā","ă","ą","ä","á","â","à","ã","É","Ê","Ë","È","Ė","Ę","Ě","Ĕ","Ē","ė","ę","ě","ĕ","ē","é","ê","ë","è","Í","Î","Ï","Ì","İ","Į","Ī","ı","į","ī","í","î","ï","ì","Ö","Ó","Ô","Ò","Õ","Ő","Ō","ő","ō","ö","ó","ô","ò","õ","Ü","Ú","Û","Ų","Ű","Ů","Ū","ų","ű","ů","ū","ü","ú","û","ù","Ç","Ć","Č","ç","ć","č","Ñ","Ň","Ņ","Ń","ñ","ň","ņ","ń","Ÿ","Ý","ý","Ź","Ż","Ž","ź","ż","ž","Ł","Ľ","Ļ","Ĺ","ł","ľ","ĺ","Ķ","ķ","Ģ","Ğ","ģ","ğ","Ď","ď","Ś","Š","Ş","ś","š","ş","Ť","Ț","Ţ","ť","ț","ţ","Ŕ","Ř","ŕ","ř"]
          result = conditions.some(el => val1.includes(el));
          break;
          case 17:
            const conditionsX = val2
            result = conditionsX.some(els => val1.includes(els));
          break;
          case 18:
            const conditionsZ = val2
            result = conditionsZ.some(elz => val1 == (elz));
          break;
          case 19:
            result = val1 % 2 == 0
          break;
          case 20:
            result = val1 % 2 == 1
          break;
	  case 21:
          result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
          break;
         case 22:
          result = Boolean(Array.isArray(val1));
          break;
	 case 23:
            const isImageUrl = require('is-image-url');
            result = isImageUrl(val1);
            break;
         case 24:
            result = typeof val1 === "string";
            break;
         case 25:
            const isUrl = require("is-url");
            result = isUrl(val1);
    }

    this.executeResults(result, data?.branch ?? data, cache);
  },



  modInit(data) {
    this.prepareActions(data.branch?.iftrueActions);
    this.prepareActions(data.branch?.iffalseActions);
  },


  mod() {},
};
