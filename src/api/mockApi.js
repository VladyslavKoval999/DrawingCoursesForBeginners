import coursesData from '../data/courses.json'; 

const MOCK_PARTICIPANTS = Array.from({ length: 60 }).map((_, i) => ({
  id: i,
  name: `Учасник ${i + 1}`,
  email: `student${i + 1}@art.com`
}));

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCourses = async () => {
  await delay(500);
  return coursesData;
};

export const fetchCourseById = async (id) => {
  await delay(300);
  return coursesData.find(c => c.id === Number(id));
};

export const fetchParticipants = async (eventId, page = 1) => {
  await delay(800);
//   throw new Error("Сервер впав!");
  const start = (page - 1) * 15;
  const end = start + 15;
  return MOCK_PARTICIPANTS.slice(start, end);
};

export const registerUser = async (data) => {
  await delay(1000);
  console.log("Дані успішно отримано сервером:", data);
  return { success: true };
};

const generateMockStats = () => {
  const stats = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    stats.push({
      date: date.toISOString().split('T')[0],
      registrations: Math.floor(Math.random() * 20) + 5
    });
  }
  return stats;
};

export const fetchRegistrationStats = async () => {
  await delay(600);
  return generateMockStats();
};

export const fetchExternalUsers = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
    } catch (error) {
        console.error("External API Error:", error);
        return [];
    }
};