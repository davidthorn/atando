import React, { Component } from "react"
import './MainTitle.scss'

interface MainTitleProps {
    title: string
}

export default class MainTitle extends Component<MainTitleProps, {}> {

    constructor(props: MainTitleProps , state:{}) {
        super(props, state)
    }

    render() {
        return (
            <div className="MainTitle">
                <h1>{ this.props.title }</h1>
            </div>
        )
    }

}

