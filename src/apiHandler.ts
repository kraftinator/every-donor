import axios from 'axios';

class ApiHandler {
    async fetchData(url: string): Promise<any> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }
}