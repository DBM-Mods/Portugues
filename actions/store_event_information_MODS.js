module.exports = {
  name: "Store Event Information MOD",
  section: "Event",
  meta: {
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    return `Obter ${data.branches.length == 1 ? data.branches.length + " item" : data.branches.length + " itens"}`;
  },

  variableStorage(data, varType) {
    let vars = [];

    for (var i = 0; i < data.branches.length; i++) {
      let type = parseInt(data.branches[i].storage, 10);

      if (type == varType && data.branches[i].varName) {
        let varName = data.branches[i].varName;

        vars.push(varName);
        vars.push("Desconhecido");
      }

    }

    if (vars.length > 0) {
      return vars;
    }
  },


  fields: ["branches"],


  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>
   
    <div id="xinxyla001">
<dialog-list id="branches" fields='["info", "storage", "varName"]' dialogResizable dialogTitle="Armazenar informações do evento" dialogWidth="500" dialogHeight="220" listLabel="Armazenar informações do evento" listStyle="height: calc(100vh - 200px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">
    <div style="padding-top:20px;margin-right:10px;margin-left:10px;">

      <span class="dbminputlabel">Informação</span><br>
      <select id="info" class="round">
      <optgroup label="Member Move Voice Channel MOD">
        <option value="0" selected>Membro que entrou no canal</option>
        <option value="1">Canal ao qual o membro ingressou</option>
        <option value="2">Canal ao qual o membro estava anteriormente</option>
        </optgroup>
        <optgroup label="Delete Bulk Messages MOD">
        <option value="10">Lista de objetos das mensagens apagadas</option>
        <option value="11">Total de mensagens apagadas</option>
        <option value="12">Lista de timestamp das mensagens apagadas</option>
        <option value="13">Lista de conteúdos das mensagens apagadas</option>
        <option value="14">Lista dos autores das mensagens apagadas</option>
        <option value="15">Lista de IDs dos autores das mensagens apagadas</option>
        <option value="16">Data - Autor : Mensagem apagada</option>
        </optgroup>
      </select>
      

      <br>

      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Armazenar em</span><br>
          <select id="storage" class="round">
            ${data.variables[1]}
          </select>
      </div>

      <div id="varNameContainer" style="float: right; width: 60%;">
        <span class="dbminputlabel">Nome da Variável</span><br>
        <input id="varName" class="round" type="text">
      </div>


      </div>
</dialog-list>

</div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },

  init() {
    const { glob, document } = this;

    const xinelaslinks = document.getElementsByClassName('xinelaslink');
    for (let x = 0; x < xinelaslinks.length; x++) {
      const xinelaslink = xinelaslinks[x];
      const url = xinelaslink.getAttribute('data-url');
      if (url) {
        xinelaslink.setAttribute('title', url);
        xinelaslink.addEventListener('click', (e) => {
          e.stopImmediatePropagation();
          console.log(`Launching URL: [${url}] in your default browser.`);
          require('child_process').execSync(`start ${url}`);
        });
      }
    }

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
      const info = parseInt(data.info);
      const storage = ['Seu xitadu', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global'];

      switch (info) {
        case 0:
          result += "Membro que entrou no canal";
          break;
        case 1:
          result += "Canal ao qual o membro ingressou";
          break;
        case 2:
          result += `Canal ao qual o membro estava anteriormente`;
          break;
        case 10:
          result += "Lista de objetos das mensagens apagadas";
          break;
        case 11:
          result += "Total de mensagens apagadas";
          break;
        case 12:
          result += `Lista de timestamp das mensagens apagadas`;
          break;
        case 13:
          result += "Lista de conteúdos das mensagens apagadas";
          break;
        case 14:
          result += "Lista dos autores das mensagens apagadas";
          break;
        case 15:
          result += `Lista de IDs dos autores das mensagens apagadas`;
          break;
        case 16:
          result += `Data - Autor : Mensagem apagada`;
          break;
      }

      result += ` > ${storage[parseInt(data.storage, 10)]} (${data.varName}) </div>`;
      return result;
    };

  },

  action(cache) {
    const data = cache.actions[cache.index];
    const branches = data.branches;
    let not

    eventogate = this.getVariable(1, "EVENTOvarGATE", cache)

    for (var i = 0; i < branches.length; i++) {
      let branch = branches[i];
      let info = parseInt(branch.info);
      let result;

      switch (info) {
        case 0:
          if (eventogate == "100") {
            result = this.getVariable(1, "EVENTOvar1", cache)
          } else {
            not = 1
          }
          break;
        case 1:
          if (eventogate == "100") {
            result = this.getVariable(1, "EVENTOvar2", cache)
          } else {
            not = 1
          }
          break;
        case 2:
          if (eventogate == "100") {
            result = this.getVariable(1, "EVENTOvar3", cache)
          } else {
            not = 1
          }
          break;
        case 10:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v)
          } else {
            not = 1
          }
          break;
        case 11:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v).length
          } else {
            not = 1
          }
          break;
        case 12:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v.createdTimestamp)
          } else {
            not = 1
          }
          break;
        case 13:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v.content)
          } else {
            not = 1
          }
          break;
        case 14:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v.author)
          } else {
            not = 1
          }
          break;
        case 15:
          if (eventogate == "101") {
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v => v.author.id)
          } else {
            not = 1
          }
          break;
        case 16:
          if (eventogate == "101") {
            moment = require("moment-timezone");
            coletar = this.getVariable(1, "EVENTOvar1", cache)
            result = coletar.map(v =>
              v = (

                moment(v.createdTimestamp).tz('America/Sao_Paulo').format("DD/MM/YYYY HH:mm:ss")

                + ' - ' + v.author.username + '#' + v.author.discriminator + ' : ' + v.content)
            ).reverse().join('\n');
          } else {
            not = 1
          }
          break;
      }

      if (not == 1) { console.log(`ERRO ${cache.index}# > Store Event Information MOD: Coloque a action no evento correto`) }

      let varName = this.evalMessage(branch.varName, cache);
      let storage = parseInt(branch.storage, 10);
      this.storeValue(result, storage, varName, cache);
    }



    this.callNextAction(cache);
  },


  mod() { },
};