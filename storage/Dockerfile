FROM httpd:2.4

COPY ./images/ /usr/local/apache2/htdocs/images/
COPY apache.conf /usr/local/apache2/conf/extra/apache-images.conf

RUN echo "Include conf/extra/apache-images.conf" >> /usr/local/apache2/conf/httpd.conf
