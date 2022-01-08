import React from "react";
import Campaign from '../../ethereum/campaign';
import Layout from "../../components/Layout";
import { Card, Button, Grid } from 'semantic-ui-react';
import web3 from "../../ethereum/web3";
import Contribute from "../../components/ContributeForm";
import {Link} from '../../routes';

function ShowDetail(props){

    function RenderItem(){
        const {minCont,balance,requestsCount,approversCount,manager}=props;
        // console.log(manager);
        const item=[
            {
                header: manager,
                meta: "Address of Manager",
                description: "The manager created this Campaign and create requests to withdraw money.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minCont,
                meta: "Minimum Contribution in wei",
                description: "You should contribute at least this much wei to become an approver."
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description: "A request try to withdraw money from Contract. Given request must be approved by approvers"
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description: "Number of people who have already contributed to this campaign"
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Campaign Balance (ether)',
                description: "The balance is how much money this campaign has left to spend "
            }
        ];
        return <Card.Group items={item} />;
    }

    return <Layout>
        <h2 style={{color: 'white'}}>Camapaign</h2>
        <Grid>
            <Grid.Row>
                <Grid.Column width={10}>
                    {RenderItem()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <Contribute address={props.address} />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                <Link route={`/campaigns/${props.address}/requests`}><a className='item'>
                        <Button content="View Requests" primary />
                    </a>
                </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Layout>
};

ShowDetail.getInitialProps= async (ctx) => {
    const campaign=Campaign(ctx.query.address);
    const summary=await campaign.methods.getSummary().call();
    return {
        address: ctx.query.address,
        minCont: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}

export default ShowDetail;