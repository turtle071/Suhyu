const Event = require('../../structures/Event');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name:'guildMemberAdd',
        })
    }

    run = async(member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id);

        if (guildDB?.autorole) {
            const cargo = member.guild.roles.cache.get(guildDB.autorole.role);
            if (cargo !== undefined) {
                member.roles.add(cargo)
              }
            }
        }
    }