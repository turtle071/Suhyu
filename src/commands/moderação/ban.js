const {MessageEmbed} = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'bane um membro do servidor.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'Usuário que vai ser banido',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Motivo do banimento',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ephemeral: false, fetchReply: true})
        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            interaction.editReply(`:x: | Você não pode utilizar este comando.`)
            return;
        }

        const banReason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        if (interaction.user.id === user.id) {
            interaction.editReply(`:x: | Não é possível se banir do servidor.`)
            return;
        }
        if (interaction.member.roles.highest.position <= member.roles.highest.position) {
            interaction.editReply(`:x: | Não foi possível banir este usuário, pois o cargo dele é maior, ou igual, ao o seu.`)
            return;
        }

        if (!member) {
            interaction.editReply(`:x: | O membro selecionado não está no servidor!`)
            return;
        }

        await interaction.guild.members.ban(member, {deleteMessagesDays: 7, reason: banReason})

        const embed = new MessageEmbed()
            .setDescription(`💥${user.tag} foi banido!\n ***Motivo: ${banReason}***`)
            .setFooter({text: `Comando usado por ${interaction.user.tag}`})
            .setColor('GREEN')

        interaction.editReply({embeds: [embed]}).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5 * 60000)
        })
    }
}
