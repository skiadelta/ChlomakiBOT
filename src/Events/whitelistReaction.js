const { Events } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');

const filePath = path.join(__dirname, 'whitelist.json');
const whitelist = JSON.parse(fs.readFileSync(filePath));

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
        for (const whitelistedUser in whitelist) {
            if (message.author.id == whitelist[whitelistedUser].userid && whitelist[whitelistedUser].allowedServers.includes(message.guild.id)) {
                const emoji = message.client.emojis.cache.find(emoji => emoji.name === whitelist[whitelistedUser].emoji.name);
                message
                    .react(emoji)
                    .then(() => console.log('Reaction sent'))
                    .catch((err) => console.log(`Oops, there was an error ${err}`));
            };
        };
	},
};