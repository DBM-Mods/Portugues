module.exports = {

name: "Math Operation Plus MOD",
section: "Other Stuff",
meta: {
    version: '2.1.7',
    preciseCheck: true,
    author: '[XinXyla - 172782058396057602]<br>[Tempest - 321400509326032897]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
  },

subtitle: function(data) {
	const info = ['Adição', 'Subtração', 'Multiplicação', 'Divisão', 'Arredondar', 'Arredondar em A.S.', 'Absoluto', 'Arredondar para cima', 'Arredondar para baixo', 'Fatorial', 'Elevado por (Expoentes)', 'Enraizado por (Raízes)', 'Seno', 'Cosseno', 'Tangente', 'Arco Seno', 'Arco Cosseno', 'Arco Tangente', '% do Número', 'Aumentar por %', 'Reduzir por %', 'Valor de Pi', 'Valor do número de Eulers', 'Raiz quadrada', 'Número aleátorio entre', 'Fahrenheit para Celsius', 'Celsius para Fahrenheit', 'Celsius para Kelvin', 'Fahrenheit para Kelvin', 'Kelvin para Celsius', 'Kelvin para Fahrenheit', 'Raiz cúbica'];
	return `${info[data.info]}`;
},
	
variableStorage: function (data, varType) {
	const type = parseInt(data.storage);
	if (type !== varType) return;
	let dataType = 'Number';
	return ([data.varName, dataType]);
},

fields: ["FirstNumber", "info", "SecondNumber", "storage", "varName"],

html: function(isEvent, data) {
	return `
	<div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 1.3</div>
    <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>

<table style="width:100%"><tr><td style="width:45%" id="Principado">

<div id="FirstNum">
<span class="dbminputlabel">Valor 1</span><br>
<input id="FirstNumber" class="round" type="text">
</div>

</td><td style="width:10%;text-align:center"><br>
<div id="Meio" name="Meio"></div>
</td><td style="width:45%">

<div id="SecondNum">
<span class="dbminputlabel">Valor 2</span><br>
<input id="SecondNumber" class="round" type="text">
</div>
</td></tr></table>
<br>
<div style="padding-top: 8px; width: 100%;">
<span class="dbminputlabel">Operação Matemática</span>
<select id="info" class="round" onchange="glob.onChange1(this)">
			<option value="0" selected>[ + ] Adição</option>
			<option value="1">[ - ] Subtração</option>
			<option value="2">[ x ] Multiplicação</option>
			<option value="3">[ ÷ ] Divisão</option>
			<option value="4">Arredondar</option>
			<option value="5">[ AAS ] Arredondar em A.S.</option>
			<option value="6">Absoluto</option>
			<option value="7">Arredondar para cima</option>
			<option value="8">Arredondar para baixo</option>
			<option value="9">Fatorial</option>
			<option value="10">[ x,y ] Aumentado por (Expoentes)</option>
			<option value="11">[ x,y ] Enraizado por (Raízes)</option>
			<option value="12">Seno</option>
			<option value="13">Cosseno</option>
			<option value="14">Tangente</option>
			<option value="15">Arco Seno</option>
			<option value="16">Arco Cosseno</option>
			<option value="17">Arco Tangente</option>
			<option value="18">[ % ] Porcentagem</option>
			<option value="19">[ % ] Aumentar número em porcentagem</option>
			<option value="20">[ % ] Diminuir número em porcentagem</option>
			<option value="21">Valor de Pi</option>
			<option value="22">Valor do número de Eulers</option>
			<option value="23">[ √ ] Raiz quadrada</option>
			<option value="31">Raiz cúbica</option>
			<option value="24">[ e ] Número aleátorio entre um e outro</option>
			<option value="25">Fahrenheit para Celsius</option>
			<option value="26">Celsius para Fahrenheit</option>
			<option value="27">Celsius para Kelvin</option>
			<option value="28">Fahrenheit para Kelvin</option>
			<option value="29">Kelvin para Celsius</option>
			<option value="30">Kelvin para Fahrenheit</option>
</select>
<br>
</div>
<span class="dbminputlabel">Informação da fórmula</span>
<div id="Informativo" name="Informativo" style="border:1px solid #ccc;background:rgba(50,50,50,0.7);padding:5px"></div>
<br>
<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
	<span class="dbminputlabel">Armazenar em</span><br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
	<span class="dbminputlabel">Nome da variavel</span><br>
		<input id="varName" class="round" type="text">
	</div>
</div>
	`
},

init: function() {
    const {glob, document} = this;

    glob.onChange1 = function(event) {
        const value = parseInt(event.value);
        const dom = document.getElementById('SecondNum');
		const dom2 = document.getElementById('FirstNum');
		const dom2p = document.getElementById('Principado');
		          
        if (value == 0) {
            dom.style.display = null,
			dom2.style.display = null;
			dom2p.style.width = "45%";
            document.querySelector("[name='Meio']").innerText = (`+`);
			document.querySelector("[name='Informativo']").innerText = (`Soma dois valores\nExemplo: 5 + 5 = 10`);
        } else if (value == 1) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`-`);
			document.querySelector("[name='Informativo']").innerText = (`Subtrai dois valores\nExemplo: 5 - 2 = 3`);
        } else if (value == 2) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`x`);
			document.querySelector("[name='Informativo']").innerText = (`Multiplica dois valores\nExemplo: 5 x 5 = 25`);
        } else if (value == 3) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`÷`);
			document.querySelector("[name='Informativo']").innerText = (`Divide dois valores\nExemplo: 10 ÷ 2 = 5`);
		} else if (value == 4) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arredonda para o número inteiro mais próximo, arredonda para cima ou para baixo\nExemplos:\n105.23 = 105\n105.50 = 106\n105.72 = 106`);
		} else if (value == 5) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`AAS`);
			document.querySelector("[name='Informativo']").innerText = (`Arredonda para o número inteiro especificando o número de algarismos significativos.\nExemplos:\n105.5055465 AAS 3 = 106\n105.5055465 AAS 4 = 105.5\n105.5055465 AAS 6 = 105.506`);
		} else if (value == 6) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Número absoluto\nExemplos:\n105 = 105\n-105 = 105`);
		} else if (value == 7) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arredonda para cima\nExemplos:\n105.43 = 106\n105.01 = 106`);
		} else if (value == 8) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Arredonda para baixo\nExemplos:\n105.99 = 105\n105.01 = 105`);
		} else if (value == 9) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcula o fatorial de (Valor 1)\nExemplos:\n[ 3 ] 3×2×1= 6\n[ 4 ] 4×3×2×1 = 24\n[ 5 ] 5×4×3×2×1 = 120`);
		} else if (value == 10) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`X , Y`);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o valor de x elevado a y\nExemplos:\nx = 2, y = 3 | Resultado: 8`);
		} else if (value == 11) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`X , Y`);
			document.querySelector("[name='Informativo']").innerText = (``);
		} else if (value == 12) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o seno de (Valor 1) em radianos`);
		} else if (value == 13) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o cosseno de (Valor 1) em radianos`);
		} else if (value == 14) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna a tangente do ângulo (Valor 1)`);
		} else if (value == 15) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o arco seno de (Valor 1)`);
		} else if (value == 16) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o arco cosseno de (Valor 1)`);
		} else if (value == 17) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Retorna o arco tangente do (Valor 1) como um valor numérico entre PI/2 e PI/2 radiano`);
		} else if (value == 18) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`% de`);
			document.querySelector("[name='Informativo']").innerText = (`Calcula em porcentagem\nExemplos:\n25 % de 500 = 125`);
		} else if (value == 19) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcula em porcentagem`);
		} else if (value == 20) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Calcula em porcentagem`);
		} else if (value == 21) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`3.141592653589793`);
		} else if (value == 22) {
		    dom.style.display = "none";
			dom2.style.display = "none";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`2.718281828459045`);
		} else if (value == 23) {
		    dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "96%";
			document.querySelector("[name='Meio']").innerText = (`√`);
			document.querySelector("[name='Informativo']").innerText = (`Raiz quadrada do (Valor 1)`);
		} else if (value == 24) {
		    dom.style.display = null;
			dom2.style.display = null;
			dom2p.style.width = "45%";
			document.querySelector("[name='Meio']").innerText = (`e`);
			document.querySelector("[name='Informativo']").innerText = (`Número aleátorio entre (Valor 1) e (Valor 2)`);
		} else if (value == 25) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Fahrenheit(Valor 1) para Celsius\nExemplo: 100°F = 37,7°C`);
		} else if (value == 26) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Celsius(Valor 1) para Fahrenheit\nExemplo: 100°C = 212°F`);
		} else if (value == 27) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Celsius(Valor 1) para Kelvin\nExemplo: 100°C = 373,15 K`);
		} else if (value == 28) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Fahrenheit(Valor 1) para Kelvin\nExemplo: 100°F = 310,92 K`);
		} else if (value == 29) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Kelvin(Valor 1) para Celsius\nExemplo: 100 K = -173,15°C`);
		} else if (value == 30) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Converta Kelvin(Valor 1) para Fahrenheit\nExemplo: 100 K = -279,67°F`);
		} else if (value == 31) {
			dom.style.display = "none";
			dom2.style.display = null;
			dom2p.style.width = "100%";
			document.querySelector("[name='Meio']").innerText = (``);
			document.querySelector("[name='Informativo']").innerText = (`Raiz cúbica do (Valor 1)`);
		} else {
                        dom.style.display = 'none';
		}
	    
		
    };
	glob.onChange1(document.getElementById('info'));

},

