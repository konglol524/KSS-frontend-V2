

# How to setup folder
1. Create a new folder
2. git clone ..
3. cd into folder
4. git init
5. git checkout -b yourBranchName

# set up node
1. npm init
2. npm install (this install all modules listed in package.json)
3. create .env.local file in root directory, add necessary variables
4. try npm run dev

# Workflow
0. make some changes
1. git add .
2. git commit -m "meaningful message"
3. git push
4. make pull request

# For Front end
.env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET='Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY='
MONGO_URI=mongodb+srv://vercel-admin-user:dkK69bz3BQ4KSa7j@swpracticecluster.wqpltih.mongodb.net/CarRental?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000

# For back end
config.env in config folder
PORT = 5000
NODE_ENV = development
MONGO_URI = mongodb+srv://kongbhumi:kongbhumi123@swpracticecluster.wqpltih.mongodb.net/CarRental?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:3000
HOST=http://localhost
JWT_SECRET = asdfjk;;lkjfdsa
JWT_EXPIRE = 30d
JWT_COOKIE_EXPIRE = 30

