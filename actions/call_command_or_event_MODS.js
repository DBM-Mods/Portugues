module.exports = {
  name: 'Call Command/Event MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    if(data.descriptionx == true){
      desccor = data.descriptioncolor
      } else {
        desccor = 'none'
      }

    let source;
    if (parseInt(data.sourcetype, 10) === 4) {
      source = 'Mesmo evento';
    }
    if (parseInt(data.sourcetype, 10) === 3) {
      source = 'Mesmo comando';
    }
    if (parseInt(data.sourcetype, 10) === 2) {
      source = 'Nome do comando: ' + data.source3.toString();
    }
    if (parseInt(data.sourcetype, 10) === 1) {
      source = 'ID do comando: ' +data.source2.toString();
    } 
    if (parseInt(data.sourcetype, 10) === 0 || data.sourcetype == undefined) {
      source = 'Lista > comando: ' +data.source.toString();
    }
    return data.description
        ? `<font style="color:${desccor}">${data.description}</font>`
        : `<font style="color:${desccor}">${source}</font>`
  },

  fields: ['sourcetype', 'source', 'source2', 'source3', 'type', "description", "descriptionx", "descriptioncolor"],

  html() {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.5</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

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
        cursor: pointer
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
        cursor: pointer
      }
    </style>


<span class="dbminputlabel">Tipo de fonte</span><br>
  <select id="sourcetype" class="round" onchange="glob.onChange1(this)">
    <option value="0" selected>Escolha da lista</option>
    <option value="1">Inserir o ID do comando/evento</option>
    <option value="2">Inserir o nome do comando/evento</option>
    <option value="3">Mesmo comando</option>
    <option value="4">Mesmo evento</option>
  </select>

<div id="info1"; style="float: left; width: 100%; padding-top: 20px; display: none;">
<span class="dbminputlabel">Comando/Evento</span><br>
  <select id="source" class="round2">
    <optgroup id="commands" label="Commands"></optgroup>
    <optgroup id="events" label="Events"></optgroup>
  </select>
  <input type="text" id="filtrodoxinxyla" class="round" placeholder="Filtrar opções...">
</div>
<div id="info2" style="float: left; width: 100%; padding-top: 20px;">
<span class="dbminputlabel">ID do comando/evento</span><br>
  <input id="source2" class="round" type="text" placeholder="">
</div>
<div id="info3" style="float: left; width: 100%; padding-top: 20px;">
<span class="dbminputlabel">Nome do comando/evento</span><br>
  <input id="source3" class="round" type="text" placeholder="">
</div>
<div style="float: left; width: 100%; padding-top: 20px;">
<span class="dbminputlabel">Tipo de chamada</span><br>
  <select id="type" class="round">
  <option value="true" selected>Aguarde a conclusão</option>
  <option value="false">Executar simultaneamente</option>
  </select>
</div>

</div>
<style>
.round2{width:100%;height:30px;outline:0}
.round2 option{padding:3px 8px;text-align:left}
.round2 optgroup{text-align:center;padding:4px 0px;}

.abrir {
  height: 30px;
  animation: abrir .5s forwards;
}

@keyframes abrir {
  from {
    height: 30px;
  }
  to {
    height: 160px;
  }
}

.fechar {
  height: 160px;
  animation: fechar .5s forwards;
}

@keyframes fechar {
  from {
    height: 160px;
  }
  to {
    height: 30px;
  }
}

