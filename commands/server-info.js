const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Display information about this serve.'),
    async execute(interaction) {
        return interaction.reply(`Server name: ${interaction.guild.name}\nTotal memebers: ${interaction.guild.memberCount}`)
    },
};