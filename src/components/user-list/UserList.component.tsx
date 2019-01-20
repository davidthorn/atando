import React, { Component } from "react";
import MainTitle from "../MainTitle/MainTitle.component";
import './UserList.scss';
import { User } from "../../services/user/User";
import { UserService } from "../../services/user/UserService";

interface UserListProps {
    shouldEdit(user: User, mode: 'create' | 'edit' | 'view'): void
}

interface UserListState {
    users: User[]
}

export class UserListComponent extends Component<UserListProps, UserListState> {

    service: UserService

    /**
     *Creates an instance of UserListComponent.
     * @param {UserListProps} props
     * @param {UserListState} state
     * @memberof UserListComponent
     */
    constructor(props: UserListProps, state: UserListState) {
        super(props, state)
        this.service = new UserService()
        this.state = {
            users: []
        }
    }

    async componentWillMount() {
        const users = await this.service.all<User>()
        this.setState({
            users: users
        })
    }

    addUser() {
        this.props.shouldEdit({
            name: '',
            surname: '',
            email: '',
            id: '',
        }, 'create')
    }

    render() {

        const userItems = this.state.users.map((user, index) =>
            <tr key={index}>
                <th scope="row">
                    <input id={user.id} type="checkbox"></input>
                </th>
                <td onClick={() => this.props.shouldEdit(user, 'view')}>{user.name}</td>
                <td onClick={() => this.props.shouldEdit(user, 'view')}>{user.surname}</td>
                <td><a href={"mailto:" + user.email + "?subject=ATANDO Orders&body=What do you want to order today?"}>{user.email}</a></td>
                <td className="UserListEditColumn" onClick={() => this.props.shouldEdit(user, 'edit')}>edit</td>
            </tr>
        )

        return (
            <div className="UserList">

                <MainTitle title="Atando Users"></MainTitle>

                <div className="toolbar">
                    <button onClick={this.addUser.bind(this)} className="btn btn-primary">Add</button>
                </div>

                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="UserListSelectColumn" scope="col">
                                <input type="checkbox"></input>
                            </th>
                            <th scope="col-md-2">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            <th className="UserListEditColumn" scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userItems}
                    </tbody>
                </table>
            </div>
        )
    }

}

