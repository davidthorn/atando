import { FormField } from '../../components/form/FormFeature.component';
const userFormFields = (isReadOnly: boolean): FormField[] => {
    return [
        {
            type: 'text',
            id: 'name',
            label: 'Name',
            placeholder: 'Enter your name'
        },
        {
            type: 'text',
            id: 'surname',
            label: 'Surname',
            placeholder: 'Enter your surname'
        },
        {
            type: 'email',
            id: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
            readonly: isReadOnly
        }
    ];
}


export { userFormFields }
