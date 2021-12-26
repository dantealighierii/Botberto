require('dotenv').config();
const token = process.env.TOKEN;
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');


client.on("ready", () => {
    console.log(`The bot has been activated, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels, in ${client.guilds.cache.size} server`);
    client.user.setActivity(`I\`m in ${client.guilds.cache.size} server`);
});

client.on("guildCreate", guild => {
    console.log(`the bot has been apear: ${guild.name} (id: ${guild.id}). Population: ${guild.memberCount} members`);
    client.user.setActivity(`I\`m serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
    console.log(`The bot has been removed of: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`I\`m serving ${client.guilds.cache.size} servers`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Your ping is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    
    }
});

client.login(token);