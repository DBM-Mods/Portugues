module.exports = {
    name: "Function MOD",
    section: "Other Stuff",
    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]<br>[XinXyla - 172782058396057602]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data, presets) {
        if (data.descriptionx == true) {
            desccor = data.descriptioncolor;
        } else {
            desccor = "none";
        }

        return data.description
            ? `<font style="color:${desccor}">${data.nome} | ${data.description}</font>`
            : `<font style="color:${desccor}">${data.nome}</font>`
    },



    fields: ["descriptioncolor", "description", "descriptionx", "nome", "actions"],


    html(isEvent, data) {
        return `
<div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
<div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

<tab-system>
    <tab label="Actions" icon="home">
        <div style="margin-top: 10px;">
            <span class="dbminputlabel">Nome da função</span>
            <input type="text" id="nome" class="round">

            <br>

            <action-list-input id="actions" height="calc(100vh - 320px)"></action-list-input>
        </div>
    </tab>
    <tab label="Config" icon="cogs">
        <div id="flutuador" style="padding: 0px 0px 15px 0px; margin-top: 10px;">
            <table style="width:100%;">
                <tr>
                    <td>
                        <span class="dbminputlabel">Descrição da Action</span>
                        <br>
                        <input type="text" class="round" id="description" placeholder="Deixe vazio para remover">
                    </td>
                    <td style="padding: 0px 0px 0px 10px; width: 70px;">
                        <div style="float: left; padding: 0px 0px 0px 7px; margin-top: -5px">
                            <dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox>
                        </div>
                        <br>
                        <input type="color" value="#ffffff" class="round" id="descriptioncolor">
                    </td>
                </tr>
            </table>
        </div>
    </tab>
</tab-system>


<style>
    .dbmmodsbr1 {
        position: absolute;
        bottom: 0px;
        border: 0px solid rgba(50, 50, 50, 0.7);
        background: rgba(0, 0, 0, 0.7);
        color: #999;
        padding: 5px;
        left: 0px;
        z-index: 999999;
        cursor: pointer
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
        cursor: pointer
    }
</style>`;
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
    },

    action(cache) {
        this.callNextAction(cache);
    },

    modInit(data) {
        this.prepareActions(data.actions);
    }
};
