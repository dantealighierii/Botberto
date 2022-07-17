// Necessary because of discord.js classes
require('dotenv').config();
require('./deploy-commands.js');
const token = process.env.token;
// const { prefix } = require('./config.json');
const { Client, Intents } = require('discord.js');

// console.log(process.env.token);

// New class instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('client ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('pong!');
    } else if (commandName === 'serverinfo') {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    } else if (commandName === 'userinfo') {
        await interaction.reply(`Your name: ${interaction.member.displayName}\nYour tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
});

client.login(token);
