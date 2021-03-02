<template lang="pug">

    v-app
      v-app-bar(app color="primary" dark)
      v-navigation-drawer(app floating)
          v-list-item
            v-list-item-content
              v-list-item-title(class="title") Organisation 3

          v-divider

          v-list(
            dense
            nav
          )
            v-list-item(link to="/home")
              v-list-item-content Home
            v-list-item(link to="/Org1")
              v-list-item-content Organisation1
            v-list-item(link to="/Org2")
              v-list-item-content Organisation2
            v-list-item(link to="/create")
              v-list-item-content Create 
            v-list-item(link to="/search")
              v-list-item-content Search
      v-content
        v-container(fluid)
          v-row(class="fill-height")
            v-col
              transition(name="fade")
                router-view

</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Home",data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Photos', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
  
};
</script>
