const Event = require('../../structures/Event');
const { ApplicationCommandType } = require('discord.js');

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'messageCreate',
            type: ApplicationCommandType.ChatInput
        });
    }

    run = async (message) => {
        if (message.content === `<@${this.client.user.id}>` || message.content === `<@!${this.client.user.id}>`) {
            message.reply(`Olá, ${message.author}, eu sou a ${this.client.user.username}, meu prefixo é \`/ \`. Se precisar de ajuda digite \`/help\`, e veja minha lista de comandos!`)
        }
    }
}