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
        groupName: '',
        motto: '',
        logo: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGroupData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    /**
     * Method description:
     * The method handleCreateGroup is responsible for creating the new group.
     * It calls the service and if the operation is successful, the user gets redirected
     * to the home page, otherwise an error is thrown.
     */
    const handleCreateGroup = async () => {
        const newGroup = {
            groupName: groupData.groupName,
            motto: groupData.motto,
            logo: groupData.logo,
            members: []
        };

        try {
            console.log("Sending group data:", newGroup);
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
                            name="groupName"
                            placeholder="Name"
                            value={groupData.groupName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="motto"
                            placeholder="Motto"
                            value={groupData.motto}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="logo"
                            placeholder="Logo"
                            value={groupData.logo}
                            onChange={handleInputChange}
                        />
                        <Button type="submit">Create Group</Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
