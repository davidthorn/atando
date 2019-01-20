import { FormFeature, FormFeatureProps, FormFeatureState } from "../../components/form/FormFeature.component";
import { User } from '../../services/user/User';
import { UserCreate, UserUpdate } from "../../services/user/UserService";

export class UserFeature extends FormFeature<User, User, UserCreate , UserUpdate>   {

    constructor(props: FormFeatureProps<User, User, UserCreate, UserUpdate>, state: FormFeatureState<User>) {
        super(props, state)
    }

    onCreate(model: User): UserCreate {
        let a = model
        delete a.id
        return a
    }

    onUpdate(model: User): UserUpdate {
        let a = model
        delete a.id
        delete a.email
        return a
    }

}

