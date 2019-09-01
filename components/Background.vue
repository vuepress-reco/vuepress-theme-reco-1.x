<template>
  <div id="particles-oli-wrapper"></div>
</template>

<script>
export default {
  mounted () {
    const keyPage = this.$themeConfig.keyPage
    let color = '#424242'
    let lineColor = '#424242'
    const num = 20
    if (keyPage) {
      color = keyPage.color || color
      lineColor = keyPage.lineColor || lineColor
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'

    document.body.append(script)
    script.onload = function () {
      const particlesJS = window.particlesJS
      particlesJS('particles-oli-wrapper', {
        particles: {
          number: {
            value: num,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: color
          },
          shape: {
            type: 'circle',
            stroke: {
              width: 0,
              color: '#000000'
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.9,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.6,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 30,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 250,
            color: lineColor,
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: true,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab'
            },
            onclick: {
              enable: true,
              mode: 'push'
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 100,
              line_linked: {
                opacity: 0.5
              }
            }
          }
        },
        retina_detect: true
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
#particles-oli-wrapper {
  position: absolute;
  z-index: -1;
  top: 0;
  width: 100%;
  height: 99vh;
}
</style>

