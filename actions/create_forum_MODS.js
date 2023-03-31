module.exports = {
  name: "Create Forum Channel MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `${data.channelName}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Channel"];
  },



  fields: ["channelName", "topic", "position", "storage", "varName", "categoryID", "slowmodepost","reason", "iffalse", "iffalseVal"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div style="width: 100%; padding:10px 5px;height: calc(100vh - 170px);overflow:auto">

<span class="dbminputlabel">Nome</span><br>
<input id="channelName" class="round" type="text">

<br>

<table><tr><td class="sep3">
<span class="dbminputlabel">ID da Categoria</span><br>
<input id= "categoryID" class="round" type="text" placeholder="Deixe em branco para fora da categoria">
</td>
<td class="sep4">
<span class="dbminputlabel">Posição</span><br>
<input id="position" class="round" type="text" placeholder="Deixem em branco para o padrão">
</td></tr></table>

<br>

<span class="dbminputlabel">Diretrizes de Postagem</span><br>
<textarea id="topic" rows="3" style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>

<br>

<span class="dbminputlabel">Modo lento das postagens</span><br>
<input id="slowmodepost" class="round" type="text" placeholder="Deixem em branco para desativar">

<br>

<span class="dbminputlabel">Razão</span>
<input id="reason" placeholder="Opcional" class="round" type="text">

<br>

<table>
<tr>
<td class="sep1">
<span class="dbminputlabel">Se não for criado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
<option value="0" selected>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</td>
<td class="sep2">

<div id="iffalseContainer" style="display: none; float: right; width: 100%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
</div>
</td>
</tr>

</table>

<br>

<table>
<tr>
<td class="sep1"><span class="dbminputlabel">Armazenar em</span><br>
<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
  ${data.variables[0]}
</select></td>
<td class="sep2"><div id="varNameContainer" style="display: none"><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName" class="round" type="text"></div></td>
</tr>

</table>

</div>

<style>
table{width:100%}
.sep1{padding:0px 8px 0px 0px;width:40%}
.sep2{padding:0px 0px 0px 0px;width:60%}
.sep3{padding:0px 8px 0px 0px;width:60%}
.sep4{padding:0px 0px 0px 0px;width:40%}
</style>
`;
  },



init() {
    const { glob, document } = this;
    glob.variableChange(document.getElementById('storage'), 'varNameContainer');

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


  async action(cache) {
  const data = cache.actions[cache.index];
  const { server } = cache;
  if (!server?.channels?.create) return this.callNextAction(cache);

    const name = this.evalMessage(data.channelName, cache); 
    
    const channelData = { reason: this.evalMessage(data.reason, cache)};

    if (data.topic) {
      channelData.topic = this.evalMessage(data.topic, cache);
    }
    if (data.position) {
      channelData.position = parseInt(this.evalMessage(data.position, cache));
    }
    if (data.categoryID) {
      channelData.parent = this.evalMessage(data.categoryID, cache);
    }
    if (data.slowmodepost) {
      channelData.rateLimitPerUser = parseInt(this.evalMessage(data.slowmodepost, cache), 10);
    }
    channelData.type = 15
 
    try {
      await server.channels
      .create(name, channelData)
      .then((channel) => {
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(channel, storage, varName, cache);
        this.callNextAction(cache);
      })
    }
      catch(err) {this.displayError(data, cache, err)
        this.executeResults(false, data, cache)
      }
  },


  mod() {},
};
