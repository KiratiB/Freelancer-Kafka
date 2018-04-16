#Project : Freelancer Site prototype using ReactJS and NodeJS

Steps to run Freelancer Site.
1)Install ReactJS

On the terminal: npm install -g create-react-app

Follow the steps on the terminal to start the servers:

Follow the steps to start zookeper and Kafka

Zookeeper: .\zookeeper-server-start.bat ..\..\config\zookeeper.properties

Kafka: .\kafka-server-start.bat ..\..\config\server.properties

Create Topics:
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login_topic_response
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup_topic_response
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic skill_topic
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic skill_topic_response 
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic project_topic_response
.\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic project_topic 


Start MongoDB server:mongod.exe --dbpath "C:\data"


Back-end server
	
	1. cd Node
	2. npm install
	
	3. npm start


Front-end server
	
	1. cd React	
	2. npm install
	
	3. npm start
	

Kafka-Back-End server
	
	1. cd React	
	2. npm install
	
	3. npm start

