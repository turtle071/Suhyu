const Event = require('../../structures/Event');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    };

    run = () => {
        console.log(`${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores!`)
        this.client.user.setPresence({ activities: [{ name: '𝑻𝒐𝒓𝒕𝒖𝒈𝒐 𝑺𝒆𝒓𝒗𝒆𝒓', type: 'PLAYING' }] });
        this.client.user.setStatus('idle');
        this.client.registryCommands()
    };
};