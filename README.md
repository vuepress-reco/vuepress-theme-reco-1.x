# vuepress-theme-reco

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

> 1. 这是一个vuepress主题，旨在添加博客所需的类别，TAB墙，分页，评论和其他功能，适合 `vuepress 0.x`;<br>
> 2. 主题本身是极简主义的，并根据vuepress的默认主题进行修改;<br>
> 3. 你可以打开 http://recoluan.gitlab.io 来查看它。

## 预览

### 首页
![home.png](https://upload-images.jianshu.io/upload_images/4660406-0bf9d91e9d289f75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 分类页面
![category.png](https://upload-images.jianshu.io/upload_images/4660406-8c7995d750c58536.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 标签页
![tag.png](https://upload-images.jianshu.io/upload_images/4660406-39c0d47627869e3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 文章页面
![article.png](https://upload-images.jianshu.io/upload_images/4660406-a19cad487991409d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 加密登录页

![password.png](https://upload-images.jianshu.io/upload_images/4660406-7d38dc78c16b7d48.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 时间轴

![timeline.png](https://upload-images.jianshu.io/upload_images/4660406-1dc5a5fe6c03952e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 移动端
![m.png](https://upload-images.jianshu.io/upload_images/4660406-7e2c78c48dd78284.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 安装和使用

1. 安装

    ```bash
    npm install vuepress-theme-reco -dev--save

    # or

    yarn add vuepress-theme-reco
    ```

2. 使用

    ```javscript
    // 修改 /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco'
    }  
    ```

## 添加分类

**如果要添加 `front-end` 和 `back-end` 分类，需要进行以下步骤：**

1. 在顶部导航中添加类别下拉按钮
    
    ```javscript
    // change /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco',
      themeConfig: {
        nav: [
          { text: 'categories', 
            items: [
              { text: 'frontEnd', link: '/categories/frontEnd' },
              { text: 'backEnd', link: '/categories/backEnd' }
            ]
          }
        ]
      }  
    }  
    ```

2. 添加分类所需的文件

    **`/docs/categories/frontEnd.md`**

    ```
    --- 
    title: frontEnd  
    isCategories: true  
    sidebar: false  
    isComment: false
    ---

    ## FrontEnd
    ```

    **`/docs/categories/backEnd.md`**

    ```
    ---
    title: backEnd
    isCategories: true
    sidebar: false
    isComment: false
    ---

    ## BackEnd
    ```

    > 你为什么设置侧边栏是假的？因为您启用了分类，这与自定义侧边栏功能有点冲突，所以您全局打开自动侧边栏功能，然后在不需要侧标记的地方关闭它

3. 撰写文章时添加类别
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28 23:39:45
    categories: frontEnd
    ---
    ```

    > 请记住， `categories` 文件的相应 `title` 值和相应的分类值是一致的。
    
## 添加标签云

1. 在顶部导航中添加一个按钮
    
    ```javscript
    // change /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco',
      themeConfig: {
        nav: [
          { text: 'Tags', link: '/tags/' }
        ]
      }    
    }  
    ```

2. 添加所需的文件

    **`/docs/tags/README.md`**

    ```
    ---
    isTags: true
    sidebar: false
    isComment: false
    ---

    ## tag cloud
    ```

3. 在撰写文章时添加标签
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28 23:39:45  
    tags:
    - vue
    - webpack
    ---
    ```

## 添加时间轴

1. 在顶部导航中添加一个按钮
    
    ```javscript
    // change /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco',
      themeConfig: {
        nav: [
          { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' }
        ]
      }    
    }  
    ```

2. 添加所需的文件

    **`/docs/timeLine/README.md`**

    ```
    ---
    isTimeLine: true
    sidebar: false
    isComment: false
    ---

  ## Time Line
    ``` 

## 添加摘要

效果：

![2.png](https://upload-images.jianshu.io/upload_images/4660406-a15ae55c1e77bef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

相应的markdown：

![1.png](https://upload-images.jianshu.io/upload_images/4660406-54a9168672d45d1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在markdown代码中，您将看到注释，注释前面的代码将显示在列表页面上的文章摘要中。

## 评论(valine)

带有内置了valine评论功能，如果要打开此功能，只需配置你的 `config.js`

```javscript
// 更改 /docs/.vuepress/config.js

module.exports = {
  theme: 'reco',
  themeConfig: {
    // valine
    valineConfig: {
      appId: '...',// your appId
      appKey: '...', // your appKey
    }
  }  
}  
```

## 加入加密功能

有些项目可能具有私密性，不希望被公开，只有填入密钥登录后（关闭标签后登录失效），才能进入内容页面。

```javscript
// 更改 /docs/.vuepress/config.js

module.exports = {
  theme: 'reco',
  themeConfig: {
    // 密钥
    keyPage: {
      keys: ['930105'],
      color: '#fb9b5f', // 登录页动画球的颜色
      lineColor: '#fb9b5f' // 登录页动画线的颜色
    }
  }  
}  
```

## Config.js

1. 在移动端，搜索框在获得焦点时会放大，并且在失去焦点后可以左右滚动，这可以通过设置元来优化。

```javascript
module.exports = {
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ]
}  
```

2. 您可以在导航菜单中添加图标，如下所示：

```javascript
{ text: 'Tags', link: '/tags/', icon: 'reco-tag' }
```

该项目有内置图标供您选择

![icon.png](https://upload-images.jianshu.io/upload_images/4660406-565b8ffd891b9cb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. 设置全局作者姓名

```javascript
module.exports = {
  themeConfig: {
    // author
    author: 'reco_luan',
  }
}
```

4. 为单篇文章设置作者姓名

```bash
---
title: 你还没真的努力过，就轻易输给了懒惰
date: 2015-04-23 11:21
categories: article
author: 渡渡
---
```


## 首页配置

1. 如果您的heroImage具有您的网站标题，则可能需要设置值 `isShowTitleInHome` `false` 以使标题不显示。

```bash
# this is your homepage

---
home: true
heroImage: /hero.png
isShowTitleInHome: false
---
```

2. 如果你想改变heroImage的风格，你可以设置值 `heroImageStyle` 来实现你想要的效果

```bash
# 这是你的主页 

---
home: true
heroImage: /hero.png
heroImageStyle: {
  maxHeight: '200px',
  display: block,
  margin: '6rem auto 1.5rem',
  borderRadius: '50%',
  boxShadow: '0 5px 18px rgba(0,0,0,0.2)'
}
---
```

3. 无法再随意编辑主页页脚，只能更改所有者的名称。将首先显示全局作者姓名，否则将显示博客的标题

## License
[MIT](https://github.com/recoluan/vuepress-theme-reco/blob/master/LICENSE)