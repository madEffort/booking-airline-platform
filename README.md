<h1 align="center">
  <br>
  <a href="https://github.com/madEffort/booking-airline-platform.git">
    <img src="https://github.com/madEffort/booking-airline-platform/assets/158125247/c7dcb720-37ae-4b9b-967f-3b201c0a6537" alt="BookingAir" width="400">
  </a>
  <br>
</h1>

<h4 align="center">
  An all-in-one airline ticket booking app for streamlined ticket purchasing, user management, and flight tracking.
</h4>

<p align="center">
<a href="https://github.com/madEffort/booking-airline-platform/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Apache_2.0-blue"></a>
<a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-v3.10.12-yellow"></a>
<a href="https://react.dev/"><img src="https://img.shields.io/badge/React-v18.3.1-aqua"></a>
<a href="https://github.com/madEffort/booking-airline-platform.git"><img src="https://img.shields.io/badge/PRs-welcome-green"></a>
<a href="https://www.paypal.me/madEffort"><img src="https://img.shields.io/badge/$-donate-ff69b4"></a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> • <a href="#database-erd">Database ERD</a> • <a href="#how-to-use">How To Use</a> • <a href="#download">Download</a> • <a href="#credits">Credits</a> • <a href="#related">Related</a> • <a href="#support">Support</a> • <a href="#license">License</a>
</p>

![booking-air](https://github.com/madEffort/booking-airline-platform/assets/158125247/2d34cf43-9bf0-4e7e-bc89-4af8d5d55de9)

## Key Features

**User Management**
1. Sign Up
   - Endpoint: `POST /signup`
   - Description: Registers a new user.
   - Payload: Includes firstName, lastName, email, and password.
   - Response: Success message and user details.
2. Login
   - Endpoint: `POST /login`
   - Description: Authenticates a user and returns a JWT token.
   - Payload: User email and password.
   - Response: Success message, JWT token, and user details.
3. Delete User
   - Endpoint: `DELETE /delete/{user_id}`
   - Description: Deletes a user account.
   - Authentication: Requires JWT token.
   - Response: Confirmation message.

**Ticket Management**
1. Get Tickets
   - Endpoint: `GET /tickets`
   - Description: Retrieves all tickets for the authenticated user.
   - Authentication: Requires JWT token.
   - Parameters: Pagination options (`page`, `limit`).
   - Response: List of tickets and pagination details.
2. Purchase Ticket
   - Endpoint: `POST /purchase/{ticket_id}`
   - Description: Allows a user to purchase a ticket.
   - Authentication: Requires JWT token.
   - Payload: `flightId` of the ticket to purchase.
   - Response: Purchase details.
3. Refund Ticket
   - Endpoint: `DELETE /tickets/{ticket_id}/refund`
   - Description: Allows a user to request a refund for a specific ticket.
   - Authentication: Requires JWT token.
   - Response: Confirmation message.

**Flight Management**
1. Get Flights
   - Endpoint: `GET /flights`
   - Description: Fetches a list of available flights.
   - Parameters: Filter options such as `departures`, `arrivals`, `departure_date`, `arrival_date`, `flightClass`, `airline`, and pagination (`page`,` limit`).
   - Response: List of flights matching the criteria.
2. Get User Tickets by Email
   - Endpoint: `GET /users/email/{email_address}/tickets`
   - Description: Fetches tickets for a user based on their email.
   - Authentication: Requires JWT token.
   - Parameters: Email address and pagination options.
   - Response: List of tickets for the specified email.

**Password Management**
1. Change Password
   - Endpoint: `POST /change-password`
   - Description: Allows users to change their password.
   - Authentication: Requires JWT token.
   - Payload: oldPassword and newPassword.
   - Response: Confirmation message.

## Database ERD

To view the **`Database ERD`**, please click [here](https://www.erdcloud.com/p/rxBGYRpi8yz5r5LEm).

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Python](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/madEffort/booking-airline-platform.git

# Go into the repository
$ cd backend

# Install dependencies
$ pip install -r requirements.txt
```

> ### Backend

After setting up the database, please use the `makemigrations` and `migrate` commands.

```bash
# Run the app
$ python manage.py runserver
```

> ### Frontend

```bash
# Go into the repository
$ cd frontend

# Install dependencies
$ npm install

# Run the app
$ npm run dev
```

## Download

You can [download](https://github.com/madEffort/booking-airline-platform/releases) the latest release version of the BookingAir.

## Credits

This software uses the following open source packages:

- [Python](https://www.python.org/)
- [DRF : Django REST Framework](https://www.django-rest-framework.org/)
- [React](https://react.dev/)

## Related

- [Axios](https://axios-http.com/kr/docs/intro)
- [Swagger](https://swagger.io/)

## Support

<a href="https://www.paypal.com/paypalme/madEffort">
<img src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" alt="Donate with PayPal" width="200">
</a>


## License

This project adheres to the Apache-2.0 license, and you can find more detailed information in the [LICENSE](https://github.com/madEffort/booking-airline-platform/blob/main/LICENSE)

---

> GitHub [@madEffort](https://github.com/madEffort) &nbsp;&middot;&nbsp;
> Naver [@madEffort](https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjky&x_csa=%7B%22fromUi%22%3A%22kb%22%7D&pkid=1&os=32229226&qvt=0&query=%EA%B9%80%ED%98%84%EC%9A%B0)
