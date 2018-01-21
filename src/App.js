import React from 'react';

import './App.css';
import { Col, Grid, Row } from 'react-bootstrap';
import { LoadingOverlay } from './components/utility/LoadingOverlay';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
    }

    startLoading() {
        this.setState({isLoading: true});
    }

    stopLoading() {
        this.setState({isLoading: false});
    }

    render() {
        const{children} = this.props;

        let childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { startLoading: this.startLoading, stopLoading: this.stopLoading }));
        return (
            <div>
                <LoadingOverlay
                    isLoading={this.state.isLoading}
                    text={'Mining transaction...Please Wait!'}
                >
                </LoadingOverlay>
                <h1 className="title">Tic-Tac-Toe on Ethereum blockchain!</h1>
                <div style={{paddingTop: 30}}/>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={0} md={2} lg={3}/>
                        <Col xs={12} md={8} lg={6}>
                            {childrenWithProps}
                        </Col>
                        <Col xs={0} md={2} lg={3}/>
                    </Row>
                </Grid>
            </div>

        );
    }
}
