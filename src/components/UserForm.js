import { useState } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Redirect } from 'react-router';

const CREATE_USER = gql`
    mutation CreateUser ($input: UserInput!) {
        createUser (input: $input) {
            _id
        }
    }
`;

const UserForm = () => {
    const [user, setUser] = useState({});
    const [redirect, setRedirect] = useState(false);
    const [createUser] = useMutation(CREATE_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createUser({ variables: { input: user } });
        setRedirect(true);
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="form-control"
                                    value={user.firstName ?? ''}
                                    onChange={e => setUser({ ...user, firstName: e.target.value })}
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="form-control"
                                    value={user.lastName ?? ''}
                                    onChange={e => setUser({ ...user, lastName: e.target.value })}
                                />
                            </div>
                            <div className="mb-2">
                                <input
                                    type="number"
                                    placeholder="Age"
                                    step={1}
                                    min={0}
                                    max={120}
                                    className="form-control"
                                    value={user.age ?? 0}
                                    onChange={e => setUser({ ...user, age: Number(e.target.value) })}
                                />
                            </div>
                            <button className="btn btn-success btn-block">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserForm;