const Command = require('../../structures/Command');
const { EmbedBuilder } = require('discord.js');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            description: 'Remove o ban do usuário selecionado',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'user',
                    type: ApplicationCommandOptionType.User,
                    description: 'Usuário que deseja retirar o banimento',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        if(!interaction.member.permissions.has('BAN_MEMBERS')){ 
           interaction.editReply(`:x: | Você não pode usar este comando.`)
           return;
        }
        const user = interaction.options.getString('user')
        const b = await interaction.guild.bans.fetch()
        const member = b.find((x) => x.user.id === user || x.user.tag === user || x.user.username === user)
        
        if(!member){ 
           interaction.editReply(`Este usuário não esta banido!`)
           return;
        }
        await interaction.guild.bans.remove(member.user.id)
        const embed = new EmbedBuilder()
        .setDescription(`${member.user.tag} desbanido(a) com sucesso!! ✅`)
        .setColor('Random')

        interaction.editReply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 5 * 60000)
        })
    }
}