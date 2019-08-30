<template>
  <div id="loader-wrapper">
    <Background></Background>
    <div class="loader-main">
      <div class="loader-squ" v-for="item in 4" :key="`out${item}`">
        <span v-for="subItem in 3" :key="`in${subItem}`" :style="{background: _tagColor()}"></span>
      </div>
    </div>
    <h3 class="title">{{isPage ? $frontmatter.title : $site.title}}</h3>
    <p class="description" v-if="!isPage">{{$site.description}}</p>
  </div>
</template>

<script>
import Background from '@theme/components/Background'
import mixin from '@theme/mixins/index.js'
export default {
  mixins: [mixin],
  components: {Background}
};
</script>
<style lang="stylus" scoped>
#loader-wrapper{
  height:100vh;
  width:100vw;
  // background:#888;
  // background-image: radial-gradient(at center top, green 0px, rgb(0, 1, 5) 100%);
  .loader-main{
    position:absolute;
    top:60%;
    left:50%;
    width:172px;
    height:128px;
    margin:0;
    -webkit-transform:translate(-50%,-50%);
    transform:translate(-50%,-50%);
  }
  .title {
    position: absolute;
    left 0
    right 0
    top 12%
    margin auto
    text-align center
    color $textColor
    font-size 30px
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow 0 2px 10px rgba(0,0,0,0.2);
  }
  .description {
    position: absolute;
    left 0
    right 0
    top 20%
    margin auto
    text-align center
    color $textColor
    font-size 22px
    box-sizing: border-box;
    padding: 0 10px;
    text-shadow 0 2px 10px rgba(0,0,0,0.2);
  }
}

.loader-squ{
  position:relative;
  &:nth-child(1){
    margin-left:0px;
    span{
      -webkit-animation:animsquare1 2s infinite ease-in;
      animation:animsquare1 2s infinite ease-in;
      &:nth-child(1){
        -webkit-animation-delay:0.00s;
        animation-delay:0.00s
      }
      &:nth-child(2){
        -webkit-animation-delay:0.15s;
        animation-delay:0.15s
      }
      &:nth-child(3){
        -webkit-animation-delay:0.30s;
        animation-delay:0.30s
      }
    }
  }
  &:nth-child(2){
    margin-left:44px;
    span{
      -webkit-animation:animsquare2 2s infinite ease-in;
      animation:animsquare2 2s infinite ease-in
    }
  }
  &:nth-child(3){
    margin-left:88px;
    span{
      -webkit-animation:animsquare3 2s infinite ease-in;
      animation:animsquare3 2s infinite ease-in
    }
  }
  &:nth-child(4){
    margin-left:132px;
    span{
      -webkit-animation:animsquare4 2s infinite ease-in;
      animation:animsquare4 2s infinite ease-in
    }
  }
  span {
    position:absolute;
    top:0px;
    left:20px;
    height:36px;
    width:36px;
    border-radius:2px;
    background-color:#FFFFFF;
    box-shadow 0 2px 10px rgba(0,0,0,0.2);
    &:nth-child(1){top:0px}
    &:nth-child(2){top:44px}
    &:nth-child(3){top:88px}
  }
}

@keyframes animsquare1{
  0%,5%,95%,100%{
    -webkit-transform:translate(0px,0px) rotate(0deg);
    transform:translate(0px,0px) rotate(0deg)
  }
  30%,70%{
    -webkit-transform:translate(-40px,0px) rotate(-90deg);
    transform:translate(-40px,0px) rotate(-90deg)
  }
}

@keyframes animsquare2{
  0%,10%,90%,100%{
    -webkit-transform:translate(0px,0px) rotate(0deg);
    transform:translate(0px,0px) rotate(0deg)
  }
  35%,65%{
    -webkit-transform:translate(-40px,0px) rotate(-90deg);
    transform:translate(-40px,0px) rotate(-90deg)
  }
}
@keyframes animsquare3{
  0%,15%,85%,100%{
    -webkit-transform:translate(0px,0px) rotate(0deg);
    transform:translate(0px,0px) rotate(0deg)
  }
  40%,60%{
    -webkit-transform:translate(-40px,0px) rotate(-90deg);
    transform:translate(-40px,0px) rotate(-90deg)
  }
}
@keyframes animsquare4{
  0%,20%,80%,100%{
    -webkit-transform:translate(0px,0px) rotate(0deg);
    transform:translate(0px,0px) rotate(0deg)
  }
  45%,55%{
    -webkit-transform:translate(-40px,0px) rotate(-90deg);
    transform:translate(-40px,0px) rotate(-90deg)
  }
}
</style>