'use strict';
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const cors = require('cors')
const path=require('path');
const app = express();
app.options('*',cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const helper = require('./app/helper');
const invoke = require('./app/invoke');
const query = require('./app/query');
const { type } = require('os');

logger.level = 'debug';

function getErrorMessage(field){
    var response = {
        success: false,
        message: field + ' field is missing on invalid in the request'
    };
    console.log(response);
    return response;
}

app.post('/register/',async (req,res) => {
    var username = req.body.userName;
    console.log(req.body);
    var orgName = req.body.orgName;
    console.log("Inside register");

    if(!username){
        console.log("true");
        res.status(500).send(getErrorMessage('userName'))
        return ;
    }

    if(!orgName){
        res.status(500).send(getErrorMessage('orgName'))
        return ;
    }

    let response =  await helper.getRegisteredUser(username, orgName);
    console.log('-- returned from registering the username %s for organization %s', username, orgName);

    logger.debug('-- returned from registering the username %s for organization %s', username, orgName);
    if (response && typeof response !== 'string') {
        logger.debug('Successfully registered the username %s for organization %s', username, orgName);
        response.ok = true;
        res.json(response);
    } else {
        logger.debug('Failed to register the username %s for organization %s with::%s', username, orgName, response);
        res.status(500).send({ success: false, message: response });
    }
 });

 app.post('/login/',async(req,res)=>{
    var username = req.body.userName;
    console.log(req.body);
    var orgName = req.body.orgName;
    console.log("Inside login");

    if(!username){
        console.log("true");
        res.status(500).send(getErrorMessage('userName'))
        return ;
    }

    if(!orgName){
        res.status(500).send(getErrorMessage('orgName'))
        return ;
    }

    let response = await helper.isUserRegistered(username, orgName);

    logger.debug('-- returned from checking username %s existence for organization %s', username, orgName);
    if (response && typeof response !== 'string') {
        logger.debug('Successfully Logged in for username %s for organization %s', username, orgName);
        console.log(response);
        response.ok = true;
        res.json(response);
    } else {
        logger.debug('Failed to log in  the username %s for organization %s with::%s', username, orgName, response);
        res.status(500).send({ success: false, message: response });
    }
 });

app.get('/fetchPrivatetrade/:fncName/:cName/:orgName/',async (req,res) => {
    // console.log('I am here');
    try{
        logger.debug('Inside fetchPrivatetrade');
        const cName = req.params.cName;
        const fcnName = req.params.fncName;
        const orgName = req.params.orgName;
        const channelName = "mychannel";
        const chaincodeName = "fabtxn";
    
        logger.debug('channelName : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn : ' + fcnName);
        logger.debug('args : ' + cName);


        if (!chaincodeName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!channelName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!fcnName) {
            res.status(500).send(getErrorMessage('fcnName'))
            return;
        }
        if (!cName) {
            res.status(500).send(getErrorMessage('cName'))
            return;
        }
        console.log('going inside query');
        let message = await query.query(channelName, chaincodeName, cName, fcnName, 'ishan', orgName);
        console.log('Coming with message');

        var msg = JSON.stringify({ ...message })
        // var msg = message.reduce((json, value, key) => { json[key] = value; return json; }, {});
        // var msg = Object.keys(message).map((key) => [Number(key), message[key]]);
        console.log(msg);

        const response_payload = {
        result: message,
        error: null,
        errorData: null
        }
        //res.json(message);
        res.json({message : message});
    }catch(error){
        const response_payload = {
            result: null,
            error: error.name,
            errorData: error.message
        }
    }
});

app.post('/create',async(req,res) => {
    //As we are dealing with private data, we need to get the transient value
    var request = req.body;
    console.log(request);

    var fromP = req.body.FromParty;
    var toP = req.body.ToParty;
    var amount = req.body.Amount;
    var status = req.body.Status;
    var txDate = req.body.TransactionDate;
    const channelName = "mychannel";
    const chaincodeName = "fabtxn";
    var fcn = req.body.fcn;
    console.log(`function name is ${fcn}`);

    var i = Math.random().toString(36).slice(2);
    var tradeid = i.substring(0,10);

    var trade = {
        tradeId : tradeid,
        fromParty : fromP,
        toParty : toP,
        amount : amount,
        tradeDate : txDate,
        status : status,
    }
    var trading = {trade : trade};

    const transient = JSON.stringify(trading);

    let message = await invoke.invokeTransaction(channelName, chaincodeName, fcn,'ishan', fromP,transient);
        console.log(`message result is : ${message}`)

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }
        res.send(response_payload);
})

