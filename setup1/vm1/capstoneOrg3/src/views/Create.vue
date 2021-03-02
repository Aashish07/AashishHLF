<template lang="pug">
    div
        v-toolbar
            v-toolbar-title Organisation 3

            v-toolbar-items
                //- v-btn(text to="/") Register/Login
                v-btn(text to="/home") Home
                v-btn(text to="/create") Create
                v-btn(text to="/search") Search

        br     
        v-row

            v-col(md="6" offset-md="2")
            
                v-select(
                    label="ToParty"
                    v-model="toParty"
                    :items="organisations"
                    item-text="orgName"
                    item-value='orgName'
                )
            

                v-text-field(
                    label="Amount (Rs)"
                    v-model="amount"
                )

                //- span {{raw_resource_types}}
                v-btn(color="success" @click="create") Create
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'create',
    data() {
        return {};
    },
    methods:{
        async create(){
            const vm = this;
            console.log(vm.toParty);
            console.log(vm.amount);
            await vm.$store.dispatch('create',{
                ToParty: vm.toParty,
                Amount: vm.amount,
            })

            vm.$router.push({path:'/home'})
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

</style>