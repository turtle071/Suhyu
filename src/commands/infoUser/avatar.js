const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Command');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'veja o avatar de um membro do servidor.',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'user',
                    description: 'escolha o membro que deseja ver o avatar, ou veja o seu mesmo.',
                    type: ApplicationCommandOptionType.User,
                }
            ]
        })
    };

    run = async (interaction) => {
        await interaction.deferReply({ephemeral: false, fetchReply: true})
        if (!interaction.guild) return; //commands only return on servers
        const user = interaction.options.getUser('user') ?? interaction.user
        const avatarUrl = user.displayAvatarURL({dynamic: true, size: 2048})

        const embed = new EmbedBuilder()
            .setTitle(user.username)
            .setColor('Random')
            .setImage(avatarUrl)

        interaction.editReply({embeds: [embed]})
    }
};