module.exports = {
  name: "Move Channel MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info2 = [`"ID da Categoria: ${data.find2}"`, `"Nome da Categoria: ${data.find2}"`, `"Mesma Categoria"`];
    const mover = [``, `na "Posição: ${data.posicao}"`];
    return `Mover canal para ${info2[parseInt(data.info2, 10)]} ${mover[parseInt(data.mover, 10)]}`;
  },


  fields: ["info", "find", "info2", "find2", "mover", "posicao", "iffalse", "iffalseVal"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <table>
    <tr>
    <td class="xin1"><span class="dbminputlabel">Canal a ser movido</span><br>
		<select id="info" class="round" onchange="glob.onComparisonChanged4(this)">
     <option value="4" selected>Canal atual</option>
			<option value="0">ID do canal</option>
			<option value="1">Nome do canal</option>
      <option value="2">Tópico do canal</option>
      <option value="3">Posição do canal</option>
		</select></td>
    <td class="xin2"><div id="oculta3"><span class="dbminputlabel" id="xinxylaalter">Valor</span><br>
		<input id="find" class="round" type="text"></div></td>
    </tr>

    <tr>
    <td class="xin1"><span class="dbminputlabel">Mover para outra categoria</span><br>
    <select id="info2" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="2">Não</option>
      <option value="0" selected>ID da Categoria</option>
      <option value="1">Nome da Categoria</option>
    </select></td>
    <td class="xin2"><div id="oculta"><span class="dbminputlabel">Valor</span><br>
    <input id="find2" class="round" type="text"></div></td>
    </tr>


    <tr>
    <td class="xin1"><span class="dbminputlabel">Mover para outra posição</span><br>
    <select id="mover" class="round" onchange="glob.onComparisonChanged3(this)">
      <option value="0" selected>Não</option>
      <option value="1">Sim</option>
    </select></td>
    <td class="xin2"><div id="oculta2"><span class="dbminputlabel">Posição</span><br>
    <input id="posicao" class="round" value="0" type="text"></div></td>
    </tr>

    <tr>
    <td class="xin1"><span class="dbminputlabel">Se não for movido</span><br>
    <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
    <option value="0" selected>Continuar ações</option>
    <option value="1">Parar sequência de ação</option>
    <option value="2">Ir para a ação</option>
    <option value="3">Pular as próximas ações</option>
    <option value="4">Ir para a âncora de ação</option>
    </select></td>
    <td class="xin2"><div id="iffalseContainer" style="display: none; float: right; width: 100%;"><span id="xinelas" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
    </td>
    </tr>
    </table>

    <style>
    table{width:100%}
    .xin1{padding:0px 6px 20px 0px;width:50%}
    .xin2{padding:0px 0px 20px 0px;width:50%}
    </style>
`;
  },

  init: function () {
    const { glob, document } = this;


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


    glob.onComparisonChanged2 = function (event) {
      if (event.value == "2") {
        document.getElementById("oculta").style.display = "none";
      } else {
        document.getElementById("oculta").style.display = null;}
  }

    glob.onComparisonChanged2(document.getElementById("info2"));

    glob.onComparisonChanged(document.getElementById("iffalse"));


    glob.onComparisonChanged3 = function (event) {
      if (event.value == "0") {
        document.getElementById("oculta2").style.display = "none";
      } else {
        document.getElementById("oculta2").style.display = null;}
  }

    glob.onComparisonChanged3(document.getElementById("mover"));


    glob.onComparisonChanged4 = function (event) {
      if (event.value == "0") {
        document.getElementById("oculta3").style.display = null;
        document.querySelector("[id='xinxylaalter']").innerText = (`ID`);
      } 
  if (event.value == "1") {
    document.getElementById("oculta3").style.display = null;
    document.querySelector("[id='xinxylaalter']").innerText = (`Nome`);
  } 
  if (event.value == "2") {
    document.getElementById("oculta3").style.display = null;
    document.querySelector("[id='xinxylaalter']").innerText = (`Tópico`);
}
if (event.value == "3") {
  document.getElementById("oculta3").style.display = null;
  document.querySelector("[id='xinxylaalter']").innerText = (`Posição`);
}
if (event.value == "4") {
  document.getElementById("oculta3").style.display = "none";
}
    }
  

    glob.onComparisonChanged4(document.getElementById("info"));


  },


  async action(cache) {
    const server = cache.server;
    if (!server?.channels) {
      this.callNextAction(cache);
      return;
    }
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const info2 = parseInt(data.info2, 10);
    const mover = parseInt(data.mover, 10);
    const find = this.evalMessage(data.find, cache);
    const find2 = this.evalMessage(data.find2, cache);
    const posicao = this.evalMessage(data.posicao, cache);
    const canais = server.channels.cache.filter((c) => c.type === "GUILD_TEXT" || c.type === "GUILD_NEWS" || c.type === "GUILD_VOICE");
    const categorias = server.channels.cache.filter((s) => s.type === 'GUILD_CATEGORY');
    let end
    let canal;
    switch (info) {
      case 0:
        canal = canais.get(find);
        break;
      case 1:
        canal = canais.find((c) => c.name === find);
        break;
      case 2:
        canal = canais.find((c) => c.topic === find);
        break;
      case 3:
        const position = parseInt(find, 10);
        canal = canais.find((c) => c.position === position);
        break;
        case 4:
        canal = await this.getChannelFromData(0, 0, cache);
          break;
      default:
        break;
    }
    if (info2 == 0){categoria = categorias.get(find2)}
    if (info2 == 1){categoria = categorias.find((e) => e.name === find2)}

    try {
      if (info2 == 0 || info2 == 1){await canal.setParent(categoria.id)}
      if (mover == 1){await canal.setPosition(posicao)}
    } catch(err) {
    this.executeResults(false, data, cache);
    end = 2
    } 

    if(end !== 2){
    this.callNextAction(cache)}
  },


  mod() {},
};
