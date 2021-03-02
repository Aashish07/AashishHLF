<template lang="pug">
    v-row
        h1 Organisation 2 Register/Login Page
        v-col(md="6" offset-md="2")

            v-text-field(
                label="userName"
                v-model="username"
            )
            
            v-btn(color="success" @click="register") Register 
            v-btn(color="success" @click="login") Login

</template>
<script>
import {mapState} from 'vuex';
export default {
    name: 'RegisterLogin',
    data() {
        return {

        };
    },
    computed:{
        // ...mapState({
        //     organisations : state => state.organisations
        // })
    },
    methods: {
        async register(){
            try{
                const vm= this;
                const response = await vm.$store.dispatch('register',{
                    userName:  vm.username,
                    orgName: 'Org2'
                });
                if(!response.ok){
                    console.log(response.message);
                }else{
                    console.log('User Registration Successfull');
                    vm.$router.push({path:'/home'})
                }                
            }catch(error){
                console.log(error);
            }
        },
        async login (){
            try{
                const vm= this;
                const response = await vm.$store.dispatch('login',{
                    userName:  vm.username,
                    orgName: 'Org2'
                });
                if(!response.ok){
                    console.log(response.message);
                }else{
                    console.log('User Login Successfull');
                    vm.$router.push({path:'/home'})
                }                
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
h1 {
    display: block;
  font-size: 2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 300px;
  margin-right: 0;
  font-weight: bold;
  padding: 20px;
  color: green;
}
</style>