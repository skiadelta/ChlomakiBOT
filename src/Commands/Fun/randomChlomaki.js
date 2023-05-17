const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const chloFiles = {
    gifs: [
        'https://media.tenor.com/YrYowBV-9KAAAAAC/chlomaki-flag.gif',
        'https://media.tenor.com/xE5KBeXDsnUAAAAd/chlomaki-susctopus.gif',
        'https://media.tenor.com/77kBPjNMZzIAAAAd/chlomaki-chlomakicord.gif',
        'https://media.tenor.com/v4tVYUS0QBMAAAAC/chlomaki-funamusea.gif',
        'https://media.tenor.com/-49I-myohPkAAAAd/despite-all-my-rage-chlomaki.gif',
        'https://media.tenor.com/DWt3dJmxz4kAAAAd/chlomaki-deep-sea-prisoner.gif',
    ],

    images: [
        'https://cdn.discordapp.com/attachments/1105064317314932749/1107263786206904330/chlomaki.jpg'
    ],

    videos: [
        'https://cdn.discordapp.com/attachments/1065695066821247027/1094288975704887316/chlomaki.mp4'
    ]
}

const randomChlomakiMessage = () => {
    const fileType = Math.floor(Math.random() * Object.keys(chloFiles).length + 5);
    
    let randomFile, title, result;

    if (fileType >= 6) {
        const index = Math.floor(Math.random() * chloFiles['gifs'].length);
        randomFile = chloFiles['gifs'][index];
        title = `That's the ${index + 1} of all Chlomaki GIFs i have in my database!`
    } else if (fileType >= 2) {
        const index = Math.floor(Math.random() * chloFiles['images'].length);
        randomFile = chloFiles['images'][index];
        title = `That's the ${index + 1} of all Chlomaki Images i have in my database!`
    } else if (fileType < 2) {
        const index = Math.floor(Math.random() * chloFiles['videos'].length);
        randomFile = `That's the ${index + 1} of all Chlomaki Videos i have in my database! ${chloFiles['videos'][index]}`;
    };
    if (fileType >= 2) {
        result = { embeds: [new EmbedBuilder()
            .setTitle(title)
            .setDescription('we silly')
            .setImage(randomFile)
            .setColor('#090909')] }
    } else {
        result = randomFile
    };

    console.log(fileType)

    return result
};


module.exports = {
    data: new SlashCommandBuilder()
        .setName('random_chlomaki')
        .setDescription('A random chlomaki related file from my database!'),
    async execute(interaction){
        await interaction.deferReply();
        const reply = await randomChlomakiMessage()
        await interaction.editReply(reply);
    },
};