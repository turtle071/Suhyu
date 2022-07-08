const { Interaction } = require('discord.js');
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

    run = (interaction) => {
        if (!interaction.member.roles.cache.has('923011031821864991')) return interaction.reply({ content : ':x: | Você não tem permissão para usar este comando.', ephemeral: true})
        const canal = interaction.options.getChannel('canal') ?? interaction.channel
        if (!['GUILD_TEXT', 'GUILD_ANNOUCEMENTS'].includes(canal.type)) return interaction.reply({ content : ':x: | Canal invalido.', ephemeral: true})

        const texto = interaction.options.getString('mensagem')

        const embed = new MessageEmbed()
           .setTitle('Mensagem enviada!')
           .setDescription(texto)
           .setColor('GREEN')
           .setTimestamp()
           .setFooter({ text: `Mensagem enviada por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })

        canal.send({ embeds: [embed] })
           .then(() => interaction.reply({ content : `Mensagem enviada com sucesso \`${canal.name}\`!`, ephemeral: true}))
           .catch(() => interaction.reply({ content : `ERROR | Erro ao tentar enviar a mensagem no canal.`, ephemeral: true}))
        }
    };
