import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Button } from "@mui/material";

/**
 * Class description:
 * This class is responsible to display a group by its id.
 * It communicates with the service and handles exceptions.
 */

export default function GroupDetailPage() {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState<{
        id: string;
        groupName: string;
        motto: string;
        logo: string;
        members: { id: string; username: string; email: string }[]; // Updated for members
    } | null>(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await GroupService.getGroup(groupId!);
                console.log("API Response:", response); // Debugging

                setGroup({
                    ...response,
                    members: response.members || [], // Ensure members exists
                });
            } catch (error) {
                console.error("Error fetching group details:", error);
            }
        };

        if (groupId) {
            fetchGroupDetails();
        }
    }, [groupId]);


    return (
        <div>
            <h1>Group Details</h1>
            {group ? (
                <div>
                    <p><strong>ID:</strong> {group.id}</p>
                    <p><strong>Name:</strong> {group.groupName}</p>
                    <p><strong>Motto:</strong> {group.motto}</p>
                    {group.logo && <img src={group.logo} alt="Group Logo" style={{ width: '150px', height: '150px' }} />}

                    <h2>Members</h2>
                    {group.members.length > 0 ? (
                        <ul>
                            {group.members.map(member => (
                                <li key={member.id}>
                                    <strong>{member.username}</strong> ({member.email})
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No members in this group.</p>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/admin/groups')}
                        style={{ marginTop: '15px' }}
                    >
                        Back to Groups
                    </Button>
                </div>
            ) : (
                <p>Loading group details...</p>
            )}
        </div>
    );
}
