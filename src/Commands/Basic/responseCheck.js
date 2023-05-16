const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('response')
        .setDescription('Responses whenever the command is called'),
    async execute(interaction){
        await interaction.deferReply();
        await interaction.editReply('Hey!');
    },
};