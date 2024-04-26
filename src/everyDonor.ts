import axios from 'axios';
import { DATA_GOV_API_KEY } from "./config";
import { Candidate } from "./candidate";
import { Donor } from "./donor";

//import ApiHandler from "./apiHandler";

class EveryDonor {
    private candidates: Candidate[];
    currentCandidate: Candidate;

    constructor() {
        this.candidates = [
            new Candidate("Joe Biden", "C00703975"),
            new Candidate("Donald Trump", "C00828541"),
            new Candidate("Robert F. Kennedy Jr", "C00836916"),
            new Candidate("Marianne Williamson", "C00834424"),
            new Candidate("Jill Stein", "C00856112"),
            new Candidate("Cornel West", "C00843508")
        ];
        this.currentCandidate = this.candidates[0];
    }

    async fetchDonations(): Promise<any> {
        let candidate: Candidate | undefined;
        const randomValue = Math.floor(Math.random() * 100);

        //let startDate = new Date('2024-01-01');
        //let endDate = new Date('2024-02-29');
        let minDate: string = '2024-01-01';
        let maxDate: string = '2024-02-29';
        let year: string = '2024';

        if (randomValue <= 39) { 
            // Joe Biden
            this.currentCandidate = this.candidates[0];
        } else if (randomValue >= 40 && randomValue <= 79) {
            // Donald Trump
            this.currentCandidate = this.candidates[1];
        } else if (randomValue >= 80 && randomValue <= 93) {
            // RFK Jr
            this.currentCandidate = this.candidates[2];
        } else if (randomValue >= 94 && randomValue <= 95) {
            // Marianne Williamson
            this.currentCandidate = this.candidates[3];
        } else if (randomValue >= 96 && randomValue <= 97) {
            // Jill Stein
            this.currentCandidate = this.candidates[4];
        } else if (randomValue >= 98 && randomValue <= 99) {
            // Cornel West
            this.currentCandidate = this.candidates[5];
        //} else {
        //    this.currentCandidate = this.candidates[0];
        }

        const url = `https://api.open.fec.gov/v1/schedules/schedule_a/?api_key=${DATA_GOV_API_KEY}&contributor_type=individual&per_page=100&committee_id=${this.currentCandidate.committeeId}&is_individual=true&min_date=${minDate}&max_date=${maxDate}&sort_nulls_large=true&min_amount=200&max_amount=2800&two_year_transaction_period=${year}`;
 
        try {
            console.log('Fetching data from FEC...');
            const response = await axios.get(url);
            return response.data;
         } catch (error) {
            console.log('FLAG C');
         }
    }

    processDonations(data: any): void {
        console.log('FLAG D');
        //console.log('Pagination:', data.pagination);
        //console.log('Results', data.results);
        let donors: Donor[] = [];
        const results = data.results;
        for (var donation of results) {
            //console.log('donation', donation);
            let donor = new Donor(donation, this.currentCandidate);
            donor.printDonor();
            donors.push(donor);
            //contributor = Contributor.new( name: r['contributor_name'], amount: r['contribution_receipt_amount'].to_i, city: r['contributor_city'], state: r['contributor_state'], occupation: r['contributor_occupation'], employer: r['contributor_employer'], candidate: candidate, image_number: r['image_number'], donated_at: r['contribution_receipt_date'] )
            //if contributor.valid_contributor? and contributor.can_tweet?
            //  contributors << contributor
            //end
        }
    }

    //async fetchData(url: string) {
    async fetchData(url: string): Promise<any> {
        try {
           console.log('FLAG B');
           const response = await axios.get(url);
           //console.log(response.data);
           //console.log(response.data.pagination);
           return response.data;
        } catch (error) {
         console.log('FLAG C');
        }
     }

}

export default EveryDonor;