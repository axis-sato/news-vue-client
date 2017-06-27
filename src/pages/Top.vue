<template>
  <div>
    <tags :tags="tags"></tags>
    <div class="main-content">
      <loading :is-show="loading.article"></loading>
      <md-layout md-gutter="16">
        <md-layout md-gutter v-for="article in articles" :key="article.id" class="foo" md-flex md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="33">
          <md-whiteframe md-elevation="2" class="article_whiteframe">
            <div>
              <a :href="article.url" target="_blank" class="article_link"></a>
              <!--Title-->
              <div class="title">{{ article.title }}</div>
              <!--Image-->
              <img :src="article.thumbnail" class="thumbnail" alt="Thumbnail">
              <!--PublishedAt-->
              <div class="published_at">{{ article.published_at }}</div>
              <!--Body-->
              <!--<div class="body">{{ article.body }}</div>-->
              <!--Action-->
              <div class="action">
                <md-button class="md-icon-button md-raised md-accent">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </div>
            <!--Tag-->
            <div class="tag">
              <router-link :to="{ name: 'tag_articles', params: { tagName: tag.name }}" v-for="tag in article.tags" :key="tag.id">
                <md-chip class="tag-chip" v-bind:class="{ 'md-primary': $route.params.tagName === tag.name }">
                  {{ tag.name }}
                </md-chip>
              </router-link>
            </div>
          </md-whiteframe>
        </md-layout>
      </md-layout>

      <!-- more -->
      <md-button class="md-raised more_button" @click.native="more" v-if="isNext">more</md-button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Tags from '../components/Tags'
  import Loading from '../components/Loading'

  export default {
    name: 'top',
    data () {
      return {
        articles: [],
        tags: [],
        limit: 5,
        offset: 0,
        isNext: false,
        loading: {
          article: false,
          tag: false
        }
      }
    },
    components: {
      Tags, Loading
    },
    created () {
      this.fetchArticles()
      this.fetchTags()
      console.log(this.$route.params.tagName)
    },
    watch: {
      '$route': function () {
        console.log(this.$route.params.tagName)
        this.refreshData()
        this.fetchArticles(this.$route.params.tagName)
      }
    },
    methods: {
      refreshData () {
        this.articles = []
        this.limit = 5
        this.offset = 0
        this.isNext = false
        this.loading = {
          article: false,
          tag: false
        }
      },
      fetchArticles (tagName = undefined, loading = true) {
        console.log('fetchArticles')

        this.loading.article = (true && loading)

        let baseUrl = 'http://localhost:3000/v1/articles'
        if (tagName !== undefined) {
          baseUrl += `/tag/${tagName}`
        }

        fetch(`${baseUrl}?limit=${this.limit}&offset=${this.offset}`)
          .then(response => response.json())
          .then((json) => {
            this.loading.article = false
//            console.log(json)
            const articles = json.articles.map((article) => {
              article.published_at = moment(article.published_at).format('YYYY/M/D a h:mm:ss')
              article.thumbnail = article.thumbnail ? article.thumbnail : '/static/img/noimage.png'
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
        this.loading.tag = true
        fetch(`http://localhost:3000/v1/tags`)
          .then(response => response.json())
          .then((json) => {
            this.loading.tag = false
//            console.log(json)
            this.tags = json.tags
          })
      },
      more () {
        console.log('more')
        this.fetchArticles(this.$route.params.tagName, false)
      }
    }
  }
</script>

<style>
  .side_menu {
    float: left;
    padding: 20px 20px 20px 10px;
    max-width: 160px;
  }
  .side_menu ul {
    padding: 0px;
  }
  .article_whiteframe {
    width: 100%;
    margin-bottom: 16px;
  }
  .article_link {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .thumbnail {
    width: 100%;
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
    color: black;
  }
  .md-theme-default.md-chip.md-primary {
    color: rgba(255, 255, 255, .87);
    background-color: #2196f3;
  }
  .more_button {
    display: block;
    margin: 10px auto ;
  }

  .spinner_wrapper {
    text-align: center;
    padding: 20px 0;
  }
</style>
