require('dotenv').config()
const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log('The bot is ready!')
});

client.on('messageCreate', (message) => { 
    // Owner Reaction
    if (message.author.id == 984513610464239687 && message.guild.id == 923620715457048596){
        message.react(message.guild.emojis.cache.get('1038169527952883743'));
    } else if(message.guild.id == 994162057110892564){
        if (message.author.id == 984513610464239687 || message.author.id == 424562454949920779) {
            message.react(message.guild.emojis.cache.get('1093161303679442985'));
        }
    }
});

client.login(process.env.TOKEN);