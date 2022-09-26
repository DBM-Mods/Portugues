module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Send Message",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Messaging",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    let text = "";
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
      return `Store Data: ${text}`;
    }
    if (data.descriptioncolor == undefined) {
      data.descriptioncolor = "#ffffff"
    }
    if (data.storagewebhook > "0") {
      return `Enviar via Webhook: ${data.varwebhook}`;
    }
    return data.description
      ? `<font color="${data.descriptioncolor}">${data.description}</font>`
      : `<font color="${data.descriptioncolor}">${presets.getSendReplyTargetText(data.channel, data.varName)}: ${text}</font>`
  },

  //---------------------------------------------------------------------
  // Action Storage Function
  //
  // Stores the relevant variable info for the editor.
  //---------------------------------------------------------------------

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, data.dontSend ? "Message Options" : "Message"];
  },

  //---------------------------------------------------------------------
  // Action Meta Data
  //
  // Helps check for updates and provides info if a custom mod.
  // If this is a third-party mod, please set "author" and "authorUrl".
  //
  // It's highly recommended "preciseCheck" is set to false for third-party mods.
  // This will make it so the patch version (0.0.X) is not checked.
  //---------------------------------------------------------------------

  meta: {
    version: "2.1.6",
    preciseCheck: true,
    author: "[Modificado por XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]",
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

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
    "storagewebhook",
    "varwebhook",
    "webhookname",
    "webhookavatar",
    "messageoff",
    "mentions",
  ],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editing actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //---------------------------------------------------------------------

  html(isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 2.4</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

    <div style="width:100%" id="xin2"><send-reply-target-input dropdownLabel="Enviar para" selectId="channel" variableInputId="varName"></send-reply-target-input>
    <br><br><br>
</div><div id="xin3"><div style="float: left; width: 35%">
<span class="dbminputlabel">Enviar para</span><br>
<select class="round">
<option value="0" selected>Webhook</option>
</select>
</div>
<br><br><br>
</div>
<div style="width:100%">
<tab-system style="margin-top: 20px;">


  <tab label="Texto" icon="align left">
    <div style="padding: 8px;">
      <textarea id="message" class="dbm_monospace" rows="9" placeholder="Insira a mensagem aqui..." style="height: calc(100vh - 309px); white-space: nowrap;"></textarea>
    </div>
  </tab>


  <tab label="Embeds" icon="book image">
    <div style="padding: 8px;">

      <dialog-list id="embeds" fields='["title", "url", "color", "colorrandom", "timestamp", "timestampper", "imageUrl", "thumbUrl", "description", "fields", "author", "authorUrl", "authorIcon", "footerText", "footerIconUrl"]' dialogTitle="Embed Info" dialogWidth="540" dialogHeight="460" listLabel="Embeds" listStyle="height: calc(100vh - 350px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="data.title + ' - ' + data.description" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px 16px 0px 16px;">

          <tab-system>

            <tab label="Geral" icon="certificate">
              <div style="padding: 8px">
                <div style="float: left; width: calc(50% - 12px);">
                  <span class="dbminputlabel">Título</span><br>
                  <input id="title" class="round" type="text">

                  <br>

                  <span class="dbminputlabel">Cor</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="colorrandom" label="Aleatória"></dbm-checkbox></div><br>
                  <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para o padrão..."><td>
                  <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
                     document.getElementById('color').type = 'color'
                    document.getElementById('btr1').style.display = 'none';
                    document.getElementById('btr2').style.display = 'block';
                    })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
                      document.getElementById('color').type = 'text';
                      document.getElementById('btr1').style.display = 'block';
                      document.getElementById('btr2').style.display = 'none';
                      })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
                </div>
                
                

                <div style="float: right; width: calc(50% - 12px);">
                  <span class="dbminputlabel">URL</span><br>
                  <input id="url" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                  <br>

                  <span class="dbminputlabel">Usar Timestamp</span><div style="float:right;margin-top:-5px"><dbm-checkbox id="timestamp" label="Sim" checked></dbm-checkbox></div><br>
                  <input id="timestampper" class="round" type="text" placeholder="Deixe em branco para o atual">
                </div>

                <br><br><br><br><br><br><br>

                <hr class="subtlebar">

                <br>

                <span class="dbminputlabel">Imagem URL / Nome do Anexo</span><br>
                <input id="imageUrl" class="round" type="text" placeholder="Deixe em branco para nenhum, image.png ou um link http">

                <br>

                <span class="dbminputlabel">Thumbnail URL / Nome do Anexo</span><br>
                <input id="thumbUrl" class="round" type="text" placeholder="Deixe em branco para nenhum, image.png ou um link http">
              </div>
            </tab>

            <tab label="Descrição" icon="file image">
              <div style="padding: 8px">
                <textarea id="description" class="dbm_monospace" rows="10" placeholder="Insira a descrição aqui..." style="height: calc(100vh - 149px); white-space: nowrap; resize: none;"></textarea>
                </div>
            </tab>

            <tab label="Fields" icon="list">
              <div style="padding: 8px">
                <dialog-list id="fields" fields='["name", "value", "inline", "val1", "val2", "comparar", "formula"]' dialogTitle="Field Info" dialogWidth="540" dialogHeight="500" listLabel="Fields" listStyle="height: calc(100vh - 190px);" itemName="Field" itemCols="1" itemHeight="30px;" itemTextFunction="data.name + '<br>' + data.value" itemStyle="text-align: left; line-height: 30px;">
                                  

                  <div style="padding: 16px;background:rgba(0,0,0,0.3)">

                  <span class="dbminputlabel">Exibir</span><br>
                  <select id="formula" class="round">
                  <option value="0" selected>Sempre exibir a field / Ignorar o comparador abaixo</option>
                  <option value="1">Exibir a field somente se o comparador for falso</option>
                  <option value="2">Exibir a field somente se o comparador for verdadeiro</option>
                </select>

                <br>

                  <table style="width:100%"><tr><td>
                    <span class="dbminputlabel">Valor A</span><br>
                    <input id="val1" class="round" type="text">
                    </td>
                    <td>
                    <span class="dbminputlabel">Comparador</span><br>
                    <select id="comparar" class="round">
                    <option value="0">Valor A - Existe</option>
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
                    <option value="9">O comprimento é igual a</option>
                    <option value="10">Começa com</option>
                    <option value="11">Termina com</option>
                    <option value="16">Valor A possui acentuações?</option>
                    <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
                    <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                    <option value="19">Valor A é um número par?</option>
                    <option value="20">Valor A é um número ímpar?</option>
                    <option value="21">Valor A é um número?</option>
                    <option value="24">Valor A é um texto?</option>
                    <option value="23">Valor A é um URL de imagem?</option>
                    <option value="25">Valor A é um URL?</option>
                  </select>
                   </td>
                    <td>
                    <span class="dbminputlabel">Valor B</span><br>
                    <input id="val2" class="round" type="text">
                    </td>
                    </tr></table>


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

                  </div>
                </dialog-list>
              </div>
            </tab>

            <tab label="Autor" icon="user circle">
              <div style="padding: 8px">
                <span class="dbminputlabel">Autor Texto</span>
                <input id="author" class="round" type="text" placeholder="Deixe em branco para nenhum....">

                <br>

                <span class="dbminputlabel">Autor URL</span><br>
                <input id="authorUrl" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                <br>

                <span class="dbminputlabel">Autor Icone URL / Nome do Anexo</span><br>
                <input id="authorIcon" class="round" type="text" placeholder="Deixe em branco para nenhum...">
              </div>
            </tab>

            <tab label="Footer" icon="map outline">
              <div style="padding: 8px;">
                <span class="dbminputlabel">Footer Icone URL / Nome do Anexo</span><br>
                <input id="footerIconUrl" class="round" type="text" placeholder="Deixe em branco para nenhum...">

                <br>

                <span class="dbminputlabel">Footer Texto</span><br>
                <textarea id="footerText" class="dbm_monospace" rows="10" placeholder="Deixe em branco para nenhum..." style="height: calc(100vh - 234px); white-space: nowrap; resize: none;"></textarea>
              </div>
            </tab>

          </tab-system>

        </div>
      </dialog-list>

    </div>
  </tab>

  <tab label="Botões" icon="clone">
  <div style="padding: 16px;text-align:center"id="xin4n">Webhook não suporta Botões</div>
    <div style="padding: 8px;" id="xin4">

      <dialog-list id="buttons" fields='["name", "typeper", "type", "id", "row", "url", "emoji", "disabled", "mode", "time", "actions"]' dialogTitle="Button Info" dialogWidth="600" dialogHeight="700" listLabel="Botões" listStyle="height: calc(100vh - 350px);" itemName="Button" itemCols="4" itemHeight="40px;" itemTextFunction="data.name" itemStyle="text-align: center; line-height: 40px;">
        <div style="padding: 16px;">
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

          <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

          <action-list-input mode="BUTTON" id="actions" height="calc(100vh - 460px)"></action-list-input>

        </div>
      </dialog-list>

    </div>
  </tab>


  <tab label="Menus" icon="list alternate">
  <div style="padding: 16px;text-align:center"id="xin5n">Webhook não suporta Menus</div>
    <div style="padding: 8px;" id="xin5">

      <dialog-list id="selectMenus" fields='["placeholder", "id", "tempVarName", "row", "min", "max", "mode", "time", "options", "actions"]' dialogTitle="Select Menu Info" dialogWidth="800" dialogHeight="700" listLabel="Menus" listStyle="height: calc(100vh - 350px);" itemName="Select Menu" itemCols="1" itemHeight="40px;" itemTextFunction="data.placeholder + '<br>' + data.options" itemStyle="text-align: left; line-height: 40px;">
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
                  <table style="width:100%"><tr><td>
                    <span class="dbminputlabel">Valor A</span><br>
                    <input id="val1" class="round" type="text">
                    </td>
                    <td>
                    <span class="dbminputlabel">Comparador</span><br>
                    <select id="comparar" class="round">
                    <option value="0">Valor A - Existe</option>
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
                    <option value="9">O comprimento é igual a</option>
                    <option value="10">Começa com</option>
                    <option value="11">Termina com</option>
                    <option value="16">Valor A possui acentuações?</option>
                    <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
                    <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
                    <option value="19">Valor A é um número par?</option>
                    <option value="20">Valor A é um número ímpar?</option>
                    <option value="21">Valor A é um número?</option>
                    <option value="24">Valor A é um texto?</option>
                    <option value="23">Valor A é um URL de imagem?</option>
                    <option value="25">Valor A é um URL?</option>
                  </select>
                   </td>
                    <td>
                    <span class="dbminputlabel">Valor B</span><br>
                    <input id="val2" class="round" type="text">
                    </td>
                    </tr></table>

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
    <div style="padding: 8px;">

      <dialog-list id="attachments" fields='["tipo", "url", "canvasvar", "canvasnome", "compress", "name", "spoiler"]' dialogTitle="Informação do Anexo" dialogWidth="400" dialogHeight="480" listLabel="Arquivos" listStyle="height: calc(100vh - 350px);" itemName="File" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
        <div style="padding: 16px;" onmouseover="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value
        
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
    
    if (avalue == 2) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    } 

        
        })()">

        <span class="dbminputlabel">Tipo de Anexo</span>
        <select id="tipo" class="round" onchange="(function(){

          var aselect = document.getElementById('tipo');
            var avalue = aselect.options[aselect.selectedIndex].value
        
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
    
    if (avalue == 2) {
      document.getElementById('xinxyla2').style.display = 'none';
      document.getElementById('xinxyla1').style.display = 'block';
      document.getElementById('xinxyla3').style.display = 'none';
    }      
        
        })()">>
          <option value="0">Anexo Local/Web URL</option>
          <option value="1">Canvas</option>
          <option value="2">DBM Imagens</option>
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
        </div>
      </dialog-list>
    </div>
  </tab>


  <tab label="Config" icon="cogs">
    <div style="padding: 8px;height: calc(100vh - 292px);overflow-y: scroll;overflow-x: hidden;width:100%">
    <div id="xincheck">
    <span class="dbminputlabel">Opções</span><br><div style="padding:10px;background:rgba(0,0,0,0.2)">
      <dbm-checkbox id="reply" label="Responda à interação se possível" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="ephemeral" label="Tornar a resposta privada"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="mentions" label="@ Notificar membros/cargos" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="messageoff" label="Adicionar/Substituir Texto" checked></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="tts" label="Texto-Para-Fala"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="overwrite" label="Substituir alterações"></dbm-checkbox>
      <xinspace>
      <dbm-checkbox id="dontSend" label="Não envie a mensagem"></dbm-checkbox>
      
      </div><br></div>
      
      <div style="width:96%;display:block">
      <div style="padding-bottom: 12px;" id="xin1">
        <retrieve-from-variable allowNone dropdownLabel="Editar mensagem" selectId="editMessage" variableInputId="editMessageVarName" variableContainerId="editMessageVarNameContainer">
          <option value="intUpdate">Interaction Update</option>
        </retrieve-from-variable>
      

      <br><br><br></div>

   
    <div>
      <div style="float: left; width: 35%">
      <span class="dbminputlabel">Enviar como Webhook</span><br>
      <select id="storagewebhook" class="round" onchange="glob.onComparisonChanged2(this)">
      <option value="0" selecionado>Não</option>
      <option value="1">Variavel Temporária</option>
      <option value="2">Variavel Servidor</option>
      <option value="3">Variavel Global</option>
    </select>
    </div>
    <div id="webhookdiv" style="display: none; float: right; width: 60%;"><span id="ifName" class="dbminputlabel">Nome da Variavel</span><br><input list="variableList" id="varwebhook" class="round" name="actionxinxyla" type="text"></div>
    <div id="webhookdiv2" style="display: none;padding-top: 12px;">
    <br><br><br>
    <span class="dbminputlabel">Nome do Webhook</span><br>
    <input id="webhookname" class="round" type="text" style="width:100%" placeholder="Opcional">
    <br>
    <span class="dbminputlabel">URL de imagem do avatar Webhook</span><br>
    <input id="webhookavatar" class="round" type="text" style="width:100%" placeholder="Opcional"><br>
    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: -54px">
    </div>
      <br><br><br>
      <div style="padding-top: 12px">
        <store-in-variable allowNone dropdownLabel="Armazenar em" selectId="storage" variableInputId="varName2" variableContainerId="varNameContainer2"></store-in-variable>
      </div>

      <br><br><br>
      <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
      <br>
      <div>
      <div style="float: left; width: 35%">
      <span class="dbminputlabel">Se a mensagem falhar</span><br>
      <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
      <option value="0">Continuar ações</option>
      <option value="1" selecionado>Parar sequência de ação</option>
      <option value="2">Ir para a ação</option>
      <option value="3">Pular as próximas ações</option>
      <option value="4">Ir para a âncora de ação</option>
    </select>
    </div>
    <div id="iffalseContainer" style="display: none; float: right; width: 60%;"><span id="ifName" class="dbminputlabel">Para</span><br><input id="iffalseVal" class="round" name="actionxinxyla" type="text"></div>
      <br><br><br>

      <div style="padding-bottom: 12px;padding-top: 12px">
      <table style="width:100%;"><tr>
      <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
      <td style="padding:0px 0px 0px 10px;width:55px"><span class="dbminputlabel">Cor</span><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
      </tr></table>
      </div>

      </div>

    </div>
  </tab>
