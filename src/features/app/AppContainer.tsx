import React from 'react';
import { CompanyService } from '../../services/company/CompanyService';
import { UserService } from '../../services/user/UserService';
import { CompaniesFeature, CompanyFeature, CompanyFormFields, OrdersFeature, UserFeature, UserFormFields, UsersFeature } from '../index';
import { AppContainerProps } from "./AppContainerProps";
import { AppContainerState } from "./AppContainerState";
import { Router } from './Router';

export class AppContainer extends React.Component<AppContainerProps, AppContainerState> implements Router {

    constructor(props: AppContainerProps, state: AppContainerState) {
        super(props, state);
        this.state = {
            route: '/users',
            args: {
                user: {
                    name: 'david',
                    surname: 'thorn',
                    email: 'bogus@googlemain.com'
                }
            }
        };
    }

    navigate(routeName: string, args: { [key: string]: any }): void {
        this.props.navigator.navigate(routeName, args)
    }

    shouldRender(routeName: string, args: any) {
        this.setState({
            route: routeName,
            args: args
        });
    }

    componentDidMount() {
        this.props.navigator.shouldRender = this.shouldRender.bind(this);
    }

    render() {
        let route = this.state.route || '/users';
        let com;
        switch (route) {
            case '/users':
                com = <UsersFeature isSuperAdmin={this.props.isSuperAdmin} navigation={this} />;
                break;
            case '/user':
                if (this.state.args.user === undefined) throw new Error('incorrect params provided for user feature')
                com = <UserFeature
                    service={new UserService()}
                    exitPath="/users"
                    pageTitle={{
                        create: 'Create User',
                        edit: 'User',
                        view: 'User'
                    }}
                    fields={UserFormFields(this.state.args.mode !== 'create')}
                    mode={this.state.args.mode}
                    navigation={this}
                    model={this.state.args.user} />;

                break;
            case '/company':
                if (this.state.args.company === undefined) throw new Error('incorrect params provided for company feature')
                com = <CompanyFeature
                    service={new CompanyService()}
                    exitPath="/companies"
                    pageTitle={{
                        create: 'Create Company',
                        edit: 'Company',
                        view: 'Company'
                    }}
                    fields={CompanyFormFields}
                    mode={this.state.args.mode}
                    navigation={this}
                    model={this.state.args.company} />;
                break;
            case '/companies':
                com = <CompaniesFeature navigation={this} />;
                break;
            case '/orders':
                com = <OrdersFeature />;
                break;
            default:
                throw new Error('route not found');
        }
        return com;
    }
}
