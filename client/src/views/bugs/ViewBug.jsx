import React from 'react';
import BugService from '../../service/BugService';
import UserService from '../../service/UserService';

export default class ViewBug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bug: undefined,
            user: undefined
        }

        this.getBug = this.getBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        this.editBug = this.editBug.bind(this);
        this.resolveBug = this.resolveBug.bind(this);
    }

    componentDidMount() {
        this.getBug();
    }

    getBug() {
        BugService.getBug(this.props.history.location.state.bug.id).then(
            (res) => {
                this.setState({
                    bug: res.data
                })
            }
        ).then(() => {
            UserService.getUser(this.state.bug.userId).then((res) => {
                this.setState({
                    user: res.data
                })
            })
        })
    }

    deleteBug() {
        BugService.deleteBug(this.props.history.location.state.bug.id).then(
            (res) => {
                console.log("Deleted successfully");
                this.props.history.push({
                    pathname: '/'
                })
            },
            (err) => {
                console.log("ERROR");
            }
        )
    }

    resolveBug() {
        BugService.updateBug(this.state.bug.id, this.state.bug).then(
            (res) => {
                console.log(res);
            }
        )
    }

    editBug() {
        this.props.history.push({
            pathname: '/addBug/' + this.props.history.location.state.bug.id,
            state: {
                bug: this.props.history.location.state.bug,
                project: this.props.history.location.state.project
            }
        })
    }


    render() {
        return (
            <>
                <div>
                    <h4>Description</h4>
                    <div>{this.state.bug?.description}</div>
                    <h4>Severity</h4>
                    <div>{this.state.bug?.severity}</div>
                    <h4>Priority</h4>
                    <div>{this.state.bug?.priority}</div>
                    <h4>Link</h4>
                    <div>{this.state.bug?.link}</div>
                    <h4>Status</h4>
                    <div>{this.state.bug?.status}</div>
                    <h4>Asigned to: </h4>
                    <div>{this.state.user?.username}</div>

                    <div>
                        <button onClick={this.deleteBug}>Delete</button>
                        <button onClick={this.editBug}>Edit</button>
                        {this.state.bug?.status === "ONGOING" ? 
                        <button onClick={() => this.setState({
                            bug: {
                                ...this.state.bug,
                                status: "RESOLVED"
                            }
                        }, () => this.resolveBug())}>Resolve</button> : "" }
                    </div>
                </div>
            </>
        )
    }
}