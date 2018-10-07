# vuepress-theme-reco

[中文文档](./README_zh.md)

> 1.This is a vuepress theme aimed at adding the categories, TAB walls, pagination, comments and other features required for blogging;<br>
> 2.The theme itself is minimalist and is modified based on the default theme of the vuepress.

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

    ## frontEnd
    ```

    **`/docs/categories/backEnd.md`**

    ```
    ---
    title: backEnd
    isCategories: true
    sidebar: false
    ---

    ## backEnd
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