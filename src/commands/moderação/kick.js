const { Interaction } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            description: 'expulsa um usuário do servidor',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'usuário que deseja expulsar do servidor',
                    required: true
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'razão da expulsão'
                }
            ]
        })
    }

    run = async (interaction) => {
        if(!interaction.member.permissions.has('KICK_MEMBERS')) 
           return interaction.reply({ 
            content: ':x: | Você não pode utilizar este comando.', ephemeral: true
        })

        const kickReason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id)

        if(interaction.user.id === user.id) 
           return interaction.reply({
            content: ':x: | Não é possivel se expulsar do servidor.', ephemeral: true
        })
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
           return interaction.reply({ 
            content: ':x: | Não foi possivel expulsar este usuário, pois o cargo dele é maior que o seu.', ephemeral: true
        })

        if(!member) 
           return interaction.reply({ 
            content: ':x: | O membro selecionado não está no servidor!', ephemeral: true
        })
        
        await interaction.guild.members.kick(member, { reason: kickReason })

        const embed = new MessageEmbed ()
           .setDescription(`${kickReason}`)
           .setFooter({ text: `✅ Usuário punido com sucesso por ${interaction.user.tag}!!`})
           .setColor('GREEN')
           
           interaction.reply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 60000)
        })
    }
}