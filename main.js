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

const child_process = require( "child_process" );

const TwitchIRCWrappper = require( "./twitch_irc_wrapper.js" );

// FailFish
// https://github.com/chjj/blessed

( async ()=> {

	const connection = new TwitchIRCWrappper({
		personal: Personal.twitch ,
		channel_join_list: [ "#dy_hydro_o" , "#exbc" ] ,
		on_message: ( from , to , text , message )=> {
			console.log( text + "\n" );
		} ,
	});

	await connection.initialize();

	//await connection.say( "dy_hydro_o" , connection.emotes.strings.hearts1 );
	// Await Keyboard Input
	// await connection.say

	process.on( "unhandledRejection" , async function( reason , p ) {
		await connection.disconnect();
		process.exit( 1 );
	});
	process.on( "uncaughtException" , async function( err ) {
		await connection.disconnect();
		process.exit( 1 );
	});

	process.on( "SIGINT" , async function () {
		await connection.disconnect();
		process.exit( 1 );
	});

	const child_input_watcher = child_process.fork( "./input_watcher.js" ,  [], {
		silent: true ,
		stdio: [ 0 , 0 , 0 , 'ipc' ]
	});
	child_input_watcher.on( "message" , async function( message ) {
		//console.log( 'received: ' + message );
		if ( !message ) { return; }
		if ( message.length < 1 ) { return; }
		await connection.say( "dy_hydro_o" , message );
	});

})();