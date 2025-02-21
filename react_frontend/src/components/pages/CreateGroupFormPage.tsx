import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupService from '../../Services/GroupService';
import { Form, Formik } from "formik";
import { Button } from "@mui/material";

/**
 * Class description:
 * This class displays a form for admins to create a new group with its attributes.
 * When the form is submitted, it should be visible in the groups list.
 */

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

    /**
     * method description:
     * The method handleCreateGroup is responsible to create the new group.
     * It calls the service and if the operation was successful, the user gets redirected to
     * the intern home page, otherwise an error is thrown.
     */

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
