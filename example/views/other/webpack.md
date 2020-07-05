---
title: webpack 基础知识整理
date: 2019-07-24
tags:
 - webpack       
categories: 
 - frontEnd
---

## webpack简介

webpack是一个 **模块打包工具**，支持所有的打包语法，比如 `ES Module`、`CommonJS`、`CMD`、`AMD`。初期的webpack是用来模块打包js的，发展到现在，已经可以打包很多种文件类型，比如 `css`、`img` 。

优化打包速度最有效的方法就是保持 `nodejs` 和 `webpack` 为最新版本。

<!-- more -->

## 安装

安装 `webpack` 建议根据项目安装而不是全局安装，可以使用以下命令：

```bash
npm install webpack webpack-cli --save-dev

# 或

yarn add webpack webpack-cli --dev
```

这个时候执行 `webpack -v` 是查不到版本号的，因为 `nodejs` 默认是去全局找 `webpack`，这个时候是找不到的，nodejs还提供了 `npx webpack -v` 这个方法。

## 运行

如果不生成配置文件，webpack会按照默认配置去打包，如果我们想自定义配置文件可以在项目根目录添加 `webpack.config.js` 来自定义配置信息，配置文件的名字也可以自定义：

```bash
# 默认配置或者默认配置文件
npx webpack

# 自定义配置并且修改默认配置名字
npx webpack --config my-webpack-config.js

# npm scripts 中配置 "build": "webpack"
npm run build
```

一个简单的配置：

```js
module.exports = {
  mode: 'production', // production：默认，生产环境，代码被压缩；development：开发环境，代码不压缩
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

其中 `entry` 可以写成这样：

```js
entry: {
  main: './src/index.js'
}
```

其实，开始安装的 `webpack-cli` 就是为了在命令行工具中可以正确地执行命令行工具。

## loader

`webpack` 可以使用 `loader` 来预处理文件。这允许你打包除 `JavaScript` 之外的任何静态资源，js的打包是webpack内置的。你可以使用 `Node.js` 来很简单地编写自己的 `loader`。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  }
}
```

### file-loader

处理文件模块的 webpack loader。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'file-loader',
          options: {
            // 设置输出文件名
            name: '[name]_[hash].[ext]',
            // 设置输出文件夹
            outputPath: 'images/',
            // 指定目标文件的自定义公共路径
            publicPath: 'assets/'
          }
        }
      }
    ]
  }
}
```

### url-loader

`file-loader` 的增强版，除了上述功能，还可以将文件转换为 `base64 URI`。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            // 设置输出文件名
            name: '[name]_[hash].[ext]',
            // 设置需要转换base64的文件大小（太大的文件转换后需要更大的请求压力）
            limit: 2048
          }
        }
      }
    ]
  }
}
```

### css相关

#### style-loader 和 css-loader 

- css-loader：加入 a.css 中引入了 b.css 和 c.css，css-loader 会将其合并成一个css文件
- style-loader：将合并后的 css 文件挂载到 head 标签内

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
```

#### sass-loader

如果使用 scss、less、stylus 等 css 预处理器。例如，我们要使用 sass 预处理器，首先要安装 sass-loader 和 node-sass。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
```

::: warning
loader的加载顺序是从右到左、从下到上，所以处理 scss 文件时，将 sass-loader放在最后。
:::

#### postcss-loader

通过 postcss-loader 来给新属性添加厂商前缀。

```js
// webpack.config.js

const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

```js
// postcss.config.js
// 首先安装 autoprefixer

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

如果 a.css 中引入了 b.css 和 c.css，当读到 `@import('./b.css')` 时就会略过 postcss-loader 和 sass-loader，直接从 css-loader 直接运行，可以通过 `importLoaders` 配置来改善。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          }, 
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

#### css模块化

在 `index.js` 通过import `'./index.css'` 引入样式会全局有效，如果想在某个模块有效，如何去做呢？

```js
// 模块A

import style from 'index.css'

const img = new Image()
img.src = headImg
img.classList.add(style.avator)
```

```js
// webpack.config.js

const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true
            }
          }, 
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

#### 字体

字体文件只需要通过 file-loader 将字体文件转移到打包文件夹内即可。

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|svg|woff)$/i,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }  
      }
    ]
  }
}
```

## plugin

可以在webpack运行到某个时刻的时候，做一些事情。

### html-webpack-plugin

会在打包之后，自动生成一个 html 文件，并把打包生成的 js 自动引入到这个 html 文件中。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin()]
}
```

但是我们可能需要在 index.html 中写一些默认代码，比如 meta，这时就可以按照某个模板来生成这个 index.html。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })]
}
```

### clean-webpack-plugin

