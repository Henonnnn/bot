module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Loggadinedjeanaimareuh in as ${client.user.tag}`);
	},
};