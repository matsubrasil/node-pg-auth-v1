-- psql "dbname='apidb' user='postgres' password='admin' host='localhost'" -f ~/projetos/api_server/node-pg-api-v2/load_books.sql
-- psql "dbname='apidb' user='user_mern' password='pwd_mern' host='localhost'" -f ~/projetos/api_server/node-pg-api-v2/load_books.sql



INSERT INTO books
  (title, authors)
VALUES('Angústia', 'Graciliano Ramos');

INSERT INTO books
  (title, authors)
VALUES('O milagra do amanhã', 'Hal Elrod');

INSERT INTO books
  (title, authors)
VALUES('O conto de Aia', 'Margaret Atwood');

