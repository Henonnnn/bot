module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Loggadined in as ${client.user.tag}`);
	},
};