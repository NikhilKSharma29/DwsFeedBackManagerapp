const API_URL = process.env.NEXT_PUBLIC_API_URL ||'http://localhost:3001';

// Transform post to feedback format
const transformPostToFeedback = (post) => ({
  id: post.id,
  name: `User ${post.userId}`,
  email: `user${post.userId}@example.com`,
  message: post.body,
  date: new Date().toISOString(),
  tags: post.tags || []
});

// Common headers for all requests
const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = `Network error: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }
  
  try {
    return await response.json();
  } catch (e) {
    return {}; // Return empty object if no JSON in response
  }
};

export const getFeedbacks = async () => {
  try {
    console.log('Fetching feedbacks from:', `${API_URL}/feedbacks`);
    const response = await fetch(`${API_URL}/feedbacks`, {
      headers: getHeaders(),
      mode: 'cors',
      credentials: 'same-origin'
    });
    const data = await handleResponse(response);
    // Ensure we always return an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error in getFeedbacks:', error);
    throw error;
  }
};

export const createFeedback = async (feedback) => {
  // For demo purposes, just return the feedback with a new ID
  // In a real app, this would be a POST request to your API
  console.log('Creating feedback (simulated):', feedback);
  return {
    ...feedback,
    id: Math.floor(Math.random() * 10000),
    date: new Date().toISOString()
  };
};

export const updateFeedback = async (id, feedback) => {
  // For demo purposes, just return the updated feedback
  // In a real app, this would be a PUT request to your API
  console.log(`Updating feedback ${id} (simulated):`, feedback);
  return {
    ...feedback,
    id,
    date: new Date().toISOString()
  };
};

export const deleteFeedback = async (id) => {
  // For demo purposes, just return the deleted ID
  // In a real app, this would be a DELETE request to your API
  console.log(`Deleting feedback ${id} (simulated)`);
  return { id };
};
