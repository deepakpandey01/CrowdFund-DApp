import React,{useState} from "react";
import { Button, Table } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Campaign from '../ethereum/campaign';


function RequestRow(props){
    const {Header, Row, Cell, Body}=Table;
    const {id,request,address,approvercnt}=props;

    const [msg,setMsg]=useState('');
    const [loading,setLoading]=useState(false);

    const readyTofinalize= request.approvalCount > 0;

    async function onApprove(){
        setLoading(true);
        setMsg('');
        const campaign=Campaign(address);
        try{
            const accounts=await window.ethereum.request({ method: "eth_requestAccounts" });
            await campaign.methods.approvalRequest(id).send({
                from: accounts[0]
            });
        }catch(err){
            setMsg(err.message);
        }
        setLoading(false);
    }

    async function onFinalize(){
        setLoading(true);
        setMsg('');
        const campaign=Campaign(address);
        try{
            const accounts=await window.ethereum.request({ method: "eth_requestAccounts" });
            await campaign.methods.finalize(id).send({
                from: accounts[0]
            });
        }catch(err){
            setMsg(err.message);
        }
        setLoading(false);
    }

    return <Row positive={readyTofinalize && !request.complete}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.complete ? null :  `${request.approvalCount}/${approvercnt}`}</Cell>
        <Cell>
            {request.complete ? null : (
            <Button color="green" basic onClick={onApprove}>Approve</Button>
            )}
        </Cell>
        <Cell>
            {request.complete ? <h3 style={{color: 'green'}}>Completed</h3>: (
            <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
            )}
        </Cell>
    </Row>
}

export default RequestRow;