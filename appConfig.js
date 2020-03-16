var developmentDatabase = {
    postgres: {
    host: 'localhost',
    port: 5432,
    database: 'dda7i1p9sf3dga',
    user: 'guvmqzidvwpymq',
    password: '9efab1c4150564b29b4822bb1532c84f3d9392d45e4853a91d86ca02933d5138'
    }
    }
    
    var connectionString = "postgressql://guvmqzidvwpymq:9efab1c4150564b29b4822bb1532c84f3d9392d45e4853a91d86ca02933d5138@ec2-54-247-169-129.eu-west-1.compute.amazonaws.com:5432/dda7i1p9sf3dga?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionString.variable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }