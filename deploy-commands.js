const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientID, guildID } = require('./config.json');
const token = process.env.token;

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Ping? Pong, querido'),
    new SlashCommandBuilder().setName('serverinfo').setDescription('Replies with the server information'),
    new SlashCommandBuilder().setName('userinfo').setDescription('Replies with the user information'),
]
    .map(commands => commands.toJSON());
const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
    .then(() => console.log('It was successfully!'))
    .catch(console.error);
