module.exports = {

	name: "Canvas Draw Text on Image MOD",
	section: "Image Editing",
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

		if (data.storage == "10") {
			var salvar = `Local: ${data.local}`
		} else {
			var storeTypes = ['', 'Variavel Temporaria', 'Variavel Servidor', 'Variavel Global']
			var salvar = `${storeTypes[parseInt(data.storage)]} (${data.varName})`
		}

		return data.description
			? `<font style="color:${desccor}">${data.description}</font>`
			: `<font style="color:${desccor}">${data.text} ~ ${salvar}</font>`
	},

	fields: ["storage", "varName", "local", "x", "y", "fontPath", "fontColor", "fontSize", "align", "text", "shadowtipo", "shadowcor", "blur", "int", "shadowh", "shadowv", "largura", "larguramax", "alturamax", "rotacionar", "x2", "y2", "tipocor", "gradiente", "gradient2", "apartir", "flargura", "faltura", "xinit", "yinit", "bgradient2", "apartir2", "flargura2", "faltura2", "xinit2", "yinit2", "distancia", "menulargura", "bordatipo", "borda", "bordacor", "bordagradiente", "descriptioncolor", "description", "descriptionx"],

	html: function (isEvent, data) {
		return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.8</div>

	<div style="width: 100%; padding:0px 4px;height: calc(100vh - 160px);overflow:auto">

	<tab-system style="margin-top: 0">
		<tab label="Texto" icon="align left">
		<div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

		<span class="dbminputlabel">Texto</span><br>
			<textarea id="text" placeholder="Insira seu texto aqui..." style="width: 100%; white-space: nowrap; resize: yes;height: calc(100vh - 250px)"></textarea>
		</div>

	</tab>
		
	<tab label="Posição/Tamanho" icon="move">
	<div style="width: 100%; padding:8px;height: calc(100vh - 210px);overflow:auto">

				<span class="dbminputlabel">Posição do Texto</span>
				<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
					<table style="width:100%">
						<tr>
							<td style="width:33% !important">
								<span class="dbminputlabel">Posição X</span><br>
								<input id="x" class="round" type="text" value="0">
							</td>
							<td style="width:33% !important">
								<span class="dbminputlabel">Posição Y</span><br>
								<input id="y" class="round" type="text" value="0">
							</td>
							<td style="width:33% !important">
								<span class="dbminputlabel">Alinhamento</span><br>
								<select id="align" class="round" style="width: 100%;">
									<option value="0" selected>Superior esquerdo</option>
									<option value="1">Superior centralizado</option>
									<option value="2">Superior direito</option>
									<option value="3">Meio esquerdo</option>
									<option value="4">Meio centralizado</option>
									<option value="5">Meio direito</option>
									<option value="6">Inferior esquerdo</option>
									<option value="7">inferior centralizado</option>
									<option value="8">Inferior direito</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
			

		<div style="padding-top:12px">
		<span class="dbminputlabel">Girar texto</span>
		<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
		<table style="width:100%"><tr>
		<td style="width:33% !important">
		<span class="dbminputlabel">Girar (Graus)</span><br>
			<input id="rotacionar" class="round" type="text" value="0">
		</td>

		<td style="width:33% !important">
		<span class="dbminputlabel">Correção X</span><br>
			<input id="x2" class="round" type="text" value="0">
		</td>

		<td style="width:33% !important">
		<span class="dbminputlabel">Correção Y</span><br>
			<input id="y2" class="round" type="text" value="0">
		</td>



		</tr></table></div></div>


		<div style="padding-top:12px">
		
		<span class="dbminputlabel">Tamanho / Limites de largura e altura</span>
<div style="width:100%;background:rgba(50,50,50,0.5);-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;padding:8px 4px">
<select id="menulargura" class="round" onchange="glob.onChange1(this)">
<option value="0" selected>Nenhuma</option>
<option value="1">Largura Fixa</option>
<option value="2">Limite de largura e altura</option>
<option value="3">Limite de largura e altura [Evitar quebra de palavras]</option>
</select>

<div id="xinelas01" style="padding-top:12px">
<span class="dbminputlabel">Largura Fixa</span><br>
<input id="largura" class="round" type="text" placeholder="Requerido">
</div>
<div id="xinelas02" style="padding-top:12px">
<table style="width:100%"><tr>
<td style="width:50%">
<span class="dbminputlabel">Largura Máxima</span><br>
<input id="larguramax" class="round" type="text" placeholder="Requerido">
</td>
<td style="width:50%">
<span class="dbminputlabel">Altura Máxima</span><br>
<input id="alturamax" class="round" type="text" placeholder="Opcional">
</td></tr>
</table>
<xinspace>
<span class="dbminputlabel">Altura de distância do texto quando soltar linha</span><br>
<input id="distancia" class="round" type="text" placeholder="Opcional">

</div>

</div></div>


</div>
	</tab>

	<tab label="Cor" icon="flask">
		<div style="padding-top:12px">
			
		<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
		<div style="float: left; width: 100%;" id="xinxyludob">
  <span class="dbminputlabel">Tipo de Cor</span>
    <select id="tipocor" class="round" onchange="glob.onChange0(this)">
      <option value="0" selected>Cor (HEX ou RGBA)</option>
      <option value="1">Cor Gradiente / EVAL</option>
      <option value="2">Cor Gradiente / Guiado</option>
    </select>
  </div>

  <div style="float: left; width: 60%;padding-left:4px" id="xinxyludo">
  <span class="dbminputlabel">A partir</span>
    <select id="apartir" class="round">
      <option value="0" selected>Cima para baixo</option>
      <option value="1">Diagonal esquerda de cima para baixo</option>
      <option value="2">Direita para esquerda</option>
      <option value="3">Diagonal direita de cima para baixo</option>
      <option value="4">De baixo para cima</option>
      <option value="5">Diagonal esquerda de baixo para cima</option>
      <option value="6">Esquerda para direita</option>
      <option value="7">Diagonal direita de baixo para cima</option>
	  <option value="8">Radial</option>
    </select>
  </div>

</div>

<div id="Gradient2" style="display: none; float: left; width: 100%;">
<xinspace>
<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
		<div style="float: left; width: 50%">
		<span class="dbminputlabel">Largura máxima do gradiente</span><br>
		<input id="flargura" class="round" type="text" value="100%" placeholder="Deixe vazio para o tamanho máximo">
  </div>

  <div style="float: left; width: 50%;padding-left:4px">
  <span class="dbminputlabel">Altura máxima do gradiente</span><br>
  <input id="faltura" class="round" type="text" value="100%" placeholder="Deixe vazio para o tamanho máximo">
  </div>

</div>

<xinspace>

<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
		<div style="float: left; width: 50%">
		<span class="dbminputlabel">X inicial</span><br>
		<input id="xinit" class="round" type="text" placeholder="Deixe vazio para a Posição X já definida">
  </div>

  <div style="float: left; width: 50%;padding-left:4px">
  <span class="dbminputlabel">Y inicial</span><br>
  <input id="yinit" class="round" type="text" placeholder="Deixe vazio para a Posição Y já definida">
  </div>

</div>

<br>
<dialog-list id="gradient2" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 300px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem(data)" itemStyle="text-align: left; line-height: 30px;">
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

		<div id="gradient" style="padding-top:15px">
			<span class="dbminputlabel">Gradiente</span>
			<textarea id="gradiente" name="gradientes" rows="8" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>
	
		<div id="cor" style="padding-top:15px">
					<span class="dbminputlabel">Cor Principal (HEX / RGBA)</span><br>
					<table style="width:100%"><tr><th><input value="#FFFFFF" id="fontColor" name="actionxinxyla" class="round" type="text" placeholder="Opcional" onchange="(function(){
						var input = document.getElementById('fontColor');
						var valor = input.value;
						document.getElementById('exib').style.background = valor;
						})()"></th>
						<th style="width:60px;text-align:center;padding:4px"><a id="btr1" style="cursor:pointer" onclick="(function(){
		  					document.getElementById('fontColor').type = 'color'
		  					document.getElementById('btr1').style.display = 'none';
		  					document.getElementById('btr2').style.display = 'block';
		  				})()">
							<button style="float:left" class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib">&#8203;</div></div></a><a id="btr2" style="cursor:pointer;display:none" onclick="(function(){
								document.getElementById('fontColor').type = 'text';
								document.getElementById('btr1').style.display = 'block';
								document.getElementById('btr2').style.display = 'none';
							})()">
							<button class="tiny compact ui icon button">Texto</button></a></th></tr></table>
							
				</div>
	
	</div>
	</tab>
	<tab label="Borda" icon="block layout">
	<div style="padding-top:12px">
			
	<div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
	<div style="float: left; width: 100%;" id="bxinxyludob">
		<span class="dbminputlabel">Tipo de Borda</span><br>
			<select id="bordatipo" class="round" onchange="glob.onChange2(this)">
			<option value="0" selected>Nenhuma</option>
				<option value="1">Borda com cor (HEX ou RGBA)</option>
				<option value="2">Borda Gradiente / EVAL</option>
				<option value="3">Borda Gradiente / Guiada</option>
		</select>

		</div>

		<div style="float: left; width: 60%;padding-left:4px" id="bxinxyludo">
		<span class="dbminputlabel">A partir</span>
		  <select id="apartir2" class="round">
			<option value="0" selected>Cima para baixo</option>
			<option value="1">Diagonal esquerda de cima para baixo</option>
			<option value="2">Direita para esquerda</option>
			<option value="3">Diagonal direita de cima para baixo</option>
			<option value="4">De baixo para cima</option>
			<option value="5">Diagonal esquerda de baixo para cima</option>
			<option value="6">Esquerda para direita</option>
			<option value="7">Diagonal direita de baixo para cima</option>
			<option value="8">Radial</option>
		  </select>
		</div>
	  
	  </div>

