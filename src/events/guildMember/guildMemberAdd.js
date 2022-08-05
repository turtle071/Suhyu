const Event = require('../../structures/Event');
const { EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd',
            type: ApplicationCommandType.ChatInput
        });
    }

    run = async (member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id);

        if (guildDB?.welcome) {
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel);

            const avatarUrl = member.displayAvatarURL({ dynamic: true, size: 1024 })

            const welcomeEmbed = new EmbedBuilder()
                .setTitle('Bem-vindo ao servidor!')
                .setColor('Random')
                .setImage(avatarUrl)
                .setDescription(`${member.user.username} entrou no servidor, seja bem vindo ao ${member.guild}!`)

              welcomeChannel.send({content: `${member.toString()}`, embeds: [welcomeEmbed]});
        }
    }
}