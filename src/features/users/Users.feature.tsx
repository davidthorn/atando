import React, { Component } from "react"
import './Users.scss'
import { UserListComponent } from "../../components";
import { User } from "../../models/User.model";

interface UserFeatureProps {

}

interface UserFeatureState {
    
}

export class UsersFeature extends Component<UserFeatureProps, UserFeatureState> {

    users: User[] = [
        {
            name: 'David',
            email: 'dad',
            surname: 'Thorn'
        }
    ]

    constructor(props: UserFeatureProps, state: UserFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {

        

        return (
            <div className="UsersFeature">
                <UserListComponent users={this.users}></UserListComponent>
            </div>
        )
    }

}
