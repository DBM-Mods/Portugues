module.exports = {
  name: 'Member Move Voice Channel MOD',
  isEvent: true,
  meta: {
    author: '[XinXyla - 172782058396057602]',
    authorUrl: 'https://github.com/DBM-Mods/Portugues',
    downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
    },

  mod(DBM) {
    DBM.Events = DBM.Events || {};
    const { Actions, Bot } = DBM;

    DBM.Events.memberMoveVoiceChannelmod = function memberMoveVoiceChannel(oldVoiceState, newVoiceState) {
      if (!Bot.$evts['Member Move Voice Channel MOD']) return;

      const oldChannel = oldVoiceState.channel;
      const newChannel = newVoiceState.channel;
      if (!oldChannel || !newChannel || !oldChannel.id || !newChannel.id || oldChannel.id === newChannel.id) return;
      const server = newChannel.guild;

      for (const event of Bot.$evts['Member Move Voice Channel MOD']) {
        const temp = {};
       
        event.temp = temp["EVENTOvarGATE"] = "100"
        event.temp2 = temp["EVENTOvar1"] = newVoiceState.member
        event.temp3 = temp["EVENTOvar2"] = newChannel 
        event.temp4 = temp["EVENTOvar3"] = oldChannel        

        Actions.invokeEvent(event, server, temp)
      }
    };

    const { onReady } = Bot;
    Bot.onReady = function memberMoveVoiceChannelOnReady(...params) {
      Bot.bot.on('voiceStateUpdate', DBM.Events.memberMoveVoiceChannelmod);
      onReady.apply(this, ...params);
    };
  },
};
