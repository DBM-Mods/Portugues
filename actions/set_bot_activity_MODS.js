module.exports = {
  name: "Set Bot Activity MOD",
  section: "Bot Client Control",
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle: function (data) {
    const activities = [
      "Jogando",
      "Ouvindo",
      "Assistindo",
      "Transmitindo",
      "Competindo",
      "Nenhum"
    ];

    const stats = ["Online", "Ausente", "Invisível", "Ocupado"];

    return `Status: ${stats[data.stats]} - ${activities[data.activity]} ${data.nameText}`;
  },


  fields: ["activity", "nameText", "url", "stats"],


  html: function (isEvent, data) {
    return `

        <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

     
						<div style="display: flex;">
							<div style="width: 50%; padding-right: 10px">
								 <span class="dbminputlabel">Tipo</span><br>
								<select id="activity" class="round" style="width: 100%;" onchange="glob.onComparisonChanged(this)">
									<option value="0">Jogando</option>
									<option value="1">Ouvindo</option>
									<option value="2">Assistindo</option>
									<option value="3">Transmitindo</option>
                  <option value="4">Competindo</option>
                  <option value="5">Nenhum</option>
								</select>
							</div>
							<div style="width: 50%; padding-left: 10px">
								 <span class="dbminputlabel">Status</span><br>
								<select id="stats" class="round" style="width: 100%;">
									<option value="0">Online</option>
									<option value="1">Ausente</option>
									<option value="2">Invisível</option>
									<option value="3">Ocupado</option>
								</select>
							</div>
						</div>
						<br>
						 <span class="dbminputlabel">Nome da atividade</span><br>
						<input id="nameText" class="round" type="text" style="width: 100%;"><br>
            
<div id="containerxin" class="hidden">
							 <span class="dbminputlabel">URL</span><br>
							<input id="url" class="round" type="text" autofocus="autofocus" style="width: 100%;">
						</div>

  <style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>`;
  },



  init: function () {
    const { glob, document } = this;


    glob.onComparisonChanged = function (event) {
      if (event.value == 3) {
        document.getElementById("containerxin").style.display = "block";
      }
      else {
        document.getElementById("containerxin").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("activity"));

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
    const botClient = this.getDBM().Bot.bot.user;
    const data = cache.actions[cache.index];

    const nameText = this.evalMessage(data.nameText, cache);
    const url = this.evalMessage(data.url, cache);
    const activitys = parseInt(data.activity);
    const stats = parseInt(data.stats);

    let obj;

    let target;
    if (activitys >= 0) {
      switch (activitys) {
        case 0:
          target = "PLAYING";
          break;
        case 1:
          target = "LISTENING";
          break;
        case 2:
          target = "WATCHING";
          break;
        case 3:
          target = "STREAMING";
          break;
        case 4:
          target = "COMPETING";
          break;
        case 5:
          target = "CUSTOM";
          break;
      }
    }

    let statustarget;
    if (stats >= 0) {
      switch (stats) {
        case 0:
          statustarget = "online";
          break;
        case 1:
          statustarget = "idle";
          break;
        case 2:
          statustarget = "invisible";
          break;
        case 3:
          statustarget = "dnd";
          break;
      }
    }

    if (botClient) {
      if (nameText) {
        if (target === "STREAMING") {
          obj = {
            activities: [{ name: nameText, type: target, url: url }],
            status: statustarget,
          }
        } else {
          obj = {
            activities: [{ name: nameText, type: target }],
            status: statustarget,
          }
        }
      }
    }


    try {

      botClient
        .setPresence(obj)

    } catch (error) {
      console.log('ERROR: ' + cache.toString() + ' - Action ' + (cache.index + 1) + '# ' + data.name);
      console.log(`${error.stack ? error.stack : error}`);
    }


    this.callNextAction(cache);

  },



  mod: function (DBM) { }
};
