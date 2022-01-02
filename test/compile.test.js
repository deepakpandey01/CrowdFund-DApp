const assert=require('assert');
const ganache=require('ganache-cli');
const Web3=require('web3');
const web3=new Web3(ganache.provider());

const compiledFacttory=require('../ethereum/build/CampaignFactory.json');
const compiledCampaign=require('../ethereum/build/Campaign.json');

let accounts;
let campaignAddress;
let campaign;
let factory;

beforeEach(async () => {
    accounts=await web3.eth.getAccounts();
    factory=await new web3.eth.Contract(JSON.parse(compiledFacttory.interface))
    .deploy({data: compiledFacttory.bytecode})
    .send({from: accounts[0],
        gas:'1000000'
    });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    })
    // console.log(factory.options);
    const addresses=await factory.methods.getDeployedCampaigns().call();
    campaignAddress=addresses[0];

    campaign=await new web3.eth.Contract(JSON.parse(compiledCampaign.interface),campaignAddress);

});

describe("Campaign Test", () => {
    it("deploys a factory and campaign", () => {
        assert.ok(factory.options.address);
    });

    it("Campaign Manager address",async () => {
        const manager=await campaign.methods.manager().call();
        assert.equal(manager,accounts[0]);
    });

    it("send money and check approver list", async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });
        const check=await campaign.methods.approvers(accounts[1]).call();
        assert(check);
    });

    it("Check minimum contribution",async () => {
        try{
            await campaign.methods.contribute().send({
                value: '5',
                from: accounts[2]
            });
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    it("Create Request", async () => {
        await campaign.methods.createRequest("Buy batteries",'100',accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });
        const request=await campaign.methods.requests(0).call();
        assert.equal("Buy batteries",request.description);
    })

    it("Process Request", async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10",'ether')
        });
        await campaign.methods.createRequest("Buy batteries",web3.utils.toWei("5","ether"),accounts[1]).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approvalRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalize(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balance=await web3.eth.getBalance(accounts[1]);
        balance=web3.utils.fromWei(balance,'ether');
        balance=parseFloat(balance);
        assert(balance > 104);
    })

});
