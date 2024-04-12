import axios from 'axios';
import { DATA_GOV_API_KEY } from "./config";
import { Candidate } from "./candidate";

class EveryDonor {
    private candidates: Candidate[];

    constructor() {
        this.candidates = [
            new Candidate("Joe Biden", "C00703975"),
            new Candidate("Donald Trump", "C00828541"),
            new Candidate("Robert F. Kennedy Jr", "C00836916"),
            new Candidate("Marianne Williamson", "C00834424"),
            new Candidate("Jill Stein", "C00856112"),
            new Candidate("Cornel West", "C00843508")
        ];
    }

    getDonations(): String[] {
        return ['h'];
    }
}