会在打包前先清空打包目标文件夹的文件。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```

## 多个输出文件

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

如果我们的打包后的文件中，index.html 需要给后台做配置文件，assets 文件夹需要放在 cdn 上，这样的话我们的就需要在 output 中设置 publicPath：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

## sourceMap

如果运行打包后的文件，某个地方有错误，控制台会显示打包后的文件的某个位置有错误，如果我们想知道错误来自于源文件的所在位置，那么就需要借助 sourceMap 了。所以 sourceMap 其实就是一种映射，它知道 dist 目录 main.js 文件的某个错误，实际对应的是 src 目录下 index.js 文件的第一行。

sourceMap 通过配置中的 devtool 去配置，参数的含义大概有以下几种情况：

| devtool                 | 作用                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| source-map              | 生成 map 文件，错误精确到行和列                                                   |
| inline-source-map       | inline，不生成 map 文件，以 base64 形式嵌入js中，错误精确到行和列                 |
| cheap-source-map        | cheap，错误只精确到行，且只针对业务代码，不包括第三方模块                         |
| cheap-module-source-map | cheap-module，错误只精确到行，且只针对业务代码，包括第三方模块                    |
| eval-source-map         | eval，不生成 map 文件，在 js 中以 eval 方法的形式出现，但是复杂项目的提示是不全的 |

**最佳实践**

1. develop：cheap-module-eval-source-map，提示比较全，打包速度快
2. production：cheap-module-source-map，提示更全面，打包稍微慢

## 监听变动

### webpack --watch

监听文件的变动，自动进行打包。

```json
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  }
}
```

### webpack-dev-server 

上面的html的打开的方式还是需要通过 `file` 协议打开一个本地文件，在浏览器地址是这样的：`file:///Users/reco/workSpace/git/personal/work/test.html`。这样的话发送 `AJAX` 请求就有问题了，因为发送请求需要 `http` 或者 `https` 协议，这时需要的是在本地启动一个服务，我们可以借助 `webpack-dev-server` （打包时将打包的文件放在内存中，提高打包速度）。

```bash
yarn add webpack-dev-server --dev
```


```json
{
  "scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack-dev-server"
  }
}
```

```js
const path = require('path')

module.exports = {
  entry: {
    main: './src/index.js',
    sub: './src/index.js'
  },
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  // 默认端口 8080
  devServer: {
    // 本地服务的根目录
    contentBase: './dist',
    // 服务启动后自动打开浏览器
    open: true,
    // 端口
    port: 3000,
    // 跨域代理
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}
```

**自己写一个简单的 webpack-dev-server**


```json
{
  "scripts": {
    "server": "node server.js"
  }
}
```

```js
// server.js

const espress = require('express')
const webapck = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const complier = webpack(config)

const app = express()

// publicPath 不设置的话默认 '/'
app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('server is running!')
})
```

> **缺点：**需要自己手动刷新

上面这种方式就是在node中使用webpack，这是除了在命令行中的使用 `webpack` 的另一种方式。

**开启 Hot Module Replacement**

解决下面的问题：
   1. 修改页面某个颜色，页面会刷新，导致动态添加的 dom 会消失；
   2. 一个页面同时引入两个模块的js，修改某个模块的js，页面会刷新，导致灵感一个模块的js也会初始化。

存在的问题：
   1. 在多页面应用里，html更改时并不会刷新，需手动，所以这种情况下，可以去掉更更新功能。

```js
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devServer: {
    // 1. 开启 HMR
    hot: true,
    // 只有在开启 HMR 的时候才会监听变动并刷新
    hotOnly: true
  },
  // 2. 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

案例：

```js
import counter from './counter'
import number from './number'

counter()
number()

// 如果 HMR 生效的话
if (module.hot) {
  // 监听文件的变动
  module.hot.accept('./number', () => {
    // 做一些清空操作
    // ...

    number()
  })
}
```

当引用 css 的时候只需要引用，并不需要上面这一坨代码，就是因为 `css-loader` 已经内置了上面的方法，就像在写 vue、react 代码不需要写上面这坨代码一样，他们的 loader 中也内置了这些方法。只有在使用一些特殊的文件类型才需要。（react 是借助 babel-preset 实现的）

> 业务开发时，一般不是设置 hotOnly 这样才能试试显示最新代码和更改效果

## Babel

### 安装

```bash
# babel-loader将 webpack 与 babel 建立关联
# @babel/core 语法转换

npm install --save-dev babel-loader @babel/core
```

```js
module: {
  rules: [
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader" 
    }
  ]
}
```

### 语法转换

这个时候还是不可以转换，还需要这样

```bash
npm install @babel/preset-env --save-dev
```

然后配置 options

```js
module: {
  rules: [
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader",
      options: {
        "presets": ["@babel/preset-env"]
      }
    }
  ]
}
```

### 变量、对象转换

这个时候也只能对一些语法进行转换，比如 “箭头函数”，如果想要对 `Promise` 这些新的对象进行转换（准确来说，浏览器可能不支持新规范的的一些对象，所以需要单独封装这些方法，然后在全局注入），还需要这样：

```bash
npm install --save @babel/polyfill
```

```js
// 在入口文件
require("@babel/polyfill");

