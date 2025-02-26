import api from '../config/Api';
import { Group } from '../types/models/Group.model';

const GroupService = {
    // Get all groups
    getAllGroups: () => {
        return api.get(`/groups`);
    },

    // Get Group by ID
    getGroup: async (groupId: string): Promise<Group> => {
        const { data } = await api.get<Group>(`/groups/${groupId}`);
        return data;
    },

    // Create group (Admins)
    addGroup: (group: { groupName: string; logo: string; motto: string; members: any[] }) => {
        return api.post('/groups/', group);
    },

    // ✅ Fixed: Update group by ID (Admins)
    updateGroup: (groupId: string, updatedData: Partial<Group>) => {
        return api.put(`/groups/${groupId}`, updatedData);
    },

    // Delete group (Admins)
    deleteGroup: (groupId: string) => {
        return api.delete(`/groups/${groupId}`);
    },

    // ✅ Fixed: Get members of a specific group
    getGroupMembers: (groupId: string) => {
        return api.get(`/groups/${groupId}/members`);
    },

    // ✅ Fixed: Add user to a specific group
    addUserToGroup: (groupId: string, userId: string) => {
        return api.post(`/groups/${groupId}/users`, { userId });
    },

    // ✅ Fixed: Remove user from a specific group
    removeUserFromGroup: (groupId: string, userId: string) => {
        return api.delete(`/groups/${groupId}/users/${userId}`);
    }
};

export default GroupService;
