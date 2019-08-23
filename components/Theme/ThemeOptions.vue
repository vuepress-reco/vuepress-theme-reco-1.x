<template>
	<div class="theme-options">
		<ul class="color-theme-options">
			<li>
				<a href="#" class="default-theme" @click.prevent="setTheme()"></a>
			</li>
			<li v-for="(value, key) in themePicker" :key="key">
				<a href="#" :class="`${key}-theme`" :style="{background: value}" @click.prevent="setTheme(key)"></a>
			</li>
		</ul>
		<div class="dark-theme-options toggle-option">
			<label for="dark-theme-toggle">Enable Dark Theme?</label>
			<input id="dark-theme-toggle" v-model="darkTheme" type="checkbox" @change="toggleDarkTheme" />
		</div>
	</div>
</template>

<script>

export default {
	name: 'ThemeOptions',

	data() {
		return {
			darkTheme: 'false',
			reco: {}
		};
	},

	computed: {
		themePicker () {
			return this.$themeConfig.themePicker || {
				red: '#f26d6d',
				blue: '#2196f3',
				green: '#3eaf7c',
				orange: '#fb9b5f'
			}
		}
	},

	mounted() {
		const theme = localStorage.getItem('reco-theme')
		const night = localStorage.getItem('reco-night')
		const classes = document.body.classList;

		this.darkTheme = night === 'true' ? true : false
		if (night === 'true') classes.add(`reco-theme-night`)
		if (theme) this.setTheme(theme)
	},

	methods: {
		toggleDarkTheme() {
			localStorage.setItem('reco-night', this.darkTheme)
			const classes = document.body.classList;
			if (this.darkTheme) {
				const oldColor = [...classes]
				classes.value = ''
				classes.add(`reco-theme-night`)
				oldColor.forEach(item => {
					classes.add(item)
				})
			}	
			else {
				classes.remove(`reco-theme-night`)
			}	
		},
		setTheme(theme, moveClass = true) {

			const classes = document.body.classList;
			const themes = Object.keys(this.themePicker).map(colorTheme => `reco-theme-${colorTheme}`);

			if (!theme) {
				if (moveClass) localStorage.removeItem('reco-theme');
				classes.remove(...themes);
				return 
			}

			classes.remove(...themes.filter(t => t !== `reco-theme-${theme}`));

			if (moveClass) {
				classes.add(`reco-theme-${theme}`);
				localStorage.setItem('reco-theme', theme);
			} else {
				localStorage.removeItem('reco-theme')
				classes.remove(`reco-theme-${theme}`);
			}
		}
	},
};
</script>

<style lang="stylus">

.color-theme-options {
	display: flex;
	flex-wrap wrap
	li {
		width: 20%;
		text-align: center;

		a {
			width: 15px;
			height: 15px;
			border-radius: 2px;

			&.default-theme {
				background-color: $accentColor;
			}

			for key, value in $themePicker {
				&.{key}-theme {
					background-color: value;
				}
			}	
		}
	}
}

.toggle-option {
	display: flex;
	justify-content: space-between;
	align-items: center;

	label {
		padding-right: 0.25em;
	}
}
</style>
