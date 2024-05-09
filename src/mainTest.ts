import EveryDonor from "./everyDonor"

async function mainTest() {
    const everyDonor = new EveryDonor();

    try {
        const data = await everyDonor.fetchDonations();
        // put 20.times here
        //everyDonor.processDonations(data);
        //everyDonor.list(data);
        const donor = everyDonor.getDonor(data);
        if (donor) { console.log(donor.cast()); }
    } catch (error) {
        console.error('Error handling data:', error);
    }
}

mainTest();