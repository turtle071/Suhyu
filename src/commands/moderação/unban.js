const { Interaction } = require('discord.js');
const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'unban',
            description: 'Remove o ban do usuário selecionado',
            type: 'CHAT_INPUT',
            options: [
                {
                    name: 'user',
                    type: 'STRING',
                    description: 'Usuário que deseja retirar o banimento',
                    required: true
                }
            ]
        })
    }

    run = async (interaction) => {
        if(!interaction.member.permissions.has('BAN_MEMBERS')) 
        return interaction.reply({ 
            content: ':x: | Você não pode usar este comando.', ephemeral: true
        })
        const user = interaction.options.getString('user')
        const b = await interaction.guild.bans.fetch()
        const member = b.find((x) => x.user.id === user || x.user.tag === user || x.user.username === user)
        
        if(!member) 
        return interaction.reply({ 
            content: 'Este usuário não esta banido!', ephemeral: true
        })
        await interaction.guild.bans.remove(member.user.id)
        const embed = new MessageEmbed()
        .setDescription(`${member.user.tag} desbanido(a) com sucesso!! ✅`)
        .setColor('GREEN')

        interaction.reply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply()
            }, 60000)
        })
    }
}