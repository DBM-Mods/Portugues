module.exports = {
    name: "Repetitions MOD",
    section: "Other Stuff",
    meta: {
        version: '2.1.7',
        preciseCheck: true,
        author: '[Tempest - 321400509326032897]',
        authorUrl: 'https://github.com/DBM-Mods/Portugues',
        downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
      },
    
    subtitle: function(data) {
    return `Quantidade de repetições de "${data.palavra}"`;
    },
    
    variableStorage: function(data, varType) {
            const type = parseInt(data.storage);
            if(type !== varType) return;
            return ([data.varName, 'Number']);
        },
    
    
    fields: ["texto", "palavra", "letra", "acentos", "storage", "varName"],
    
    html: function(isEvent, data) {
        return `
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;right:0px;z-index:999999">Versão 0.1</div>
        <div style="position:absolute;bottom:0px;border: 1px solid #222;background:#000;color:#999;padding:3px;left:0px;z-index:999999">dbmmods.com</div>
        <span class="dbminputlabel">Texto</span>
        <textarea id="texto" placeholder="Insira o texto aqui..." rows="5" style="resize:none"></textarea>
        <br>
        <span class="dbminputlabel">Palavra</span>
        <input id="palavra" type="text" class="round" placeholder="Insira a palavra aqui...">
        <br>
        <div style="float:left; width:45%;">
            <span class="dbminputlabel">Ignorar letras maiúsculas</span>
            <select id="letra" class="round">
                <option value="0" selected>Não</option>
                <option value="1">Sim</option>
            </select>
        </div>
        <div style="float:right; width:50%;">
            <span class="dbminputlabel">Ignorar acentos</span>
            <select id="acentos" class="round">
                <option value="0">Não</option>
                <option value="1" selected>Sim</option>
            </select>
        </div>
        <br><br><br>
        <div style="float: left; width: 35%; padding-top: 8px;">
            <span class="dbminputlabel">Resultado em</span><br>
            <select id="storage" class="round" onchange="glob.variableChange(this, 'varNameContainer')">
            ${data.variables[1]}
            </select>
        </div>
        <div id="varNameContainer" style="float: right; display: none; width: 60%; padding-top: 8px;">
            <span class="dbminputlabel">Nome da variável</span><br>
            <input id="varName" class="round" type="text">
        </div><br><br>
        <div style=" float: left; width: 88%; padding-top: 8px;">
            <br>
        </div>`;
    },
    
    init: function() {
        const {glob, document} = this;
    
        glob.variableChange(document.getElementById('storage'), 'varNameContainer');
    },
    
    action: function(cache) {
    
        const data = cache.actions[cache.index];
        var texto = this.evalMessage(data.texto, cache);
        var palavra = this.evalMessage(data.palavra, cache);
        palavra = palavra.toString();
        texto = texto.toString();
        const letra = parseInt(data.letra, 10);
        const acentos = parseInt(data.acentos, 10);
        let regex;

        switch(letra) {
            case 0:
                if(acentos == 0) {
                    const comAcentos = "ÄÅÁÂÀÃĀĂĄāăąäáâàãÉÊËÈĖĘĚĔĒėęěĕēéêëèÍÎÏÌİĮĪıįīíîïìÖÓÔÒÕŐŌőōöóôòõÜÚÛŲŰŮŪųűůūüúûùÇĆČçćčÑŇŅŃñňņńŸÝÿýŹŻŽźżžŁĽĻĹłľļĺĶķĢĞģğĎďŚŠŞśšşŤȚŢťțţŔŘŕř";
                    const semAcentos = "AAAAAAAAAaaaaaaaaEEEEEEEEEeeeeeeeeeIIIIIIIiiiiiiiOOOOOOOoooooooUUUUUUUuuuuuuuuCCCcccNNNNnnnnYYyyZZZzzzLLLLllllKkGGggDdSSSsssTTTtttRRrr";
                    for(var i = 0; i < comAcentos.length; i++) {
                        texto = texto.replaceAll(comAcentos[i], semAcentos[i]);
                    }
                }
                regex = new RegExp(palavra, "gi");
                break;
            case 1:
                if(acentos == 0) {
                    const comAcentos = "āăąäáâàãėęěĕēéêëèıįīíîïìőōöóôòõųűůūüúûùçćčñňņńÿýźżžłľļĺķģğďśšşťțţŕř";
                    const semAcentos = "aaaaaaaaeeeeeeeeeiiiiiiiooooooouuuuuuuucccnnnnyyzzzllllkggdssstttrr";
                    for(var i = 0; i < comAcentos.length; i++) {
                        texto = texto.replaceAll(comAcentos[i], semAcentos[i]);
                    }
                }
                regex = new RegExp(palavra, "g");
                break;
        }

        result = (texto.match(regex) || []).length;
    
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
    
