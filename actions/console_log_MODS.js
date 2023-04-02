
module.exports = {
  name: 'Console Log MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    3

    const info = [
      "Redirecionar tudo para o Console",
      "Redirecionar tudo para um arquivo .txt",
      "Salvar em um arquivo .txt e também exibir no Console",
      "Salvar em um arquivo .txt e também exibir no Console com data e hora",
    ]

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Saída: ${info[parseInt(data.console, 10)]}</font>`
  },


  fields: ["console", "local", "descriptioncolor", "description", "descriptionx"],

  html(data, isEvent) {
    return `
      <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
      <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>
  
      <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">
  
      <div id="flutuador" style="padding:0px 0px 15px 0px">
  <table style="width:100%;"><tr>
  <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
  <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
  </tr></table>
  </div>
      

        <span class="dbminputlabel">Saídas do Console Log</span><br>
        <select id="console" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0" selected>Redirecionar tudo para o Console</option>
        <option value="1">Redirecionar tudo para um arquivo .txt</option>
        <option value="2">Salvar em um arquivo .txt e também exibir no Console</option>
        <option value="3">Salvar em um arquivo .txt e também exibir no Console com data e hora</option>
        </select><br>
        </td></tr></table>

      <div id="containerxin">
        <span class="dbminputlabel">Local e nome que o arquivo será salvo</span><br>
        <input id="local" value="consolelog" class="round" type="text">
        </div>        


        </div>

        <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`;
  },


  init() {
    const { document } = this

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

    glob.onComparisonChanged = function (event) {
      if (event.value > 0) {
        document.getElementById("containerxin").style.display = "block";
      }
      else {
        document.getElementById("containerxin").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("console"));

  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const local = this.evalMessage(data.local, cache)

    const fs = require('fs');
    const path = require('path');

    const dir = path.dirname(local);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const stream = fs.createWriteStream(local + '.txt', { flags: 'a' });

    const { Console } = require('console');
    const logger = new Console({ stdout: stream, stderr: stream });

    if (data.console == "1") {

      console.log('Todos os logs serão redirecionados para: ' + local + '.txt');

      console.log = logger.log.bind(logger);

      process.on('exit', () => {
        stream.end();
      });

    }

    if (data.console == "0") {

      console.log('Todos os logs serão redirecionados para o console log agora');

      console.log = logger.log.bind(logger);

      async function closeLogFile() {
        await new Promise((resolve, reject) => {
          stream.end(resolve);
        });
        console.log = Console.prototype.log;
      }

      closeLogFile();

    }

    if (data.console == "2") {

      console.log('Todos os logs serão salvos em: ' + local + '.txt');

      const oldConsoleLog = console.log;

      console.log = function () {
        const args = Array.from(arguments);
        logger.log.apply(logger, args);
        oldConsoleLog.apply(console, args);
      };


      process.on('exit', () => {
        stream.end();
      });

    }

    if (data.console == "3") {


      async function closeLogFile() {
        await new Promise((resolve, reject) => {
          stream.end(resolve);
        });
        console.log = Console.prototype.log;
        nova()
      }

      closeLogFile();

      function nova() {

        const stream = fs.createWriteStream(local + '.txt', { flags: 'a' });

        const { Console } = require('console');
        const logger = new Console({ stdout: stream, stderr: stream });

        console.log('Todos os logs serão salvos em: ' + local + '.txt');

        const moment = require('moment-timezone');

        const oldConsoleLog = console.log;

        console.log = function () {
          const args = Array.from(arguments);
          const now = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
          args.unshift(`[${now}]`);
          logger.log.apply(logger, args);
          oldConsoleLog.apply(console, args);
        };


        process.on('exit', () => {
          stream.end();
        });

      }



    }

    this.callNextAction(cache)



  },

  mod() { },
};
