<template>
  <div class="side_menu">
    <router-link :to="{ name: 'tag_articles', params: { tagName: tag.name }}" v-for="tag in tags" :key="tag.id">
      <md-chip class="tag-chip" v-bind:class="{ 'md-primary': $route.params.tagName === tag.name }">
        {{ tag.name }}
      </md-chip>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'tags',
    props: ['tags']
  }
</script>
