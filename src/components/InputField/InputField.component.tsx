import React, { Component, ChangeEvent } from "react"
import './InputField.scss'

export interface InputFieldProps {
    defaultValue?: string
    name: string
    readOnly?: boolean
    id: string
    placeholder?: string
    label: string
    type: 'text' | 'password' | 'email'
    errors?: { [key:string] : any }
    onChange(event: ChangeEvent<HTMLInputElement>): void
}

export interface InputFieldState {
    value: string
    defaultValue: string
    error?: string
}

export default class InputField extends Component<InputFieldProps, InputFieldState> {

    constructor(props: InputFieldProps , state: InputFieldState) {
        super(props, state)
        this.state = {
            value: '',
            defaultValue: this.props.defaultValue || '',
            error: this.handleError(this.props.id, this.props.errors)
        }
    }

    componentWillReceiveProps(props: InputFieldProps) {
        this.setState({
            error: this.handleError(props.id , props.errors)
        })
       
    }

    fieldValueChanged(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        this.setState((state) => {
            value
        })
        this.props.onChange(event)
    }

    render() {

        let errorSpan = (error?: string) => {
            if(error === undefined) return
            return <span className="ErrorMessage">{ this.state.error}</span> 
        }

        return (
            <div className="form-group">
            <label htmlFor="">{this.props.label}</label>
            { errorSpan(this.state.error) }
            <input 
                type={this.props.type}
                readOnly={this.props.readOnly || false}
                className="form-control"
                id={this.props.id}
                aria-describedby={this.props.name}
                onChange={this.fieldValueChanged.bind(this)}
                defaultValue={this.state.defaultValue}
                placeholder={this.props.placeholder || ''} />
        </div>
        )
    }

    handleError(key: string , errors: { [key: string] : any } | undefined ,): string {
        if(errors === undefined) return ''
        if(errors[key] === undefined) return ''
        if(typeof errors[key] === 'object') return errors[key][0]
        return errors[key]
    }

}

