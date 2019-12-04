import { filterPostData, sortPostData } from '../helpers/postData'

export default {
  computed: {
    $recoPosts () {
      const {
        $categories: { list: articles }
      } = this

      let posts = articles.reduce((allData, currnetData) => {
        return [...allData, ...currnetData.pages]
      }, [])

      posts = filterPostData(posts)
      sortPostData(posts)

      return posts
    }
  }
}