action: function(cache) {
	const data = cache.actions[cache.index];
	const FN = parseFloat(this.evalMessage(data.FirstNumber, cache).replace(/,/g, ''));
	const SN = parseFloat(this.evalMessage(data.SecondNumber, cache).replace(/,/g, ''));
	const info = parseInt(data.info);

	let result;
	switch(info) {
		case 0:
			result = FN + SN;
			break;
		case 1:
			result = FN - SN;
			break;
		case 2:
			result = FN * SN;
			break;
		case 3:
			result = FN / SN;
			break;
		case 4:
			result = Math.round(FN);
			break;
		case 5:
		    result = FN.toPrecision(SN);
			break;
		case 6:
			result = Math.abs(FN);
			break;
		case 7:
		    result = Math.ceil(FN);
			break;
		case 8:
		    result = Math.floor(FN);
			break;
		case 9:
		    function fact(x) {
                  if(x == 0) {
                    return 1;
                  }
                  if(x < 0 ) {
                    return undefined;
                  }
                  for(var i = x; --i; ) {
                    x *= i;
                  }
                  return x;
            }
			result = fact(FN);
			break;
		case 10:
		    result = Math.pow(FN, SN);
			break;
		case 11:
		    PO = 1 / SN
		    result = Math.pow(FN, PO);
			break;
		case 12:
		    result = Math.sin(FN);
			break;
		case 13:
			result = Math.cos(FN);
			break;
		case 14:
			result = Math.tan(FN);
			break;
		case 15:
			result = Math.asin(FN);
			break;
		case 16:
			result = Math.acos(FN);
			break;
		case 17:
			result = Math.atan(FN);
			break;
		case 18:
			PN = FN * SN;
			result = PN / 100;
			break;
		case 19:
		    PN = FN * SN;
			result = PN / 100 + FN;
			break;
		case 20:
		    DN = 100 - SN;
			PN = FN * DN;
			result = PN / 100;
			break;
		case 21:
		    result = Math.PI
			break;
		case 22:
		    result = Math.E
			break;
		case 23:
			result = Math.sqrt(FN);
			break;
		case 24:
			result = Math.floor(Math.random() * (SN - FN)) + FN;
			break;
		case 25:
			result = (FN - 32) * 5/9;
			break;
		case 26:
			result = (FN * 9/5) + 32;
			break;
		case 27:
			result = FN + 273.15;
			break;
		case 28:
			result = (FN - 32) * 5/9 + 273.15;
			break;
		case 29:
			result = FN - 273.15;
			break;
		case 30:
			result = (FN  - 273.15) * 9/5 + 32;
			break;
		case 31:
			result = Math.cbrt(FN);
			break;
		default:
			break;
	}
	
	if (result !== undefined) {
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		this.storeValue(result, storage, varName, cache);
	}
	this.callNextAction(cache);
},


mod: function(DBM) {
}

};
