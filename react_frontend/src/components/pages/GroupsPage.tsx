import React, { useEffect, useState } from 'react';
import GroupService from "../../Services/GroupService";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

export default function GroupsPage() {
    const [groups, setGroups] = useState<{ id: string, group_name: string }[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const groupsPerPage = 3;
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

    // Pagination logic
    const indexOfLastGroup = currentPage * groupsPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
    const paginatedGroups = groups.slice(indexOfFirstGroup, indexOfLastGroup);

    return (
        <div>
            <h1>Groups</h1>
            <Button
                id="createButton"
                variant="contained"
                color="primary"
                onClick={() => navigate('/admin/groups/create')}
                style={{ marginBottom: '15px' }}
            >
                Create Group
            </Button>
            <h2>Existing Groups</h2>
            {groups.length > 0 ? (
                <>
                    <ul>
                        {paginatedGroups.map(group => (
                            <li key={group.id}>
                                <strong>{group.group_name}</strong> (ID: {group.id})
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => navigate(`/admin/groups/edit/${group.id}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => navigate(`/admin/groups/${group.id}`)}
                                >
                                    View
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(group.id)}
                                >
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>

                    {/* Pagination Controls */}
                    <div style={{ marginTop: '15px' }}>
                        <Button
                            variant="contained"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>
                        <span style={{ margin: '0 10px' }}>
                            Page {currentPage} of {Math.ceil(groups.length / groupsPerPage)}
                        </span>
                        <Button
                            variant="contained"
                            disabled={indexOfLastGroup >= groups.length}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <p>No groups available.</p>
            )}
        </div>
    );
}
