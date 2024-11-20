# Use the official Node.js 20 image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port that your backend is running on
EXPOSE 4000

# Command to run the backend
CMD ["npm", "run", "start"]
