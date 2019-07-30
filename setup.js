const path = require( "path" );
const process = require( "process" );

process.on( "unhandledRejection" , function( reason , p ) {
    console.error( reason, "Unhandled Rejection at Promise" , p );
    console.trace();
});
process.on( "uncaughtException" , function( err ) {
    console.error( err , "Uncaught Exception thrown" );
    console.trace();
});

const HOME_DIRECTORY = require( "os" ).homedir();
const PERSONAL_PATH = path.join( HOME_DIRECTORY , ".config" , "personal" , "twitch_chat_command_line_1.js" );
const Personal = require( PERSONAL_PATH );
module.exports.personal = Personal;

( async ()=> {

    const TwitchAPI = require( "./twitch_api_utils.js" );
    const user_id = await TwitchAPI.getUserID( Personal.twitch.username );
    console.log( `${ Personal.twitch.username } User ID === ${ user_id }` );
    console.log( `Please add this to: ${ PERSONAL_PATH }` );

    await TwitchAPI.follow( "dy_hydro_o" );

})();