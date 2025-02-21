import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

export default function GroupsPage() {
    const navigate = useNavigate();

    const handleNavigateToCreateGroup = () => {
        navigate('/create');
    };

    return (
        <div>
            <h1>Groups</h1>
            <Button variant="contained" onClick={handleNavigateToCreateGroup}>
                Create Group
            </Button>
        </div>
    );
}
