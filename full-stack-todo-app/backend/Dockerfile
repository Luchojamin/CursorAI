# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

# Expose port and start app
EXPOSE 3000
CMD [ "npm", "start" ] 