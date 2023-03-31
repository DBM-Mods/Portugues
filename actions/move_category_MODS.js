module.exports = {
  name: "Move Category MOD",
  section: "Channel Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [`"ID: ${data.find}"`, `"Nome: ${data.find}"`];
    return `Mover categoria ${info[parseInt(data.info, 10)]} para a posição "${data.posicao}"`;
  },


  fields: ["info", "find", "posicao", "iffalse", "iffalseVal"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <table>
    <tr>
    <td class="xin1"><span class="dbminputlabel">Categoria</span><br>
    <select id="info" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selected>ID da Categoria</option>
      <option value="1">Nome da Categoria</option>
    </select></td>
    <td class="xin2"><div id="oculta"><span class="dbminputlabel">Valor</span><br>
    <input id="find" class="round" type="text"></div></td>
    </tr> </table>

<span class="dbminputlabel">Posição</span><br>
    <input id="posicao" class="round" value="0" type="text">
    <br>
    <table>
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


  },


  async action(cache) {
    const server = cache.server;
    if (!server?.channels) {
      this.callNextAction(cache);
      return;
    }
    const data = cache.actions[cache.index];
    const info = parseInt(data.info, 10);
    const find = this.evalMessage(data.find, cache);
    const posicao = this.evalMessage(data.posicao, cache);
    const categorias = server.channels.cache.filter((s) => s.type === 'GUILD_CATEGORY');
    let end
    let categoria
    if (info == 0){categoria = categorias.get(find)}
    if (info == 1){categoria = categorias.find((e) => e.name === find)}

    try {
      await categoria.setPosition(posicao)
    } catch(err) {
    this.executeResults(false, data, cache);
    end = 2
    } 

    if(end !== 2){
    this.callNextAction(cache)}
  },


  mod() {},
};
