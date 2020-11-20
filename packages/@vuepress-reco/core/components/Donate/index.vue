<template>
  <div class="cont" v-if="shouldShowDonate">
    <a id="github" target="_blank" class="pos-f tr3"></a>
    <div id="DonateText" class="tr3">打赏</div>
    <ul id="donateBox" class="list pos-f tr3">
      <li id="PayPal">
        <a :href="PayPal" target="_blank">PayPal</a>
      </li>
      <li id="QqPay" @click="showQR(QqQR)">QQ</li>
      <li id="AliPay" @click="showQR(AliPayQR)">AliPay</li>
      <li id="WeChat" @click="showQR(WeChatQR)">WeChat</li>
    </ul>
    <div id="QRBox" class="pos-f left-100">
      <div id="MainBox" @click="hide"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shouldShowDonate: {
      type: Boolean,
      default: true,
    },
    AliPayQR: {
      default: require("./images/AliPayQR.png"),
    },
    WeChatQR: {
      default: require("./images/WeChatQR.png"),
    },
    QqQR: {
      default: require("./images/QqQR.png"),
    },
    PayPal: {
      type: String,
      default: "https://paypal.me/Reinness?locale.x=zh_XC",
    },
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        // 切换页面时刷新
        this.hide();
      }
    },
  },
  methods: {
    showQR(QR) {
      var QRBox = $("#QRBox");
      var MainBox = $("#MainBox");
      if (QR) {
        MainBox.css("background-image", "url(" + QR + ")");
      }
      $("#DonateText,#donateBox,#github").addClass("blur");
      QRBox.fadeIn(300, function (argument) {
        MainBox.addClass("showQR");
      });
    },
    hide() {
      var QRBox = $("#QRBox");
      var MainBox = $("#MainBox");
      MainBox.removeClass("showQR").addClass("hideQR");
      setTimeout(function (a) {
        QRBox.fadeOut(300, function (argument) {
          MainBox.removeClass("hideQR");
        });
        $("#DonateText,#donateBox,#github").removeClass("blur");
      }, 600);
    },
  },
};
</script>

<style scoped>
.cont {
  height: 130px;
  margin: 30px;
  position: relative;
}

html,
html > body {
  margin: 0px !important;
  padding: 0px !important;
  height: 100%;
  width: 100%;
}

body {
  font-family: "Helvetica Neue", Ubuntu, "WenQuanYi Micro Hei", Helvetica,
    "Hiragino Sans GB", "Microsoft YaHei", "Wenquanyi Micro Hei",
    "WenQuanYi Micro Hei Mono", "WenQuanYi Zen Hei", "WenQuanYi Zen Hei",
    "Apple LiGothic Medium", "SimHei", "ST Heiti", "WenQuanYi Zen Hei Sharp",
    Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  line-height: 1.8em;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
  background: #fff;
}

img {
  border-width: 0px;
}

a {
  color: #000;
  text-decoration: none;
  outline: none;
  border: none;
}

.list,
.list li,
.list-left li {
  list-style: none;
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}

.pos-f {
  position: absolute;
}

.left-100 {
  width: 100%;
  height: 100%;
}

.blur {
  -webkit-filter: blur(3px);
  filter: blur(3px);
}

.tr3 {
  transition: all 0.3s;
}

#DonateText {
  position: absolute;
  font-size: 12px;
  width: 70px;
  height: 70px;
  line-height: 70px;
  color: #fff;
  background: #ffd886 url("./images/like.svg") no-repeat center 10px;
  background-size: 20px;
  border-radius: 35px;
  text-align: center;
  left: calc(50% - 120px);
  top: calc(50% - 45px);
  z-index: -1;
  transform: rotatez(-15deg);
}

#donateBox {
  left: calc(50% - 150px);
  top: calc(50% - 0px);
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 299px;
  height: 28px;
  float: left;
  z-index: 1;
}

#donateBox li {
  width: 74px;
  float: left;
  text-align: center;
  border-left: 1px solid #ddd;
  background: no-repeat center center;
  background-color: rgba(204, 217, 220, 0.1);
  background-size: 45px;
  transition: all 0.3s;
  cursor: pointer;
  overflow: hidden;
  line-height: 600px;
  height: 28px;
  -webkit-filter: grayscale(1);
  filter: grayscale(1);
  opacity: 0.5;
}

