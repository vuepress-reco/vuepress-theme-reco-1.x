# vuepress-theme-reco

> 1. This is a vuepress theme aimed at adding the categories, TAB walls, pagination, comments and other features required for blogging;<br>
> 2. The theme itself is minimalist and is modified based on the default theme of the vuepress.<br>
> 3. You can open htttps://recoluan.gitlab.io to see it.

## Preview

#### Home Page
![home.png](https://upload-images.jianshu.io/upload_images/4660406-becd33be1de7391c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### Categories Page
![category.png](https://upload-images.jianshu.io/upload_images/4660406-acdd68dfa730e5a8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### Tags page
![tag.png](https://upload-images.jianshu.io/upload_images/4660406-d3b1ec44b870fbd6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### Article Page
![article.png](https://upload-images.jianshu.io/upload_images/4660406-00303788bc2edcaa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

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
    date: 2017-12-28 23:39:45
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
    date: 2017-12-28 23:39:45  
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

2. If you don't like the particle effect, you can turn it off. If you like it, you can also set the count and color of particles.

```javascript
module.exports = {
  title: "午后南杂",
  theme: 'reco',
  themeConfig: {
    // particles
    showParticles: true,
    // particlesConfig
    particlesConfig: {
      color: '0, 0, 0', //color of lines, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
      pointColor: '0, 0, 0', //color of points, default: '0,0,0'; RGB values: (R,G,B).(note: use ',' to separate.)
      opacity: 0.5, // the opacity of line (0~1), default: 0.5.
      count: 60, // the number of lines, default: 66.
      zIndex: -1,  // z-index property of the background, default: -1.
    },
  }  
}
``` 

3. If you want to click the tags in the list, you can set themeConfig's value of tagClick true 

```javascript
module.exports = {
  title: "午后南杂",
  theme: 'reco',
  themeConfig: {
    // whether you can click the tags in the list
    tagClick: true,
  }  
}  
```

## Home Config

1. If your heroImage has your website title, maybe you need to set the value of `isShowTitleInHome` `false` to make title not show

```
# this is your homepage

---
home: true
heroImage: /hero.png
isShowTitleInHome: false
---
```

2. If you want change heroImage's style, you can set the value of `heroImageStyle` to achieve the effec you want

```
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
