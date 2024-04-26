import EveryDonor from "./everyDonor"

async function main() {
    const everyDonor = new EveryDonor();

    try {
        const data = await everyDonor.fetchDonations();
        // put 20.times here
        everyDonor.processDonations(data);
    } catch (error) {
        console.error('Error handling data:', error);
    }
}

main();