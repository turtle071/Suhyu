module.exports = (client, interaction) => {
    const channel = interaction.options.getChannel('canal')
    const mensagem = interaction.options.getString('mensagem')

    if (channel.type !== 'GUILD_TEXT')
        return interaction.reply({
            content: ':x: Este canal não é um canal de texto.', ephemeral: true
        })

    if (interaction.guild.db.welcome) interaction.guild.db.welcome.channel = channel.id
    else interaction.guild.db.welcome = { channel: channel.id}

    if (interaction.guild.db.welcome) interaction.guild.db.welcome.message = mensagem.id
    else interaction.guild.db.welcome = { message: mensagem.id}

    interaction.guild.db.save()

    interaction.reply({ content: 'Canal e mensagem de boas vindas setado.', ephemeral: true })
}