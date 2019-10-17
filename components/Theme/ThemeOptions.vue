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
	</div>
</template>

<script>

export default {
  name: 'ThemeOptions',

  data () {
    return {
      darkTheme: 'false',
      reco: {}
    }
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

  mounted () {
    const theme = localStorage.getItem('reco-theme')
    if (theme) this.setTheme(theme)
  },

  methods: {
    setTheme (theme, moveClass = true) {
      const classes = document.body.classList
      const themes = Object.keys(this.themePicker).map(colorTheme => `reco-theme-${colorTheme}`)

      if (!theme) {
        if (moveClass) localStorage.removeItem('reco-theme')
        classes.remove(...themes)
        return
      }

      classes.remove(...themes.filter(t => t !== `reco-theme-${theme}`))

      if (moveClass) {
        classes.add(`reco-theme-${theme}`)
        localStorage.setItem('reco-theme', theme)
      } else {
        localStorage.removeItem('reco-theme')
        classes.remove(`reco-theme-${theme}`)
      }
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/recoConfig.styl'

.color-theme-options {
	display: flex;
	flex-wrap wrap
	li {
		width: 20%;
		text-align: center;
		a {
			width: 15px;
			height: 15px;
			border-radius: $borderRadius
			&.default-theme {
				background-color: $accentColor;
			}
		}
	}
}
</style>
