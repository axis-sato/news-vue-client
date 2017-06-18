<template>
  <div>
    <md-layout md-gutter="16">
      <md-layout md-gutter v-for="article in articles" :key="article.id" class="foo" md-flex md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="33">

        <md-whiteframe  md-elevation="2" class="article-whiteframe">
          <img :src="article.thumbnail" alt="Thumbnail">

          <div class="md-title">{{ article.title }}</div>
          <md-button class="md-icon-button md-raised md-accent">
            <md-icon>add</md-icon>
          </md-button>
          <div class="md-title">{{ article.body }}</div>
          <md-chip v-for="tag in article.tags" :key="tag.id" class="tag-chip">
            {{ tag.name }}
          </md-chip>
        </md-whiteframe>
      </md-layout>
    </md-layout>

    <!-- more -->
    <md-button class="md-raised more-button" @click.native="more" v-if="isNext">more</md-button>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data () {
      return {
        articles: [],
        limit: 5,
        offset: 0,
        isNext: false
      }
    },
    created () {
      this.fetchArticles()
    },
    methods: {
      fetchArticles () {
        console.log('fetch articles')
        fetch(`http://localhost:3000/v1/articles?limit=${this.limit}&offset=${this.offset}`)
          .then(response => response.json())
          .then((json) => {
            console.log(json)
            const articles = json.articles
            if (articles.length > 0) {
              this.articles = this.articles.concat(articles)
            }
            this.limit = json.limit
            this.offset = json.nextOffset
            this.isNext = json.isNext
          })
      },
      more () {
        console.log('more')
        this.fetchArticles()
      }
    }
  }
</script>

<style>
  .article-card {
    width: 100%;
    margin-bottom: 16px;
  }
  .article-whiteframe {
    width: 100%;
    margin-bottom: 16px;
  }
  .tag-chip {
    /*display: block;*/
    /*float: left;*/
    /*width: 10px;*/
  }
  .more-button {
    display: block;
    margin: 10px auto ;
  }
</style>
