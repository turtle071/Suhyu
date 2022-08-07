const Event = require('../../structures/Event');
const { ApplicationCommandType } = require('discord.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'guildMemberAdd',
            type: ApplicationCommandType.ChatInput
        });
    }

    run = async(member) => {
        const guildDB = await this.client.db.guilds.findById(member.guild.id);

        if (member === member.bot) {
            if (guildDB?.autorole) {
                const cargo = member.guild.roles.cache.get(guildDB.autorole.role);
                if (cargo !== undefined) {
                    member.roles.add(cargo)
                }
            }
        }
    }
}