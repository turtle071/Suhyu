const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra o ping do bot.'
        })
    };

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        interaction.editReply(`O ping do bot é \`${this.client.ws.ping}\`ms.`)
    }
};