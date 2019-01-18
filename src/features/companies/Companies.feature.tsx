import React, { Component } from "react"
import './Companies.scss'

interface CompaniesFeatureProps {

}

interface CompaniesFeatureState {
    
}

export class CompaniesFeature extends Component<CompaniesFeatureProps, CompaniesFeatureState> {

    constructor(props: CompaniesFeatureProps, state: CompaniesFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    render() {
        return (
            <div className="CompaniessFeature">
                Companiess Feature
            </div>
        )
    }

}
