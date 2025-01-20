const XLSX = require("xlsx");
const axios = require("axios");

// Load the Excel file

async function fetchAndReadExcel(url) {
  try {
    const options = {
      url,
      method: "GET",
      responseType: "arraybuffer",
    };
    const res = await axios(options);
    const workbook = XLSX.read(res.data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rawData = XLSX.utils.sheet_to_json(sheet);

    const data = rawData.map((row) => {
      const normalizedRow = {};
      Object.keys(row).forEach((key) => {
        const trimmedKey = key.trim(); 
        normalizedRow[trimmedKey] = row[key];
      });
      return normalizedRow;
    });

    const formattedData = JSON.stringify(data, null, 2);
    
    return formattedData;
  } catch (error) {
    console.error("Error fetching or reading the Excel file:", error);
  }
}

const writeExcel = (data) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "output.xlsx");
};

const main = async () => {
  const microsoftLink = "https://go.microsoft.com/fwlink/?LinkID=521962";
  const data = await fetchAndReadExcel(microsoftLink);

  const dataArr = JSON.parse(data);

  const sale = dataArr.filter((item) => +item["Sales"] > 50000);

  writeExcel(sale);
};

main();