// or
import "@babel/polyfill";
```

这个时候会默认全部转换，这样会增加很多兼容性代码，如果我们想按需引入：

```js
module: {
  rules: [
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader",
      options: {
        "presets": [["@babel/preset-env", {
          useBuiltIns: 'usage'
        }]]
      }
    }
  ]
}
```

有的同学问：`babel-polyfill` 这样引用可不可以？答案是可以，但是在使用 `useBuiltIns: 'usage'` 时就不可以了。

```js
// 在入口配置
module.exports = {
  entry: ["@babel-polyfill", "./app/js"]
}
```

`@babel/preset-env` 还可以拥有其他配置参数，比如：

```json
{
  "presets": [["@babel/preset-env", {
    targets: {
      chrome: "67"
    }，
    useBuiltIns: 'usage'
  }]]
}
```

上面配置的意思是，只需要兼容 chrome 浏览器 67 版本以上就可以了，这样转译时会根据浏览器的兼容性来合理处理转译结果。

### 组件库的封装

如果只是开发业务代码，使用上面 `presets` + `babel-polyfill` 的方式就可以了，但是 `babel-polyfill` 有一个确定就是会将变量全局注入，这里可以使用 `transform-runtime` 来以闭包（或其他）的形式来进行引入，避免全局环境的污染。

```bash
npm install --save-dev @babel/plugin-transform-runtime

npm install --save @babel/runtime
```

```js
module: {
  rules: [
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader",
      options: {
        "plugins": [
          [
            "@babel/plugin-transform-runtime",
            {
              "absoluteRuntime": false,
              "corejs": 2,
              "helpers": true,
              "regenerator": true,
              "useESModules": false
            }
          ]
        ]
      }
    }
  ]
}
```

将 `corejs` 的值设置为 2，才会将 `map` 、`promise`等方法打包到 `main.js`，当然还需要引入另一个依赖：

```bash
npm install --save @babel/runtime-corejs2
```

### `.babelrc`

如果 babel 的配置过于复杂，内容较多，可以将其单独放在 `.babelrc` 文件内：

```json
{
  "presets": [["@babel/preset-env", {
    useBuiltIns: 'usage'
  }]]
}
```

## React打包

```bash
npm install --save-dev @babel/preset-react
```

```json
{
  "presets": [
    ["@babel/preset-env", {
      useBuiltIns: 'usage'
    }],
    [
      "@babel/preset-react",
      {
        "pragma": "dom", // default pragma is React.createElement
        "pragmaFrag": "DomFrag", // default is React.Fragment
        "throwIfNamespace": false // defaults to true
      }
    ]
  ]
}
```

## Tree Shaking

> 只支持 ES Module，因为 ES Module 是静态引入

作用：模块按需引入，不会将全部代码引用过来

### development

**webpack.config.js**

```js
module.exports = {
  mode: 'development',
  optimization: : {
    usedExports: ture
  }
}
```

`usedExports` 意思就是检查一下哪些模块被使用了再做打包。

**package.json**

```json
{
  "sideEffects": false
}
```

如果引入的一些 `css` 或依赖不需要 `Tree Shaking`，那将 `sideEffects` 设置为 `["./a.css", "@babel/polyfill"]`，如果没有需要配置的，直接设置为  `false` 即可。

### production

线上环境是不需要配置 `usedExports` 的，但是还是需要配置 `package.json`。

## 配置文件整理

比如在 `Vue` 官方的脚手架中 `webpack` 的配置文件都放在 `build` 文件夹中，如果我们希望对配置文件进行整理的话，需要做一下处理：

1. 将开发环境和线上环境的公共配置提取到 `/build/webpack.base.js` 中
2. 分别在开发环境和线上环境的配置中合并公共配置，配置合并需要使用 `webpack-merge`
    ```js
    // /build/webpack.dev.js
    const merge = require('webpack-merge')
    const baseConfig = require('./webpack.base.js')

    const devConfig = {
      mode: 'development'
    }

    module.exports = merge(baseConfig, devConfig)
    ```
3. 修改 `package.json` 
    ```json
    {
      "script": {
        "dev": "webpack-dev-server --config ./build/webpack.dev.js",
        "build": "webpack --config ./build/webpack.prod.js"
      }
    }
    ```
4. 这个时候较之前打包输出和清空的目录就应该修改一下了
    ```js
    module.exports = {
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        }),
        new CleanWebpackPlugin(["dist"], {
          root: path.resolve(__dirname, "../")
        })
      ]
    }
    ```

    **更新**：上面 `CleanWebpackPlugin` 的语法是 `1.0` 版本的。`2.0` 它所清空的文件夹默认就是打包输出目录，无需再单独指定。

## Code Splitting 

### 原理

代码拆分——通过对公用代码的拆分来提升性能。

本来代码拆分和 `webpack` 是没关系的，只不过是一种优化手段，比如将公共代码单独打包到一个文件内，业务代码打包到另一个文件内，从而提升加载体验。这里可以运用多入口文件的方式分开打包。

### webpack实现

`webpack4.0` 实现代码分割，分两种情况：

1. 同步代码需要配置 `splitChunks`

```js
module.exports = {
  optimization: : {
    splitChunks: {
      chunks: "all"
    }
  }
}
```

2. 异步代码不需要做任何操作，异步代码比如下面这种情况：

```js
function createElement () {
  import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    div.innerHTML = _.join(['a', 'b'], '-')
    return element
  })
}

