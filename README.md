# NPS API

# :page_with_curl: Table of Contents

* [About](#information_source-about)
* [Features](#rocket-features)
* [Requirements](#page_with_curl-requirements)
* [Technologies](#computer-technologies)
* [Database](#floppy_disk-databases)
* [How to run](#seedling-how-to-run)
* [License](#pencil-license)

# :information_source: About

This project is an API whose objective is the calculation of NPS (Net Promoter Score), whose is a metric to measure customer satisfaction, asking,
on a scale of 0 to 10, how much the customer would indicate the company's products or services and then, make strategic decisions.

The application was developed during the Next Level Week 4 event, provided by Rocketseat.

### How to calculate NPS?

The calculation is based on the number of detractor evaluations (0 - 6), promoter evaluations (0 - 10) and the total of evaluations.
The formula for the calculation is:

**((promoters - detractors) / 100) * 100**

# :rocket: Features

### Users

- Create a user
- List users
- Create a survey
- Send email to a user to answer a survey
- Save user score
- Calculate NPS

# :page_with_curl: Requirements

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/) (optional)
- [Git](https://git-scm.com/) (to clone the repository)

# :computer: Technologies

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [SQLite](https://www.sqlite.org/index.html)
- [Nodemailer](https://nodemailer.com/about/)

# :floppy_disk: Database

You will need to run the migrations to create the tables in the database. To do this, just run the following command:

```bash
$ yarn typeorm migration:run
```

# :seedling: How to run

```bash
# Clone the repository
$ git clone https://github.com/lucas-almeida-silva/api-nps.git

# Go to the project folder
$ cd api-nps

# Install Dependencies
$ yarn
# or npm install

# Run the application
$ yarn dev
# or npm run dev
```
Access the API at http://localhost:3333

You can use [Insomnia](https://insomnia.rest/download/core/) to make requests to the API. There is a JSON file called **insomnia-request.json** 
at the root of the project with the requests that you can import into Insomnia.

# :pencil: License

This project is under the [MIT license](LICENSE).
