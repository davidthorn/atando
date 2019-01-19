import React, { Component } from "react"
import './ErrorBanner.scss'

interface ErrorBannerProps {
    title: string
}

export default class ErrorBanner extends Component<ErrorBannerProps, {}> {

    constructor(props: ErrorBannerProps , state:{}) {
        super(props, state)
    }

    render() {   
        return (
            <div className="ErrorBanner">
                <h1>{ this.props.title }</h1>
            </div>
        )
    }

}

