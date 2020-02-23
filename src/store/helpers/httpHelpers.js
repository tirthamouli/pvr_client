import store from "../index";
import axios from "axios";

// Worker based JSON parser and stringify
import { jsonParse, jsonStringify } from "../../worker/index";

/**
 * Generate request params
 * @param {Object} req
 */
async function generateCommonReq(req) {
  // Step 1: Generate request parameters
  const reqParams = {
    method: req.method, // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    validateStatus: status => {
      return status >= 200 && status < 300;
    },
    transformResponse: data => {
      // We are not stingifying the data like it is usually done, instead we use the worker pool
      return data;
    }
  };

  // Step 2: Check if method is post
  if (req.method === "POST") {
    // Stringify using worker
    const stringify = await jsonStringify(req.payload);

    // Check for errors
    if (stringify.error) {
      return {
        error: "NOT_ABLE_TO_STRINGIFY"
      };
    }

    // Set the data
    reqParams.data = stringify.value;
  }

  // Step 3: Return data
  return reqParams;
}

/**
 * Make a simple request
 * @param {Object} req
 */
export const simpleRequest = async req => {
  try {
    // Step 1: Generate req params
    const reqParams = await generateCommonReq(req);

    // Step 2: Send the request and return the response
    const res = await axios(req.url, reqParams);
    const data = await jsonParse(res.data);
    return data.value;
  } catch (err) {
    // Step 1: Return json
    return await jsonParse(err.response.data);
  }
};

/**
 * Make an auth request
 * @param {Object} req
 */
export const authRequest = async (req, token = false) => {
  try {
    // Step 1: Generate request parameters
    const reqParams = await generateCommonReq(req);

    // Step 2: Set auth token
    if (!token) {
      token = store.getters("getUser").token;
    }
    reqParams.headers.Authorization = `Bearer ${token}`;

    // Step 3: Send the request and return the response
    const res = await axios(req.url, reqParams);
    const data = await jsonParse(res.data);
    return data.value;
  } catch (err) {
    // Step 1: Return json
    return await jsonParse(err.response.data);
  }
};
