import React, {useState, useEffect} from 'react';
import Contract from '../ethereum/factory';
import Layout from '../components/Layout';
import { Card, Button, Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


function Hello(props){

    function RenderItem(){
        const item=props.campaigns.map(address => {
            return {
                header: address,
                description: <a>Visit</a>,
                fluid: true
            };
        });
        return <Card.Group items={item} />;
    }

    return <div>
        <Layout>
        <Button floated='right' content="Create Camapaign" icon="add circle" primary />
        {RenderItem()}
        </Layout>
    </div>
};

Hello.getInitialProps= async (ctx) => {
    const campaigns=await Contract.methods.getDeployedCampaigns().call();
    return {campaigns};
}



export default Hello;