<div id="bordadoxinxyla" style="padding-top:15px">
		<span class="dbminputlabel">Tamanho da Borda</span><br>
		<input id="borda" class="round" type="text" placeholder="Requerido"></div>

		<div id="bGradient2" style="display: none; float: left; width: 100%;">
	  <xinspace>
	  <div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
			  <div style="float: left; width: 50%">
			  <span class="dbminputlabel">Largura máxima do gradiente</span><br>
			  <input id="flargura2" class="round" type="text" value="100%" placeholder="Deixe vazio para o tamanho máximo">
		</div>
	  
		<div style="float: left; width: 50%;padding-left:4px">
		<span class="dbminputlabel">Altura máxima do gradiente</span><br>
		<input id="faltura2" class="round" type="text" value="100%" placeholder="Deixe vazio para o tamanho máximo">
		</div>
	  
	  </div>
	  
	  <xinspace>
	  
	  <div style="overflow: hidden;width:100%;padding:4px 0px 0px 0px">
			  <div style="float: left; width: 50%">
			  <span class="dbminputlabel">X inicial</span><br>
			  <input id="xinit2" class="round" type="text" placeholder="Deixe vazio para a Posição X já definida">
		</div>
	  
		<div style="float: left; width: 50%;padding-left:4px">
		<span class="dbminputlabel">Y inicial</span><br>
		<input id="yinit2" class="round" type="text" placeholder="Deixe vazio para a Posição Y já definida">
		</div>
	  
	  </div>
	  
	  <br>
	  <dialog-list id="bgradient2" fields='["posicao", "cor"]' dialogTitle="Gradiente" dialogResizable dialogWidth="400" dialogHeight="220" listLabel="Gradiente" listStyle="height: calc(100vh - 300px);" itemName="Embed" itemCols="1" itemHeight="30px;" itemTextFunction="glob.formatItem2(data)" itemStyle="text-align: left; line-height: 30px;">
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

		<div id="gradienteborda" style="padding-top:15px">
			<span class="dbminputlabel">Borda Gradiente</span>
			<textarea id="bordagradiente" rows="4" style="width: 100%; white-space: nowrap; resize:yes"></textarea>
		</div>
	
		<div id="corborda" style="padding-top:15px">
					<span class="dbminputlabel">Cor da Borda (HEX / RGBA)</span><br>
					<table style="width:100%"><tr><th><input value="#FFFFFF" id="bordacor" name="actionxinxyla" class="round" type="text" placeholder="Opcional" onchange="(function(){
						var input = document.getElementById('bordacor');
						var valor = input.value;
						document.getElementById('exib2').style.background = valor;
						})()"></th>
						<th style="width:60px;text-align:center;padding:4px"><a id="3btr1" style="cursor:pointer" onclick="(function(){
		  					document.getElementById('bordacor').type = 'color'
		  					document.getElementById('3btr1').style.display = 'none';
		  					document.getElementById('3btr2').style.display = 'block';
		  				})()">
							<button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib2">&#8203;</div></div></a><a id="3btr2" style="cursor:pointer;display:none" onclick="(function(){
								document.getElementById('bordacor').type = 'text';
								document.getElementById('3btr1').style.display = 'block';
								document.getElementById('3btr2').style.display = 'none';
							})()">
							<button class="tiny compact ui icon button">Texto</button></a></th></tr></table>
							
				</div>
	
	</div>
	</tab>
	<tab label="Sombra" icon="cloud">
		<div style="padding-top:12px">
		<span class="dbminputlabel">Tipo de Sombra</span><br>
		<select id="shadowtipo" class="round" onchange="glob.onChange3(this)">
		<option value="0" selected>Nenhuma</option>
			<option value="1">Sombra com cor (HEX ou RGBA)</option>
	</select>
	<div id="shadow" style="padding-top:15px">
	<table style="width:100%"><tr>
	<td style="width:100px">
	<span class="dbminputlabel">Tamanho da Sombra</span><br>
	<input id="blur" class="round" type="text" value="0" placeholder="Requerido">
	</td>
	<td style="width:100px"><span class="dbminputlabel">+ Arrastar Sombra X</span><br>
	<input id="shadowh" class="round" type="text" value="0" placeholder="Opcional"></td>
	<td style="width:100px"><span class="dbminputlabel">+ Arrastar Sombra Y</span><br>
	<input id="shadowv" class="round" type="text" value="0" placeholder="Opcional"></td>
	</tr></table>
	</div>

		
		<div id="corshadow" style="padding-top:15px">
		
	<span class="dbminputlabel">Intensidade da Sombra</span><br>
	<input id="int" class="round" type="text" value="1" placeholder="Vazio para a padrão">
	<br>
		<span class="dbminputlabel">Cor da Sombra (HEX / RGBA)</span><br>
			<table style="width:100%"><tr><th><input value="#FFFFFF" id="shadowcor" name="actionxinxyla" class="round" type="text" placeholder="Insira um código HEX ou RGBA..."  onchange="(function(){
				var input = document.getElementById('shadowcor');
				var valor = input.value;
				document.getElementById('exib3').style.background = valor;
				})()"></th>
			<th style="width:60px;text-align:center;padding:4px"><a id="2btr1" style="cursor:pointer" onclick="(function(){
			document.getElementById('shadowcor').type = 'color'
			document.getElementById('2btr1').style.display = 'none';
			document.getElementById('2btr2').style.display = 'block';
			})()"><button class="tiny compact ui icon button">Cor</button><div style="float:right"><div style="min-width:15px;margin-top:4px" id="exib3">&#8203;</div></div></a><a id="2btr2" style="cursor:pointer;display:none" onclick="(function(){
				document.getElementById('shadowcor').type = 'text';
				document.getElementById('2btr1').style.display = 'block';
				document.getElementById('2btr2').style.display = 'none';
				})()"><button class="tiny compact ui icon button">Texto</button></a></th></tr></table>

		
		</div>
		</div>
	</tab>
	<tab label="Config" icon="cogs">
		<div style="padding:12px 6px">

		<div style="padding:0px 0px 15px 0px">
		<table style="width:100%;"><tr>
		<td style="width:calc(100% - 70px) !important"><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
		<td style="padding:0px 0px 0px 10px;width:70px !important"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
		</tr></table>
		</div>
		

		<table style="width:100%;">
