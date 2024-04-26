import axios from 'axios';
import { DATA_GOV_API_KEY } from "./config";

class ApiHandler {
    async fetchData(url: string): Promise<any> {
        try {
            const response = await axios.get(url);
            return response.data;  // This is of type 'any'
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;  // Optionally return null on error
        }
    }
}

class DataProcessor {
    processData(data: any): void {
        if (!data) {
            console.log('No data to process.');
            return;
        }

        // Example of using the data
        //console.log('Data:', data);
        console.log('Pagination:', data.pagination);
    }
}

async function main() {
    const apiHandler = new ApiHandler();
    const dataProcessor = new DataProcessor();
    //const url = "https://api.example.com/data";
    const committeeId = "C00703975";
    const year = 2024;
    const minDate = "2024-01-01";
    const maxDate = "2024-02-29";
    const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${DATA_GOV_API_KEY}&contributor_type=individual&per_page=100&committee_id=${committeeId}&is_individual=true&min_date=${minDate}&max_date=${maxDate}&sort_nulls_large=true&min_amount=200&max_amount=2800&two_year_transaction_period=${year}`

    try {
        const data = await apiHandler.fetchData(url);  // Await the promise to resolve
        dataProcessor.processData(data);
    } catch (error) {
        console.error('Error handling data:', error);
    }
}

main();
