This is a demo room booking application powered by React, Next and MySQL.

## Prerequisites
node v14 or later
npm v6 or later
mysql 8 or later

## Getting Started
Clone the repo
```bash
git clone https://github.com/bmehta/roombooking.git
```

Then, install dependencies
```bash
npm i
```

Then, create a database called `roombooking` and use roombooking.sql in the root of the project to create the tables and seed the data. 
```bash
Use source roombooking.sql from the mysql prompot
```

Then, Rename the .env.example to .env.local and replace with your mysql information

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running Tests
For jest tests
```bash
npm run dev
```

For cypress tests (needs app running on localhost:3000)
```bash
npm run cypress
```
