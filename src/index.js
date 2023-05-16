const {Client, GatewayIntentBits, Events, Collection} = require('discord.js');
const {botToken} = require('./config.json');
const path = require('path');
const fs = require('fs');

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'Commands');
const commandFolders = fs.readdirSync(foldersPath);

// Register Commands
for (const file of commandFolders) {
	const commandsPath = path.join(foldersPath, file);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Set a new item in the Collection with the key as the command name and the value as the exported module
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
		const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command){
        console.error(`No matching commands! ${interaction.commandName}`)
        return;
    }

    try{
        await command.execute(interaction);
    } catch (error){
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

// Get Events
const eventsPath = path.join(__dirname, 'Events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
    console.log(file)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
};


// Login
client.login(botToken);