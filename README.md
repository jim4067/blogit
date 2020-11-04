# BLOGIT

![logo-test](utils/images/readme-banner.png)

Hi there and welcome!

This is teachnically the backend of the Blogit web application, but it encompasses the whole application. Deployment is also done here. Blogit is a web app that allows a user to save applications that He/She came across the internet. No need to have thousands of bookmarks or tabs of blogs that you intend to read in Chrome, Let blogit do that for you. Sign in and let blogit save that blog that your are most certainly never going to read.

## About the app

This app is part of the exercises from the [fullstackopen] course from the University of Helsinki with some added feature from yours truly. The app is built using the react framework. Various components manage the views for the app. Styling is done using CSS modules and styled components. The logic for handling the state of the application is built using redux with a few components using react's state-hook. I used Test Drive Development (TDD) methology and used Jest for unit tests and Cypress for end to end testing.

On the backend side of the app, express and node is used for handling the logic of the request that come from the front end while MongoDB is used for persistent data storage. Unit tests are performed using Jest and all of the passed successfuly. No passwords are stored in the database. Only their hashed versions using bcrypt.

## Running the app locally

To run this app locally make sure you have git, node and a \*nix os (Just kidding, but development on Windows can sometimes be nightmare).
Clone this repo and install all the dependencies and finally, run the 'dev' npm script.

```
git clone https://github.com/jim4067/blogit.git
cd blogit
npm install
npm run dev
```

Or go directly to the live link [jims-blogit]

Thank you. Leave a star if you like what you see, also if you are a recruiter here because of a job I applied to, feel free to ask questions.

[fullstackopen]: https://fullstackopen.com
[jims-blogit]: http://jims-blogit.herokuapp.com/
