<template>
	<div v-if="showSettings" v-click-outside="hideMenu" class="user-settings">
		<a class="settings-button" href="#" @click.prevent="showMenu = !showMenu">
			<CogIcon class="settings-icon" />
		</a>
		<transition name="menu-transition" mode="out-in">
			<div v-show="showMenu" class="user-settings-menu">
				<ThemeOptions />
			</div>
		</transition>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import ThemeOptions from './ThemeOptions.vue';
import CogIcon from './CogIcon.vue';
import yuuConfig from './yuuConfig.js';

export default {
	name: 'UserSettings',

	directives: {
		'click-outside': ClickOutside,
	},

	components: {
		CogIcon,
		ThemeOptions,
	},

	mixins: [yuuConfig],

	data() {
		return {
			showMenu: false,
		};
	},

	computed: {
		showSettings() {
			const { yuu } = this;
			return yuu.hasThemes || yuu.disableDarkTheme !== true || yuu.disableThemeIgnore !== true;
		},
	},

	methods: {
		hideMenu() {
			this.showMenu = false;
		},
	},
};
</script>

<style lang="stylus">
@import '../../styles/config.styl';

.user-settings {
	position: relative;
	margin-right: 1em;

	.settings-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;

		.settings-icon {
			width: 18px;
		}
	}

	.user-settings-menu {
		background-color: #fff;
		position: absolute;
		top: 40px;
		left: 50%;
		min-width: 100px;
		margin: 0;
		padding: 1em;
		border: 1px solid $borderColor;
		border-radius: 4px;
		transform: translateX(-50%);
		z-index: 150;

		&::before {
			content: '';
			position: absolute;
			top: -7px;
			left: 50%;
			border-style: solid;
			border-color: transparent transparent $borderColor;
			border-width: 0 7px 7px;
			transform: translateX(-50%);
		}

		&.menu-transition-enter-active,
		&.menu-transition-leave-active {
			transition: all 0.25s ease-in-out;
		}

		&.menu-transition-enter,
		&.menu-transition-leave-to {
			top: 50px;
			opacity: 0;
		}

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;
		}
	}
}

.yuu-theme-dark {
	.user-settings-menu {
		background-color: $darkPrimaryBg;
		border-color: $darkBorderColor;

		&::before {
			border-bottom-color: $darkBorderColor;
		}
	}
}

@media (max-width: $MQMobile) {
	.user-settings {
		margin-right: 0;

		.user-settings-menu {
			left: calc(50% - 35px);

			&::before {
				left: calc(50% + 35px);
			}
		}
	}
}
</style>
