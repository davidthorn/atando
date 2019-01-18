import React, { Component } from "react"
import './Users.scss'

interface UserFeatureProps {

}

interface UserFeatureState {
    
}

export class UsersFeature extends Component<UserFeatureProps, UserFeatureState> {

    constructor(props: UserFeatureProps, state: UserFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="UsersFeature">
                Users Feature
            </div>
        )
    }

}
