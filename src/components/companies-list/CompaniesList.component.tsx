import React, { Component } from "react";
import MainTitle from "../MainTitle/MainTitle.component";
import './CompaniesList.scss';
import { Company } from "../../services/company/Company";
import { CompanyService } from "../../services/company/CompanyService";

interface CompaniesListProps {
    shouldEdit(company: Company, mode: 'create' | 'edit' | 'view'): void
}

interface CompaniesListState {
    companies: Company[]
}

export class CompaniesListComponent extends Component<CompaniesListProps, CompaniesListState> {

    service: CompanyService

    /**
     *Creates an instance of CompaniesListComponent.
     * @param {CompaniesListProps} props
     * @param {CompaniesListState} state
     * @memberof CompaniesListComponent
     */
    constructor(props: CompaniesListProps, state: CompaniesListState) {
        super(props, state)
        this.service = new CompanyService()
        this.state = {
            companies: []
        }
    }

    async componentWillMount() {
        const companies = await this.service.all<Company>().catch(() => {
            return Promise.resolve<Company[]>([])
        })

        this.setState({
            companies: companies
        })
    }

    addcompany() {
        this.props.shouldEdit({
            id: '',
            name: '',
            address: '',
            phone: ''
        }, 'create')
    }

    render() {

        const companyItems = this.state.companies.map((company, index) =>
            <tr key={index}>
                <th scope="row">
                    <input id={company.id} type="checkbox"></input>
                </th>
                <td onClick={() => this.props.shouldEdit(company, 'view')}>{company.name}</td>
                <td onClick={() => this.props.shouldEdit(company, 'view')}>{company.address}</td>
                <td onClick={() => this.props.shouldEdit(company, 'view')}>{company.phone}</td>
                <td className="CompaniesListEditColumn" onClick={() => this.props.shouldEdit(company, 'edit')}>edit</td>
            </tr>
        )

        return (
            <div className="CompaniesList">

                <MainTitle title="Atando companies"></MainTitle>

                <div className="toolbar">
                    <button onClick={this.addcompany.bind(this)} className="btn btn-primary">Add</button>
                </div>

                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="CompaniesListSelectColumn" scope="col">
                                <input type="checkbox"></input>
                            </th>
                            <th scope="col-md-2">Name</th>
                            <th scope="col-md-2">Address</th>
                            <th scope="col">Phone</th>
                            <th className="CompaniesListEditColumn" scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companyItems}
                    </tbody>
                </table>
            </div>
        )
    }

}

