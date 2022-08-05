const Command = require('../../structures/Command');
const { EmbedBuilder } = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client,{
            name: "unmute",
            description: "Des-silencia um usuário que esteja mutado.",
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'O usuário que será des-silenciar.',
                    required: true
                },
                {
                    name: 'reason',
                    type: ApplicationCommandOptionType.String,
                    description: 'A razão do usuário ser des-silenciado.',
                    required: false
                }
            ]
        });
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true });
        if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
            interaction.editReply('❌ | Você não pode des-silenciar usuários.');
            return;
        }
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason') ?? 'Nenhuma razão especificada.';

        if (!member) {
            interaction.editReply('❌ | Este usuário não está no servidor.');
            return;
        }

        if (interaction.user.id === member.id) {
            interaction.editReply(':x: | Não é possível usar este comando em si mesmo!');
            return;
        }

        if (member.roles) {
            if (!member.moderatable || member.roles.highest.position >= interaction.guild.me.roles.highest.position) {
                interaction.editReply(':x: | Eu não posso des-silenciar este usuário.');
                return;
            }
            if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                interaction.editReply(':x: | Não foi possível des-silenciar este usuário, pois o cargo dele é maior que o meu.')
                return;
            }
        }

        if (!member.isCommunicationDisabled()) {
            interaction.editReply(':x: | Este usuário não está silenciado.');
            return;
        }

        const unMute = 0;
        member.timeout(unMute)

        const embed = new EmbedBuilder()
            .setTitle('Usuário des-silenciado!')
            .setDescription(`:white_check_mark: | ${user.tag} | ${reason}.`)
            .setColor('Random')

        interaction.editReply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply();
            }, 5 * 60000);
        })
    }
}