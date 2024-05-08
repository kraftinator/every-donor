import EveryDonor from "./everyDonor"

async function list() {
    const everyDonor = new EveryDonor();

    try {
        const data = await everyDonor.fetchDonations();
        everyDonor.list(data);
    } catch (error) {
        console.error('Error handling data:', error);
    }
}

list();