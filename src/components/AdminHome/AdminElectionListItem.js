import React, { Component } from 'react';
import '../App/App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

class AdminElectionListItem extends Component {

    handleClick = (election) => {
        console.log(election.id)
        this.props.dispatch({
            type: 'FETCH_BUDGET',
            payload: election.id
        })
        //since we already have all the info for the election, we
        //can send it straight to the election reducer
        this.props.dispatch({
            type: 'SET_ELECTION',
            payload: election
        })
        this.props.dispatch({
            type: 'FETCH_CANDIDATES',
            payload: election.id
        })
        this.props.history.push(`/adminElection`);
    }

    // handleDeleteElection deletes election and associated candidate and budget
    // call to sagas to make DELETE call to "budget_allocation", "candidates", and "elections" tables
    // must send with it the election ID, candidate ID
    handleDeleteElection = (event, id) => {
        console.log('in AdminElectionListItem page, handleDeleteElection', id);
        let obj = {
            electionId: id,
        }
        this.props.dispatch({
            type: 'DELETE_ELECTION',
            payload: obj
        });
        window.location.reload(false);
    }


    render = () => {
        let election = this.props.election;

        return (
            <div className="ElectionHolder">
                <div onClick={() => this.handleClick(election)} className="Election">
                    <b>{election.name}</b>
                    <br />
                    <b> {election.location}</b>
                    <br />
                    {election.date}
                    <br />
                </div>

                <Button color="secondary" onClick={(event) => this.handleDeleteElection(event, election.id)}>Delete Election</Button>
                {/* <hr className="ruler" /> */}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default withRouter(connect(mapStateToProps)(AdminElectionListItem));