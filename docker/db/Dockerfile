FROM mysql:5.7
ENV MYSQL_ROOT_PASSWORD=mypass1234
ENV MYSQL_DATABASE=calendar

ADD calendar.sql /docker-entrypoint-initdb.d/calendar.sql 
ADD my.cnf /etc/mysql/conf.d/my.cnf
RUN chmod 644 /etc/mysql/conf.d/my.cnf

EXPOSE 3306
