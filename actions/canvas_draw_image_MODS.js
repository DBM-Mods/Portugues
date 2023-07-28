module.exports = {
  name: 'Canvas Draw Image on Image MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[xinxyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle(data, presets) {
    const storage = presets.variables;

    if(data.storage2 == "10"){
    nova = `Local/WEB URL: ${data.local}`
    } else{
    nova = `${storage[parseInt(data.storage2, 10)]} (${data.varName2})`
    }

    if(data.storage == "10"){
      novap = `Localmente: ${data.localp}`
      } else{
      novap = `${storage[parseInt(data.storage, 10)]} (${data.varName})`
      }

    if (data.descriptionx == true) {
      desccor = data.descriptioncolor
    } else {
      desccor = 'none'
    }

    return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">Juntar: ${novap} > ${nova}</font>`
  },

  fields: ['local', 'localp', 'width', 'height', 'storage', 'varName', 'storage2', 'varName2', 'x', 'y', 'effect', 'descriptioncolor', 'description', 'descriptionx',],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.4</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<table style="width:100%;">
<tr>
  <td id="pcontrolador1">
    <span class="dbminputlabel">Imagem Canvas</span><br>
    <select id="storage" class="round" style="width: 100%" onchange="glob.onChangexinp(this)">
      ${data.variables[1]}
      <option value="10">Salvar no Local</option>
    </select>
  </td>
  <td id="pcontrolador2" style="padding:0px 0px 0px 8px">
    <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName" class="round" type="text" list="variableList">
  </td>
  <td id="pcontrolador3" style="padding:0px 0px 0px 8px">
  <span class="dbminputlabel">Local</span><br>
  <input id="localp" class="round" type="text" placeholder="resources/output.png">
</td>
</tr>
</table>

<br>

<table style="width:100%;">
<tr>
  <td id="controlador1">
    <span class="dbminputlabel">Juntar com a imagem</span><br>
    <select id="storage2" class="round" style="width: 100%" onchange="glob.onChangexin2(this)">
      ${data.variables[1]}
      <option value="10">Local/Web URL</option>
    </select>
  </td>
  <td id="controlador2" style="padding:0px 0px 0px 8px">
    <span class="dbminputlabel">Nome da Variavel</span><br>
    <input id="varName2" class="round" type="text" list="variableList">
  </td>
  <td id="controlador3" style="padding:0px 0px 0px 8px">
  <span class="dbminputlabel">Local/Web URL</span><br>
  <input id="local" class="round" type="text" placeholder="resources/output.png">
</td>
</tr>
</table>


<div id="controlador4">
<br>
  <div style="float: left; width: 50%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Largura (px ou %)</span><br>
    <input id="width" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px">
  <span class="dbminputlabel">Altura (px ou %)</span><br>
    <input id="height" class="round" type="text" placeholder="Deixe em branco para padrão" value="100%"><br>
  </div>

</div>

<br>

<div>
  <div style="float: left; width: 50%;padding:0px 5px 0px 0px">
  <span class="dbminputlabel">Posição X</span><br>
    <input id="x" class="round" type="text" value="0"><br>
  </div>
  <div style="float: right; width: 50%;padding:0px 0px 0px 5px">
  <span class="dbminputlabel">Posição Y</span><br>
    <input id="y" class="round" type="text" value="0"><br>
  </div>
</div><br><br><br>
<div style="padding-top: 8px;">
  <div style="width: 100%;">
  <span class="dbminputlabel">Efeito de composição</span><br>
    <select id="effect" class="round" onchange="glob.onComparisonChanged(this)">>
      <option value="0" selected>Sobrepor a imagem</option>
      <option value="1">Deixar transparente e sobrepor</option>
      <option value="2">Sobrepor com transparência</option>
      <option value="3">Recortar com transparência</option>
      <option value="4">Sobrepor parcialmente</option>
      <option value="5">Sobrepõe o destino</option>
      <option value="6">Recortar o destino</option>
      <option value="7">Sobrepor parcialmente no destino</option>
      <option value="8">Mais claro</option>
      <option value="9">Copiar</option>
      <option value="10">Sobrepor exclusivamente</option>
      <option value="11">Multiplicar</option>
      <option value="12">Tela</option>
      <option value="13">Sobrepor com sobreposição</option>
      <option value="14">Escurecer</option>
      <option value="15">Clarear</option>
      <option value="16">Clarear cor</option>
      <option value="17">Escurecer cor</option>
      <option value="18">Sobreposição intensa</option>
      <option value="19">Sobreposição suave</option>
    </select>
  </div>
