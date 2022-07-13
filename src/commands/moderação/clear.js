const { Interaction } = require('discord.js');
const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Apaga as mensagens do canal',
            options: [
                {
                    name: 'numero',
                    type: 'INTEGER',
                    description: 'número de mensagens a ser apagado',
                    required: true
                }
            ]
        }
      )}

      run = async (interaction) => {
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: ':x: | Você não tem permissão para usar este comando!', ephemeral: true})

        const numero = interaction.options.getInteger('numero')

        if(parseInt(numero) > 99 || parseInt(numero) <= 0) {
          return interaction.reply({
            embeds: [new MessageEmbed ()
            .setDescription(`> digite uma quantidade entre \`1 - 99\`.`)
            .setColor('GREEN')], ephemeral: true
          })
        }

        const message = await interaction.channel.messages.fetch({ limit: numero });

        await interaction.channel.bulkDelete(message, true)

        const embed = new MessageEmbed ()
           .setDescription('Apagando as mensagens... 🌟')
           .setTimestamp()
           .setFooter({ text: `Autor do comando ${interaction.user.tag}`})
           .setThumbnail(interaction.user.displayAvatarURL({dynamic: true, size: 1024}))
           .setColor('GREEN')

           interaction.reply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 5000)
        })
      }
    }