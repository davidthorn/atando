import React, { Component } from "react";
import { User } from "../../services/user/User";
import { UserService } from "../../services/user/UserService";
import MainTitle from "../MainTitle/MainTitle.component";
import './UserList.scss';

interface UserListProps {
    shouldEdit(user: User, mode: 'create' | 'edit' | 'view'): void
    isSuperAdmin: boolean
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

        const editColumn = (isSuperAdmin: boolean, user: User, props: UserListProps) => {
            if (!isSuperAdmin) return
            return (
                <td className="UserListEditColumn" onClick={() => props.shouldEdit(user, isSuperAdmin ? 'edit' : 'view')}>edit</td>
            )
        }

        const editHeaderColumn = (isSuperAdmin: boolean) => {
            if (!isSuperAdmin) return
            return (
                <th className="UserListEditColumn" scope="col">Edit</th>
            )
        }

        const addButton = (isSuperAdmin: boolean) => {
            if (!isSuperAdmin) return
            return (
                <div className="toolbar">
                    <button onClick={this.addUser.bind(this)} className="btn btn-primary">Add</button>
                </div>
            )
        }

        const userItems = this.state.users.map((user, index) =>
            <tr key={index}>
                <th scope="row">
                    <input id={user.id} type="checkbox"></input>
                </th>
                <td onClick={() => this.props.shouldEdit(user, 'view')}>{user.name}</td>
                <td onClick={() => this.props.shouldEdit(user, 'view')}>{user.surname}</td>
                <td><a href={"mailto:" + user.email + "?subject=ATANDO Orders&body=What do you want to order today?"}>{user.email}</a></td>
                {editColumn(this.props.isSuperAdmin, user, this.props)}
            </tr>
        )

        return (
            <div className="UserList">

                <MainTitle title="Atando Users"></MainTitle>

                {addButton(this.props.isSuperAdmin)}

                <table className="table table-hover table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="UserListSelectColumn" scope="col">
                                <input type="checkbox"></input>
                            </th>
                            <th scope="col-md-2">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Email</th>
                            {editHeaderColumn(this.props.isSuperAdmin)}
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

