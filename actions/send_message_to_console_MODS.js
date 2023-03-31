module.exports = {
  name: 'Send Message to Console MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },



subtitle(data, presets) {

  if(data.descriptionx == true){
    desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

  const storage = presets.variables;

  if (data.retornar == 0 || data.retornar == 2) {

    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">${data.tosend}</font>`

  }
if (data.retornar == 1) {
  return data.description
  ? `<font style="color:${desccor}">${data.description}</font>`
  : `<font style="color:${desccor}">Ver objeto da ${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
}


},

  fields: ['retornar', 'tosend', 'color' ,'bg' , 'storage', 'varName','descriptioncolor','description','descriptionx'],

  html (isEvent, data) {
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


    <div style="width:100%;">
        <span class="dbminputlabel">Retornar</span>
        <select id="retornar" class="round" onchange="glob.onChange1(this)">
            <option value="0" selected>Texto com cor no console</option>
            <option value="2">Texto com cor no console via EVAL</option>
            <option value="1">Mostrar informações do objeto da variável</option>
        </select>
    </div>
  <br>

  <div id="xinxyla1">
  <div style="float: left; width: 45%;">
  <span class="dbminputlabel">Variavel Objeto</span><br>
    <select id="storage" class="round" onchange="glob.refreshVariableList(this)">
      ${data.variables[1]}
    </select><br>
  </div>
  <div id="varNameContainer" style="float: right; width: 50%;">
  <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList"><br>
  </div>
  </div>

  <div id="xinxyla2">
  <div id="xinxyla3">

  <table><tr><td class="xinelasx">
<span class="dbminputlabel">Cor do Fundo</span><br>
<table style="width:100%"><tr><td><input id="bg" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para desativar..."><td>
<td style="width:40px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
   document.getElementById('bg').type = 'color'
  document.getElementById('2btr1').style.display = 'none';
  document.getElementById('2btr2').style.display = 'block';
  })()"><button class="tiny compact ui icon button">Cor</button></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
    document.getElementById('bg').type = 'text';
    document.getElementById('2btr1').style.display = 'block';
    document.getElementById('2btr2').style.display = 'none';
    })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
   </td><td class="xinelasx">

    <span class="dbminputlabel">Cor do Texto</span><br>
    <table style="width:100%"><tr><td><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para desativar..."><td>
    <td style="width:40px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
       document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table>
        </td></tr></table>
 <br>
 </div>

<div>
<span class="dbminputlabel">Mensagem para enviar</span><br>
  <textarea id="tosend" rows="6" style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
  <div id="xinxyla4" style="padding:10px">
  <center>Exemplo<br>
  chalk.hex('#c01111')('texto') + chalk.hex('#1cc819')('texto2') + chalk.bgHex('#1cc819')('texto3') + chalk.hex('#111111').bgHex('#1cc819')('texto4')</center>
  </div>
</div>
</div>

</div>

<style>
table{width:100%}
.xinelasx{width:50%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>
`
  },

  init: function() {
    const {glob, document} = this;

    glob.onChange1 = function (event) {
        const value = parseInt(event.value, 10);
        if (value == 0) {
          document.getElementById("xinxyla2").style.display = null;
          document.getElementById("xinxyla1").style.display = "none";
          document.getElementById("xinxyla3").style.display = null;
          document.getElementById("xinxyla4").style.display = "none";
        }
        if (value == 1) {
          document.getElementById("xinxyla1").style.display = null;
          document.getElementById("xinxyla2").style.display = "none";
          document.getElementById("xinxyla3").style.display = null;
          document.getElementById("xinxyla4").style.display = "none";
        } 
        if (value == 2) {
          document.getElementById("xinxyla2").style.display = null;
          document.getElementById("xinxyla1").style.display = "none";
          document.getElementById("xinxyla3").style.display = "none";
          document.getElementById("xinxyla4").style.display = null;
        }
      };
  
        glob.onChange1(document.getElementById("retornar"));

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

  action (cache) {
    const data = cache.actions[cache.index]
    const retornar = this.evalMessage(data.retornar, cache)
    var color = this.evalMessage(data.color, cache)
    var bg = this.evalMessage(data.bg, cache)

    if(retornar == "0"){
      const chalk = require('chalk')
      const send = this.evalMessage(data.tosend, cache)
    if (send.length > 0) {

      if(color == "" && bg == ""){

        console.log(send)
        this.callNextAction(cache)

      } else {

        if(color.length > 0 && bg.length > 0){


        console.log(chalk.hex(color).bgHex(bg)(send))
        this.callNextAction(cache)

        } else {

          if(color.length > 0 && bg == ""){

            console.log(chalk.hex(color)(send))
            this.callNextAction(cache)
          } else {
            console.log(chalk.bgHex(bg)(send))
            this.callNextAction(cache)
          }

        }
    

      }


    } else {
      console.log(`Forneça algo para registrar: Ação #${cache.index + 1}`)
      this.callNextAction(cache)
    }}


    if(retornar == "1"){
      const storage = parseInt(data.storage)
      const varName = this.evalMessage(data.varName, cache)
      const objdata = this.getVariable(storage, varName, cache)
      console.log(objdata)
      this.callNextAction(cache)
      }

      if(retornar == "2"){
        const chalk = require('chalk')
        const send = this.evalMessage(data.tosend, cache)
      if (send.length > 0) {
  
  
          console.log(eval(String(this.evalMessage(data.tosend, cache))))
          this.callNextAction(cache)
  
      } else {
        console.log(`Forneça algo para registrar: Ação #${cache.index + 1}`)
        this.callNextAction(cache)
      }}
    


  },

  mod () {}
}
