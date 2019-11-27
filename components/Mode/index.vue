<template>
	<div v-click-outside="hideMenu" class="color-picker">
		<a class="color-button" @click.prevent="showMenu = !showMenu">
			<i class="iconfont reco-color"></i>
		</a>
		<transition name="menu-transition" mode="out-in">
			<div v-show="showMenu" class="color-picker-menu">
				<ModeOptions />
			</div>
		</transition>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import ModeOptions from './ModeOptions.vue'

export default {
  name: 'UserSettings',

  directives: {
    'click-outside': ClickOutside
  },

  components: {
    ModeOptions
  },

  data () {
    return {
      showMenu: false
    }
  },

  methods: {
    hideMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/recoConfig.styl'

.color-picker {
	position: relative;
	margin-right: 1em;
  cursor pointer;
	.color-button {
		align-items: center;
		height: 100%;
		.iconfont {
			font-size 1.4rem
			color: $accentColor
		}
	}

	.color-picker-menu {
		position: absolute;
		top: 40px;
		left: 50%;
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

.reco-mode-dark {
	.color-picker-menu {
		background-color: $darkPrimaryBg;
		border-color: $darkBorderColor;

		&::before {
			border-bottom-color: $darkBorderColor;
		}
	}
}

@media (max-width: $MQMobile) {
	.color-picker {
		margin-right: 1rem;
		.color-picker-menu {
			left: calc(50% - 35px);
			&::before {
				left: calc(50% + 35px);
			}
		}
	}
}
</style>
