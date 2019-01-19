import React, { Component } from "react"
import './UserList.scss'
import { User } from "../../models/User.model";
import MainTitle from "../MainTitle/MainTitle.component";

interface UserListProps {
    users: User[]
    shouldEdit(user: User): void
}

interface UserListState {
    users: User[]
}

export class UserListComponent extends Component<UserListProps, UserListState> {

    /**
     *Creates an instance of UserListComponent.
     * @param {UserListProps} props
     * @param {UserListState} state
     * @memberof UserListComponent
     */
    constructor(props: UserListProps, state: UserListState) {
        super(props, state)
        this.state = {
            users: this.props.users
        }
    }  

    render() {

        const userItems = this.state.users.map((user, index) =>
            <tr key={ index }>
                <th scope="row">
                    <input id={ user.id } type="checkbox"></input>
                </th>
                <td>{ user.name }</td>
                <td>{ user.surname }</td>
                <td><a href={"mailto:" + user.email + "?subject=ATANDO Orders&body=What do you want to order today?"}>{ user.email }</a></td>
                <td className="UserListEditColumn" onClick={ () => this.props.shouldEdit(user) }>edit</td>
            </tr>
        )

        return (
            <div className="UserList">

                <MainTitle title="Atino Users"></MainTitle>

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
                        { userItems }
                    </tbody>
                </table>
            </div>
        )
    }

}

