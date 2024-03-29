const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Command');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'expulsa um usuário do servidor',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'usuário que deseja expulsar do servidor',
                    required: true
                },
                {
                    name: 'reason',
                    type: ApplicationCommandOptionType.String,
                    description: 'razão da expulsão'
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        if(!interaction.member.permissions.has('KICK_MEMBERS')) {
            interaction.editReply(`:x: | Você não pode utilizar este comando.`)
            return;
        }

        const kickReason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        if(interaction.user.id === user.id) {
            interaction.editReply(`:x: | Não é possivel se expulsar do servidor.`)
            return;
        }
        if(interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.editReply(`:x: | Não foi possivel expulsar este usuário, pois o cargo dele é maior que o seu.`)
            return;
        }

        if(!member) {
            interaction.editReply(`:x: | O membro selecionado não está no servidor!`)
            return;
        }

        await interaction.guild.members.kick(member, { reason: kickReason })

        const embed = new EmbedBuilder()
           .setDescription(`🧨${user.tag} foi expulso!\n ***Motivo: ${kickReason}***`)
            .setFooter({
                text: `Comando solicitado por: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            })
           .setColor('Random')
           
           interaction.editReply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 5 * 60000)
        })
    }
}