module.exports = {
  name: 'Send Message to Console MOD',
  section: 'Other Stuff',
  meta: {
    version: '2.1.6',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data, presets) {
    const storage = presets.variables;
    if (data.retornar == 0 && data.tosend.length > 0) {
      return `<font color="${data.color}">${data.tosend}</font>`
    } else {'Please enter a message!'}
  if (data.retornar == 1 && data.varName.length > 0) {
    return `Ver objeto da ${storage[parseInt(data.storage, 10)]} (${data.varName})`
  }
  return 'Coloque uma variável'
},

  fields: ['retornar', 'tosend', 'color' , 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <div style="width:100%;">
        <span class="dbminputlabel">Retornar</span>
        <select id="retornar" class="round" onchange="glob.onChange1(this)">
            <option value="0" selected>Texto com cor no console</option>
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
    <span class="dbminputlabel">Cor</span><br>
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
 
<div style="padding-top: 8px;">
<span class="dbminputlabel">Mensagem para enviar</span><br>
  <textarea id="tosend" rows="6" style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
</div>
</div>`
  },

  init: function() {
    const {glob, document} = this;

    glob.onChange1 = function (event) {
        const value = parseInt(event.value, 10);
        if (value == 1) {
          document.getElementById("xinxyla1").style.display = null;
          document.getElementById("xinxyla2").style.display = "none";
        } else {
          document.getElementById("xinxyla2").style.display = null;
          document.getElementById("xinxyla1").style.display = "none";
        }
      };
  
        glob.onChange1(document.getElementById("retornar"));
    },

  action (cache) {
    const data = cache.actions[cache.index]
    const retornar = this.evalMessage(data.retornar, cache)
    

    if(retornar == "0"){
      const Mods = this.getMods()
      const chalk = Mods.require('chalk')
      const send = this.evalMessage(data.tosend, cache)
    if (send.length > 0) {
      const color = this.evalMessage(data.color, cache)
      console.log(chalk.hex(color)(send))
      this.callNextAction(cache)
    } else {
      console.log(chalk.gray(`Forneça algo para registrar: Ação #${cache.index + 1}`))
      this.callNextAction(cache)
    }}


    if(retornar == "1"){
      const storage = parseInt(data.storage)
      const varName = this.evalMessage(data.varName, cache)
      const objdata = this.getVariable(storage, varName, cache)
      console.log(objdata)
      this.callNextAction(cache)
      }
    


  },

  mod (DBM) {
    DBM.Actions['Send Message to Console (Logs)'] = DBM.Actions['Send Message to Console MOD']
  }
}
