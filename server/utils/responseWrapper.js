/**
 * A wrapper for API request responses
 *
 * @param {*} statusCode The status code of the request
 * @param {object} payload The data returned with the response object
 * @param {object} res Response object sent back to client
 * @returns {json} Response formatted as JSON
 */
const response = (statusCode, payload, res) => res.status(statusCode).json(payload);
export default response;
