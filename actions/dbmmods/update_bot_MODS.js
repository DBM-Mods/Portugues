/*
Copyright Willian Pereira (Discord: XinXyla#0001 = 172782058396057602),(Github: https://github.com/DBM-Mods)
dbmmods.com
DBM BRAZIL MODS
*/

const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'commands.json');
const filePath2 = path.join(process.cwd(), 'data', 'events.json');

(()=>{
   
   if(fs.existsSync(filePath2)){

      let content = fs.readFileSync(filePath2)  
      try {
         if(typeof content !== 'string' && content.toString) content = content.toString();
         Files.data.events = JSON.parse(Files.decrypt(content));
      } catch(e) {
         console.error(e)
         return;
      }
   }

  
   if(fs.existsSync(filePath)){
   
      let content = fs.readFileSync(filePath)  
      let data;
      try {
         if(typeof content !== 'string' && content.toString) content = content.toString();
         data = JSON.parse(Files.decrypt(content));
      } catch(e) {
         console.error(e)
         return;
      }
       
      if(commandName ===  undefined) return;
  
      function reloadEvents(){
         if (depurador == true){
         console.log(`Update Bot MODS: Atualizando ${Files.data.events.length} eventos...`)}

         for(const event of client.eventNames()) {  
            client.removeAllListeners(event);  
         }

         Bot.$evts = {}; 

         Bot.setupBot();
         Bot.reformatEvents();
         Bot.initEvents();

         if(Bot.$evts["3"]) {
            Events.setupIntervals(bot);
         }
      }

      function reloadCommands(){
         if (depurador == true){
         console.log(`Update Bot MODS: Atualizando ${data.length} comandos...`)}

         Files.data.commands = data;

         Bot.$cmds = {}; 
         Bot.$icds = []; 
         Bot.$regx = []; 
         Bot.$anym = [];
Bot.$slash = {};
Bot.$user = {};
Bot.$msge = {};
Bot.$button = {};
Bot.$select = {};
Bot.$other = {}
      
         Bot.reformatCommands();
      }

      if(atualizar === "0"){

         try {
            reloadCommands();
            reloadEvents();           
         } catch (error) {
            console.error(error)
            if (depurador == true){console.log(`Update Bot MODS: Ocorreu um problema ao atualizar tudo`)}
            falhou = "true"
            return           
         }
         if (depurador == true){console.log(`Update Bot MODS: Todos os dados do bot foram atualizados!`)}
         return 
      } 

      if(atualizar == "2"){
         try {
            reloadEvents();
         } catch (error) {
            console.error(error)
            if (depurador == true){console.log(`Update Bot MODS: Ocorreu um problema ao atualizar todos os eventos`)}
            falhou = "true"
            return
         }

         if (depurador == true){console.log(`Update Bot MODS: Todos os ${Files.data.events.length} eventos foram atualizados!`)}
         return 
      }
      if(atualizar == "1"){
      
         try {
            reloadCommands();
         } catch (error) {
            console.error(error)
            if (depurador == true){console.log(`Update Bot MODS: Ocorreu um problema ao atualizar todos os comandos!`)}
            falhou = "true"
            return
         }

         if (depurador == true){console.log(`Update Bot MODS: Todos os ${data.length} comandos foram atualizados!`)}
         return 
      }



      let found = data.filter(c=>c && c.name.indexOf(commandName) == 0)
      
      if(found.length == 0) return gatilhosxin = "1"
      if(found.length > 1) return gatilhosxin = "2", captados = found.map(c=>c.name)

         const com = data.find(c=>c && c.name === found[0].name)
         Bot._caseSensitive = Boolean(Files.data.settings.case === 'true');  
         if(com) {
            switch(com.comType) {
               case '0':
                  if(Bot._caseSensitive) {
                     Bot.$cmds[com.name] = com;
                     if(com._aliases) {
                        const aliases = com._aliases;
                        for(let j = 0; j < aliases.length; j++) {
                           Bot.$cmds[aliases[j]] = com;
                        }
                     }
                  } else {
                     Bot.$cmds[com.name.toLowerCase()] = com;
                     if(com._aliases) {
                        const aliases = com._aliases;
                        for(let j = 0; j < aliases.length; j++) {
                           Bot.$cmds[aliases[j].toLowerCase()] = com;
                        }
                     }
                  }
                  break;
               case '1':
                  delete Bot.$icds.find(c=>c && c.name === found)
                  Bot.$icds.push(com);
                  break;
               case '2':
                  delete Bot.$regx.find(c=>c && c.name === found)
                  Bot.$regx.push(com);
                  break;
               case '3':
                  delete Bot.$anym.find(c=>c && c.name === found)
                  Bot.$anym.push(com);
                  break;
                  case '4':
                     if(Bot._caseSensitive) {
                        Bot.$slash[com.name] = com;
                     } else {
                        Bot.$slash[com.name.toLowerCase()] = com;
                     }
                     break;
                     case '5':
                        if(Bot._caseSensitive) {
                           Bot.$user[com.name] = com;
                        } else {
                           Bot.$user[com.name.toLowerCase()] = com;
                        }
                        break;
                        case '6':
                           if(Bot._caseSensitive) {
                              Bot.$msge[com.name] = com;
                           } else {
                              Bot.$msge[com.name.toLowerCase()] = com;
                           }
                           break;
                  break;
               default:
               break;
            }

            if (depurador == true){console.log(`Comando '${com.name}' foi atualizado!`)}
         }
      


   }

})();

