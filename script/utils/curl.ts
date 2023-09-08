import axios from "axios";

export async function getMetaData(url: string): Promise<any> {
  return new Promise((resolve) => {
    axios
      .get(`https://api.hiro.so/metadata/nft${url}`)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
}
