<template>
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
</template>

<script>
  export default {
    name: 'articles',
    props: ['articles']
  }
</script>
