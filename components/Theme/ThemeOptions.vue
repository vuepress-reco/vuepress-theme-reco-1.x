<template>
	<div class="theme-options">
		<ul v-if="yuu.hasThemes" class="color-theme-options">
			<li>
				<a href="#" class="default-theme" @click.prevent="setTheme()"></a>
			</li>
			<li v-for="color in yuu.themes" :key="color">
				<a href="#" :class="`${color}-theme`" @click.prevent="setTheme(color)"></a>
			</li>
		</ul>
		<div v-if="!yuu.disableDarkTheme" class="dark-theme-options toggle-option">
			<label for="dark-theme-toggle">Enable Dark Theme?</label>
			<input id="dark-theme-toggle" v-model="darkTheme" type="checkbox" @change="toggleDarkTheme" />
		</div>
		<div v-if="yuu.hasThemes && !yuu.disableThemeIgnore" class="force-theme-options toggle-option">
			<label for="force-theme-toggle">Ignore Forced Themes?</label>
			<input id="force-theme-toggle" v-model="ignoreForcedThemes" type="checkbox" @change="toggleForcedThemes" />
		</div>
	</div>
</template>

<script>
import yuuConfig from './yuuConfig.js';
import themeHandler from './themeHandler.js';

export default {
	name: 'ThemeOptions',

	mixins: [yuuConfig, themeHandler],

	data() {
		return {
			darkTheme: false,
			ignoreForcedThemes: false,
		};
	},

	mounted() {
		if (this.yuu.disableDarkTheme !== true) {
			this.darkTheme = localStorage.getItem('dark-theme') === 'true';
			this.toggleDarkTheme();
		}

		if (this.yuu.disableThemeIgnore !== true) {
			this.ignoreForcedThemes = localStorage.getItem('ignore-forced-themes') === 'true';
		}
	},

	methods: {
		toggleDarkTheme() {
			if (this.darkTheme) {
				document.body.classList.add('yuu-theme-dark');
				return localStorage.setItem('dark-theme', true);
			}

			document.body.classList.remove('yuu-theme-dark');
			localStorage.removeItem('dark-theme');
		},

		toggleForcedThemes() {
			if (this.ignoreForcedThemes) {
				this.setTheme(localStorage.getItem('color-theme'));
				return localStorage.setItem('ignore-forced-themes', true);
			}

			localStorage.removeItem('ignore-forced-themes');
		},
	},
};
</script>

<style lang="stylus">
@import '../../styles/config.styl';

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
