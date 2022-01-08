import React, {useState} from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import Campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';

function NewRequest(props){
    const [val,setVal]=useState('');
    const [desc,setDesc]=useState('');
    const [addr,setAddr]=useState('');
    const [msg,setMsg]=useState('');
    const [loading,setLoading]=useState(false);
    async function onSubmit(event){
        event.preventDefault();
        setLoading(true);
        setMsg('');
        const campaign=Campaign(props.address);
        try{
            const accounts=await window.ethereum.request({ method: "eth_requestAccounts" });
            await campaign.methods.createRequest(desc,
                web3.utils.toWei(val,'ether'),
                addr).send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        }catch(err){
            setMsg(err.message);
        }
        setLoading(false);
    }

    return <Layout>
        <h2 style={{color: 'white'}}>Create a Request</h2>
        <Form onSubmit={onSubmit} error={!!msg}>
            <Form.Field>
                <label style={{color: 'white'}}><h3>Description</h3></label>
                <Input  value={desc} onChange={item => {
                    setDesc(item.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label style={{color: 'white'}}><h3>Value</h3></label>
                <Input label="ether" labelPosition="right" value={val} onChange={item => {
                    setVal(item.target.value);
                }} />
            </Form.Field>
            <Form.Field>
                <label style={{color: 'white'}}><h3>Recipient Address</h3></label>
                <Input value={addr} onChange={item => {
                    setAddr(item.target.value);
                }} />
            </Form.Field>
            <Message error header="Oops!" content={msg} />
            <Button loading={loading} primary>Create</Button>
        </Form>
    </Layout>
}

NewRequest.getInitialProps= async (ctx) => {
    const {address}=ctx.query;
    return {address};
}

export default NewRequest;