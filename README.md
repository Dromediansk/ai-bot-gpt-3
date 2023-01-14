## AI GPT-3 Chatbot

Chatting application using advanced AI model (GPT-3) that provides helpful answers.
Integrated as Progressive Web App to have easy access on devices.
It can be served as a tool to increase productivity, get queries in difficult topics or just chit-chat.

### Tech stack

- Backend: Express.js, [OpenAI API](https://openai.com/api/),
- Frontend: HTML, CSS, vanilla JS

## Local setup

- fork or clone the repo
- install dependencies for client and server. From the root directory:
  - `cd client && npm install`
  - `cd server && npm install`
- for server, you need to create `OPENAI_API_KEY` by logging in to [openai.com](https://openai.com/) and creating your API KEY.
- in `server` folder, create `.env` file and paste `OPENAI_API_KEY=<your_api_key>`
- run both client and server with `npm run dev`
- enjoy chatting!
