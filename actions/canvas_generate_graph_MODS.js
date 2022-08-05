module.exports = {
  name: 'Canvas Generate Graph MOD',
  section: 'Image Editing',
  meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

  subtitle (data) {
    const storeTypes = ['', 'Variável Temporária', 'Variável Servidor', 'Variável Global']
    return `${storeTypes[parseInt(data.storage)]} (${data.varName})`
  },

  variableStorage (data, varType) {
    const type = parseInt(data.storage)
    if (type !== varType) return
    return ([data.varName, 'Image'])
  },

  fields: ['type', 'sort', 'width', 'height', 'title', 'borderWidth', 'borderColor', 'borderColorAlpha', 'bgColor', 'bgColorAlpha', 'labels', 'datasets', 'storage', 'varName'],

  html (isEvent, data) {
    return `
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>


    <tab-system style="margin-top: 0;">

		<tab label="Dados" icon="align left">
    <div style="padding:10px 5px 5px 5px" id="xinelas">

    <span class="dbminputlabel">Titulo</span><br>
    <input id="title" class="round" type="text">
    <br>   
    <span class="dbminputlabel">Rótulos (separados por vírgula</span><br>
    <textarea id="labels" rows="4" placeholder="Exemplo 1, Exemplo 2, Exemplo 3..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    <br>
    <span class="dbminputlabel">Valores (separados por vírgula)</span><br>
    <textarea id="datasets" rows="4" placeholder="10,20,30..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    </div>
    </tab>

    <tab label="Cores" icon="flask">
    <div style="padding:10px 5px 5px 5px">
   
    <table style="width:100%">
    <tr>
    <td><span class="dbminputlabel">Opacidade do plano de fundo</span><br>
    <input id="bgColorAlpha" class="round" type="text" value="0.9">
    </td>
    <td><span class="dbminputlabel">Opacidade da borda</span><br>
    <input id="borderColorAlpha" class="round" type="text" value="1"></td>
    </tr>
    </table>
<br>
    <span class="dbminputlabel">Cores de fundo HEX (separados por vírgula)</span><br>
    <textarea id="bgColor" rows="4" placeholder="000000,333333,555555..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    <br>
    <span class="dbminputlabel">Cores da borda HEX (separados por vírgula)</span><br>
    <textarea id="borderColor" rows="4" placeholder="000000,333333,555555..." style="width: 100%; white-space: nowrap; resize: yes;"></textarea>
    
</div>
    </tab>

    <tab label="Tamanho" icon="move">
    <div style="padding:10px 5px 5px 5px">

    <table style="width:100%">
    <tr>
<td><span class="dbminputlabel">Largura (px)</span><br>
<input id="width" class="round" type="text"></td>
<td><span class="dbminputlabel">Altura (px)</span><br>
<input id="height" class="round" type="text"></td>
</tr>

</table>
<br>
<span class="dbminputlabel">largura da Borda (px)</span><br>
<input id="borderWidth" class="round" type="text">
</div>
    </tab>

    <tab label="Definições" icon="cogs">
    <div style="padding:10px 5px 5px 5px">

    <span class="dbminputlabel">Tipo de Gráfico</span><br>
<select id="type" class="round">
<option value="0" selecionado>Linha</option>
   <option value="1">Barra vertical</option>
   <option value="2">Barra horizontal</option>
   <option value="3">Radar</option>
   <option value="4">Torta</option>
   <option value="5">Rosquinha</option>
   <option value="6">Área Polar</option>
</select>
<br>
<span class="dbminputlabel">Ordenar por</span><br>
<select id="sort" class="round">
<option value="0" selecionado>Nenhum</option>
<option value="1">Subir</option>
<option value="2">Descer</option>
</select>
<br>
<table style="width:100%">
<tr>
<td><span class="dbminputlabel">Armazenar em</span><br>
<select id="storage" class="round">
  ${data.variables[1]}
</select></td>
<td><span class="dbminputlabel">Nome da Variavel</span><br>
<input id="varName" class="round" type="text"></td>
</tr>

</table>

</div>
    </tab>
    
    </tab-system>

  <style>
  td{width:50%;padding:5px;}
  </style>`
  },

  init () {
  },

 async action (cache) {
    const data = cache.actions[cache.index]
    const ChartJS = require('chart.js')
    const storage = parseInt(data.storage)
    const varName = this.evalMessage(data.varName, cache)
    options = {}
    let type = parseInt(data.type, cache)
    switch (type) {
      case 0:
        type = 'line'
        break
      case 1:
        type = 'bar'
        break
      case 2:
        type = 'bar'
        options = {indexAxis: 'y'}
        break
      case 3:
        type = 'radar'
        break
      case 4:
        type = 'pie'
        break
      case 5:
        type = 'doughnut'
        break
      case 6:
        type = 'polarArea'
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
    const bgColor = this.evalMessage(data.bgColor, cache)
    const bgColorAlpha = parseFloat(this.evalMessage(data.bgColorAlpha, cache))
    const borderWidth = parseFloat(this.evalMessage(data.borderWidth, cache))
    const borderColor = this.evalMessage(data.borderColor, cache)
    const borderColorAlpha = parseFloat(this.evalMessage(data.borderColorAlpha, cache))
    try {
      const result = await ChartJS.Chart(type, width, height, titlexinxyla, labels, datasets, sort, bgColor, bgColorAlpha, borderWidth, borderColor, borderColorAlpha, options)
      this.storeValue(result, storage, varName, cache)
      this.callNextAction(cache)
    } catch (err) {
      console.log(err)
    }
  },

  mod (DBM) {
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
      function getColors (colors, alpha) {
        return colors.map(hex => `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(hex.slice(4, 6), 16)},${alpha})`)
      }
      config.data.datasets[0].backgroundColor = bgColor
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
