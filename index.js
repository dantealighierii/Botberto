require("dotenv").config();
const token = process.env.TOKEN;
const { Client, Intents, MessageEmbed, Message } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
  MessageEmbed
});
const { prefix } = require("./config.json");

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

client.on("guildMemberAdd", async (member) => {
  let guild = client.guilds.cache.get("711349793418641498");
  let channel = client.channels.cache.get("711349793418641501");
  let emoji = member.guild.emojis.cache.find((emoji) => emoji.name === "Hmm");

  console.log("sim");

  if (guild != member.guild) {
    return console.log("Not a server member");
  } else {
    console.log("entrou");

   let embed = new MessageEmbed()
      .setColor("#ffcbdb")
      .setAuthor(member.user.tag)
      .setTitle(`${emoji} Welcome ${emoji}`)
      .setImage(
        "https://cdn.discordapp.com/attachments/722471025073455124/924440358237130793/download20211206201540.png"
      )
      .setDescription(
        `${member.user}, welcome to ${guild.name}! Today we have ${member.guild.memberCount} members.`
      )
	  //
      .setThumbnail(
        member.user.displayAvatarURL({
          dynamic: true,
          format: "png",
          size: 1024,
        })
      )
      .setFooter("User ID: " + member.user.id)
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  }
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

client.login(token);
