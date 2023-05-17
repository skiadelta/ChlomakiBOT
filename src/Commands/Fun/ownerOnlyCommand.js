const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hehehe_you_cant_use_this_command')
        .setDescription('dont try even using this command')
        .addUserOption(option => 
            option.setName('m_secret')
                .setDescription('--')
                .setRequired(true))
        .addStringOption(option => 
            option
                .setName('s_secret')
                .setDescription('__')),
    async execute(interaction){
        let reply;
        if (interaction.user.id == 984513610464239687) {
            const target = interaction.options.getUser('m_secret');
            const text = interaction.options.getString('s_secret');

            reply = `${text}, ${target}`;
        } else {
            reply = 'nope';
        };
        await interaction.deferReply();
        await interaction.editReply(reply);
    },
};