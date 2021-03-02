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
            v-list-item(link to="/Org3")
              v-list-item-content Organisation3
            v-list-item(link to="/create")
              v-list-item-content Create 
            v-list-item(link to="/search")
              v-list-item-content Search
      div  
          v-row

            v-col(md="6" offset-md="2")
                v-text-field(
                        label="TradeId"
                        v-model="tradeId"
                    )
                v-select(
                    label="Organisations"
                    v-model="toParty"
                    :items="organisations"
                    item-text="orgName"
                    item-value='orgName'
                )    
                v-btn(color="success" @click="search") Search

            v-row(v-if="type === true")

                v-col(md="6" offset-md="2")
            
                    v-text-field(
                        label="From (Orgnisation)"
                        v-model="fromP"
                    )
                    v-text-field(
                        label="To (Organisation)"
                        v-model="toP"
                    )
                    v-text-field(
                        label="Amount (Rs)"
                        v-model="amount"
                    )
                    v-text-field(
                        label="Trade Date"
                        v-model="tradeDate"
                    )
                

                    v-text-field(
                        label="Status"
                        v-model="status"
                    )
                    

            v-row(v-if="error === true")
                    br
                    br
                    p TradeId not present
                    
                
    
</template>
<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            type : false,
            error: false
        }
    },
    methods: {
         async search(){
            const vm = this;
            const response = await vm.$store.dispatch('search',{
                TradeId : vm.tradeId,
                orgName1 : 'Org2',
                orgName2 : vm.toParty                
            })
            console.log(response);
            if ( response.fromParty ){
                vm.fromP = response.fromParty;
                vm.toP = response.toParty;
                vm.amount = response.amount;
                vm.tradeDate = response.tradeDate;
                vm.status = response.status;
                vm.type = true;

            }
            else{
                console.log('Inside else part')
                vm.error = true;
            }
            if(response = undefined){
                console.log('Inside undefined part')
                vm.error = true;
            }
        }
    },
    computed: {
        ...mapState({
            organisations : state => state.organisations
        })
    }
}
</script>
<style scoped>
div {
    padding-top: 18px;
}
p {
    padding-top: 40px;
}
</style>