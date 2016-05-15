-- This can be used to initialise dummy entries for test

-- INSERT into account(username, hashed_password) VALUES
-- (user, ),
-- (test, )

INSERT INTO profile(username, nickname, email, mobile) VALUES
('test', 'nick', 'epienriz@sth.com', '112-334'),
('testMentor', 'nick', 'epienriz@sth.com', '112-334');

INSERT INTO mentor_profile(username, self_description_simple) VALUES
('testMentor', 'test');

INSERT INTO message(to_username, from_username, message) VALUES
('test', 'testMentor', 'what about today''s lesson'),
('testMentor', 'test', 'cool!'),
('test', 'testMentor', 'what about yesterday''s lesson'),
('testMentor', 'test', 'was cool too!'),
('randomGuy', 'test', 'ok'),
('testMentor', 'randomGuy', 'great');

-- password = pass
INSERT INTO account(username, hashed_password, salt) VALUES
('test', '2db4f77bbef2b5bafc709fbfd2be58053b3a2a2c97877a7162695e3a8368d6ee', 'c08e7e7a18ebc3ef19a8505da1fc1c31'),
('testMentor', '2db4f77bbef2b5bafc709fbfd2be58053b3a2a2c97877a7162695e3a8368d6ee', 'c08e7e7a18ebc3ef19a8505da1fc1c31');


