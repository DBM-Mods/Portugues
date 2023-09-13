module.exports = {
  name: 'Canvas Generate Progress Bar MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data) {

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    const storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']
    const index = parseInt(data.type)

    if (parseInt(data.type) >= 100) {
      var type2 = ['Sobrancelha', 'Estrela']
      var tipobar = type2[index - 100]
    } else {
      var type = ['Reta', 'Circulo', 'Arco', 'Imagem']
      var tipobar = type[index]
    }


    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Barra de progresso: ${tipobar} - ${storeTypes[parseInt(data.storage)]} (${data.varName})</font>`
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },
  fields: ['storage2', 'varName2', 'local2', 'iwidth', 'iheight', 'ipos', 'local', 'storage', 'varName', 'type', 'width', 'height', 'lineWidth', 'lineCap', 'percent', 'color', 'tipocor2', 'int', 'int2', 'gradiente2', 'gradient2', 'apartir2', 'colorfundo', 'tipocor', 'gradiente', 'gradient3', 'apartir', "blur", "shadowcor", "blur2", "shadowcor2", "rotacao", "descriptioncolor", "description", "descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.5</div>

     <tab-system style="margin-top: 2">
     <tab label="Config" icon="cogs">
<div style="padding:0px 5px;padding-top:8px;height: calc(100vh - 200px);overflow:auto">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 5px 0px 5px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>

<table style="width:100%">
<tr>
<td style="width:50% !important">
<span class="dbminputlabel">Tipo de barra</span><br>
<select id="type" class="round" onchange="glob.onChange1(this)">
  <option value="0" selected>Reta</option>
  <option value="1">Circulo</option>
  <option value="2">Arco</option>
  <option value="3">Imagem</option>
  <option value="100">Sobrancelha</option>
  <option value="101">Estrela</option>
</select>
</td>
<td style="width:50% !important" id="tipolinha">
<span class="dbminputlabel">Tipo de linha</span><br>
<select id="lineCap" class="round" onchange="glob.onChange1x(this)">
  <option value="0" selected>Quadrada</option>
  <option value="1">Redonda</option>
</select>
</td>
</tr></table>

<div id="xinimg">

<table style="width:100%;">
<tr>
  <td>
    <span class="dbminputlabel">Imagem</span><br>
    <select id="storage2" class="round" style="width: 100%" onchange="glob.onChangexin2(this)">
      ${data.variables[1]}
      <option value="10">Local/Web URL</option>
    </select>
  </td>
  <td id="controlador2x" style="padding:0px 0px 0px 8px">
    <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName2" class="round" type="text" list="variableList">
  </td>
  <td id="controlador3x" style="padding:0px 0px 0px 8px">
  <span class="dbminputlabel">Local/Web URL</span><br>
  <input id="local2" class="round" type="text" placeholder="resources/output.png">
</td>
</tr>
</table>


<div id="controlador4x">
<br>
  <div style="float: left; width: 33%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Largura da Imagem</span><br>
    <input id="iwidth" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>
  <div style="float: left; width: 34%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Altura da Imagem</span><br>
    <input id="iheight" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>
  <div style="float: right; width: 33%">
  <span class="dbminputlabel">Posição Vertical</span><br>
    <input id="ipos" class="round" type="text" placeholder="Deixe em branco para padrão" value="0"><br>
  </div>

</div>

</div>

<table style="width:100%"><tr>
<td style="width:33% !important">
<span class="dbminputlabel"><span id="Change1text">Largura da Barra</span></span><br>
<input id="width" class="round" type="text">
</td>
<td style="width:33% !important" id="quadratico">
<span class="dbminputlabel"><span id="Change2text">Altura da Barra</span></span><br>
<input id="height" class="round" type="text">
</td>
<td style="width:33% !important" id="circulatico">
<span class="dbminputlabel">Altura da linha</span><br>
<input id="lineWidth" class="round" type="text">
</td>
</tr></table>

<div style="padding: 8px 5px 0px 5px">
<span class="dbminputlabel">Porcentagem</span><br>
<input id="percent" class="round" type="text"></div>

<div id="conteudo2g" style="padding: 12px 5px 4px 5px">
<span class="dbminputlabel">Girar (Graus)</span><br>
<input id="rotacao" class="round" value="0" type="text"></div>

<xinspace>

<table style="width:100%;">
		<tr>
			<td id="controlador1">
				<span class="dbminputlabel">Armazenar em</span><br>
				<select id="storage" class="round" style="width: 100%" onchange="glob.onChangexin(this)">
					${data.variables[1]}
          <option value="10">Salvar no Local</option>
				</select>
			</td>
			<td id="controlador2">
				<span class="dbminputlabel">Nome da Variavel</span><br>
				<input id="varName" class="round" type="text" list="variableList">
			</td>
      <td id="controlador3">
      <span class="dbminputlabel">Caminho (Salvar no Local</span><br>
      <input id="local" class="round" type="text" placeholder="resources/output.png">
    </td>
		</tr>
	</table><br>
</div>
</tab>

<tab label="Cor de Fundo" icon="align left">
<div style="padding:0px 4px;padding-top:8px;height: calc(100vh - 200px);overflow:auto">

<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
<div style="float: left; width: 100%;" id="xinxyludob">
<span class="dbminputlabel">Tipo de Cor</span><br>
<select id="tipocor2" class="round" onchange="glob.onChange2(this)">
  <option value="0" selected>Nenhuma</option>
  <option value="1">Cor (HEX ou RGBA)</option>
  <option value="2">Cor Gradiente / EVAL</option>
  <option value="3">Cor Gradiente / Guiado</option>
</select> </div>

<div style="float: left; width: 60%;padding-left:4px" id="xinxyludoa">
<span class="dbminputlabel">A partir</span>
  <select id="apartir2" class="round">
    <option value="0">Cima para baixo</option>
    <option value="1">Diagonal esquerda de cima para baixo</option>
    <option value="2" selected>Direita para esquerda</option>
    <option value="3">Diagonal direita de cima para baixo</option>
    <option value="4">De baixo para cima</option>
    <option value="5">Diagonal esquerda de baixo para cima</option>
    <option value="6">Esquerda para direita</option>
    <option value="7">Diagonal direita de baixo para cima</option>
    <option value="8">Radial</option>
  </select>
</div>
</div>


<br>
<div id="gradient2r">
<span class="dbminputlabel">Gradiente</span>
<textarea id="gradiente2" name="gradientes" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
</div>

<div id="Gradient2" style="display: none; float: left; width: 100%;">
<dialog-list id="gradient2" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 330px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem2(data)" itemStyle="text-align: left; line-height: 30px;">
<div style="padding: 12px">

<span class="dbminputlabel">Posição</span><br>
<input id="posicao" class="round" type="text" placeholder="Coloque de 0 a 100">
<br>

<span class="dbminputlabel">Cor (HEX, RGBA ou nome da cor)</span><br>
<table style="width:100%"><tr><td><input id="cor" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)"><td>
<td style="width:40px;text-align:center;padding:4px"><a id="btr1b" style="cursor:pointer" onclick="(function(){
  document.getElementById('cor').type = 'color'
  document.getElementById('btr1b').style.display = 'none';
  document.getElementById('btr2b').style.display = 'block';
  })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2b" style="cursor:pointer;display:none" onclick="(function(){
    document.getElementById('cor').type = 'text';
    document.getElementById('btr1b').style.display = 'block';
    document.getElementById('btr2b').style.display = 'none';
    })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table><br>

</div>
</dialog-list>
</div>

<div id="cor2">
<span class="dbminputlabel">Cor de fundo (HEX ou RGBA)</span><br>
    <table style="width:100%"><tr><th><input id="colorfundo" name="actionxinxyla" class="round" type="text" placeholder="Opcional" onchange="(function(){
      var input = document.getElementById('colorfundo');
      var valor = input.value;
      document.getElementById('exib").style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('colorfundo').type = 'color'
      document.getElementById('2btr1').style.display = 'none';
      document.getElementById('2btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib">&#8203;</div></div></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('colorfundo').type = 'text';
        document.getElementById('2btr1').style.display = 'block';
        document.getElementById('2btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

        </div>


</div>
</tab>

<tab label="Cor" icon="align left">
<div style="padding:0px 4px;padding-top:8px;height: calc(100vh - 200px);overflow:auto">

<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
<div style="float: left; width: 100%;" id="xinxyludoc">
<span class="dbminputlabel">Tipo de Cor</span>
<select id="tipocor" class="round" onchange="glob.onChange0(this)">
  <option value="10">Nenhuma</option>
  <option value="0" selected>Cor (HEX ou RGBA)</option>
  <option value="1">Cor Gradiente / EVAL</option>
  <option value="2">Cor Gradiente / Guiado</option>
</select>
</div>

<div style="float: left; width: 60%;padding-left:4px" id="xinxyludod">
<span class="dbminputlabel">A partir</span>
  <select id="apartir" class="round">
    <option value="0">Cima para baixo</option>
    <option value="1">Diagonal esquerda de cima para baixo</option>
    <option value="2" selected>Direita para esquerda</option>
    <option value="3">Diagonal direita de cima para baixo</option>
    <option value="4">De baixo para cima</option>
    <option value="5">Diagonal esquerda de baixo para cima</option>
    <option value="6">Esquerda para direita</option>
    <option value="7">Diagonal direita de baixo para cima</option>
    <option value="8">Radial</option>
  </select>
</div>
</div>

<br>
<div id="gradientr">
<span class="dbminputlabel">Gradiente</span>
<textarea id="gradiente" name="gradientes" rows="5" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
</div>

<div id="Gradient3" style="display: none; float: left; width: 100%;">
<dialog-list id="gradient3" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 330px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
<div style="padding: 12px">

<span class="dbminputlabel">Posição</span><br>
<input id="posicao" class="round" type="text" placeholder="Coloque de 0 a 100">
<br>

<span class="dbminputlabel">Cor (HEX, RGBA ou nome da cor)</span><br>
<table style="width:100%"><tr><td><input id="cor" name="actionxinxyla" class="round" type="text" placeholder="#000000 ou rgba(0,0,0,0.5)"><td>
<td style="width:40px;text-align:center;padding:4px"><a id="btr1b" style="cursor:pointer" onclick="(function(){
  document.getElementById('cor').type = 'color'
  document.getElementById('btr1b').style.display = 'none';
  document.getElementById('btr2b').style.display = 'block';
  })()"><button class="tiny compact ui icon button">Cor</button></a><a id="btr2b" style="cursor:pointer;display:none" onclick="(function(){
    document.getElementById('cor').type = 'text';
    document.getElementById('btr1b').style.display = 'block';
    document.getElementById('btr2b').style.display = 'none';
    })()"><button class="tiny compact ui icon button">Texto</button></a><td></tr></table><br>

</div>
</dialog-list>
</div>

<div id="cor">
<span class="dbminputlabel">Cor (HEX ou RGBA)</span><br>
    <table style="width:100%"><tr><th><input id="color" name="actionxinxyla" class="round" type="text" placeholder="Requerido" onchange="(function(){
      var input = document.getElementById('color');
      var valor = input.value;
      document.getElementById('exib2').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('color').type = 'color'
      document.getElementById('btr1').style.display = 'none';
      document.getElementById('btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib2">&#8203;</div></div></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('color').type = 'text';
        document.getElementById('btr1').style.display = 'block';
        document.getElementById('btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>
</div>




</div>
</tab>

<tab label="Sombra de Fundo" icon="align left">
<div style="padding:0px 4px;padding-top:8px;height: calc(100vh - 200px);overflow:auto">

<div id="sombrafund">

<table style="width:100%"><tr>
<td style="width:50% !important">
<span class="dbminputlabel">Tamanho da Sombra</span><br>
<input id="blur2" class="round" value="0" type="text">
</td>
<td style="width:50% !important">
<span class="dbminputlabel">Intensidade</span><br>
<input id="int2" class="round" value="1" type="text">
</td>
</tr></table>

    <br>
    <span class="dbminputlabel">Cor da Sombra</span><br>
    <table style="width:100%"><tr><th><input id="shadowcor2" name="actionxinxyla" class="round" type="text" placeholder="Opcional" onchange="(function(){
      var input = document.getElementById('shadowcor2');
      var valor = input.value;
      document.getElementById('exib3').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="4btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('shadowcor2').type = 'color'
      document.getElementById('4btr1').style.display = 'none';
      document.getElementById('4btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib3">&#8203;</div></div></a><a id="4btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('shadowcor2').type = 'text';
        document.getElementById('4btr1').style.display = 'block';
        document.getElementById('4btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

    </div>



<div id="sombrafund2" style="padding:12px">
Recurso indisponível, a seguinte operação do canvas impossibilita uma sombra de fundo por causa do corte da borda arredondada
</div>

</div>
</tab>

<tab label="Sombra" icon="align left">
<div style="padding:0px 4px;padding-top:8px;height: calc(100vh - 200px);overflow:auto">

<table style="width:100%"><tr>
<td style="width:50% !important">
<span class="dbminputlabel">Tamanho da Sombra</span><br>
<input id="blur" class="round" value="0" type="text">
</td>
<td style="width:50% !important">
<span class="dbminputlabel">Intensidade</span><br>
<input id="int" class="round" value="1" type="text">
</td>
</tr></table>

   <br>

    <span class="dbminputlabel">Cor da Sombra</span><br>
    <table style="width:100%"><tr><th><input id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Opcional" onchange="(function(){
      var input = document.getElementById('shadowcor');
      var valor = input.value;
      document.getElementById('exib4').style.background = valor;
      })()"></th>
    <th style="width:60px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
      document.getElementById('shadowcor').type = 'color'
      document.getElementById('3btr1').style.display = 'none';
      document.getElementById('3btr2').style.display = 'block';
      })()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib4">&#8203;</div></div></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
        document.getElementById('shadowcor').type = 'text';
        document.getElementById('3btr1').style.display = 'block';
        document.getElementById('3btr2').style.display = 'none';
        })()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

          
       <div id="sombra3" style="padding:12px">
       ⚠️ Recurso parcialmente indisponível, a sombra ficará dentro da Cor de Fundo
</div>

</div>
</tab>
</tab-system>

<style>
td{padding:5px}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
xinspace{padding:5px 0px 0px 0px;display:block}
</style>`
  },

  init() {
    const { glob, document } = this

    glob.onChangexin2 = function (event) {
      if (event.value === "10") {
        document.getElementById("controlador2x").style.display = 'none';
        document.getElementById("controlador3x").style.display = null;
        document.getElementById("controlador4x").style.display = null;
      } else {
        document.getElementById("controlador2x").style.display = null;
        document.getElementById("controlador3x").style.display = 'none';
        document.getElementById("controlador4x").style.display = 'none';
      }
    }
    glob.onChangexin2(document.getElementById('storage2'))


    glob.onChangexin = function (event) {
      var controlador1 = document.getElementById('controlador1');
      if (event.value === '10') {
        controlador1.style.width = "160px"
        document.getElementById("controlador2").style.display = 'none';
        document.getElementById("controlador3").style.display = null;
      } else {
        controlador1.style.width = "40%"
        document.getElementById("controlador2").style.display = null;
        document.getElementById("controlador3").style.display = 'none';
      }
    }
    glob.onChangexin(document.getElementById('storage'))

    var input = document.getElementById('colorfundo');
    var valor = input.value;
    document.getElementById('exib').style.background = valor;

    var input2 = document.getElementById('color');
    var valor2 = input2.value;
    document.getElementById('exib2').style.background = valor2;

    var input3 = document.getElementById('shadowcor2');
    var valor3 = input3.value;
    document.getElementById('exib3').style.background = valor3;

    var input4 = document.getElementById('shadowcor');
    var valor4 = input4.value;
    document.getElementById('exib4').style.background = valor4;

    glob.onChange0 = function (event) {
      switch (parseInt(event.value)) {
        case 0:
          gradientr.style.display = 'none'
          cor.style.display = null
          Gradient3.style.display = 'none'
          xinxyludod.style.display = 'none'
          xinxyludoc.style.width = "100%"
          break
        case 1:
          gradientr.style.display = null
          cor.style.display = 'none'
          Gradient3.style.display = 'none'
          xinxyludod.style.display = 'none'
          xinxyludoc.style.width = "100%"
          break
        case 2:
          gradientr.style.display = 'none'
          cor.style.display = 'none'
          Gradient3.style.display = null
          xinxyludod.style.display = null
          xinxyludoc.style.width = "40%"
          break
        case 10:
          gradientr.style.display = 'none'
          cor.style.display = 'none'
          Gradient3.style.display = 'none'
          xinxyludod.style.display = 'none'
          xinxyludoc.style.width = "100%"
          break
      }
    }
    glob.onChange0(document.getElementById('tipocor'))

    glob.onChange2 = function (event) {
      switch (parseInt(event.value)) {
        case 0:
          gradient2r.style.display = 'none'
          cor2.style.display = 'none'
          Gradient2.style.display = 'none'
          xinxyludoa.style.display = 'none'
          xinxyludob.style.width = "100%"
          break
        case 1:
          gradient2r.style.display = 'none'
          cor2.style.display = null
          Gradient2.style.display = 'none'
          xinxyludoa.style.display = 'none'
          xinxyludob.style.width = "100%"
          break
        case 2:
          gradient2r.style.display = null
          cor2.style.display = 'none'
          Gradient2.style.display = 'none'
          xinxyludoa.style.display = 'none'
          xinxyludob.style.width = "100%"
          break
        case 3:
          gradient2r.style.display = 'none'
          cor2.style.display = 'none'
          Gradient2.style.display = null
          xinxyludoa.style.display = null
          xinxyludob.style.width = "40%"
          break
      }
    }
    glob.onChange2(document.getElementById('tipocor2'))

    glob.onChange1x = function (event) {
      const type = document.getElementById('type')
      const sombrafund = document.getElementById('sombrafund')
      const sombrafund2 = document.getElementById('sombrafund2')
      const sombrafund3 = document.getElementById('sombra3')
      if (event.value === '1') {
        if (type.value === "0" || type.value === "3") {
          sombrafund.style.display = 'none'
          sombrafund2.style.display = null
          sombrafund3.style.display = null
        } else {
          sombrafund.style.display = null
          sombrafund2.style.display = 'none'
          sombrafund3.style.display = 'none'
        }
      } else {
        sombrafund.style.display = null
        sombrafund2.style.display = 'none'
        sombrafund3.style.display = 'none'
      }
    }
    glob.onChange1x(document.getElementById('lineCap'))

    glob.onChange1 = function (event) {
      value = parseInt(event.value)
      const Change1text = document.getElementById('Change1text')
      const Change2text = document.getElementById('Change2text')
      const Change3text = document.getElementById('quadratico')
      const Change4text = document.getElementById('circulatico')
      const sombrafund = document.getElementById('sombrafund')
      const sombrafund2 = document.getElementById('sombrafund2')
      const sombrafund3 = document.getElementById('sombra3')
      const lineCap = document.getElementById('lineCap')
      if (event.value === '0') {
        Change1text.innerHTML = 'Largura da Barra'
        Change2text.innerHTML = 'Altura da Barra'
        conteudo2g.style.display = 'none'
        Change3text.style.display = null
        Change4text.style.display = 'none'
        document.getElementById("xinimg").style.display = 'none';
        document.getElementById("tipolinha").style.display = null;

        if (lineCap.value === "1") {
          sombrafund.style.display = 'none'
          sombrafund2.style.display = null
          sombrafund3.style.display = null
        } else {
          sombrafund.style.display = null
          sombrafund2.style.display = 'none'
          sombrafund3.style.display = 'none'
        }

      }
      if (event.value === '3') {
        Change1text.innerHTML = 'Largura da Barra'
        Change2text.innerHTML = 'Altura da Barra'
        conteudo2g.style.display = 'none'
        Change3text.style.display = null
        Change4text.style.display = 'none'
        document.getElementById("xinimg").style.display = null;
        document.getElementById("tipolinha").style.display = null;

        if (lineCap.value === "1") {
          sombrafund.style.display = 'none'
          sombrafund2.style.display = null
          sombrafund3.style.display = null
        } else {
          sombrafund.style.display = null
          sombrafund2.style.display = 'none'
          sombrafund3.style.display = 'none'
        }

      } else if (event.value === '1') {
        Change1text.innerHTML = 'Raio (2x altura/largura)'
        Change2text.innerHTML = 'Tamanho'
        conteudo2g.style.display = null
        Change3text.style.display = 'none'
        Change4text.style.display = null
        sombrafund.style.display = null
        sombrafund2.style.display = 'none'
        sombrafund3.style.display = 'none'
        document.getElementById("xinimg").style.display = 'none';
        document.getElementById("tipolinha").style.display = null;
      } else if (event.value === '2') {
        Change1text.innerHTML = 'Raio (2x altura/largura)'
        Change2text.innerHTML = 'Tamanho'
        conteudo2g.style.display = null
        Change3text.style.display = 'none'
        Change4text.style.display = null
        sombrafund.style.display = null
        sombrafund2.style.display = 'none'
        sombrafund3.style.display = 'none'
        document.getElementById("xinimg").style.display = 'none';
        document.getElementById("tipolinha").style.display = null;
      } else if (event.value === '3') {
        Change1text.innerHTML = 'Largura da Barra'
        Change2text.innerHTML = 'Altura da Barra'
        conteudo2g.style.display = 'none'
        Change3text.style.display = null
        Change4text.style.display = 'none'
        sombrafund.style.display = 'none'
        sombrafund3.style.display = 'none'
        sombrafund2.style.display = null
        document.getElementById("xinimg").style.display = null;
        document.getElementById("tipolinha").style.display = null;
      } else if (value >= 100) {
        Change1text.innerHTML = 'Largura da Barra'
        Change2text.innerHTML = 'Altura da Barra'
        conteudo2g.style.display = 'none'
        Change3text.style.display = null
        Change4text.style.display = 'none'
        sombrafund.style.display = 'none'
        sombrafund3.style.display = 'none'
        sombrafund2.style.display = null
        document.getElementById("xinimg").style.display = 'none';
        document.getElementById("tipolinha").style.display = 'none';
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

    glob.formatItem = function (data) {
      function verificarCor(cor) {
        var regexHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        var regexRgba = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+(?:\.\d+)?)?\s*\)$/;
        var nomesCores = [
          "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
          "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
          "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki",
          "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
          "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray",
          "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold",
          "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory",
          "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
          "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen",
          "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
          "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
          "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
          "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange",
          "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip",
          "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown",
          "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
          "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato",
          "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
        ];

        if (regexHex.test(cor)) {
          setcor = data.cor
        } else if (regexRgba.test(cor)) {
          setcor = data.cor
        } else if (nomesCores.includes(cor.toLowerCase())) {
          setcor = data.cor
        } else if (CSS.supports("color", cor)) {
          setcor = data.cor
        } else {
          setcor = ""
        }
      }

      verificarCor(data.cor);

      let result = ``;
      result += `<div style="margin-left:-10px;background:${setcor};float:left;width:10px;overflow:hidden;height:30px;"><br></div>`
      result += `<div style="float:left;width:50%;overflow:hidden;padding-left:10px;"> Posição: ${data.posicao} </div>`
      result += `<div style="float:right;width:50%;overflow:hidden;"> Cor: ${data.cor} </div>`
      return result;
    }

    glob.formatItem2 = function (data) {
      function verificarCor2(cor) {
        var regexHex2 = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        var regexRgba2 = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d+(?:\.\d+)?)?\s*\)$/;
        var nomesCores2 = [
          "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond",
          "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
          "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki",
          "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
          "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray",
          "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold",
          "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory",
          "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
          "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen",
          "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
          "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen",
          "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue",
          "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange",
          "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip",
          "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown",
          "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
          "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato",
          "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"
        ];

        if (regexHex2.test(cor)) {
          setcor2 = data.cor
        } else if (regexRgba2.test(cor)) {
          setcor2 = data.cor
        } else if (nomesCores2.includes(cor.toLowerCase())) {
          setcor2 = data.cor
        } else if (CSS.supports("color", cor)) {
          setcor2 = data.cor
        } else {
          setcor2 = ""
        }
      }

      verificarCor2(data.cor);

      let result2 = ``;
      result2 += `<div style="margin-left:-10px;background:${setcor2};float:left;width:10px;overflow:hidden;height:30px;"><br></div>`
      result2 += `<div style="float:left;width:50%;overflow:hidden;padding-left:10px;"> Posição: ${data.posicao} </div>`
      result2 += `<div style="float:right;width:50%;overflow:hidden;"> Cor: ${data.cor} </div>`
      return result2;
    }

  },

  async action(cache) {
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const tipocor = parseInt(data.tipocor);
    const tipocor2 = parseInt(data.tipocor2);
    const type = parseInt(data.type)

    var width = parseInt(this.evalMessage(data.width, cache))
    if (width > 0) { } else { width = 100 }

    var height = parseInt(this.evalMessage(data.height, cache))
    if (height > 0) { } else { height = 10 }

    var lineWidth = parseInt(this.evalMessage(data.lineWidth, cache))
    if (lineWidth > 0) { } else { lineWidth = 10 }

    var percent = this.evalMessage(data.percent, cache)
    if (percent > 0) { } else { percent = 0 }

    let blur = parseInt(this.evalMessage(data.blur, cache));
    if (isNaN(blur)) {
      blur = 0;
    }


    let int = parseInt(this.evalMessage(data.int, cache));
    if (isNaN(int)) {
      int = 1;
    }
    if (int > 100) {
      int = 100;
    }

    let int2 = parseInt(this.evalMessage(data.int2, cache));
    if (isNaN(int2)) {
      int2 = 1;
    }
    if (int2 > 100) {
      int2 = 100;
    }

    const rotacao = this.evalMessage(data.rotacao, cache)
    const shadowcor = this.evalMessage(data.shadowcor, cache);
    const lineCap = parseInt(data.lineCap)
    let Cap
    switch (lineCap) {
      case 0:
        Cap = 'square'
        break
      case 1:
        Cap = 'round'
        break
    }

    const shadowcor2 = this.evalMessage(data.shadowcor2, cache);
    let blur2 = parseInt(this.evalMessage(data.blur2, cache));
    if (isNaN(blur2)) {
      blur2 = 0;
    }


    var max = blur2
    if (blur > blur2) { max = blur }

    if (lineCap == 1 && type == 0) {
      max = (max / 2)
    }

    if (type >= 100) {
      lineWidth = height
      height = height
    }
    if (type == 3) {
      if (lineCap == 1) { max = blur }
      lineWidth = height
      height = height + (max * 2)
    }
    if (type == 2) { height = (width * 2) + lineWidth + (max * 2) }
    if (type == 1) { height = (width * 2) + lineWidth + (max * 2) }
    if (type == 0) {
      lineWidth = height
      height = height + (max * 2)
    }

    const color = this.evalMessage(data.color, cache)
    const colorfundo = this.evalMessage(data.colorfundo, cache)
    let canvas
    if (type === 0) {
      canvas = Canvas.createCanvas(width + max, height + (max / 2))
    } else if (type === 1) {
      canvas = Canvas.createCanvas(height, height)
    } else if (type === 2) {
      canvas = Canvas.createCanvas(height, height)
    } else if (type === 3) {
      if (lineCap == 1) { max = blur }
      canvas = Canvas.createCanvas(width + max, height + (max / 2))
    } else if (type >= 100) {
      canvas = Canvas.createCanvas(width, height)
    }
    const ctx = canvas.getContext('2d')

    ctx.lineWidth = lineWidth

    if (type === 0) {

      ctx.stroke()
      ctx.beginPath()
      if (tipocor2 > 0) {
        if (tipocor2 == 1) {
          ctx.strokeStyle = colorfundo
        }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;

          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, max, 0, (height - max)) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(0, max, (width - max), (height - max)) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(0, 0, (width - max), 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient((width - max), max, 0, (height - max)) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, (height - max), 0, max) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient((width - max), (height - max), 0, max) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient((width - max), 0, 0, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(0, (height - max), (width - max), max) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient(((width - max) / 2), (height / 2), 0, ((width - max) / 2), (height / 2), ((width - max) / 2)) }

          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

        if (lineCap == 1) { ctx.lineCap = Cap }

        if (lineCap == 1) {
          const center = lineWidth / 2
          const top = height / 2 - center
          const bottom = height / 2 + center
          ctx.moveTo(center, top)
          ctx.lineTo(width - lineWidth, top)
          ctx.arcTo(width, top, width, height / 2, center)
          ctx.arcTo(width, bottom, top, bottom, center)
          ctx.lineTo(center, bottom)
          ctx.arcTo(0, bottom, 0, height / 2, center)
          ctx.arcTo(0, top, center, top, center)
          ctx.closePath()
          ctx.clip()
          ctx.beginPath()
          ctx.moveTo(-center, height / 2)
          ctx.lineTo(width * percent / 100 - center, height / 2)
        }
        ctx.shadowColor = shadowcor2
        ctx.shadowBlur = blur2
        ctx.moveTo(max, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        for (let intA = 0; intA < int2; intA++) {
          ctx.stroke()
        }
      }

      ctx.beginPath()
      ctx.translate(max, 0)

      if (tipocor == 0) { ctx.strokeStyle = color }
      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, max, 0, (height - max)) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(0, max, (width - max), (height - max)) }
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(0, 0, (width - max), 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient((width - max), max, 0, (height - max)) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, (height - max), 0, max) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient((width - max), (height - max), 0, max) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient((width - max), 0, 0, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(0, (height - max), (width - max), max) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient(((width - max) / 2), (height / 2), 0, ((width - max) / 2), (height / 2), ((width - max) / 2)) }

        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }
        ctx.strokeStyle = gradientx3;
      }

      if (lineCap == 1) {
        ctx.moveTo(-height, height / 2)
      } else {
        ctx.moveTo(0, height / 2)
      }

      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;

      if (tipocor == 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

      if (lineCap == 1) {
        ctx.lineTo((width * percent) / 100 - (height / 2), height / 2)
      } else {
        ctx.lineTo(((width - max) * percent) / 100, height / 2)
      }



      ctx.stroke()
      for (let intB = 0; intB < int; intB++) {
        ctx.stroke()
      }
    }





    if (type === 1) {
      if (lineCap == 1) { ctx.lineCap = Cap }
      ctx.stroke()
      ctx.beginPath()
      ctx.translate(height / 2, height / 2)
      ctx.rotate(rotacao * Math.PI / 180)
      if (tipocor2 > 0) {
        if (tipocor2 == 1) { ctx.strokeStyle = colorfundo }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;
          
          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, -width, 0, width) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(-width, -width, width, width) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(-width, 0, width, 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient(width, -width, -width, width) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, width, 0, -width) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient(width, width, -width, -width) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient(width, 0, -width, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(-width, width, width, -width) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient((width / 2), (width / 2), 0, (width / 2), (width / 2), (width / 2)) }

          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

        ctx.shadowColor = shadowcor2
        ctx.shadowBlur = blur2

        if (tipocor == 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

        ctx.arc(0, 0, width, 0, Math.PI * 2 * 100 / 100, false)
        ctx.stroke()
        for (let intA = 1; intA < int2; intA++) {
          ctx.stroke()
        }
      }

      ctx.beginPath()

      if (tipocor == 0) {
        ctx.strokeStyle = color
      }

      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, -width, 0, width) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(-width, -width, width, width) }
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(-width, 0, width, 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient(width, -width, -width, width) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, width, 0, -width) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient(width, width, -width, -width) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient(width, 0, -width, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(-width, width, width, -width) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient(width, width, 0, width, -width, width) }

        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }

        ctx.strokeStyle = gradientx3;

      }

      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;
      ctx.arc(0, 0, width, 0, Math.PI * 2 * percent / 100, false)
      ctx.stroke()
      for (let intB = 1; intB < int; intB++) {
        ctx.stroke()
      }
    }


    if (type === 2) {
      if (lineCap == 1) { ctx.lineCap = Cap }
      ctx.stroke()
      ctx.beginPath()
      ctx.translate(height / 2, height / 2)
      ctx.rotate(rotacao * Math.PI / 180)
      if (tipocor2 > 0) {
        if (tipocor2 == 1) { ctx.strokeStyle = colorfundo }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;

          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, -width, 0, width) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(-width, -width, width, width) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(-width, 0, width, 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient(width, -width, -width, width) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, width, 0, -width) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient(width, width, -width, -width) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient(width, 0, -width, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(-width, width, width, -width) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient((width / 2), (width / 4), 0, (width / 2), (width / 4), (width / 2)) }

          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

        ctx.shadowColor = shadowcor2
        ctx.shadowBlur = blur2

        if (tipocor == 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

        ctx.arc(0, 0, width, 0, Math.PI * 2 * 50 / 100, false)
        ctx.stroke()
        for (let intA = 1; intA < int2; intA++) {
          ctx.stroke()
        }
      }

      ctx.beginPath()

      if (tipocor == 0) {
        ctx.strokeStyle = color
      }

      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, -width, 0, width) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(-width, -width, width, width)}
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(-width, 0, width, 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient(width, -width, -width, width) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, width, 0, -width) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient(width, width, -width, -width) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient(width, 0, -width, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(-width, width, width, -width) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient((width / 2), (width / 4), 0, (width / 2), (width / 4), (width / 2)) }

        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }

        ctx.strokeStyle = gradientx3;

      }

      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;
      ctx.arc(0, 0, width, 0, Math.PI * 2 * (percent / 2) / 100, false)
      ctx.stroke()
      for (let intB = 1; intB < int; intB++) {
        ctx.stroke()
      }
    }


    if (type === 3) {

      ctx.stroke()
      ctx.beginPath()
      if (tipocor2 > 0) {
        if (tipocor2 == 1) {
          ctx.strokeStyle = colorfundo
        }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;

          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, max, 0, (height - max)) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(0, max, (width - max), (height - max)) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(0, 0, (width - max), 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient((width - max), max, 0, (height - max)) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, (height - max), 0, max) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient((width - max), (height - max), 0, max) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient((width - max), 0, 0, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(0, (height - max), (width - max), max) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient(((width - max) / 2), (height / 2), 0, ((width - max) / 2), (height / 2), ((width - max) / 2)) }


          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

        if (lineCap == 1) { ctx.lineCap = Cap }

        if (lineCap == 1) {
          const center = lineWidth / 2
          const top = height / 2 - center
          const bottom = height / 2 + center
          ctx.moveTo(center, top)
          ctx.lineTo(width - lineWidth, top)
          ctx.arcTo(width, top, width, height / 2, center)
          ctx.arcTo(width, bottom, top, bottom, center)
          ctx.lineTo(center, bottom)
          ctx.arcTo(0, bottom, 0, height / 2, center)
          ctx.arcTo(0, top, center, top, center)
          ctx.closePath()
          ctx.clip()
          ctx.beginPath()
          ctx.moveTo(-center, height / 2)
          ctx.lineTo(width * percent / 100 - center, height / 2)
          max = blur
        }
        ctx.shadowColor = shadowcor2
        ctx.shadowBlur = blur2
        ctx.moveTo(max, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        for (let int2A = 0; int2A < int2; int2A++) {
          ctx.stroke()
        }
      }


      ctx.beginPath()
      ctx.translate(max, 0)

      if (tipocor == 0) { ctx.strokeStyle = color }
      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, max, 0, (height - max)) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(0, max, (width - max), (height - max)) }
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(0, 0, (width - max), 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient((width - max), max, 0, (height - max)) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, (height - max), 0, max) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient((width - max), (height - max), 0, max) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient((width - max), 0, 0, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(0, (height - max), (width - max), max) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient(((width - max) / 2), (height / 2), 0, ((width - max) / 2), (height / 2), ((width - max) / 2)) }


        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }
        ctx.strokeStyle = gradientx3;
      }
      if (tipocor === 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

      const storage2 = parseInt(data.storage2)
      const local2 = this.evalMessage(data.local2, cache)
      if (storage2 == 10) {
        try {
          await Canvas.loadImage(local2).then((imagex) => {
            var scalex = this.evalMessage(data.iwidth, cache)
            var scaley = this.evalMessage(data.iheight, cache)
            if (scalex == '') { scalex = "100%" }
            if (scaley == '') { scaley = "100%" }
            imagew = imagex.width
            imageh = imagex.height
            let scalew = 1
            let scaleh = 1
            scale(scalex, scaley)
            const canvas2 = Canvas.createCanvas(imagew, imageh)
            const ctx2 = canvas2.getContext('2d')
            ctx2.drawImage(imagex, 0, 0, imagew, imageh)
            image2 = new Canvas.Image()
            image2.src = canvas2.toDataURL('image/png').replace('image/png', 'image/octet-stream')

            function scale(w, h) {
              if (w.endsWith('%')) {
                const percent = w.replace('%', '')
                scalew = parseInt(percent) / 100
              } else {
                scalew = parseInt(w) / imagew
              }
              if (h.endsWith('%')) {
                const percent = h.replace('%', '')
                scaleh = parseInt(percent) / 100
              } else {
                scaleh = parseInt(h) / imageh
              }
              imagew *= scalew
              imageh *= scaleh
            }

          })
        } catch (err) {
          return
        }
      } else {
        const storage2 = parseInt(data.storage2)
        const varName2 = this.evalMessage(data.varName2, cache)
        const imagedata2 = this.getVariable(storage2, varName2, cache)
        image2 = new Canvas.Image()
        image2.src = imagedata2
        imagew = image2.width
        imageh = image2.height
      }


      if (lineCap == 1) {
        ctx.moveTo(-height, height / 2)
      } else {
        ctx.moveTo(0, height / 2)
      }

      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;




      if (lineCap == 1) {
        ctx.lineTo((width * percent) / 100 - (height / 2), height / 2)
      } else {

        ctx.lineTo(((width - max) * percent) / 100, height / 2)

      }

      if (tipocor !== 10) {
        ctx.stroke()
        for (let intB = 0; intB < int; intB++) {
          ctx.stroke()
        }
      }

      if (lineCap == 1) {

        ctx.beginPath()
        ctx.translate(0, 0)
        newwidth = width - imagew
        newposition = (newwidth / 100) * percent
        var ipos = parseInt(this.evalMessage(data.ipos, cache))
        if (isNaN(ipos)) {
          ipos = 0;
        }
        ipos = ipos + max
        ctx.drawImage(image2, newposition, ipos, imagew, imageh)

      } else {
        ctx.beginPath()
        ctx.translate(0, 0)
        newwidth = (width - max) - imagew
        newposition = (newwidth / 100) * percent
        var ipos = parseInt(this.evalMessage(data.ipos, cache))
        if (isNaN(ipos)) {
          ipos = 0;
        }
        ipos = ipos + max
        ctx.drawImage(image2, newposition, ipos, imagew, imageh)
      }



    }


    if (type === 100) {

      ctx.stroke()
      ctx.beginPath()
      if (tipocor2 > 0) {
        if (tipocor2 == 1) {
          ctx.strokeStyle = colorfundo
        }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;

          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, 0, 0, height) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(0, 0, width, height) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(0, 0, width, 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient(width, 0, 0, height) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, height, 0, 0) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient(width, height, 0, 0) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient(width, 0, 0, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(0, height, width, 0) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient((width / 2), (height / 2), 0, (width / 2), (height / 2), (width / 2)) }

          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

      


        const center = lineWidth / 2
        const top = height / 2 - center
        const bottom = height / 2 + center
        ctx.moveTo(center, top)
        ctx.lineTo(width - lineWidth, top)
        ctx.arcTo(width, top, width, height, center + (width/6))
        ctx.arcTo((width/1.5), bottom, top, bottom, center)
        ctx.lineTo(center, bottom)
        ctx.arcTo(0, bottom, 0, height / 2, center+ (width/6))
        ctx.arcTo(0, top, center, top, center)
        ctx.closePath()
        ctx.clip()
        ctx.beginPath()
        ctx.moveTo(-center, height / 2)
        ctx.lineTo(width * percent / 100 - center, height / 2)


        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        for (let intA = 0; intA < int2; intA++) {
          ctx.stroke()
        }
      }

      ctx.beginPath()
      ctx.translate(0, 0)

      if (tipocor == 0) { ctx.strokeStyle = color }
      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, 0, 0, height) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(0, 0, width, height) }
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(0, 0, width, 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient(width, 0, 0, height) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, height, 0, 0) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient(width, height, 0, 0) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient(width, 0, 0, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(0, height, width, 0) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient((width / 2), (height / 2), 0, (width / 2), (height / 2), (width / 2)) }

        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }
        ctx.strokeStyle = gradientx3;
      }

      ctx.moveTo(-height, height / 2)
      
      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;

      if (tipocor == 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

      ctx.lineTo((width * percent) / 100, height / 2)
    


      ctx.stroke()
      for (let intB = 0; intB < int; intB++) {
        ctx.stroke()
      }
    }

    if (type === 101) {

      ctx.stroke()
      ctx.beginPath()
      if (tipocor2 > 0) {
        if (tipocor2 == 1) {
          ctx.strokeStyle = colorfundo
        }
        if (tipocor2 == 2) {
          eval(String(this.evalMessage(data.gradiente2, cache)))
          ctx.strokeStyle = gradient;
        }
        if (tipocor2 == 3) {
          const gradients2 = data.gradient2;

          if (data.apartir2 == "0") { var gradientx = ctx.createLinearGradient(0, 0, 0, height) }
          if (data.apartir2 == "1") { var gradientx = ctx.createLinearGradient(0, 0, width, height) }
          if (data.apartir2 == "2") { var gradientx = ctx.createLinearGradient(0, 0, width, 0) }
          if (data.apartir2 == "3") { var gradientx = ctx.createLinearGradient(width, 0, 0, height) }
          if (data.apartir2 == "4") { var gradientx = ctx.createLinearGradient(0, height, 0, 0) }
          if (data.apartir2 == "5") { var gradientx = ctx.createLinearGradient(width, height, 0, 0) }
          if (data.apartir2 == "6") { var gradientx = ctx.createLinearGradient(width, 0, 0, 0) }
          if (data.apartir2 == "7") { var gradientx = ctx.createLinearGradient(0, height, width, 0) }
          if (data.apartir2 == "8") { var gradientx = ctx.createRadialGradient((width / 2), (height / 2), 0, (width / 2), (height / 2), (width / 2)) }

          for (let i = 0; i < gradients2.length; i++) {
            const gradient = gradients2[i];
            var posicao = this.evalMessage(gradient.posicao, cache);
            var posicao = (posicao / 100)
            const cor = this.evalMessage(gradient.cor, cache);
            gradientx.addColorStop(posicao, cor)
          }
          ctx.strokeStyle = gradientx;
        }

      const numPoints = 5;

        const x = width / 2;
        const y = height / 2;
        const atk = 100
        const outerRadius = width / 2;
        const innerRadius = outerRadius / (0.01 * atk + 1);
        
        const angleIncrement = (2 * Math.PI) / numPoints;
        const rotationAngle = (0 * Math.PI) / 180; // x i n x y la
  

        ctx.beginPath();
        ctx.moveTo(x + outerRadius * Math.cos(-Math.PI / 2 + rotationAngle), y + outerRadius * Math.sin(-Math.PI / 2 + rotationAngle));
  
        for (let i = 0; i < numPoints; i++) {
          const outerX = x + outerRadius * Math.cos((i * angleIncrement) - (Math.PI / 2) + rotationAngle);
          const outerY = y + outerRadius * Math.sin((i * angleIncrement) - (Math.PI / 2) + rotationAngle);
          ctx.lineTo(outerX, outerY);
  
          const innerX = x + innerRadius * Math.cos(((i + 0.5) * angleIncrement) - (Math.PI / 2) + rotationAngle);
          const innerY = y + innerRadius * Math.sin(((i + 0.5) * angleIncrement) - (Math.PI / 2) + rotationAngle);
          ctx.lineTo(innerX, innerY);
        }
  
        ctx.closePath();
        ctx.clip();


        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke()
        for (let intA = 0; intA < int2; intA++) {
          ctx.stroke()
        }
      }

      ctx.beginPath()
      ctx.translate(0, 0)

      if (tipocor == 0) { ctx.strokeStyle = color }
      if (tipocor == 1) {
        eval(String(this.evalMessage(data.gradiente, cache)))
        ctx.strokeStyle = gradient;
      }
      if (tipocor == 2) {
        const gradients3 = data.gradient3;

        if (data.apartir == "0") { var gradientx3 = ctx.createLinearGradient(0, 0, 0, height) }
        if (data.apartir == "1") { var gradientx3 = ctx.createLinearGradient(0, 0, width, height) }
        if (data.apartir == "2") { var gradientx3 = ctx.createLinearGradient(0, 0, width, 0) }
        if (data.apartir == "3") { var gradientx3 = ctx.createLinearGradient(width, 0, 0, height) }
        if (data.apartir == "4") { var gradientx3 = ctx.createLinearGradient(0, height, 0, 0) }
        if (data.apartir == "5") { var gradientx3 = ctx.createLinearGradient(width, height, 0, 0) }
        if (data.apartir == "6") { var gradientx3 = ctx.createLinearGradient(width, 0, 0, 0) }
        if (data.apartir == "7") { var gradientx3 = ctx.createLinearGradient(0, height, width, 0) }
        if (data.apartir == "8") { var gradientx3 = ctx.createRadialGradient((width / 2), (height / 2), 0, (width / 2), (height / 2), (width / 2)) }

        for (let i = 0; i < gradients3.length; i++) {
          const gradient3 = gradients3[i];
          var posicao = this.evalMessage(gradient3.posicao, cache);
          var posicao = (posicao / 100)
          const cor3 = this.evalMessage(gradient3.cor, cache);
          gradientx3.addColorStop(posicao, cor3)
        }
        ctx.strokeStyle = gradientx3;
      }

      ctx.moveTo(-height, height / 2)
      
      ctx.shadowColor = shadowcor
      ctx.shadowBlur = blur;

      if (tipocor == 10) { ctx.strokeStyle = 'rgba(0,0,0,0)' }

      ctx.lineTo((width * percent) / 100, height / 2)
    


      ctx.stroke()
      for (let intB = 0; intB < int; intB++) {
        ctx.stroke()
      }
    }



    if (storage == 10) {
      const fs = require('fs')
      const buffer = canvas.toBuffer()
      const local = this.evalMessage(data.local, cache)
      if (local) {
        fs.writeFileSync(local, buffer)
      }
      this.callNextAction(cache)
    } else {
      const result = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
      this.storeValue(result, storage, varName, cache)
      this.callNextAction(cache)
    }
  },

  mod() { }
}
