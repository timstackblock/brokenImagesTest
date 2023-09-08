import { getMetaData } from "../../utils/curl";
import allURLs from "../../../files/tokens.json";
const isImageURL = require("image-url-validator").default;
import * as async from 'async';
import {timeDifference} from "../../utils/helper";

export const runBrokenImageScript = async (): Promise<any> => {
  return new Promise(resolve => {
    async.eachSeries(allURLs, async (address, cb) => {
      const startDate = new Date();
      console.log("\x1b[0m", `PROCESSING the API for ${address}`);
      const response = await getMetaData(address);
      if (response.status !== 200) {
        console.log("\x1b[31m", `The API response for ${address} is not 200`);
        return cb();
      }
      const { image, cached_image } = response.data.metadata;
      const isImageValid = await isImageURL(image);
      const isCachedImageValid = await isImageURL(cached_image);

      const endDate = new Date();
      if(timeDifference(startDate, endDate) > 10) {
        console.log("\x1b[31m", `The execution time for API ${address} exceeds 10 seconds`);
        return cb();
      }
      if(isImageValid) {
        console.log("\x1b[32m", 'SUCCESS: Image URL returned a 200 response')
      } else {
        console.log("\x1b[31m", 'FAILED: Image URL did NOT return a 200 response')
      }
      if(isCachedImageValid) {
        console.log("\x1b[32m", 'SUCCESS: Cached Image URL returned a 200 response')
      } else {
        console.log("\x1b[31m", 'FAILED: Cached Image URL did NOT return a 200 response')
      }
      console.log('\n');
      cb();
    }, () => {
      resolve(null);
    });
  });

};
