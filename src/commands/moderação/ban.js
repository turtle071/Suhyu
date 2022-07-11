const { Interaction } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: 'bane o usuario.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'Usuario que vai ser banido',
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
        if(!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: ':x: | Você não pode usar este comando.', ephemeral: true})

        const banReason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        if(!member) return interaction.reply({ content: ':x: | O membro não está no servidor!', ephemeral: true})
        
        await interaction.guild.members.ban(member, { deleteMessagesDays: 7, reason: banReason })

        const embed = new MessageEmbed ()
           .setDescription(`${banReason}`)
           .setFooter({ text: `Usuário banido por ${interaction.user.tag}`})
           .setColor('GREEN')
           
           interaction.reply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 60000)
        })
        /*interaction.reply(`${user.tag} banido com sucesso!`)
        .catch(() => {
            interaction.reply(':x: | Não foi possivel banir este membro.')
        }) */
    }
}
