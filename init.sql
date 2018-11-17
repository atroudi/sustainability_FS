CREATE DATABASE biosensorsdb;
CREATE USER biosensorsAdmin WITH PASSWORD 'qatar123';
GRANT ALL PRIVILEGES ON DATABASE "biosensorsdb" to biosensorsAdmin;
-- \i dump_20-09-2018_23_58_17_withDoctor.sql