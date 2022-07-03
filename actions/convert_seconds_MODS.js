module.exports = {
name: "Convert Seconds MOD",
section: "Other Stuff",
meta: {
    version: '2.1.5',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]',
	short_description: "Converter segundos em anos, meses, dias, horas, minutos e segundos.",
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
return `Convert ${data.time}`;
},

variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		if(type !== varType) return;
		return ([data.varName, 'Date']);
	},


fields: ["time", "ano", "meses", "dia", "hora", "min", "seg", "ano2", "meses2", "dia2", "hora2", "min2", "seg2", "storage", "varName"],

html: function(isEvent, data) {
	return `
	<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.5</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
	<div style="float: left; width: 100%; padding-top: 8px;">
	<span class="dbminputlabel">Converter segundos</span>
		<input id="time" class="round" type="text">
	</div><br><br><br><br>

	<center><span class="dbminputlabel">Formato da Data</span></center>
	<div style="width:100%;border:1px solid #333;background: rgba(50,50,50,0.5)"><br>
<table style="width:100%"><tr>
<td><span class="dbminputlabel">Anos</span><input id="ano" value=" anos " class="round" type="text"></td>
<td><span class="dbminputlabel">Meses</span><input id="meses" value=" meses " class="round" type="text"></td>
<td><span class="dbminputlabel">Dias</span><input id="dia" value=" dias " class="round" type="text"></td>
<td><span class="dbminputlabel">Horas</span><input id="hora" value=" horas " class="round" type="text"></td>
<td><span class="dbminputlabel">Minutos</span><input id="min" value=" minutos " class="round" type="text"></td>
<td><span class="dbminputlabel">Segundos</span><input id="seg" value=" segundos " class="round" type="text"></td></tr>
</table>
<br>
<table style="width:100%"><tr>
<td><span class="dbminputlabel">Ano</span><input id="ano2" value=" ano " class="round" type="text"></td>
<td><span class="dbminputlabel">Mês</span><input id="meses2" value=" mês " class="round" type="text"></td>
<td><span class="dbminputlabel">Dia</span><input id="dia2" value=" dia " class="round" type="text"></td>
<td><span class="dbminputlabel">Hora</span><input id="hora2" value=" hora " class="round" type="text"></td>
<td><span class="dbminputlabel">Minuto</span><input id="min2" value=" minuto " class="round" type="text"></td>
<td><span class="dbminputlabel">Segundo</span><input id="seg2" value=" segundo " class="round" type="text"></td>
</tr></table>

</div>
	<br><br>
	<div style="float: left; width: 35%; padding-top: 8px;">
	<span class="dbminputlabel">Resultado em</span><br>
		<select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
		${data.variables[0]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
	<span class="dbminputlabel">Nome da Variável</span><br>
		<input id="varName" class="round" type="text">
	</div><br><br>
	<div style=" float: left; width: 88%; padding-top: 8px;">
		<br>
	</div>
	
	<style>td{padding:2px}<style>`;
},

init: function() {
	const {glob, document} = this;

	glob.variableChange(document.getElementById('storage'), 'varNameContainer');
},

action: function(cache) {

	const data = cache.actions[cache.index];
	const time = this.evalMessage(data.time, cache);
	const ano = this.evalMessage(data.ano, cache);
	const meses = this.evalMessage(data.meses, cache);
	const dia = this.evalMessage(data.dia, cache);
	const hora = this.evalMessage(data.hora, cache);
	const min = this.evalMessage(data.min, cache);
	const seg = this.evalMessage(data.seg, cache);
	const ano2 = this.evalMessage(data.ano2, cache);
	const meses2 = this.evalMessage(data.meses2, cache);
	const dia2 = this.evalMessage(data.dia2, cache);
	const hora2 = this.evalMessage(data.hora2, cache);
	const min2 = this.evalMessage(data.min2, cache);
	const seg2 = this.evalMessage(data.seg2, cache);
	var   _this = this;
	
	let d, h, m, s;
	let result;

	if (isNaN(time)) {
		result.toString() = "Data invalida";
		console.log('Por favor insira um número');
	}
	else {

	   s = time;

		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		a = Math.floor(time / 60 / 60 / 24 / 365.242214);
		mes = Math.floor(time / 60 / 60 / 24 / 30.43685116666667 - (a * 12));
		d = Math.floor(h / 24 - (a * 365.242214) - (30.43685116666667 * mes));
		h = h % 24;


		result = (a > 1 ? ''+ a + ano : '') + (a == 1 ? ''+ a + ano2 : '') + (mes > 1 ? ''+ mes + meses : '') + (mes == 1 ? ''+ mes + meses2 : '') + (d > 1 ? d + dia : '') + (d == 1 ? ''+ d + dia2 : '') + (h > 1 ? h + hora : '') + (h == 1 ? ''+ h + hora2 : '') + (m > 1 ? m + min : '') + (m == 1 ? ''+ m + min2 : '') + (s > 1 ? s + seg : '') + (s == 1 ? ''+ s + seg2 : '');

	}
	if (result.toString() === "Data invalida") result = undefined;
    // Storage.
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
    this.callNextAction(cache);
},

mod: function(DBM) {
}

};
