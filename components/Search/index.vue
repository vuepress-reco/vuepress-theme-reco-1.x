<template>
  <div>
    <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia"/>
    <SearchBox v-else-if="$site.themeConfig.search !== false"/>
  </div>
</template>

<script>
import AlgoliaSearchBox from "../Search/AlgoliaSearchBox/";
import SearchBox from "../Search/SearchBox/";

export default {
  components: { SearchBox, AlgoliaSearchBox },
  computed: {
    algolia() {
      return (
        this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
      );
    },

    isAlgoliaSearch() {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName;
    }
  }
}
</script>

