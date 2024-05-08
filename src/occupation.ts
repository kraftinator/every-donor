export class Occupation {

    name: string;

    constructor(name: string) {
        this.name = name;
        if (this.name !== null) { this.name = name.replace(/\s+/g, ' '); }
    }

    isInvalid(): boolean {
        return this.name === null || 
               (this.name.length < 2) || 
               !this.descriptionExist();
    }

    descriptionExist(): boolean {
        return (
            !this.isSelfEmployed() &&
            this.name !== null &&
            !this.isUnemployed() &&
            this.name !== "NONE" &&
            this.name !== "INFORMATION REQUESTED" &&
            this.name !== "NA" &&
            this.name !== "N/A" &&
            this.name !== "Information Requested Per Best Efforts" &&
            this.name !== "DECLINE TO SAY"
        );
    }

    isSelfEmployed(): boolean {
        return (
            this.name === "SELF" || 
            this.name === "SELF EMPLOYED" || 
            this.name === "SELF-EMPLOYED"
        )
    }

    isRetired(): boolean {
        return (
            this.name === "RETIRED" ||
            this.name === "RET"
        )
    }

    isUnemployed(): boolean {
        return (
            this.name === "UNEMPLOYED" || 
            this.name === "NOT CURRENTLY EMPLOYED" || 
            this.name === "NOT EMPLOYED" 
        )
    }

    isDisabled(): boolean {
        return this.name === "DISABLED" || this.name === "DISABLED/RETIRED";
    }
    
    isSpecialDescription(): boolean {
        return this.isJobType(this.name) || this.isJobCategory(this.name);
    }
    
    isJobType(name: string): boolean {
        return name.slice(-5) === " WORK";
    }
    
    isJobCategory(name: string): boolean {
        return (
            name.slice(-6) === "DESIGN" || name.slice(-6) === "ESTATE" ||
            name.slice(-5) === "SALES" || name.slice(-5) === "OLOGY" ||
            name.slice(-8) === "SERVICES" || name.slice(-7) === "FINANCE" ||
            name.slice(-6) === "PHARMA" || name.slice(-5) === "TRASH" ||
            name.slice(-3) === "GAS" || name.slice(-8) === "SECURITY" ||
            name.slice(-4) === "MENT" || name.slice(-7) === "TELECOM" ||
            name.slice(-10) === "HEALTHCARE" || name.slice(-7) === "RETAIL" ||
            name.slice(-9) === "MARKETING" || name.slice(-8) === "SOFTWARE" ||
            name.slice(-2) === "HR" || name.slice(-11) === "ENGINEERING" ||
            name.slice(-7) === "VARIOUS" || name.slice(-4) === "ATRY" ||
            name.slice(-2) === "PR" || name.slice(-5) === "PARTS" ||
            name.slice(-8) === "GRAPHICS" || name.slice(-3) === "ING" ||
            name.slice(-9) === "INSURANCE" || name.slice(-7) === "MEDICAL" ||
            name.slice(-10) === "PRODUCTION" || name.slice(-3) === "ICS" ||
            name.slice(-8) === "RESEARCH" || name.slice(-6) === "ENERGY" ||
            name.slice(-7) === "SERVICE" || name.slice(-11) === "INVESTMENTS" ||
            name.slice(-6) === "ATIONS" || name.slice(-12) === "CONSTRUCTION" ||
            name.slice(-5) === "ATION" || name.slice(-13) === "INFRASTRUCTURE" ||
            name.slice(-8) === "SCIENCES" || name.slice(-12) === "ARCHITECTURE" ||
            name.slice(-3) === "LAW" || name.slice(-8) === "CLERICAL" ||
            name.slice(-3) === "ITY" || name === "IT" || name === "HEALTH CARE" ||
            name === "MUSIC"
        );
    }

    specialDescription(): string | null {
        if (this.isJobType(this.name)) {
            return `I do ${this.displayName()}`;
        } 
        if (this.isJobCategory(this.name)) {
            return `I work in ${this.displayName()}`;
        }
        return null;
    }

    displayName(): string {
        if (this.name === null || this.name.length < 3) {
            return this.name;
        }
    
        let f_name = this.name.split(' ')
            .map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
            .join(' ');
    
        let words = f_name.split(" ");
        words = words.map(word => this.isCapitalizedWord(word) ? word.toUpperCase() : word);
        
        return words.join(" ");
    }

    isCapitalizedWord(word: string): boolean {
        const capitalizedWords: string[] = this.getCapitalizedWords();
        return capitalizedWords.includes(word.toUpperCase());
    }
    
    getCapitalizedWords(): string[] {
        const capitalizedWords: string[] = [
            "CEO", "CFO", "CIO", "CTO", "COO",
            "CPA", "CRNA", "IT", "VP", "SVP",
            "EMT", "II", "III", "USAF", "HR", "RE"
        ];
        return capitalizedWords;
    }

}