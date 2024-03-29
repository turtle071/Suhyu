const ChannelType = require('discord.js');

module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (!channel.type === ChannelType.GuildText) {
        return interaction.reply({
            content: ':x: Este canal não é um canal de texto.', ephemeral: true
        })
    }
    if (interaction.guild.db.welcome) interaction.guild.db.welcome.channel = channel.id
    else interaction.guild.db.welcome = { channel: channel.id}

    interaction.guild.db.save()

    interaction.reply({ content: 'Canal de boas vindas setado.', ephemeral: true })
}