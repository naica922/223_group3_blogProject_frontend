import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Form, Formik } from "formik";
import { Button } from "@mui/material";

export default function CreateGroupFormPage() {
    const navigate = useNavigate();

    const [groupData, setGroupData] = useState({
        group_name: '',
        group_logo: '',
        group_motto: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateGroup = async () => {
        const newGroup = {
            ...groupData,
            id: '',
            memberEmails: []
        };

        try {
            await GroupService.addGroup(newGroup);
            navigate('/authenticatedHome');
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
                            name="group_name"
                            placeholder="Name"
                            value={groupData.group_name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="group_motto"
                            placeholder="Motto"
                            value={groupData.group_motto}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="group_logo"
                            placeholder="Logo"
                            value={groupData.group_logo}
                            onChange={handleInputChange}
                        />
                        <Button type="submit">Create Group</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
