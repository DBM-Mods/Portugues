module.exports = {
    name: 'File Control MOD',
    section: 'File Stuff',
    meta: {
      version: '2.1.5',
      preciseCheck: true,
      author: '[Tempest - 321400509326032897]<br>[XinXyla - 172782058396057602]',
      authorUrl: 'https://github.com/DBM-Mods/Portugues',
      downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

    subtitle: function(data) {
      return ``;
    },
  
    fields: ['path', 'nome', 'format', 'function', 'iffalse', 'iffalseVal', 'text', 'copy', 'nome2', 'line'],
  
    html(_isEvent, data) {
      return `
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
    
        <table style="width:100%"><tr>
        <td style="width:calc(50% - 50px)">
            <span class="dbminputlabel">Localização do arquivo</span>
            <input type="text" id="path" class="round" value="./resources" placeholder="Exemplo: ./resources/">
        </td>
        <td style="width:calc(50% - 50px)">
            <span class="dbminputlabel">Nome do arquivo</span>
            <input type="text" id="nome" class="round" placeholder="Exemplo: dbmmods">
        </td>

        <td style="width: 100px">
            <span class="dbminputlabel">Formato</span>
            <input type="text" id="format" class="round" placeholder="Exemplo: js">
        </td>
        </tr></table>

        <xinspace>
<div style="float:left;width:calc(50% - 10px)" id="xinelasx">
        <span class="dbminputlabel">Função</span>
        <select id="function" class="round" onchange="glob.change(this)">
            <option value="1" selected>Criar / Escrever</option>
            <option value="2">Adicionar</option>
            <option value="3">Inserir</option>
            <option value="4">Deletar</option>
            <option value="5">Copiar</option>
            <option value="6">Mover</option>
            <option value="7">Renomear</option>
        </select></div>
        <div class="campo1 campo2" style="float:right;width:calc(50% - 10px)">
            <span class="dbminputlabel">Linha</span>
            <input type="text" id="line" class="round" placeholder="Deixe em branco para adicionar na primeira linha">
        </div>
        <br><br>
        <div class="campo1">
        <br>
            <span class="dbminputlabel">Texto</span>
            <textarea id="text" class="round" rows="7" id="rows"></textarea>
        </div>

        <div class="campo3">
        <br>
            <span class="dbminputlabel" id="loc">Copiar para a localização</span>
            <input type="text" class="round" id="copy" value="./resources/" placeholder="Exemplo: ./resources/">
</div>
<div class="campo4"><br>
            <span class="dbminputlabel" id="nome2x">Novo nome do arquivo</span>
            <input type="text" id="nome2" class="round" placeholder="Exemplo: dbmmods2">

        </div>
        
        <br>

        <div style="float: left; width: 35%">
            <span class="dbminputlabel">Caso a ação falhe</span><br>
            <select id="iffalse" class="round" onchange="glob.onComparisonChanged(this)">
              <option value="0">Continuar ações</option>
              <option value="1" selecionado>Parar sequência de ação</option>
              <option value="2">Ir para a ação</option>
              <option value="3">Pular as próximas ações</option>
              <option value="4">Ir para a âncora de ação</option>
            </select>
        </div>

        <div id="iffalseContainer" style="display: none; float: right; width: 60%;">
            <span id="xinelas" class="dbminputlabel">Para</span>
            <br>
            <input id="iffalseVal" class="round" type="text">
        </div>

        <style>td{padding:5px;}xinspace{margin:5px 0px 0px 0px;display:block}</style>
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

        glob.change = function(event) {
            const value = parseInt(event.value);

            if(value == 0) {
                for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                    document.querySelectorAll(".campo1")[i].style.display = "none";
                }
                document.querySelector(".campo3").style.display = "none";
                document.querySelector(".campo4").style.display = "none";
                document.getElementById("xinelasx").style.width = 100+"%";
            } else if(value == 1 || value == 2) {
                for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                    document.querySelectorAll(".campo1")[i].style.display = "block";
                }
                document.querySelector(".campo2").style.display = "none";
                document.querySelector(".campo3").style.display = "none";
                document.querySelector(".campo4").style.display = "none";
                document.getElementById("xinelasx").style.width = 100+"%";
            } else if(value == 3) {
                for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                    document.querySelectorAll(".campo1")[i].style.display = "block";
                }
                document.querySelector(".campo2").style.display = "block";
                document.querySelector(".campo3").style.display = "none";
                document.querySelector(".campo4").style.display = "none";
                document.getElementById("xinelasx").style.width = 50+"%";
            } else if(value == 4) {
                for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                    document.querySelectorAll(".campo1")[i].style.display = "none";
                }
                document.querySelector(".campo2").style.display = "none";
                document.querySelector(".campo3").style.display = "none";
                document.querySelector(".campo4").style.display = "none";
                document.getElementById("xinelasx").style.width = 100+"%";
            } else if(value == 5) {
                for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                    document.querySelectorAll(".campo1")[i].style.display = "none";
                }
                document.querySelector(".campo2").style.display = "none";
                document.querySelector(".campo3").style.display = "block";
                document.querySelector(".campo4").style.display = "block";
                document.getElementById("loc").innerHTML = "Copiar para a pasta";
                document.getElementById("nome2x").innerHTML = "Novo nome do arquivo";
                document.getElementById("xinelasx").style.width = 100+"%";
            } else if(value == 6) {
            for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                document.querySelectorAll(".campo1")[i].style.display = "none";
            }
            document.querySelector(".campo2").style.display = "none";
            document.querySelector(".campo3").style.display = "block";
            document.querySelector(".campo4").style.display = "none";
            document.getElementById("loc").innerHTML = "Mover para a pasta";
            document.getElementById("xinelasx").style.width = 100+"%";
        } else if(value == 7) {
            for(var i = 0; i < document.querySelectorAll(".campo1").length; i++) {
                document.querySelectorAll(".campo1")[i].style.display = "none";
            }
            document.querySelector(".campo2").style.display = "none";
            document.querySelector(".campo3").style.display = "none";
            document.querySelector(".campo4").style.display = "block";
            document.getElementById("nome2x").innerHTML = "Renomear para";
            document.getElementById("xinelasx").style.width = 100+"%";
        }
        }

        glob.change(document.getElementById("function"));
    },
  
    async action(cache) {
        const data = cache.actions[cache.index];
        const info = parseInt(data.function, 10);
        fs = require("fs-extra");
        path = require('path');

        try {
            if(!this.evalMessage(data.path, cache)) {
                throw "File Control MOD: Insira a localização do arquivo!";
            }

            const diretorio = path.normalize(this.evalMessage(data.path, cache));

            const nome = this.evalMessage(data.nome, cache);
            const nome2 = this.evalMessage(data.nome2, cache);
            const format = this.evalMessage(data.format, cache);

            if(!nome) {
                throw "File Control MOD: Insira o nome do arquivo!";
            }

            if(!format) {
                throw "File Control MOD: Insira o formato do arquivo!";
            }

            const filePath = path.join(diretorio, nome + "." + format);

            const text = this.evalMessage(data.text, cache);

            switch(info) {
                case 1:
                    fs.writeFileSync(filePath, text);
                    break;
                case 2:
                    fs.appendFileSync(filePath, text);
                    break;
                case 3:
                    const insertLine = require('insert-line');
                    const line = this.evalMessage(data.line, cache) || 1;
                    insertLine(filePath).content(text).at(line).then((err) => {});
                    break;
                case 4:
                    fs.unlinkSync(filePath);
                    break;
                case 5:
                    if(!this.evalMessage(data.copy, cache)) {
                        throw "File Control MOD: Insira a localização para onder copiar o arquivo!";
                    }

                    const diretorio2 = path.normalize(this.evalMessage(data.copy, cache));
                    const filePath2 = path.join(diretorio2,nome2 + "." + format); 

                    fs.copySync(filePath, filePath2);
                    break;
                    case 6:
                        if(!this.evalMessage(data.copy, cache)) {
                            throw "File Control MOD: Insira a localização para onder copiar o arquivo!";
                        }

                        if (!fs.existsSync(data.copy)) {
                            fs.mkdirSync(data.copy, {
                                recursive: true
                            });
                        }
                        var oldPath = this.evalMessage(data.path, cache)+this.evalMessage(data.nome, cache)+'.'+this.evalMessage(data.format, cache)
                        var newPath = this.evalMessage(data.copy, cache)+this.evalMessage(data.nome, cache)+'.'+this.evalMessage(data.format, cache)
                        fs.renameSync(oldPath, newPath)
                        break;
                        case 7:   
                            var oldPath = this.evalMessage(data.path, cache)+this.evalMessage(data.nome, cache)+'.'+this.evalMessage(data.format, cache)
                            var newPath = this.evalMessage(data.path, cache)+this.evalMessage(data.nome2, cache)+'.'+this.evalMessage(data.format, cache)
                            fs.renameSync(oldPath, newPath)
                            break;
            }



        } catch(err) {
            this.executeResults(false, data, cache);
        }
        this.callNextAction(cache);
    },
  
    mod() {},
};
