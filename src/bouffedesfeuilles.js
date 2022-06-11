const {Collection} = require("discord.js")
const client = require("./utility/client");
const fs = require('fs');
require('dotenv').config();

client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client)
    }
    client.handleEvents(eventFiles, "./src/events")
    client.handleCommands(commandFolders, "./src/commands")
    client.login(process.env.token)
})();