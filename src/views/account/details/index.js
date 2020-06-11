import React from 'react';
import DetailsContent from './details';
import Details from '../../../components/details';
import {DataSource} from "../../../datasource";
import { Alert } from "react-bootstrap";

class AccountDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = { id: 0, balance: 0, data: { public_key: "", coins: []}, showMessage: false}
        this.dataSource = DataSource.instance
        this.idAccount = this.props.location.pathname.replace("/account/", "")
    }

    componentWillMount() {
        this.dataSource.getAccount(this.idAccount).then(account => {
            if(account !== undefined) {
                this.setState({id: account.id, balance: account.balance, data: account.data})
            } else {
                this.setState({showMessage: true})
            }
        })
    }

    render() {

        function AlertMessage() {
            return (
                <Alert variant="danger" dismissible>
                    <Alert.Heading>NO RESULT FOR THIS SEARCH!</Alert.Heading>
                    <p>
                        Try searching by Transaction hash, Block number or Account address
                    </p>
                </Alert>
            );
        }

        let message = null;
        if (this.state.showMessage) {
            message = <AlertMessage />
        } else {
            message = null;
        }

        return (
            <DetailsContent>

                {message}

                <div className="details">
                    <Details
                        className={"acc"}
                        header={"ACCOUNT DETAIL"}
                        line1Header={"ADDRESS"}
                        line2Header={"BALANCE"}
                        line3Header={"PUBLIC KEY"}
                        line4Header={"COINS"}
                        line1Data={this.state.id}
                        line2Data={this.state.balance}
                        line3Data={this.state.data.public_key}
                        line4Data={this.state.data.coins.length}
                    />
                </div>
            </DetailsContent>
        );
    }
}

export default AccountDetails;