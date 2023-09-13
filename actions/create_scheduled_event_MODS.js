module.exports = {
    name: "Create Scheduled Event MOD",
    section: "Scheduled Event",
    meta: {
        version: "2.1.7",
        preciseCheck: true,
        author: "[tempestdbm - 321400509326032897]",
        authorUrl: "https://github.com/DBM-Mods/Portugues",
        downloadURL: "https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip",
    },

    subtitle(data, presets) {
        if (data.descriptionx == true) {
            desccor = data.descriptioncolor;
        } else {
            desccor = "none";
        }

        return data.description
            ? `<font style="color:${desccor}">${data.description}</font>`
            : `<font style="color:${desccor}">${data.nome} > ${data.local == "3" ? data.location : presets.getChannelText(data.channel, data.varName2)}</font>`
    },

    variableStorage(data, varType) {
        if (data.storage == varType) return [data.varName3, "Evento"];
    },

    fields: ["server", "varName", "nome", "reason", "local", "channel", "varName2", "location", "descricao", "startTime", "endTime", "image", "storage", "varName3", "description", "descriptionx", "descriptioncolor", "iffalse", "iffalseVal", "actionsError", "errcmd"],

    html(isEvent, data) {
        return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <tab-system>
        <tab label="Evento" icon="align left">
            <div style="margin: 5px; height: calc(100vh - 210px); overflow: auto;">
                <server-input dropdownLabel="Servidor" selectId="server" variableContainerId="varNameContainer" variableInputId="varName"></server-input>

                <br><br><br>

                <span class="dbminputlabel">Nome do evento</span>
                <input type="text" class="round" id="nome">

                <br>

                <span class="dbminputlabel">Motivo</span>
                <input type="text" class="round" id="reason" placeholder="Opcional">

                <br>

                <span class="dbminputlabel">Local do evento</span>
                <select class="round" id="local" onchange="glob.change(this)">
                    <option value="1">Canal de palco</option>
                    <option value="2">Canal de voz</option>
                    <option value="3">Local externo</option>
                </select>

                <br>

                <div id="divValue">
                    <voice-channel-input dropdownLabel="Canal" selectId="channel" variableContainerId="varNameContainer2" variableInputId="varName2"></voice-channel-input>
                    <br><br><br>
                </div>

                <div id="divValue2">
                    <span class="dbminputlabel">Localização</span>
                    <input type="text" class="round" id="location" placeholder="Coloque a localização, um link ou algo assim.">
                    <br>
                </div>

                <span class="dbminputlabel">Descrição</span>
                <textarea type="text" class="round" id="descricao" placeholder="Opcional"></textarea>

                <br>

                <table style="width: 100%;">
                    <td>
                        <span class="dbminputlabel">Timestamp de início</span>
                        <input type="text" class="round" id="startTime">
                    </td>
                    <td style="padding-left: 18px;">
                        <span class="dbminputlabel">Timestamp de termino</span>
                        <input type="text" class="round" id="endTime">
                    </td>
                </table>

                <br>

                <span class="dbminputlabel">Imagem(Opcional)</span>
                <input type="text" class="round" id="image" placeholder="Imagem local ou URL">

                <br>

                <store-in-variable allowNone dropdownLabel="Armazenar em" selectId="storage" variableContainerId="varNameContainer3" variableInputId="varName3"></store-in-variable>
            </div>
        </tab>
        <tab label="Config" icon="cogs">
            <div style="margin: 5px;">
            <div id="flutuador" style="padding:0px 0px 15px 0px">
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

            <span class="dbminputlabel">Opções</span>
            <br>
            <div style="padding: 10px; background: rgba(0,0,0,0.2);">
                <dbm-checkbox id="errcmd" label="Exibir o erro no console" checked></dbm-checkbox>
            </div>

            <br>
            
            <div style="float: left; width: 40%">
                <span class="dbminputlabel">Caso não encontre o canal</span>
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
            
            <action-list-input id="actionsError" style="margin-top: 50px;" height="calc(100vh - 400px)"></action-list-input>
          
            </div>
        </tab>
    </tab-system>

    <style>
      .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
      .dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
    </style>

`;
    },

    init() {
        const xinelaslinks = document.getElementsByClassName("xinelaslink");
        for (let x = 0; x < xinelaslinks.length; x++) {
            const xinelaslink = xinelaslinks[x];
            const url = xinelaslink.getAttribute("data-url");
            if (url) {
                xinelaslink.setAttribute("title", url);
                xinelaslink.addEventListener("click", (e) => {
                    e.stopImmediatePropagation();
                    console.log(`Launching URL: [${url}] in your default browser.`);
                    require("child_process").execSync(`start ${url}`);
                });
            }
        }

        glob.change = function (event) {
            if (event.value == "3") {
                document.getElementById("divValue").style.display = "none";
                document.getElementById("divValue2").style.display = "block";
            } else {
                document.getElementById("divValue").style.display = "block";
                document.getElementById("divValue2").style.display = "none";
            }
        };

        glob.change(document.getElementById("local"));

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
        const server = await this.getServerFromData(data.server, data.varName, cache);
        const local = Number(data.local);

        const moment = require("moment");

        const eventData = {
            reason: this.evalMessage(data.reason, cache),
            name: this.evalMessage(data.nome, cache),
            description: this.evalMessage(data.descricao, cache),
            privacyLevel: 2,
            entityType: local,
            scheduledStartTime: moment(this.evalMessage(data.startTime, cache), "X"),
            scheduledEndTime: moment(this.evalMessage(data.endTime, cache), "X"),
        };

        if (local == 3) {
            eventData.entityMetadata = {};
            eventData.entityMetadata.location = this.evalMessage(data.location, cache);
        } else {
            const channel = await this.getVoiceChannelFromData(data.channel, data.varName2, cache);
            eventData.channel = channel;
        }

        if (this.evalMessage(data.image, cache)) {
            const Canvas = require("canvas");
            const image = await Canvas.loadImage(this.evalMessage(data.image, cache));
            const canvas = Canvas.createCanvas(image.width, image.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, image.width, image.height);
            eventData.image = canvas.toDataURL("image/png");
        }

        try {
            const event = await server.scheduledEvents.create(eventData);

            this.storeValue(event, parseInt(data.storage), this.evalMessage(data.varName3, cache), cache);
            this.callNextAction(cache);
        } catch (err) {
            if (data.errcmd) this.displayError(data, cache, err);
            if (data.iffalse == "5") return this.executeSubActions(data.actionsError, cache);
            if (data.iffalse == "99") return this.executeSubActionsThenNextAction(data.actionsError, cache);

            this.executeResults(false, data, cache);
        }
    },

    modInit(data) {
        this.prepareActions(data.actionsError);
    },
};