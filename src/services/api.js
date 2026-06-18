// API Service - Backend Connection

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';


// Helper function for handling responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// API Service Object
export const api = {
  // ========== PROJECTS ==========
  
  // Get all active projects (Public)
  getProjects: async (category = 'All') => {
    try {
      const url = category === 'All' 
        ? `${API_URL}/projects` 
        : `${API_URL}/projects?category=${category}`;
      const response = await fetch(url);
      return await handleResponse(response);
    } catch (error) {
      console.error('Get projects error:', error);
      return { success: false, projects: [], message: error.message };
    }
  },

  // Get single project by ID (Public)
  getProject: async (id) => {
    try {
      const response = await fetch(`${API_URL}/projects/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Get project error:', error);
      return { success: false, project: null, message: error.message };
    }
  },

  // ========== CONTACT ==========
  
  // Submit contact form (Public)
  submitContact: async (formData) => {
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Submit contact error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  },

  // ========== AUTH (Admin) ==========
  
  // Admin login
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await handleResponse(response);
      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminData', JSON.stringify(data.admin));
      }
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  },

  // Get current admin profile (Admin)
  getAdminProfile: async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        return { success: false, message: 'No token found' };
      }
      
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Get profile error:', error);
      return { success: false, message: error.message };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  },

  // Check if admin is logged in
  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  },
};

export default api;