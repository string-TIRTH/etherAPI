# etherAPI for Koinx Interview

This Node.js application fetches, stores, and processes Ethereum transactions for a given address using the Etherscan API. It also fetches the current price of Ethereum from the CoinGecko API and calculates the total gas expenses for the user's transactions.

## Features

- Fetch and store Ethereum transactions for a given address.
- Calculate total gas expenses for a given address.
- Fetch the current price of Ethereum.

## Endpoints

### 1. Get Transactions

**Endpoint:** `/api/transactions/getTransactions/:address`

**Method:** `GET`

**Description:** Fetches and stores the list of Ethereum transactions for the given address. If the transactions already exist in the database, they will not be duplicated.

**Example Request:**

```bash
GET /api/transactions/getTransactions/0xce94e5621a5f7068253c42558c147480f38b5e0d

