import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Button } from "@mui/material";

export default function GroupDetailPage() {
    const { groupId } = useParams();
    const navigate = useNavigate();

    
    const [group, setGroup] = useState<{
        id: string;
        groupName: string;
        motto: string;
        logo: string;
    } | null>(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await GroupService.getGroup(groupId!);
                setGroup(response);
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

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/groups')}
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
