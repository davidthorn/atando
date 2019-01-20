import React, { ChangeEvent, Component } from "react";
import InputField from "../../components/InputField/InputField.component";
import MainTitle from "../../components/MainTitle/MainTitle.component";
import { User } from "../../models/User.model";
import { UserService } from '../../services/user/UserService';
import { Router } from "../app/Router";
import './User.scss';

interface UserFeatureProps {
    user: User
    navigation: Router
    mode: 'create' | 'edit' | 'view'
}

interface UserFeatureState {
    user: User
    errors?: { [key: string]: any }
}

export class UserFeature extends Component<UserFeatureProps, UserFeatureState> {

    service: UserService

    constructor(props: UserFeatureProps, state: UserFeatureState) {
        super(props, state)
        this.service = new UserService()
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
                if (this.props.mode === 'edit') throw new Error('this should not be possible')
                this.setState((state) => {
                    state.user.email = value
                    return state
                })
                break
            default: break
        }

    }

    async formSubmitted(event: any) {

        switch (this.props.mode) {
            case 'create':

                const created = await this.service.create({
                    name: this.state.user.name,
                    surname: this.state.user.surname,
                    email: this.state.user.email
                })
                .catch(error => {
                    return Promise.resolve(error)
                })
                
                if (created.status === 201) {
                    this.props.navigation.navigate('/users', {})
                } else {
                    this.setState({
                        errors: created.errors!.errors
                    })
                }
                break;

            case 'edit':
                const save = await this.service.update(this.state.user.id, {
                    name: this.state.user.name,
                    surname: this.state.user.surname
                })
                if (save.status === 200) {
                    this.props.navigation.navigate('/users', {})
                } else {
                    this.setState({
                        errors: save.errors!.errors
                    })
                }
                break;
        }



    }

    async deleteUser(event: any) {
       
        const save = await this.service.delete(this.state.user.id)

        if (save.status) {
            this.props.navigation.navigate('/users', {})
        } else {
            this.setState({
                errors: save.errors!.errors
            })
        }

    }

    render() {

        let title = this.props.mode === 'create' ? 'Create User' : this.state.user.name + " " + this.state.user.surname

        return (
            <div className="UserFeature">

                <MainTitle title={title}></MainTitle>

                <form>

                    <InputField
                        type='text'
                        label="Name"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        onChange={this.fieldValueChanged.bind(this)}
                        defaultValue={this.state.user.name}
                        errors={this.state.errors}
                        readOnly={this.props.mode === 'view'}
                    ></InputField>

                    <InputField
                        type='text'
                        label="Surname"
                        id="surname"
                        name="surname"
                        placeholder="Enter your surname"
                        onChange={this.fieldValueChanged.bind(this)}
                        defaultValue={this.state.user.surname}
                        errors={this.state.errors}
                        readOnly={this.props.mode === 'view'}
                    ></InputField>

                    <InputField
                        type='email'
                        label="Email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={this.fieldValueChanged.bind(this)}
                        defaultValue={this.state.user.email}
                        readOnly={this.props.mode !== 'create'}
                        errors={this.state.errors}
                    ></InputField>


                    <button hidden={this.props.mode === 'view'} onClick={this.formSubmitted.bind(this)} type="button" className="btn btn-primary">Save</button>
                    <button hidden={this.props.mode !== 'edit'} onClick={this.deleteUser.bind(this)} type="button" className="btn btn-danger">Delete</button>

                </form>
            </div>

        )
    }

}

