<template>
  <div>
    <div class="side-menu">
      <md-chip class="tag-chip" v-for="tag in tags" :key="tag.id">
        {{ tag.name }}
      </md-chip>
    </div>
    <div class="main-content">
      <md-layout md-gutter="16">
        <md-layout md-gutter v-for="article in articles" :key="article.id" class="foo" md-flex md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="33">
          <md-whiteframe md-tag="a" :href="article.url" target="_blank"  md-elevation="2" class="article-whiteframe">
            <!--Title-->
            <div class="title">{{ article.title }}</div>
            <!--Image-->
            <img :src="article.thumbnail" alt="Thumbnail">
            <!--PublishedAt-->
            <div class="published_at">{{ article.published_at }}</div>
            <!--Body-->
            <!--<div class="body">{{ article.body }}</div>-->
            <!--Action-->
            <div class="action">
              <md-button class="md-icon-button md-raised md-accent">
                <md-icon>add</md-icon>
              </md-button>
              <md-button class="md-icon-button md-raised">
                <md-icon>add</md-icon>
              </md-button>
            </div>
            <!--Tag-->
            <div class="tag">
              <md-chip v-for="tag in article.tags" :key="tag.id" class="tag-chip">
                {{ tag.name }}
              </md-chip>
            </div>
          </md-whiteframe>
        </md-layout>
      </md-layout>

      <!-- more -->
      <md-button class="md-raised more-button" @click.native="more" v-if="isNext">more</md-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'top',
    data () {
      return {
        articles: [],
        tags: [],
        limit: 5,
        offset: 0,
        isNext: false
      }
    },
    created () {
      this.fetchArticles()
      this.fetchTags()
    },
    methods: {
      fetchArticles () {
        console.log('fetch articles')
        fetch(`http://localhost:3000/v1/articles?limit=${this.limit}&offset=${this.offset}`)
          .then(response => response.json())
          .then((json) => {
            console.log(json)
            const articles = json.articles.map((article) => {
              article.published_at = moment(article.published_at).format('YYYY/M/D a h:mm:ss')
              return article
            })
            if (articles.length > 0) {
              this.articles = this.articles.concat(articles)
            }
            this.limit = json.limit
            this.offset = json.nextOffset
            this.isNext = json.isNext
          })
      },
      fetchTags () {
        console.log('fetch tags')
        fetch(`http://localhost:3000/v1/tags`)
          .then(response => response.json())
          .then((json) => {
            console.log(json)
            this.tags = json.tags
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
  .side-menu {
    float: left;
    padding: 20px 20px 20px 10px;
    max-width: 160px;
  }
  .side-menu ul {
    padding: 0px;
  }
  .article-whiteframe {
    width: 100%;
    margin-bottom: 16px;
    color: black !important;
    text-decoration: none !important;
  }
  .title {
    padding: 10px;
    font-size: 20px;
  }
  .published_at {
    color: lightslategray;
  }
  .body {
    padding: 10px;
    font-size: 12px;
  }
  .action {
    text-align: right;
    padding: 10px;
  }
  .tag {
    padding: 10px;
  }
  .tag-chip {
    margin-left: 5px;
    margin-top: 5px;
  }
  .more-button {
    display: block;
    margin: 10px auto ;
  }
</style>
