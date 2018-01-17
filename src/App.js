import React from 'react';

import './App.css';
import { Col, Grid, Row } from 'react-bootstrap';

export default class App extends React.Component {

    render() {

        return (
            <div>
                <h1 className="title">Tic-Tac-Toe on Ethereum blockchain!</h1>
                <div style={{paddingTop: 30}} />
                <Grid>
                    <Row className="show-grid">
                        <Col xs={0} md={2} lg={3}/>
                        <Col xs={12} md={8} lg={6}>
                            {this.props.children}
                        </Col>
                        <Col xs={0} md={2} lg={3}/>
                    </Row>
                </Grid>
            </div>
        );
    }
}
