# AWS SES Worker

This repository contains a worker script for handling and processing emails using Amazon Simple Email Service (SES). 

## Prerequisites

Before running the AWS SES Worker, ensure you have the following installed:

- Node.js
- AWS CLI
- AWS SES domain verified and SES in production mode

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/RitwikKapoor/SES-Worker-Medicify.git
   cd SES-Worker-Medicify

2. **Populate the .env file**

    ```
    REDIS_HOST=
    REDIS_PORT=
    REDIS_USERNAME=
    REDIS_PASSWORD=
    SENDER_MAIL=
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=
    ```

3. **Install node modules and run it**
    ```bash
    npm install
    npm run dev
    ```

