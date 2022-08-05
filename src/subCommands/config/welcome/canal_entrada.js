module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')

    if (!['GUILD_TEXT'].includes(channel.type))
        return interaction.reply({
            content: ':x: Este canal não é um canal de texto.', ephemeral: true
        })

    if (interaction.guild.db.welcome) interaction.guild.db.welcome.channel = channel.id
    else interaction.guild.db.welcome = { channel: channel.id}

    interaction.guild.db.save()

    interaction.reply({ content: 'Canal e mensagem de boas vindas setado.', ephemeral: true })
}