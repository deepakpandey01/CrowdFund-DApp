const HDWalletProvider=require("@truffle/hdwallet-provider");
const Web3=require('web3');
const compiledFactory=require('./build/CampaignFactory.json');

const provider=new HDWalletProvider(
    'regular art extend piece enter improve wage ice ensure weasel fetch ready',
    'https://rinkeby.infura.io/v3/30c4a18ffb4a4b6fa85deee7f648a957'
);

const web3=new Web3(provider);

let accounts;

async function deploy(){
    accounts=await web3.eth.getAccounts();

    const inbox=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({from: accounts[0],gas: "1000000"});

    console.log("Account deployed to ",inbox.options.address)
    provider.engine.stop();
}
deploy();