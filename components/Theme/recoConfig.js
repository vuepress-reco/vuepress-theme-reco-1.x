export default {
	data() {
		return {
			reco: {},
			colors: {
				blue: '#2196f3',
				red: '#f26d6d',
				green: '#3eaf7c',
				orange: '#fb9b5f'
			}
		};
	},

	mounted() {
		this.reco = {
			themes: ['blue', 'red', 'green', 'orange'],
			disableDarkTheme: false
		};

		this.reco.hasThemes = this.$themeConfig.themePicker || true
	},
};