createElement().then(element => {
  documnet.body.append(element)
})
```

> 这个写法会报错，因为动态来获取依赖的这种方式是试验性语法，目前还不支持，需要借助插件：`babel-plugin-dynamic-import-webpack`  

---

### SplitChunksPlugin

**魔法注释**

```js
function createElement () {
  import(/* webpackChunkName: 'loadsh' */, 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    div.innerHTML = _.join(['a', 'b'], '-')
    return element
  })
}

createElement().then(element => {
  documnet.body.append(element)
})
```

`babel-plugin-dynamic-import-webpack` 不支持魔法注释，所以要换成 `@babel/plugin-syntax-dynamic-import`，这个时候会打包生成 `vendors~lodash.js`，如果需要修改打包后的名字，可以设置 `optimization`：

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "async", // async 异步，initial 同步， all 全部，但是同步还需要配置 cacheGroups，这是重点
      minSize: 30000, // 可以处理依赖的最小值
      maxSize: 0, // 可以处理依赖的最大值
      minChunks: 2, // 被引用2次及以上，才会被拆分
      maxAsyncRequests: 5, // 最大请求次数，也就是拆分时最多拆分5个包
      maxInitialRequests: 3, // 入口最大请求次数，也就是拆分时最多拆分3个包
      automaticNameDelimiter: '~', // 文件生成时名字的连接符
      name: true, // 拆分块的名称，提供true将根据块和缓存组密钥自动生成名称。
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 优先级，数值越大优先级越高，符合多个规则时优先权重高的规则
          filename: "venders.js" // 打包时的名字
        },
        // 不在 verdors 内的打包
        default: {
          minChunks: 2,
            priority: -20,
            reuseExistingChunk: true // 如果一个模块被打包过了，再次遇到，就不会再打包了，而是会去找之前打包过的那个模块
          }
        }
      }
    }  
  }
}
```

## Lazy Loading & Chunk

### Lazy Loading

`webpack` 可以识别 `ECMAScript` 的import返回的promise，并进行分割，实现懒加载，但是必须依赖 `babel-polyfill` 或者 `promise-polyfill`。

```js
function createElement () {
  import(/* webpackChunkName: 'loadsh' */, 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    div.innerHTML = _.join(['a', 'b'], '-')
    return element
  })
}

document.addEventListener('click', () => {
  createElement().then(element => {
    documnet.body.append(element)
  })
})
```

用 `ES7` 的 `async` 和 `await` 函数重构一下：

```js
async function createElement () {
  const { default: _ } = await import(/* webpackChunkName: 'loadsh' */, 'lodash')
  const element = document.createElement('div')
  div.innerHTML = _.join(['a', 'b'], '-')
  return element
}

document.addEventListener('click', () => {
  createElement().then(element => {
    documnet.body.append(element)
  })
})
```

### Chunk

像上面的 `Lazy Loading` 所拆分打包的每一个文件都是一个 `Chunk`，而前面的配置参数` minChunks: 2` 的意思就是：当有2个以上的 · 使用到某个依赖时，才会对其进行拆分成一个 `Chunk`。

```js
const path = require('path')

module.exports = {
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js', // 打包之后的入口文件之外的js的会在这里过滤一下名字
    path: path.resolve(__dirname, 'dist')
  }
}
```

## 打包分析

`http://webpack.js.org/guides/code-splitting/#bundle-analysis`，这是官网对打包分析的几个总结，其中最好用的是 `webpack-bundle-analyzer`。

**webpack 希望我们怎么样写代码呢？**

```js
// 原来我们是这么写代码的
document.addEventListener('click', () => {
  const element = document.createElement('div')
  element.innerHTML = 123
  documnet.body.append(element)
})
```

上面的代码的加载利用率是较低的，因为创建元素实在点击事件触发后才触发的，所以可以分离出去：

```js
// 现在我们可以这么写

// 将生成代码的代码放到另一个文件中去，比如叫 click.js
function createElement () {
  const element = document.createElement('div')
  element.innerHTML = 123
  documnet.body.append(element)
}

export default createElement


document.addEventListener('click', () => {
  import('./click.js').then(({default: func}) => {
    func()
  })
})
```

所以我们现在写代码应该考虑的不是缓存的问题，而是代码的利用率。所以在 `chunks` 默认设置为 `async` 而不是 `all`，是因为，同步的代码只能增加缓存，而对性能提升非常有限。

> 谷歌浏览器查看网页的利用率：控制台 --> ctrl+shift+p --> coverage

---

比如点击登录的时候会出现一个模态框，首页的加载并不需要加载模态框的，但是点击登录按钮再加载，模态框的加载是会变慢的，这就需要下面的两个方法了：`Preloading` 和 `Prefetching`。

### Prefetching

**非主要业务模块会在主要业务模块加载完之后，空闲时间再去加载。**

