import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import UserService from '../../Services/UserService';
import { Form, Formik } from "formik";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";

export default function EditGroupFormPage() {
    const navigate = useNavigate();
    const { groupId } = useParams();

    const [groupData, setGroupData] = useState({
        groupName: '',
        motto: '',
        logo: '',
        members: [] as string[], // Store selected user IDs
    });

    const [availableUsers, setAvailableUsers] = useState<{ id: string; username: string }[]>([]);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                // Fetch current group details
                const groupResponse = await GroupService.getGroup(groupId!);
                console.log("Fetched group data:", groupResponse); // Debugging

                if (!groupResponse || !groupResponse.members) {
                    console.error("Group members not found!");
                    return;
                }

                // Extract existing members' IDs
                const existingMemberIds = groupResponse.members.map((user: any) => user.id);

                setGroupData({
                    groupName: groupResponse.groupName,
                    motto: groupResponse.motto,
                    logo: groupResponse.logo,
                    members: existingMemberIds // Store only the IDs
                });

                // Fetch users who are **not** assigned to any group
                const usersResponse = await UserService.getUsersWithoutGroup();
                console.log("Fetched available users:", usersResponse.data); // Debugging

                // Add existing group members to the available user list
                const allSelectableUsers = [...usersResponse.data, ...groupResponse.members];

                // Remove duplicates (users who are already listed in available users)
                const uniqueUsers = allSelectableUsers.filter(
                    (user, index, self) => index === self.findIndex((u) => u.id === user.id)
                );

                setAvailableUsers(uniqueUsers);
            } catch (error) {
                console.error("Error fetching group details or users:", error);
            }
        };

        if (groupId) {
            fetchGroupDetails();
        }
    }, [groupId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const toggleUserSelection = (userId: string) => {
        setGroupData(prevData => ({
            ...prevData,
            members: prevData.members.includes(userId)
                ? prevData.members.filter(id => id !== userId) // Remove if already selected
                : [...prevData.members, userId] // Add if not selected
        }));
    };

    const handleUpdateGroup = async () => {
        const updatedGroup = {
            groupName: groupData.groupName,
            motto: groupData.motto,
            logo: groupData.logo,
            members: groupData.members.map(id => ({ id, username: '', email: '' })) // Send only IDs
        };

        try {
            console.log("Updating group data:", updatedGroup);
            await GroupService.updateGroup(groupId!, updatedGroup);
            navigate('/admin/groups');
        } catch (error) {
            console.error("Error updating group:", error);
        }
    };

    return (
        <div>
            <h2>Edit Group</h2>
            <Formik
                initialValues={groupData}
                enableReinitialize
                onSubmit={handleUpdateGroup}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Group Name"
                            name="groupName"
                            value={groupData.groupName}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Motto"
                            name="motto"
                            value={groupData.motto}
                            onChange={handleInputChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Logo URL"
                            name="logo"
                            value={groupData.logo}
                            onChange={handleInputChange}
                        />

                        <h3>Edit Members</h3>
                        <p>Select/Deselect members to update the group</p>

                        {availableUsers.length > 0 ? (
                            availableUsers.map(user => (
                                <FormControlLabel
                                    key={user.id}
                                    control={
                                        <Checkbox
                                            checked={groupData.members.includes(user.id)}
                                            onChange={() => toggleUserSelection(user.id)}
                                            sx={{
                                                color: groupData.members.includes(user.id) ? 'blue' : undefined,
                                            }}
                                        />
                                    }
                                    label={user.username}
                                />
                            ))
                        ) : (
                            <p>No available users.</p>
                        )}

                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Update Group
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
