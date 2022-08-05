const Command = require('../../structures/Command');
const questions = require('../../questions/formQuestion');
const { once } = require('events')
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'register',
            description: 'Cria um formulário de registro em seu servidor',
        });
    }

    run = async (interaction) => {
        if (interaction.channel.id !== '998049371377647666') return interaction.reply('Este comando só pode ser executado no canal registro');
        interaction.reply({content: `Registro iniciado, responda as perguntas abaixo:`, ephemeral: true});
        createForm()
            .then(answers => {
                const embed = new EmbedBuilder()
                    .setTitle(`Registro concluído`)
                    .setAuthor({
                        name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
                    .setTimestamp()
                    .setFooter({
                        text: `Registro solicitado por: ${interaction.user.tag}`})
                    .setColor('Random')
                    .addFields(answers)

                interaction.guild.channels.cache.get('998049371377647666').send({ embeds: [embed], ephemeral: true })

            })
            .catch((erro) => {
                const embed = new EmbedBuilder()
                    .setColor('RED')
                    .setDescription(erro)
                interaction.channel.send({content: interaction.user.toString(), embeds: [embed]});
            })
        async function createForm() {
            const answers = []
            const channel = interaction.channel

            for (const question of questions) {
                const embed = new EmbedBuilder()
                    .setTitle(question.question) // Pergunta
                    .setFooter({ text: `Você tem 5 minutos para responder essa pergunta`}) // Tempo para responder

                if (question.options) {
                    const actionRow = new ActionRowBuilder()
                        .addComponents(new SelectMenuBuilder(question))

                    const msg = await channel.send({ content: interaction.user.toString(), embeds: [embed], components: [actionRow] })
                    const filter = (i) => i.user.id === interaction.user.id
                    const collector = msg.createMessageComponentCollector({filter, max: 1, time: (5 * 60 * 1000)})

                    const [collected, reason] = await once (collector, 'end')

                    if (reason === 'limit'){
                        msg.delete().catch(() => {})
                        answers.push({
                            name: collected.first().customId,
                            value: collected.first().values.join(', ')
                        })
                    }
                    else if (reason === 'time') throw ('Tempo para responder o formulário de registro expirou.')
                    else throw ('Não foi possível registrar o usuário.')
                }
                else {
                    const msg = await channel.send({content: interaction.user.toString(), embeds: [embed] })

                    const filter = (m) => m.author.id === interaction.user.id && m.content?.length > 0 && m.content?.length < 1058
                    const collector = channel.createMessageCollector({ filter , max: 1, time: (5 * 60 * 1000) })

                    const [collected, reason] = await once(collector, 'end') // Espera o usuário responder

                    if (reason === 'limit') {
                        channel.bulkDelete([msg.id, collected.first().id]).catch(() => {})
                        answers.push({
                            name: question.name,
                            value: collected.first().content,
                        })
                    }

                    else if (reason === 'time') throw ('Tempo para responder o formulário de registro expirou.')
                    else throw ('Não foi possível registrar o usuário.')
                }
            }
            return answers;
        }
    }
}