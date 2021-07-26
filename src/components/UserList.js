import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_USERS = gql`
    query GetUsers {
        getUsers {
            _id
            firstName
            lastName
            age
        }
    }
`;

const DELETE_USER = gql`
    mutation DeleteUser ($id: ID!) {
        deleteUser (_id: $id) {
            _id
        }
    }
`;

const UserList = () => {
    const { loading, error, data, refetch } = useQuery(GET_USERS);
    const [deleteUser] = useMutation(DELETE_USER);

    const handleDelete = async (_id) => {
        await deleteUser({ variables: { id: _id } });
        await refetch();
    }

    useEffect(() => {
        (async () => await refetch())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error</p>;

    return (
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        Users
                    </div>
                    <ul className="list-group list-group-flush">
                        {data && data.getUsers && data.getUsers.map(({ _id, firstName, lastName, age }) => (
                            <li key={_id} className="list-group-item d-flex justify-content-between align-items-center">
                                {firstName} {lastName} ({age} years)
                                <span className="badge bg-primary rounded-pill" style={{cursor: "pointer"}} onClick={() => handleDelete(_id)}>x</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserList;