FROM node:latest

ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASSWORD=mypass1234
ENV DB_DATABASE=calendar


ADD package.json /opt/calendar/package.json
RUN cd /opt/calendar; npm install
ADD . /opt/calendar
WORKDIR /opt/calendar
RUN chmod 755 /opt/calendar/wait-for-it.sh
EXPOSE 8080


# Define default command
CMD ./wait-for-it.sh $DB_HOST:$DB_PORT -t 0 -- "npm run start"
