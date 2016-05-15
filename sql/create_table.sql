-- So I do assume we use username for indexing?

CREATE TABLE IF NOT EXISTS account (
	username varchar(128) NOT NULL,
	salt varchar(64) NOT NULL,	
	hashed_password varchar(256) NOT NULL,
	created_on timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(username)
);

-- Just Join to get account profile
-- Future modify can drop profile table preserving account table
CREATE TABLE IF NOT EXISTS profile(
	username varchar(128) NOT NULL,
	nickname varchar(128),
	firstname varchar(128),
	lastname varchar(128),
	email varchar(128),
	phone varchar(128),
    icon varchar(128),
    gender varchar(128),
	update_on timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(username)
);

-- I'm kinda scared of text & json
-- json should be changed later into more table joins
-- for easier manipulations
CREATE TABLE IF NOT EXISTS mentor_profile(
	username varchar(128) NOT NULL,
	education json,
	interview json,
	job json,
	self_description_detail varchar(1024),
	self_description_simple varchar(256),
	availability json,
	service_price json,
	update_on timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(username)
);


-- for mentor application, need to be approved
CREATE TABLE IF NOT EXISTS mentor_application(
	-- if can be applied multiple times for same user,
	-- must be able to have primary key id with auto-increment or compose with timestamp
	username varchar(128) NOT NULL,
	firstname varchar(128),
	lastname varchar(128),
  phone varchar(128),
  education json,
	interview json,
	job json,
  filename varchar(128),
	update_on timestamp DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(username)
);

-- For message history
-- need to join nickname in profile though
-- also need add more information to know whether viewed or not
-- This could also be done by a single entry,
-- message-board last-viewed in profile table
CREATE TABLE IF NOT EXISTS message(
	from_username varchar(128) NOT NULL,
	to_username	varchar(128) NOT NULL,
	message varchar(256),
    read boolean,
	create_on timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Add apply and valid procedures later

-- CREATE OR REPLACE VIEW view_message_group AS
-- select from_username, to_username, json_agg(m.*) as history from message as m
-- group by m.from_username, m.to_username;

-- CREATE OR REPLACE VIEW view_conversation_group AS
-- select coalesce(v1.from_username, v2.to_username) as from_username,
-- coalesce(v1.to_username, v2.from_username) as to_username, 
-- concat(v1.history, v2.history) as history from view_message_group as v1
-- FULL OUTER join view_message_group as v2
-- ON v1.from_username = v2.to_username AND v2.from_username = v1.to_username;
