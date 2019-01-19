import React, { Component } from "react"

interface UserFeatureProps {}

interface UserFeatureState {}

export class UserFeature extends Component<UserFeatureProps, UserFeatureState> {

    constructor(props: UserFeatureProps,  state: UserFeatureState) {
        super(props, state)
    }

    render() {
        return (
            <div className="User">
                User Feature
            </div>
        )
    }

}

