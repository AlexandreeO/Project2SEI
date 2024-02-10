WavePlanner App

Overview
WavePlanner is a web application designed to help surfers plan their surfing trips effectively. It provides features for users to create, view, update, and delete surfing trips, along with managing details such as trip name, start and end dates, and itinerary including surf spots. The app also allows users to explore various surf spots and add them to their trips.

Features

User Authentication: WavePlanner supports user authentication, allowing users to register, log in, and log out securely.

Trip Management: Users can create new surfing trips, view details of existing trips, update trip information, and delete trips they no longer need.

Surf Spot Exploration: The app provides a catalog of surf spots where users can explore details such as spot name, location, break type, and difficulty level.

Getting Started

To get started with WavePlanner, follow these steps:

Clone the WavePlanner repository from GitHub to your local machine.

Install the necessary dependencies by running npm install in the project directory.

Set up a MongoDB database and configure the connection string in the config directory.

Run the application using the command npm start.

Access the application in your web browser at http://localhost:3000.

Usage
Creating a New Trip
Log in to your WavePlanner account.

Navigate to the "New Trip" section.

Fill out the required details such as trip name, start and end dates, and select surf spots to add to the itinerary.

Submit the form to create the new trip.

Viewing Trip Details
After logging in, go to the "My Trips" section to view a list of your existing trips.

Click on a trip to view its details, including trip name, start and end dates, and the itinerary of surf spots.

Updating Trip Information
From the trip details page, click on the "Update" button.

Edit the trip information as needed.

Submit the form to save the changes.

Deleting a Trip
Navigate to the trip details page of the trip you want to delete.

Click on the "Delete" button to remove the trip from your list.

Technologies Used
Node.js: Backend JavaScript runtime environment.

Express.js: Web application framework for Node.js.

MongoDB: NoSQL database for storing user and trip information.

Mongoose: MongoDB object modeling tool for Node.js.

EJS: Templating engine for server-side rendering of HTML pages.

Passport.js: Authentication middleware for Node.js.


IceBox:

- Fixing bugs incl. update trips button and UI
- update UI
- create view to be able to see each spot on a view spot details page, include surf forecast in each surf spot so you can know where to place the spot in your trip plan
- update trip view to include all the details of the trip
