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
    const { type, range } = query;
    const [l, r] = range;
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
  try {
    const inputRes = await fetch(API_URL_INPUT);
    if(!inputRes.ok) throw new Error("Error fetching the data");
    const { data, token, query } = await inputRes.json();

    const results = processQueries(data, query);

    const outputRes = await fetch(API_URL_OUTPUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ results }),
    });

    if(!outputRes.ok) throw new Error("Error posting the data");
    
    const result = await outputRes.json();
    return result;
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
};

main();
