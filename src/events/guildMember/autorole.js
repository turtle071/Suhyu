const Event = require('../../structures/Event');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name:'guildMemberAdd'
        })
    }

    run = async(member) => {
        const cargo = member.guild.roles.cache.get('906557014212235285')
        member.roles.add(cargo);
    }
}