# vuepress-theme-reco

> 1.这是一个vuepress主题，目的是增加博客所需要的分类、标签墙、分页、评论等功能；<br>
> 2.主题本身追求极简，是在vuepress默认主题的基础上进行修改的。

## 安装和使用

1. 安装

    ```bash
    npm install vuepress-theme-reco -dev--save

    # 或

    yarn add vuepress-theme-reco
    ```
2. 使用

    ```javscript
    // 修改 /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco'
    }  
    ```
## 增加分类功能

**假如想增加一个 `前端` 和 `后端` 分类，需要进行以下几步操作：**

1. 在顶部导航添加一个分类的下拉按钮
    
    ```javscript
    // 修改 /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco',
      themeConfig: {
        nav: [
          { text: '分类', 
            items: [
              { text: '前端', link: '/categories/frontEnd' },
              { text: '后端', link: '/categories/backEnd' }
            ]
          }
        ]
      }  
    }  
    ```

2. 添加前端和后端的分类所需要的文件

    **`/docs/categories/frontEnd.md`**

    ```
    --- 
    title: 前端  
    isCategories: true  
    sidebar: false  
    ---

    ## 前端
    ```

    **`/docs/categories/backEnd.md`**

    ```
    ---
    title: 后端
    isCategories: true
    sidebar: false
    ---

    ## 后端
    ```

    > 为什么设置sidebar: false，因为启用分类功能，那就跟自定义侧边栏功能有些冲突了，所以全局开启了自动生成侧边栏功能，然后在这种不需要侧标兰的地方关闭

3. 写文章时添加分类 
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28 23:39:45
    categories: frontEnd
    ---
    ```
    
## 添加标签云功能

1. 在顶部导航添加一个按钮
    
    ```javscript
    // 修改 /docs/.vuepress/config.js

    module.exports = {
      theme: 'reco',
      themeConfig: {
        nav: [
          { text: 'Tags', link: '/tags/' }
        ]
      }    
    }  
    ```

2. 添加所需要的文件

    **`/docs/tags/README.md`**

    ```
    ---
    isTags: true
    sidebar: false
    ---

    ## 标签墙
    ```

3. 写文章时添加标签
   
    ```
    ---
    title: 【vue】跨域解决方案之proxyTable  
    date: 2017-12-28 23:39:45  
    tags:
    - vue
    - webpack
    ---
    ```

## 评论功能(valine)

主题内置valine评论功能，如果想开启此功能，仅需配置一下 `config.js`

```javscript
// 修改 /docs/.vuepress/config.js

module.exports = {
  theme: 'reco',
  themeConfig: {
    // valine配置
    valineConfig: {
      appId: '...',// your appId
      appKey: '...', // your appKey
    }
  }  
}  
```