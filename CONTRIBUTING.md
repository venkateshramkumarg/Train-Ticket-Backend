# Contributing to Train Ticket Booking System

Thank you for considering contributing to the Train Ticket Booking System! We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on our [GitHub repository](https://github.com/venkateshramkumarg/Train-Ticket-Backend.git) with the following information:
- A clear and descriptive title
- A detailed description of the steps to reproduce the issue
- Any relevant logs or screenshots

### Suggesting Enhancements

We welcome suggestions for new features or improvements. Please open an issue on our [GitHub repository](https://github.com/venkateshramkumarg/Train-Ticket-Backend.git) with the following information:
- A clear and descriptive title
- A detailed description of the proposed enhancement
- Any relevant examples or mockups

### Submitting Pull Requests

1. Fork the repository and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes.
4. Format your code with Prettier by running `npm run format`.
5. Commit your changes and push your branch to your fork.
6. Open a pull request on our [GitHub repository](https://github.com/venkateshramkumarg/Train-Ticket-Backend.git).

### Coding Standards

- Follow the existing code style.
- Write clear and concise commit messages.
- Ensure your code passes all tests and lint checks.

### Running the Project Locally

1. Clone the repository:
    ```sh
    git clone https://github.com/venkateshramkumarg/Train-Ticket-Backend.git
    cd TrainTicket
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database using Prisma:
    ```sh
    npx prisma migrate dev
    ```

4. Start the application:
    ```sh
    npm start
    ```

### Environment Variables

Create a `.env`file in the root directory and add the following environment variables:

```env
DATABASE_URL="your-database-url"
```

### License
By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for your contributions!

