# Get the base image of Node version 16
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal
 
# Set the work directory for the application
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY /package.json /app/
COPY /playwright.config.ts /app/
COPY /apiTests /app/apiTests/

RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev

RUN npm install