import { MESSAGE } from "./utils";
import neynarClient from "./neynarClient";
import {
  PUBLISH_CAST_TIME,
  SIGNER_UUID,
  TIME_ZONE,
  NEYNAR_API_KEY,
} from "./config";
import { isApiErrorResponse } from "@neynar/nodejs-sdk";
import EveryDonor from "./everyDonor"

// Validating necessary environment variables or configurations.
if (!SIGNER_UUID) {
  throw new Error("SIGNER_UUID is not defined");
}

if (!NEYNAR_API_KEY) {
  throw new Error("NEYNAR_API_KEY is not defined");
}

/**
 * Function to publish a message (cast) using neynarClient.
 * @param msg - The message to be published.
 */
const publishCast = async () => {
    const everyDonor = new EveryDonor();
    try {
        const data = await everyDonor.fetchDonations();
        const donor = everyDonor.getDonor(data);
        if (donor) {
            const result = donor.cast();
            let msg: string;
            if (result !== null) { 
                msg = result; 
                await neynarClient.publishCast(SIGNER_UUID, msg);
                console.log(msg);
            }
        }        
    } catch (err) {
        // Error handling, checking if it's an API response error.
        if (isApiErrorResponse(err)) {
            console.log(err.response.data);
        } else console.log(err);
    }
};

// Initial call to publish a motivational message.
publishCast();


