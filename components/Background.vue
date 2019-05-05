<template>
  <div id="particles-oli-wrapper"></div>
</template>

<script>
export default {
  mounted() {
    const keyPage = this.$site.themeConfig.keyPage
    let color = '#424242'
    let lineColor = '#424242'
    if (keyPage) {
      color = keyPage.color || color
      lineColor = keyPage.lineColor || lineColor
    }
    
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";

    document.body.append(script);
    script.onload = function() {
      particlesJS("particles-oli-wrapper", {
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: color
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 5
            }
          },
          opacity: {
            value: 0.3,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 20,
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
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: true,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
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
      });
    };
  }
};
</script>
<style lang="stylus" scoped>
#particles-oli-wrapper {
  height: 99vh;
}
</style>

