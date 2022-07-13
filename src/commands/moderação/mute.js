const { Interaction } = require('discord.js');
const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'mute',
            description: 'silencia um usuário do servidor.',
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'Usuário que deseja silenciar',
                    required: true,
                },
                {
                    name: 'time',
                    type: 'STRING',
                    description: 'Tempo em que o usuário ficará silenciado.',
                    required: true,
                },
                {
                    name: 'reason',
                    type: 'STRING',
                    description: 'Motivo do silence'
                }
            ]
        })
    }

    run = async(interaction) => {
        if(!interaction.member.permissions.has('BAN_MEMBERS'))
        return interaction.reply({
            content: ':x: | Você não pode utilizar este comando.'
    })

        const user = interaction.options.getUser('user')
        const time = interaction.options.getString('time')
        const reason = interaction.options.getString('reason') ?? 'Motivo não informado.'
        const member = interaction.guild.members.cache.get(user.id)

        const timeOut = (time * 60 * 1000)
        member.timeout(timeOut, reason)
        
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`${reason}`)
        .setFooter({text: ` Duração da punição: ${time}\n ✅ Usuário punido com sucesso por ${interaction.user.tag}!!`})

        interaction.reply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 60000)
        })
    }
}
