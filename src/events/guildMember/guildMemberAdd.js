const Event = require('../../structures/Event');
const { MessageEmbed } = require("discord.js");

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd',
        });
    }

    run = async (member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id);

        if (guildDB?.welcome) {
            const welcomeChannel = member.guild.channels.cache.get(guildDB.welcome.channel);
            const welcomeMessage = member.guild.message.cache.get(guildDB.welcome.message);

            const avatarUrl = member.displayAvatarURL({ dynamic: true, size: 1024 })

            const welcomeEmbed = new MessageEmbed()
                .setTitle('Bem-vindo ao servidor!')
                .setColor('RANDOM')
                .setImage(avatarUrl)
                .setDescription(`${welcomeMessage}`)

              welcomeChannel.send({content: `${member.toString()}`, embeds: [welcomeEmbed]});
        }
    }
}