#donateBox li:hover {
  background-color: rgba(204, 217, 220, 0.3);
  -webkit-filter: grayscale(0);
  filter: grayscale(0);
  opacity: 1;
}

#donateBox > li:first-child {
  border-width: 0;
}

#donateBox a {
  display: block;
}

#donateBox #PayPal {
  background-image: url("./images/paypal.svg");
}

#donateBox > #BTC {
  background-image: url("./images/bitcoin.svg");
  line-height: 28px;
}

#donateBox > #BTC:hover {
  overflow: visible;
}

#BTC > button {
  opacity: 0;
  cursor: pointer;
}

#donateBox #QqPay {
  background-image: url("./images/qqpay.svg");
  background-size: auto;
}

#donateBox #AliPay {
  background-image: url("./images/alipay.svg");
}

#donateBox #WeChat {
  background-image: url("./images/wechat.svg");
}

#QRBox {
  top: 10px;
  left: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.3);
  display: none;
  perspective: 400px;
  z-index: 100000;
}

#MainBox {
  cursor: pointer;
  position: absolute;
  text-align: center;
  width: 150px;
  height: 150px;
  left: calc(50% - 75px);
  top: calc(50% - 75px);
  background: #fff no-repeat center center;
  background-size: 140px;
  border-radius: 6px;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: all 1s ease-in-out;
  transform-style: preserve-3d;
  transform-origin: center center;
  overflow: hidden;
  z-index: 10000000;
}

#btc-key {
  opacity: 0;
  width: 2px;
  height: 8px;
  overflow: hidden;
  left: -2px;
  top: -8px;
}

#github {
  width: 24px;
  height: 24px;
  left: calc(50% + 135px);
  top: calc(50% - 15px);
  background: no-repeat center center url("./images/github.svg");
  background-size: contain;
  opacity: 0.3;
  transform: rotatez(15deg);
}

[data-footnote] {
  position: relative;
  overflow: hidden;
}

[data-footnote]:hover {
  overflow: visible;
}

[data-footnote]::before,
[data-footnote]::after {
  position: absolute;
  transition: all 0.3s;
  transform: translate3d(-50%, 0, 0);
  opacity: 0;
  left: 37px;
  z-index: 10;
}

[data-footnote]::before {
  content: attr(data-footnote);
  border-radius: 6px;
  background-color: rgba(100, 100, 100, 0.8);
  color: #fff;
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
  top: -24px;
  left: 37px;
}

[data-footnote]::after {
  content: "";
  border: 5px solid #333;
  border-color: rgba(100, 100, 100, 0.8) transparent transparent transparent;
  top: 0;
  left: 37px;
}

[data-footnote]:hover::before,
[data-footnote]:hover::after {
  opacity: 1;
}

[data-footnote]:hover::before,
[data-footnote]:hover::after {
  transform: translate3d(-50%, -7px, 0);
}

#MainBox.showQR {
  opacity: 1;
  animation-name: showQR;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation: showQR 3s ease-in-out 0s 1 normal forwards;
}

@keyframes showQR {
  from {
    transform: rotateX(90deg);
  }

  8% {
    opacity: 1;
    transform: rotateX(-60deg);
  }

  18% {
    opacity: 1;
    transform: rotateX(40deg);
  }

  34% {
    opacity: 1;
    transform: rotateX(-28deg);
  }

  44% {
    opacity: 1;
    transform: rotateX(18deg);
  }

  58% {
    opacity: 1;
    transform: rotateX(-12deg);
  }

  72% {
    opacity: 1;
    transform: rotateX(9deg);
  }

  88% {
    opacity: 1;
    transform: rotateX(-5deg);
  }

  96% {
    opacity: 1;
    transform: rotateX(2deg);
  }

  to {
    opacity: 1;
  }
}

#MainBox.hideQR {
  opacity: 1;
  animation-name: hideQR;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  -webkit-animation: hideQR 0.5s ease-in-out 0s 1 normal forwards;
}

@keyframes hideQR {
  from {
  }

  20%,
  50% {
    transform: scale(1.08, 1.08);
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: rotateZ(40deg) scale(0.6, 0.6);
  }
}
</style>