```js
// 现在我们可以这么写

// 将生成代码的代码放到另一个文件中去，比如叫 click.js
function createElement () {
  const element = document.createElement('div')
  element.innerHTML = 123
  documnet.body.append(element)
}

export default createElement


document.addEventListener('click', () => {
  // 通过魔法注释来开启 webpackPrefetch
  import(/* webpackPrefetch: true */'./click.js').then(({default: func}) => {
    func()
  })
})
```

### Preloading

**而这个模式下，非主要业务模块会和主要业务模块一起加载**

```js
// 现在我们可以这么写

// 将生成代码的代码放到另一个文件中去，比如叫 click.js
function createElement () {
  const element = document.createElement('div')
  element.innerHTML = 123
  documnet.body.append(element)
}

export default createElement


document.addEventListener('click', () => {
  // 通过魔法注释来开启 webpackPreload
  import(/* webpackPreload: true */'./click.js').then(({default: func}) => {
    func()
  })
})
```

### 总结

目前考虑前端的性能优化，不能总是考虑缓存，而是主要考虑代码的使用率。

## CSS代码分割

### CSS分割

不做处理的情况下，`webpack` 会将 `css` 打包到 `js` 中去，如果需要生成单独的 `css` 文件，可以使用 `MiniCssExtractPlugin`。

```bash
# 安装
npm install --save-dev mini-css-extract-plugin
```

配置步骤：
1. 配置 `plugins`；
2. 将 `style-loader` 改为 `MiniCssExtractPlugin.loader`；
3. 如果设置了 `Tree Shaking`，需要将 `"sideEffects": false` 改为 `"sideEffects": ["*.css"]`。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // 设置输出文件的命名规则
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    usedExports: ture
  }
}
```

```json
{
  "sideEffects": ["*.css"]
}
```

### CSS 压缩

`optimize-css-assets-webpack-plugin`

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  }
};
```

### 合并 CSS

将多个入口文件的 `css` 单独放到每个文件中，需要设置 `optimization.splitChunks.cacheGroups` 为对应的多个分组。

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    foo: path.resolve(__dirname, 'src/foo'),
    bar: path.resolve(__dirname, 'src/bar'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        fooStyles: {
          name: 'foo',
          test: (m, c, entry = 'foo') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        barStyles: {
          name: 'bar',
          test: (m, c, entry = 'bar') =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

## 浏览器缓存

`contenthash` 如果内容没有变化，hash值不会变；如果内容变化，hash就会变。这样项目重新打包上线后，项目就不会全部重新加载了。

```js
const path = require('path')

module.exports = {
  output: {
    publicPath: 'http://cdn.com.cn',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

如果 `webpack` 是老版本，还需要配置一下 `runtimeChunk`：

```js
module.exports = {
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
}
```

这是因为：代码有没有变化的逻辑关系被打包到一个叫 `manifest` 的东西来里，旧版本的 `webpack` 是会将这个东西直接打包到每个 `chunk` 文件中，而所以导致每次打包都不一致，这样的话配置好 `runtimeChunk`之后，所有的`manifest` 都会提取到名为 `runtime` 的文件内，所以就不会影响打包了。

## Shimming (垫片)

`babel-polyfill` 就是一个全局垫片，`babel-plugin-transform-runtime` 是一个局部垫片。下面介绍几种垫片：

1. 如果我们在 `a.js` 引用了一个 `utils.js` 的里面的方法，而这个方法需要借助 `jquery`， `a.js` 引用了`jquery`，而 `utils.js` 没有，这时候是会报错的，所以可以借助 `webpack.ProvidePlugin` 全局 在使用 `$` 的地方引用 `jquery`。

2. `webpack.ProvidePlugin` 还有另外一个功能：如果我们想要将 `$.each` 功能直接这样使用 `$each`，我们在下面这么来配置。

    ```js
    import webpack from 'webpack'

    module.exports = {
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          $each: ['jquery', 'each']
        })
      ]
    }
    ```

3. 每个模块的 `this` 都是指向当前模块的，如果想让每个模块都指向 `window`，我们需要借助 `imports-loader`：

    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'imports-loader?this=?window'
              }
            ]
          }
        ]
      }
    }
    ```

## 环境变量

```js
// webpack.common.js

const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const commonConfig = {
  // ...
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}
```

```json
{
  "scripts": {
    "dev-build": "webpack --config ./build/webpack.common.js",
    "dev": "webpack-dev-server --config ./build/webpack.common.js",
    "build": "webpack --env.production --config ./build/webpack.common.js",
  }
}
```

## 区分模式打包

区别： 
1. develop 模式下的sourceMap 是非常全的；
2. develop 模式下的代码不需要压缩；

## 函数库打包

