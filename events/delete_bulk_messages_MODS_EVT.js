module.exports = {
	name: 'Delete Bulk Messages MOD',
	isEvent: true,
	meta: {
		author: '[XinXyla - 172782058396057602]',
		authorUrl: 'https://github.com/DBM-Mods/Portugues',
		downloadURL: 'https://github.com/DBM-Mods/Portugues/archive/refs/heads/main.zip',
	},

	mod(DBM) {
		DBM.Events = DBM.Events || {};
		const { Bot, Actions } = DBM;

		DBM.Events.messageDeleteBulkmod = function messageDeleteBulk(messagesList) {
			if (!Bot.$evts['Delete Bulk Messages MOD']) return;

			for (const event of Bot.$evts['Delete Bulk Messages MOD']) {
				const temp = {};

				const server = messagesList.guild;

				event.temp = temp["EVENTOvarGATE"] = "101"
				event.temp2 = temp["EVENTOvar1"] = messagesList

				Actions.invokeEvent(event, server, temp)

			}
		};

		const { onReady } = Bot;
		Bot.onReady = function messageDeleteBulkOnReady(...params) {
			Bot.bot.on('messageDeleteBulk', DBM.Events.messageDeleteBulkmod);
			onReady.apply(this, ...params);
		};
	},
};