</div>

<br>

<span class="dbminputlabel">Informação do efeito</span>
<div id="informacao" style="color:#ccc;border:1px solid rgba(200,200,200,0.3);background:rgba(50,50,50,0.5);padding:5px"></div>

</div>

<style>
table{width:100%}
.col1{width:38%;padding:0px 10px 0px 0px}
.col2{width:60%}
.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}
.xinelaslink{margin-top:-4px}
.xinelaslink:hover{opacity:0.8 !important}
</style>
`
  },

  init() {
    const { glob, document } = this

    glob.onChangexin2 = function (event) {
      if (event.value === "10") {
        document.getElementById("controlador2").style.display = 'none';
        document.getElementById("controlador3").style.display = null;
        document.getElementById("controlador4").style.display = null;
      } else {
        document.getElementById("controlador2").style.display = null;
        document.getElementById("controlador3").style.display = 'none';
        document.getElementById("controlador4").style.display = 'none';
      }
    }
    glob.onChangexin2(document.getElementById('storage2'))

    glob.onChangexinp = function (event) {
			if (event.value === "10") {
				document.getElementById("pcontrolador2").style.display = 'none';
				document.getElementById("pcontrolador3").style.display = null;
			} else {
				document.getElementById("pcontrolador2").style.display = null;
				document.getElementById("pcontrolador3").style.display = 'none';
			}
		}
		glob.onChangexinp(document.getElementById('storage'))

    glob.onComparisonChanged = function (event) {
      if (event.value == "0") {
        document.querySelector("[id='informacao']").innerText = (`Esse é o valor padrão e simplesmente desenha o novo elemento gráfico sobre o conteúdo existente no contexto.`);
      }
      if (event.value == "1") {
        document.querySelector("[id='informacao']").innerText = (`A área do conteúdo existente que se sobrepõe com o novo elemento gráfico é tornada transparente, enquanto o restante é mantido.`);
      }
      if (event.value == "2") {
        document.querySelector("[id='informacao']").innerText = (`Apenas a área do novo elemento gráfico que se sobrepõe com o conteúdo existente é mantida, e o restante é tornando transparente.`);
      }
      if (event.value == "3") {
        document.querySelector("[id='informacao']").innerText = (`A área do novo elemento gráfico que se sobrepõe com o conteúdo existente é tornada transparente, enquanto o restante é mantido.`);
      }
      if (event.value == "4") {
        document.querySelector("[id='informacao']").innerText = (`O novo elemento gráfico é desenhado na parte superior do conteúdo existente, mas apenas onde há sobreposição. O restante do conteúdo existente é mantido.`);
      }
      if (event.value == "5") {
        document.querySelector("[id='informacao']").innerText = (`O novo elemento gráfico é desenhado abaixo do conteúdo existente no contexto.`);
      }
      if (event.value == "6") {
        document.querySelector("[id='informacao']").innerText = (`Apenas a área do conteúdo existente que se sobrepõe com o novo elemento gráfico é mantida, e o restante é tornando transparente.`);
      }
      if (event.value == "7") {
        document.querySelector("[id='informacao']").innerText = (`O novo elemento gráfico é desenhado abaixo do conteúdo existente, mas apenas onde há sobreposição. O restante do conteúdo existente é mantido.`);
      }
      if (event.value == "8") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são somados, resultando em uma aparência mais clara onde as cores se sobrepõem.`);
      }
      if (event.value == "9") {
        document.querySelector("[id='informacao']").innerText = (`O novo elemento gráfico substitui completamente o conteúdo existente no contexto.`);
      }
      if (event.value == "10") {
        document.querySelector("[id='informacao']").innerText = (`As áreas onde o novo elemento gráfico e o conteúdo existente se sobrepõem são tornadas transparentes, enquanto as áreas restantes são mantidas.`);
      }
      if (event.value == "11") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são multiplicados, resultando em uma aparência mais escura onde as cores se sobrepõem.`);
      }
      if (event.value == "12") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são invertidos, multiplicados e invertidos novamente, resultando em uma aparência de sobreposição mais clara.`);
      }
      if (event.value == "13") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são multiplicados ou multiplicados por seus inversos, dependendo dos valores de cor originais, resultando em uma aparência de sobreposição contrastante.`);
      }
      if (event.value == "14") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são comparados pixel a pixel, e o valor mais escuro é mantido.`);
      }
      if (event.value == "15") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são comparados pixel a pixel, e o valor mais claro é mantido.`);
      }
      if (event.value == "16") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são invertidos, divididos e invertidos novamente, resultando em uma aparência de sobreposição mais clara.`);
      }
      if (event.value == "17") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são invertidos, divididos e invertidos novamente, resultando em uma aparência de sobreposição mais escura`);
      }
      if (event.value == "18") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são multiplicados ou multiplicados por seus inversos, dependendo dos valores de cor originais, resultando em uma aparência de sobreposição de alto contraste.`);
      }
      if (event.value == "19") {
        document.querySelector("[id='informacao']").innerText = (`Os valores de cor do novo elemento gráfico e do conteúdo existente são suavizados e misturados, resultando em uma aparência de sobreposição suave.`);
      }
    }

    glob.onComparisonChanged(document.getElementById("effect"));

    glob.refreshVariableList(document.getElementById('storage'))

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
    const Canvas = require('canvas')
    const data = cache.actions[cache.index]
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    const localp = this.evalMessage(data.localp, cache)
    if (storage == 10) {
			try {
				await Canvas.loadImage(localp).then((imagex) => {
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
    const storage2 = parseInt(data.storage2)
    const varName2 = this.evalMessage(data.varName2, cache)
    const imagedata2 = this.getVariable(storage2, varName2, cache)
    const x = parseInt(this.evalMessage(data.x, cache))
    const y = parseInt(this.evalMessage(data.y, cache))
    const effect = parseInt(data.effect)
    const local = this.evalMessage(data.local, cache)
    if (storage !== 10) {
    image = new Canvas.Image()
    image.src = imagedata
    }

    if (storage2 == 10) {
      try {
        await Canvas.loadImage(local).then((imagex) => {
        var scalex = this.evalMessage(data.width, cache)
        var scaley = this.evalMessage(data.height, cache)
        if (scalex == '') { scalex = "100%" }
        if (scaley == '') { scaley = "100%" }
        let imagew = imagex.width
        let imageh = imagex.height
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
        this.callNextAction(cache)
        return
      }
    } else {
      if (!imagedata2) {
        this.callNextAction(cache)
        return
      }
      image2 = new Canvas.Image()
      image2.src = imagedata2
    }

    if (storage !== 10) {
    canvas = Canvas.createCanvas(image.width, image.height)
    ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height)
    }

    if (effect == "1") { ctx.globalCompositeOperation = 'destination-out' }
    if (effect == "2") { ctx.globalCompositeOperation = 'source-in' }
    if (effect == "3") { ctx.globalCompositeOperation = 'source-out' }
    if (effect == "4") { ctx.globalCompositeOperation = 'source-atop' }
    if (effect == "5") { ctx.globalCompositeOperation = 'destination-over' }
    if (effect == "6") { ctx.globalCompositeOperation = 'destination-in' }
    if (effect == "7") { ctx.globalCompositeOperation = 'destination-atop' }
    if (effect == "8") { ctx.globalCompositeOperation = 'lighter' }
    if (effect == "9") { ctx.globalCompositeOperation = 'copy' }
    if (effect == "10") { ctx.globalCompositeOperation = 'xor' }
    if (effect == "11") { ctx.globalCompositeOperation = 'multiply' }
    if (effect == "12") { ctx.globalCompositeOperation = 'screen' }
    if (effect == "13") { ctx.globalCompositeOperation = 'overlay' }
    if (effect == "14") { ctx.globalCompositeOperation = 'darken' }
    if (effect == "15") { ctx.globalCompositeOperation = 'lighten' }
    if (effect == "16") { ctx.globalCompositeOperation = 'color-dodge' }
    if (effect == "17") { ctx.globalCompositeOperation = 'color-burn' }
    if (effect == "18") { ctx.globalCompositeOperation = 'hard-light' }
    if (effect == "19") { ctx.globalCompositeOperation = 'soft-light' }

    ctx.drawImage(image2, x, y, image2.width, image2.height)

    if (storage == 10) {
			const fs = require("fs");
			const Path = this.evalMessage(data.localp, cache);
			if (Path) {
				fs.writeFileSync(Path, canvas.toBuffer());
			}
		} else {
			this.storeValue(canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"), storage, varName, cache);
		}
		this.callNextAction(cache);
  },

  mod() { }
}
