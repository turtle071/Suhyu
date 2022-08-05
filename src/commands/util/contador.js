const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
const Command = require('../../structures/Command');
const { ApplicationCommandType, ButtonStyle } = require('discord.js');

const actionRow = new ActionRowBuilder()
    .addComponents(
        [
            new ButtonBuilder()
               .setStyle(ButtonStyle.DANGER)
               .setLabel('-1')
               .setCustomId('REMOVER'),
            new ButtonBuilder()
                .setStyle(ButtonStyle.SUCESS)
                .setLabel('+1')
                .setCustomId('ADICIONAR'),
            new ButtonBuilder()
                .setStyle(ButtonStyle.PRIMARY)
                .setLabel('ZERAR')
                .setCustomId('ZERAR')          
        ]
    )

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'contador',
            description: 'Inicia um contador no canal',
            type: ApplicationCommandType.ChatInput
        })
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true })
        let contagem = 0;

        const reply = await interaction.editReply({
            content: `Contagem: \`${contagem} \``,
            components: [actionRow],
            fetchReply: true
        })

        const filter = (b) => b.user.id === interaction.user.id
        const collector = reply.createMessageComponentCollector({ filter, time: (10 * 60000) })

        collector.on('collect', (i) =>{ 
            switch (i.customId) {
                case 'REMOVER':
                    contagem--
                    break;
                case 'ADICIONAR':
                    contagem++
                    break;
                case 'ZERAR':
                    contagem = 0
                    break;
            }
            i.update({
                content: `Contagem: \`${contagem} \``
            })

        })
        collector.on('end', (collector, reason)=> {
            if (reason === 'time') interaction.editReply({
                content : `contador finalizado em: \`${contagem}\``,
                components: []
            })
        })   
    }
}
