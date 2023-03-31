module.exports = {
  name: 'Find Object on a Server MOD',
  section: 'Channel Control',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const info = ['Geral', 'Categoria', 'Canal de Texto', 'Canal de Voz', 'Tópico público', 'Tópico privado'];
    return `Encontrar ${info[parseInt(data.filtro, 10)]} (${data.find})`;
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Objeto'];
  },

  fields: ['filtro','info1','info2','info3','info4', 'find', 'storage', 'varName', "iffalse", "iffalseVal"],

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.2</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <span class="dbminputlabel">Encontrar</span><br>
    <select id="filtro" class="round" onchange="glob.onChange1(this)">
            <option value="0" selected>Geral</option>
            <option value="1">Categoria</option>
            <option value="2">Canal de Texto</option>
            <option value="3">Canal de Voz</option>
            <option value="4">Tópico público</option>
            <option value="5">Tópico privado</option>
    </select>

<br>

<div>
<table><tr><td class="col1" id="xinxyla0">

  <span class="dbminputlabel">Filtro</span><br>

<div id="xinxyla1">
    <select id="info1" class="round">
    <option value="0" selected>ID</option>
      <option value="1">Nome exato</option>
      <option value="7">Inclui no Nome</option>
      <option value="8">Comprimento do nome é maior que</option>
      <option value="9">Comprimento do nome menor que</option>
      <option value="10">Comprimento do nome igual a</option>
      <option value="11">Nome começa com</option>
      <option value="12">Nome termina com</option>
    </select>
</div>
<div id="xinxyla2">
    <select id="info2" class="round">
    <option value="0" selected>ID</option>
    <option value="1">Nome exato</option>
    <option value="7">Inclui no Nome</option>
    <option value="8">Comprimento do nome é maior que</option>
    <option value="9">Comprimento do nome menor que</option>
    <option value="10">Comprimento do nome igual a</option>
    <option value="11">Nome começa com</option>
    <option value="12">Nome termina com</option>
    <option value="2">Tópico</option>
    <option value="3">Posição</option>
    </select>
</div>
<div id="xinxyla3">
    <select id="info3" class="round">
    <option value="0" selected>ID</option>
    <option value="1">Nome exato</option>
    <option value="7">Inclui no Nome</option>
    <option value="8">Comprimento do nome é maior que</option>
    <option value="9">Comprimento do nome menor que</option>
    <option value="10">Comprimento do nome igual a</option>
    <option value="11">Nome começa com</option>
    <option value="12">Nome termina com</option>
    <option value="3">Posição</option>
    <option value="4">Limite de membros</option>
    <option value="5">Bitrate (kbps)</option>
    </select>
</div>
<div id="xinxyla4">
    <select id="info4" class="round">
    <option value="0" selected>ID</option>
    <option value="1">Nome exato</option>
    <option value="7">Inclui no Nome</option>
    <option value="8">Comprimento do nome é maior que</option>
    <option value="9">Comprimento do nome menor que</option>
    <option value="10">Comprimento do nome igual a</option>
    <option value="11">Nome começa com</option>
    <option value="12">Nome termina com</option>
    <option value="6">ID do Criador do Tópico</option>
    </select>
</div>


    </td>
    <td class="col2">
    <div class="col-3 input-effect" style="width: 100%;">
    <input id="find" class="efeitoala" class="round" type="text">
    <label><span class="dbminputlabel">Valor</span></label>
    <span class="focus-border"></span>
    </div>
    </td></tr></table>
</div>

<br>

<table><tr><td class="col1">
<span class="dbminputlabel">Se o objeto não for encontrado</span><br>
<select id="iffalse" class="round" onchange="glob.onComparisonChanged2(this)">
<option value="0" selecionado>Continuar ações</option>
<option value="1">Parar sequência de ação</option>
<option value="2">Ir para a ação</option>
<option value="3">Pular as próximas ações</option>
<option value="4">Ir para a âncora de ação</option>
</select>
</td>
<td class="col2">
<div id="iffalseContainer" style="display: none; float: right; width: 100%;">
<div class="col-3 input-effect" style="width: 100%;">
<input id="iffalseVal" class="efeitoala" name="actionxinxyla" type="text">
<label><span id="xinelas" class="dbminputlabel">Para</span></label>
<span class="focus-border"></span>
</div>
</td></tr></table>

<br>

<table><tr><td class="col1">
<span class="dbminputlabel">Armazenar em</span><br>
    <select id="storage" class="round">
        ${data.variables[1]}
    </select>
</td>
<td class="col2">
    <div class="col-3 input-effect" style="width: 100%;">
        <input id="varName" class="efeitoala" style="width:100%" type="text">
        <label><span class="dbminputlabel">Nome da Variavel</span></label>
        <span class="focus-border"></span>
    </div>
</td></tr></table>


<style>

table{width:100%}
.col1{width:45%;padding:0px 10px 0px 0px}
.col2{width:55%}

