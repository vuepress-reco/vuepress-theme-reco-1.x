<template>
	<div v-click-outside="hideMenu" class="color-picker">
		<a class="color-button" @click.prevent="showMenu = !showMenu">
			<i class="iconfont reco-color"></i>
		</a>
		<transition name="menu-transition" mode="out-in">
			<div v-show="showMenu" class="color-picker-menu">
				<ModePicker />
			</div>
		</transition>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import ModePicker from './ModePicker'

export default {
  name: 'UserSettings',

  directives: {
    'click-outside': ClickOutside
  },

  components: {
    ModePicker
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
@require '../../styles/mode.styl'

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
