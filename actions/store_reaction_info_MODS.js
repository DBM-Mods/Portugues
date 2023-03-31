module.exports = {
  name: "Store Reaction Info MOD",
  section: "Messaging",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const info = [
     'Objeto da Reação',
     'Total de reações',
     'Total de reações de usuários',
     'Total de reações de bots',
     'Usuário aleatório da reação',
     '',
     '',
     '',
     '',
     '',
     'Lista de Bots e Usuários da reação',
     'Lista de ID dos Bots e Usuários da reação',
     'Lista de Nome dos Bots e Usuários da reação',
     'Lista de Usuários da reação',
     'Lista de ID dos usuários da reação',
     'Lista de Nome dos usuários da reação'
    ];
    return `${presets.getMessageText(data.message, data.varName)} - ${info[parseInt(data.info, 10)]}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "Desconhecido";
    switch (info) {
      case 0:
        dataType = "Objeto";
        break;
      case 1:
        dataType = "Número";
        break;
      case 2:
        dataType = "Número";
        break;
      case 3:
        dataType = "Número";
        break;
      case 4:
        dataType = "Objeto";
        break;
      case 10:
        dataType = "Lista";
        break;
      case 11:
        dataType = "Lista";
        break;
      case 12:
        dataType = "Lista";
        break;
      case 13:
        dataType = "Lista";
        break;
      case 14:
        dataType = "Lista";
        break;     
      case 15:
        dataType = "Lista";
        break;
    }
    return [data.varName2, dataType];
  },

  fields: ["message", "varName", "tipo", "emoji", "info", "storage", "varName2"],


  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <table><tr><td class="col1">
  <span class="dbminputlabel">Mensagem</span><br>
    <select id="message" class="round" onchange="glob.onComparisonChanged(this)">
		<option value="0" selected>Mensagem do comando</option>
		<option value="1">Variável Temporária</option>
    <option value="2">Variável Servidor</option>
    <option value="3">Variável Global</option>
    </select>
    </td>
    <td class="col2">
  <div id="varNameContainer2">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" list="variableList" class="round" type="text">
  </div>
  </td></tr></table>

<br>

<table><tr><td class="col1">
<span class="dbminputlabel">Tipo</span><br>
<select id="tipo" class="round">
		<option value="0" selected>Icone</option>
	</select></td><td class="col2">
<div style="width: 100%;" id="containerxin">
<span class="dbminputlabel">Emoji</span><br>
<input id="emoji" class="round" type="text">
</div></td></tr></table>

<br>

	<span class="dbminputlabel">Informação</span><br>
	<select id="info" class="round">
   <optgroup label="Geral">
		<option value="0" selected>Objeto da Reação</option>
    <option value="1">Total de reações</option>
    <option value="2">Total de reações de usuários</option>
    <option value="3">Total de reações de bots</option>
    <option value="4">Usuário aleatório da reação</option>
    </optgroup>
    <optgroup label="Listas">
    <option value="10">Lista de Bots e Usuários da reação</option>
		<option value="11">Lista de ID dos Bots e Usuários da reação</option>
    <option value="12">Lista de Nome dos Bots e Usuários da reação</option>
    <option value="13">Lista de Usuários da reação</option>
		<option value="14">Lista de ID dos usuários da reação</option>
    <option value="15">Lista de Nome dos usuários da reação</option>
    </optgroup>
	</select>


<br>

<table><tr><td class="col1">
  <span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
    </td>
    <td class="col2">
  <div id="varNameContainer2">
  <span class="dbminputlabel">Nome da variavel</span><br>
    <input id="varName2" class="round" type="text">
  </div>
  </td></tr></table>

<style>	
table{width:100%}
.col1{width:35%;padding:0px 10px 0px 0px}
.col2{width:65%}
</style>
`;
  },


  init() {
    const { glob, document } = this;

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("varNameContainer2").style.display = "none";
      } else {
        document.getElementById("varNameContainer2").style.display = null;
      }
    };

    glob.onComparisonChanged(document.getElementById("message"));

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const oemoji = this.evalMessage(data.emoji, cache);
    const varName = this.evalMessage(data.varName, cache);
    const storage = parseInt(data.storage, 10);
    const varName2 = this.evalMessage(data.varName2, cache);
    const tipo = parseInt(data.tipo, 10);

    const msg = await this.getMessageFromData(data.message, varName, cache);

    if (!msg) {
      this.callNextAction(cache);
      return this.callNextAction(cache);
    }


    if(tipo == 0){
    reaxin = msg.reactions.cache.filter((fil) => fil.emoji.name == oemoji).map((reaction) => reaction.emoji)
    }
    if(tipo == 1){
    reaxin = msg.reactions.cache.filter((fil) => fil.emoji.id == oemoji).map((reaction) => reaction.emoji)
    }

    const info = parseInt(data.info, 10);

    let result

    switch (info) {
      case 0:

        try{
        result = reaxin[0]
      } catch{
        result = []
      }
        break;
      case 1:

        try{
        result = reaxin[0].reaction.count
      }catch{}

        break;
      case 2:

      try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        filtro = reaxinusers.filter((fil) => fil.bot == false).map(users => users)
        result = Math.floor(filtro.length)
      }catch{
          result = 0
        }

        break;
      case 3:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        filtro = reaxinusers.filter((fil) => fil.bot == true).map(users => users)
        result = Math.floor(filtro.length)
      }catch{
        result = 0
      }

        break;
      case 4:
        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        filtro = reaxinusers.filter((fil) => fil.bot == false).map(users => users)
        random = Math.floor(Math.random()*filtro.length)
        result = filtro[random]
      }catch{
        result = 0
      }

        break;
      case 10:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.map(users => users)
      }catch{
        result = []
      }

        break;
      case 11:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.map(users => users.id)
      }catch{
        result = []
      }

        break;
      case 12:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.map(users => users.username)
      }catch{
        result = []
      }

        break;
      case 13:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.filter((fil) => fil.bot == false).map(users => users)
      }catch{
        result = []
      }

        break;
      case 14:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.filter((fil) => fil.bot == false).map(users => users.id)
      }catch{
        result = []
      }

        break;
      case 15:

        try{
        reaxinusers = await reaxin[0].reaction.users.fetch()
        result = reaxinusers.filter((fil) => fil.bot == false).map(users => users.username)
      }catch{
        result = []
      }
      
        break;

      default:
        break;
    } 
    
    if (result !== undefined) {
      this.storeValue(result, storage, varName2, cache);
    }
    this.callNextAction(cache);
  },

  

  mod() {
    
  },
};
