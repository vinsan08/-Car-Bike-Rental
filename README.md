
  # Design Antigravity Rentals UI

  This is a code bundle for Design Antigravity Rentals UI. The original project is available at https://www.figma.com/design/8SlM0PlEHuy2Rxbz5JQHyg/Design-Antigravity-Rentals-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.  
  ### Backend

  The repository now includes a simple Express/MongoDB backend that powers authentication, vehicles, and bookings.

  1. `cd backend`
  2. `npm install`
  3. Copy `.env.example` to `.env` and configure `MONGO_URI` and `JWT_SECRET`.
  4. `npm run dev` to start the backend on port 5000.

  The frontend expects `VITE_API_BASE` in the root `.env` to point to the backend (defaults to `http://localhost:5000/api`).  