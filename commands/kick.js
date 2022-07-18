const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Select a member to punish with a kick.')
        .addUserOption(option => option.setName('target').setDescription('The member to kick')),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        interaction.guild.members.kick(user)
            .then(kickInfo => console.log(`Kicked ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}`))
            .catch(console.error);
        return interaction.reply({
            content: `You kicked: ${user.username}`, ephemeral: false
        });
    },
};