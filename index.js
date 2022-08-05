require('dotenv').config();

const Client = require('./src/structures/Client');
const { GatewayIntentsBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentsBits.Guilds,
        GatewayIntentsBits.GuildMembers,
        GatewayIntentsBits.GuildMessageReactions,
        GatewayIntentsBits.GuildMessages,
        GatewayIntentsBits.GuildPresences,
        GatewayIntentsBits.GuildInvites,
        GatewayIntentsBits.GuildVoiceStates,
    ]
});

client.login(process.env.BOT_TOKEN);