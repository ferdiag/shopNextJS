import React from "react";

const DisplayArrayOfUsers = ({ users, handleDeleteUser }) => {
  const displayUsers = users.map((user, key) => {
    return (
      <div key={key}>
        <div>{user._id}</div>
        <div>{user.user}</div>
        <div>{user.email}</div>
        <button
          onClick={async (_) => {
            const payload = { _id: state.users[key]._id };

            const props = {
              endpoint: "admin/deleteUser",
              apiCall: deleteUserHandler,
              state,
              dispatch,
              method: "post",
              payload,
            };
            await apiCallHandler(props);
          }}
        >
          delete User
        </button>
      </div>
    );
  });
  return <>{displayUsers}</>;
};

export default DisplayArrayOfUsers;
