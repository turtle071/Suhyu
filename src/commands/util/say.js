const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            description: 'Faz com que o bot diga alguma mensagem.',
            options: [
                {
                    name: 'mensagem',
                    type: 'STRING',
                    description: 'A mensagem que será enviada no canal',
                    required: true
                },
                {
                    name: 'canal',
                    type: 'CHANNEL',
                    description: 'Canal onde a mensagem será enviada',
                }
            ]
        })
    };

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            interaction.editReply(`:x: | Você não pode utilizar este comando.`)
            return;
        }
        const canal = interaction.options.getChannel('canal') ?? interaction.channel
        if (!['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(canal.type)) {
             interaction.editReply(`:x: | Canal inválido.`)
             return;
        }

        const texto = interaction.options.getString('mensagem')

        const embed = new MessageEmbed()
           .setTitle('Mensagem enviada!')
           .setDescription(texto)
           .setColor('#006400')
           .setTimestamp()
           .setFooter({ text: `Mensagem enviada por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })

        canal.send({ embeds: [embed] })
           .then(() => interaction.editReply({ content : `Mensagem enviada com sucesso \`${canal.name}\`!`}))
           .catch(() => interaction.editReply({ content : `:x: | Erro ao tentar enviar a mensagem no canal.`}))
        }
    };
