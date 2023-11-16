const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const balanceSheet = {
  2020: [
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
    },
    {
      year: 2020,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452,
    },
  ],
  2021: [
    {
      year: 2020,
      month: 12,
      profitOrLoss: 250000,
      assetsValue: 1234,
    },
    {
      year: 2020,
      month: 11,
      profitOrLoss: 1150,
      assetsValue: 5789,
    },
    {
      year: 2020,
      month: 10,
      profitOrLoss: 2500,
      assetsValue: 22345,
    },
    {
      year: 2020,
      month: 9,
      profitOrLoss: -187000,
      assetsValue: 223452,
    },
  ],
};

app.get("/api/balance-sheet/:year", (req, res) => {
  const year = req.params.year;
  if (balanceSheet[year]) {
    res.send(balanceSheet[year]).status(200);
  } else {
    res
      .send(`The requested balance sheet for the year ${year} not found!!!`)
      .status(404);
  }
});

app.get("/api/balance-sheet/:year/:month", (req, res) => {
  const month = req.params.month;
  const year = req.params.year;
  if (month && year) {
    if (month > 12 || month < 1) res.send("invalid month...").status(400);

    let yearRecord = balanceSheet[year];
    if (!yearRecord)
      res
        .send("The requested balance sheet for the year not found...")
        .status(404);

    let monthRecord = yearRecord.filter((r) => r.month == month);
    if (!monthRecord)
      res.send("Sorry!!! Record not found for this month").status(404);

    res.send(monthRecord).status(200);
  } else {
    res.send("Bad Request...");
  }
});

app.listen(PORT, () => console.log("Server is listening on PORT: ", PORT));
