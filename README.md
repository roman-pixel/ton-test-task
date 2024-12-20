<p align="center">
  <img src="docs/images/ton-logo.svg" alt="Project Logo" width="100"/>
</p>

<h1 align="center">TON Link Test</h1>

### Demo

You can view the demo version of the application using the following links:

[![Deploy](https://img.shields.io/badge/-Depoloy-282828?logo=vercel&logoColor=fff)](https://ton-test-task.vercel.app)
[![Telegram App](https://img.shields.io/badge/-Telegram_App-26a5e4?logo=telegram&logoColor=fff)](https://t.me/ton_link_test_bot)

## Description

A single-page application built with Next.js and the ton-connect library. The app allows users to connect their TonKeeper or any other crypto wallet, view their balance, and make transfers within the TON TestNet network through an intuitive interface.

## Usage Instructions

- **Connecting a Wallet**:

  - To link your TonKeeper wallet, click the "Connect Wallet" button.
  - In the dialog box, select the TonKeeper wallet or choose any other wallet from the list.
  - Confirm the wallet connection.
- **Sending Funds**:

  - On the main screen, click the "Send" button to navigate to the transfer page.
  - Enter the required amount and recipient's address into the transfer form to initiate the sending process.
  - Confirm the transfer in the TonKeeper wallet.

## Technologies

- **@tonconnect/ui-react** - A library for integrating with the TonKeeper wallet using TonConnect.
- **next** - A framework for building server-side and static applications with React.
- **tailwindcss** - A utility-first CSS framework for designing user interfaces.
- **typescript** - A programming language for strong typing in JavaScript.

## Installation and Running the Application

1. Clon the repository:

```bash
git clone https://github.com/roman-pixel/ton-test-task.git
```

2. Navigate to the project directory.
3. Install dependencies using yarn or npm:

```bash
 npm install
```

4. Start the application:

```bash
 npm run dev
```