### 指定代码运行范围

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'library', // 通过 script 标签引入，全局注入 library 这个变量
    libraryTarget: 'umd' // 模块引入方式 ES Module 和 CommonJS
  }
} 
```

`library` 和 `libraryTarget` 两个是配合使用的，`library` 的意思就是指定暴露的全局变量的名字，但是这个全局变量挂在到哪里呢？这就由 `libraryTarget` 来指定了。`umd` 的意思是允许它与CommonJS，AMD和全局变量一起使用，除了它还有 `this/window/global/amd` 等值可以设置。

### 略过不需要的依赖

```js
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist'),
    externals: ["lodash"] // 打包时当遇到 lodash 这个依赖就自动忽略
  }
} 
```

比如我的这个函数库依赖 `jquery`，但是用户也可能引用了 `jquery`，这样就会多打包一份，所以为了减少代码量，这时就可以通过 `externals` 来忽略 `jquery`（`externals` 支持 `Arrary/Object`）。

## Progressive Web Application 

第一次访问成功，第二次访问时如果服务挂掉了，这个时候让项目走缓存，而不是显示服务错误页面。

`PWA` 的技术原理是 `server work`，这里可以借助 `workbox-webpack-plugin`：

```js
// webpack.config.js
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```

打包之后就产生两个文件：`service-work.js` 和 `precache-manifest.js`，下面还需要在入口文件写一下相关配置：

```js
// index.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-work.js').then(registeration => {
      console.log(`service-work registered`)
    }).catch(err => {
      console.log(`service-work register error`)
    })
  })
}
```

## TypeScript 的打包配置

```bash
npm install ts-loader -D
```

```js
// webpack.config.js
module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

还需要创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "outDir": "./dist", // 打包到那个文件夹内
    "module": "es6", // 使用es6的模块化方式
    "target": "es5", // 打包成 es5 语法
    "allowJs": true  // 允许在ts文件里在引入一些js模块
  }
}
```

如果我们引入了 `jquery` 这个模块，要想在使用 `jquery` 语法时让typescript有效，还需要引入 `@types/jquery` 这个依赖（这是 2.0 的做法，1.0 稍有区别），不然会报错：`TS2688: Cannot find type definition file for 'unist'.`。

## WebpackDevServer 请求转发

### proxy

`WebpackDevServer` 的 `proxy` 是可以直接配置代理的：

```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/react/api': {
        target: 'https://www.xxx.com',
        secure: false, // 可以对 https 生效
        pathRewrite: { // 改变接口路由
          'header.json': 'demo.json'
        },
        changeOrigin: true, // 有些接口为了防止爬虫是不允许改变 origin 的，这里设置为 true 就可以了
        headers: { // 改变请求头
          host: 'www.xxx.com'
        }
      }
    }
  }
}
```

### historyApiFallback

```js
// webpack.config.js
module.exports = { 
  devServer: {
    historyApiFallback: true
  }
}
```

如果一个项目里在写单页面应用时，某个路由我们没有配置某个路由 A，访问时会显示 `can't get A`，这是我们可以配置 `historyApiFallback: true` 来将没有配置的页面直接转向 `index.html`，详细用法见 webpack官网。

## ESLint

```bash
# 安装
# eslint 是命令工具 eslint-loader 是在编译er或启动项目时实时报错
npm install eslint eslint-loader --save-dev

# 初始化 eslint 规范，生成 .eslintrc.js 文件
# Aribnb 是一种很变态的规范
npx eslint init 
```

```js
// webpack.config.js
module.exports = { 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: ['babel-loader', 'eslint-loader'] // 先进行代码检验，再编译
      }
    ]
  },
  devServer: {
    overlay: true // 如果过程出现错误，会通过蒙层来提示错误
  }
}
```

`eslint-loader` 还有许多配置参数可以设置：

```js
// webpack.config.js
module.exports = { 
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true, // 如果有小的错误，可以直接修复
              cache: true // 优化打包速度
            },
            enforce: 'pre' // 虽然在 babel-loader 前面，但是可以提前执行(实际测试这个参数放在这里有问题，这里的loader就按照它本该有的循序去排列它，不要使用这个参数去控制了)
          }, 
          'babel-loader'
        ] // 先进行代码检验，再编译
      }
    ]
  },
  devServer: {
    overlay: true // 如果过程出现错误，会通过蒙层来提示错误
  }
}
```

```js
// .eslintrc.js
module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0
  },
  globals: {
    document: false // 解决全局变量出错
  }
}
```

> VSCode 安装 ESLint 插件，实时显示错误。

如果报错 `Eslint parsing error: Unexpected token <`，可以借助 [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)来解决。

:::tip
实际项目中为了不影响打包速度，可以不配置 `eslint-loader`，而是直接通过 git 钩子，在提交命令代码时进行检测，当然这个时候就放弃了实时报错的特性。
```bash
git 钩子 eslint src
```
:::

## 提升打包速度

1. 跟上技术的迭代，保持最新（Node/Npm/Yarn）
2. 在尽快少的模块上使用 `loader`，比如通过 `include` 和 `exclude` 来指定打包监听范围
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            include: path.resolve(__dirname, '../src'),
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              }
            ]
          }
        ]
      }
    }
    ```
3. 尽量精简 `plugin`，并且确保其可靠性
4. 合理配置 extensions
    ```js
    module.exports = {
      resolve: {
        // 配置太多多引发多次查找，注意精简
        extensions: ['.js', '.jsx', '.css'],
        // 引用如果引用文件时只写到上级目录，会默认引用 index 文件，这样如果没有 index 回去找 child 文件，也不要配置特别多，尽量不使用
        mainFiles: ['index', 'child']
        // 配置别名，缩短引用名称
        alias: {
          "@component": path.resolve(__dirname, '../src/component')
        }
      }  
    }
    ```

## Loader 原理

### 小案例

创建一个可以将 字符串 `reco` 替换为 `luan` 的简单 `loader`

```js
// 新建一个loader /loaders/replaceLoader.js

