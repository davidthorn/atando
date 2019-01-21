import React, { Component } from "react";
import { LoginService } from "../../services/login/LoginService";
import { Router } from "../app/Router";
import { LoginFormComponent } from "./LoginForm.component";
import { LoginFormFields } from "./LoginFormFields";

export interface LoginFormProps {
    onAuthenticated(result: boolean, token: { idToken: string, expiresAt: number }): void
}

export interface LoginFormState { }

export class LoginFormFeature extends Component<LoginFormProps, LoginFormState> implements Router {

    constructor(props: LoginFormProps, state: LoginFormState) {
        super(props, state)
        this.state = {
        }
    }

    navigate(routeName: string, args: { [key: string]: any }): void {
        if (args.idToken !== undefined && args.expiresIn) {
            this.props.onAuthenticated(true, {
                idToken: args.idToken,
                expiresAt: Date.now() + (parseInt(args.expiresIn) * 1000)
            })
        }
    }

    render() {
        return (
            <LoginFormComponent
                service={new LoginService()}
                exitPath="/users"
                pageTitle={{
                    create: 'Login',
                    edit: '',
                    view: ''
                }}
                fields={LoginFormFields}
                mode="create"
                navigation={this}
                model={{
                    id: '',
                    email: '',
                    password: ''
                }} >

            </LoginFormComponent>
        )
    }

}