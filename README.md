# vuepress-theme-reco

![vuepress](https://img.shields.io/badge/vuepress-0.14.8-brightgreen.svg)
![leancloud-storage](https://img.shields.io/badge/leancloud--storage-3.10.1-orange.svg)
![valine](https://img.shields.io/badge/valine-1.3.4-blue.svg)

> 1. It's a vuepress theme aimed at adding the categories, TAB walls, pagination, comments and other features required for blogging, suitable for `vuepress 0.x`;<br>
> 2. The theme itself is minimalist and is modified based on the default theme of the vuepress;<br>
> 3. You can open https://recoluan.gitlab.io to see it.

## Preview

### Home Page
![home.png](https://upload-images.jianshu.io/upload_images/4660406-0bf9d91e9d289f75.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Categories Page
![category.png](https://upload-images.jianshu.io/upload_images/4660406-8c7995d750c58536.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Tags page
![tag.png](https://upload-images.jianshu.io/upload_images/4660406-39c0d47627869e3a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### Article Page
![article.png](https://upload-images.jianshu.io/upload_images/4660406-a19cad487991409d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### Mobile
![m.png](https://upload-images.jianshu.io/upload_images/4660406-7e2c78c48dd78284.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Installation and use

1. Install

    ```bash
    npm install vuepress-theme-reco -dev--save

    # or

    yarn add vuepress-theme-reco
    ```

2. Use

    ```javscript
    // 修改 /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco'
    }  
    ```

## Add categories

**If want to add a `front-end` and `back-end` classification, need to undertake the following steps：**

1. Add a category drop button to the top navigation
    
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

2. Add the files needed for classification

    **`/docs/categories/frontEnd.md`**

    ```
    --- 
    title: frontEnd  
    isCategories: true  
    sidebar: false  
    ---

    ## FrontEnd
    ```

    **`/docs/categories/backEnd.md`**

    ```
    ---
    title: backEnd
    isCategories: true
    sidebar: false
    ---

    ## BackEnd
    ```

    > Why do you set sidebar false? Because you enable classification, that's a little bit of a conflict with the custom sidebar feature, so you globally turn on the auto sidebar feature, and then close it where you don't need a side marker

3. Add categories when writing articles
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28
    categories: frontEnd
    ---
    ```

    > Remember, `categories` corresponding value to file and the corresponding classification `title` values are consistent.
    
## Add tag cloud

1. Add a button to the top navigation
    
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

2. Add the required files

    **`/docs/tags/README.md`**

    ```
    ---
    isTags: true
    sidebar: false
    ---

    ## tag cloud
    ```

3. Add tags when writing articles
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28
    tags:
    - vue
    - webpack
    ---
    ```

## Add abstract

Effect：

![2.png](https://upload-images.jianshu.io/upload_images/4660406-a15ae55c1e77bef1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The corresponding markdown：

![1.png](https://upload-images.jianshu.io/upload_images/4660406-54a9168672d45d1d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

In the markdown code, you will see a comment, and the code in front of the comment will be displayed in the article abstract on the list page.

## Comment(valine)

Theme with a built-in valine comments, if you want to open this function, only configure your `config.js`

```javscript
// change /docs/.vuepress/config.js

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

## Config.js

1. On the mobile side, the search box will enlarge when it gets the focus, and it can scroll left and right after losing the focus, which can be optimized by setting the meta.

```javascript
module.exports = {
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ]
}  
```

2. You can add icon to the navigation menu，like this:

```javascript
{ text: 'Tags', link: '/tags/', icon: 'reco-tag' }
```

The project has built-in icons for you to choose

![icon.png](https://upload-images.jianshu.io/upload_images/4660406-565b8ffd891b9cb3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

3. Sets the global author name

```javascript
module.exports = {
  themeConfig: {
    // author
    author: 'reco_luan',
  }
}
```

4. Set the author name for a single article

```bash
---
title: 你还没真的努力过，就轻易输给了懒惰
date: 2015-04-23
categories: article
author: 渡渡
---
```


## Home Config

1. If your heroImage has your website title, maybe you need to set the value of `isShowTitleInHome` `false` to make title not show

```bash
# this is your homepage

---
home: true
heroImage: /hero.png
isShowTitleInHome: false
---
```

2. If you want change heroImage's style, you can set the value of `heroImageStyle` to achieve the effec you want

```bash
# this is your homepage

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

3. Home page footer can no longer be edited at will, only the owner's name can be changed. The global author name will be displayed first, and if not, the title of the blog will be displayed

## License
[MIT](https://github.com/recoluan/vuepress-theme-reco/blob/master/LICENSE)
