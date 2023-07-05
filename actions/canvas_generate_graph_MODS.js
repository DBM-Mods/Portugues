module.exports = {
  name: 'Canvas Generate Graph MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {
    const storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']
    const graf = ['Linha horizontal', 'Barra vertical', 'Barra horizontal', 'Radar', 'Torta', 'Rosquinha', 'Área Polar', 'Linha vertical', 'Espalhado']

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Gráfico: ${graf[parseInt(data.type)]} ~ ${storeTypes[parseInt(data.storage)]} (${data.varName})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['type', 'sort', 'width', 'height', 'title', 'borderWidth', 'borderColor', 'Colori', 'Colorl', 'borderColorAlpha', 'bgColor', 'bgColorAlpha', 'posicao', 'espacamento', 'alinhamento', 'labels', 'datasets', 'tamanhotitulo', 'tamanhoi', 'tamanhol', 'cortitulo', 'storage', 'varName', 'ponto', 'pontotam', 'tensao', 'escala', 'preencher', 'gradeh', 'gradev', 'grader', 'descriptioncolor', 'description', 'descriptionx'],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.3</div>

    <tab-system style="margin-top: -6px;">

		<tab label="Dados" icon="align left">
    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 200px);overflow:auto">

    <span class="dbminputlabel">Titulo</span><br>
    <input id="title" class="round" type="text">
    <xinspace>
    <span class="dbminputlabel">Rótulos (separados por vírgula</span><br>
    <textarea id="labels" rows="5" placeholder="Exemplo 1, Exemplo 2, Exemplo 3..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    <xinspace>
    <span class="dbminputlabel">Valores (separados por vírgula)</span><br>
    <textarea id="datasets" rows="5" placeholder="10,20,30..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    </div>
    </tab>

    <tab label="Cores" icon="flask">
    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 200px);overflow:auto">
     <span class="dbminputlabel">Cor do título</span><br>
    <table style="width:100%"><tr><th><input id="cortitulo" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para o padrão"  onchange="(function(){
      var input = document.getElementById('cortitulo');
      var valor = input.value;
      document.getElementById('exib').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('cortitulo').type = 'color'
      document.getElementById('2btr1').style.display = 'none';
      document.getElementById('2btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib">&#8203;</div></div></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('cortitulo').type = 'text';
        document.getElementById('2btr1').style.display = 'block';
        document.getElementById('2btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>
        <xinspace>
<table style="width:100%">
    <tr>
    <td class="col1"><span class="dbminputlabel">Opacidade do plano de fundo</span><br>
    <input id="bgColorAlpha" class="round" type="text" value="0.9">
    </td>
    <td class="col2"><span class="dbminputlabel">Opacidade da borda</span><br>
    <input id="borderColorAlpha" class="round" type="text" value="1"></td>
    </tr>
    </table>
    <xinspace>
    <span class="dbminputlabel">Cores de fundo (separados por vírgula)</span><br>
    <input id="bgColor" class="round" placeholder="#000000,#333333,#555555...">
    <xinspace>
    <span class="dbminputlabel">Cores da borda (separados por vírgula)</span><br>
    <input id="borderColor" class="round" placeholder="#000000,#333333,#555555...">
    <xinspace>
    <span class="dbminputlabel">Cores do texto lateral (separados por vírgula)</span><br>
    <input id="Colorl" class="round" placeholder="#000000,#333333,#555555...">
    <xinspace>
    <div id="xingostoso2">
    <span class="dbminputlabel">Cores do texto inferior (separados por vírgula)</span><br>
    <input id="Colori" class="round" placeholder="#000000,#333333,#555555...">
    </div>
    
</div>
    </tab>

    <tab label="Tamanho" icon="move">
    <div style="width: 100%; padding:8px;height: calc(100vh - 200px);overflow:auto">

    <table style="width:100%">
    <tr>
<td class="col1"><span class="dbminputlabel">Largura (px)</span><br>
<input id="width" class="round" type="text"></td>
<td class="col2"><span class="dbminputlabel">Altura (px)</span><br>
<input id="height" class="round" type="text"></td>
</tr>
</table>
<xinspace>
<span class="dbminputlabel">Margem da imagem (px)</span><br>
<input id="espacamento" class="round" value="0" type="text">
<xinspace>
<table>
<tr>
<td class="col1"><span class="dbminputlabel">largura da Borda (px)</span><br>
<input id="borderWidth" class="round" type="text"></td>
<td class="col2"><span class="dbminputlabel">Tamanho do título (px)</span><br>
<input id="tamanhotitulo" class="round" placeholder="Deixe em branco para o padrão" type="text"></td>
</tr>
</table>
<xinspace>

<table>
<tr>
<td class="col1"><span class="dbminputlabel">Tamanho do texto lateral (px)</span><br>
<input id="tamanhol" class="round" placeholder="Deixe em branco para o padrão" type="text"></td>
<td class="col2" id="xingostoso"><span class="dbminputlabel">Tamanho do texto inferior (px)</span><br>
<input id="tamanhoi" class="round" type="text"  placeholder="Deixe em branco para o padrão"></td>
</tr>
</table>


</div>
    </tab>
      <tab label="Gráfico" icon="area chart">
    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 200px);overflow:auto">

    <span class="dbminputlabel">Tipo de Gráfico</span><br>
<select id="type" class="round" onchange="glob.onChange1(this)">
<option value="0" selecionado>Linha horizontal</option>
<option value="7">Linha vertical</option>
   <option value="1">Barra vertical</option>
   <option value="2">Barra horizontal</option>
   <option value="3">Radar</option>
   <option value="4">Torta</option>
   <option value="5">Rosquinha</option>
   <option value="6">Área Polar</option>
   <option value="8">Espalhado</option>
</select>
<xinspace>

<div id="xinelas">

<table style="width:100%"><tr><td class="col1">
<span class="dbminputlabel">Tipo de ponto</span><br>
<select id="ponto" class="round">
<option value="0" selecionado>Circulo</option>
<option value="1">Cruz</option>
<option value="2">X</option>
<option value="3">Traço</option>
<option value="4">Linha</option>
<option value="5">Quadrado</option>
<option value="6">Quadrado arredondado</option>
<option value="7">Losango</option>
<option value="8">Estrela</option>
<option value="9">Triângulo</option>
</select>
</td><td class="col2">
<span class="dbminputlabel">Tamanho do ponto</span><br>
<input id="pontotam" class="round" value="" type="text" placeholder="Deixe em branco para padrão">
</td></tr></table>

<xinspace>
<div id="xinelas2">
<table style="width:100%"><tr><td class="col1">
<span class="dbminputlabel">Tensão da linha</span><br>
<input id="tensao" class="round" value="" type="text" placeholder="Deixe em branco para padrão">
</td>
<td class="col2">
<span class="dbminputlabel">Preencher [true/false]</span><br>
<input id="preencher" class="round" value="" type="text" placeholder="Deixe em branco para false">
</td>


</tr></table>
<xinspace>
</div>
</div>

<table style="width:100%"><tr><td class="col1">
<span class="dbminputlabel">Ordenar por</span><br>
<select id="sort" class="round">
<option value="0" selecionado>Nenhum</option>
<option value="1">Subir</option>
<option value="2">Descer</option>
</select>
</td><td id="xinelinho" class="col2">
<span class="dbminputlabel">Escala</span><br>
<select id="escala" class="round">
<option value="0" selected>Começando pelo mínimo/máximo</option>
<option value="1">Começando do 0</option>
</select>
</td>


</tr></table>
<xinspace>

<table style="width:100%">
    <tr>
<td class="col1"><span class="dbminputlabel">Posição do título</span><br>
<select id="posicao" class="round">
<option value="top" selected>Superior</option>
<option value="left">Esquerda</option>
<option value="right">Direita</option>
<option value="bottom">Inferior</option>
</select></td>
<td class="col2"><span class="dbminputlabel">Alinhamento do título</span><br>
<select id="alinhamento" class="round">
<option value="center" selected>Centralizado</option>
<option value="start">Esquerda</option>
<option value="end">Direita</option>
</select></td>
</tr>
</table>


</div>
    </tab>
    <tab label="Grade" icon="grid layout">
    <div style="width: 100%; padding:8px;height: calc(100vh - 200px);overflow:auto">

<div id="xinxyludo1">
    <span class="dbminputlabel">Cor da grade horizontal</span><br>
    <table style="width:100%"><tr><th><input id="gradeh" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para desativar"  onchange="(function(){
      var input = document.getElementById('gradeh');
      var valor = input.value;
      document.getElementById('exib2').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('gradeh').type = 'color'
      document.getElementById('3btr1').style.display = 'none';
      document.getElementById('3btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib2">&#8203;</div></div></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('gradeh').type = 'text';
        document.getElementById('3btr1').style.display = 'block';
        document.getElementById('3btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

<xinspace>
</div>
<div id="xinxyludo2">
    <span class="dbminputlabel">Cor da grade vertical</span><br>
    <table style="width:100%"><tr><th><input id="gradev" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para desativar"  onchange="(function(){
      var input = document.getElementById('gradev');
      var valor = input.value;
      document.getElementById('exib3').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="4btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('gradev').type = 'color'
      document.getElementById('4btr1').style.display = 'none';
      document.getElementById('4btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib3">&#8203;</div></div></a><a id="4btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('gradev').type = 'text';
        document.getElementById('4btr1').style.display = 'block';
        document.getElementById('4btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

        <xinspace>
        </div>
        <div id="xinxyludo3">
    <span class="dbminputlabel">Cor da grade radial</span><br>
    <table style="width:100%"><tr><th><input id="grader" name="actionxinxyla" class="round" type="text" placeholder="Deixe em branco para desativar"  onchange="(function(){
      var input = document.getElementById('grader');
      var valor = input.value;
      document.getElementById('exib4').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="5btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('grader').type = 'color'
      document.getElementById('5btr1').style.display = 'none';
      document.getElementById('5btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib4">&#8203;</div></div></a><a id="5btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('grader').type = 'text';
        document.getElementById('5btr1').style.display = 'block';
        document.getElementById('5btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>
</div>

    </div>
    </tab>

    <tab label="Config" icon="cogs">
    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 200px);overflow:auto">

    <div>
    <table style="width:100%;"><tr>
    <td style="width:calc(100vw - 70px) !important"><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
    <td style="padding:0px 0px 0px 10px;width:70px !important"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
    </tr></table>
    </div>

    <xinspace>

<table style="width:100%">
<tr>
<td><span class="dbminputlabel">Armazenar em</span><br>
<select id="storage" class="round">
  ${data.variables[1]}
</select></td>
<td style="padding:0px 0px 0px 8px"><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName" class="round" type="text"></td>
</tr>

</table>

    </div>
    </tab>
    
    </tab-system>

  <style>
  xinspace{margin:10px 0px 0px 0px;display:block}
  td{width:50%}
  .dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.xinelaslink{margin-top:-4px}
.xinelaslink:hover{opacity:0.8 !important}
table{width:100%}
.col1{width:50%}
.col2{width:50%;padding:0px 0px 0px 8px}
th{font-weight: normal;}
  </style>`
  },

  init() {
    const { glob, document } = this

    var input = document.getElementById('cortitulo');
    var valor = input.value;
    document.getElementById('exib').style.background = valor;

    var input2 = document.getElementById('gradeh');
    var valor2 = input2.value;
    document.getElementById('exib2').style.background = valor2;

    var input3 = document.getElementById('gradev');
    var valor3 = input3.value;
    document.getElementById('exib3').style.background = valor3;

    var input4 = document.getElementById('grader');
    var valor4 = input4.value;
    document.getElementById('exib4').style.background = valor4;

    glob.onChange1 = function (event) {
      const value = parseInt(event.value)
      if (value === 0 || value === 7 || value === 8) {
        document.getElementById("xinelas").style.display = null;
      } else {
        document.getElementById("xinelas").style.display = "none";
      }
      if (value === 0 || value === 1 || value === 2 || value === 3 || value === 7 || value === 8) {
        document.getElementById("xinelinho").style.display = null;
      } else {
        document.getElementById("xinelinho").style.display = "none";
      }
      if (value === 8) {
        document.getElementById("xinelas2").style.display = "none";
      } else {
        document.getElementById("xinelas2").style.display = null;
      }

      if (value === 0 || value === 1 || value === 2 || value === 7 || value === 8) {
        document.getElementById("xinxyludo1").style.display = null;
        document.getElementById("xinxyludo2").style.display = null;
        document.getElementById("xinxyludo3").style.display = "none";
        document.getElementById("xingostoso").style.display = null;
        document.getElementById("xingostoso2").style.display = null;
      }
      if (value === 3) {
        document.getElementById("xinxyludo1").style.display = null;
        document.getElementById("xinxyludo2").style.display = null;
        document.getElementById("xinxyludo3").style.display = null;
        document.getElementById("xingostoso").style.display = null;
        document.getElementById("xingostoso2").style.display = null;
      }
      if (value === 4 || value === 5 || value === 6) {
        document.getElementById("xinxyludo1").style.display = null;
        document.getElementById("xinxyludo2").style.display = "none";
        document.getElementById("xinxyludo3").style.display = "none";
        document.getElementById("xingostoso").style.display = "none";
        document.getElementById("xingostoso2").style.display = "none";
      }
    }

    glob.onChange1(document.getElementById('type'))

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
    const data = cache.actions[cache.index]
    const ChartJS = require('chart.js')
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const tamanhotitulo = this.evalMessage(data.tamanhotitulo, cache)
    const cortitulo = this.evalMessage(data.cortitulo, cache)
    const espacamento = this.evalMessage(data.espacamento, cache)
    const gradeh = this.evalMessage(data.gradeh, cache)
    const gradev = this.evalMessage(data.gradev, cache)
    const grader = this.evalMessage(data.gradev, cache)
    const tamanhol = this.evalMessage(data.tamanhol, cache)
    const tamanhoi = this.evalMessage(data.tamanhoi, cache)
    const colori = this.evalMessage(data.Colori, cache).split(',')
    const colorl = this.evalMessage(data.Colorl, cache).split(',')

    liberar = 1

    let type = parseInt(data.type, cache)

    if (type == 0 || type == 7 || type == 8) {
      if (parseInt(data.ponto) > 0) { ponto = parseInt(data.ponto) } else { ponto = 0 }

      if (ponto == 0) { tipoponto = "circle" }
      if (ponto == 1) { tipoponto = "cross" }
      if (ponto == 2) { tipoponto = "crossRot" }
      if (ponto == 3) { tipoponto = "dash" }
      if (ponto == 4) { tipoponto = "line" }
      if (ponto == 5) { tipoponto = "rect" }
      if (ponto == 6) { tipoponto = "rectRounded" }
      if (ponto == 7) { tipoponto = "rectRot" }
      if (ponto == 8) { tipoponto = "star" }
      if (ponto == 9) { tipoponto = "triangle" }

      pontotam = parseInt(this.evalMessage(data.pontotam, cache))
      tensao = parseInt(this.evalMessage(data.tensao, cache))
      preencher = this.evalMessage(data.preencher, cache)

      liberar = 2
    }



    var alinhamento = this.evalMessage(data.alinhamento, cache)
    if (alinhamento == "") { alinhamento = 'center' }
    var posicao = this.evalMessage(data.posicao, cache)
    if (posicao == "") { posicao = 'top' }
    let options = {}
    options.plugins = { legend: { position: posicao, align: alinhamento } }
    if (tamanhotitulo !== "") { options.plugins = { legend: { position: posicao, align: alinhamento, labels: { font: { size: tamanhotitulo } } } } }
    if (espacamento !== "") { options.layout = { padding: espacamento } }
    if (cortitulo !== "") { options.color = cortitulo }
    switch (type) {
      case 0:
        type = 'line'

        options.scales = { x: {}, y: {} }

        if (data.escala == "1") {
          options.scales.y = { beginAtZero: true }
        } else {
          options.scales.y = { beginAtZero: false }
        }

        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh };
        }
        if (gradev !== "") {
          options.scales.x = { grid: { color: gradev } }
        }


        options.scales.x.ticks = { font: {} }
        options.scales.y.ticks = { font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }

        break
      case 1:
        type = 'bar'

        options.scales = { x: {}, y: {} }

        if (data.escala == "1") {
          options.scales.y = { beginAtZero: true }
        } else {
          options.scales.y = { beginAtZero: false }
        }


        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh };
        }
        if (gradev !== "") {
          options.scales.x = { grid: { color: gradev } }
        }

        
        options.scales.x.ticks = { font: {} }
        options.scales.y.ticks = { font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }


        break
      case 2:
        type = 'bar'
        options.indexAxis = 'y'

        options.scales = { x: {}, y: {} }

        if (data.escala == "1") {
          options.scales.x = { beginAtZero: true }
        } else {
          options.scales.x = { beginAtZero: false }
        }


        if (gradev !== "") {
          options.scales.x.grid = { color: gradev };
        }
        if (gradeh !== "") {
          options.scales.y = { grid: { color: gradeh } }
        }

        
        options.scales.x.ticks = { font: {} }
        options.scales.y.ticks = { font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }

        break
      case 3:
        type = 'radar'

        options.scales = { x: {}, y: {} , r: {} }

        if (data.escala == "1") {
          options.scales.r = { beginAtZero: true }
        } else {
          options.scales.r = { beginAtZero: false }
        }

        if (gradev !== "") {
          options.scales.x = { grid: { color: gradev } }
        }

        if (gradeh !== "") {
          options.scales.y = { grid: { color: gradeh } }
        }

        if (grader !== "") {
          options.scales.r.grid = { color: grader };
        }

        
        options.scales.x.ticks = { font: {} }
        options.scales.y.ticks = { font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }

        break
      case 4:
        type = 'pie'

        options.scales = { y: {} }

        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh }
        }

        options.scales.y.ticks = { font: {} }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }
        break
      case 5:
        type = 'doughnut'

        options.scales = { y: {} }

        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh }
        }

        options.scales.y.ticks = { font: {} }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }
        break
      case 6:
        type = 'polarArea'

        options.scales = { y: {} }

        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh }
        }

        options.scales.y.ticks = { font: {} }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }
        break
      case 7:
        type = 'line'
        options.indexAxis = 'y'

        options.scales = { x: {}, y: {} }

        if (data.escala == "1") {
          options.scales.x = { beginAtZero: true }
        } else {
          options.scales.x = { beginAtZero: false }
        }

        if (gradev !== "") {
          options.scales.x.grid = { color: gradev };
        }
        if (gradeh !== "") {
          options.scales.y = { grid: { color: gradeh } }
        }

        
        options.scales.x.ticks = { font: {} }
        options.scales.y.ticks = { font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }

        break
      case 8:
        type = 'scatter'

        options.scales = { x: {}, y: {} }

        if (data.escala == "1") {
          options.scales.x = { beginAtZero: true },
          options.scales.y = { beginAtZero: true }
        } else {
          options.scales.x = { beginAtZero: false },
          options.scales.y = { beginAtZero: false }
        }

        if (gradev !== "") {
          options.scales.x.grid = { color: gradev }
        }
        if (gradeh !== "") {
          options.scales.y.grid = { color: gradeh }
        }
        
        options.scales.x.ticks = { color: {}, font: {} }
        options.scales.y.ticks = { color: {}, font: {} }

        if (tamanhoi !== "") {
          options.scales.x.ticks.font.size = tamanhoi
        }

        if (tamanhol !== "") {
          options.scales.y.ticks.font.size = tamanhol
        }

        if (colori !== "") {
          options.scales.x.ticks.color = colori
        }

        if (colorl !== "") {
          options.scales.y.ticks.color = colorl
        }

        break
      default:
        break
    }



    const sort = parseInt(data.sort, cache)
    const width = parseInt(this.evalMessage(data.width, cache))
    const height = parseInt(this.evalMessage(data.height, cache))
    const titlexinxyla = this.evalMessage(data.title, cache)
    let labels = this.evalMessage(data.labels, cache)
    if (typeof labels === 'string') labels = labels.split(',')
    let datasets = this.evalMessage(data.datasets, cache)
    if (typeof datasets === 'string') datasets = datasets.split(',')
    const bgColor = this.evalMessage(data.bgColor, cache).replaceAll('#', '')
    const bgColorAlpha = parseFloat(this.evalMessage(data.bgColorAlpha, cache))
    const borderWidth = parseFloat(this.evalMessage(data.borderWidth, cache))
    const borderColor = this.evalMessage(data.borderColor, cache).replaceAll('#', '')
    const borderColorAlpha = parseFloat(this.evalMessage(data.borderColorAlpha, cache))
    try {
      const result = await ChartJS.Chart(type, width, height, titlexinxyla, labels, datasets, sort, bgColor, bgColorAlpha, borderWidth, borderColor, borderColorAlpha, options)
      this.storeValue(result, storage, varName, cache)
      this.callNextAction(cache)
    } catch (err) {
      console.log(err)
    }
  },

  mod(DBM) {
    const ChartJS = require('chart.js')
    const Canvas = require('canvas')
    ChartJS.Chart = function (type, width, height, titlexinxyla, labels, data, sort, bgColor, bgColorAlpha, borderWidth, borderColor, borderColorAlpha, options = {}) {
      const config = { type, data: {}, options }
      config.options.responsive = false
      config.options.animation = false
      if (sort !== 0) {
        const sortList = {}
        for (let i = 0; i < data.length; i++) {
          sortList[labels[i]] = data[i]
        }
        let sortedLabels
        const sortedData = []
        if (sort === 1) {
          sortedLabels = Object.keys(sortList).sort((a, b) => sortList[a] - sortList[b])
        } else {
          sortedLabels = Object.keys(sortList).sort((a, b) => sortList[b] - sortList[a])
        }
        sortedLabels.forEach((key) => {
          sortedData.push(sortList[key])
        })
        data = sortedData
        labels = sortedLabels
      }
      bgColorAlpha = (isNaN(bgColorAlpha) || bgColorAlpha > 1) ? 1 : ((bgColorAlpha <= 0) ? 0.1 : bgColorAlpha)
      borderColorAlpha = (isNaN(borderColorAlpha) || borderColorAlpha > 1) ? 1 : ((borderColorAlpha <= 0) ? 0 : borderColorAlpha)
      let mainColor
      mainColor = bgColor.split(',')
      bgColor = getColors(mainColor, bgColorAlpha)
      config.data = { labels, datasets: [{ label: titlexinxyla, data }] }
      function getColors(colors, alpha) {
        return colors.map(hex => `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(hex.slice(4, 6), 16)},${alpha})`)
      }
      config.data.datasets[0].backgroundColor = bgColor

      if (liberar == 2) {

        if (tensao > 0) {
          config.data.datasets[0].tension = (tensao / 100)
        }
        if (ponto > 0) {
          config.data.datasets[0].pointStyle = tipoponto
        }
        if (pontotam >= 0) {
          config.data.datasets[0].radius = pontotam
        }

        if (preencher == "true") {
          config.data.datasets[0].fill = true
        }

      }

      if (borderWidth > 0) {
        if (!borderColor) {
          borderColor = getColors(mainColor, borderColorAlpha)
        } else {
          borderColor = getColors(borderColor.split(','), borderColorAlpha)
        }
        config.data.datasets[0].borderColor = borderColor
        config.data.datasets[0].borderWidth = borderWidth
      }
      const canvas = Canvas.createCanvas(width, height)
      canvas.style = {}
      const ctx = canvas.getContext('2d')
      const chart = new ChartJS(ctx, config)
      try {
        return chart.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      } catch (error) {
        throw Error(error)
      }
    }
  }

}
