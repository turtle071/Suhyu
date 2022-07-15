const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'servers',
            description: 'Mostra em quantos servers o bot está adicionado.'
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        interaction.editReply(`O ***Tortugo*** está presente em ${this.client.guilds.cache.size} servidores!`)
    }
}