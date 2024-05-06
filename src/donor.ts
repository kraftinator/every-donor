import { Candidate } from "./candidate";
import { Employer } from "./employer";
import { Occupation } from "./occupation";

export class Donor {

    name: string;
    amount: number;
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

        if (this.occupation.name === this.employer.name) {
            this.employer.name = '';
        }
        
    }

    printDonor(): void {
        //console.log('displayName', this.displayName());
        //console.log('displayLocation', this.displayLocation());
        //console.log('donatedAt', this.donatedAt);
        
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

    //def can_tweet?
    //!tweet.nil? ? true : false
  //end

    validDonor(): boolean {
        //console.log('this.occupation.isInvalid()', this.occupation.isInvalid());
        if (
            this.name === null || 
            this.name.trim() === '' || 
            this.displayName() === null || 
            this.city === null || 
            this.state === null ||
            this.city.length < 3 || 
            this.amount < 200 || 
            (this.occupation.isInvalid() && this.employer.isInvalid())) {
                return false;
        }
        return true;
    }


    cast(): string | null {
        const t1: string = `I'm ${this.displayName()}. On ${this.formattedDate()} I gave $${Math.floor(this.amount)} to ${this.candidate.name}. I live in ${this.displayLocation()}.`;
        if (!this.displayEmployment()) { 
            return null; 
        }
        const t2 = this.displayEmployment();
        let t = `${t1} ${t2}`;
        return t;
    }

    canCast(): boolean {
        return !!this.cast();
    }

    //formattedDate(): string {
    //    return this.donatedAt;
    //}

    /*
    formattedDate(): string {
        const date = new Date(this.donatedAt); // Convert the string to a Date object

        // Extract the parts of the date
        const month = date.getMonth() + 1; // getMonth() returns 0-11, +1 to make it 1-12
        const day = date.getDate(); // getDate() returns 1-31
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

        // Format date as M/D/YY
        return `${month}/${day}/${year}`;
    }
    */

    formattedDate(): string {
        // Parse the input date string into a Date object
        const date = new Date(this.donatedAt);
    
        // Extract the month, day, and year using UTC methods
        const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11, +1 to make it 1-12
        const day = date.getUTCDate(); // getUTCDate() returns 1-31
        const year = date.getUTCFullYear().toString().slice(-2); // getUTCFullYear() for the year, slice(-2) to get the last two digits

        // Format date as M/D/YY
        return `${month}/${day}/${year}`;
    }

    displayShortEmployment(): string {
        // Build job description
        let result: string = this.buildShortEmployment();

        // Format, if necessary
        // Check if the last two characters are ".."
        if (result.slice(-2) === "..") {
            result = result.slice(0, -1); // Remove the last character
        }

        return result;
    }

    //displayEmployment(): string | null {
    displayEmployment(): any {
        // Build job description
        let result: string | null = this.buildEmployment();

        // Return if result is null
        if (!result) {
            return null;
        }

        // Format, if necessary
        // Check if the last two characters are ".."
        if (result.slice(-2) === "..") {
            result = result.slice(0, -1); // Remove the last character
        }

        return result;
    }

    buildShortEmployment(): string {
        // Self-employed
        if (this.employer.isSelfEmployed()) {
            return "I'm self-employed.";
        }

        // Retired
        if (this.employer.isRetired()) {
            return "I'm retired.";
        }

        // Unemployed with no occupation description
        if (this.employer.isUnemployed()) {
            return "I'm unemployed.";
        }

        // Disabled with no occupation description
        if (this.employer.isDisabled()) {
            return "I'm disabled.";
        }

        // Has a description
        if (this.employer.hasDescription()) {
            return `I work at ${this.employer.displayName}.`;
        }

        // If none of the above conditions are met
        return "";
    }

    buildEmployment(): string {
        // Self-employed with no occupation description
        if (this.employer.isSelfEmployed() && !this.occupation.descriptionExist()) {
            return "I'm self-employed.";
        }

        // Self-employed with an occupation description
        if (this.employer.isSelfEmployed() && this.occupation.descriptionExist()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()}.`;
            } else {
                return `I'm ${this.indefiniteArticle(this.occupation.displayName())}.`;
            }
        }

        // Retired conditions
        if (this.employer.isRetired() && !this.occupation.descriptionExist()) {
            return "I'm retired.";
        }
        if (this.employer.isRetired() && this.occupation.descriptionExist() && !this.occupation.isRetired()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()}.`;
            } else {
                return `I'm a retired ${this.occupation.displayName()}.`;
            }
        }
        if (this.occupation.isRetired()) {
            return "I'm retired.";
        }

        // Unemployed conditions
        if (this.employer.isUnemployed() && !this.occupation.descriptionExist()) {
            return "I'm unemployed.";
        }
        if (this.employer.isUnemployed() && this.occupation.descriptionExist() && !this.occupation.isUnemployed()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()}.`;
            } else {
                return `I'm an unemployed ${this.occupation.displayName()}.`;
            }
        }
        if (this.occupation.isUnemployed()) {
            return "I'm unemployed.";
        }

        // Disabled conditions
        if (this.employer.isDisabled() && !this.occupation.descriptionExist()) {
            return "I'm disabled.";
        }
        if (this.employer.isDisabled() && this.occupation.descriptionExist() && !this.occupation.isDisabled()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()}.`;
            } else {
                return `I'm a disabled ${this.occupation.displayName()}.`;
            }
        }
        if (this.occupation.isDisabled()) {
            return "I'm disabled.";
        }

        // No occupation description
        if (!this.occupation.descriptionExist()) {
            return `I work at ${this.employer.displayName()}.`;
        }

        // No employer description
        if (!this.employer.hasDescription() && this.occupation.descriptionExist()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()}.`;
            } else {
                return `I work as ${this.indefiniteArticle(this.occupation.displayName())}.`;
            }
        }

        // Default job description
        if (this.occupation.descriptionExist()) {
            if (this.occupation.isSpecialDescription()) {
                return `${this.occupation.specialDescription()} at ${this.employer.displayName()}.`;
            } else {
                return `I work as ${this.indefiniteArticle(this.occupation.displayName())} at ${this.employer.displayName()}.`;
            }
        }

        return ""; // If no conditions are met, return an empty string or a default message.
    }

    indefiniteArticle(paramsWord: string): string {
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        // Check if the first letter of the word is a vowel
        return vowels.includes(paramsWord[0].toUpperCase()) ? `an ${paramsWord}` : `a ${paramsWord}`;
    }

    displayLocation(): string {
        return `${this.titleCase(this.city)}, ${this.state}`;
    }

    displayName(): string | null {
        let names = this.name.split(",");
        if (names.length !== 2) {
            return null;
        }

        let firstName = names[1].trim();

        // Handling prefixes
        if (firstName.includes(" DR.")) {
            firstName = firstName.replace(" DR.", "");
            firstName = `Dr. ${firstName}`;
        }

        if (firstName.includes(" HON.")) {
            firstName = firstName.replace(" HON.", "");
            firstName = `Hon. ${firstName}`;
        }

        // Removing various titles
        const titles = ["(RET)", "III", " USAF ", " MISS", " MRS.", " MRS", " COL ", " COL.", " HON ", " HON.", " MD", " MR.", " MR", " MS.", " MS", " SR.", " SR", " JR.", " JR"];
        titles.forEach(title => {
            firstName = firstName.replace(title, "");
        });

        let fullName = `${firstName} ${names[0]}`;
        fullName = this.titleCase(fullName.trim());

        // Handling Mc and O' cases
        let words = fullName.split(" ");
        words = words.map(word => {
            if ((word.startsWith("Mc") || word.startsWith("O'")) && word.length > 3) {
                return word.substring(0, 2) + word[2].toUpperCase() + word.substring(3);
            }
            return word;
        });
        
        fullName = words.join(" ");

        // Remove trailing period if necessary
        if (fullName.endsWith(".")) {
            fullName = fullName.slice(0, -1);
        }

        return fullName;
    }

    private titleCase(input: string): string {
        return input.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

}
