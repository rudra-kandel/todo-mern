# Use the official Node.js image as the base
FROM node:20

# Set the working directory
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
# RUN npm run build

# # Use an Nginx image to serve the frontend
# FROM nginx:alpine
# COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the port
EXPOSE 4001

CMD ["npm", "run", "dev"]