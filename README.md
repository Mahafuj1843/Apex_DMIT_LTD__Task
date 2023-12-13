
## Getting Started

First, install all dependency:

```bash
npm i
# or
yarn
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


In your given api all company have same company_status code which is "1". For this reason I've assume that company_status "0"= Pending, "1"= In-progress, "2"= Completed. And for filter by company_name I have used searching to filter all data by company name. Also showing N/A for all null value.
