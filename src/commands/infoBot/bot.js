const Command = require('../../structures/Command');
const { EmbedBuilder } = require('discord.js');
const config = require('../../../package.json');
const { ApplicationCommandType } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'bot',
            description: 'Mostra as informações do bot.',
            type: ApplicationCommandType.ChatInput
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ephemeral: false, fetchReply: true})
        const avatar = this.client.user.displayAvatarURL({dynamic: false, size: 256})
        const embed = new EmbedBuilder()
            .setTitle(`Informações da Suhyu`)
            .setColor('Random')
            .setThumbnail(avatar)
            .setTimestamp()
            .setDescription(`${this.client.user.username} está presente em ${this.client.guilds.cache.size} servidores.\n\nEntre no meu [servidor](https://discord.gg/jSgVkj3U9b)\n\nMe adicione [clicando aqui](https://suhyu.turtles.studio)\n\n**Ping:** ${this.client.ws.ping}ms\n\n**Versão:** ${config.version}\n\n**Feito por:** ${config.author}`)

        interaction.editReply({embeds: [embed]})
    }
}