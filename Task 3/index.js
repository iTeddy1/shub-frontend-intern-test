const axios = require("axios");

const API_URL_INPUT = "https://share.shub.edu.vn/api/intern-test/input";
const API_URL_OUTPUT = "https://share.shub.edu.vn/api/intern-test/output";

function processQueries(data, queries) {
  const n = data.length;

  const prefixSum = Array(n + 1).fill(0);
  const evenSum = Array(n + 1).fill(0);
  const oddSum = Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    prefixSum[i + 1] = prefixSum[i] + data[i];
    evenSum[i + 1] = evenSum[i] + (i % 2 === 0 ? data[i] : 0);
    oddSum[i + 1] = oddSum[i] + (i % 2 !== 0 ? data[i] : 0);
  }

  const results = [];
  for (const query of queries) {
    const [type, l, r] = query;
    if (type === 1) {
      results.push(prefixSum[r + 1] - prefixSum[l]);
    } else if (type === 2) {
      const even = evenSum[r + 1] - evenSum[l];
      const odd = oddSum[r + 1] - oddSum[l];
      results.push(even - odd);
    }
  }

  return results;
}

const main = async () => {
  const res = await axios.get(API_URL_INPUT);
  const data = res.data;
  const token = res.token;
  const body = processQueries(data.number, query);

  const result = await axios.post(API_URL_OUTPUT, {
    header: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  return result.data;
};

main();
