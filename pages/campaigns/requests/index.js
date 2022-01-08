import React from "react";
import { Form, Button, Input, Message, Table } from 'semantic-ui-react';
import Layout from "../../../components/Layout";
import Campaign from '../../../ethereum/campaign';
import {Link, Router} from '../../../routes';
import RequestRow from "../../../components/RequestRow";


function Requests(props){
    const {Header, Row, HeaderCell, Body}=Table;

    function renderRow(){
        return props.requests.map((element,index) => {
            return <RequestRow 
                key={index}
                id={index}
                request={element}
                address={props.address}
                approvercnt={props.approverCount}
             />
        })
    }

    return <Layout>
        <h1 style={{color: 'white'}}>Requests</h1>
        <Link route={`/campaigns/${props.address}/requests/new`}>
            <a className='item'>
                <Button floated="right" style={{marginBottom: 10}} content="Add Request" primary />
            </a>
        </Link>
        <Table>
            <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approval Count</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                </Row>
            </Header>
            <Body>
                {renderRow()}
            </Body>
        </Table>
        <div>Found {props.requestCount} requests.</div>
    </Layout>
};

Requests.getInitialProps= async (ctx) => {
    const {address}=ctx.query;
    const campaign=Campaign(address);
    const requestCount=await campaign.methods.getRequestCount().call();
    const approverCount=await campaign.methods.approversCount().call();
    const requests=await Promise.all(Array(parseInt(requestCount))
        .fill()
        .map((element,index) => {
            return campaign.methods.requests(index).call();
        })
    );
    return {address,requestCount,requests,approverCount};
}

export default Requests;