import React, { Component } from "react";
import { UserListComponent } from "../../components";
import { User } from "../../models/User.model";
import { Router } from "../app/Router";
import './Users.scss';

interface UsersFeatureProps {
    navigation: Router
    isSuperAdmin: boolean
}

interface UsersFeatureState { }

export class UsersFeature extends Component<UsersFeatureProps, UsersFeatureState> {

    users: User[] = []

    constructor(props: UsersFeatureProps, state: UsersFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    shoudlEditUser(user: User, mode: 'create' | 'edit') {
        this.props.navigation.navigate('/user', {
            user: user,
            mode: mode
        })
    }

    render() {

        return (
            <div className="UsersFeature">
                <UserListComponent isSuperAdmin={this.props.isSuperAdmin} shouldEdit={this.shoudlEditUser.bind(this)}></UserListComponent>
            </div>
        )
    }

}
