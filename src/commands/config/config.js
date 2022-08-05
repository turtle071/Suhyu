const Command = require('../../structures/Command');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'config',
            description: 'Configure o bot pela DB.',
            type: ApplicationCommandType.ChatInput,
            requireDatabase: true,
            options: [
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'welcome',
                    description: 'Configurações do bem-vindo.',
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'canal_entrada',
                            description: 'configure o canal de boas vindas.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Channel,
                                    name: 'canal',
                                    description: 'Canal de texto onde a mensagem de boas vindas será enviada.',
                                    required: true,
                                },
                            ]
                        }
                    ],
                },
                {
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    name: 'autorole',
                    description: 'Configurações do autorole.',
                    options: [
                        {
                            type: ApplicationCommandOptionType.Subcommand,
                            name: 'cargo_entrada',
                            description: 'configure o cargo de entrada.',
                            options: [
                                {
                                    type: ApplicationCommandOptionType.Role,
                                    name: 'cargo',
                                    description: 'cargo que o membro receberá ao entrar no servidor.',
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