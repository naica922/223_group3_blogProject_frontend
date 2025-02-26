import React, { useEffect, useState } from 'react';
import GroupService from "../../Services/GroupService";

export default function GroupsPage() {
    const [groups, setGroups] = useState<{ id: string, group_name: string }[]>([]);

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

    return (
        <div>
            <h1>Groups</h1>
            <h2>Existing Groups</h2>
            <ul>
                {groups.length > 0 ? (
                    groups.map(group => (
                        <li key={group.id}>
                            <strong>{group.group_name}</strong> (ID: {group.id})
                        </li>
                    ))
                ) : (
                    <p>No groups available.</p>
                )}
            </ul>
        </div>
    );
}
