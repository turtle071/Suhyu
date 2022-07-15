const Command = require('../../structures/Command');
const {MessageEmbed} = require('discord.js');
const config = require('../../../package.json');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            description: 'Mostra as informações sobre o tortugo.',
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ephemeral: false, fetchReply: true})
        const avatar = this.client.user.displayAvatarURL({dynamic: false, size: 256})
        const embed = new MessageEmbed()
            .setTitle(`Informações do Tortugo`)
            .setColor('GREEN')
            .setThumbnail(avatar)
            .setDescription(`${this.client.user.username} está presente em ${this.client.guilds.cache.size} servidores.\n\n***Servidor do tortugo*** [https://discord.gg/jSgVkj3U9b]\n\n***Me adicione clicando aqui:*** [https://bit.ly/3PdQNBM]\n\n**Ping:** ${this.client.ws.ping}ms\n\n**Versão:** ${config.version}\n\n**Desenvolvido por:** ${config.author}`)

        interaction.editReply({embeds: [embed]})
    }
}