<tr>
  <td id="controlador1">
    <span class="dbminputlabel">Adicionar texto a imagem</span><br>
    <select id="storage" class="round" style="width: 100%" onchange="glob.onChangexin(this)">
      ${data.variables[1]}
      <option value="10">Local</option>
    </select>
  </td>
  <td id="controlador2" style="padding:0px 0px 0px 8px">
    <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList">
  </td>
  <td id="controlador3" style="padding:0px 0px 0px 8px">
  <span class="dbminputlabel">Local</span><br>
  <input id="local" class="round" type="text" placeholder="resources/output.png">
</td>
</tr>
</table>

	<br>


		<table style="width:100%"><tr>
		<td style="width: calc(100% - 150px) !important">
		<span class="dbminputlabel">Arquivo de Fonte do Texto</span><br>
			<input id="fontPath" class="round" type="text" value="fonts/" placeholder="Exemplo: fonts/arial.ttf">
		</td>
		<td style="width:150px !important">
		<span class="dbminputlabel">Tamanho do Texto</span><br>
			<input id="fontSize" class="round" type="text" placeholder="Tamanho padrão 10px">
		</td>
</tr></table><br>

</div>
	</tab>
</tab-system>

</div>

<style>
td{width:50%;padding:2px;}
label {
	letter-spacing: -0.6px;
 }
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
xinspace{margin:10px 0px 0px 0px;display:block}
</style>`
	},

	init: function () {
		const { glob, document } = this;


		glob.onChangexin = function (event) {
			if (event.value === "10") {
				document.getElementById("controlador2").style.display = 'none';
				document.getElementById("controlador3").style.display = null;
			} else {
				document.getElementById("controlador2").style.display = null;
				document.getElementById("controlador3").style.display = 'none';
			}
		}
		glob.onChangexin(document.getElementById('storage'))

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

		var input = document.getElementById('fontColor');
		var valor = input.value;
		document.getElementById('exib').style.background = valor;

		var input2 = document.getElementById('bordacor');
		var valor2 = input2.value;
		document.getElementById('exib2').style.background = valor2;

		var input3 = document.getElementById('shadowcor');
		var valor3 = input3.value;
		document.getElementById('exib3').style.background = valor3;

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

		const gradient2 = document.getElementById('Gradient2')
		const gradient = document.getElementById('gradient')
		const solid = document.getElementById('cor')
		const xinxyludo = document.getElementById('xinxyludo')
		const xinxyludob = document.getElementById('xinxyludob')
		const bxinxyludo = document.getElementById('bxinxyludo')
		const bxinxyludob = document.getElementById('bxinxyludob')
		const bGradient2 = document.getElementById('bGradient2')

		glob.onChange0 = function (event) {
			switch (parseInt(event.value)) {
				case 0:
					gradient2.style.display = 'none'
					gradient.style.display = 'none'
					solid.style.display = null
					xinxyludo.style.display = 'none'
					xinxyludob.style.width = "100%"
					break
				case 1:
					gradient2.style.display = 'none'
					gradient.style.display = null
					solid.style.display = 'none'
					xinxyludo.style.display = 'none'
					xinxyludob.style.width = "100%"
					break
				case 2:
					gradient2.style.display = null
					gradient.style.display = 'none'
					solid.style.display = 'none'
					xinxyludo.style.display = null
					xinxyludob.style.width = "40%"
					break
			}
		}

		glob.onChange0(document.getElementById('tipocor'))




		glob.onChange3 = function (event) {
			switch (parseInt(event.value)) {
				case 0:
					corshadow.style.display = 'none'
					shadow.style.display = 'none'
					break
				case 1:
					corshadow.style.display = null
					shadow.style.display = null
					break
				case 2:
					corshadow.style.display = 'none'
					shadow.style.display = null
					break
			}
		}
		glob.onChange3(document.getElementById('shadowtipo'))

		glob.onChange2 = function (event) {
			switch (parseInt(event.value)) {
				case 0:
					gradienteborda.style.display = 'none'
					corborda.style.display = 'none'
					bordadoxinxyla.style.display = 'none'
					bGradient2.style.display = 'none'
					bxinxyludo.style.display = 'none'
					bxinxyludob.style.width = "100%"
					break
				case 1:
					gradienteborda.style.display = 'none'
					corborda.style.display = null
					bordadoxinxyla.style.display = null
					bGradient2.style.display = 'none'
					bxinxyludo.style.display = 'none'
					bxinxyludob.style.width = "100%"
					break
				case 2:
					gradienteborda.style.display = null
					corborda.style.display = 'none'
					bordadoxinxyla.style.display = null
					bGradient2.style.display = 'none'
					bxinxyludo.style.display = 'none'
					bxinxyludob.style.width = "100%"
					break
				case 3:
					gradienteborda.style.display = 'none'
					corborda.style.display = 'none'
					bordadoxinxyla.style.display = null
					bGradient2.style.display = null
					bxinxyludo.style.display = null
					bxinxyludob.style.width = "40%"
					break
			}
		}
		glob.onChange2(document.getElementById('bordatipo'))

		glob.onChange1 = function (event) {
			switch (parseInt(event.value)) {
				case 0:
					xinelas01.style.display = 'none'
					xinelas02.style.display = 'none'
					break
				case 1:
					xinelas01.style.display = null
					xinelas02.style.display = 'none'
					break
				case 2:
					xinelas01.style.display = 'none'
					xinelas02.style.display = null
					break
				case 3:
					xinelas01.style.display = 'none'
					xinelas02.style.display = null
					break
			}
		}
		glob.onChange1(document.getElementById('menulargura'))

	},

	async action(cache) {
		const Canvas = require('canvas');
		const data = cache.actions[cache.index];
		const fontPath = this.evalMessage(data.fontPath, cache);
		const fontName = fontPath.slice(fontPath.lastIndexOf("/") + 1, fontPath.lastIndexOf("."))
		Canvas.registerFont(fontPath, { family: fontName })
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		const local = this.evalMessage(data.local, cache);

		if (storage == 10) {
			try {
				await Canvas.loadImage(local).then((imagex) => {
					canvas = Canvas.createCanvas(imagex.width, imagex.height)
					ctx = canvas.getContext('2d')
					ctx.drawImage(imagex, 0, 0, imagex.width, imagex.height)
					image = new Canvas.Image()
					image.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
				})
			} catch (err) {
				this.callNextAction(cache)
				return
			}

		} else {

			imagedata = this.getVariable(storage, varName, cache);
			if (!imagedata) {
				this.callNextAction(cache);
				return;
			}

		}


		const fontColor = this.evalMessage(data.fontColor, cache);
		const largura = this.evalMessage(data.largura, cache);
		const larguramax = this.evalMessage(data.larguramax, cache);
		const alturamax = this.evalMessage(data.alturamax, cache);
		const menulargura = this.evalMessage(data.menulargura, cache);
		const bordatipo = this.evalMessage(data.bordatipo, cache);
		const borda = this.evalMessage(data.borda, cache);
		const bordacor = this.evalMessage(data.bordacor, cache);
		const shadowtipo = this.evalMessage(data.shadowtipo, cache);
		var distancia = this.evalMessage(data.distancia, cache);

		let fontSize = parseInt(this.evalMessage(data.fontSize, cache));
		if (isNaN(fontSize)) {
			fontSize = 10;
		}
		let blur = parseInt(this.evalMessage(data.blur, cache));
		if (isNaN(blur)) {
			blur = 0;
		}
		let int = parseInt(this.evalMessage(data.int, cache));
		if (isNaN(int)) {
			int = 1;
		}
		let shadowh = parseInt(this.evalMessage(data.shadowh, cache));
		if (isNaN(shadowh)) {
			shadowh = 0;
		}
		let shadowv = parseInt(this.evalMessage(data.shadowv, cache));
		if (isNaN(shadowv)) {
			shadowv = 0;
		}
		if (data.distancia >= 0) { distancia = (fontSize + parseInt(distancia)) }
		if (data.distancia < 0) { distancia = parseInt(data.distancia) + fontSize }
		if (this.evalMessage(data.distancia, cache) === "" || isNaN(this.evalMessage(data.distancia, cache))) { distancia = fontSize }

		const shadowcor = this.evalMessage(data.shadowcor, cache);
		const align = parseInt(data.align);
		const tipocor = parseInt(data.tipocor);
		const x = parseInt(this.evalMessage(data.x, cache));
		const y = parseInt(this.evalMessage(data.y, cache));
		const rotacionar = parseInt(this.evalMessage(data.rotacionar, cache));
		var x2 = this.evalMessage(data.x2, cache);
		var y2 = this.evalMessage(data.y2, cache);
		const text = this.evalMessage(data.text, cache);
		if (storage !== 10) {
			image = new Canvas.Image();
			image.src = imagedata;
			canvas = Canvas.createCanvas(image.width, image.height);
			ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, image.width, image.height);
		}
		ctx.font = fontSize + "px " + fontName;
		switch (align) {
			case 0:
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				break;
			case 1:
				ctx.textAlign = "center";
				ctx.textBaseline = "top";
				break;
			case 2:
				ctx.textAlign = "right";
				ctx.textBaseline = "top";
				break;
			case 3:
				ctx.textAlign = "left";
				ctx.textBaseline = "middle";
				break;
			case 4:
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				break;
			case 5:
				ctx.textAlign = "right";
				ctx.textBaseline = "middle";
				break;
			case 6:
				ctx.textAlign = "left";
				ctx.textBaseline = "bottom";
				break;
			case 7:
				ctx.textAlign = "center";
				ctx.textBaseline = "bottom";
				break;
			case 8:
				ctx.textAlign = "right";
				ctx.textBaseline = "bottom";
		}

		if (x2 == "" || x2 == undefined) { x2 = 0 }
		if (y2 == "" || y2 == undefined) { y2 = 0 }

		if (rotacionar > 0) {
			ctx.translate(image.width / 2, image.height / 2);
			ctx.rotate(rotacionar * Math.PI / 180)
			ctx.translate(-(image.width / 2), -(image.height / 2));
			ctx.translate(x2, y2)
		}

		if (shadowtipo == 1) {
			ctx.shadowColor = shadowcor
		}

		ctx.shadowOffsetX = shadowh;
		ctx.shadowOffsetY = shadowv;
		ctx.shadowBlur = blur;


		if (bordatipo == 0) {
			ctx.lineWidth = 0
			ctx.strokeStyle = 'rgba(0,0,0,0)'
		}

		if (bordatipo == 1) {
			ctx.lineWidth = borda
			ctx.strokeStyle = bordacor
		}
		if (bordatipo == 2) {
			ctx.lineWidth = borda
			eval(String(this.evalMessage(data.bordagradiente, cache)))
			ctx.strokeStyle = gradient
		}

		if (bordatipo == 3) {
			ctx.lineWidth = borda
			const bgradients = data.bgradient2;

			if (isNaN(parseInt(this.evalMessage(data.flargura2, cache))) || this.evalMessage(data.flargura2, cache) == "") {
				bwidth = parseInt(image.width)
			} else {
				bwidth = parseInt(this.evalMessage(data.flargura2, cache)) + x
				if (data.apartir2 == "8") { bwidth = bwidth + x }
				if (this.evalMessage(data.flargura2, cache).includes("%")) { bwidth = (image.width / 100) * parseInt(this.evalMessage(data.flargura2, cache)) }
			}

			if (isNaN(parseInt(this.evalMessage(data.faltura2, cache))) || this.evalMessage(data.faltura2, cache) == "") {
				bheight = parseInt(image.height)
			} else {
				bheight = parseInt(this.evalMessage(data.faltura2, cache)) + y
				if (data.apartir2 == "8") { bheight = bheight + y }
				if (this.evalMessage(data.faltura2, cache).includes("%")) { bheight = (image.height / 100) * parseInt(this.evalMessage(data.faltura2, cache)) }
			}

			if (isNaN(parseInt(this.evalMessage(data.xinit2, cache))) || this.evalMessage(data.xinit2, cache) == "") {
				xinit2 = x
			} else {
				xinit2 = parseInt(this.evalMessage(data.xinit2, cache))
			}

			if (isNaN(parseInt(this.evalMessage(data.yinit2, cache))) || this.evalMessage(data.yinit2, cache) == "") {
				yinit2 = y
			} else {
				yinit2 = parseInt(this.evalMessage(data.yinit2, cache))
			}


			if (data.apartir2 == "0") { var gradientx2 = ctx.createLinearGradient(xinit2, yinit2, xinit2, bheight) }
			if (data.apartir2 == "1") { var gradientx2 = ctx.createLinearGradient(xinit2, yinit2, bwidth, bheight) }
			if (data.apartir2 == "2") { var gradientx2 = ctx.createLinearGradient(xinit2, yinit2, bwidth, yinit2) }
			if (data.apartir2 == "3") { var gradientx2 = ctx.createLinearGradient(bwidth, yinit2, xinit2, bheight) }
			if (data.apartir2 == "4") { var gradientx2 = ctx.createLinearGradient(xinit2, bheight, xinit2, yinit2) }
			if (data.apartir2 == "5") { var gradientx2 = ctx.createLinearGradient(bwidth, bheight, xinit2, yinit2) }
			if (data.apartir2 == "6") { var gradientx2 = ctx.createLinearGradient(bwidth, yinit2, xinit2, yinit2) }
			if (data.apartir2 == "7") { var gradientx2 = ctx.createLinearGradient(xinit2, bheight, bwidth, yinit2) }
			if (data.apartir2 == "8") { var gradientx2 = ctx.createRadialGradient((bwidth / 2), (bheight / 2), 0, (bwidth / 2), (bheight / 2), (bwidth / 2)) }

			for (let i = 0; i < bgradients.length; i++) {
				const bgradient = bgradients[i];
				var posicao2 = this.evalMessage(bgradient.posicao, cache);
				var posicao2 = (posicao2 / 100)
				const cor2 = this.evalMessage(bgradient.cor, cache);
				gradientx2.addColorStop(posicao2, cor2)
			}
			ctx.strokeStyle = gradientx2
		}

		if (tipocor == 2) {
			const gradients = data.gradient2;

			if (isNaN(parseInt(this.evalMessage(data.flargura, cache))) || this.evalMessage(data.flargura, cache) == "") {
				width = parseInt(image.width)
			} else {
				width = parseInt(this.evalMessage(data.flargura, cache)) + x
				if (data.apartir == "8") { width = width + x }
				if (this.evalMessage(data.flargura, cache).includes("%")) { width = (image.width / 100) * parseInt(this.evalMessage(data.flargura, cache)) }
			}

			if (isNaN(parseInt(this.evalMessage(data.faltura, cache))) || this.evalMessage(data.faltura, cache) == "") {
				height = parseInt(image.height)
			} else {
				height = parseInt(this.evalMessage(data.faltura, cache)) + y
				if (data.apartir == "8") { height = height + y }
				if (this.evalMessage(data.faltura, cache).includes("%")) { height = (image.height / 100) * parseInt(this.evalMessage(data.faltura, cache)) }
			}

			if (isNaN(parseInt(this.evalMessage(data.xinit, cache))) || this.evalMessage(data.xinit, cache) == "") {
				xinit = x
			} else {
				xinit = parseInt(this.evalMessage(data.xinit, cache))
			}

			if (isNaN(parseInt(this.evalMessage(data.yinit, cache))) || this.evalMessage(data.yinit, cache) == "") {
				yinit = y
			} else {
				yinit = parseInt(this.evalMessage(data.yinit, cache))
			}


			if (data.apartir == "0") { var gradientx = ctx.createLinearGradient(xinit, yinit, xinit, height) }
			if (data.apartir == "1") { var gradientx = ctx.createLinearGradient(xinit, yinit, width, height) }
			if (data.apartir == "2") { var gradientx = ctx.createLinearGradient(xinit, yinit, width, yinit) }
			if (data.apartir == "3") { var gradientx = ctx.createLinearGradient(width, yinit, xinit, height) }
			if (data.apartir == "4") { var gradientx = ctx.createLinearGradient(xinit, height, xinit, yinit) }
			if (data.apartir == "5") { var gradientx = ctx.createLinearGradient(width, height, xinit, yinit) }
			if (data.apartir == "6") { var gradientx = ctx.createLinearGradient(width, yinit, xinit, yinit) }
			if (data.apartir == "7") { var gradientx = ctx.createLinearGradient(xinit, height, width, yinit) }
			if (data.apartir == "8") { var gradientx = ctx.createRadialGradient((width / 2), (height / 2), 0, (width / 2), (height / 2), (width / 2)) }

			for (let i = 0; i < gradients.length; i++) {
				const gradient = gradients[i];
				var posicao = this.evalMessage(gradient.posicao, cache);
				var posicao = (posicao / 100)
				const cor = this.evalMessage(gradient.cor, cache);
				gradientx.addColorStop(posicao, cor)
			}
			ctx.fillStyle = gradientx;
		}
		if (tipocor == 1) {
			eval(String(this.evalMessage(data.gradiente, cache)))
			ctx.fillStyle = gradient;
		}
		if (tipocor == 0 || tipocor == undefined) {
			ctx.fillStyle = fontColor
		}

		if (menulargura == 0 || menulargura == undefined || menulargura == 1) {
			if (menulargura == 0 || menulargura == undefined) {
				ctx.fillText(text, x, y)
				if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) { ctx.strokeText(text, x, y) }
			}
			if (menulargura == 1) {
				ctx.fillText(text, x, y, largura, 100)
				if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) { ctx.strokeText(text, x, y, largura) }
			}
		}

		if (menulargura == 2) {
			printAt(ctx, text, x, y, distancia, larguramax, alturamax);

			function printAt(ctx, text, x, y, lineHeight, fitWidth, alturaMaxima) {
				fitWidth = parseInt(fitWidth) || 0;
				alturaMaxima = parseInt(alturaMaxima) || 0;

				if (alturaMaxima > 0) { var alturaMaximax = parseInt(alturaMaxima) + parseInt(y) - parseInt(lineHeight) } else { var alturaMaximax = parseInt(alturaMaxima) }

				if (fitWidth <= 0 || (alturaMaximax > 0 && y < alturaMaximax)) {
					var words = text.split('');
					var line = '';

					for (var i = 0; i < words.length; i++) {
						var testLine = line + words[i] + '';
						var metrics = ctx.measureText(testLine);
						var testWidth = metrics.width;

						if (fitWidth > 0 && testWidth > fitWidth && i > 0) {
							if (alturaMaximax > 0 && y + lineHeight >= alturaMaximax) {
								break;
							}
							ctx.fillText(line, x, y);
							if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) {
								ctx.strokeText(line, x, y);
							}
							line = words[i] + '';
							y += lineHeight;
						} else {
							line = testLine;
						}
					}

					ctx.fillText(line, x, y);
					if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) {
						ctx.strokeText(line, x, y);



					}
				}
			}

		}


		if (menulargura == 3) {
			printAt(ctx, text, x, y, distancia, larguramax, alturamax);

			function printAt(ctx, text, x, y, lineHeight, fitWidth, alturaMaxima) {
				fitWidth = fitWidth || 0;
				alturaMaxima = alturaMaxima || 0;

				if (alturaMaxima > 0) { var alturaMaximax = parseInt(alturaMaxima) + parseInt(y) - parseInt(lineHeight) } else { var alturaMaximax = parseInt(alturaMaxima) }


				if (fitWidth <= 0 || (alturaMaximax > 0 && y < alturaMaximax)) {
					var words = text.split(' ');
					var line = '';

					for (var i = 0; i < words.length; i++) {
						var word = words[i];
						var metrics = ctx.measureText(line + word);
						var lineWidth = metrics.width;

						if (lineWidth > fitWidth) {
							var slicedWords = sliceWordToFit(ctx, word, fitWidth);
							for (var j = 0; j < slicedWords.length; j++) {
								var slicedWord = slicedWords[j];
								if (alturaMaximax > 0 && y + lineHeight >= alturaMaximax) {
									break;
								}
								ctx.fillText(line, x, y);
								if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) {
									ctx.strokeText(line, x, y);
								}
								if (blur > 0 || int > 1) {
									for (let intA = 1; intA < int; intA++) {
										ctx.strokeText(line, x, y);
									}
								}

								line = slicedWord + ' ';
								y += lineHeight;
							}
						} else {
							line += word + ' ';
						}
					}

					ctx.fillText(line, x, y);
					if (bordatipo == 1 || bordatipo == 2 || bordatipo == 3) {
						ctx.strokeText(line, x, y);
					}
					if (blur > 0 || int > 1) {
						for (let intA = 1; intA < int; intA++) {
							ctx.strokeText(line, x, y);
						}
					}
				}
			}

			function sliceWordToFit(ctx, word, fitWidth) {
				var slicedWords = [];
				var slicedWord = '';
				var metrics = ctx.measureText(word);
				var wordWidth = metrics.width;

				for (var i = 0; i < word.length; i++) {
					var testWord = slicedWord + word[i];
					var testWidth = ctx.measureText(testWord).width;

					if (testWidth <= fitWidth) {
						slicedWord = testWord;
					} else {
						if (slicedWord !== '') {
							slicedWords.push(slicedWord + '-');
						}
						slicedWord = '_' + word[i];
					}
				}

				if (slicedWord !== '') {
					slicedWords.push(slicedWord);
				}

				return slicedWords;
			}

		}



		if (storage == 10) {
			const fs = require("fs");
			const Path = this.evalMessage(data.local, cache);
			if (Path) {
				fs.writeFileSync(Path, canvas.toBuffer());
			}
		} else {
			this.storeValue(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"), storage, varName, cache);
		}
		this.callNextAction(cache);
	},

	mod: function (DBM) {
	}

};
