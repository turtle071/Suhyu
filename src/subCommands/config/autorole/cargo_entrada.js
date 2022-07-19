module.exports = (client, interaction) => {
    const cargo = interaction.options.getRole('cargo')

    if (!cargo)
        return interaction.reply({
            content: ':x: Selecione um cargo válido', ephemeral: true
        })

    if (interaction.guild.db.autorole) interaction.guild.db.autorole.role = cargo.id
    else interaction.guild.db.autorole = { role: cargo.id}

    interaction.guild.db.save()

    interaction.reply({ content: 'Cargo de entrada setado.', ephemeral: true })
}