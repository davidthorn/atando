import React, { ChangeEvent, Component } from "react";
import InputField from "../../components/InputField/InputField.component";
import MainTitle from "../../components/MainTitle/MainTitle.component";
import { Router } from "../../features/app/Router";
import { BaseService } from "../../services/BaseService";
import './FormFeature.scss';

export interface FormFieldIdentifier {
    id: string
    [key: string]: any
}

export interface FormFeatureProps<T extends FormFieldIdentifier, Model extends FormFieldIdentifier, Create, Update> {
    service: BaseService<Model, Create, Update>
    exitPath: string
    pageTitle: {
        view: string,
        edit: string,
        create: string
    }
    model: Model
    navigation: Router
    mode: 'create' | 'edit' | 'view'
    fields: FormField[]
}

export interface FormFeatureState<T extends FormFieldIdentifier> {
    model: T
    errors?: { [key: string]: any }
}


export interface FormField {
    type: 'text' | 'email' | 'password'
    id: string
    label: string
    placeholder: string
    readonly?: boolean
}


export class FormFeature<T extends FormFieldIdentifier, Model extends FormFieldIdentifier, Create, Update> extends Component<FormFeatureProps<T, Model, Create, Update>, FormFeatureState<Model>> {

    service: BaseService<Model, Create, Update>

    fields: FormField[]

    onCreate(model: Model): Create {
        throw new Error('Not yet implemented')
    }

    onUpdate(model: Model): Update {
        throw new Error('Not yet implemented')
    }

    constructor(props: FormFeatureProps<T, Model, Create, Update>, state: FormFeatureState<T>) {
        super(props, state)
        this.service = props.service
        this.fields = props.fields
    }

    componentWillMount() {
        this.setState({
            model: this.props.model
        })
    }

    fieldValueChanged(event: ChangeEvent<HTMLInputElement>) {

        const { value } = event.target
        const id = event.target.id
        this.setState((state) => {
            state.model[id] = value
            return state
        })

    }

    async formSubmitted(event: any) {

        switch (this.props.mode) {
            case 'create':

                const created = await this.service
                .create(this.onCreate(this.state.model))
                .catch(error => {
                    return Promise.resolve(error)
                }) 

                if (created.status === 201) {
                    this.props.navigation.navigate(this.props.exitPath, {})
                } else {
                    this.setState({
                        errors: created.errors!.errors
                    })
                }
                break;

            case 'edit':
                
                let id = this.state.model.id
                const save = await this.service
                .update(id, this.onUpdate(this.state.model))
                .catch(error => {
                    return Promise.resolve(error)
                })

                if (save.status === 200) {
                    this.props.navigation.navigate(this.props.exitPath, {})
                } else {
                    this.setState({
                        errors: save.errors!.errors
                    })
                }
                break;
        }

    }

    async deletemodel() {

        const save = await this.service.delete(this.state.model.id)

        if (save.status) {
            this.props.navigation.navigate(this.props.exitPath, {})
        } else {
            this.setState({
                errors: save.errors!.errors
            })
        }

    }

    render() {

        let title = ''

        switch (this.props.mode) {
            case 'create':
                title = this.props.pageTitle.create
                break
            case 'edit':
                title = `${this.props.pageTitle.edit}`
                break
            case 'view':
                title = `${this.props.pageTitle.view}`
                break
        }

        let _fields = this.fields.map((i, index) => {
            let isReadyOnly = i.readonly === undefined ? this.props.mode === 'view' : i.readonly!
            return (
                <InputField
                    key={index}
                    type={i.type}
                    label={i.label}
                    id={i.id}
                    name={i.id}
                    placeholder={i.placeholder}
                    onChange={this.fieldValueChanged.bind(this)}
                    defaultValue={this.state.model[i.id]}
                    errors={this.state.errors}
                    readOnly={isReadyOnly}
                ></InputField>
            )
        })

        return (
            <div className="FormFeature">

                <MainTitle title={title}></MainTitle>

                <form>

                    {_fields}

                    <div className="buttonHolder">
                        <button hidden={false} onClick={(e) => this.props.navigation.navigate(this.props.exitPath, {})} type="button" className="btn btn-secondary">Cancel</button>
                        <button hidden={this.props.mode === 'view'} onClick={this.formSubmitted.bind(this)} type="button" className="btn btn-primary">Save</button>
                        <button hidden={this.props.mode !== 'edit'} onClick={this.deletemodel.bind(this)} type="button" className="btn btn-danger">Delete</button>
                    </div>

                </form>
            </div>

        )
    }

}

