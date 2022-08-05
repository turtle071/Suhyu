const Command = require('../../structures/Command');
const { EmbedBuilder } = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'silencia um usuário do servidor.',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'Usuário que deseja silenciar',
                    required: true,
                },
                {
                    name: 'time',
                    type: ApplicationCommandOptionType.Number,
                    description: 'Tempo em que o usuário ficará silenciado.',
                    required: true,
                },
                {
                    name: 'reason',
                    type: ApplicationCommandOptionType.String,
                    description: 'Motivo do silence'
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        if (!interaction.guild) return; //comandos só retornam em servidores
        if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
            interaction.editReply(`:x: | Você não pode utilizar este comando.`)
            return;
        }

        const time = interaction.options.getNumber('time')
        const reason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const member = interaction.options.getMember('user')

        if (interaction.user.id === member.id) {
            interaction.editReply(`:x: | Não é possivel se silenciar!`);
            return;
        }

        if (member.roles) {
            if (!member.moderatable || member.roles.highest.position >= interaction.guild.me.roles.highest.position) {
                interaction.editReply(`:x: | Eu não posso mutar este usuário.`);
                return;
            }
            if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                interaction.editReply(`:x: | Não foi possivel silenciar este usuário, pois o cargo dele é maior que o meu.`)
                return;
            }
        }

        const timeOut = (time * 60 * 1000)
        member.timeout(timeOut, reason)

        const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`🔇 ${member.user.tag}  | \`Duração: ${time} minuto(s)\`\n ***Motivo: ${reason}***`)
            .setFooter({
                text: `Comando solicitado por: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            })

        interaction.editReply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5 * 60000)
        })
    }
}