<template lang="pug">
    div
        v-toolbar
            v-toolbar-title Organisation 3

            v-toolbar-items
                //- v-btn(text to="/") Register/Login
                v-btn(text to="/home") Home
                v-btn(text to="/create") Create
                v-btn(text to="/update") Update

        br     
        v-row

            v-col(md="6" offset-md="2")
                v-text-field(
                    label="TradeId"
                    v-model="tradeId"
                    readonly
                )

                v-text-field(
                    label="FromParty"
                    v-model="fromParty"
                    readonly
                )
                v-text-field(
                    label="ToParty"
                    v-model="toParty"
                    readonly
                )

                v-text-field(
                    label="Amount"
                    v-model="amount"
                    readonly
                )

                v-text-field(
                    label="Trade Date"
                    v-model="tradeDate"
                    readonly
                )

                v-text-field(
                    label="Status"
                    v-model="status"
                )

                //- span {{raw_resource_types}}
                v-btn(color="success" @click="update") Update
                v-btn(color="success" link to="/Org2") Back
</template>
<script>
export default {
    name: 'UpdateOrg3',
    data() {
        return {
            fromParty: "",
            toParty: "",
            amount: "",
            status: ""
        };
    },
    methods:{
        async update(){
            const vm = this;
            await vm.$store.dispatch('update',{
                TradeId: vm.$route.params.id,
                Status: vm.status,
                FromParty: vm.fromParty,
                ToParty: vm.toParty,
                Amount: vm.amount,
                TradeDate: vm.tradeDate
            })

            vm.$router.push({path:'/Org2'})
        }
    },
    async mounted(){
        const vm = this;
        const data = await vm.$store.dispatch('fetchTradeId',{
            id : vm.$route.params.id,
            orgName: 'Org3',
            fncName: 'collectionTx23'
        })
        console.log("Inside mounted function", );
        vm.fromParty = data.fromParty
        vm.toParty = data.toParty
        vm.amount = data.amount
        vm.status = data.status
        vm.tradeId = data.tradeId
        vm.tradeDate = data.tradeDate
    }

}
</script>
