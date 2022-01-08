import React, { useState } from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

function NewCampaign(){
    const [val,setVal]=useState('');
    const [msg,setMsg]=useState('');
    const [loading,setLoading]=useState(false);
    async function onSubmit(event){
        event.preventDefault();
        setLoading(true);
        setMsg('');
        try{
            const accounts=await window.ethereum.request({ method: "eth_requestAccounts" });
            await factory.methods.createCampaign(val).send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        }catch(err){
            setMsg(err.message);
        }
        setVal('');
        setLoading(false);
    }
    return <Layout>
        <h2 style={{color: 'white'}}>Create a Campaign</h2>
        <Form onSubmit={onSubmit} error={!!msg}>
            <Form.Field>
                <label style={{color: 'white'}}>Minimum Contribution</label>
                <Input label="wei" labelPosition="right" value={val} onChange={item => {
                    setVal(item.target.value);
                }} />
            </Form.Field>
            <Message error header="Oops!" content={msg} />
            <Button content="Create" icon="add square" primary />
        </Form>
    </Layout>
}
export default NewCampaign;