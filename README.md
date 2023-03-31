# React-Course-backend

Production application can be found at [here](https://my-react-course-app.onrender.com)

## How to run:
### Development
`npm run dev`. Frontend can then be found at `localhost:3001`, with the server located at `localhost:3001/api/persons`

## How to deploy
To deploy changes for the backend. Git push changes. Deployment should happen automatically.
To deploy changes for the frontend, run `npm run deploy:full` from the root directory of the backend repository. 
This builds the frontend and copy's it to the backend repository before Git pushing it.
If backend is not deploying when pushing, deploy manually at [render](https://dashboard.render.com).
