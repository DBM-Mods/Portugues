module.exports = {

    //---------------------------------------------------------------------
    // Action Name
    //
    // This is the name of the action displayed in the editor.
    //---------------------------------------------------------------------

    name: "Send Mail MOD",
    //---------------------------------------------------------------------
    // Action Section
    //
    // This is the section the action will fall into.
    //---------------------------------------------------------------------

    section: "Other Stuff",

    //---------------------------------------------------------------------
    // Action Subtitle
    //
    // This function generates the subtitle displayed next to the name.
    //---------------------------------------------------------------------

    subtitle(data) {
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
            : `<font style="color:${desccor}">De:"${data.username}" Para: "${data.mailto}" Para Cópia: "${data.mailcc}" Para Cópia
    Oculta: "${data.mailbcc}"</font>`
    },

    //---------------------------------------------------------------------
    // Action Storage Function
    //
    // Stores the relevant variable info for the editor.
    //---------------------------------------------------------------------

    variableStorage(data, varType) {
        let vars = [];

        const typeError = parseInt(data.storageError, 10);

        if (typeError == varType) {
            vars.push(data.varNameError);
            vars.push("Texto ~ Erro");
        }

        if (vars.length > 0) return vars;
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
        version: "2.1.7",
        preciseCheck: true,
        author: "[Peter H - 442783328580665374]<br>[Tempest - 321400509326032897]",
        authorUrl: "https://github.com/DBM-Mods/Portugues",
        downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
    },

    //--------------------------------------------------------------------
    // Action Fields
    //
    // These are the fields for the action. These fields are customized
    // by creating elements with corresponding IDs in the HTML. These
    // are also the names of the fields stored in the action's JSON data.
    //---------------------------------------------------------------------


    fields: [
        "username",
        "password",
        "mailto",
        "mailcc",
        "mailbcc",
		"replyto",
        "subject",
        "type",
        "text",
        "iffalse",
        "iffalseVal",
        "hostname",
        "portname",
        "sec",
        "descriptioncolor",
        "description",
        "descriptionx",
        "actionsError",
        "storageError",
        "varNameError",
        "errcmd",
        "branches"
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

    html() {
        return `
<style>
    .table {
        width: 100%;
    }

    .dbmmodsbr1 {
        position: absolute;
        bottom: 0px;
        border: 0px solid rgba(50, 50, 50, 0.7);
        background: rgba(0, 0, 0, 0.7);
        color: #999;
        padding: 5px;
        left: 0px;
        z-index: 999999;
        cursor: pointer;
    }

    .dbmmodsbr2 {
        position: absolute;
        bottom: 0px;
        border: 0px solid rgba(50, 50, 50, 0.7);
        background: rgba(0, 0, 0, 0.7);
        color: #999;
        padding: 5px;
        right: 0px;
        z-index: 999999;
        cursor: pointer;
    }

    tl {
        background: rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(50, 50, 50, 0.1);
        padding: 5px;
        width: 100%;
        display: block;
    }

    tlt {
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(50, 50, 50, 0.2);
        padding: 2px;
        width: 100%;
        display: block;
    }

    .cols {
        padding: 0px 4px;
        border: 1px solid rgba(0, 0, 0, 0.5);
    }
</style>

<div class="dbmmodsbr1 linkdbmmods" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
<div class="dbmmodsbr2 linkdbmmods" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

<div style="width:100%">
    <tab-system style="margin-top: 0px;">
        <tab label="Texto" icon="align left">
            <div style="width: 100%; padding: 8px; height: calc(100vh - 200px); overflow: auto;">

                <div style="float: left; width: 35%; margin-bottom: 10px;">
                    <span class="dbminputlabel">Tipo de Texto</span>
                    <select id="type" class="round">
                        <option value="0" selected>Texto Customizado</option>
                        <option value="1">Código HTML</option>
						<option value="2">Código AMP</option>
                    </select>
                </div>

                <br><br><br>

                <span class="dbminputlabel">Para</span>
                <input type="text" class="round" id="mailto" placeholder="Digite o e-mail para onde enviar ou variável.">

                <br>
				
				<span class="dbminputlabel">Responder para</span>
                <input type="text" class="round" id="replyto" placeholder="Digite o e-mail para onde enviar, variável ou vazio para remover.">

                <br>

                <span class="dbminputlabel">Enviar com Cópia</span>
                <input type="text" class="round" id="mailcc" placeholder="Digite o e-mail para onde enviar, variável ou vazio para remover.">

                <br>

                <span class="dbminputlabel">Enviar com Cópia Oculta</span>
                <input type="text" class="round" id="mailbcc" placeholder="Digite o e-mail para onde enviar, variável ou vazio para remover.">
   
                <br>

                <span class="dbminputlabel">Assunto</span>
                <input type="text" class="round" id="subject"placeholder="Digite o assunto do e-mail variável ou vazio para remover.">

                <br>

                <span class="dbminputlabel">Corpo do E-mail</span>
                <textarea id="text" class="dbm_monospace" rows="6" placeholder="Insira a mensagem aqui..." style="height: calc(100vh - 349px); white-space: nowrap;"></textarea>
                
                <br>
                
                <div id="counter" style="text-align: right; position: relative; width: 100%;">0 caracteres</div>
            </div>
        </tab>

        <tab label="Anexos" icon="attach">
            <dialog-list id="branches" fields='["type", "fileName", "fileFormat", "filePath", "varName", "storage", "base64"]' dialogResizable dialogTitle="Anexo" dialogWidth="600" dialogHeight="300" listLabel="Anexos" listStyle="height: calc(100vh - 240px);" itemName="Item" itemHeight="28px;" itemTextFunction="glob.formatItem(data)" itemStyle="line-height: 28px;">

            <div style="margin: 10px;" onmouseover="(function(){
                const aselect = document.getElementById('type');
                const value = aselect.options[aselect.selectedIndex].value;

                if(value == '0') {
                    document.getElementById('label').textContent = 'Localização do arquivo';
                    document.getElementById('filePath').placeholder = 'Exemplo: ./resources';
                    document.getElementById('divValue2').style.display = 'none';
                    document.getElementById('divValue').style.display = 'block';
                    document.getElementById('divValue3').style.width = '71%';
                    document.getElementById('divValue4').style.display = 'block';
                } else if (value == '1') {
                    document.getElementById('label').textContent = 'URL';
                    document.getElementById('filePath').placeholder = '';
                    document.getElementById('divValue2').style.display = 'none';
                    document.getElementById('divValue').style.display = 'block';
                    document.getElementById('divValue3').style.width = '71%';
                    document.getElementById('divValue4').style.display = 'block';
                } else if (value == '2') {
                    document.getElementById('divValue').style.display = 'none';
                    document.getElementById('divValue2').style.display = 'block';
                    document.getElementById('divValue3').style.width = '100%';
                    document.getElementById('divValue4').style.display = 'none';
                } else {
                    document.getElementById('divValue').style.display = 'none';
                    document.getElementById('divValue2').style.display = 'block';
                    document.getElementById('divValue3').style.width = '71%';
                    document.getElementById('divValue4').style.display = 'block';
                }
            })()">

                <span class="dbminputlabel">Tipo de anexo</span>
                <select id="type" class="round" onchange="(function(){
                    const aselect = document.getElementById('type');
                    const value = aselect.options[aselect.selectedIndex].value;
    
                    if(value == '0') {
                        document.getElementById('label').textContent = 'Localização do arquivo';
                        document.getElementById('filePath').placeholder = 'Exemplo: ./resources';
                        document.getElementById('divValue2').style.display = 'none';
                        document.getElementById('divValue').style.display = 'block';
                        document.getElementById('divValue3').style.width = '71%';
                        document.getElementById('divValue4').style.display = 'block';
                    } else if (value == '1') {
                        document.getElementById('label').textContent = 'URL';
                        document.getElementById('filePath').placeholder = '';
                        document.getElementById('divValue2').style.display = 'none';
                        document.getElementById('divValue').style.display = 'block';
                        document.getElementById('divValue3').style.width = '71%';
                        document.getElementById('divValue4').style.display = 'block';
                    } else if (value == '2') {
                        document.getElementById('divValue').style.display = 'none';
                        document.getElementById('divValue2').style.display = 'block';
                        document.getElementById('divValue3').style.width = '100%';
                        document.getElementById('divValue4').style.display = 'none';
                    } else {
                        document.getElementById('divValue').style.display = 'none';
                        document.getElementById('divValue2').style.display = 'block';
                        document.getElementById('divValue3').style.width = '71%';
                        document.getElementById('divValue4').style.display = 'block';
                    }
                })()">
                    <option value="0">Anexo local</option>
                    <option value="1">Anexo Web URL</option>
                    <option value="2">Canvas</option>
                    <option value="3">Enviar variável</option>
                </select>

                <br>

                <div style="float: left; width: 71%;" id="divValue3">
                    <span class="dbminputlabel">Nome do arquivo</span>
                    <input type="text" class="round" id="fileName" placeholder="Exemplo: dbmmods">
                </div>

                <div style="float: left; width: 25%; margin-left: 18px;" id="divValue4">
                    <span class="dbminputlabel">Formato do arquivo</span>
                    <input type="text" class="round" id="fileFormat" placeholder="Exemplo: js">
                 </div>

                <br><br><br>

                <div id="divValue">
                    <span class="dbminputlabel" id="label">Localização do arquivo</span>
                    <input type="text" style="width: 99%;"class="round" id="filePath" placeholder="Exemplo: ./resources">
                </div>

                <div id="divValue2">
                    <retrieve-from-variable dropdownLabel="Variável" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
                </div>
            </div>

            </dialog-list>
        </tab>

        <tab label="Config" icon="cogs">
            <div style="padding: 8px; height: calc(100vh - 200px); overflow-y: scroll; overflow-x: hidden; width: 100%;">
                <div style="padding-bottom: 12px; padding-top: 12px;">
                    <table style="width: 100%;">
                        <tr>
                            <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text"
                                    class="round" id="description" placeholder="Deixe vazio para remover"></td>
                            <td style="padding:0px 0px 0px 10px;width:55px">
                                <div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox
                                        id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color"
                                    value="#ffffff" class="round" id="descriptioncolor">
                            </td>
                        </tr>
                    </table>
                </div><br>
                <div>
                    <span class="dbminputlabel">Opções</span><br>
                    <div style="padding:10px;background:rgba(0,0,0,0.2)">

                        <table style="width:100%; margin-bottom: 10px;">
                            <tr>
                                <td><span class="dbminputlabel">Servidor SMTP</span><br><input type="text" class="round"
                                        id="hostname" placeholder="Digite o servidor SMTP."></td>
                                <td style="padding:0px 0px 0px 10px;"><span class="dbminputlabel">Porta
                                        SMTP</span><br><input type="text" class="round" id="portname"
                                        placeholder="Digite a porta do Servidor SMTP."></td>
                            </tr>
                        </table>

                        <table style="width:100%; margin-bottom: 10px;">
                            <tr>
                                <td><span class="dbminputlabel">Usuário (E-mail)</span><br><input type="text"
                                        class="round" id="username" placeholder="Digite seu e-mail."></td>
                                <td style="padding:0px 0px 0px 10px;"><span class="dbminputlabel">Senha</span><br><input
                                        type="password" class="round" id="password"
                                        placeholder="Digite a senha do seu e-mail."></td>
                            </tr>
                        </table>

                        <table style="width:100%; margin-bottom: 10px; padding:0px 0px 0px 10px;">
                            <div style="float: left; width: 50%; margin-bottom: 10px;">
                                <span class="dbminputlabel">Criptografia (SSL/TLS | STARTTLS)</span><br>
                                <select id="sec" class="round">
                                    <option value="true" selected>Sim</option>
                                    <option value="false">Não</option>
                                </select>
                            </div>
                        </table>
                        <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
                    </div><br>

                    <br>

                    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
                    <br>
                    <div id="divValueError2" style="float: left; width: 45%; padding:0px 10px 0px 0px;">
                        <span class="dbminputlabel">Se ocorrer um erro</span>
                        <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
                            <option value="0" selected>Continuar ações</option>
                            <option value="1">Parar sequência de ação</option>
                            <option value="2">Ir para a ação</option>
                            <option value="3">Pular as próximas ações</option>
                            <option value="4">Ir para a âncora de ação</option>
                            <option value="5">Realizar ações e parar</option>
                            <option value="6">Realizar ações e continuar</option>
                        </select>
                    </div>
                    <div id="iffalseContainer" style="display: none; float: right; width: 55%;">
                        <span id="iffalseName" class="dbminputlabel">Para</span>
                        <input id="iffalseVal" class="round" type="text">
                    </div>
                    <action-list-input id="actionsError" style="margin-top: 50px;"
                        height="calc(100vh - 430px)"></action-list-input>
                </div>
            </div>
        </tab>

        <tab label="Ajuda & Info" icon="help circle">
            <div style="width: 100%; padding:10px 5px;height: calc(100vh - 200px);overflow:auto">

                <center>
                    <tlt><b>Informações</b></tlt>
                </center>
                <tl>
                    Esta ação serve para realizar disparos de e-mails, seja ela uma mensagem simples ou código HTML.
                </tl>
                <br>
                <center>
                    <tlt><b>Etapas de Configuração (Gmail)</b></tlt>
                </center>
                <tl>
                    1. Na aba Config, em Opções, no campo <button class="tiny compact ui icon button"><b>Servidor SMTP</b></button> você colocará
                    <u><b>smtp.gmail.com</b></u>;<br>
                    2. No campo <button class="tiny compact ui icon button"><b>Porta SMTP</b></button> você colocará
                    <u><b>465</b></u>;<br>
                    3. No campo <button class="tiny compact ui icon button"><b>Usuário (E-mail)</b></button> você
                    colocará o e-mail para enviar os e-mails;<br>
                    4. No campo <button class="tiny compact ui icon button"><b>Senha</b></button> você colocará a senha
                    do seu e-mail;<br>
                    5. No campo <button class="tiny compact ui icon button"><b>Criptografia (SSL/TLS |
                            STARTTLS)</b></button> você colocará a opção <u><b>Sim</b></u>.<br><br>

                    <b>OBS 1:</b> Caso a conta do Gmail tenha Indetificação por Duas-Etapas (2FA),
                    você precisará criar uma <button class="tiny compact ui icon button"><span class="linkdbmmods"
                            data-url="https://security.google.com/settings/security/apppasswords">Senha de
                            App</span></button>, dentro da sua conta Google.
                    <br><br>
                    <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
                    <br>
                    <b>OBS 2:</b> Para utilizar o Gmail, você terá que habilitar o protocolo IMAP na sua conta, siga o
                    passo-a-passo abaixo:<br><br>
                    1. <button class="tiny compact ui icon button"><span class="linkdbmmods"
                            data-url="https://mail.google.com/">Abra o Gmail</span></button> no computador.<br>
                    2. No canto superior direito, clique em <b>Configurações</b> > <b>Ver todas as
                        configurações</b>.<br>
                    3. Clique na guia <b>Encaminhamento e POP/IMAP</b>.<br>
                    4. Na seção "Acesso IMAP", selecione <b>Ativar IMAP</b>.<br>
                    5. Clique em <b>Salvar alterações</b>.<br>
                </tl>

                <center>
                    <tlt><b>Informações Úteis</b></tlt>
                </center>
                <tl>
                    Existem alguns limites de envios nos e-mails gmail, segue a tabela abaixo:
                    <br><br>
                    <table>
                        <tr>
                            <td class="cols"><b>Tipos de
                                    Limites&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</b>
                            </td>
                            <td class="cols"><b>Limite&emsp;&emsp;</b></td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Máximo de mensagens por dia</b><br>- Limite diário de envios por conta
                                de usuário*</td>
                            <td class="cols">· 2.000<br>· 1.500 para envio múltiplo<br>· 500 para contas de teste</td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Mensagens encaminhadas automaticamente</b><br>- Mensagens encaminhadas
                                automaticamente para outra conta, não incluídas no limite de envio diário</td>
                            <td class="cols">· 10.000</td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Destinatários por mensagem enviada via SMTP (por usuários do POP ou
                                    IMAP)</b><br>- Endereços nos campos Para, Cc e Cco de um único e-mail. Isso inclui
                                os e-mails enviados por smtp-relay.gmail.com ou smtp.gmail.com*</td>
                            <td class="cols">· 100</td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Total de destinatários por dia</b><br>- Os endereços de e-mail
                                (destinatários) são contabilizados sempre que uma mensagem é enviada. Cinco e-mails
                                enviados para 10 endereços contam como um total de 50 destinatários.*<b></td>
                            <td class="cols">· 10.000<br>· 1.500 para envio múltiplo</td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Destinatários externos por dia</b><br>- Endereços de e-mail fora do
                                domínio principal, incluindo aliases de domínio e domínios alternativos</td>
                            <td class="cols">· 3.000</td>
                        <tr>
                        <tr>
                            <td class="cols"><b>Destinatários únicos por dia</b><br>- Cada endereço de e-mail (cada
                                destinatário único) conta apenas uma vez por dia:<br><br>· Cinco e-mails enviados para
                                10 endereços diferentes contam como 10 destinatários exclusivos*<br>· Cinco e-mails
                                enviados para um único endereço contam como um único destinatário*</td>
                            <td class="cols">· 3.000<br>· 2.000 externos<br>· 500 externos para contas de teste</td>
                        <tr>
                    </table>
                </tl><br>

                <center>
                    <tlt><b>Informações Úteis (E-mail Profissional)</b></tlt>
                </center>
                <tl>
                    Caso você tenha um E-mail Profissional, e queira utilizar o seu e-mail @domínio, basta realizar as
                    configurações que forem passadas pelo seu provedor de E-mail Profissional.
                </tl><br>

                <hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
                <br>
				
				<center>
                        <tlt><b>Formatação</b></tlt>
                    </center>
                    <tl>
                        Caso deseja enviar para um ou mais destinatários, seja nos campos <button
                            class="tiny compact ui icon button"><b>Para</b></button>, <button
                            class="tiny compact ui icon button"><b>Enviar com Cópia</b></button> ou <button
                            class="tiny compact ui icon button"><b>Enviar com Cópia Oculta</b></button>,
                        utilize a formatação a seguir:<br><br>
    
                        <b>· Caso for apenas um destinatário:</b><br>
                        "Nome da Pessoa" &lt;email@exemple.com&gt<br><br>
    
                        <b>· Caso for mais destinatários:</b><br>
                        "Nome da Primeira Pessoa" &lt;email@exemple.com&gt;, "Nome da Segunda Pessoa"
                        &lt;email@exemple.com&gt;, ...<br>
    
                    </tl>
                    <center>
                        <tlt><b>Informações (Para, CC, CCO)</b></tlt>
                    </center>
                    <tl>
                        <table>
                            <tr>
                                <td class="cols"><b>Finalidade</b></td>
                                <td class="cols"><b>Para</b></td>
                                <td class="cols"><b>Cc (Com Cópia)</b></td>
                                <td class="cols"><b>Cco (Com Cópia Oculta)</b></td>
                            </tr>
                            <tr>
                                <td class="cols">Quando é usado</td>
                                <td class="cols">Para enviar ao destinatário original.</td>
                                <td class="cols">Enviado para algum interessado, mas que não é o destinatário principal.
                                </td>
                                <td class="cols">Para enviar para algum interessado, mas quando você não quer que as pessoas
                                    vejam quem mais recebeu.</td>
                            </tr>
                            </tr>
                            <tr>
                                <td class="cols">Quem vê os destinatários</td>
                                <td class="cols">Todos que recebem esse e-mail conseguem ver quem mais o recebeu.</td>
                                <td class="cols">Todos conseguem ver.</td>
                                <td class="cols">Os destinatários não conseguem ver o endereço de quem mais recebeu uma
                                    cópia oculta.</td>
                            </tr>
                            <tr>
                                <td class="cols">Em inglês</td>
                                <td class="cols">To.</td>
                                <td class="cols">Vem do termo em inglês <i>carbon copy</i> ou <i>courtesy copy</i>.</td>
                                <td class="cols">No inglês é usado o termo bcc: <i>blind carbon copy</i>.</td>
                            </tr>
                        </table>
                    </tl><br>
					
					<hr class="subtlebar" style="margin-top: 4px; margin-bottom: 4px">
                    <br>

                <center>
                    <tl>Modificado por: Peter H#3619 (442783328580665374)</tl>
                    <tl>Modificado por: Tempest#9970 (321400509326032897)</tl>
                </center>

            </div>
        </tab>
    </tab-system>
</div>
`;
    },

    init() {
        const { glob, document } = this;

        const xinelaslinks = document.getElementsByClassName("linkdbmmods");
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

        const textarea = document.getElementById("text");
        const counter = document.getElementById("counter");
        const comprimentoTexto = textarea.value.length;
        counter.textContent = `${comprimentoTexto} caracteres`;
        textarea.addEventListener("input", () => {
            const comprimentoTexto = textarea.value.length;
            counter.textContent = `${comprimentoTexto} caracteres`;
        });

        glob.onComparisonChanged = function (event) {
            switch (parseInt(event.value)) {
                case 0:
                    document.getElementById("iffalseContainer").style.display = "none";
                    document.getElementById("actionsError").style.display = "none";
                    document.getElementById("divValueError2").style.width = "45%";
                case 1:
                    document.getElementById("iffalseContainer").style.display = "none";
                    document.getElementById("actionsError").style.display = "none";
                    document.getElementById("divValueError2").style.width = "45%";
                    break;
                case 2:
                    document.getElementById("iffalseName").innerHTML = "Número da ação";
                    document.getElementById("iffalseContainer").style.display = null;
                    document.getElementById("actionsError").style.display = "none";
                    document.getElementById("divValueError2").style.width = "45%";
                    break;
                case 3:
                    document.getElementById("iffalseName").innerHTML = "Pular ações";
                    document.getElementById("iffalseContainer").style.display = null;
                    document.getElementById("actionsError").style.display = "none";
                    document.getElementById("divValueError2").style.width = "45%";
                    break;
                case 4:
                    document.getElementById("iffalseName").innerHTML = "Nome da âncora";
                    document.getElementById("iffalseContainer").style.display = null;
                    document.getElementById("actionsError").style.display = "none";
                    document.getElementById("divValueError2").style.width = "45%";
                    break;
                case 5:
                    document.getElementById("iffalseContainer").style.display = "none";
                    document.getElementById("actionsError").style.display = null;
                    document.getElementById("divValueError2").style.width = "100%";
                    document.getElementById("divValueError2").style.marginBottom = "10px";
                    break;
                case 6:
                    document.getElementById("iffalseContainer").style.display = "none";
                    document.getElementById("actionsError").style.display = null;
                    document.getElementById("divValueError2").style.width = "100%";
                    document.getElementById("divValueError2").style.marginBottom = "10px";
                    break;
            }
        };

        glob.onComparisonChanged(document.getElementById("iffalse"));

        glob.formatItem = function (data) {
            let result = '<div style="display: inline-block; width: 200px; padding-left: 8px;">';
            const type = parseInt(data.type);
            const storage = ["Easter Egg", "Variável Temporária", "Variável Servidor", "Variável Global"];

            switch(type) {
                case 0:
                    result += `Anexo Local: ${data.fileName}.${data.fileFormat} > ${data.filePath}`;
                    break;
                case 1:
                    result += `Anexo Web URL: ${data.filePath}`;
                    break;
                case 2:
                    result += `Canvas: ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
                    break;
                case 3:
                    result += `Enviar variável: ${storage[parseInt(data.storage, 10)]} (${data.varName})`;
                    break;
            }

            result += `</div>`;
            return result;
        };
    },

    action(cache) {
        const data = cache.actions[cache.index];
        const _this = this;

        const user = this.evalMessage(data.username, cache);
        const pass = this.evalMessage(data.password, cache);
		const replyto = this.evalMessage(data.replyto, cache);
        const mailto = this.evalMessage(data.mailto, cache);
        const mailcc = this.evalMessage(data.mailcc, cache);
        const mailbcc = this.evalMessage(data.mailbcc, cache);
        const subjectvalue = this.evalMessage(data.subject, cache);
        const textvalue = this.evalMessage(data.text, cache);
        const typevalue = parseInt(data.type, 10);
        const host = this.evalMessage(data.hostname, cache);
        const port = this.evalMessage(data.portname, cache);
        const secure = Boolean(data.sec);

        const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });

        const branches = data.branches;
        const attachments = [];

        for (var i = 0; i < branches.length; i++) {
            const branch = branches[i];
            const type = parseInt(branch.type);
            let obj;

            const fileName = this.evalMessage(branch.fileName, cache);
            const fileFormat = this.evalMessage(branch.fileFormat, cache);
            const filePath = this.evalMessage(branch.filePath, cache);

            switch (type) {
                case 0:
                    obj = {
                        filename: `${fileName}.${fileFormat}`,
                        path: `${filePath}/${fileName}.${fileFormat}`
                    }
                    break;
                case 1:
                    obj = {
                        filename: `${fileName}.${fileFormat}`,
                        path: filePath
                    }
                    break;
                case 2:
                    const Canvas = require("canvas");
                    const img = this.getVariable(branch.storage, branch.varName, cache);

                    const image = new Canvas.Image();
                    image.src = img;
                    image.onload = enviar();

                    function enviar() {
                        const canvas = Canvas.createCanvas(image.width, image.height)
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(image, 0, 0, image.width, image.height);

                        const buffer = canvas.toBuffer("image/png");

                        obj = {
                            filename: `${fileName}.png`,
                            content: buffer
                        }
                    };
                    break;
                case 3:
                    obj = {
                        filename: `${fileName}.${fileFormat}`,
                        content: this.getVariable(branch.storage, branch.varName, cache)
                    }
                    break;
            }

            attachments.push(obj);
        }

        let mailOptions;
        switch (typevalue) {
            case 0:
                mailOptions = {
                    from: user,
                    to: mailto,
                    cc: mailcc,
                    bcc: mailbcc,
					replyTo: replyto,
                    subject: subjectvalue,
                    text: textvalue,
                    attachments: attachments
                };
                break;
            case 1:
                mailOptions = {
                    from: user,
                    to: mailto,
                    cc: mailcc,
                    bcc: mailbcc,
					replyTo: replyto,
                    subject: subjectvalue,
                    html: textvalue,
                    attachments: attachments
                };
                break;
			case 2:
                mailOptions = {
                    from: user,
                    to: mailto,
                    cc: mailcc,
                    bcc: mailbcc,
					replyTo: replyto,
                    subject: subjectvalue,
                    amp: textvalue,
                    attachments: attachments
                };
                break;
        }

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return erro(error);
            } else {
                _this.callNextAction(cache);
            }
        });

        function erro(err) {
            if (data.errcmd) _this.displayError(data, cache, err);

            if (data.iffalse == "5") return _this.executeSubActions(data.actionsError, cache);
            if (data.iffalse == "6") return _this.executeSubActionsThenNextAction(data.actionsError, cache);

            return _this.executeResults(false, data, cache);
        }

    },

    mod() { },
};