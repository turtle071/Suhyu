module.exports = (client, interaction) => {
    const cargo1 = interaction.options.getRole('cargo')

    if (!cargo1)
        return interaction.reply({
            content: ':x: Selecione um cargo válido', ephemeral: true
        })

    if (interaction.guild.db.autorole) interaction.guild.db.autorole.role = cargo1.id
    else interaction.guild.db.autorole = { role: cargo1.id}

    interaction.guild.db.save()

    interaction.reply({ content: 'Cargo de entrada do bot setado.', ephemeral: true })
}