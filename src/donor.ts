import { Candidate } from "./candidate";
import { Employer } from "./employer";
import { Occupation } from "./occupation";

export class Donor {

    name: string;
    amount: string;
    city: string;
    state: string;
    occupation: Occupation;
    employer: Employer;
    imageNumber: string;
    donatedAt: string;
    candidate: Candidate;

    constructor(donation: any, candidate: Candidate) {
        this.name = donation.contributor_name;
        this.amount = donation.contribution_receipt_amount;
        this.city = donation.contributor_city;
        this.state = donation.contributor_state;
        this.occupation = new Occupation(donation.contributor_occupation);
        this.employer = new Employer(donation.contributor_employer);
        this.imageNumber = donation.image_number;
        this.donatedAt = donation.contribution_receipt_date;
        this.candidate = candidate;
    }

    printDonor(): void {
        console.log('name', this.name);
        console.log('amount', this.amount);
        console.log('city', this.city);
        console.log('state', this.state);
        console.log('occupation', this.occupation.displayName());
        console.log('employer', this.employer.displayName());
        console.log('imageNumber', this.imageNumber);
        console.log('donatedAt', this.donatedAt);
        console.log('candidate', this.candidate.name);
    }

}
