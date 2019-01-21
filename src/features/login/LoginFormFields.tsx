import { FormField } from '../../components/form/FormFeature.component';
const LoginFormFields: FormField[] = [
    {
        type: 'email',
        id: 'email',
        label: 'Email',
        placeholder: 'Enter your email-address'
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
        placeholder: 'Enter your password'
    }
]

export { LoginFormFields };

