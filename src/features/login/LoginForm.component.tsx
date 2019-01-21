import { FormFeature, FormFeatureProps, FormFeatureState } from "../../components/form/FormFeature.component";
import { AuthUser } from "../../services/login/AuthUser";
import { AuthUserCreate } from "../../services/login/LoginService";

export class LoginFormComponent extends FormFeature<AuthUser, AuthUser, AuthUserCreate, AuthUserCreate>   {

    constructor(props: FormFeatureProps<AuthUser, AuthUser, AuthUserCreate, AuthUserCreate>, state: FormFeatureState<AuthUser>) {
        super(props, state)
    }

    onCreate(model: AuthUser): AuthUserCreate {
        let a = model
        delete a.id
        return a
    }

    onUpdate(model: AuthUser): AuthUserCreate {
        throw new Error('The login form has not update method')
    }

}

