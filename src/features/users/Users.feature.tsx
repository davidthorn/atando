import React, { Component } from "react"
import './Users.scss'
import { UserListComponent } from "../../components";
import { User } from "../../models/User.model";
import { Router } from "../app/Router";
import  { users } from './users'

interface UsersFeatureProps {
    //shouldOpenUserFeature(user: User): void
    navigation: Router
}

interface UsersFeatureState {
    
}

export class UsersFeature extends Component<UsersFeatureProps, UsersFeatureState> {

    users: User[] = users

    constructor(props: UsersFeatureProps, state: UsersFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    shoudlEditUser(user: User) {
        this.props.navigation.navigate('/user' , {
            user: user
        })
    }

    render() {

        return (
            <div className="UsersFeature">
                <UserListComponent shouldEdit={ this.shoudlEditUser.bind(this) } users={this.users}></UserListComponent>
            </div>
        )
    }

}
