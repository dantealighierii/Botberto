require("dotenv").config();
const token = process.env.TOKEN;
const { Client, Intents } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { prefix } = require("./config.json");
const jimp = require("jimp");

client.on("ready", () => {
  console.log(
    `The bot has been activated, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels, in ${client.guilds.cache.size} server`
  );
  client.user.setActivity(`I\`m in ${client.guilds.cache.size} server`);
});

client.on("guildCreate", (guild) => {
  console.log(
    `the bot has been apear: ${guild.name} (id: ${guild.id}). Population: ${guild.memberCount} members`
  );
  client.user.setActivity(`I\`m serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", (guild) => {
  console.log(`The bot has been removed of: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`I\`m serving ${client.guilds.cache.size} servers`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "DM") return;
  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(
      `Pong! Your ping is ${m.createdTimestamp - message.createdTimestamp}ms.`
    );
  }
});

client.on("guildMemberAdd", async (member) => {
    let guild = client.guilds.cache.get("711349793418641498")
    let channel = client.channels.cache.get("711349793418641501");
    let font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
    let mask = await jimp.read("welcome_images/mascara.png");
    let background = await jimp.read("welcome_images/fundo.png");
    let theAvatar = "welcome_images/teste.png";

    if (guild != member.guild) {
        return console.log("Not a server member");
    } else {
        jimp.read(member.user.displayAvatarURL).then((avatar) => {
            avatar.resize(130, 130);
            mask.resize(130, 130);
            avatar.mask(mask);

            background.print(font, 170, 175, member.user.username);
            background.composite(avatar, 40, 90).write(theAvatar);
            channel.send(``, { files: [theAvatar] });

            console.log("Imagem enviada para o Discord");
        })
        .catch((err) => {
            console.log("error avatar");
        });
    };
});

client.login(token);
