module.exports = {
  name: 'Progress Bar MOD',
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
  
      return data.description
      ? `<font style="color:${desccor}">${data.description}</font>`
      : `<font style="color:${desccor}">${storage[parseInt(data.storage, 10)]} (${data.varName})</font>`
    },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'String'];
  },

  fields: ["type","vazioi", "vazio", "vaziof", "cheioi", "cheio","cheiof","tamanho", "pc", "storage", "varName", "descriptioncolor","description","descriptionx"],

  html(isEvent, data) {
    return `
    <div class="dbmmodsbr1 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip">Atualizar</div>
    <div class="dbmmodsbr2 xinelaslink" data-url="https://github.com/DBM-Mods/Portugues">Versão 0.1</div>

    <div style="width: 100%; padding:5px 5px;height: calc(100vh - 160px);overflow:auto">

    <div id="flutuador" style="padding:0px 0px 15px 0px">
<table style="width:100%;"><tr>
<td><span class="dbminputlabel">Descrição da Action</span><br><input type="text" class="round" id="description" placeholder="Deixe vazio para remover"></td>
<td style="padding:0px 0px 0px 10px;width:70px"><div style="float:left;padding:0px 0px 0px 7px;margin-top:-5px"><dbm-checkbox id="descriptionx" label="Cor"></dbm-checkbox></div><br><input type="color" value="#ffffff" class="round" id="descriptioncolor"></td>
</tr></table>
</div>

<table><tr>

<td class="col1">
<span class="dbminputlabel">Campo cheio inicial</span>
<input id="cheioi" class="round" type="text" placeholder="Opcional">
</td>

<td>
<span class="dbminputlabel">Campo cheio central</span>
<input id="cheio" class="round" type="text" placeholder="Vazio para o padrão">
</td>

<td class="col2">
<span class="dbminputlabel">Campo cheio final</span>
<input id="cheiof" class="round" type="text" placeholder="Opcional">
</td>

</tr></table>
<br>
    <table><tr>

    <td class="col1">
    <span class="dbminputlabel">Campo vazio inicial</span>
    <input id="vazioi" class="round" type="text" placeholder="Opcional">
    </td>

    <td>
<span class="dbminputlabel">Campo vazio central</span>
<input id="vazio" class="round" type="text" placeholder="Vazio para o padrão">
</td>

<td class="col2">
<span class="dbminputlabel">Campo vazio final</span>
<input id="vaziof" class="round" type="text" placeholder="Opcional">
</td>

</tr></table>

<br>

<table><tr>

<td class="col1">

    <span class="dbminputlabel">Tamanho da Barra</span>
    <input id="tamanho" class="round" type="text" placeholder="Vazio para o padrão">

    </td><td class="col2">

<span class="dbminputlabel">Porcentagem</span>
<input id="pc" class="round" type="text">
	  </td></tr></table>

    <br>

    <span class="dbminputlabel">Tipo de barra</span><br>
<select id="type" class="round">
  <option value="0" selected>Horizontal para a direita</option>
  <option value="1">Horizontal para a esquerda</option>
  <option value="2">Vertical para cima</option>
  <option value="3">Vertical para baixo</option>
</select>

	  <div><br>
		  <div style="padding-top: 8px;">
		  <div style="float: left; width: 35%;">
		  <span class="dbminputlabel">Armazenar em</span><br>
			  <select id="storage" class="round">
				  ${data.variables[1]}
			  </select>
		  </div>
		  <div id="varNameContainer" style="float: right; width: 60%;">
      <span class="dbminputlabel">Nome da variável</span><br>
			  <input id="varName" class="round" type="text">
		  </div>
	  </div>
    
    </div>

<style>

.dbmmodsbr1{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;left:0px;z-index:999999;cursor:pointer}
.dbmmodsbr2{position:absolute;bottom:0px;border: 0px solid rgba(50,50,50,0.7);background:rgba(0,0,0,0.7);color:#999;padding:5px;right:0px;z-index:999999;cursor:pointer}

table{width:100%}
.col1{padding:0px 5px 0px 0px}
.col2{padding:0px 0px 0px 5px}

</style>`;
  },

  init() {
    const { glob, document } = this;

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

    type = parseInt(data.type)

    vazio = this.evalMessage(data.vazio, cache);
    vazioi = this.evalMessage(data.vazioi, cache);
    vaziof = this.evalMessage(data.vaziof, cache);

    if(type == 1){
      vazioi = this.evalMessage(data.vaziof, cache);
      vaziof = this.evalMessage(data.vazioi, cache);
    }

    if(vazio == ""){vazio = "▱"}
    if(vazioi == ""){vazioi = vazio}
    if(vaziof == ""){vaziof = vazio}

    cheio = this.evalMessage(data.cheio, cache);

    cheioi = this.evalMessage(data.cheioi, cache);
    cheiof = this.evalMessage(data.cheiof, cache);

    if(type == 1){
      cheioi = this.evalMessage(data.cheiof, cache);
      cheiof = this.evalMessage(data.cheioi, cache);
    }

    if(cheio == ""){cheio = "▰"}
    if(cheioi == ""){cheioi = cheio}
    if(cheiof == ""){cheiof = cheio}

    pc = parseFloat(this.evalMessage(data.pc, cache));
    tamanho = parseFloat(this.evalMessage(data.tamanho, cache));

    if(tamanho > 0){tamanho = tamanho}else{tamanho = 10}

    calc1 = tamanho / 100
    calc2 = parseInt(calc1 * pc)

    barra = []

    for (let i = 0; i < tamanho; i++) {
if(calc2 > i){

  if(i == 0 || i == (tamanho -1)){

    if(i == 0){ 
      barra.push(cheioi)
    } else {
      barra.push(cheiof)
    }
  
  } else {

    barra.push(cheio)
  }


} else {


  if(i == 0 || i == (tamanho -1)){

    if(i == 0){ 
      barra.push(vazioi)
    } 
    if(i == (tamanho -1))
    {
      barra.push(vaziof)
    }
  
  } else {

    barra.push(vazio)
  }


}

    }

barrax = ""

    if(type == 0){
      
      for (let ib = 0; ib < barra.length; ib++) {
        barrax += String(barra[ib])
      }
    
    }

    if(type == 1){
      
      for (let ib = (barra.length - 1); ib >= 0; ib--) {
        barrax += String(barra[ib])
      }
    
    }

    if(type == 2){
      
      for (let ib = (barra.length - 1); ib >= 0; ib--) {
        barrax += String(barra[ib]) + '\n'
      }

    }

    if(type == 3){
      
      for (let ib = 0; ib < barra.length; ib++) {
        barrax += String(barra[ib]) + '\n'
      }

    }
    

    if (barrax !== undefined) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(barrax, storage, varName, cache);
    }
    this.callNextAction(cache);
  },

  mod() {},
};
