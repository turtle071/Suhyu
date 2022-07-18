const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'configurar',
            description: 'Configure o bot pela DB.',
            requireDatabase: true,
            options: [
                {
                    type: 'SUB_COMMAND_GROUP',
                    name: 'welcome',
                    description: 'Configurações do bem-vindo.',
                    options: [
                        {
                            type: 'SUB_COMMAND',
                            name: 'canal_entrada',
                            description: 'configure o canal de boas vindas.',
                            options: [
                                {
                                    type: 'CHANNEL',
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem de boas vindas será enviada.',
                                    required: true,
                                }
                            ]
                        },
                    ]
                }
            ]
        });
    }

    run = (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_GUILD')) {
            return interaction.reply({
                content: ':x: Você não tem permissão para executar este comando.', ephemeral: true
            })
        }

        const subCommandGroup = interaction.options.getSubcommandGroup()
        const subCommand = interaction.options.getSubcommand()

        require(`../../subCommands/config/${subCommandGroup}/${subCommand}`)(this.client, interaction)
    }
}