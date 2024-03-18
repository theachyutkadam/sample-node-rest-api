# sample-node-rest-api
Create a sample node js app with swagger UI, for learning node js as a beginner.


What is Node JS?

Installation-

**Create new app/Setup New app with MySQL DB and swagger UI**
- ```mkdir 'folder_name'```
- ```cd 'folder_name'```
- ```npm init -y```
- ```npm install express mysql2 sequelize swagger-ui-express dotenv```

Create a project structure like this.
- src
  - models
    - user.js
  - routes
    - users.js
  - index.js
  - db.js
- swagger
  - swagger.json
- .env

**What is ORM and how does it work?**

In NodeJS many ORMs (Object Relational Mapper) are available. See the following Image.
  -![alt text](image.png)
  - We are using the Sequelize ORM in our application.
