// Necessary because of discord.js classes
require('dotenv').config();
require('./deploy-commands.js');
const fs = require('node:fs');
const path = require('node:path');
const token = process.env.token;
const { Client, Intents, Collection } = require('discord.js');

// console.log(process.env.token);

// New class instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (!command.data) continue;
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('client ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error', ephemeral: true });
    }
});

client.login(token);
