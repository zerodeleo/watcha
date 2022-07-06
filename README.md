lear
# Zerodeleo

## 1. Setting up mongodb
- Login to mongodb atlas
- Create new project
- Create new cluster
    - Make sure to name cluster before creating it
    - Add authentication to .env file
        - <code>ATLAS_URI="the URI you get when clicking connect after cluster is created"</code>
    - Add 0.0.0.0 IP Address access 
- Connect cluster    
## 2. Setting up heroku
- Login to heroku
- Create app
- Connect to GitHub
- Enable automatic deploys
- Add .env ariables to heroku config vars

# BRANCHES
## 1. watcha-step-1
- ### Project setup
    - #### BE
        - **Simple express server**
            - MongoDB connection
            - Simple API route with post and get
                - <code>api/:uid</code>
    - #### FE
        - **Simple component with buttons**
            - the get button
                - *gets a collection from db*
                    - <code>api/:uid</code>
            - the post button
                - *posts a collection to db*
                    - <code>api/:uid</code>
    - #### UTILS
        - Heroku deployment              
