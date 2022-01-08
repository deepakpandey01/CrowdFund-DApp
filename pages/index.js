import React, {useState, useEffect} from 'react';
import Contract from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card, Button, Menu } from 'semantic-ui-react';
import {Link} from '../routes';
import 'semantic-ui-css/semantic.min.css'


function Hello(props){

    function RenderItem(){
        const item=props.campaigns.map(address => {
            return {
                header: address,
                description: <Link route={`/campaigns/${address}`}>
                        <a className='item'>Visit</a>
                    </Link>,
                fluid: true
            };
        });
        return <Card.Group items={item} />;
    }

    return <div>
        <Layout>
        <h2 style={{color: 'white', marginLeft: 5}}>Ongoing Campaigns</h2>
        <Link route='/campaigns/new'><a className='item'>
            <Button floated='right' content="Create Camapaign" icon="add circle" primary />
        </a></Link>
        {RenderItem()}
        </Layout>
    </div>
};

Hello.getInitialProps= async (ctx) => {
    const campaigns=await Contract.methods.getDeployedCampaigns().call();
    return {campaigns};
}



export default Hello;