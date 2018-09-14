<template>
  <div class="abstract-wrapper">
    <div
      v-for="(item, index) in data"
      :key="index"
      v-if="((index + 1) > (currentPage - 1) * 10) && ((index + 1) <= currentPage * 10)"
      class="abstract-item">
      <div class="title">
        <router-link
          :to="item.path">{{item.title}}</router-link>
      </div>
      <div class="abstract" v-html="item.excerpt"></div>
      <hr>
      <div class="tags">
        <span 
          v-for="(subItem, subIndex) in item.frontmatter.tags"
          :key="subIndex"
          class="tag-item"
          @click="goTags(subItem)">
          {{subItem}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'currentPage'],
  methods: {
    goTags (tag) {
      this.$emit('currentTag', tag)
      this.$router.push({path: '/tags/'})
    }
  }
}
</script>

<style lang="stylus" scoped>
.abstract-wrapper
  width 100%
  .abstract-item
    margin: 0 auto 20px;
    padding: 16px 20px;
    width 100%
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 1px 10px rgba(26,26,26,.1);
    box-sizing: border-box;
    .title
      position: relative;
      font-size: 24px;
      line-height: 36px;
      display: inline-block;
      :after
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #3eaf7c;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        transition: .3s ease-in-out;
      :hover:after
        visibility visible
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    .tags
      .tag-item
        vertical-align: middle;
        margin: 4px;
        padding 4px 8px
        display: inline-flex;
        cursor: pointer;
        border-radius: 2px;
        border: 1px solid #e8eaec;
        background: #fff;
        color: #999;
        font-size: 13px; 
</style>
