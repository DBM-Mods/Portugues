module.exports = {
  name: "Edit Message MOD",
  section: "Messaging",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${presets.getMessageText(data.storage, data.varName)}`;
  },



  fields: ["storage", "varName","storage2", "varName2","storage3", "varName3","storage4", "varName4","storage5", "varName5","storage6", "varName6","storage7", "varName7","storage8", "varName8","storage9", "varName9","storage10", "varName10","storage11", "varName11", "editar", "embeds", "message"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
<div style="width: 100%; height: 350px; overflow-y: scroll;padding:5px">
    
<message-input dropdownLabel="Mensagem" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></message-input>

<br><br><br>

<div style="padding-top: 8px;">
	<span class="dbminputlabel">Editar conteúdo da mensagem</span><div>
	<select id="editar" class="round" onchange="glob.onComparisonChanged(this)">
		<option value="0" selected>Não</option>
		<option value="1">Sim</option>
	</select>
</div><div id="containerxin">
	<textarea id="message" class="dbm_monospace" rows="4" style="white-space: nowrap; resize: yes;"></textarea>
</div></div>

<br>
<div id="varNameContainer2" style=" width: 100%;">
  <span class="dbminputlabel">Indique o número de embeds</span><br>
  <select id="embeds" class="round" onchange="glob.onComparisonChanged2(this)">
  <option value="0">0</option>
  <option value="1" selected>1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
  <option value="7">7</option>
  <option value="8">8</option>
  <option value="9">9</option>
  <option value="10">10</option>
</select>
  </div>
<br>
  <div id="embed1"><table><tr><td><span class="dbminputlabel">Objeto Embed</span><br>
    <select id="storage2" class="round">
      ${data.variables[1]}
    </select>
  </td><td><span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName2" placeholder="Requerido" class="round" type="text" list="variableList">
  </td></tr></table>
  </div>


  <div id="embed2" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 2</span><br>
    <select id="storage3" class="round">
      ${data.variables[1]}
    </select>
  </td><td><span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName3" placeholder="Requerido" class="round" type="text" list="variableList">
  </td></tr></table>
  </div>

  <div id="embed3" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 3</span><br>
  <select id="storage4" class="round">
    ${data.variables[1]}
  </select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="varName4" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed4" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 4</span><br>
<select id="storage5" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName5" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed5" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 5</span><br>
<select id="storage6" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName6" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed6" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 6</span><br>
<select id="storage7" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName7" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed7" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 7</span><br>
<select id="storage8" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName8" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed8" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 8</span><br>
<select id="storage9" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName9" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed9" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 9</span><br>
<select id="storage10" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName10" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>

<div id="embed10" style="display:none"><table><tr><td><span class="dbminputlabel">Objeto Embed 10</span><br>
<select id="storage11" class="round">
  ${data.variables[1]}
</select>
</td><td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName11" placeholder="Requerido" class="round" type="text" list="variableList">
</td></tr></table>
</div>


  </div>
  
  <style>
  table{width:100%}
  td{width:50%;padding:5px;}
  </style>`;
  },


  init() {
    const { glob, document } = this;

  glob.onComparisonChanged = function (event) {
    if (event.value == 0) {
      document.getElementById("containerxin").style.display = "none";
    } else
    {document.getElementById("containerxin").style.display = "block";}
  };

  glob.onComparisonChanged2 = function (event) {
    if (event.value) {
      document.getElementById("embed1").style.display = "none";
      document.getElementById("embed2").style.display = "none";
      document.getElementById("embed3").style.display = "none";
      document.getElementById("embed4").style.display = "none";
      document.getElementById("embed5").style.display = "none";
      document.getElementById("embed6").style.display = "none";
      document.getElementById("embed7").style.display = "none";
      document.getElementById("embed8").style.display = "none";
      document.getElementById("embed9").style.display = "none";
      document.getElementById("embed10").style.display = "none";
    }
    if (event.value > 0) {
      document.getElementById("embed1").style.display = "block";
    }
    if (event.value > 1) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
    }
    if (event.value > 2) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
    }
    if (event.value > 3) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
    }
    if (event.value > 4) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
    }
    if (event.value > 5) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
      document.getElementById("embed6").style.display = "block";
    }
    if (event.value > 6) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
      document.getElementById("embed6").style.display = "block";
      document.getElementById("embed7").style.display = "block";
    }
    if (event.value > 7) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
      document.getElementById("embed6").style.display = "block";
      document.getElementById("embed7").style.display = "block";
      document.getElementById("embed8").style.display = "block";
    }
    if (event.value > 8) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
      document.getElementById("embed6").style.display = "block";
      document.getElementById("embed7").style.display = "block";
      document.getElementById("embed8").style.display = "block";
      document.getElementById("embed9").style.display = "block";
    }
    if (event.value > 9) {
      document.getElementById("embed1").style.display = "block";
      document.getElementById("embed2").style.display = "block";
      document.getElementById("embed3").style.display = "block";
      document.getElementById("embed4").style.display = "block";
      document.getElementById("embed5").style.display = "block";
      document.getElementById("embed6").style.display = "block";
      document.getElementById("embed7").style.display = "block";
      document.getElementById("embed8").style.display = "block";
      document.getElementById("embed9").style.display = "block";
      document.getElementById("embed10").style.display = "block";
    }
  };

  glob.onComparisonChanged(document.getElementById("editar"));
  glob.onComparisonChanged2(document.getElementById("embeds"));
},




  async action(cache) {
    const data = cache.actions[cache.index];
    const message = await this.getMessageFromData(data.storage, data.varName, cache);
    const embed = this.getVariable(data.storage2, data.varName2, cache)
    const embed2 = this.getVariable(data.storage3, data.varName3, cache)
    const embed3 = this.getVariable(data.storage4, data.varName4, cache)
    const embed4 = this.getVariable(data.storage5, data.varName5, cache)
    const embed5 = this.getVariable(data.storage6, data.varName6, cache)
    const embed6 = this.getVariable(data.storage7, data.varName7, cache)
    const embed7 = this.getVariable(data.storage8, data.varName8, cache)
    const embed8 = this.getVariable(data.storage9, data.varName9, cache)
    const embed9 = this.getVariable(data.storage10, data.varName10, cache)
    const embed10 = this.getVariable(data.storage11, data.varName11, cache)
    const content = this.evalMessage(data.message, cache);

    const editar = parseInt(data.editar, 10);
    const embeds = parseInt(data.embeds, 10);

    let messageOptions = {};

  

    switch (editar) {
      case 0:
        break;
      case 1:
        messageOptions.content = content;
        break;
    }

    switch (embeds) {
      case 0:
        break;
      case 1:
        messageOptions.embeds = [embed];
        break;
      case 2:
        messageOptions.embeds = [embed,embed2];
        break;
      case 3:
        messageOptions.embeds = [embed,embed2,embed3];
        break;
      case 4:
        messageOptions.embeds = [embed,embed2,embed3,embed4];
        break;
      case 5:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5];
        break;
      case 6:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5,embed6];
        break;
      case 7:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5,embed6,embed7];
        break;
      case 8:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5,embed6,embed7,embed8];
        break;
      case 9:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5,embed6,embed7,embed8,embed9];
        break;
      case 10:
        messageOptions.embeds = [embed,embed2,embed3,embed4,embed5,embed6,embed7,embed8,embed9,embed10];
        break;
       
    }

    if (message?.edit) {
      message
        .edit(messageOptions)
        .then(() => this.callNextAction(cache))
        .catch((err) => this.displayError(data, cache, err));
    } else {
      this.callNextAction(cache);
    }

  },

  mod() {},
};
