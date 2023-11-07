module.exports = {
  name: "Set Bot Avatar MOD",
  section: "Bot Client Control",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "[Tempest - 321400509326032897]",
    authorUrl: "https://github.com/DBM-Mods/Portugues",
    downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
  },

  subtitle(data, presets) {
    let desccor;

    if (data.descriptionx) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${data.image}</font>`;
  },

  fields: ["image", "description", "descriptionx", "descriptioncolor", "errcmd", "iffalse", "iffalseVal", "actionsError"],

  html(isEvent, data) {
    return `
        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
        <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

        <div id="flutuador" style="padding:0px 0px 15px 0px; margin-top: 5px;">
        <table style="width:100%;"><tr>
            <td>
            <span class="dbminputlabel">Descrição da Action</span>
            <br>
            <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
            </td>
            <td style="padding:0px 0px 0px 10px;width:70px">
            <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px">
                <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
            </div>
            <br>
            <input type="color" value="#ffffff" class="round" id="descriptioncolor">
            </td>
        </table>
        </div>

        <span class="dbminputlabel">Local/Web URL</span>
        <input class="round" type="text" id="image" placeholder="Localização ou URL da imagem">

        <br>

        <span class="dbminputlabel">Opções</span>
        <br>
        <div style="padding:10px;background:rgba(0,0,0,0.2)">
            <dbm-checkbox id="errcmd" label="Exibir erro no console" checked></dbm-checkbox>
        </div>

        <br>

        <div style="float: left; width: 40%">
            <span class="dbminputlabel">Caso falhe</span>
            <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
                <option value="0">Continuar ações</option>
                <option value="1">Parar sequência de ação</option>
                <option value="2">Ir para a ação</option>
                <option value="3">Pular as próximas ações</option>
                <option value="4">Ir para a âncora de ação</option>
                <option value="5">Realizar ações e parar</option>
                <option value="99">Realizar ações e continuar</option>
            </select>
        </div>

        <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
        <span id="xinelasT" class="dbminputlabel">Para</span>
        <input id="iffalseVal" class="round" type="text">
        </div>

        <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 470px)"></action-list-input>

        <style>
        .dbmmodsbr1 {
            position: absolute;
            bottom: 0px;
            border: 0px solid rgba(50,50,50,0.7);
            background: rgba(0,0,0,0.7);
            color: #999;
            padding: 5px;
            left: 0px;
            z-index: 999999;
            cursor: pointer;
        }

        .dbmmodsbr2 {
            position: absolute;
            bottom: 0px;
            border: 0px solid rgba(50,50,50,0.7);
            background: rgba(0,0,0,0.7);
            color: #999;
            padding: 5px;
            right: 0px;
            z-index: 999999;
            cursor: pointer;
        }
        </style>
    `;
  },

  init() {
    glob.onComparisonChanged = function (event) {
      if (event.value == "0" || event.value == "1" || event.value == "7") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = "none";
      } else if (event.value == "5" || event.value == "99") {
        document.getElementById("iffalseContainer").style.display = "none";
        document.getElementById("actionsError").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = null;
        document.getElementById("actionsError").style.display = "none";
      }

      if (event.value == "2") {
        document.querySelector("[id='xinelasT']").innerText = "Número da ação";
      }

      if (event.value == "3") {
        document.querySelector("[id='xinelasT']").innerText = "Pular ações";
      }

      if (event.value == "4") {
        document.querySelector("[id='xinelasT']").innerText = "Nome da âncora";
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const botClient = this.getDBM().Bot.bot.user;
    const image = this.evalMessage(data.image, cache);

    try {
      await botClient.setAvatar(image);
    } catch (err) {
      if (data.errcmd) this.displayError(data, cache, err);
      if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
      if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

      return this.executeResults(false, data, cache);
    }

    this.callNextAction(cache);
  },

  mod() { },

  modInit(data) {
    this.prepareActions(data.actionsError);
  }
};