FROM nikolaik/python-nodejs:latest
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN pip install requests
RUN pip install tweepy
RUN pip install numpy
RUN pip install schedule

EXPOSE 3000
CMD npm start