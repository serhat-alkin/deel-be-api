# DEEL BACKEND TASK

  

💫 Welcome! 🎉


This backend exercise involves building a Node.js/Express.js app that will serve a REST API.



1. Start by cloning this repository.

  

2. In the repo root directory, run `npm install` to gather all dependencies.

  

3. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

4. Then run `npm start` which should start both the server and the React client.

5. I've added some tests for the API. You can run tests by executing `npm test` command.

  
## APIs


Below is a list of the implemented API's for the application.

1. ***GET*** `/contracts/:id` - Fixed it.

1. ***GET*** `/contracts` - Returns a list of contracts belonging to a user (client or contractor), the list should only contain non terminated contracts.

1. ***GET*** `/jobs/unpaid` -  Get all unpaid jobs for a user (***either*** a client or contractor), for ***active contracts only***.

1. ***POST*** `/jobs/:job_id/pay` - Pay for a job, a client can only pay if his balance >= the amount to pay. The amount should be moved from the client's balance to the contractor balance.

1. ***POST*** `/balances/deposit/:userId` - Deposits money into the the the balance of a client, a client can't deposit more than 25% his total of jobs to pay. (at the deposit moment)

1. ***GET*** `/admin/best-profession?start=<date>&end=<date>` - Returns the profession that earned the most money (sum of jobs paid) for any contactor that worked in the query time range.

1. ***GET*** `/admin/best-clients?start=<date>&end=<date>&limit=<integer>` - returns the clients the paid the most for jobs in the query time period. limit query parameter should be applied, default limit is 2.
```
 [
    {
        "id": 1,
        "fullName": "Reece Moyer",
        "paid" : 100.3
    },
    {
        "id": 200,
        "fullName": "Debora Martin",
        "paid" : 99
    },
    {
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
    }
]
```

  

## Technical notes

- I integrated Swagger UI for visualizing and interacting with the API, which is accessible at localhost:3001/deel-api. You can also use Postman for testing purposes.
- I adopted a controller-service-dao architecture, in which the service layer handles the business logic and the dao layer manages interactions with the ORM to keep the codebase organized and scalable.
- I tried to avoid having harcoded content (error messages, object types, error codes etc..) in the code. 

## Future improvements
- DAO functions can be separated based on the objects they interact with. Keeping all ORM interactions in a single file could lead to complexity and maintenance issues in the future.

- Input validation should be implemented. For now, inputs are mandatory on Swagger UI. We can use a schema description language like joi, to validate inputs. This is essential for the API security.

- Test scenarios and mock data can be improved.
