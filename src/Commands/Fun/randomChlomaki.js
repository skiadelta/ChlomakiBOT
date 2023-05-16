const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const chloFiles = [
    'https://tenor.com/view/chlomaki-flag-country-respublic-okegom-gif-7112917466937750688',
    'https://cdn.discordapp.com/attachments/1065695066821247027/1094288975704887316/chlomaki.mp4',
    'https://cdn.discordapp.com/attachments/1105064317314932749/1107263786206904330/chlomaki.jpg',
    'https://tenor.com/view/chlomaki-susctopus-spunch-bop-spunch-bob-asiogbob-gif-22440305',
    'https://tenor.com/view/chlomaki-chlomakicord-bri-ish-trollface-apandah-gif-19179573',
    'https://tenor.com/view/chlomaki-funamusea-okegom-mogeko-gamecube-gif-25769758',
    'https://tenor.com/view/despite-all-my-rage-chlomaki-wadanohara-funamusea-ogekom-gif-20105119',
    'https://tenor.com/view/chlomaki-deep-sea-prisoner-ambers-gif-17936285',
];

const chloEmbed = () => {
    const index = Math.floor(Math.random() * chloFiles.length)
    const randomFile = chloFiles[index]

    const embed = new EmbedBuilder()
        .setTitle(`A random chlomaki! That's the ${index} of all ${chloFiles.length} chlomakis i have in my database!`)
        .setDescription('we silly')
        .setImage(randomFile)
        .setColor('#090909')
    return {embeds: [embed]};
};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_chlomaki')
        .setDescription('A random chlomaki related file from my database!'),
    async execute(interaction){
        await interaction.deferReply();
        const reply = await chloEmbed()
        await interaction.editReply(reply);
    },
};