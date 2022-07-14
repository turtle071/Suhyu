const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            description: 'veja o avatar de um usuário',
            options: [{
            name: 'user',
            description: 'Usuario que deseja ver o avatar',
            type: 'USER',
            }]
        })
    };

    run = async (interaction) => {
    await interaction.deferReply({ ephemeral: false, fetchReply: true })
    const user = interaction.options.getUser('user') ?? interaction.user
    const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 2048 })

    const embed = new MessageEmbed()
    .setTitle(user.username)
    .setColor('GREEN')
    .setImage(avatarUrl)

    interaction.editReply({ embeds: [embed] })
    }
};