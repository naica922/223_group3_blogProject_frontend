import React, { useEffect, useState } from 'react';
import GroupService from "../../Services/GroupService";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

//TODO: Use atomic design for some components for example the buttons

export default function GroupsPage() {
    const [groups, setGroups] = useState<{ id: string, group_name: string }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await GroupService.getAllGroups();
                setGroups(response.data);
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };
        fetchGroups();
    }, []);

    const handleDelete = async (groupId: string) => {
        try {
            await GroupService.deleteGroup(groupId);
            setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId)); // Remove from UI
        } catch (error) {
            console.error("Error deleting group:", error);
        }
    };

    return (
        <div>
            <h1>Groups</h1>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/admin/groups/create')}
                style={{ marginBottom: '15px' }}
            >
                Create Group
            </Button>
            <h2>Existing Groups</h2>
            <ul>
                {groups.length > 0 ? (
                    groups.map(group => (
                        <li key={group.id}>
                            <strong>{group.group_name}</strong> (ID: {group.id})
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(`/admin/groups/edit/${group.id}`)}
                            >
                                Edit Group
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => navigate(`/admin/groups/${group.id}`)}
                            >
                                View Group
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDelete(group.id)}
                            >
                                Delete Group
                            </Button>
                        </li>
                    ))
                ) : (
                    <p>No groups available.</p>
                )}
            </ul>
        </div>
    );
}
