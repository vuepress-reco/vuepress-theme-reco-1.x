<template>
	<div class="theme-options">
		<ul v-if="reco.hasThemes" class="color-theme-options">
			<li>
				<a href="#" class="default-theme" @click.prevent="setTheme()"></a>
			</li>
			<li v-for="color in reco.themes" :key="color">
				<a href="#" :class="`${color}-theme`" :style="{background: colors[color]}" @click.prevent="setTheme(color)"></a>
			</li>
		</ul>
		<div v-if="!reco.disableDarkTheme" class="dark-theme-options toggle-option">
			<label for="dark-theme-toggle">Enable Dark Theme?</label>
			<input id="dark-theme-toggle" v-model="darkTheme" type="checkbox" @change="toggleDarkTheme" />
		</div>
	</div>
</template>

<script>
import recoConfig from './recoConfig.js';

export default {
	name: 'ThemeOptions',

	mixins: [recoConfig],

	data() {
		return {
			darkTheme: 'false'
		};
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
			const colorThemes = this.reco.themes;

			const classes = document.body.classList;
			const themes = colorThemes.map(colorTheme => `reco-theme-${colorTheme}`);

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
	justify-content: space-around;
	li {
		width: 33%;
		text-align: center;

		a {
			width: 15px;
			height: 15px;
			border-radius: 2px;

			&.default-theme {
				background-color: $accentColor;
			}

			&.blue-theme {
				background-color: $blueAccentColor;
			}

			&.red-theme {
				background-color: $redAccentColor;
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