// 这里不可以使用箭头函数
module.exports = function (source) {
  return source.replace('reco', 'luan')
}

// 使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, '/loaders/replaceLoader.js')
          }
        ]
      }
    ]
  }
}
```

### 获取参数

```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  // 参数会被放在 this.query 里面
  const { name } = this.query

  // 有的时候 options 可能不是对象而是字符串，我们可以借助 loader-utils
  const loaderUtils = require('loader-utils')
  const { name } = loaderUtils.getOptions(this)

  return source.replace('reco', name)
}

// 使用
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, '/loaders/replaceLoader.js'),
            options: {
              name: 'luan'
            }
          }
        ]
      }
    ]
  }
}
```

### 丰富反馈内容

借助 `this.callback`：

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: sourceMap,
  meta?: any
)
```

```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this)
  const result = source.replace('reco', name)

  this.callback(null, result, sourceMap, meta)
}
```

### resolveLoader

作用是寻找 loader 时可以直接去我们自定义的文件夹内去寻找。

```js
// 使用
module.exports = {
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'replaceLoader2'
          },
          {
            loader: path.resolve(__dirname, '/loaders/replaceLoader.js'),
            options: {
              name: 'luan'
            }
          }
        ]
      }
    ]
  }
}
```

### 异步处理

```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this)
  const callback = this.asunc()

  setTimeout(() => {
    const result = source.replace('reco', name)
    callback(null, result)
  }, 1000)
}
```

```js
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const { name } = loaderUtils.getOptions(this)
  const result = source.replace('reco', name)

  this.callback(null, result, sourceMap, meta)
}
```

> loader 还可以做哪些工作呢？比如 给代码添加 try catch，本地化，替换中英文

## Plugin 原理

### 简单 Plugin

```js
// /plugins/copyright-webpack-plugin.js

class CopyrightWebpackPlugin {
  constructor (options) {
    console.log(options) // { name: 'reco' }
  }

  // compiler 是 webapck 的一个实例，存放着配置等所有的东西
  apply (compiler) {
    /**
     * hooks       是钩子
     * emit        将打包好的文件放到输出目录之前（异步钩子）
     * compilation 和本次打包相关的东西
    */
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      // 增加一个 txt 文件
      compilation.assets['copyright.txt'] = {
        /**
         * source 文本内容
         * size   文本字节大小
        */
        source: function () {
          return 'copyright by reco_luan'
        },
        size: function () {
          return 22
        }
      }

      // 必须回调
      cb()
    })

    // compile 同步钩子，不需要callback
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('同步钩子')
    })
  }
}

module.exports = CopyrightWebpackPlugin
```

```js
// /webpack.config.js

const CopyrightWebpackPlugin = require('/plugins/copyright-webpack-plugin.js')

module.exports = {
  plugins: [
    new CopyrightWebpackPlugin({
      name: 'reco'
    })
  ]
}
```

### Node 调试

```json
// package.json
{
  "script": {
    "debug": "node --inspect --inspect-brk node_modules/webpack/bin/webpack.js",
    "build": "webpack"
  }
}
```

- `--inspect` 开启 Node 调试
- `--inspect-brk` 在代码第一行添加一个 debug 命令

```js
class CopyrightWebpackPlugin {
  apply (compiler) {
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      // 打断点
      debugger;
      console.log('同步钩子')
    })
  }
}

module.exports = CopyrightWebpackPlugin
```

打开控制台的 Node 图标，就进入了 Node 调试

## Bundler 源码编写

### 入口文件分析

```js
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const parser = require('@babel/parser') // 分析抽象语法树
const traverse = require('@babel/traverse').default


// ************ 入口文件分析 **************
const moduleAnalyser = (filename) => {
  // 读取文件
  const content = fs.readFileSync(filename, 'utf-8')

  //分析抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  // 分析依赖
  let dependencies = {}
  traverse(ast, { // 第一个语法是抽象语法树
    ImportDeclaration ({ node }) {
      // 获取依赖的相对路径
      const value = node.source.value
      const dirname = path.dirname(filename)
      const newFile = `./${path.join(dirname, value)}`

      // key: 将相对路径 value: 绝对路径
      dependencies[value] = newFile
    }
  })

  // 将 ES6 语法转译为 浏览器可以执行的语法
  const { code } = babel.transformFromAst(ast, null, {
    // 需要安装 @babel/preset-env
    presets: ["@babel/preset-env"]
  })

  /**
   * filename     // 入口文件
   * dependencies // 依赖关系
   * code         // 打包后的代码
  */
  return {
    filename,
    dependencies,
    code
  }
}

const moduleInfo = moduleAnalyser('./src/index.js')

console.log(moduleInfo)
```