app.get('/fetchPrivatetradebyId/:fncName/:orgName/:tradeId',async (req,res) => {
    try{
        logger.debug('Inside /fetchPrivatetradebyId');
        const orgName = req.params.orgName;
        const cName = req.params.fncName;
        const tradeId = req.params.tradeId;
        const fcnName = 'readPrivateTradebyId';

        // console.log(orgName);
        // console.log(fncName);
        // console.log(tradeId);


        const channelName = "mychannel";
        const chaincodeName = "fabtxn";
    
        // logger.debug('channelName : ' + channelName);
        // logger.debug('chaincodeName : ' + chaincodeName);
        // logger.debug('fcn : ' + fcnName);
        // logger.debug('args : ' + cName);


        if (!chaincodeName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!channelName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!fcnName) {
            res.status(500).send(getErrorMessage('fcnName'))
            return;
        }
        if (!cName) {
            res.status(500).send(getErrorMessage('cName'))
            return;
        }
        let message = await query.queryId(channelName, chaincodeName, cName, fcnName,tradeId, 'ishan', orgName);

        console.log('message is ', message);

        const response_payload = {
        result: message,
        error: null,
        errorData: null
        }
        //res.json(message);
        res.json({message : message});
        //res.json(message.response_payload);
    }catch(error){
        const response_payload = {
            result: null,
            error: error.name,
            errorData: error.message
        }
    }
});

app.post('/update',async(req,res) => {
    //As we are dealing with private data, we need to get the transient value
    console.log('We have reached update');
    var request = req.body;
    console.log(request);
    var tradeid = req.body.TradeId;
    var fromP = req.body.FromParty;
    var toP = req.body.ToParty;
    var amount = req.body.Amount;
    var status = req.body.Status;
    var txDate = req.body.TradeDate;
    const channelName = "mychannel";
    const chaincodeName = "fabtxn";
    var fcn = req.body.fcn;
    console.log(`function name is ${fcn}`);

    // var i = Math.random().toString(36).slice(2);
    // var tradeid = i.substring(0,10);

    var trade = {
        tradeId : tradeid,
        fromParty : fromP,
        toParty : toP,
        amount : amount,
        tradeDate : txDate,
        status : status,
    }
    var trading = {trade : trade};

    const transient = JSON.stringify(trading);
    console.log('transient value is ',transient);
    let message = await invoke.invokeTransaction(channelName, chaincodeName, fcn,'ishan', fromP,transient);
        console.log(`message result is : ${message}`)

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }
        res.send(response_payload);
})

app.get('/search/:orgName1/:orgName2/:tradeId',async (req,res) => {
    try{
        logger.debug('Inside /search');
        const org1 = req.params.orgName1;
        const org2 = req.params.orgName2;
        const tradeId = req.params.tradeId;
        const fcnName = 'readPrivateTradebyId';
        console.log(tradeId);

        let cName;

        if((org1 == 'Org1' && org2 == 'Org2' ) || (org1 == 'Org2' && org2 == 'Org1')){
            cName = 'collectionTx12';

        }else if((org1 == 'Org1' && org2 == 'Org3' ) || (org1 == 'Org3' && org2 == 'Org1')){
            cName = 'collectionTx13';

        }else if((org1 == 'Org2' && org2 == 'Org3' ) || (org1 == 'Org3' && org2 == 'Org2')){
            cName = 'collectionTx23';

        }


        const channelName = "mychannel";
        const chaincodeName = "fabtxn";
    
        logger.debug('channelName : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn : ' + fcnName);

        if (!chaincodeName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!channelName) {
            res.status(500).send(getErrorMessage('chaincodeName'))
            return;
        }
        if (!fcnName) {
            res.status(500).send(getErrorMessage('fcnName'))
            return;
        }

        console.log('cname is ',cName);
        let message = await query.queryId(channelName, chaincodeName, cName, fcnName,tradeId, 'ishan', org1);
        console.log('message is ', message);

        const response_payload = {
        result: message,
        error: null,
        errorData: null
        }
        //res.json(message);
        res.json({message : message});

    }catch(error){
        const response_payload = {
            result: error,
            error: null,
            errorData: null
        }
    }
    //res.send(response_payload);
});

app.listen(4000,()=>{
    console.log('Server is running at port 4000');
});