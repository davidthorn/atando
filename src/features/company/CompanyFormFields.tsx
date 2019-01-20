import { FormField } from "../../components/form/FormFeature.component";

const CompanyFormFields: FormField[] = [
    {
        type: 'text',
        id: 'name',
        label: 'Name',
        placeholder: 'Company Name'
    },
    {
        type: 'text',
        id: 'street',
        label: 'Street',
        placeholder: 'Company Street'
    },
    {
        type: 'text',
        id: 'address',
        label: 'Address',
        placeholder: 'Company Address'
    },
    {
        type: 'text',
        id: 'phone',
        label: 'Phone',
        placeholder: 'Company Phone'
    }
];

export  { CompanyFormFields }