</style>`;
  },

  init() {
    const { glob, document } = this;

    const xinelaslinks = document.getElementsByClassName("xinelaslink");
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

    const { $cmds } = glob;
    const coms = document.getElementById('commands');
    coms.innerHTML = '';
    for (let i = 0; i < $cmds.length; i++) {
      if ($cmds[i]) {
        coms.innerHTML += `<option value="${$cmds[i]._id}">${$cmds[i].name}</option>\n`;
      }
    }

    const { $evts } = glob;
    const evet = document.getElementById('events');
    evet.innerHTML = '';
    for (let i = 0; i < $evts.length; i++) {
      if ($evts[i]) {
        evet.innerHTML += `<option value="${$evts[i]._id}">${$evts[i].name}</option>\n`;
      }
    }

    glob.onChange1 = function onChange1(event) {
      const sourceType = parseInt(document.getElementById('sourcetype').value, 10);
      const info1 = document.getElementById('info1');
      const info2 = document.getElementById('info2');
      const info3 = document.getElementById('info3');

      switch (sourceType) {
        case 0:
          info1.style.display = null;
          info2.style.display = 'none';
          info3.style.display = 'none';
          break;
        case 1:
          info1.style.display = 'none';
          info2.style.display = null;
          info3.style.display = 'none';
          break;
        case 2:
          info1.style.display = 'none';
          info2.style.display = 'none';
          info3.style.display = null;
          break;
        case 3:
          info1.style.display = 'none';
          info2.style.display = 'none';
          info3.style.display = 'none';
          break;
        default:
          break;
      }
    };

    glob.onChange1(document.getElementById('sourcetype'));

    document.getElementById("source").addEventListener("click", function () {
      document.getElementById("source").classList.add("abrir");
      document.getElementById("source").classList.remove("fechar");
      this.size = this.options.length;
    });

    document.getElementById("source").addEventListener("blur", function () {
      this.size = 1;
      document.getElementById("source").classList.remove("abrir");
      document.getElementById("source").classList.add("fechar");
      document.getElementById("source").style.height = "30px";
    });
    
    document.getElementById("filtrodoxinxyla").addEventListener("keyup", function () {
      var select = document.getElementById("source");
      var optgroups = select.getElementsByTagName("optgroup");
      var filter = this.value.toLowerCase();
      var options = document.getElementById("source").options;
      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.text.toLowerCase().indexOf(filter) === -1) {
          option.style.display = "none";
        } else {
          option.style.display = "";
        }
      }

      for (var i = 0; i < optgroups.length; i++) {
        var optgroup = optgroups[i];
        var options = optgroup.getElementsByTagName("option");
        var visibleOptions = 0;
        for (var j = 0; j < options.length; j++) {
          if (options[j].style.display !== "none") {
            visibleOptions++;
          }
        }
        if (visibleOptions === 0) {
          optgroup.style.display = "none";
        } else {
          optgroup.style.display = "";
        }
      }

      document.getElementById("source").dispatchEvent(new Event("click"));
    });

  },

  action(cache) {
    const data = cache.actions[cache.index];
    const { Files } = this.getDBM();
    source = this.evalMessage(data.source, cache)
    source2 = this.evalMessage(data.source2, cache)
    source3 = this.evalMessage(data.source3, cache)

    let id;

    if (data.sourcetype == "0" || data.sourcetype == undefined) {
      id = source
    }

    if (data.sourcetype == "1") {
      id = source2
      if (!id) return console.log('Insira um ID de comando/evento!')
    }

    let name;

    if (data.sourcetype == "2") {
      name = source3
      if (!name) return console.log('Insira um nome de um comando/evento!')
    }

    if (data.sourcetype == "3") {
    const jp = this.getMods().require('jsonpath');
    var interaction = cache.interaction;

    if(interaction){
      command = jp.query(
        this.getDBM().Files.data.commands,
        `$..[?(@.name=="${cache.meta.name}")]`,
      );
      } else {
        command = jp.query(
          this.getDBM().Files.data.commands,
          `$..[?(@.name=="${cache.msg.content
            .slice(this.getDBM().Files.data.settings.tag.length || cache.server.tag.length)
            .split(/ +/)
            .shift()}")]`,
        )
        }
        
        idsave = jp.query(command, '$.._id')
        id = idsave.toString()
      }

      if (data.sourcetype == "4") {
        const jp2 = this.getMods().require('jsonpath');
        command2 = jp2.query(
          this.getDBM().Files.data.events,
          `$..[?(@.name=="${cache.meta.name}")]`,
        );
        idsave2 = jp2.query(command2, '$.._id')
        id = idsave2.toString()
      }

    let actions;

    const allData = Files.data.commands.concat(Files.data.events);
    for (let i = 0; i < allData.length; i++) {

      if (data.sourcetype == "0" || data.sourcetype == "1" || data.sourcetype == "3" || data.sourcetype == "4" || data.sourcetype == undefined) {
        if (allData[i] && allData[i]._id === id) {
          actions = allData[i].actions;
          break;
        }
      }
      if (data.sourcetype == "2") {
        if (allData[i] && allData[i].name === name) {
          actions = allData[i].actions;
          break;
        }
      }
    }
    if (!actions) {
      this.callNextAction(cache);
      return;
    }

    const waitForCompletion = data.type === "true";
    let callback = null;
    if (waitForCompletion) {
      callback = () => this.callNextAction(cache);
    }
    this.executeSubActions(actions, cache, callback);
    if (!waitForCompletion) {
      this.callNextAction(cache);
    }
  },


  mod() {},
};