select.round{width:100%;border:0 solid #eee !important;border-radius:4px !important;box-sizing:border-box !important;display:block !important;height:28px !important;padding-left:8px !important;box-shadow:-2px 0 0 #fff;transition:box-shadow 150ms ease}
select.round:focus{outline-width:0;box-shadow:0 1px 0 #0059ff;}
.col-3 {border: 0px solid #eee;float: left; margin-top: 20px; margin-bottom: 0px; position: relative; background: rgba(0, 0, 0, 0.27); border-radius: 5px;}
.efeitoala{border: 0; padding: 4px; border-bottom: 1px solid #ccc; background-color: transparent;}
.efeitoala ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
.efeitoala:focus ~ .focus-border,
.has-content.efeitoala ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
.efeitoala ~ label{position: absolute; left: 0%; width: 100%; top: -21px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
.efeitoala:focus ~ label, .has-content.efeitoala ~ label{font-size: 12px; color: #4caf50; transition: 0.3s;}

</style>`;
  },

  init: function() {
    const {glob, document} = this;

    glob.onChange1 = function(event) {
        const value = parseInt(event.value)
        
        if (value == 0 || value == 1) {
          document.getElementById('xinxyla1').style.display = "block";
          document.getElementById('xinxyla2').style.display = "none";
          document.getElementById('xinxyla3').style.display = "none";
          document.getElementById('xinxyla4').style.display = "none";
        }
        if (value == 2) {
          document.getElementById('xinxyla1').style.display = "none";
          document.getElementById('xinxyla2').style.display = "block";
          document.getElementById('xinxyla3').style.display = "none";
          document.getElementById('xinxyla4').style.display = "none";
        }
        if (value == 3) {
          document.getElementById('xinxyla1').style.display = "none";
          document.getElementById('xinxyla2').style.display = "none";
          document.getElementById('xinxyla3').style.display = "block";
          document.getElementById('xinxyla4').style.display = "none";
        }
        if (value == 4 || value == 5) {
          document.getElementById('xinxyla1').style.display = "none";
          document.getElementById('xinxyla2').style.display = "none";
          document.getElementById('xinxyla3').style.display = "none";
          document.getElementById('xinxyla4').style.display = "block";
        }

        }

    glob.onChange1(document.getElementById('filtro'))

    glob.onComparisonChanged2 = function (event) {
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

    glob.onComparisonChanged2(document.getElementById("iffalse"));

  },

  async action(cache) {
    const { server } = cache;
    if (!server || !server.channels) return this.callNextAction(cache);
    const data = cache.actions[cache.index];

    const filtro = parseInt(data.filtro, 10);
    const info1 = parseInt(data.info1, 10);
    const info2 = parseInt(data.info2, 10);
    const info3 = parseInt(data.info3, 10);
    const info4 = parseInt(data.info4, 10);

    const find = this.evalMessage(data.find, cache);

    let result
    let info

    if(filtro == 0){channels = server.channels.cache;info = info1}
    if(filtro == 1){channels = server.channels.cache.filter((e) => e.type === 'GUILD_CATEGORY');info = info1}
    if(filtro == 2){channels = server.channels.cache.filter((e) => e.type === "GUILD_TEXT" || e.type === "GUILD_NEWS");info = info2}
    if(filtro == 3){channels = server.channels.cache.filter((e) => e.type === "GUILD_VOICE");info = info3}
    if(filtro == 4){channels = server.channels.cache.filter((e) => e.type === 'GUILD_PUBLIC_THREAD');info = info4}
    if(filtro == 5){channels = server.channels.cache.filter((e) => e.type === 'GUILD_PRIVATE_THREAD');info = info4}

    switch (info) {
      case 0:
        result = channels.get(find);
        break;
      case 1:
        result = channels.find((e) => e.name === find);
        break;
      case 2:
        result = channels.find((e) => e.topic === find);
        break;
      case 3:
        const position = parseInt(find, 10);
        result = channels.find((e) => e.position === position);
        break;
      case 4:
        const userLimit = parseInt(find, 10);
        result = channels.find((e) => e.userLimit === userLimit);
        break;
      case 5:
        const bitrate = parseInt(find, 10) / 1000;
        result = channels.find((e) => e.bitrate === bitrate);
        break;
      case 6:
        result = channels.find((e) => e.ownerId === find);
        break;
      case 7:
        result = channels.find((e) => e.name.includes(find));
        break;
      case 8:
        numero = parseInt(find, 10);
        result = channels.find((e) => e.name.length > numero);
        break;
      case 9:
        numero = parseInt(find, 10);
        result = channels.find((e) => e.name.length < numero);
        break;
      case 10:
        numero = parseInt(find, 10);
        result = channels.find((e) => e.name.length == numero);
        break;
      case 11:
        result = channels.find((e) => e.name.startsWith(find));
        break;
      case 12:
        result = channels.find((e) => e.name.endsWith(find));
        break;  
      default:
        break;
    }

    if (result !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(result, storage, varName, cache);
    }

    if(result == undefined){this.executeResults(false, data, cache)}
    else{this.callNextAction(cache)}
  },

  mod() {},
};
