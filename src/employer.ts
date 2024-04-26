export class Employer {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    isSelfEmployed(): boolean {
        return this.name === "SELF" || 
               this.name === "SELF EMPLOYED" || 
               this.name === "SELF-EMPLOYED";
    }

    isRetired(): boolean {
        return this.name === "RETIRED";
    }

    isUnemployed(): boolean {
        return this.name === "UNEMPLOYED" || 
               this.name === "NOT CURRENTLY EMPLOYED" || 
               this.name === "NOT EMPLOYED";
    }

    isDisabled(): boolean {
        return this.name === "DISABLED";
    } 
    
    isInvalid(): boolean {
        return this.name === null || 
               (this.name.length < 2) || 
               !this.hasDescription();
    }

    hasDescription(): boolean {
        if (this.name === null || 
            this.name === "N/A" || 
            this.name === "NONE" || 
            this.name === "PRIVATE" || 
            this.name === "HOMEMAKER" || 
            this.name === "STUDENT" || 
            this.name === "NA" || 
            this.name === "ENTREPRENEUR" || 
            this.name === "INFORMATION REQUESTED") {
            return false;
        }
        return /[0-9a-z ]/i.test(this.name); // Checks if the name contains alphanumeric or space characters
    }

    isCapitalizedWord(word: string): boolean {
        const capitalizedWords = this.getCapitalizedWords();
        return capitalizedWords.includes(word.toUpperCase());
    }
    
    getCapitalizedWords(): string[] {
        return [
            "LLC", "BMI", "MRI", "NYS", "UPS", 
            "UBS", "UCLA", "UNMH", "MUFG", "OIG", 
            "NASA", "USAP", "SEIU", "SCARNG"
        ];
    }

    displayName(): string {
        if (this.name.length < 4) {
            return this.name;
        }

        let f_name = this.titleCase(this.name);
        let words = f_name.split(" ");

        words = words.map(word => {
            if (this.isCapitalizedWord(word) || !this.containsVowels(word.toLowerCase())) {
                word = word.toUpperCase();
            }
            if ((word.startsWith("Mc") || word.startsWith("O'")) && word.length > 3) {
                word = word.substring(0, 2) + word.charAt(2).toUpperCase() + word.substring(3);
            }
            return word;
        });

        return words.join(" ");
    }

    private titleCase(input: string): string {
        return input.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    private containsVowels(word: string): boolean {
        return /[aeiouy]/.test(word);
    }

}