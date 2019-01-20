import React, { Component, ChangeEvent } from "react"
import './User.scss'
import MainTitle from "../../components/MainTitle/MainTitle.component";
import { User } from "../../models/User.model";
import { Router } from "../app/Router";
import ErrorBanner from "../../components/ErrorBanner/ErrorBanner.component";
import { UserObject } from "../users/users";


interface UserFeatureProps {
    user: User
    navigation: Router
    mode: 'create' | 'edit'
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
            case 'email':
            if(this.props.mode === 'edit') throw new Error('this should not be possible')
            this.setState((state) => {
                state.user.email = value
                return state
            })
            break
            default: break
        }

    }

    async formSubmitted(event: any) {

        switch(this.props.mode) {
            case 'create':
            const created = await UserObject.create(this.state.user)
            if (created) {
                this.props.navigation.navigate('/users', {})
            } else {
                this.setState({
                    error: 'An error occurred'
                })
            }
            break;

            case 'edit':
            const save = await UserObject.save(this.state.user)
            if (save) {
                this.props.navigation.navigate('/users', {})
            } else {
                this.setState({
                    error: 'An error occurred'
                })
            }
            break;
        }

        

    }

    async deleteUser(event: any) {

        const save = await UserObject.delete(this.state.user)
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

        let title = this.props.mode === 'create' ? 'Create User' : this.state.user.name + " " + this.state.user.surname

        return (
            <div className="UserFeature">

                <MainTitle title={title}></MainTitle>

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
                        <input readOnly={this.props.mode === 'edit'} 
                            type="email"
                            defaultValue={this.props.user.email}
                            onChange={this.fieldValueChanged.bind(this)}
                            className="form-control" id="email"
                            aria-describedby="email"
                            placeholder="Enter email" />
                    </div>
                    <button onClick={this.formSubmitted.bind(this)} type="button" className="btn btn-primary">Save</button>
                    <button hidden={this.props.mode === 'create'}  onClick={this.deleteUser.bind(this)} type="button" className="btn btn-danger">Delete</button>
               
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

