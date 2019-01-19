import React from 'react';
import { UsersFeature, UserFeature, CompaniesFeature, OrdersFeature } from '../index';
import { AppContainerProps } from "./AppContainerProps";
import { AppContainerState } from "./AppContainerState";

export class AppContainer extends React.Component<AppContainerProps, AppContainerState> {

    constructor(props: AppContainerProps, state: AppContainerState) {
        super(props, state);
        this.state = {
            route: '/users',
            args: {
                user: {
                    name: 'david',
                    surname: 'thorn',
                    email: 'david.thorn@atino.de'
                }
            }
        };
    }

    shouldRender(routeName: string, args: any) {
        this.setState({
            route: routeName,
            args: args
        });
    }
    
    componentDidMount() {
        this.props.navigator.shouldRender = this.shouldRender.bind(this);
        console.log('comp did mount');
    }

    render() {
        let route = this.state.route || '/users';
        let com;
        switch (route) {
            case '/users':
                com = <UsersFeature navigation={this.props.navigator} />;
                break;
            case '/user':
                console.log(this.state)
                if(this.state.args.user === undefined) throw new Error('incorrect params provided for user feature')
                com = <UserFeature navigation={this.props.navigator} user={this.state.args.user} />;
                break;
            case '/companies':
                com = <CompaniesFeature />;
                break;
            case '/orders':
                com = <OrdersFeature />;
                break;
            default:
                throw new Error('route not found');
        }
        console.log('re render', this.state);
        return com;
    }
}
