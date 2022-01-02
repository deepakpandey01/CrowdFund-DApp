// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.17 <0.6.0;
 

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint min) public{
        address newCampaign=new Campaign(min,msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }

}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;

    modifier restricted() {
        require(msg.sender ==  manager);
        _;
    }

    function setContribution(uint min) public{
        minimumContribution=min;
    }

    function Campaign(uint256 min,address send) public{
        manager=send;
        minimumContribution=min;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender]=true;
        approversCount++;
    }

    function createRequest(string desc,uint val,address rec) public restricted{
        Request memory nrequest=Request({
            description: desc,
            value: val,
            recipient: rec,
            complete: false,
            approvalCount: 0
        });
        requests.push(nrequest);
    }

    function approvalRequest(uint index) public{
        Request storage rq=requests[index];
        require(approvers[msg.sender]);
        require(!rq.approvals[msg.sender]); // already voted then kick
        rq.approvals[msg.sender]=true;
        rq.approvalCount++;
    }

    function finalize(uint index) restricted{
        Request storage rq=requests[index];
        require(rq.approvalCount > (approversCount/2));
        require(!rq.complete);
        rq.complete=true;
        rq.recipient.transfer(rq.value);
    }

}