module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Loggadinedjezanaimareuh in as ${client.user.tag}`);
	},
};