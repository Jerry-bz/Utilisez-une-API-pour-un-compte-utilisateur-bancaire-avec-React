import React, { useState, useEffect } from "react";
import { updateProfile } from "../features/user.slice";
import { useDispatch } from "react-redux";

/**
@module Identity
@description A component to display and edit user identity information
@param {object} informations - User information object containing first and last name
@returns {JSX.Element} - JSX element with user information and editing functionality
*/
export default function Identity({ informations }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  /**

@function useEffect
@description Hook to update the local state with the incoming user information object
@param {object} informations - User information object containing first and last name
*/
  useEffect(() => {
    setFirstName(informations.firstname);
    setLastName(informations.lastname);
  }, [informations]);
  /**

@function handleSaveClick
@description Function to handle the click event on the Save button.
It dispatches the updated user information to the store and sets the editing state to false.
If the user has not entered both first and last names, it displays an alert message.
*/
  const handleSaveClick = () => {
    if (!firstName || !lastName) {
      alert("Please fill in both first and last name fields.");
    } else {
      dispatch(updateProfile({ firstName, lastName }));
      setIsEditing(false);
    }
  };
  const textName = (
    <div className="header">
      <h1>Welcome back</h1>
      <p>
        {firstName ?? informations.firstname}{" "}
        {lastName ?? informations.lastname}
      </p>
      <button onClick={() => setIsEditing(true)} className="edit-button">
        Edit Name
      </button>
    </div>
  );

  const inputName = (
    <div className="header">
      <h1>Update Profile</h1>
      <input
        placeholder={informations.firstname}
        value={firstName ?? ""}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder={informations.lastname}
        value={lastName ?? ""}
        onChange={(e) => setLastName(e.target.value)}
      />
      <div className="update-Button">
        <button className="edit-button" onClick={handleSaveClick}>
          Save
        </button>
        <button className="edit-button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </div>
  );

  /**

@returns {JSX.Element} - Either the textName or inputName JSX element based on the editing state
*/
  return isEditing ? inputName : textName;
}
