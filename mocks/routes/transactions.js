// Use this file only as a guide for first steps using routes. Delete it when you have added your own route files.
// For a detailed explanation regarding each routes property, visit:
// https://mocks-server.org/docs/usage/routes

// transactions data
const TRANSACTIONS = [
  {
    id: 1,
    date: '2024-08-01',
    amount: 250.75,
    type: 'expense',
    details: 'Покупка продуктов в супермаркете'
  },
  {
    id: 2,
    date: '2024-08-03',
    amount: 500.00,
    type: 'income',
    details: 'Зарплата'
  },
  {
    id: 3,
    date: '2024-08-05',
    amount: 100.50,
    type: 'expense',
    details: 'Ужин в ресторане'
  },
  {
    id: 4,
    date: '2024-08-07',
    amount: 75.20,
    type: 'expense',
    details: 'Бензин'
  },
  {
    id: 5,
    date: '2024-08-09',
    amount: 200.00,
    type: 'income',
    details: 'Оплата за фриланс проект'
  },
  {
    id: 6,
    date: '2024-08-10',
    amount: 30.00,
    type: 'expense',
    details: 'Подписка онлайн'
  },
  {
    id: 7,
    date: '2024-08-11',
    amount: 400.00,
    type: 'income',
    details: 'Бонус от работы'
  },
  {
    id: 8,
    date: '2024-08-12',
    amount: 150.00,
    type: 'expense',
    details: 'Покупка новых туфель'
  },
  {
    id: 9,
    date: '2024-08-13',
    amount: 60.00,
    type: 'expense',
    details: 'Покупка книг'
  },
  {
    id: 10,
    date: '2024-08-14',
    amount: 300.00,
    type: 'income',
    details: 'Дивиденды от акций'
  }
];

let nextId = TRANSACTIONS.length + 1;

module.exports = [
  {
    id: "get-transactions", // route id
    url: "/api/transactions", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const type = req.query.type;
            const minAmount = req.query.min;
            const maxAmount = req.query.max;
            const transactions = TRANSACTIONS.filter((transactionData) => (type !== undefined ? transactionData.type === type : true) && (minAmount !== undefined ? transactionData.amount >= minAmount : true) && (maxAmount !== undefined ? transactionData.amount <= maxAmount : true));
            res.status(200);
            res.send(transactions);
          },
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-transactions-by-type", // route id
    url: "/api/transactions/:type", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            console.log('req.query.type', req.query.type);
            const type = req.params.type;
            const transactions = TRANSACTIONS.filter((transactionData) => transactionData.type === type);
            res.status(200);
            res.send(transactions);
          },
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-transaction", // route id
    url: "/api/transaction/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const transactionId = req.params.id;
            const transaction = TRANSACTIONS.find((transactionData) => transactionData.id === Number(transactionId));
            if (transaction) {
              res.status(200);
              res.send(transaction);
            } else {
              res.status(404);
              res.send({
                message: "Transaction not found",
              });
            }
          },
        },
      },
    ],
  },
];
