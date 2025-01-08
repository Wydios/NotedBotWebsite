const commands = require('./commands.js'); 

const commandsDE = commands.map(cmd => ({
    name: cmd.name,
    aliases: cmd.aliases,
    description: cmd.descriptionDE, 
    usage: cmd.usageDE,             
    category: cmd.category,
}));

const commandsUS = commands.map(cmd => ({
    name: cmd.name,
    aliases: cmd.aliases,
    description: cmd.descriptionUS,
    usage: cmd.usageUS,             
    category: cmd.category,
}));

module.exports = { commandsDE, commandsUS, };
