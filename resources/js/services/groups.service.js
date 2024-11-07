import api from './api.service';

export const GroupsService = {
  async fetchGroups() {
    try {
      const response = await api.get('/groups');
      return response.data;
    } catch (error) {
      console.error('Error fetching groups:', error);
      throw error;
    }
  },

  async createGroup(groupData) {
    try {
      const response = await api.post('/groups', groupData);
      return response.data;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  },

  async updateGroup(groupId, groupData) {
    try {
      const response = await api.put(`/groups/${groupId}`, groupData);
      return response.data;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  },

  async deleteGroup(groupId) {
    try {
      const response = await api.delete(`/groups/${groupId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }
};
