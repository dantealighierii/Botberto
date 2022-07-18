const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user-info')
		.setDescription('Display information about yourself.'),
	async execute(interaction) {
		return interaction.reply(`Your name: ${interaction.member.displayName}\nYour ID: ${interaction.user.id}`)
	},
};