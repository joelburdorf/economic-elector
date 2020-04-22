import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditCandidate extends Component {

    componentDidMount = () => {
       this.findCandidate();
    }

    state = {
        name: '',
        email: '',
        incumbent: false,
        categories: this.props.reduxState.budget.pastBudget,
        budget: {

        }
    }
    findCandidate = () =>{
        let candidates = this.props.reduxState.candidates.allCandidates
        for(let i = 0; i<candidates.length; i++){
            if (candidates[i].id === this.props.location.candidateId) {
                this.setState ({
                    ... this.state,
                    name: candidates[i].name,
                    email: candidates[i].email,
                    incumbent: candidates[i].incumbent,
                    budget: candidates[i].budget
                })
            }
        }
    }
    handleAdd = () => {
        console.log("Edit candidate", this.state);
        let newCandidate = {
            name: this.state.name,
            email: this.state.email,
            incumbent: this.state.incumbent,
            budget: this.state.budget,
            id: this.props.location.candidateId
        }
        
        this.props.dispatch({ type: 'EDIT_CANDIDATE', payload: newCandidate })

        this.props.history.push('/adminElection')
    }

    //handles the change of name and email inputs
    handleChange = (event, typeOf) => {
        console.log(event.target.value);
        
        this.setState({
            [typeOf]: event.target.value
        })
    }

    //handles change of budget inputs
    handleBudgetChange = (event, id) => {
        console.log(event.target.value);
        console.log(id)
        this.setState({
            budget: {
                ...this.state.budget,
                [id]: event.target.value
            }
        })
        console.log(this.state);

    }

    handleCheck = () => {
        this.setState({
            incumbent: !this.state.incumbent
        })
        console.log(this.state.incumbent);

    }

    handleBack = () => {
        this.props.history.push('/adminElection');
    }

    render() {
        let name = this.props.reduxState.elections.election.name;
        let location = this.props.reduxState.elections.election.location;
        return (
            <div class="def_style">
                <button className="left_just" onClick={this.handleBack}>Back to {name} election</button>
                <h1>{name}</h1>
                <h3>{location}</h3>
                <br />
                <h2>Edit Candidate</h2>

                <label>Name</label>
                <input value={this.state.name} onChange={(event) => this.handleChange(event, 'name')} />
                <br />

                <label>Email</label>
                <input value={this.state.email} onChange={(event) => this.handleChange(event, 'email')} />
                <br />

                <label>Incumbent?</label>
                <input type="checkbox" value={this.state.incumbent} onChange={() => this.handleCheck()} />

                <h2>Candidate's Proposed Budget</h2>

                {this.state.categories.map((category) => {
                    return (<div>
                        <label>{category.name}</label>
                        <input placeholder={category.name}  value={this.state.budget[category.id]} type='number' onChange={(event) => this.handleBudgetChange(event, category.id)} />
                        <br />
                    </div>)
                })}

                <button onClick={this.handleAdd} >Edit Candidate</button>
                <button onClick={this.handleCancel} >Cancel</button>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => ({
    reduxState
});

export default connect(mapStateToProps)(EditCandidate);