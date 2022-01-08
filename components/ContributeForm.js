import React, { useState } from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from "../ethereum/web3";
import {Router} from '../routes';

function Contribute(props){
    const [val,setVal]=useState('');
    const [msg,setMsg]=useState('');
    const [loading,setLoading]=useState(false);

    async function onSubmit(event){
        event.preventDefault();
        const campaign1=Campaign(props.address);
        setLoading(true);
        setMsg('');
        try{
            const accounts=await window.ethereum.request({ method: "eth_requestAccounts" });
            await campaign1.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(val,'ether')
            });
            Router.replaceRoute(`/campaigns/${props.address}`);
        }catch(err){
            setMsg(err.message);
        }
        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit} error={!!msg}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input label="ether" labelPosition="right" value={val} onChange={item => {
                    setVal(item.target.value);
                }} />
            </Form.Field>
            <Message error header="Oops!" content={msg} />
            <Button loading={loading} primary>Contribute</Button>
        </Form>
    )
}
export default Contribute;