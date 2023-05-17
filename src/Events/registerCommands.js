const { Events, Routes, REST } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const { botToken, clientId } = require('../config.json');

const commands = [];
const foldersPath = path.join(__dirname, '../Commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const rest = new REST().setToken(botToken);

module.exports = {
	name: Events.GuildCreate,
	async execute(guild) {
		try {
			const data = await rest.put(
				Routes.applicationGuildCommands(clientId, guild.id),
				{ body: commands },
			)

		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	},
};