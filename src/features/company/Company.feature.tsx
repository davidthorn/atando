import { FormFeature, FormFeatureProps, FormFeatureState } from "../../components/form/FormFeature.component";
import { Company } from '../../services/company/Company';
import { CompanyCreate, CompanyUpdate } from "../../services/company/CompanyCreate";

export class CompanyFeature extends FormFeature<Company, Company, CompanyCreate , CompanyUpdate>   {

    constructor(props: FormFeatureProps<Company, Company, CompanyCreate, CompanyUpdate>, state: FormFeatureState<Company>) {
        super(props, state)
    }

    onCreate(model: Company): CompanyCreate {
        let a = model
        delete a.id
        return a
    }

    onUpdate(model: Company): CompanyUpdate {
        let a = model
        delete a.id
        return a
    }

}

