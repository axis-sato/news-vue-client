<template>
  <div>
    <md-layout md-gutter="8">
      <md-layout md-gutter v-for="n in 10" class="foo" md-flex md-flex-xsmall="100" md-flex-small="50" md-flex-medium="33" md-flex-large="33">
        <md-card>
          <md-card-media md-ratio="16:9">
            <img src="https://avatars3.githubusercontent.com/u/1905224?v=3&u=7d8ae04d1ed853b7c95b0bc140eb6da137602dc9&s=200" alt="People">
          </md-card-media>

          <md-card-header>
            <div class="md-title">Title goes here</div>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-icon-button md-raised md-accent">
              <md-icon>add</md-icon>
            </md-button>
          </md-card-actions>
          <md-card-content>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio.
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
  export default {
    name: 'top'
  }
</script>
