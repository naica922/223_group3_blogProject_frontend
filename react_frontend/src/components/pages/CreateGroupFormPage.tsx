import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import UserService from '../../Services/UserService'; // We need this to fetch users
import { Form, Formik } from "formik";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

/**
 * Class description:
 * This class displays a form for admins to create a new group with its attributes.
 * When the form is submitted, it should be visible in the groups list.
 */

export default function CreateGroupFormPage() {
    const navigate = useNavigate();

    const [groupData, setGroupData] = useState({
        groupName: '',
        motto: '',
        logo: '',
        members: [] as string[], // Store selected user IDs
    });

    const [availableUsers, setAvailableUsers] = useState<{ id: string; username: string }[]>([]);

    // Fetch users who are not in any group
    useEffect(() => {
        const fetchAvailableUsers = async () => {
            try {
                const response = await UserService.getUsersWithoutGroup();
                setAvailableUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchAvailableUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Toggle user selection
    const toggleUserSelection = (userId: string) => {
        setGroupData(prevData => ({
            ...prevData,
            members: prevData.members.includes(userId)
                ? prevData.members.filter(id => id !== userId) // Uncheck
                : [...prevData.members, userId] // Check
        }));
    };

    /**
     * Method description:
     * The method handleCreateGroup is responsible for creating the new group.
     * It calls the service and if the operation is successful, the user gets redirected
     * to the home page, otherwise an error is thrown.
     */
    const handleCreateGroup = async () => {
        const newGroup = {
            groupName: groupData.groupName,
            motto: groupData.motto,
            logo: groupData.logo,
            members: groupData.members // Send selected user IDs
        };

        try {
            console.log("Sending group data:", newGroup);
            await GroupService.addGroup(newGroup);
            navigate('/admin/groups');
        } catch (error) {
            console.error("Error creating group:", error);
        }
    };

    return (
        <div>
            <h2>Create Group</h2>
            <Formik
                initialValues={groupData}
                onSubmit={handleCreateGroup}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="groupName"
                            placeholder="Name"
                            value={groupData.groupName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="motto"
                            placeholder="Motto"
                            value={groupData.motto}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="logo"
                            placeholder="Logo"
                            value={groupData.logo}
                            onChange={handleInputChange}
                        />

                        <h3>Select Members</h3>
                        {availableUsers.length > 0 ? (
                            availableUsers.map(user => (
                                <FormControlLabel
                                    key={user.id}
                                    control={
                                        <Checkbox
                                            checked={groupData.members.includes(user.id)}
                                            onChange={() => toggleUserSelection(user.id)}
                                        />
                                    }
                                    label={user.username}
                                />
                            ))
                        ) : (
                            <p>No available users.</p>
                        )}

                        <Button type="submit" id="submitGroup">Create Group</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
