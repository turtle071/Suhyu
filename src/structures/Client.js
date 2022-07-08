const { Client } = require('discord.js');

const { readdirSync, read } = require('fs');

const { join } = require('path');

module.exports = class extends Client {
    constructor (options) {
        super(options)

        this.commands = []
        this.loadCommands()
        this.loadEvents()
    };

    registryCommands() {
        //this.guilds.cache.get('906556615925329960').commands.set(this.commands) //If you want to register local commands
        this.application.commands.set(this.commands) //actived in global servers
    };

    loadCommands(path = 'src/commands') {
        const categories = readdirSync(path);

        for (const category of categories) {
            const commands = readdirSync(`${path}/${category}`)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
                const cmd = new (commandClass)(this)

                this.commands.push(cmd)
            };
        
        };

    };

    loadEvents(path = 'src/events') { 
            const categories = readdirSync(path);
    
            for (const category of categories) {
                const events = readdirSync(`${path}/${category}`)
    
                for (const event of events) {
                    const eventClass = require(join(process.cwd(), `${path}/${category}/${event }`))
                    const evt = new (eventClass)(this)

                    this.on(evt.name, evt.run)

            };
         };
    };
};