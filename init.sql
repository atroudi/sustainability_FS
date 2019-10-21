CREATE DATABASE sustainabilitydb;
CREATE USER migiwara WITH PASSWORD 'qatar123';
GRANT ALL PRIVILEGES ON DATABASE "sustainabilitydb" to migiwara;
-- \i dump_20-09-2018_23_58_17_withDoctor.sql