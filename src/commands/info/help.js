const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name:'help',
            description: 'Utilize para saber os meus comandos.',
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        const embed = new MessageEmbed()
        .setDescription(`***Olá, sou o Tortugo Bot, meus comandos estão abaixo***\n\n \`/ping - Mostra o ping do bot.\`\n \`/say - Faz o bot mandar uma mensagem específica.\`\n \`/ban - Bane o membro selecionado.\`\n \`/unban - Retira o banimento do membro selecionado.\`\n \`/mute - Silencia temporariamente o membro selecionado.\`\n \`/kick - Expulsa do servidor o membro selecionado.\`\n \`/avatar - Mostra o avatar do membro selecionado.\`\n \`/contador - Cria um contador no canal\`\n \`/clear - Limpa uma quantidade de mensagens entre 1 - 99.\`\n \`/help - Mostra os comandos do bot.\``)
        .setFooter({text: `Comando solicitado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
        .setColor('GREEN')

        interaction.editReply({ embeds: [embed]} )
    }
}