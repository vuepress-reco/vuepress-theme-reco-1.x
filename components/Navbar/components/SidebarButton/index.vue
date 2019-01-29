<template>
  <div class="sidebar-button" @click="$emit('toggle-sidebar')">
    <i class="iconfont reco-menu"></i>
  </div>
</template>

<style lang="stylus">
@import '../../../../styles/config.styl'

.sidebar-button
  display: none;
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  padding: 0.8rem;
  top: 0;
  right: 0;
  i
    font-size 1.8rem

@media (max-width: $MQMobile)
  .sidebar-button
    display block
</style>
