import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Button, TextField } from "@mui/material";

export default function GroupEditPage() {
    const { groupId } = useParams();
    const navigate = useNavigate();


    const [groupData, setGroupData] = useState<{
        groupName: string;
        motto: string;
        logo: string;
    }>({
        groupName: '',
        motto: '',
        logo: ''
    });

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await GroupService.getGroup(groupId!);
                setGroupData({
                    groupName: response.groupName,
                    motto: response.motto,
                    logo: response.logo
                });
            } catch (error) {
                console.error("Error fetching group details:", error);
            }
        };

        if (groupId) {
            fetchGroupDetails();
        }
    }, [groupId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateGroup = async () => {
        try {
            await GroupService.updateGroup(groupId!, groupData);
            navigate('/admin/groups');
        } catch (error) {
            console.error("Error updating group:", error);
        }
    };

    return (
        <div>
            <h1>Edit Group</h1>

            <TextField
                label="Group Name"
                name="groupName"
                value={groupData.groupName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Group Motto"
                name="motto"
                value={groupData.motto}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Group Logo URL"
                name="logo"
                value={groupData.logo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateGroup}
                style={{ marginTop: '15px', marginRight: '10px' }}
            >
                Save Changes
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/admin/groups')}
                style={{ marginTop: '15px' }}
            >
                Cancel
            </Button>
        </div>
    );
}
