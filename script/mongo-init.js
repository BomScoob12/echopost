db = db.getSiblingDB('echopost-db');

db.createUser({
    user: 'your_username',
    pwd: 'your_password',
    roles: [
        { role: 'readWrite', db: 'echopost-db' }
    ]
})