### 依赖图谱

```js
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const parser = require('@babel/parser') // 分析抽象语法树
const traverse = require('@babel/traverse').default

// ************ 入口文件分析 **************
const moduleAnalyser = (filename) => {
  // 读取文件
  const content = fs.readFileSync(filename, 'utf-8')

  //分析抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  // 分析依赖
  let dependencies = {}
  traverse(ast, { // 第一个语法是抽象语法树
    ImportDeclaration ({ node }) {
      // 获取依赖的相对路径
      const value = node.source.value
      const dirname = path.dirname(filename)
      const newFile = `./${path.join(dirname, value)}`

      // key: 将相对路径 value: 绝对路径
      dependencies[value] = newFile
    }
  })

  // 将 ES6 语法转译为 浏览器可以执行的语法
  const { code } = babel.transformFromAst(ast, null, {
    // 需要安装 @babel/preset-env
    presets: ["@babel/preset-env"]
  })

  /**
   * filename     // 入口文件
   * dependencies // 依赖关系
   * code         // 打包后的代码
  */
  return {
    filename,
    dependencies,
    code
  }
}

// const moduleInfo = moduleAnalyser('./src/index.js')
// console.log(moduleInfo)

// ************ 依赖图谱 **************
const makeDependenciesGraph = (entry) => {
  // 首先在依赖图谱中插入入口文件的分析
  const entryModule = moduleAnalyser(entry)
  const graphArray = [ entryModule ]

  /**
   * 循环入口文件的依赖并将其添加到 graphArray 中，因为 graphArray 是动态的，
   * graphArray.length 也是动态的，所以可以进入下一轮循环
   */
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }

  // 依键值对的形式重新组合数据
  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

const graphInfo = makeDependenciesGraph('./src/index.js')
console.log(graphInfo)
```

### 生成可用代码

```js
const fs = require('fs')
const path = require('path')
const babel = require('@babel/core')
const parser = require('@babel/parser') // 分析抽象语法树
const traverse = require('@babel/traverse').default

// ************ 入口文件分析 **************
const moduleAnalyser = (filename) => {
  // 读取文件
  const content = fs.readFileSync(filename, 'utf-8')

  //分析抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })

  // 分析依赖
  let dependencies = {}
  traverse(ast, { // 第一个语法是抽象语法树
    ImportDeclaration ({ node }) {
      // 获取依赖的相对路径
      const value = node.source.value
      const dirname = path.dirname(filename)
      const newFile = `./${path.join(dirname, value)}`

      // key: 将相对路径 value: 绝对路径
      dependencies[value] = newFile
    }
  })

  // 将 ES6 语法转译为 浏览器可以执行的语法
  const { code } = babel.transformFromAst(ast, null, {
    // 需要安装 @babel/preset-env
    presets: ["@babel/preset-env"]
  })

  /**
   * filename     // 入口文件
   * dependencies // 依赖关系
   * code         // 打包后的代码
  */
  return {
    filename,
    dependencies,
    code
  }
}

// const moduleInfo = moduleAnalyser('./src/index.js')
// console.log(moduleInfo)

// ************ 依赖图谱 *****************
const makeDependenciesGraph = (entry) => {
  // 首先在依赖图谱中插入入口文件的分析
  const entryModule = moduleAnalyser(entry)
  const graphArray = [ entryModule ]

  /**
   * 循环入口文件的依赖并将其添加到 graphArray 中，因为 graphArray 是动态的，
   * graphArray.length 也是动态的，所以可以进入下一轮循环
   */
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      for (let j in dependencies) {
        graphArray.push(moduleAnalyser(dependencies[j]))
      }
    }
  }

  // 依键值对的形式重新组合数据
  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

// const graphInfo = makeDependenciesGraph('./src/index.js')
// console.log(graphInfo)

// ************ 生成代码 *****************
const generateCode = (entry) => {
  // 依赖树是一个对象，需要解析成字符串
  const graph = JSON.stringify(makeDependenciesGraph(entry))

  /**
   * 依赖树每个模块对应的代码都需要 require/modules 对象，所以需要自己来构建
   */
  return `
    (function (graph) {
      function require (module) {
        // require 需要引用相对路径，所以创建 localRequire
        function localRequire (relativePath) {
          return require(graph[module].dependencies[relativePath])
        }

        // 没有 exports 对象，需要手动创建
        // 切记，这里的 分号 是必须有的
        var exports = {};
        (function (require, exports, code) {
          // 执行代码
          eval(code)
        })(localRequire, exports, graph[module].code)

        // 导出后别的依赖，才能进行引用
        return exports
      }
      require('${entry}')
    })(${graph})
  `
}

const code = generateCode('./src/index.js')
console.log(code)


```

## 深入学习

### CreateReactApp

### vue-cli

### Vue

## 其他

### 清除性能报错

```js
module.exports = {
  performance: false
}
```

### 启动一个服务

```bash
npm install http-server -D
```

将 dist 目录 作为根目录启动服务：

```json
{
  "scripts": {
    "start": "http-server dist"
  }
}
```