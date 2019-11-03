<template>
  <div class="home" :class="recoShow?'reco-show': 'reco-hide'">
    <div class="hero">
      <img
        v-if="data.isShowHeroImage !== false"
        :style="heroImageStyle"
        :src="data.heroImage ? $withBase(data.heroImage) : require('../images/icon_vuepress_reco.png')"
        alt="hero">

      <h1 v-if="data.isShowTitleInHome !== false">{{ data.heroText || $title || '午后南杂' }}</h1>

      <p class="description">{{ $description || 'Welcome to your vuePress-theme-reco site' }}</p>
      <p class="huawei" v-if="$themeConfig.huawei === true">
        <i class="iconfont reco-huawei" style="color: #fc2d38"></i>
        &nbsp;&nbsp;&nbsp;华为，为中华而为之！
      </p>

      <p class="action" v-if="data.actionText && data.actionLink">
        <NavLink class="action-button" :item="actionLink"/>
      </p>
    </div>

    <div class="features" v-if="data.features && data.features.length">
      <div v-for="(feature, index) in data.features" :key="index" class="feature">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <Content class="home-center" custom/>
  </div>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: { NavLink },
  data () {
    return {
      recoShow: false
    }
  },
  computed: {
    data () {
      return this.$frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },

    heroImageStyle () {
      return this.data.heroImageStyle || {
        maxHeight: '200px',
        margin: '6rem auto 1.5rem'
      }
    }
  },
  mounted () {
    this.recoShow = true
  }
}
</script>

<style lang="stylus">
@require '../styles/recoConfig.styl'
@require '../styles/loadMixin.styl'

.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;

  .hero {
    text-align: center;
    h1 {
      font-size: 2.5rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 20%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.6rem 1.2rem;
      border-radius: $borderRadius
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      load-start()

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;
    transition: all .5s
    h2 {
      font-size: 1.6rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 20%);
    }

    &:hover {
      transform scale(1.05)
    }
  }

  &.reco-hide {
  .hero {
    img {
      load-start()
    }
    .h1 {
      load-start()
    }
    .description {
      load-start()
    }
    .huawei {
      load-start()
    }
    .action-button {
      load-start()
    }
  }
  .features {
    load-start()
  }
  .home-center {
    load-start()
    padding 0
  }
}

  &.reco-show {
    .hero {
      img {
        load-end(0.08s)
      }
      .h1 {
        load-end(0.16s)
      }
      .description {
        load-end(0.24s)
      }
      .huawei {
        load-end(0.32s)
      }
      .action-button {
        load-end(0.4s)
      }
    }
    .features {
      load-end(0.40s)
    }
    .home-center {
      load-end(0.48s)
    }
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
