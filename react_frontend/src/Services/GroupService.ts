import api from '../config/Api';
import { Group } from '../types/models/Group.model';

const GroupService = {
    getAllGroups: () => {
        return api.get(`/groups`);
    },

    // Get Group by id
    getGroup: async (groupId: string): Promise<Group> => {
        const { data } = await api.get<Group>(`/groups/${groupId}`);
        return data;
    },

    // Create group (Admins)
    addGroup: (group: Group) => {
        return api.post('/groups', group);
    },

    // Update group by ID (Admins)
    updateGroup: (group: Group) => {
        return api.put(`/groups/${group.id}`, group);
    },

    // Delete group (Admins)
    deleteGroup: (groupId: string) => {
        return api.delete(`/groups/${groupId}`);
    },

    // Get group members
    getGroupMembers: () => {
        return api.get(`/groups`);
    },

    // Add user to group
    addUserToGroup: (groupId: string, userId: string) => {
        return api.post(`/groups`, { userId });
    },

    // Remove user from group
    removeUserFromGroup: (groupId: string, userId: string) => {
        return api.delete(`/groups`);
    }
};

export default GroupService;
