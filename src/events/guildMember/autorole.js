const Event = require('../../structures/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name:'guildMemberAdd'
        })
    }

    run = async(member) => {
        const cargo = member.guild.roles.cache.get('906557014212235285')
        member.roles.add(cargo);
        const avatarUrl = member.displayAvatarURL({ dynamic: true, size: 2048 })

        const welcomeEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setImage(avatarUrl)
        .setDescription(`✨***Bem-vindo***✨ ${member} ***ao servidor*** ${member.guild.name} 🐢`)

        member.guild.channels.cache.get('906568789347418152').send({content: `${member}`, embeds: [welcomeEmbed]})

    }
}