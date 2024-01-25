# MiniWebApp
Project Structure

   # API/: Contains the API server code.
   # Client/: Contains the client application and TestCafe tests.
   # tests/: Contains Jest tests for the API.


# For API functionality/Unit Testing:
- In order to test functionality as well as perform unit testing, the following step shave to be taken:
- On the terminal, get to your API directory and type out the following command : "npm test". This will help verify and run the jest test for your API. After that, type out the command "node uniAPI.js" in  order to start the server and get the web application running. (http://localhost:3000/universities)
- After the server has been started, we can now proceed to testing the web application on Postman, going through the GET, ADD, PUT, DELETE in order to prove the CRUD functionality. We'll start by viewing the university data (GET), then we'll try to add data (ADD), after that we'll update the data we just posted (PUT), and finally we will delete the information of a university (DELETE) to close off the unit testing section.


# For API documentation:
- In order to access the API documentation for this web application, this can be done by opening the index.html file found in the apidoc repository, once you open the index.htnl file, selection the version 1.0.0 in order to have access to the API documentation.


# For Client functionality and functional testing:
- Make that the server is up and running the access the website through a web browser by typing out the url "http://localhost:3000". Once you're on the website, test the features and run the website to verify it's full functionality.
- Once the functionality of the website has been verified, we can now do the functional test, where we use the "testcafe" feature. this can be done by accessing the web application repos throuigh the terminal and typing out the following commands :  "npm run" and then "npm run testcafe chromium testcafe.js". After typing out this command the test cafe process will shortly after start. If everything runs smoothly the web application should be able to pass the test.


# THANK YOU FOR READING
