module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Loggadinedencore in as ${client.user.tag}`);
	},
};