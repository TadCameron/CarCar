# CarCar

Team:

* Person 1 - Anri Bordone Service
* Person 2 - Tad Cameron Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

I have two models and one automobile value object. The appointment object has all the required fields including a foreign key of the technician model. The technician model just has a name. The Automobile VO is used to determine if an appointment is a vip appointment by checking if the vin number is contained in the automobile VO. The value object is created using a poller. 

## Sales microservice

By polling the Inventory microservice, Sales was able to obtain a list of the automobiles on the site. Then, I created models for potential clients and employees. By connecting my 2 models and my value objects polled from inventory, I created a sales model. Then it was just about using my view functions to create forms and send the relevant http method. 
