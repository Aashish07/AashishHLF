const { Gateway, Wallets, } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')


const helper = require('./helper')

const query = async (channelName, chaincodeName, cName, fcnName, username, org_name) => {
    try{
        console.log('inside query/js');
        // load the network configuration
        // const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-org1.json');
        // const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
        const ccp = await helper.getCCP(org_name) //JSON.parse(ccpJSON);

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) //.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }


        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        if(fcnName == "readPrivateTrade"){
            result = await contract.evaluateTransaction(fcnName, cName);
        }

        //console.log(result);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        result = JSON.parse(result.toString());
        return result;

    }catch(error){
        console.log(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}

const queryId = async (channelName, chaincodeName, cName, fcnName,tradeId, username, org_name) => {
    try{
        console.log('inside query/js');
        // load the network configuration
        // const ccpPath = path.resolve(__dirname, '..', 'config', 'connection-org1.json');
        // const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
        const ccp = await helper.getCCP(org_name) //JSON.parse(ccpJSON);

        // Create a new file system based wallet for managing identities.
        const walletPath = await helper.getWalletPath(org_name) //.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }


        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);

        if(fcnName == "readPrivateTradebyId"){
            result = await contract.evaluateTransaction(fcnName, cName, tradeId);
        }
        console.log('outside');
        //console.log(result);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

       // var abc = [{"amount":"456","fromParty":"Org1","status":"SUBMITTED","toParty":"Org3","tradeDate":"03/01/2021","tradeId":"le7844zk7l"},{"amount":"123","fromParty":"Org1","status":"SUBMITTED","toParty":"Org3","tradeDate":"03/01/2021","tradeId":"nhwtujr9my"},{"amount":"456","fromParty":"Org1","status":"SUBMITTED","toParty":"Org3","tradeDate":"03/01/2021","tradeId":"s7tv2rpzbn"}];
        //result = JSON.stringify(abc);
        //console.log('abc', abc);

        result = JSON.parse(result.toString());
        return result;
    }catch(error){
        console.log(`Failed to evaluate transaction: ${error}`);
        return error.message
    }
}
exports.query = query;

module.exports = {
    query : query,
    queryId : queryId
}