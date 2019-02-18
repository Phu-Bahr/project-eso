Project ESO

"Where do you want to eat?"

Eso is a restaurant search and recommendation web application. It utilizes Ruby on Rails on the back and and React.js in the front end. This app is being deployed on Heroku utilizing PostgresSQL.  This app is meant to help a user streamline and filter choices on where to eat. Other webtools just list out your broad search criteria, but Eso narrows it down to a 3mile radius and very specific search criteria to guides you through each restaurant through the process of elimination until you've found just 1 restaurant.

This app is meant to be used as a data miner in the future so it can make recommendations to the user the more the user picks final restaurants.

In order to use use this app, you will need to clone it down with https://github.com/Phu-Bahr/project-eso.git

After cloning and getting into directory, you'll need to run the following into the terminal:
1. bundle exec install
2. yarn install
3. bundle exec rake db:create
4. bundle exec rake db:migrate
5. bundle exec rake db:seed
6. make sure ruby version is changed to 2.4.5 via Chruby command.
7. then in command line run your servers - "Rails s" and in another tab "yarn start" for React's webpacker.

This app is very simple for now with 3 tables, 2 main paths /categories and /restaurants. 3 paths if you include devise user log in screens.

Foundation is being used for all the scss.
React Router for react.
Yelp API is being used to pull restaurants.
React-table to list data from all the restaurants chosen.
Ruby on rails to persist data to PostgresSQL, and api/v1 paths with serializers to send information to front end.
Also using rails to add validations. Authorization and Authentifications.


Wishlist features: to be continued...
