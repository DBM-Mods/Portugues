module.exports = {
  name: "Send Message",
  displayName: "Send Message MOD",
  section: "Messaging",
  meta: {
    version: "2.1.7",
    preciseCheck: true,
    author: "[xinxyla - 172782058396057602]<br>[Tempest - 321400509326032897]",
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    let text = "";

    if (data.storagewebhook !== "0") {
      text = `Enviar via Webhook: ${data.varwebhook}`;
    } else {

      if (data.message) {
        text = `"${data.message.replace(/[\n\r]+/, " ↲ ")}"`;
      } else if (data.embeds?.length > 0) {
        text = `${data.embeds.length} Embeds`;
      } else if (data.attachments?.length > 0) {
        text = `${data.attachments.length} Arquivos`;
      } else if (data.buttons?.length > 0 || data.selectMenus?.length > 0) {
        text = `${data.buttons.length} Botões e ${data.selectMenus.length} Menus de seleção`;
      } else if (data.editMessage && data.editMessage !== "0") {
        if (data.editMessage === "intUpdate") {
          text = "Opções da mensagem - Editar interação"
        } else {
          text = `Opções da mensagem - ${presets.getVariableText(data.editMessage, data.editMessageVarName)}`;
        }
      } else {
        text = `Nada (Pode ocasionar erro)`;
      }

      if (data.dontSend) {
        text = `Armazenar Data: ${text}`;
      } else {
        text = `${presets.getSendReplyTargetText(data.channel, data.varName)}: ${text}`;
      }

    }

    if (data.descriptioncolor == undefined) {
      data.descriptioncolor = "#ffffff";
    }

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor;
    } else {
      desccor = "none";
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${text}</font>`
  },

  variableStorage(data, varType) {
    let vars = [];

    const type = parseInt(data.storage, 10);
    const typeError = parseInt(data.storageError, 10);

    if (type == varType) {
      vars.push(data.varName2);
      vars.push(data.dontSend ? "Opções da Mensagem" : "Mensagem");
    }

    if (typeError == varType) {
      vars.push(data.varNameError);
      vars.push("Texto ~ Erro");
    }

    if (vars.length > 0) return vars;
  },

  fields: [
    "channel",
    "varName",
    "message",
    "buttons",
    "selectMenus",
    "attachments",
    "embeds",
    "reply",
    "ephemeral",
    "tts",
    "overwrite",
    "dontSend",
    "editMessage",
    "editMessageVarName",
    "storage",
    "varName2",
    "iffalse",
    "iffalseVal",
    "descriptioncolor",
    "description",
    "descriptionx",
    "storagewebhook",
    "varwebhook",
    "webhookname",
    "webhookavatar",
    "messageoff",
    "mentions",
    "actionsError",
    "storageError",
    "varNameError",
    "errcmd",
    "editweb",
    "removeComps",
    "removeEmbeds",
    "removeAttachments",
    "removeCompsE",
    "removeEmbedsE",
    "removeAttachmentsE",
    "di",
  ],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 4.2</div>

    <div style="height:52px;overflow: hidden;padding-top: 3px;">
    <div style="width:100%" id="xin2"><send-reply-target-input dropdownLabel="Enviar para" selectId="channel" variableInputId="varName"></send-reply-target-input>
    

</div><div id="xin3"><div style="float: left; width: 35%">
<span class="dbminputlabel">Enviar para</span><br>
<select class="round">
<option value="0" selected>Webhook</option>
</select>
</div>
<br><br><br>
</div>


</div>
<div style="width:100%">
<tab-system>


  <tab label="Texto" icon="align left">
  <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow:auto">
    
      <textarea id="message" class="dbm_monospace" rows="6" placeholder="Insira a mensagem aqui..." style="height: calc(100vh - 310px); white-space: nowrap;"></textarea>
      <br>       <div style="margin-top:-4px;float:left;text-align:left;position:relative"><dbm-checkbox style="font-size:12px" id="messageoff" label="Adicionar/Substituir Texto" checked></dbm-checkbox></div>
      <div style="margin-top:-4px;float:left;text-align:left;position:relative"><dbm-checkbox id="mentions" style="font-size:12px" label="@ Notificar membros/cargos" checked></dbm-checkbox></div>
    
    
      <div id="contador" style="float:right;text-align:right;position:relative;width:22%">0 caracteres</div>
    </div>
  </tab>


  <tab label="Embeds" icon="book image">
  <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow:auto">

      <dialog-list id="embeds" fields='["title", "url", "color", "colorrandom", "timestamp", "timestampper", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl", "formula", "val1", "comparar", "val2"]' dialogTitle="Embed Info" dialogResizable dialogWidth="750" dialogHeight="550" listLabel="Embeds" listStyle="height: calc(100vh - 310px);" itemName="Embed" itemCols="1" itemHeight="60px;" itemTextFunction="'<div style=margin-left:-10px;background:'+data.color+';float:left;width:10px;overflow:hidden;height:60px;><br></div><div style=float:left;width:59%;overflow:hidden;margin-left:5px;> Titulo: ' + data.title + ' <br> Descrição: ' + data.description + '</div><div style=float:right;width:39%;overflow:hidden;>Autor: '+ data.author +' <br>Fields: ' + data.fields.length + (data.formula == 1 || data.formula == 2 ? '<span style=float:right title=Condição_ligada> 🔘 </span>' : '') + '</div>'" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 8px 8px 0px 8px;">


              <div style="padding: 8px;height: calc(100vh - 80px);overflow:auto">

          
              <div style="padding: 6px; background: rgba(0, 0, 0, 0.3);">
              <span class="dbminputlabel">Exibição da embed</span>
              <select id="formula" class="round">
                <option value="0" selected>Sempre exibir a embed / Ignorar o comparador abaixo</option>
                <option value="1">Exibir a embed somente se o comparador for falso</option>
                <option value="2">Exibir a embed somente se o comparador for verdadeiro</option>
              </select>
      
              <br>
      
              <table style="width: 100%;">
                <tr>
                  <td style="width:33%">
                    <span class="dbminputlabel">Valor A</span>
                    <input id="val1" class="round" type="text">
                  </td>
                  <td style="width:33%;padding:0px 6px 0px 6px">
                    <span class="dbminputlabel">Comparador</span><br>
                    <select id="comparar" class="round">
                      <optgroup label="Número ou Texto">
                        <option value="0">Valor A - Existe</option>
                        <option value="1" selected>Igual a</option>
                        <option value="2">Exatamente igual</option>
                      </optgroup>
                      <optgroup label="Número">
                        <option value="3">Menor que</option>
                        <option value="13">Menor ou igual a</option>
                        <option value="4">Maior que</option>
                        <option value="12">Maior ou igual a</option>
                        <option value="19">Valor A - É um número par?</option>
                        <option value="20">Valor A - É um número ímpar?</option>
                        <option value="21">Valor A - É um número?</option>
                      </optgroup>
                      <optgroup label="Texto">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7">O comprimento é maior que</option>
                        <option value="8">O comprimento é menor que</option>
                        <option value="9">O comprimento é igual a</option>
                        <option value="10">Começa com</option>
                        <option value="11">Termina com</option>
                        <option value="16">Valor A - Possui acentuações?</option>
                        <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                        <option value="24">Valor A - É um texto?</option>
                        <option value="23">Valor A - É um URL de imagem?</option>
                        <option value="25">Valor A - É um URL?</option>
                        <option value="26">Valor A - O email existe?</option>
                      </optgroup>
                      <optgroup label="Texto ~ Inclui">
                        <option value="5">Inclui exatamente</option>
                        <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="30">Inclui ~ Ignorar acentuações</option>
                        <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
                        <option value="27">Inclui algum URL?</option>
                        <option value="28">Inclui algum convite do Discord?</option>
                        <option value="32">Inclui exatamente a palavra</option>
                        <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
                        <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                      </optgroup>
                      <optgroup label="Outros">
                        <option value="22">Valor A - É uma lista?</option>
                      </optgroup>
                    </select>
                  </td>
                  <td style="width:33%">
                    <span class="dbminputlabel">Valor B</span><br>
                    <input id="val2" class="round" type="text">
                  </td>
                </tr>
              </table>
      
        
            </div>
            <br>
<table style="width:100%"><tr><td style="width:33%;vertical-align: top;">


<span class="dbminputlabel">Autor Icone URL / Nome do Anexo</span><br>
<input id="authorIcon" class="round" type="text" placeholder="Deixe em branco para nenhum...">

<br>


                  <span class="dbminputlabel">Título</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                </td>
                <td style="width:33%;vertical-align: top;padding:0px 6px 0px 6px">

                <span class="dbminputlabel">Autor Texto</span><br>
                <input id="author" class="round" type="text" placeholder="Deixe em branco para nenhum....">

                <br>


                  <span class="dbminputlabel">URL</span><br>
                  <input id="url" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                </td>

                <td style="width:33%;vertical-align: top">

                                                
                <span class="dbminputlabel">Autor URL</span><br>
                <input id="authorUrl" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                <br>

                <span class="dbminputlabel">Thumbnail URL / Nome do Anexo</span><br>
                <input id="thumbUrl" class="round" type="text" placeholder="Deixe em branco para nenhum, image.png ou um link http">

                </td>
                </tr></table>

                <span class="dbminputlabel">Descrição</span><br>
                <textarea id="description" class="dbm_monospace" rows="7" placeholder="Deixe em branco para nenhum..."></textarea>

                <br>

                <dialog-list id="fields" fields='["name", "value", "inline", "val1", "val2", "comparar", "formula"]' dialogTitle="Field Info" dialogResizable dialogWidth="540" dialogHeight="500" listLabel="Fields" listStyle="height: 120px;" itemName="Field" itemCols="1" itemHeight="25px;" itemTextFunction="'<table style=width:100%><tr><td style=width:50%>Nome: ' + data.name + '</td><td>' + 'Valor: '+ data.value + '</td></tr></table>'" itemStyle="text-align: left; line-height: 25px;">
                <div style="height: calc(100vh - 60px);overflow:auto">

<div style="padding: 16px;background:rgba(0,0,0,0.3)">

<span class="dbminputlabel">Exibição da Field</span><br>
<select id="formula" class="round">
<option value="0" selected>Sempre exibir a field / Ignorar o comparador abaixo</option>
<option value="1">Exibir a field somente se o comparador for falso</option>
<option value="2">Exibir a field somente se o comparador for verdadeiro</option>
</select>

<br>

<table style="width: 100%;">
<tr>
  <td style="width:33%";">
    <span class="dbminputlabel">Valor A</span>
    <input id="val1" class="round" type="text">
  </td>
  <td style="width:33%;padding:0px 6px 0px 6px">
    <span class="dbminputlabel">Comparador</span><br>
    <select id="comparar" class="round">
      <optgroup label="Número ou Texto">
        <option value="0">Valor A - Existe</option>
        <option value="1" selected>Igual a</option>
        <option value="2">Exatamente igual</option>
      </optgroup>
      <optgroup label="Número">
        <option value="3">Menor que</option>
        <option value="13">Menor ou igual a</option>
        <option value="4">Maior que</option>
        <option value="12">Maior ou igual a</option>
        <option value="19">Valor A - É um número par?</option>
        <option value="20">Valor A - É um número ímpar?</option>
        <option value="21">Valor A - É um número?</option>
      </optgroup>
      <optgroup label="Texto">
        <option value="6">Matches Regex</option>
        <option value="14">Matches Full Regex</option>
        <option value="7">O comprimento é maior que</option>
        <option value="8">O comprimento é menor que</option>
        <option value="9">O comprimento é igual a</option>
        <option value="10">Começa com</option>
        <option value="11">Termina com</option>
        <option value="16">Valor A - Possui acentuações?</option>
        <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
        <option value="24">Valor A - É um texto?</option>
        <option value="23">Valor A - É um URL de imagem?</option>
        <option value="25">Valor A - É um URL?</option>
        <option value="26">Valor A - O email existe?</option>
      </optgroup>
      <optgroup label="Texto ~ Inclui">
        <option value="5">Inclui exatamente</option>
        <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
        <option value="30">Inclui ~ Ignorar acentuações</option>
        <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
        <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
        <option value="27">Inclui algum URL?</option>
        <option value="28">Inclui algum convite do Discord?</option>
        <option value="32">Inclui exatamente a palavra</option>
        <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
        <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
        <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
        <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
      </optgroup>
      <optgroup label="Outros">
        <option value="22">Valor A - É uma lista?</option>
      </optgroup>
    </select>
  </td>
  <td style="width:33%;">
    <span class="dbminputlabel">Valor B</span><br>
    <input id="val2" class="round" type="text">
  </td>
</tr>
</table>


  </div>
  <div style="padding: 16px;">


  <div style="float: left; width: calc(50% - 12px);">
    <span class="dbminputlabel">Field Nome</span><br>
    <input id="name" class="round" type="text">
  </div>
  
  <div style="float: right; width: calc(50% - 12px);">
    <span class="dbminputlabel">Em linha?</span><br>
    <select id="inline" class="round">
      <option value="true">Sim</option>
      <option value="false" selected>Não</option>
    </select>
  </div>

  <br><br><br>

  <span class="dbminputlabel">Field Valor</span><br>
  <textarea id="value" class="dbm_monospace" rows="7" placeholder="Insira o texto do Field aqui..." style="height: calc(100vh - 320px); white-space: nowrap;"></textarea>

</div></div>
</dialog-list>

<br>

<span class="dbminputlabel">Imagem URL / Nome do Anexo</span><br>
<input id="imageUrl" class="round" type="text" placeholder="Deixe em branco para nenhum, image.png ou um link http">

<br>

                <table style="width:100%"><tr><td style="width:30%;vertical-align: top">
                
              <span class="dbminputlabel">Cor</span><div style="float:right;margin-top:-6px"><dbm-checkbox id="colorrandom" style="font-size:12px" label="Aleatória"></dbm-checkbox></div><br>
              <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para o padrão..."><td>
              <td style="width:40px;text-align:center"><a id="btr1" style="cursor:pointer" onclick="(function(){
                 document.getElementById('color').type = 'color'
                document.getElementById('btr1').style.display = 'none';
                document.getElementById('btr2').style.display = 'block';
                })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
                  document.getElementById('color').type = 'text';
                  document.getElementById('btr1').style.display = 'block';
                  document.getElementById('btr2').style.display = 'none';
                  })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>

                   </td>

                   <td style="width:40%;vertical-align: top;padding:0px 6px 0px 6px">

                <span class="dbminputlabel">Footer Icone URL / Nome do Anexo</span><br>
                <input id="footerIconUrl" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                </td>
                
                <td style="width:30%;vertical-align: top;">
                <span class="dbminputlabel">Usar Timestamp</span><div style="float:right;margin-top:-6px"><dbm-checkbox id="timestamp"  style="font-size:12px" label="Sim"></dbm-checkbox></div><br>
                <input id="timestampper" class="round" type="text" placeholder="Deixe em branco para o atual">
                </td></tr></table>

                <br>

                <span class="dbminputlabel">Footer Texto</span>
                <textarea id="footerText" class="dbm_monospace" rows="3" placeholder="Deixe em branco para nenhum..."></textarea>

              </div>


        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Botões" icon="clone">
  <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow:auto">

  <dialog-list id="buttons" fields='["name", "typeper", "type", "id", "row", "url", "emoji", "mode", "time", "actions", "val1", "val2", "comparar", "formula"]' dialogResizable dialogTitle="Button Info" dialogWidth="600" dialogHeight="600" listLabel="Botões" listStyle="height: calc(100vh - 310px);" itemName="Button" itemHeight="40px;" itemTextFunction="glob.formatItem2(data)" itemStyle="text-align: left; line-height: 40px;">
  <div style="padding: 16px;">

  <tab-system>

  <tab label="Ações" icon="list">

  <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 180px)"></action-list-input>
  </tab>

  <tab label="Botão / Config" icon="cogs">
  <div style="height: calc(100vh - 138px);overflow-y: scroll;overflow-x: hidden;width:100%">

  <div style="padding: 8px;background:rgba(0,0,0,0.3)">
  <span class="dbminputlabel">Exibição do botão</span><br>
  <select id="formula" class="round">
 
  <option value="0" selected>Sempre exibir o botão / Ignorar o comparador abaixo</option>
  <option value="1">Exibir o botão somente se o comparador for falso</option>
  <option value="2">Exibir o botão somente se o comparador for verdadeiro</option>
  <option value="3">Desabilitar o botão somente se o comparador for falso</option>
  <option value="4">Desabilitar o botão somente se o comparador for verdadeiro</option>
  <option value="5">Desabilitar o botão</option>
</select>

<br>

          <table style="width: 100%;">
            <tr>
              <td style="width:33%">
                <span class="dbminputlabel">Valor A</span>
                <input id="val1" class="round" type="text">
              </td>
              <td style="width:33%;padding:0px 6px 0px 6px">
                <span class="dbminputlabel">Comparador</span><br>
                <select id="comparar" class="round">
                  <optgroup label="Número ou Texto">
                    <option value="0">Valor A - Existe</option>
                    <option value="1" selected>Igual a</option>
                    <option value="2">Exatamente igual</option>
                  </optgroup>
                  <optgroup label="Número">
                    <option value="3">Menor que</option>
                    <option value="13">Menor ou igual a</option>
                    <option value="4">Maior que</option>
                    <option value="12">Maior ou igual a</option>
                    <option value="19">Valor A - É um número par?</option>
                    <option value="20">Valor A - É um número ímpar?</option>
                    <option value="21">Valor A - É um número?</option>
                  </optgroup>
                  <optgroup label="Texto">
                    <option value="6">Matches Regex</option>
                    <option value="14">Matches Full Regex</option>
                    <option value="7">O comprimento é maior que</option>
                    <option value="8">O comprimento é menor que</option>
                    <option value="9">O comprimento é igual a</option>
                    <option value="10">Começa com</option>
                    <option value="11">Termina com</option>
                    <option value="16">Valor A - Possui acentuações?</option>
                    <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                    <option value="24">Valor A - É um texto?</option>
                    <option value="23">Valor A - É um URL de imagem?</option>
                    <option value="25">Valor A - É um URL?</option>
                    <option value="26">Valor A - O email existe?</option>
                  </optgroup>
                  <optgroup label="Texto ~ Inclui">
                    <option value="5">Inclui exatamente</option>
                    <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
                    <option value="30">Inclui ~ Ignorar acentuações</option>
                    <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                    <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
                    <option value="27">Inclui algum URL?</option>
                    <option value="28">Inclui algum convite do Discord?</option>
                    <option value="32">Inclui exatamente a palavra</option>
                    <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
                    <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
                    <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                    <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                  </optgroup>
                  <optgroup label="Outros">
                    <option value="22">Valor A - É uma lista?</option>
                  </optgroup>
                </select>
              </td>
              <td  style="width:33%">
                <span class="dbminputlabel">Valor B</span><br>
                <input id="val2" class="round" type="text">
              </td>
            </tr>
          </table>


    </div>
<br>

    <div style="width: calc(50%); float: left;">
      <span class="dbminputlabel">Nome</span>
      <input id="name" class="round" type="text">

      <br>

    <table style="width:100%"><tr><td id="bxin1">
      <span class="dbminputlabel">Tipo / Menu</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
        document.getElementById('bxin1').style.display = 'none';
        document.getElementById('bxin2').style.display = 'block';
       })()"><button class="tiny compact ui icon button">Texto</button></a></div><br>
      <select id="type" class="round">
        <option value="PRIMARY" selected>PRIMARY (Azul/Blurple)</option>
        <option value="SECONDARY">SECONDARY (Cinza)</option>
        <option value="SUCCESS">SUCCESS (Verde)</option>
        <option value="DANGER">DANGER (Vermelho)</option>
        <option value="LINK">LINK (Cinza)</option>
      </select></td><td id="bxin2" style="display:none"><span class="dbminputlabel">Tipo / Variavel</span><div style="float:right;margin-top:-5px"><a style="cursor:pointer" onclick="(function(){
        document.getElementById('bxin2').style.display = 'none';
        document.getElementById('bxin1').style.display = 'block';
         })()"><button class="tiny compact ui icon button">Menu</button></a></div><br><input placeholder="Deixe em branco para usar o menu" id="typeper" class="round" type="text"></td></tr></table>


      <br>

      <span class="dbminputlabel">Link URL</span>
      <input id="url" placeholder="Deixe em branco para nenhum..." class="round" type="text">

      <br>

      <span class="dbminputlabel">
      Modo de resposta da ação
        <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
      </span><br>
      <select id="mode" class="round">
      <option value="PERSONAL">Uma vez, apenas para o usuário do comando</option>
      <option value="PUBLIC">Uma vez, qualquer um pode usar</option>
      <option value="MULTIPERSONAL">Multi, apenas para o usuário do comando</option>
      <option value="MULTI" selected>Multi, qualquer um pode usar</option>
      <option value="PERSISTENT">Persistente</option>
      </select>
    </div>
    <div style="width: calc(50% - 12px); float: right;">
      <span class="dbminputlabel">Único ID</span>
      <input id="id" placeholder="Deixe em branco para gerar automaticamente..." class="round" type="text">

      <br>

      <span class="dbminputlabel">Linha da ação (1 - 5)</span>
      <input id="row" placeholder="Deixe em branco para o padrão..." class="round" type="text">

      <br>

      <span class="dbminputlabel">Emoji</span>
      <input id="emoji" placeholder="Deixe em branco para nenhum..." class="round" type="text">

      <br>

      <span class="dbminputlabel">Limite de tempo (milissegundos)</span>
      <input id="time" placeholder="60000" class="round" type="text">
      
      </div>
      </div>
    </tab>
    </tab-system>

  </div>
</dialog-list>

    </div>
  </tab>


  <tab label="Menus" icon="list alternate">
  <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow:auto">

      <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions", "disabled"]' dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Menus" listStyle="height: calc(100vh - 310px);" itemName="Select Menu" itemCols="1" itemHeight="80px;" itemTextFunction="glob.formatItem3(data)" itemStyle="text-align: left; line-height: 40px;">
        <div style="padding: 16px;">
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">Nome do Menu</span>
            <input id="placeholder" class="round" type="text">

            <br>

            <span class="dbminputlabel">Nome da variável temporária</span>
            <input id="tempVarName" placeholder="Armazena o valor selecionado..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Número mínimo de seleção</span>
            <input id="min" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">
            Modo de resposta da ação
              <help-icon type="ACTION_RESPONSE_MODE"></help-icon>
            </span><br>
            <select id="mode" class="round">
            <option value="PERSONAL">Uma vez, apenas para o usuário do comando</option>
            <option value="PUBLIC">Uma vez, qualquer um pode usar</option>
            <option value="MULTIPERSONAL">Multi, apenas para o usuário do comando</option>
            <option value="MULTI" selected>Multi, qualquer um pode usar</option>
            <option value="PERSISTENT">Persistente</option>
            </select>

            <dbm-checkbox id="disabled" style="margin-top: 15px;" label="Criar menu desativado"></dbm-checkbox>
          </div>
          <div style="width: calc(33% - 16px); float: left; margin-right: 16px;">
            <span class="dbminputlabel">ID único</span>
            <input id="id" placeholder="Deixe em branco para gerar automaticamente..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Linha da ação (1 - 5)</span>
            <input id="row" placeholder="Deixe em branco para o padrão..." class="round" type="text">

            <br>

            <span class="dbminputlabel">Número máximo de seleção</span>
            <input id="max" class="round" type="text" value="1">

            <br>

            <span class="dbminputlabel">Limite de tempo (milissegundos)</span>
            <input id="time" placeholder="60000" class="round" type="text">
          </div>
          <div style="width: calc(34% - 8px); height: 300px; float: left; margin-left: 8px;">

            <dialog-list id="options" fields='["label", "description", "value", "emoji", "default", "val1", "val2", "comparar", "formula"]' dialogTitle="Select Menu Option Info" dialogWidth="460" dialogHeight="570" listLabel="Options" listStyle="height: 210px;" itemName="Option" itemCols="1" itemHeight="20px;" itemTextFunction="'[ ' + (data.formula || 'Exibir') + ' ] ' + data.label" itemStyle="text-align: left; line-height: 20px;">
            <div style="padding: 16px;background:rgba(0,0,0,0.3)">
                 <span class="dbminputlabel">Exibir</span><br>
                 <select id="formula" class="round">
                 <option value="Exibir" selected>Sempre exibir a opção / Ignorar o comparador abaixo</option>
                 <option value="Falso">Exibir a opção somente se o comparador for falso</option>
                 <option value="Verdadeiro">Exibir a opção somente se o comparador for verdadeiro</option>
               </select>
               <br>

              <table style="width: 100%;">
                  <tr>
                    <td>
                      <span class="dbminputlabel">Valor A</span>
                      <input id="val1" class="round" type="text">
                    </td>
                    <td>
                      <span class="dbminputlabel">Comparador</span><br>
                      <select id="comparar" class="round">
                      <optgroup label="Número ou Texto">
                        <option value="0">Valor A - Existe</option>
                        <option value="1" selected>Igual a</option>
                        <option value="2">Exatamente igual</option>
                      </optgroup>
                      <optgroup label="Número">
                        <option value="3">Menor que</option>
                        <option value="13">Menor ou igual a</option>
                        <option value="4">Maior que</option>
                        <option value="12">Maior ou igual a</option>
                        <option value="19">Valor A - É um número par?</option>
                        <option value="20">Valor A - É um número ímpar?</option>
                        <option value="21">Valor A - É um número?</option>
                      </optgroup>
                      <optgroup label="Texto">
                        <option value="6">Matches Regex</option>
                        <option value="14">Matches Full Regex</option>
                        <option value="7">O comprimento é maior que</option>
                        <option value="8">O comprimento é menor que</option>
                        <option value="9">O comprimento é igual a</option>
                        <option value="10">Começa com</option>
                        <option value="11">Termina com</option>
                        <option value="16">Valor A - Possui acentuações?</option>
                        <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                        <option value="24">Valor A - É um texto?</option>
                        <option value="23">Valor A - É um URL de imagem?</option>
                        <option value="25">Valor A - É um URL?</option>
                        <option value="26">Valor A - O email existe?</option>
                      </optgroup>
                      <optgroup label="Texto ~ Inclui">
                        <option value="5">Inclui exatamente</option>
                        <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="30">Inclui ~ Ignorar acentuações</option>
                        <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
                        <option value="27">Inclui algum URL?</option>
                        <option value="28">Inclui algum convite do Discord?</option>
                        <option value="32">Inclui exatamente a palavra</option>
                        <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
                        <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
                        <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                        <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                      </optgroup>
                      <optgroup label="Outros">
                        <option value="22">Valor A - É uma lista?</option>
                      </optgroup>
                      </select>
                    </td>
                    <td>
                      <span class="dbminputlabel">Valor B</span><br>
                      <input id="val2" class="round" type="text">
                    </td>
                  </tr>
                </table>

        </div>
        <div style="padding: 16px">
                <span class="dbminputlabel">Nome</span>
                <input id="label" class="round" type="text">

                <br>

                <span class="dbminputlabel">Descrição</span>
                <input id="description" class="round" type="text">

                <br>

                <span class="dbminputlabel">Valor</span>
                <input id="value" placeholder="O texto passado para a variável temp..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Emoji</span>
                <input id="emoji" placeholder="Deixe em branco para nenhum..." class="round" type="text">

                <br>

                <span class="dbminputlabel">Padrão selecionado</span><br>
                <select id="default" class="round">
                  <option value="true">Sim</option>
                  <option value="false" selected>Não</option>
                </select>
              </div>
            </dialog-list>
          </div>

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="SELECT" id="actions" height="calc(100vh - 460px)">
            <script class="setupTempVars">
              const elem = document.getElementById("tempVarName");
              if(elem?.value) {
                tempVars.push([elem.value, "Text"]);
              }
            </script>
          </action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Arquivos" icon="file image">
  <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow:auto">

      <dialog-list id="attachments" fields='["tipo", "url", "canvasvar", "canvasnome", "compress", "name", "spoiler","formula","val1","comparar","val2"]' dialogTitle="Informação do Anexo" dialogWidth="550" dialogHeight="560" listLabel="Arquivos" listStyle="height: calc(100vh - 310px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;" onmouseover="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value

            var aselect2 = document.getElementById('formula');
            var avalue2 = aselect2.options[aselect2.selectedIndex].value

            if (avalue2 == 1 || avalue2 == 2) {
              document.getElementById('xinxyla4').style.display = 'block';
            } else
            {
              document.getElementById('xinxyla4').style.display = 'none';
            }
        
          if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }   
    
    if (avalue == 2 || avalue == 3) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    } 

        
        })()">

        <div style="width: 100%; padding:5px 5px;height: calc(100vh - 80px);overflow:auto">

        <div style="padding: 6px; background: rgba(0, 0, 0, 0.3);">
        <span class="dbminputlabel">Condição</span>
        <select id="formula" class="round" onchange="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value;

            var aselect2 = document.getElementById('formula');
            var avalue2 = aselect2.options[aselect2.selectedIndex].value;

            if (avalue2 == 1 || avalue2 == 2) {
              document.getElementById('xinxyla4').style.display = 'block';
            } else
            {
              document.getElementById('xinxyla4').style.display = 'none';
            }
        
            if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }   
    
    if (avalue == 2 || avalue == 3) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }      
        
        })()">
          <option value="0" selected>Sempre enviar o arquivo</option>
          <option value="1">Enviar somente se o comparador for falso</option>
          <option value="2">Enviar somente se o comparador for verdadeiro</option>
        </select>

        <br>

        <div id="xinxyla4">
        <table style="width: 100%;">
          <tr>
            <td style="width:33%">
              <span class="dbminputlabel">Valor A</span>
              <input id="val1" class="round" type="text">
            </td>
            <td style="width:33%;padding:0px 6px 0px 6px">
              <span class="dbminputlabel">Comparador</span><br>
              <select id="comparar" class="round">
                <optgroup label="Número ou Texto">
                  <option value="0">Valor A - Existe</option>
                  <option value="1" selected>Igual a</option>
                  <option value="2">Exatamente igual</option>
                </optgroup>
                <optgroup label="Número">
                  <option value="3">Menor que</option>
                  <option value="13">Menor ou igual a</option>
                  <option value="4">Maior que</option>
                  <option value="12">Maior ou igual a</option>
                  <option value="19">Valor A - É um número par?</option>
                  <option value="20">Valor A - É um número ímpar?</option>
                  <option value="21">Valor A - É um número?</option>
                </optgroup>
                <optgroup label="Texto">
                  <option value="6">Matches Regex</option>
                  <option value="14">Matches Full Regex</option>
                  <option value="7">O comprimento é maior que</option>
                  <option value="8">O comprimento é menor que</option>
                  <option value="9">O comprimento é igual a</option>
                  <option value="10">Começa com</option>
                  <option value="11">Termina com</option>
                  <option value="16">Valor A - Possui acentuações?</option>
                  <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                  <option value="24">Valor A - É um texto?</option>
                  <option value="23">Valor A - É um URL de imagem?</option>
                  <option value="25">Valor A - É um URL?</option>
                  <option value="26">Valor A - O email existe?</option>
                </optgroup>
                <optgroup label="Texto ~ Inclui">
                  <option value="5">Inclui exatamente</option>
                  <option value="29">Inclui ~ Ignorar Minúscula/Maiúscula</option>
                  <option value="30">Inclui ~ Ignorar acentuações</option>
                  <option value="31">Inclui ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                  <option value="17">Inclui exatamente ["a" , "b" , "c"]</option>
                  <option value="27">Inclui algum URL?</option>
                  <option value="28">Inclui algum convite do Discord?</option>
                  <option value="32">Inclui exatamente a palavra</option>
                  <option value="33">Inclui a palavra ~ Ignorar Minúscula/Maiúscula</option>
                  <option value="34">Inclui a palavra ~ Ignorar acentuações</option>
                  <option value="35">Inclui a palavra ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                  <option value="36">Inclui as palavras ~ use virgulas ~ Ignorar acentuações & Minúscula e Maiúscula</option>
                </optgroup>
                <optgroup label="Outros">
                  <option value="22">Valor A - É uma lista?</option>
                </optgroup>
              </select>
            </td>
            <td style="width:33%">
              <span class="dbminputlabel">Valor B</span><br>
              <input id="val2" class="round" type="text">
            </td>
          </tr>
        </table><br>
</div>
  
      </div>

      

        <span class="dbminputlabel">Tipo de Anexo</span>
        <select id="tipo" class="round" onchange="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value

            var aselect2 = document.getElementById('formula');
            var avalue2 = aselect2.options[aselect2.selectedIndex].value

            if (avalue2 == 1 || avalue2 == 2) {
              document.getElementById('xinxyla4').style.display = 'block';
            } else
            {
              document.getElementById('xinxyla4').style.display = 'none';
            }
        
            if (avalue == 0) {
              document.getElementById('xinxyla1').style.display = 'none';
              document.getElementById('xinxyla2').style.display = 'block';
              document.getElementById('xinxyla3').style.display = 'block';
        }
        if (avalue == 1) {
          document.getElementById('xinxyla2').style.display = 'none';
          document.getElementById('xinxyla1').style.display = 'block';
          document.getElementById('xinxyla3').style.display = 'block';
    }   
    
    if (avalue == 2 || avalue == 3) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }      
        
        })()">
          <option value="0">Anexo Local/Web URL</option>
          <option value="1">Canvas</option>
          <option value="2">DBM Imagens</option>
          <option value="3">Enviar Variavel</option>
        </select>
        <br><div id="xinxyla2">
          <span class="dbminputlabel">Anexo Local/Web URL</span>
          <input id="url" class="round" type="text" value="resources/">

          <br></div>
          <div id="xinxyla1">
          <span class="dbminputlabel">Tipo de Variavel</span><br>
    <select id="canvasvar" class="round">
      ${data.variables[1]}
    </select>
<br>
          <span class="dbminputlabel">Nome da Variavel</span>
          <input id="canvasnome" class="round" type="text" list="variableList">
<br>
<div id="xinxyla3">
          <span class="dbminputlabel">Nível de Compressão</span><br>
          <select id="compress" class="round">
            <option value="0">1</option>
            <option value="1">2</option>
            <option value="2">3</option>
            <option value="3">4</option>
            <option value="4">5</option>
            <option value="5">6</option>
            <option value="6">7</option>
            <option value="7">8</option>
            <option value="8">9</option>
            <option value="9" selected>10</option>
          </select>
          <br></div></div>

          <span class="dbminputlabel">Nome do Anexo</span>
          <input id="name" class="round" type="text" placeholder="Deixe em branco para o padrão...">

          <br>

          <div style="text-align: center; padding-top: 4px;">
            <dbm-checkbox id="spoiler" label="Fazer spoiler do anexo"></dbm-checkbox>
          </div>
          <br>
        </div>
        </div>
      </dialog-list>
    </div>
  </tab>


  <tab label="Config" icon="cogs">
    <div style="width: 100%; padding:8px;height: calc(100vh - 250px);overflow-y: scroll;overflow-x: hidden;">
    <div style="padding-bottom: 12px;padding-top: 12px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:55px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

    <div id="xincheck">
    <div style="padding:10px">
      <dbm-checkbox id="di" label="Desvincular da Start Thinking"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="reply" label="Responda à interação se possível" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="ephemeral" label="Tornar a resposta privada"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="tts" label="Texto-Para-Fala"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="overwrite" label="Substituir alterações"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="dontSend" label="Não envie a mensagem"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeComps" label="Remover ou não enviar botões/menus"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeEmbeds" label="Remover ou não enviar embeds"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeAttachments" label="Remover ou não enviar anexos"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeCompsE" label="Remover botões/menus somente ao editar a mensagem"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeEmbedsE" label="Remover embeds somente ao editar a mensagem"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="removeAttachmentsE" label="Remover anexos somente ao editar a mensagem"></dbm-checkbox>
   
      </div><br></div>
      
      <div style="width:96%;display:block">
      <div style="padding-bottom: 12px;" id="xin1">
        <retrieve-from-variable allowNone dropdownLabel="Editar mensagem" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Atualizar interação</option>
        </retrieve-from-variable>
      

      <br><br></div>

   
      <div style="padding-top: 12px">
        <store-in-variable allowNone dropdownLabel="Armazenar em" selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br><br>

      <div>
      <div style="float: left; width: 35%; padding-top: 5px">
      <span class="dbminputlabel">Enviar como Webhook</span><br>
      <select id="storagewebhook" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selecionado>Não</option>
      <option value="4">URL do Webhook</option>
      <option value="1">Variavel Temporária</option>
      <option value="2">Variavel Servidor</option>
      <option value="3">Variavel Global</option>
    </select>
    </div>
    <div id="webhookdiv" style="display: none; float: right; width: 60%; padding-top: 5px"><span id="ifName" class="dbminputlabel">Nome da Variavel</span><br><input list="variableList" id="varwebhook" class="round" name="actionxinxyla" type="text"></div>
    <div id="webhookdiv2" style="display: none;padding-top: 12px;">
    <br><br><br>
    <span class="dbminputlabel">Editar uma webhook / ID da Mensagem</span><br>
    <input id="editweb" class="round" type="text" style="width:100%" placeholder="Deixe em branco para só enviar">
    <span style="margin-bottom:-50px;"></span>
    <br>
    <span class="dbminputlabel">Nome do Webhook</span><br>
    <input id="webhookname" class="round" type="text" style="width:100%" placeholder="Opcional">
    <br>
    <span class="dbminputlabel">URL de imagem do avatar Webhook</span><br>
    <input id="webhookavatar" class="round" type="text" style="width:100%" placeholder="Opcional">
    </div>    


      <br><div id="corrigir"><br><br></div>
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
      <div>

    <div id="divValueError" style="margin-top: 5px;">
      <div style="float: left; width: 35%;">
        <span class="dbminputlabel">Armazenar erro em</span>
        <select id="storageError" class="round" onchange="glob.variableChangeError(this, 'varNameContainer')">
          ${data.variables[0]}
        </select>
      </div>
    
      <div id="varNameContainerError" style="float: right; display: none; width: 60%;">
        <span class="dbminputlabel">Nome da Variável</span>
        <input id="varNameError" class="round" type="text">
      </div>
    </div>

      </div>

      <br><br><br>

   
    <div id="divValueError2" style="float: left; width: 35%">
      <span class="dbminputlabel">Se ocorrer um erro</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0">Continuar ações</option>
        <option value="1" selecionado>Parar sequência de ação</option>
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

    <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 430px)"></action-list-input>
              
    <br>

    </div>
  </tab>
</tab-system></div>

<style>
xinspace{padding:5px 0px 0px 0px;display:block}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
</style>`;
  },

  init: function () {
    const { glob, document } = this;

    const textarea = document.getElementById('message');
    const contador = document.getElementById('contador');
    const comprimentoTexto = textarea.value.length;
    contador.textContent = `${comprimentoTexto} caracteres`;
    textarea.addEventListener('input', () => {
      const comprimentoTexto = textarea.value.length;
      contador.textContent = `${comprimentoTexto} caracteres`;
    });


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

      if (event.value > "4") {
        document.getElementById("divValueError").style.marginTop = "0px";
      } else {
        document.getElementById("divValueError").style.marginTop = "10px";
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

    glob.variableChangeError = function (event) {
      if (event.value == "0") {
        document.getElementById("varNameContainerError").style.display = "none";
      } else {
        document.getElementById("varNameContainerError").style.display = null;
      }
    }

    glob.onComparisonChanged2 = function (event) {
      if (event.value > "0") {
        document.getElementById("webhookdiv").style.display = null;
        document.getElementById("webhookdiv2").style.display = null;
        document.getElementById("xincheck").style.display = "none";
        document.getElementById("xin1").style.display = "none";
        document.getElementById("xin2").style.display = "none";
        document.getElementById("xin3").style.display = "block";
        const myInput = document.querySelector("#reply")
        myInput.value = false
        const myInput2 = document.querySelector("#dontSend")
        myInput2.value = false
        const myInput3 = document.querySelector("#ephemeral")
        myInput3.value = false
        const myInput4 = document.querySelector("#tts")
        myInput4.value = false
        const myInput5 = document.querySelector("#overwrite")
        myInput5.value = false
        const myInput6 = document.querySelector("#editMessage")
        myInput6.value = 0
        const myInput7 = document.querySelector("#channel")
        myInput7.value = 0
        document.getElementById("corrigir").style.display = "none";

        if (event.value == "4") {
          const myvarwebhook = document.querySelector("#varwebhook")
          myvarwebhook.setAttribute('list', 'none')
          document.querySelector("[id='ifName']").innerText = "URL";
        } else {
          const myvarwebhook = document.querySelector("#varwebhook")
          myvarwebhook.setAttribute('list', 'variableList')
          document.querySelector("[id='ifName']").innerText = "Nome da Variavel";
        }

      } else {
        document.getElementById("webhookdiv").style.display = "none";
        document.getElementById("webhookdiv2").style.display = "none";
        document.getElementById("xincheck").style.display = null;
        document.getElementById("xin1").style.display = null;
        document.getElementById("xin2").style.display = "block";
        document.getElementById("xin3").style.display = "none";
        document.getElementById("corrigir").style.display = "block";
      }
    }

    glob.onComparisonChanged2(document.getElementById("storagewebhook"));
    glob.onComparisonChanged(document.getElementById("iffalse"));

    glob.variableChangeError(document.getElementById("storageError"));

    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block;width: calc(100% - 5px); padding-left: 8px;">';
      const comp = data.tipo;
      switch (comp) {
        case "0":
          result += "Anexo: " + data.url;
          break;
        case "1":
          result += "Canvas: " + data.canvasnome;
          break;
        case "2":
          result += "DBM Imagens: " + data.canvasnome;
          break;
        case "3":
          result += "Enviar variavel: " + data.canvasnome;
          break;
      }
      result += (data.formula == 1 || data.formula == 2 ? '<div style="float:right" title="Condição ligada">🔘 </div>' : '') + "</div>";
      return result;
    }

    glob.formatItem2 = function (data) {
      let setcor = ""
      if (data.type == "PRIMARY") { setcor = "rgb(88,101,242)" }
      if (data.type == "SECONDARY" || data.type == "LINK") { setcor = "rgb(78,80,88)" }
      if (data.type == "SUCCESS") { setcor = "rgb(36,128,70)" }
      if (data.type == "DANGER") { setcor = "rgb(218,55,60)" }
      let result = '<div style="display: inline-block; width: 100%;"><div style="width:10px;background:' + setcor + ';float:left;margin-left:-10px"><br></div><table style="margin-left:10px"><tr><td style="width:100%">';
      const comp = "0";
      switch (comp) {
        case "0":
          result += data.emoji + ' ' + data.name;
          break;
      }
      result += "</td><td style='width:120px;text-align:right;padding:0px 10px 0px 0px'>" + data.id + (data.formula == 1 || data.formula == 2 ? '<span title="Condição ligada"> 🔘 </span>' : '') + "</td></tr></table></div>";
      return result;
    }

    glob.formatItem3 = function (data) {
      let result = '<div style="display: inline-block; width: 100%; padding-left: 8px"><div style="float:left;width: calc(100% - 200px);overflow: hidden;">Nome: ';
      const comp = "0";
      switch (comp) {
        case "0":
          result += data.placeholder;
          break;
      }
      result += "<br>Variavel: " + data.tempVarName + "</div><div style='float:right;width:190px;text-align:right;padding:0px 10px 0px 0px'>" + data.id + "<br>Opções: " + data.options.length + " / 25</div></div>";
      return result;
    }

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

  },

  onSave(data, helpers) {

    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if (!data.buttons[i].id) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        if (!data.selectMenus[i].id) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },

  onPaste(data, helpers) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const id = data.buttons[i].id;
        if (!id || id.startsWith("msg-button-")) {
          data.buttons[i].id = "msg-button-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const id = data.selectMenus[i].id;
        if (!id || id.startsWith("msg-select-")) {
          data.selectMenus[i].id = "msg-select-" + helpers.generateUUID().substring(0, 7);
        }
      }
    }
    return data;
  },


  async action(cache) {
    const _this = this;
    const data = cache.actions[cache.index];
    var messageoff = data.messageoff;
    if (messageoff == undefined) messageoff = true;
    const channel = parseInt(data.channel, 10);
    const message = this.evalMessage(data.message, cache);
    const storagewebhook = parseInt(data.storagewebhook)
    const webhookname = this.evalMessage(data.webhookname, cache)
    const webhookavatar = this.evalMessage(data.webhookavatar, cache)
    if (storagewebhook > 0) {
      varwebhook = this.evalMessage(data.varwebhook, cache)

      if (storagewebhook == 4) {
        const { DiscordJS } = this.getDBM();
        webhook = new DiscordJS.WebhookClient({ url: varwebhook });
      } else {
        Mods = this.getMods()
        webhook = Mods.getWebhook(storagewebhook, varwebhook, cache)
      }

    }
    if (data.channel === undefined || message === undefined) {
      return;
    }

    let target = await this.getSendReplyTarget(channel, this.evalMessage(data.varName, cache), cache);

    let messageOptions = {};

    const overwrite = data.overwrite;

    let isEdit = 0;
    if (data.editMessage === "intUpdate") {
      if (cache.interaction?.replied && cache.interaction?.editReply) {
        isEdit = 2;
      } else if (cache?.interaction?.update) {
        isEdit = 2;
      }
    } else {
      const editMessage = parseInt(data.editMessage, 10);
      if (typeof editMessage === "number" && editMessage >= 0) {
        const editVarName = this.evalMessage(data.editMessageVarName, cache);
        const editObject = this.getVariable(editMessage, editVarName, cache);
        const { Message } = this.getDBM().DiscordJS;
        if (editObject) {
          if (editObject instanceof Message) {
            target = editObject;
            isEdit = 1;
          } else {
            messageOptions = editObject;
          }
        }
      }
    }

    let content;
    if (messageoff == true) content = message.length > 0 ? message : null;

    if (content) {
      if (messageOptions.content && !overwrite) {
        messageOptions.content += content;
      } else {
        messageOptions.content = content;
      }
    }

    if (data.embeds?.length > 0) {
      const { MessageEmbed } = this.getDBM().DiscordJS;

      if (!Array.isArray(messageOptions.embeds) || overwrite) {
        messageOptions.embeds = [];
      }

      const embedDatas = data.embeds;
      for (let i = 0; i < embedDatas.length; i++) {
        const embedData = embedDatas[i];

        if (embedData.formula == "1" || embedData.formula == "2") {
          const comparar = parseInt(embedData.comparar, 10);
          val1 = this.evalMessage(embedData.val1, cache);
          val2 = this.evalMessage(embedData.val2, cache);

          switch (comparar) {
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
              result = Boolean(val1.toString().match(new RegExp(val2)));
              break;
            case 16:
              const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
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
              const isImageUrl = require("is-image-url");
              result = isImageUrl(val1);
              break;
            case 24:
              result = typeof val1 === "string";
              break;
            case 25:
              const isUrl = require("is-url");
              result = isUrl(val1);
              break;
            case 26:
              const mail = require("email-existence");
              mail.check(val1, (error, response) => {
                result = response;
              });
              break;
            case 27:
              let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              result = val1.match(pattern);
              break;
            case 28:
              invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
              result = invite.test(val1);
              break;
            case 29:
              result = val1.toLowerCase().includes(val2.toLowerCase());
              break;
            case 30:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.includes(tratar);
              break;
            case 31:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.toLowerCase().includes(tratar);
              break;
            case 32:
              var words = val1.split(" ");
              result = words.includes(val2);
              break;
            case 33:
              var words = val1.toLowerCase().split(" ");
              result = words.includes(val2.toLowerCase());
              break;
            case 34:
              var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 35:
              var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 36:
              var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
              result = separador.some(els => valor2.includes(els));
              break;
          }

          if (embedData.formula == "1" && Boolean(result) != false) continue;
          if (embedData.formula == "2" && Boolean(result) != true) continue;
        }

        const embed = new MessageEmbed();
        if (embedData.title) embed.setTitle(this.evalMessage(embedData.title, cache));
        if (this.evalMessage(embedData.url, cache)) embed.setURL(this.evalMessage(embedData.url, cache));
        if (embedData.colorrandom == true) {
          embed.setColor("RANDOM");
        }
        if (embedData.color) {
          if (embedData.colorrandom == true) {
            embed.setColor("RANDOM");
          } else {
            embed.setColor(this.evalMessage(embedData.color, cache));
          }
        }

        if (embedData.timestamp == "true" || embedData.timestamp == true) {
          if (embedData.timestampper == "" || embedData.timestampper == undefined) {
            embed.setTimestamp()
          } else {
            embed.setTimestamp(parseFloat(this.evalMessage(embedData.timestampper, cache)))
          }
        }

        var imgURL = this.evalMessage(embedData.imageUrl, cache);

        if (imgURL) {
          if (imgURL.toString().startsWith("http")) {
            embed.setImage(imgURL);
          } else {
            embed.setImage("attachment://" + imgURL);
          }
        }

        var thumb = this.evalMessage(embedData.thumbUrl, cache);

        if (thumb) {
          if (thumb.toString().startsWith("http")) {
            embed.setThumbnail(thumb);
          } else {
            embed.setThumbnail("attachment://" + thumb);
          }
        }

        if (embedData.description) embed.setDescription(this.evalMessage(embedData.description || "\u200B", cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];

            val1 = this.evalMessage(f.val1, cache);
            val2 = this.evalMessage(f.val2, cache);
            result = true;

            if (f.formula == "1" || f.formula == "2") {
              const compare = parseInt(f.comparar, 10);
              if (compare !== 6) {
                val1 = this.evalIfPossible(val1, cache)
                val2 = this.evalIfPossible(val2, cache)
              }
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
                  result = Boolean(val1.toString().match(new RegExp(val2)));
                  break;
                case 16:
                  const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
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
                  const isImageUrl = require("is-image-url");
                  result = isImageUrl(val1);
                  break;
                case 24:
                  result = typeof val1 === "string";
                  break;
                case 25:
                  const isUrl = require("is-url");
                  result = isUrl(val1);
                  break;
                case 26:
                  const mail = require("email-existence");
                  mail.check(val1, (error, response) => {
                    result = response;
                  });
                  break;
                case 27:
                  let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                  result = val1.match(pattern);
                  break;
                case 28:
                  invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
                  result = invite.test(val1);
                  break;
                case 29:
                  result = val1.toLowerCase().includes(val2.toLowerCase());
                  break;
                case 30:
                  tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  result = tratarval1.includes(tratar);
                  break;
                case 31:
                  tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                  result = tratarval1.toLowerCase().includes(tratar);
                  break;
                case 32:
                  var words = val1.split(" ");
                  result = words.includes(val2);
                  break;
                case 33:
                  var words = val1.toLowerCase().split(" ");
                  result = words.includes(val2.toLowerCase());
                  break;
                case 34:
                  var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                  break;
                case 35:
                  var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                  break;
                case 36:
                  var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                  var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
                  result = separador.some(els => valor2.includes(els));
                  break;
              }
            }

            if (f.formula == "1") {
              if (result == false) {
                result = true
              } else { result = false }
            }

            if (result == true) {
              embed.addFields({ name: this.evalMessage(f.name || '\u200B', cache), value: this.evalMessage(f.value || '\u200B', cache), inline: f.inline === "true" })
            };
          }
        }

        var authorIcon = this.evalMessage(embedData.authorIcon, cache) || null;
        var authorURL = this.evalMessage(embedData.authorUrl, cache) || null;

        if (!authorIcon?.toString().startsWith("http")) {
          authorIcon = "attachment://" + authorIcon;
        }

        if (embedData.author) {
          embed.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: authorIcon,
            url: authorURL,
          });
        }

        var iconURL = this.evalMessage(embedData.footerIconUrl, cache) || null;

        if (!iconURL?.toString().startsWith("http")) {
          iconURL = "attachment://" + iconURL;
        }

        if (embedData.footerText) {
          embed.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: iconURL,
          });
        }

        messageOptions.embeds.push(embed);
      }
    }

    if (data.mentions == false) {
      messageOptions.allowedMentions = {};
      messageOptions.allowedMentions.repliedUser = [];
      messageOptions.allowedMentions.repliedUser = data.mentions;
    }

    let componentsArr = [];
    let awaitResponses = [];

    if (!overwrite && messageOptions.components?.length > 0) {
      componentsArr = messageOptions.components.map((comps) => {
        return comps.components;
      });
    }

    const defaultTime = 60000;

    if (Array.isArray(data.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {

        const botoesconfig = data.buttons;
        const fbot = botoesconfig[i];

        val1 = this.evalMessage(fbot.val1, cache);
        val2 = this.evalMessage(fbot.val2, cache);
        result = true;

        if (fbot.formula == "1" || fbot.formula == "2" || fbot.formula == "3" || fbot.formula == "4") {
          const compare = parseInt(fbot.comparar, 10);
          if (compare !== 6) {
            val1 = this.evalIfPossible(val1, cache)
            val2 = this.evalIfPossible(val2, cache)
          }
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
              result = Boolean(val1.toString().match(new RegExp(val2)));
              break;
            case 16:
              const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
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
              const isImageUrl = require("is-image-url");
              result = isImageUrl(val1);
              break;
            case 24:
              result = typeof val1 === "string";
              break;
            case 25:
              const isUrl = require("is-url");
              result = isUrl(val1);
              break;
            case 26:
              const mail = require("email-existence");
              mail.check(val1, (error, response) => {
                result = response;
              });
              break;
            case 27:
              let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              result = val1.match(pattern);
              break;
            case 28:
              invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
              result = invite.test(val1);
              break;
            case 29:
              result = val1.toLowerCase().includes(val2.toLowerCase());
              break;
            case 30:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.includes(tratar);
              break;
            case 31:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.toLowerCase().includes(tratar);
              break;
            case 32:
              var words = val1.split(" ");
              result = words.includes(val2);
              break;
            case 33:
              var words = val1.toLowerCase().split(" ");
              result = words.includes(val2.toLowerCase());
              break;
            case 34:
              var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 35:
              var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 36:
              var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
              result = separador.some(els => valor2.includes(els));
              break;
          }
        }

        if (fbot.formula == "1") {
          if (result == false) {
            result = true;
          } else {
            result = false;
          }
        }


        if (result == true || fbot.formula == "3" || fbot.formula == "4" || fbot.formula == "5") {

          if (!data.buttons[i].name) data.buttons[i].name = "\u200b";


          data.buttons[i].disabled = false;

          if (fbot.formula == "3") {

            if (result == false) {
              result = true;
            } else {
              result = false;
            }

            if (result == true) {
              data.buttons[i].disabled = true;
            } else {
              data.buttons[i].disabled = false;
            }

          }
          if (fbot.formula == "4") {


            if (result == true) {
              data.buttons[i].disabled = true;
            } else {
              data.buttons[i].disabled = false;
            }

          }

          if (fbot.formula == "5") {

            data.buttons[i].disabled = true;

          }

          const button = data.buttons[i];
          if (button.typeper == "" || button.typeper == undefined) {
            button.type = this.evalMessage(button.type, cache);
          } else {
            check = this.evalMessage(button.typeper, cache);
            if (check == "PRIMARY" || check == "SECONDARY" || check == "SUCCESS" || check == "DANGER" || check == "LINK") {
              button.type = this.evalMessage(button.typeper, cache);
            }
          }
          const buttonData = this.generateButton(button, cache);
          buttonData.disabled = button.disabled;

          this.addButtonToActionRowArray(componentsArr, this.evalMessage(button.row, cache), buttonData, cache);

          if (button.mode !== "PERSISTENT") {
            awaitResponses.push({
              type: "BUTTON",
              time: button.time ? parseInt(this.evalMessage(button.time, cache)) || defaultTime : defaultTime,
              id: this.evalMessage(button.id, cache),
              user: button.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
              multi: button.mode.startsWith("MULTI"),
              data: button,
            });
          }

        }

      }


    }

    if (Array.isArray(data.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        select = data.selectMenus[i];

        totales = data.selectMenus[i].options.length;

        if (select?.disabled) {
          select.disabled = true;
        } else {
          select.disabled = false;
        }

        for (let ix = 0; ix < totales; ix++) {
          val1 = this.evalMessage(data.selectMenus[i].options[ix].val1, cache);
          val2 = this.evalMessage(data.selectMenus[i].options[ix].val2, cache);

          select.options[ix].emoji = this.evalMessage(select.options[ix].emoji, cache);

          result = true;

          if (data.selectMenus[i].options[ix].formula == "Falso" || data.selectMenus[i].options[ix].formula == "Verdadeiro") {
            compare = parseInt(data.selectMenus[i].options[ix].comparar, 10);
            if (compare !== 6) {
              val1 = this.evalIfPossible(val1, cache);
              val2 = this.evalIfPossible(val2, cache);
            }

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
                result = Boolean(val1.toString().match(new RegExp(val2)));
                break;
              case 16:
                const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
                result = conditions.some(el => val1.includes(el));
                break;
              case 17:
                const conditionsX = val2;
                result = conditionsX.some(els => val1.includes(els));
                break;
              case 18:
                const conditionsZ = val2;
                result = conditionsZ.some(elz => val1 == (elz));
                break;
              case 19:
                result = val1 % 2 == 0;
                break;
              case 20:
                result = val1 % 2 == 1;
                break;
              case 21:
                result = Boolean(!isNaN(parseFloat(val1.toString().replace(",", "."))));
                break;
              case 22:
                result = Boolean(Array.isArray(val1));
                break;
              case 23:
                const isImageUrl = require("is-image-url");
                result = isImageUrl(val1);
                break;
              case 24:
                result = typeof val1 === "string";
                break;
              case 25:
                const isUrl = require("is-url");
                result = isUrl(val1);
                break;
              case 26:
                const mail = require("email-existence");
                mail.check(val1, (error, response) => {
                  result = response;
                });
                break;
              case 27:
                let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                result = val1.match(pattern);
                break;
              case 28:
                invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
                result = invite.test(val1);
                break;
              case 29:
                result = val1.toLowerCase().includes(val2.toLowerCase());
                break;
              case 30:
                tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                result = tratarval1.includes(tratar);
                break;
              case 31:
                tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                result = tratarval1.toLowerCase().includes(tratar);
                break;
              case 32:
                var words = val1.split(" ");
                result = words.includes(val2);
                break;
              case 33:
                var words = val1.toLowerCase().split(" ");
                result = words.includes(val2.toLowerCase());
                break;
              case 34:
                var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                break;
              case 35:
                var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
                break;
              case 36:
                var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
                var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
                result = separador.some(els => valor2.includes(els));
                break;
            }
          }

          if (data.selectMenus[i].options[ix].formula == "Falso") {
            if (result == false) {
              result = true;
            } else {
              result = false;
            }
          }

          if (result == false) {
            data.selectMenus[i].options.splice([ix], 1);
            ix = parseFloat([ix]) - 1;
            totales = totales - 1;
          }

        }

        selectData = this.generateSelectMenu(select, cache);
        selectData.disabled = select.disabled;

        this.addSelectToActionRowArray(componentsArr, this.evalMessage(select.row, cache), selectData, cache);

        if (select.mode !== "PERSISTENT") {
          awaitResponses.push({
            type: "SELECT",
            time: select.time ? parseInt(this.evalMessage(select.time, cache)) || defaultTime : defaultTime,
            id: this.evalMessage(select.id, cache),
            user: select.mode.endsWith("PERSONAL") ? cache.getUser()?.id : null,
            multi: select.mode.startsWith("MULTI"),
            data: select,
          });
        }
      }
    }

    if (messageOptions._awaitResponses?.length > 0) {
      if (overwrite && awaitResponses.length > 0) {
        messageOptions._awaitResponses = [];
      } else {
        awaitResponses = messageOptions._awaitResponses.concat(awaitResponses);
      }
    }

    if (componentsArr.length > 0) {
      newComponents = componentsArr
        .filter((comps) => comps.length > 0)
        .map(function (comps) {
          return {
            type: "ACTION_ROW",
            components: comps,
          };
        });

      messageOptions.components = newComponents;
    }

    if (storagewebhook > 0) {
      if (webhookname !== "") {
        messageOptions.username = webhookname;
      }
      if (webhookavatar !== "") {
        messageOptions.avatarURL = await webhookavatar;
      }
    }

    if (data.tts) {
      messageOptions.tts = true;
    }

    if (data.attachments?.length > 0) {
      const { Util, MessageAttachment } = this.getDBM().DiscordJS;
      if (!Array.isArray(messageOptions.files) || overwrite) {
        messageOptions.files = [];
      }
      for (let i = 0; i < data.attachments.length; i++) {

        let liberolum = true

        if (data.attachments[i].formula == "1" || data.attachments[i].formula == "2") {
          const comparar = parseInt(data.attachments[i].comparar, 10);
          val1 = this.evalMessage(data.attachments[i].val1, cache);
          val2 = this.evalMessage(data.attachments[i].val2, cache);

          switch (comparar) {
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
              result = Boolean(val1.toString().match(new RegExp(val2)));
              break;
            case 16:
              const conditions = ["Ä", "Å", "Á", "Â", "À", "Ã", "Ā", "Ă", "Ą", "ā", "ă", "ą", "ä", "á", "â", "à", "ã", "É", "Ê", "Ë", "È", "Ė", "Ę", "Ě", "Ĕ", "Ē", "ė", "ę", "ě", "ĕ", "ē", "é", "ê", "ë", "è", "Í", "Î", "Ï", "Ì", "İ", "Į", "Ī", "ı", "į", "ī", "í", "î", "ï", "ì", "Ö", "Ó", "Ô", "Ò", "Õ", "Ő", "Ō", "ő", "ō", "ö", "ó", "ô", "ò", "õ", "Ü", "Ú", "Û", "Ų", "Ű", "Ů", "Ū", "ų", "ű", "ů", "ū", "ü", "ú", "û", "ù", "Ç", "Ć", "Č", "ç", "ć", "č", "Ñ", "Ň", "Ņ", "Ń", "ñ", "ň", "ņ", "ń", "Ÿ", "Ý", "ý", "Ź", "Ż", "Ž", "ź", "ż", "ž", "Ł", "Ľ", "Ļ", "Ĺ", "ł", "ľ", "ĺ", "Ķ", "ķ", "Ģ", "Ğ", "ģ", "ğ", "Ď", "ď", "Ś", "Š", "Ş", "ś", "š", "ş", "Ť", "Ț", "Ţ", "ť", "ț", "ţ", "Ŕ", "Ř", "ŕ", "ř"]
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
              const isImageUrlx = require("is-image-url");
              result = isImageUrlx(val1);
              break;
            case 24:
              result = typeof val1 === "string";
              break;
            case 25:
              const isUrl = require("is-url");
              result = isUrl(val1);
              break;
            case 26:
              const mailx = require("email-existence");
              mailx.check(val1, (error, response) => {
                result = response;
              });
              break;
            case 27:
              let pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
              result = val1.match(pattern);
              break;
            case 28:
              invite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/g);
              result = invite.test(val1);
              break;
            case 29:
              result = val1.toLowerCase().includes(val2.toLowerCase());
              break;
            case 30:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.includes(tratar);
              break;
            case 31:
              tratarval1 = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              tratar = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
              result = tratarval1.toLowerCase().includes(tratar);
              break;
            case 32:
              var words = val1.split(" ");
              result = words.includes(val2);
              break;
            case 33:
              var words = val1.toLowerCase().split(" ");
              result = words.includes(val2.toLowerCase());
              break;
            case 34:
              var words = val1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 35:
              var words = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              result = words.includes(val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
              break;
            case 36:
              var separador = val1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(" ");
              var valor2 = val2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(",");
              result = separador.some(els => valor2.includes(els));
              break;
          }

          liberolum = result

          if (data.attachments.formula == "1") {
            if (liberolum == false) {
              liberolum = true
            } else { liberolum = false }
          }


        }



        if (liberolum == true) {

          if (data.attachments[i].tipo == "1") {
            const { DiscordJS } = this.getDBM();
            const Canvas = require("canvas")
            const attachment = data.attachments[i];
            const varnamer = this.evalMessage(attachment?.canvasnome, cache);
            const varid = this.evalMessage(attachment?.canvasvar, cache);
            const imagedata = this.getVariable(varid, varnamer, cache)
            if (imagedata) {
              const image = new Canvas.Image()
              image.src = imagedata
              const canvas = Canvas.createCanvas(image.width, image.height)
              const ctx = canvas.getContext("2d")
              ctx.drawImage(image, 0, 0, image.width, image.height)
              const buffer = canvas.toBuffer('image/png', { compressionLevel: data.attachments[i].compress })
              const spoiler = !!attachment?.spoiler;
              const name = this.evalMessage(attachment?.name, cache) || (spoiler ? Util.basename("image.png") : undefined);
              const msgAttachment = new MessageAttachment(buffer, name);
              if (spoiler) {
                msgAttachment.setSpoiler(true);
              }
              messageOptions.files.push(msgAttachment);
            }

          }
          if (data.attachments[i].tipo == "2") {
            const { Images } = this.getDBM();
            const attachment = data.attachments[i];
            const varnamer = this.evalMessage(attachment?.canvasnome, cache);
            const varid = this.evalMessage(attachment?.canvasvar, cache);
            const imagedata = this.getVariable(varid, varnamer, cache)
            const spoiler = !!attachment?.spoiler;
            const name = this.evalMessage(attachment?.name, cache) || (spoiler ? Util.basename("image.png") : undefined);
            const buffer = await Images.createBuffer(imagedata)
            const msgAttachment = new MessageAttachment(buffer, name);
            if (spoiler) {
              msgAttachment.setSpoiler(true);
            }
            messageOptions.files.push(msgAttachment);

          }
          if (data.attachments[i].tipo == "0" || data.attachments[i].tipo == undefined) {
            const attachment = data.attachments[i];
            const url = this.evalMessage(attachment?.url, cache);
            if (url) {
              const spoiler = !!attachment?.spoiler;
              const name = this.evalMessage(attachment?.name, cache) || (spoiler ? Util.basename(url) : undefined);
              const msgAttachment = new MessageAttachment(url, name);
              if (spoiler) {
                msgAttachment.setSpoiler(true);
              }
              messageOptions.files.push(msgAttachment);
            }
          }
          if (data.attachments[i].tipo == "3") {
            const attachment = data.attachments[i];
            const varnamer = this.evalMessage(attachment?.canvasnome, cache);
            const varid = this.evalMessage(attachment?.canvasvar, cache);
            const conteudodata = this.getVariable(varid, varnamer, cache)
            const spoiler = !!attachment?.spoiler;
            var name = this.evalMessage(attachment?.name, cache)
            if (name == "") { name = "texto.txt" }
            const buffer = Buffer.from(conteudodata)
            const msgAttachment = new MessageAttachment(buffer, name);
            if (spoiler) {
              msgAttachment.setSpoiler(true);
            }
            messageOptions.files.push(msgAttachment);
          }


        }


      }
    }

    let defaultResultMsg = null;
    const onComplete = (resultMsg) => {
      if (defaultResultMsg) {
        resultMsg ??= defaultResultMsg;
      }

      if (resultMsg) {
        const varName2 = this.evalMessage(data.varName2, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(resultMsg, storage, varName2, cache);
        this.callNextAction(cache);

        for (let i = 0; i < awaitResponses.length; i++) {
          const response = awaitResponses[i];
          const originalInteraction = cache.interaction?.__originalInteraction ?? cache.interaction;
          const tempVariables = cache.temp || {};
          this.registerTemporaryInteraction(resultMsg.id, response.time, response.id, response.user, response.multi, (interaction) => {
            if (response.data) {
              interaction.__originalInteraction = originalInteraction;
              if (response.type === "BUTTON") {
                this.preformActionsFromInteraction(interaction, response.data, cache.meta, tempVariables);
              } else {
                this.preformActionsFromSelectInteraction(interaction, response.data, cache.meta, tempVariables);
              }
            }
          });
        }
      } else {
        this.callNextAction(cache);
      }
    };

    if(data.di == true){
    isMessageTarget = target
    } else {
    isMessageTarget = target instanceof this.getDBM().DiscordJS.Message;
    }

    const sameId = target?.id?.length > 0 && (target?.id ?? "") === cache?.interaction?.channel?.id;
    const sameChannel = channel === 0 || sameId;
    const canReply = !isMessageTarget && cache?.interaction?.replied === false && sameChannel;

    if (data.removeComps == true) messageOptions.components = [];
    if (data.removeEmbeds == true) messageOptions.embeds = [];
    if (data.removeAttachments == true) messageOptions.files = [];

    if (data.removeCompsE == true && isEdit !== 0) messageOptions.components = [];
    if (data.removeEmbedsE == true && isEdit !== 0) messageOptions.embeds = [];
    if (data.removeAttachmentsE == true && isEdit !== 0) messageOptions.files = [];

    if (data.dontSend) {
      const varName2 = this.evalMessage(data.varName2, cache);
      const storage = parseInt(data.storage, 10);
      messageOptions._awaitResponses = awaitResponses;
      this.storeValue(messageOptions, storage, varName2, cache);
      this.callNextAction(cache);
    }

    else if (Array.isArray(target)) {
      this.callListFunc(target, "send", [messageOptions]).then(onComplete);
    }

    else if (isEdit === 2) {
      let promise = null;

      defaultResultMsg = cache.interaction?.message;

      if (cache.interaction?.replied && cache.interaction?.editReply) {
        promise = cache.interaction.editReply(messageOptions);
      } else if (cache?.interaction?.update) {
        promise = cache.interaction.update(messageOptions);
      } else {
        this.displayError(data, cache, "Mensagem/Config para editar -> Atualização de interação / Não foi possível encontrar a interação para editar");
      }

      if (promise) {
        promise
          .then(onComplete)
          .catch((err) => erro(err));
      }
    }

    else if (isEdit === 1 && target?.edit) {
      target
        .edit(messageOptions)
        .then(onComplete)
        .catch((err) => erro(err));
    }

    else if (isMessageTarget && target?.reply) {
      target
        .reply(messageOptions)
        .then(onComplete)
        .catch((err) => erro(err));
    }

    else if (data.reply === true && canReply) {
      messageOptions.fetchReply = true;
      if (data.ephemeral === true) {
        messageOptions.ephemeral = true;
      }
      let promise = null;
      if (cache.interaction.deferred) {
        promise = cache.interaction.editReply(messageOptions);
      } else {
        promise = cache.interaction.reply(messageOptions);
      }
      promise.then(onComplete).catch((err) => erro(err));
    }


    else if (target?.send || storagewebhook > 0) {

      if (storagewebhook > 0) {

        const editweb = this.evalMessage(data.editweb, cache);
        if (editweb == "" || editweb == undefined || editweb == "undefined" || editweb == null || editweb == "null") {
          webhook
            .send(messageOptions)
            .then(onComplete)
            .catch((err) => erro(err));
        } else {
          webhook
            .editMessage(editweb, messageOptions)
            .then(onComplete)
            .catch((xty) => {
              webhook
                .send(messageOptions)
                .then(onComplete)
                .catch((err) => erro(err))
            });
        }


      } else {
        target
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => erro(err));
      }

    }

    else {

      if (data.iffalse > 0) {
        if (data.iffalse == "5") return _this.executeSubActions(data.actionsError, cache);
        if (data.iffalse == "99") return _this.executeSubActionsThenNextAction(data.actionsError, cache);

        return _this.executeResults(false, data, cache);
      } else {
        this.callNextAction(cache);
      }
    }

    function erro(err) {
      if (data.errcmd) _this.displayError(data, cache, err);

      _this.storeValue(err, parseInt(data.storageError), _this.evalMessage(data.varNameError, cache), cache);

      if (data.iffalse == "5") return _this.executeSubActions(data.actionsError, cache);
      if (data.iffalse == "99") return _this.executeSubActionsThenNextAction(data.actionsError, cache);

      return _this.executeResults(false, data, cache);
    }

  },

  modInit(data) {
    if (Array.isArray(data?.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        const button = data.buttons[i];
        if (button.mode === "PERSISTENT") {
          this.registerButtonInteraction(button.id, button);
        }
        this.prepareActions(button.actions);
      }
    }
    if (Array.isArray(data?.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
        const select = data.selectMenus[i];
        if (select.mode === "PERSISTENT") {
          this.registerSelectMenuInteraction(select.id, select);
        }
        this.prepareActions(select.actions);
      }
    }

    this.prepareActions(data.actionsError);
  },

  mod() { },
};