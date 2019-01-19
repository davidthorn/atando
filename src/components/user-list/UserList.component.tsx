import React, { Component } from "react"
import './UserList.scss'
import { User } from "../../models/User.model";


interface UserListProps {
    users: User[]
}

interface UserListState {
    users: User[]
}

export class UserListComponent extends Component<UserListProps, UserListState> {

    constructor(props: UserListProps, state: UserListState) {
        super(props, state)
        this.state = {
            users: props.users
        }
    }

    componentDidMount() {

    }

    render() {

        const userItems = this.state.users.map((user, index) =>
            <div key={index} className="">{user.surname}</div>
        )

        return (
            <div className="UserList">

                <div className="MainTitle">
                    <h1>Atino Users</h1>
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
                            <th className="UserListEditColumn"  scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">
                                <input type="checkbox"></input>
                            </th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>edit</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <input type="checkbox"></input>
                            </th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>edit</td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <input type="checkbox"></input>
                            </th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td>edit</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }

}

