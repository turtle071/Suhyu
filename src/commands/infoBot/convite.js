const Command = require('../../structures/Command');
const { ApplicationCommandType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'convite',
            description: 'Mostra o convite do bot.',
            type: ApplicationCommandType.ChatInput
        });
    }
    run = async (interaction) => {
        await interaction.deferReply({ephemeral: false, fetchReply: true})
        interaction.editReply({content: `🚙 | Olá ${interaction.user.toString()},  aqui está meu [convite](https://bit.ly/3om8a7j)`})
    }
}

