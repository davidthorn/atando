import React, { Component } from "react"
import './Users.scss'
import { UserListComponent } from "../../components";
import { User } from "../../models/User.model";
import { Router } from "../app/Router";


interface UsersFeatureProps {
    //shouldOpenUserFeature(user: User): void
    navigation: Router
}

interface UsersFeatureState {
    
}

export class UsersFeature extends Component<UsersFeatureProps, UsersFeatureState> {

    users: User[] = []

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
                <UserListComponent shouldEdit={ this.shoudlEditUser.bind(this) }></UserListComponent>
            </div>
        )
    }

}
