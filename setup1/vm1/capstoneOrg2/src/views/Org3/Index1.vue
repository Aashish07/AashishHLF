<template lang="pug">
    v-app
      v-app-bar(app color="primary" dark)
      v-navigation-drawer(app floating)
          v-list-item
            v-list-item-content
              v-list-item-title(class="title") Organisation 2

          v-divider

          v-list(
            dense
            nav
          )
            v-list-item(link to="/home")
              v-list-item-content Home
            v-list-item(link to="/Org1")
              v-list-item-content Organisation1
            v-list-item(link to='/Org3')
              v-list-item-content Organisation3
            v-list-item(link to='/create')
              v-list-item-content Create
            v-list-item(link to="/search")
              v-list-item-content Search
      div
        v-data-table(
            :headers="headers"
            :items="trades"
            :items-per-page="10"
            class="elevation-1"
        )
          template(v-slot:item.actions="{ item }")
            router-link(:to="'/updateOrg3/' + item.tradeId") Update
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
    name:'Organisation3',
    data(){
      return{
        headers:[
          { text: 'Id', value:''},
          { text: 'Id', value:''},
          { text: 'Id', value:'Id'},
          { text: 'TradeId', value:'tradeId'},
          { text: 'FromParty', value:'fromParty'},
          { text: 'ToParty', value:'toParty'},
          { text: 'Amount', value:'amount'},
          { text: 'Status', value:'status'},
          { text: 'TransactionDate', value:'tradeDate'},
          { text: 'Actions',  value: 'actions', sortable: false }
        ]
      };
    },
    computed: {
      ...mapState({
        trades : state => state.trades
      })
    },
    methods: {
      async fetchdata(){
        await this.$store.dispatch('fetchOrg3trades');
      }
    },
    mounted(){
      this.fetchdata();
    }
}
</script>
<style scoped>
div {
    padding-top: 18px;
}

</style>