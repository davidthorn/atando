import React, { Component } from "react"
import './Companies.scss'
import { CompaniesListComponent } from "../../components";
import { Router } from "../app/Router";
import { Company } from "../../services/company/Company";


interface CompaniesFeatureProps {
    //shouldOpenUserFeature(user: User): void
    navigation: Router
}

interface CompaniesFeatureState {
    
}

export class CompaniesFeature extends Component<CompaniesFeatureProps, CompaniesFeatureState> {

    Companies: Company[] = []

    constructor(props: CompaniesFeatureProps, state: CompaniesFeatureState) {
        super(props, state)
        this.state = {
        }
    }

    shouldEdit(company: Company, mode: 'create' | 'edit' | 'view') {
        this.props.navigation.navigate('/company' , {
            company: company,
            mode: mode
        })
    }

    render() {

        return (
            <div className="CompaniesFeature">
                <CompaniesListComponent shouldEdit={ this.shouldEdit.bind(this) }></CompaniesListComponent>
            </div>
        )
    }

}
