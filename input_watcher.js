const prompt = require( "prompt" );

function GetInput() {
	return new Promise( async function( resolve , reject ) {
		try {
			prompt.get( [ "input" ] , ( err , input ) => {
				resolve( input );
				return;
			});
		}
		catch( error ) { console.log( error ); reject( error ); return; }
	});
}

( async ()=> {
	while( true ) {
		prompt.start();
		const result = await GetInput();
		process.send( result.input );
	}
})();