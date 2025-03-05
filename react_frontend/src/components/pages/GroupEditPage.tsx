import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Form, Formik } from "formik";
import { Button, TextField } from "@mui/material";

export default function EditGroupFormPage() {
    const navigate = useNavigate();
    const { groupId } = useParams();

    const [groupData, setGroupData] = useState({
        groupName: '',
        motto: '',
        logo: '',
        members: [] as string[], // Store selected user IDs
    });

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
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Update Group
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
