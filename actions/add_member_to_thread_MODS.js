module.exports = {
    name: "Add Member to Thread MOD",
    section: "Channel Control",
    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]<br>[XinXyla - 172782058396057602]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle(data, presets) {

        if(data.descriptionx == true){
          desccor = data.descriptioncolor
          } else {
            desccor = 'none'
          }
    
        const storeTypes = presets.variables;

        return data.description
        ? `<font style="color:${desccor}">${data.description}</font>`
        : `<font style="color:${desccor}">${storeTypes[parseInt(data.storage, 10)]} (${data.varName})</font>`
      },

    fields: ["storage", "varName", "member", "varName2", "iffalse", "iffalseVal","descriptioncolor","description","descriptionx"],


    html(isEvent, data) {
        return `
        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
        <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>

        <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    
        <div id="flutuador" style="padding:0px 0px 15px 0px">
    <table style="width:100%;"><tr>
    <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

      <retrieve-from-variable dropdownLabel="Thread" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></retrieve-from-variable>
      
      <br><br><br><br>

      <member-input dropdownLabel="Membro" selectId="member" variableContainerId="varNameContainer2" variableInputId="varName2"></member-input>
      
      <br><br><br><br>
    
      <div style="float: left; width: 35%">
        <span class="dbminputlabel">Caso falhe</span><br>
        <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
            <option value="0" selecionado>Continuar ações</option>
            <option value="1">Parar sequência de ação</option>
            <option value="2">Ir para a ação</option>
            <option value="3">Pular as próximas ações</option>
            <option value="4">Ir para a âncora de ação</option>
        </select>
      </div>

      <div id="iffalseContainer" style="display: none; float: right; width: 60%;">
        <span id="xinelas" class="dbminputlabel">Para</span>
        <br>
        <input id="iffalseVal" class="round" name="actionxinxyla" type="text">
     </div>
     </div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
    `;
    },


    init() {
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

    async action(cache) {
        const data = cache.actions[cache.index];
        const storage = parseInt(data.storage, 10);
        const varName = this.evalMessage(data.varName, cache);
        const th = this.getVariable(storage, varName, cache);
        const member = await this.getMemberFromData(data.member, data.varName2, cache);

        try { 
            await th.members.add(member.id);
            this.callNextAction(cache);
        } catch {
            this.executeResults(false, data, cache);
        }
    },

    mod() { },
};