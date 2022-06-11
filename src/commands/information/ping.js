const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../../utility/client')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Donne le ping du bot'),
    async execute(interaction) {
        await interaction.reply(`Pong! Le ping du bot est de ${client.ws.ping} ms`)
    },
};