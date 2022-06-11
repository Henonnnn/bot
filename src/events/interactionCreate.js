const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;

        if (!interaction.guild) {
            return await interaction.reply({ embeds: [
                new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`:x: Les commandes ne fonctionnent pas en privÃ©`)
            ]})
        }
    
        try {
            //Permission handler start 
            const user = interaction.member;
            const embed = new MessageEmbed()
                .setColor("RED")
            let output = ""
            let noPerms = []
            let errorMessage = ""

            if (!interaction.channel.permissionsFor(client.user).has("SEND_MESSAGES")) {
                embed.setDescription(`:x: Je n'ai pas la permission d'envoyer de message sur **${interaction.guild.name}**`)
                return await interaction.member.send({ embeds: [embed] });
            }

            if (command.userPerm) {
                if (Array.isArray(command.userPerm) && command.userPerm.length > 0) {
                    for (let index = 0; index < command.userPerm.length; index++) {
                        if (!interaction.channel.permissionsFor(user).has(command.userPerm[index])) {
                            noPerms.push(command.userPerm[index])
                        }

                    }

                    if (noPerms.length > 0) {
                        for (let index = 0; index < noPerms.length; index++) {
                            output += "`" + noPerms[index] + "`"
                            output += "\n"
                        }
                        if (command.userPerm) {
                            if (noPerms.length > 1) {
                                errorMessage = `:x: Vous avez besoin des permissions`
                            } else {
                                errorMessage = `:x: Vous avez besoin de la permission`
                            }
                            if (!interaction.channel.permissionsFor(user).has(command.userPerm)) {
                                embed.setTitle(errorMessage).setDescription(output)
                                await interaction.reply({ embeds: [embed] })
                                return;
                            }
                        }
                    }
                } else {
                    if (!interaction.channel.permissionsFor(user).has(command.userPerm)) {
                        embed.setTitle(`:x: Vous avez besoin de la permission`).setDescription("`" + command.userPerm + "`")
                        await interaction.reply({ embeds: [embed] })
                        return;
                    }
                }
            }

            if (command.botPerm) {
                if (Array.isArray(command.botPerm) && command.botPerm.length > 0) {
                    for (let index = 0; index < command.botPerm.length; index++) {
                        if (!interaction.channel.permissionsFor(client.user).has(command.botPerm[index])) {
                            noPerms.push(command.botPerm[index])
                        }

                    }

                    if (noPerms.length > 0) {
                        for (let index = 0; index < noPerms.length; index++) {
                            output += "`" + noPerms[index] + "`"
                            output += "\n"
                        }
                        if (command.botPerm) {
                            if (noPerms.length > 1) {
                                errorMessage = `:x: J'ai besoin des permissions`
                            } else {
                                errorMessage = `:x: J'ai besoin de la permission`
                            }
                            if (!interaction.channel.permissionsFor(client.user).has(command.botPerm)) {
                                embed.setTitle(errorMessage).setDescription(output)
                                await interaction.reply({ embeds: [embed] })
                                return;
                            }
                        }
                    }
                } else {
                    if (!interaction.channel.permissionsFor(client.user).has(command.botPerm)) {
                        embed.setTitle(`:x: J'ai besoin de la permission`).setDescription("`" + command.botPerm + "`")
                        await interaction.reply({ embeds: [embed] })
                        return;
                    }
                }
            }
            //Permission handler end

            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ embeds: [
                new MessageEmbed()
                    .setColor('RED')
                    .setDescription(':x: Une erreur est survenue')
            ], 
            ephemeral: true 
            });
        }
    },
}