const Command = require('../../structures/Command');
const { EmbedBuilder } = require('discord.js')
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'clear',
            description: 'Apaga as mensagens do canal',
            type: ApplicationCommandType.ChatInput,
            options: [
                {
                    name: 'numero',
                    type: ApplicationCommandOptionType.Integer,
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
            embeds: [new EmbedBuilder ()
            .setDescription(`> digite uma quantidade entre \`1 - 99\`.`)
            .setColor('Random')], ephemeral: true
          })
        }

        const message = await interaction.channel.messages.fetch({ limit: numero });

        await interaction.channel.bulkDelete(message, true)

        const embed = new EmbedBuilder()
           .setDescription('Apagando as mensagens... 🌟')
           .setTimestamp()
            .setFooter({
                text: `Comando solicitado por: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL()
            })
           .setThumbnail(interaction.user.displayAvatarURL({dynamic: true, size: 1024}))
           .setColor('Random')

           interaction.reply({ embeds: [embed] }).then(()=> {
            setTimeout(() => {
              interaction.deleteReply()
           }, 5000)
        })
      }
    }