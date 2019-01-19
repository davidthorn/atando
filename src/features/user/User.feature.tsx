import React, { Component, ChangeEvent } from "react"
import { Modal } from 'react-bootstrap'
import './User.scss'
import MainTitle from "../../components/MainTitle/MainTitle.component";
import { User } from "../../models/User.model";
import { Router } from "../app/Router";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner.component";


interface UserFeatureProps {
    user: User
    navigation: Router
}

interface UserFeatureState {
    user: User
    error?: string
}

export class UserFeature extends Component<UserFeatureProps, UserFeatureState> {

    constructor(props: UserFeatureProps, state: UserFeatureState) {
        super(props, state)

    }

    componentWillMount() {
        this.setState({
            user: this.props.user
        })
    }

    fieldValueChanged(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        switch (event.target.id) {
            case 'name':
                this.setState((state) => {
                    state.user.name = value
                    return state
                })
                break
            case 'surname':
                this.setState((state) => {
                    state.user.surname = value
                    return state
                })
                break
            default: break
        }

    }

    async formSubmitted(event: any) {

        const save = await this.state.user.save()
        if (save) {
            this.props.navigation.navigate('/users', {})
        } else {
            this.setState({
                error: 'An error occurred'
            })
        }

    }

    render() {

        let m = this.state.error !== undefined ? this.modal() : undefined

        console.log(m)

        return (
            <div className="UserFeature">

               

                <MainTitle title={this.state.user.name + " " + this.state.user.surname}></MainTitle>

                { m }

                <form>

                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="name"
                            onChange={this.fieldValueChanged.bind(this)}
                            defaultValue={this.state.user.name}
                            placeholder="Enter name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text"
                            className="form-control"
                            id="surname"
                            onChange={this.fieldValueChanged.bind(this)}
                            aria-describedby="surname"
                            defaultValue={this.props.user.surname}
                            placeholder="Enter surname" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input readOnly={true} type="email"
                            defaultValue={this.props.user.email}
                            className="form-control" id="email"
                            aria-describedby="email"
                            placeholder="Enter email" />
                    </div>
                    <button onClick={this.formSubmitted.bind(this)} type="button" className="btn btn-primary">Save</button>
                </form>
            </div>

        )
    }

    modal() {
         
        return (
            <ErrorBanner title="An error occurred" />
        )
    }

}

