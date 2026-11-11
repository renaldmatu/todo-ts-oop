Tehnoloogiad: Node.js, Express, TypeScript, MariaDB/MySQL, mysql2.

Andmebaas: Skripti asukoht database/schema.sql ja tabeli struktuur (todos).

API otspunktid:

GET /todos – kõigi ülesannete päring
GET /todos/:id – ühe ülesande päring ID järgi
POST /todos – uue ülesande lisamine ({"task": "..."})
PATCH /todos/:id – ülesande muutmine ({"task": "..."})
DELETE /todos/:id – ühe ülesande kustutamine
DELETE /todos – kõikide ülesannete kustutamine# MariaDB/MySQL dokumentatsioon
