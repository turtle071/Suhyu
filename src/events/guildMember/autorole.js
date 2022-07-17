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
        const avatarUrl = member.displayAvatarURL({ dynamic: true, size: 1024 })

        const welcomeEmbed = new MessageEmbed()
            .setTitle('Bem-vindo ao servidor!')
            .setColor('GREEN')
            .setImage(avatarUrl)
            .setDescription(`${member} entrou no servidor, ${member.guild.name}, espero que se divirta!`)

        member.guild.channels.cache.get('906568789347418152').send({content: `${member}`, embeds: [welcomeEmbed]})

    }
}