</tab-system></div>

<style>
xinspace{padding:5px 0px 0px 0px;display:block}
</style>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init: function () {
    const { glob, document } = this;


    glob.onComparisonChanged = function (event) {
      if (event.value > "1") {
        document.getElementById("iffalseContainer").style.display = null;
      } else {
        document.getElementById("iffalseContainer").style.display = "none";
      }
    }

    glob.onComparisonChanged(document.getElementById("iffalse"));


    glob.onComparisonChanged2 = function (event) {
      if (event.value > "0") {
        document.getElementById("webhookdiv").style.display = null;
        document.getElementById("webhookdiv2").style.display = null;
        document.getElementById("xincheck").style.display = "none";
        document.getElementById("xin1").style.display = "none";
        document.getElementById("xin2").style.display = "none";
        document.getElementById("xin3").style.display = "block";
        document.getElementById("xin4").style.display = "none";
        document.getElementById("xin5").style.display = "none";
        document.getElementById("xin4n").style.display = null;
        document.getElementById("xin5n").style.display = null;
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
      } else {
        document.getElementById("webhookdiv").style.display = "none";
        document.getElementById("webhookdiv2").style.display = "none";
        document.getElementById("xincheck").style.display = null;
        document.getElementById("xin1").style.display = null;
        document.getElementById("xin2").style.display = "block";
        document.getElementById("xin3").style.display = "none";
        document.getElementById("xin4").style.display = null;
        document.getElementById("xin5").style.display = null;
        document.getElementById("xin4n").style.display = "none";
        document.getElementById("xin5n").style.display = "none";
      }
    }

    glob.onComparisonChanged2(document.getElementById("storagewebhook"));


    glob.formatItem = function (data) {
      let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
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
      }
      result += "</div>";
      return result;
    };

  },
  //---------------------------------------------------------------------
  // Action Editor On Save
  //
  // When the data for the action is saved, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value. This can be used to verify the
  // data and fill required entries the user did not.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

  onSave(data, helpers) {
    // generate unique ids if not provided by user since they are important
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

  //---------------------------------------------------------------------
  // Action Editor On Paste
  //
  // When the data for the action is pasted, this function is called.
  // It provides the ability to modify the final data associated with
  // the action by retrieving it as an argument and returning a modified
  // version through the return value.
  //
  // Its inclusion within action mods is optional.
  //---------------------------------------------------------------------

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

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existence.
  //---------------------------------------------------------------------

  async action(cache) {

    const data = cache.actions[cache.index];
    var messageoff = data.messageoff;
    if(messageoff == undefined){messageoff = true}
    const channel = parseInt(data.channel, 10);
    const message = this.evalMessage(data.message, cache);
    const storagewebhook = parseInt(data.storagewebhook)
    const webhookname = this.evalMessage(data.webhookname, cache)
    const webhookavatar = this.evalMessage(data.webhookavatar, cache)
    if (storagewebhook > 0) {
      varwebhook = this.evalMessage(data.varwebhook, cache)
      Mods = this.getMods()
      webhook = Mods.getWebhook(storagewebhook, varwebhook, cache)
    }
    if (data.channel === undefined || message === undefined) {
      return;
    }

    let target = await this.getSendReplyTarget(channel, this.evalMessage(data.varName, cache), cache);

    let messageOptions = {};

    const overwrite = data.overwrite;

    let isEdit = 0;
    if (data.editMessage === "intUpdate") {
      isEdit = 2;
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

    if(messageoff == true){
    if (message.length > 0) {
      content = this.evalMessage(message, cache);
    } else {
      content = this.evalMessage("", cache);
    }}


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
        const embed = new MessageEmbed();
        if (embedData.title) embed.setTitle(this.evalMessage(embedData.title, cache));
        if (embedData.url) embed.setURL(this.evalMessage(embedData.url, cache));
        if (embedData.colorrandom == true) {
          embed.setColor("RANDOM");
        }
        if (embedData.color){
          if (embedData.colorrandom == true) {
            embed.setColor("RANDOM");
          } else {
            embed.setColor(this.evalMessage(embedData.color, cache));
          }
        }

        if (embedData.timestamp == "true" || embedData.timestamp == true) {
          if(embedData.timestampper == "" || embedData.timestampper == undefined) {
            embed.setTimestamp()
          } else{
            embed.setTimestamp(parseFloat(this.evalMessage(embedData.timestampper, cache)))
          }
        }

        var imgURL = this.evalMessage(embedData.imageUrl, cache);

        if(imgURL) {
          if(imgURL.toString().startsWith("http")) {
            embed.setImage(imgURL);
          } else {
            embed.setImage("attachment://" + imgURL);
          } 
        }

        var thumb = this.evalMessage(embedData.thumbUrl, cache);

        if(thumb) {
          if(thumb.toString().startsWith("http")) {
            embed.setThumbnail(thumb);
          } else {
            embed.setThumbnail("attachment://" + thumb);
          }
        }

        if (embedData.description) embed.setDescription(this.evalMessage(embedData.description || '\u200B', cache));

        if (embedData.fields?.length > 0) {
          const fields = embedData.fields;
          for (let i = 0; i < fields.length; i++) {
            const f = fields[i];

            val1 = this.evalMessage(f.val1, cache);
            val2 = this.evalMessage(f.val2, cache);
            result = true;

            if(f.formula == "1" || f.formula == "2") {
            const compare = parseInt(f.comparar, 10);
            switch (compare) {
                case 0:
                  result = val1.toString() !== "undefined";
                  break;
                case 1:
                  result = val1 == val2;
                  break;
                case 2:
                  result = val1 === val2;
                  break;
                case 3:
                  result = parseFloat(val1) < parseFloat(val2);
                  break;
                case 4:
                  result = parseFloat(val1) > parseFloat(val2);
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
          }

          if(f.formula == "1") {
            if(result == false) {
              result = true
            } else {result = false}
          }

          if(result == true){
            embed.addField(this.evalMessage(f.name || '\u200B', cache), this.evalMessage(f.value || '\u200B', cache), f.inline === "true")};
          }
        }

        var authorIcon = this.evalMessage(embedData.authorIcon, cache) || null;

        if(!authorIcon?.toString().startsWith("http")) {
          authorIcon = "attachment://" + authorIcon;
        }

        if(embedData.author) {
          embed.setAuthor({
            name: this.evalMessage(embedData.author, cache),
            iconURL: authorIcon,
            url: embedData.authorUrl ? this.evalMessage(embedData.authorUrl, cache) : null,
          });
        }
        
        var iconURL = this.evalMessage(embedData.footerIconUrl, cache) || null;

        if(!iconURL?.toString().startsWith("http")) {
          iconURL = "attachment://" + iconURL;
        }

        if(embedData.footerText) {
          embed.setFooter({
            text: this.evalMessage(embedData.footerText, cache),
            iconURL: iconURL,
          });
        }

        messageOptions.embeds.push(embed);
      }
    }

    if(data.mentions == false){
    messageOptions.allowedMentions = {};
    messageOptions.allowedMentions.repliedUser = []
    messageOptions.allowedMentions.repliedUser = data.mentions
  }

    let componentsArr = [];
    let awaitResponses = [];

    if (!overwrite && messageOptions.components?.length > 0) {
      componentsArr = messageOptions.components.map(function (comps) {
        return comps.components;
      });
    }

    const defaultTime = 60000;

    if (Array.isArray(data.buttons)) {
      for (let i = 0; i < data.buttons.length; i++) {
        if(!data.buttons[i].name) data.buttons[i].name = "\u200b";
        const button = data.buttons[i];
        if(button.typeper == "" || button.typeper == undefined){
          button.type = this.evalMessage(button.type, cache)
        }else{
          check = this.evalMessage(button.typeper, cache)
          if(check == "PRIMARY" || check == "SECONDARY" || check == "SUCCESS" || check == "DANGER" || check == "LINK"){
          button.type = this.evalMessage(button.typeper, cache)}
        }
        const buttonData = this.generateButton(button, cache);
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

    if (Array.isArray(data.selectMenus)) {
      for (let i = 0; i < data.selectMenus.length; i++) {
           const select = data.selectMenus[i];

      totales = data.selectMenus[i].options.length
       
        
        for (let ix = 0; ix < totales; ix++) {
          val1 = this.evalMessage(data.selectMenus[i].options[ix].val1, cache);
          val2 = this.evalMessage(data.selectMenus[i].options[ix].val2, cache);
      
          result = true;

          if(data.selectMenus[i].options[ix].formula == "Falso" || data.selectMenus[i].options[ix].formula == "Verdadeiro") {
          const compare = parseInt(data.selectMenus[i].options[ix].comparar, 10);
          if (compare !== 6){
            val1 = this.evalIfPossible(val1, cache)
            val2 = this.evalIfPossible(val2, cache)
          }

          switch (compare) {
              case 0:
                result = val1.toString() !== "undefined";
                break;
              case 1:
                result = val1 == val2;
                break;
              case 2:
                result = val1 === val2;
                break;
              case 3:
                result = parseFloat(val1) < parseFloat(val2);
                break;
              case 4:
                result = parseFloat(val1) > parseFloat(val2);
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
        }
        
        if(data.selectMenus[i].options[ix].formula == "Falso") {
          if(result == false) {
            result = true
          } else {result = false}
        }

        if(result == false){
        data.selectMenus[i].options.splice([ix], 1);
        ix = parseFloat([ix]) - 1
        totales = totales - 1
        }


      }
        
      const selectData = this.generateSelectMenu(select, cache);
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
      const newComponents = componentsArr
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
        messageOptions.username = webhookname
      }
      if (webhookavatar !== "") {
        messageOptions.avatarURL = await webhookavatar
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

        if (data.attachments[i].tipo == "1") {
          const { DiscordJS } = this.getDBM();
          const Canvas = require('canvas')
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          if (!imagedata) {
            this.callNextAction(cache)
            return
          }
          const image = new Canvas.Image()
          image.src = imagedata
          const canvas = Canvas.createCanvas(image.width, image.height)
          const ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, image.width, image.height)
          const buffer = canvas.toBuffer('image/png', { compressionLevel: data.attachments[i].compress })
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
          const msgAttachment = new MessageAttachment(buffer, name);
          if (spoiler) {
            msgAttachment.setSpoiler(true);
          }
          messageOptions.files.push(msgAttachment);

        }
        if (data.attachments[i].tipo == "2") {
          const { Images } = this.getDBM();
          const attachment = data.attachments[i];
          const varnamer = this.evalMessage(attachment?.canvasnome, cache);
          const varid = this.evalMessage(attachment?.canvasvar, cache);
          const imagedata = this.getVariable(varid, varnamer, cache)
          const spoiler = !!attachment?.spoiler;
          const name = attachment?.name || (spoiler ? Util.basename("image.png") : undefined);
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
            const name = attachment?.name || (spoiler ? Util.basename(url) : undefined);
            const msgAttachment = new MessageAttachment(url, name);
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

    const isMessageTarget = target instanceof this.getDBM().DiscordJS.Message;

    const sameId = target?.id?.length > 0 && (target?.id ?? "") === cache?.interaction?.channel?.id;
    const sameChannel = channel === 0 || sameId;
    const canReply = !isMessageTarget && cache?.interaction?.replied === false && sameChannel;

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
        this.displayError(data, cache, "Send Message -> Message/Options to Edit -> Interaction Update / Could not find interaction to edit");
      }

      if (promise) {
        promise
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      }
    }

    else if (isEdit === 1 && target?.edit) {
      target
        .edit(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));;
    }

    else if (isMessageTarget && target?.reply) {
      target
        .reply(messageOptions)
        .then(onComplete)
        .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
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
      promise.then(onComplete).catch((err) => this.displayError(data, cache, err));
    }


    else if (target?.send) {

      if (storagewebhook > 0) {
        webhook
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      } else {
        target
          .send(messageOptions)
          .then(onComplete)
          .catch((err) => this.displayError(data, cache, err) || this.executeResults(false, data, cache));
      }

    }



    else {
      this.callNextAction(cache);
    }

  },

  //---------------------------------------------------------------------
  // Action Bot Mod Init
  //
  // An optional function for action mods. Upon the bot's initialization,
  // each command/event's actions are iterated through. This is to
  // initialize responses to interactions created within actions
  // (e.g. buttons and select menus for Send Message).
  //
  // If an action provides inputs for more actions within, be sure
  // to call the `this.prepareActions` function to ensure all actions are
  // recursively iterated through.
  //---------------------------------------------------------------------

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
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflicts between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod() { },
};
