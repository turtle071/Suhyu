const Command = require('../../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(client) {
        super(client,{
            name: "unmute",
            description: "Desmuta um usuário que esteja mutado.",
            options: [
                {
                    name: 'user',
                    type: 'USER',
                    description: 'O usuário que será desmutado.',
                    required: true
                }
            ]
        });
    }

    run = async (interaction) => {
        await interaction.deferReply({ ephemeral: false, fetchReply: true });
        if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
            interaction.editReply(':x: | Você não pode desmutar usuários.');
            return;
        }
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            interaction.editReply(':x: | Este usuário não está no servidor.');
            return;
        }

        if (interaction.user.id === member.id) {
            interaction.editReply(`:x: | Não é possível se desmutar!`);
            return;
        }

        if (member.roles) {
            if (!member.moderatable || member.roles.highest.position >= interaction.guild.me.roles.highest.position) {
                interaction.editReply(`:x: | Eu não posso desmutar este usuário.`);
                return;
            }
            if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                interaction.editReply(`:x: | Não foi possível desmutar este usuário, pois o cargo dele é maior que o meu.`)
                return;
            }
        }

        const unmute = 0;
        member.timeout(unmute)

        const embed = new MessageEmbed()
            .setTitle('Usuário desmutado!')
            .setDescription(`:white_check_mark: | ${user.tag}.`)
            .setColor('#006400')

        interaction.editReply({ embeds: [embed] }).then(() => {
            setTimeout(() => {
                interaction.deleteReply();
            }, 5 * 60000);
        })
    }
}