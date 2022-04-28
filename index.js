const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { Client, Intents } = require('discord.js');
const GuildMember = new Discord.GuildMember();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const token = 'NzcwODM2MjU3OTExNDcyMTQ5.X5jXNQ.bQqfvTeP699Hg9U4wkS6B-fICwo';

client.once('ready', () => {
    console.log('Félicitations, votre bot Discord a été correctement initialisé !');
});

client.login(token);

client.on("messageCreate", async message => {
    const messageArray = message.content.split(' ');
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (cmd === "101test") {
        message.channel.send("gg bouffon")
        console.log(cmd);
    }

    if (cmd === '101goulag') {
        if (args.length === 0) {
            message.channel.send('Ping le prisonnier !');
        } else {
            console.log(cmd);
            let pollDescription = args.join(' ');

            let embedPoll = new MessageEmbed()
                .setTitle('<:QUOI:958112872527954000>  Vote goulag !  <:QUOI:958112872527954000>')
                .setDescription(pollDescription)
                .setColor('YELLOW');
            let msgEmbed = await message.channel.send({ embeds: [embedPoll] });
            await msgEmbed.react('👍')
            await msgEmbed.react('👎')
        }
    }
})

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.id != "770836257911472149") {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }
        let member = reaction.message.guild.members.fetch(user.id);
        let voicemember = (await member).voice;
        getnbusersinvoice(voicemember.channel);
        const voiceChannelID =voicemember.channelId;

        if (voiceChannelID){
            reaction.message.channel.send("<#" + voiceChannelID + ">");
        }
        reaction.message.channel.send(`${user} à ajouter la reaction : "${reaction.emoji.name}" ce qui fait un total de : ${reaction.count}`);    
    }
});


function getnbusersinvoice(voiceChannel){
    console.log('getnbusersinvoice :');
    console.log(voiceChannel.members.size);
}