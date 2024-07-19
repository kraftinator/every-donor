import axios from 'axios';
import { DATA_GOV_API_KEY } from "./config";
import { Candidate } from "./candidate";
import { Donor } from "./donor";

class EveryDonor {
    private candidates: Candidate[];
    currentCandidate: Candidate;
    year: string;

    constructor() {
        this.candidates = [
            new Candidate("Joe Biden", "C00703975"),
            new Candidate("Donald Trump", "C00828541"),
            new Candidate("Robert F. Kennedy Jr", "C00836916"),
            new Candidate("Jill Stein", "C00856112"),
            new Candidate("Cornel West", "C00843508")
        ];
        this.currentCandidate = this.candidates[0];
        this.year = "2024";
    }

    async fetchDonations(): Promise<any> {
        let candidate: Candidate | undefined;
        const randomValue = Math.floor(Math.random() * 100);

        // Get date
        const randomDate = this.getRandomDateInRange('2024-04-01', '2024-05-31');
        const minDate = randomDate;
        const maxDate = this.addDaysToDate(randomDate, 1);

        if (randomValue <= 37) { 
            // Joe Biden
            this.currentCandidate = this.candidates[0]; 
        } else if (randomValue >= 38 && randomValue <= 74) {
            // Donald Trump
            this.currentCandidate = this.candidates[1];
        } else if (randomValue >= 75 && randomValue <= 95) {
            // RFK Jr
            this.currentCandidate = this.candidates[2];
        } else if (randomValue >= 96 && randomValue <= 97) {
            // Jill Stein
            this.currentCandidate = this.candidates[3];
        } else if (randomValue >= 98 && randomValue <= 99) {
            // Cornel West
            this.currentCandidate = this.candidates[4];
        }

        // Build FEC API call
        let url = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${DATA_GOV_API_KEY}&contributor_type=individual&per_page=100&committee_id=${this.currentCandidate.committeeId}&is_individual=true&min_date=${minDate}&max_date=${maxDate}&sort_nulls_large=true&min_amount=200&max_amount=2800&two_year_transaction_period=${this.year}`;
 
        try {
            console.log('Fetching data from FEC...');
            let response = await axios.get(url);

            //console.log('pagination', response.data.pagination)
            let results = response.data.results;
            
            if (results.length === 100) {
                for (let i = 0; i < 20; i++) {
                    const pagination = response.data.pagination
                    const lastIndex = pagination['last_indexes']['last_index']
                    const lastContributionReceiptDate = pagination['last_indexes']['last_contribution_receipt_date'];
                    url = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${DATA_GOV_API_KEY}&contributor_type=individual&per_page=100&committee_id=${this.currentCandidate.committeeId}&is_individual=true&min_date=${minDate}&max_date=${maxDate}&sort_nulls_large=true&min_amount=200&max_amount=2800&two_year_transaction_period=${this.year}&last_index=${lastIndex}&last_contribution_receipt_date=${lastContributionReceiptDate}`;
                    response = await axios.get(url);
                    if (!response.data.results) { break; }
                    results = results.concat(response.data.results);
                    if (response.data.results.length < 100) { break; }
                }
            }
            
            return results;
         } catch (error) {
            console.log('error', error);
         }
    }

    list(data: any): void {
        const donors = this.processDonations(data);
        for (var donor of donors) { console.log(donor.cast()); }
    }

    getDonor(data: any): Donor | undefined {
        const donors = this.processDonations(data);
        if (donors.length === 0) return undefined;

        const randomIndex = Math.floor(Math.random() * donors.length);
        return donors[randomIndex];
    }

    processDonations(data: any): Donor[] {
        let donors: Donor[] = [];
        const results = data;
        
        for (var donation of results) {
            let committee = donation.committee;

            if (!(committee.cycle.toString() === this.year && committee.committee_type === 'P')) {
                continue;
            }

            if (committee.committee_type === 'P' && (committee.contribution_receipt_amount < 200 || committee.contribution_receipt_amount > 3300)) {
                continue;
            }

            let donor = new Donor(donation, this.currentCandidate);
            if (donor.validDonor() && donor.canCast()) {
                donors.push(donor);
            } else {
                // Do nothing
            }

        }
        return donors;
    }

     getRandomDateInRange(minDate: string, maxDate: string): string {
        const startDate = new Date(minDate);
        const endDate = new Date(maxDate);
    
        // getTime returns the number of milliseconds since the Unix Epoch (Jan 1, 1970)
        const start = startDate.getTime();
        const end = endDate.getTime();
    
        // Generate a random time between the start and end times
        const randomTime = start + Math.random() * (end - start);

        const randomDate = new Date(randomTime);
        const formattedDate = randomDate.toISOString().substring(0, 10);
        return formattedDate;
    }

    addDaysToDate(dateStr: string, daysToAdd: number): string {
        const date = new Date(dateStr); // Create a Date object from the input string
        date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
        
        // Formatting the date back to a string in YYYY-MM-DD format
        const formattedDate = date.toISOString().substring(0, 10);
        return formattedDate;
    }

}

export default EveryDonor;