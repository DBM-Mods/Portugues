module.exports = {
  name: "Custom Data MOD",
  section: "Data",
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
    const changeType = [``, `Alterar(${data.dataName})`,`Adicionar(${data.dataName})`,`Adicionar texto(${data.dataName})`,`Adicionar valor númerico(${data.dataName})`,`Excluir coluna(${data.dataName})`,`Checar(${data.dataName})`,`Excluir todas as colunas`,`Excluir ID`];
    
    return data.description
    ? `<font style="color:${desccor}">${data.description}</font>`
    : `<font style="color:${desccor}">Data(${data.alvo}) / ${changeType[parseInt(data.changeType, 10)]} / ${storage[parseInt(data.storage, 10)]} (${data.varName2})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName2, "Data" ];
  },

  fields: ["pasta", "identidade", "alvo", "dataName", "addType2", "changeType", "value" , "xvalue" , "xvalue2" , "comparison", "valueeval", "defaultVal", "defaultValeval", "addType3", "storage", "varName2", "branch","descriptioncolor","description","descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.2</div>
    <tab-system style="margin-top: 20px;">


  <tab label="Alvo" icon="align left">
  <div id="xin">
  <div id="xinelas">

  <table>
  <tr>
  <td class="sep1" id="xinas"><div id="remcoluna">
  <span class="dbminputlabel">Pasta</span><br>
      <input id="pasta" value="data" placeholder="data/outros" class="round" type="text"></div>
  </td>
  <td class="sep2">
  <span class="dbminputlabel">Nome do arquivo data</span><br>
      <input id="alvo" value="players2" class="round" type="text"></div>
      </td></tr></table>
<br>
      <span class="dbminputlabel">ID</span><br>
      <input id="identidade" class="round" placeholder="Deixe em branco para global" type="text">
      
  </div>
  </div>
  </tab>

  <tab label="Data" icon="align left">
  <div id="xin">
  <table>
  <tr>
  <td class="sep1" id="xinas"><div id="remcoluna">
  <span class="dbminputlabel">Nome da coluna</span><br>
      <input id="dataName" class="round" type="text"></div>
  </td>
  <td class="sep2">
  <span class="dbminputlabel">Tipo de controle</span><br>
  <select id="changeType" class="round"  onchange="glob.onChange3(this)">
    <option value="0" selected>Nenhum</option>
    <option value="1">Alterar</option>
    <option value="2">Adicionar</option>
    <option value="3">Adicionar texto</option>
    <option value="4">Adicionar valor númerico</option>
    <option value="5">Excluir coluna</option>
    <option value="7">Excluir todas as colunas</option>
    <option value="8">Excluir ID</option>
    <option value="9">Excluir tudo</option>
    <option value="6">Checar</option>
  </select>
  
  </td>
  </tr>
  </table>
  <br>
  
  <div id="exclusao2">
  
    <div style="float: left; width: 35%;">
      <span class="dbminputlabel">Tipo de comparação</span><br>
      <select id="comparison" class="round" onchange="glob.onComparisonChanged(this)">
        <option value="0">Existe</option>
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
        <option value="15">Entre</option>
        <option value="16">Possui acentuações?</option>
        <option value="17">Inclui as palavras  ["a" , "b" , "c"]</option>
        <option value="18">É igual as palavras  ["a" , "b" , "c"]</option>
        <option value="19">É um número par?</option>
        <option value="20">É um número ímpar?</option>
        <option value="21">É um número?</option>
        <option value="24">É um texto?</option>
        <option value="22">É uma lista?</option>
        <option value="23">É um URL de imagem?</option>
        <option value="25">É um URL?</option>
      </select>
    </div>
  
    <table style="float: right;width: 65%;"><tr><td style="padding:0px 8px">
  
    <div style="width: 100%" id="directValue">
  
    <span class="dbminputlabel">Valor para comparar</span>
    <input id="xvalue" class="round" type="text">
    </div></td>
  
    <td style="padding:0px 3px";>
    <div style="width: 100%;" id="containerxin">
    <span class="dbminputlabel">e</span><br>
    <input id="xvalue2" class="round" type="text">
    </td></tr></table>
  
  <br><br><br>
  <conditional-input id="branch" style="padding-top: 8px;"></conditional-input>
  <br><br><br>
  </div>
  
  <div id="exclusao">
  
  <span class="dbminputlabel" name="xinelas">Valor</span> <div style="float:right;margin-top:-5px"><dbm-checkbox id="addType2" onchange="glob.onChange2(this)" label="EVAL" checked></dbm-checkbox></div><br>
  <div id="valor"><textarea id="value" rows="4" class="round" style="width:100%"></textarea></div>
  <div style="display:none" id="valoreval"><textarea id="valueeval" rows="4" name="is-eval" class="round" style="width:100%"></textarea></div>
  <br>
  </div>
  </div>
  </tab>

  <tab label="Armazenar" icon="align left">
  <div id="xin">
  <div id="varNameContainer3">
  <span class="dbminputlabel" name="xinelas2">Valor padrão (se os dados não existirem)</span> <div style="float:right;margin-top:-5px"><dbm-checkbox id="addType3" onchange="glob.onChange4(this)" label="EVAL" checked></dbm-checkbox></div><br>
  <div id="valoreval2"><input id="defaultValeval" name="is-eval" class="round" type="text" value="0"></div>
  <div id="valor2"><input id="defaultVal" class="round" type="text" value="0"></div>
  <br>
  </div>
  
  <table>
  <tr>
  <td class="sep1"><span class="dbminputlabel">Armazenar em</span><br>
  <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer2')">
    ${data.variables[0]}
  </select></td>
  <td class="sep0"><div id="varNameContainer2"><span class="dbminputlabel">Nome da Variavel</span><br>
  <input id="varName2" class="round" type="text"></div></td>
  </tr>
  </table>
  <br>
  </div>
  </tab>

  <tab label="Config" icon="settings">
  <div style="width: 100%; padding:10px 5px;height: calc(100vh - 210px);overflow:auto">

  <div id="flutuador" style="padding:0px 0px 15px 0px">
  <table style="width:100%;"><tr>
  <td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
  <td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
  </tr></table>
  </div>
  </div>
  </tab>
  </tab-system>




<style>table{width:100%}
.sep1{width:50%;padding:0px 8px 0px 0px}
.sep2{width:50%;padding:0px 0px 0px 0px}
#xin{padding:12px 8px 8px 8px}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

</style>


`;
  },

  preInit(data, formatters) {
    return formatters.compatibility_2_0_0_iftruefalse_to_branch(data);
  },

  init () {
    const { glob, document } = this

    glob.onComparisonChanged = function (event) {
      if (event.value === "0") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
      } else {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = "none";
      }
      if (event.value === "15") {
        document.getElementById("directValue").style.display = null;
        document.getElementById("containerxin").style.display = null;
      }
      if (event.value === "16" || event.value === "19" || event.value === "20" || event.value === "21" || event.value === "22" || event.value === "23" || event.value == "24" || event.value === "25") {
        document.getElementById("directValue").style.display = "none";
        document.getElementById("containerxin").style.display = "none";
      }
    };

    glob.onComparisonChanged(document.getElementById("comparison"));

    glob.onChange3 = function (event) {
    if (event.value == "5" || event.value == "0" || event.value == "7" || event.value == "8") {
      document.getElementById("exclusao").style.display = "none";
    } else {
    document.getElementById("exclusao").style.display = null;
    } 
    if (event.value == "6"){
      document.getElementById("exclusao").style.display = "none";
      document.getElementById("exclusao2").style.display = null;
    } else {
    document.getElementById("exclusao2").style.display = "none";
    }
    if (event.value == "8"){
      document.getElementById("xinas").style.display = "none";
    } else {
    document.getElementById("xinas").style.display = null;
    }
  }

    glob.onChange3(document.getElementById("changeType"));

    glob.onChange2 = function (event) {
      if (event.value == true) {
        document.getElementById("valoreval").style.display = null;
        document.getElementById("valor").style.display = "none";
        document.querySelector("[name='xinelas']").innerText = (`Valor / EVAL`);
      } 
      if (event.value == false) {
        document.getElementById("valoreval").style.display = "none";
        document.getElementById("valor").style.display = null;
        document.querySelector("[name='xinelas']").innerText = (`Valor`);
      }
    };

    glob.onChange2(document.getElementById("addType2"));


    glob.onChange4 = function (event) {
      if (event.value == true) {
        document.getElementById("valoreval2").style.display = null;
        document.getElementById("valor2").style.display = "none";
        document.querySelector("[name='xinelas2']").innerText = (`Valor padrão (se os dados não existirem) / EVAL`);
      } 
      if (event.value == false) {
        document.getElementById("valoreval2").style.display = "none";
        document.getElementById("valor2").style.display = null;
        document.querySelector("[name='xinelas2']").innerText = (`Valor padrão (se os dados não existirem)`);
      }
    };

    glob.onChange4(document.getElementById("addType3"));

    glob.variableChange = function (event) {
      if (event.value == "0") {
        document.getElementById("varNameContainer2").style.display = "none";
        document.getElementById("varNameContainer3").style.display = "none";
      } else {
        document.getElementById("varNameContainer2").style.display = null
        document.getElementById("varNameContainer3").style.display = null;
      }
    };

    glob.variableChange(document.getElementById('storage'), 'varNameContainer2');

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
    const alvo = this.evalMessage(data.alvo, cache)
    const identidade = this.evalMessage(data.identidade, cache)
    const pasta = this.evalMessage(data.pasta, cache)
    const fs = require("fs");
	  const path = require("path");

	const filePath = path.join(process.cwd(), `${pasta}`, `${alvo}.json`);

  
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, {
        recursive: true
    });
}

	if(!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "{}")
	}

	const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if(identidade !== ""){
  if (obj[identidade] === undefined) {
    obj[identidade] = {};
  }
}

      const dataName = this.evalMessage(data.dataName, cache)
      const isAdd = parseInt(data.changeType, 10)

      if(data.addType3 == true){defVal = this.eval(this.evalMessage(data.defaultValeval, cache), cache)}
      if(data.addType3 == false){defVal = this.evalMessage(data.defaultVal, cache)}

      let result2;

      if(identidade == ""){
        if(defVal) {
          if(obj[dataName]) {
            result2 = obj[dataName];
            } else {
            result2 = defVal;
          }
        } else {
          result2 = obj[dataName];
        }
      }
      else{
      if(defVal) {
        if(obj[identidade][dataName]) {
          result2 = obj[identidade][dataName];
          } else {
          result2 = defVal;
        }
      } else {
        result2 = obj[identidade][dataName];
      }}


      if(result2 == undefined){result2 = defVal}
   

      if(data.addType2 == false){
      val = this.evalMessage(data.value, cache)
      } else {
        val = this.evalMessage(data.valueeval, cache)
        try {
          val = this.eval(val, cache)
        } catch (e) {
          this.displayError(data, cache, e)
        }
      }


      if(identidade == ""){

        if (val !== undefined) {
          if (isAdd == "9" || isAdd == "8") {
            fs.writeFileSync(filePath, "{}")
          }
          if (isAdd == "7") {
            obj = {}
            fs.writeFileSync(filePath, JSON.stringify(obj));
          }
             if (isAdd == "5") {
              delete obj[dataName]
              fs.writeFileSync(filePath, JSON.stringify(obj));
            }
            if (isAdd == "4") {
  
              antes = result2
              if(antes == undefined || antes == null || antes == "" || antes == "NaN"){antes = 0}
                alter = (parseFloat(antes) + parseFloat(val))
                if(alter == undefined || alter == null || alter == "" || alter == "NaN"){alter = parseFloat(val)}
                obj[dataName] = parseFloat(alter)
  
                fs.writeFileSync(filePath, JSON.stringify(obj));
  
            }
            if (isAdd == "3") {

              if(obj[dataName] == undefined){
                obj[dataName] = val.toString()
                fs.writeFileSync(filePath, JSON.stringify(obj))
              } else {  

              obj[dataName] += val.toString()
                fs.writeFileSync(filePath, JSON.stringify(obj))
              }
  
            }
            if (isAdd == "2") {

              if(obj[dataName] == undefined){
                obj[dataName] = val
                fs.writeFileSync(filePath, JSON.stringify(obj))
              } else {

              obj[dataName] += val
              fs.writeFileSync(filePath, JSON.stringify(obj));
              }

            }
            if (isAdd == "1")  {
              obj[dataName] = val
              fs.writeFileSync(filePath, JSON.stringify(obj));
            }
          
        
      }


      } else {

      if (val !== undefined) {
        if (isAdd == "9") {
          fs.writeFileSync(filePath, "{}")
        }
        if (isAdd == "8") {
          delete obj[identidade]
          fs.writeFileSync(filePath, JSON.stringify(obj));
        }
        if (isAdd == "7") {
          obj[identidade] = {}
          fs.writeFileSync(filePath, JSON.stringify(obj));
        }
           if (isAdd == "5") {
            delete obj[identidade][dataName]
            fs.writeFileSync(filePath, JSON.stringify(obj));
          }
          if (isAdd == "4") {

            antes = result2
            if(antes == undefined || antes == null || antes == "" || antes == "NaN"){antes = 0}
              alter = (parseFloat(antes) + parseFloat(val))
              if(alter == undefined || alter == null || alter == "" || alter == "NaN"){alter = parseFloat(val)}
              obj[identidade][dataName] = parseFloat(alter)

              fs.writeFileSync(filePath, JSON.stringify(obj));

          }
          if (isAdd == "3") {

            if(obj[identidade][dataName] == undefined){
              obj[identidade][dataName] = val.toString()
              fs.writeFileSync(filePath, JSON.stringify(obj))
            } else {  

            obj[identidade][dataName] += val.toString()
              fs.writeFileSync(filePath, JSON.stringify(obj))
            }

          }
          if (isAdd == "2") {

            if(obj[identidade][dataName] == undefined){
              obj[identidade][dataName] = val
              fs.writeFileSync(filePath, JSON.stringify(obj))
            } else {  

            obj[identidade][dataName] += val
            fs.writeFileSync(filePath, JSON.stringify(obj));
            }
          }
          if (isAdd == "1")  {
            obj[identidade][dataName] = val
            fs.writeFileSync(filePath, JSON.stringify(obj));
          }
        
      
    }
  }

    if(identidade == ""){
      let result3;
      if(defVal) {
        if(obj[dataName]) {
          result3 = obj[dataName];
          } else {
          result3 = defVal;
        }
      } else {
        result3 = obj[dataName];
      }
  
  
        if(result3 == undefined){result3 = defVal}

        
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result3, storage, varName2, cache);

    }else{

    if (obj[identidade] === undefined) {
      result3 = defVal
    } else {
    let result3;
    if(defVal) {
      if(obj[identidade][dataName]) {
        result3 = obj[identidade][dataName];
        } else {
        result3 = defVal;
      }
    } else {
      result3 = obj[identidade][dataName];
    }


      if(result3 == undefined){result3 = defVal}
      
      const storage = parseInt(data.storage, 10);
      const varName2 = this.evalMessage(data.varName2, cache);
      this.storeValue(result3, storage, varName2, cache);

      
  

  

      if (isAdd == "6"){
      result = false
      val1 = result3
      const compare = parseInt(data.comparison, 10);
      let val2 = this.evalMessage(data.xvalue, cache);
      let val3 = this.evalMessage(data.xvalue2, cache);
      if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
      switch (compare) {
        case 0:
          result = val1 !== undefined;
          break;
        case 1:
          result = val1 == val2;
          break;
        case 2:
          result = val1 === val2;
          break;
        case 3:
          result = val1 < val2;
          break;
        case 4:
          result = val1 > val2;
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
            case 15:
            var numberj = val1.toString();
            if(numberj >= val2 && val1 <= val3) {
            result = numberj}
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
          case 22:
            result = Boolean(Array.isArray(val1));
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
  

    
    
  } if (isAdd == "6"){this.executeResults(result, data?.branch ?? data, cache)}else{this.callNextAction(cache)}

}
    

}
   
    },

    modInit(data) {
      this.prepareActions(data.branch?.iftrueActions);
      this.prepareActions(data.branch?.iffalseActions);
    },

    mod: function(DBM) {
    }
    
    };