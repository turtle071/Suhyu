require('dotenv').config();

const Client = require('./src/structures/Client');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'        
    ]
});

//Mention help // @tortugo - reply this message
client.on('messageCreate', async (message) => {
    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
        message.reply(`Olá, ${message.author}, eu sou o ***Tortugo***, meu prefixo é \`/ \`. Se precisar de ajuda digite \`/help\`, e veja minha lista de comandos!`)
    }
})

client.login(process.env.BOT_TOKEN);