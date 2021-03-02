import Vue from 'vue'
import Vuex from 'vuex'
import * as moment from 'moment'

const baseURL = 'http://localhost:4000';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    trades:[],
    organisations:[
      {id:2,orgName:'Org1'},
      {id:3,orgName:'Org2'}
    ]
  },
  mutations: {},
  actions: {
    async register({state},newItem){
      try{
        console.log('Inside register action');
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        };
        const response = await fetch(`${baseURL}/register/`,options);
        const data = await response.json();
        return data;
      }catch(error){
        this.errMessage = error;
        console.error('There was an error!',error);
      }
    },
    async login({state},newItem){
      try{
        console.log('Inside login action');
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItem)
        };
        const response = await fetch(`${baseURL}/login/`,options);
        const data = await response.json();
        return data;
      }catch(error){
        this.errMessage = error;
        console.error('There was an error!',error);
      }
    },
    async fetchOrg3trades({state}){
      try{
        console.log('Inside fetchOrg3trades action');
        const fncName = "readPrivateTrade";
        const orgName = "Org3"
        const cName = "collectionTx23";
        const response = await fetch(`${baseURL}/fetchPrivatetrade/${fncName}/${cName}/${orgName}/`);
        const data = await response.json();
        console.log('Data is',data.message);
        state.trades = data.message || [];
        console.log('trades are' ,state.trades);
        return ;
      }catch(error){
        this.errMessage = error;
        console.error('There was an error!',error);
      }
    },
    async fetchOrg2trades({state}){
      try{
        console.log('Inside fetchOrg2trades action');
        const fncName = "readPrivateTrade";
        const cName = "collectionTx13";
        const orgName = "Org3"
        const response = await fetch(`${baseURL}/fetchPrivatetrade/${fncName}/${cName}/${orgName}/`);
        const data = await response.json();
        console.log('Data is',data.message);
        state.trades = data.message || [];
        console.log('trades are' ,state.trades);
      }catch(error){
        this.errMessage = error;
        console.error('There was an error!',error);
      }
    },
     async create({state},newItem){
      console.log('Inside create store');
      newItem.FromParty = 'Org3'
      newItem.Status = 'SUBMITTED'
      newItem.TransactionDate = moment().format('MM/DD/YYYY')
      newItem.fcn = "createPrivateTrade"
      console.log(newItem);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      };

      const response = await fetch(`${baseURL}/create/`,options);
      const data = await response.json();
      return Promise.resolve();
    },
    async fetchTradeId ({ state }, args ){
      console.log('Insde fetchTradeId');
      var id = args.id;
      var orgName = args.orgName;
      var fncName = args.fncName;
      console.log(orgName);
      console.log(fncName);
      const response = await fetch(`${baseURL}/fetchPrivatetradebyId/${fncName}/${orgName}/${id}/`);
      const data = await response.json();
      console.log('Data is', data.message);
      return data.message ;
    },
    async update({state},item){
      console.log('Inside update function');
      console.log(item.TradeId);
      console.log(item.Status);
      item.fcn = "updatePrivateData";

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      };
      const response = await fetch(`${baseURL}/update/`,options);
      const data = await response.json();
      console.log('Data is ',data);
      return Promise.resolve();      
    },
    async search({state},item){
      console.log('Inside search function');
      const tradeId = item.TradeId;
      const orgName1 = item.orgName1;
      const orgName2 = item.orgName2;
      console.log(tradeId);
      console.log(orgName1);
      console.log(orgName2);
      const response = await fetch(`${baseURL}/search/${orgName1}/${orgName2}/${tradeId}`);
      const data = await response.json();
      console.log('Data is', data.message);
      return data.message ;       
    },
  },
  modules: {
  }
})
