const tmi = require( "tmi.js" );

const Utils = require( "./generic_utils.js" );

const emotes = {
	strings: {
		squid: "Squid1 Squid2 Squid3 Squid4",
		hearts1: "<3 <3 <3",
		hearts2: "",
		energy1: "GivePLZ "
	},
	merica: [ "🇺🇸" ] ,
	hello: [ "HeyGuys" , "VoHiYo" , "TehePelo" ] ,
	goodbye: [ "✌" ] ,
	kappa: [ "Keepo" , "Kappa" , "KappaClaus" , "KappaRoss" ] ,
	indifferent: [ "CoolStoryBob" , "SabaPing" , "SeemsGood" , "ResidentSleeper" , "Keepo" , "Kappa" , "KappaClaus" , "PunOko" ] ,
	hopeful: [ "GivePLZ" , "BlessRNG" , "🙏" ] ,
	excited: [ "PogChamp" , "Kreygasm" ] ,
	hearts: [ "<3" , "♥" , "💙" , "❤" , "💚" , "💖" , "💛" ,"💕" ] ,
	love: [ "TwitchUnity" , "bleedPurple" , "😍" ] ,
	sad: [ "FeelsBadMan" , "BibleThump" , "AngelThump" ] ,
	embarased: [ "☺" ] ,
	ashamed: [ "FailFish" ] ,
	crazy: [ "HotPokket" ] ,
	confused: [ "DansGame" , "WutFace" , "D:" , "🤔" ] ,
	offended: [ "cmonBruh" ] ,
	approve: [ "👍" , "👌" , " 🙌" ] ,
	disaprove: [ "👎" ] ,
	upvote: [ "👍" ] ,
	downvote: [ "👎" ] ,
};

// https://github.com/tmijs/tmi.js/blob/master/lib/commands.js
class TwitchIRCWrapper {

	constructor( config ) {
		if ( !config ) { resolve( false ); return; }
		if ( !config.personal ) { resolve( false ); return; }
		this.config = config;
		this.emotes = emotes;
	}

	async initialize() {
		return new Promise( async function( resolve , reject ) {
			try {
				console.log( this.config );
				this.client = new tmi.client({
					identity: {
						username: this.config.personal.irc.username ,
						password: this.config.personal.irc.oauth ,
					} ,
					channels: this.config.channel_join_list
				});
				await this.client.connect();
				if ( !this.config.on_message ) {
					this.config.on_message = ( from , to , text , message  )=> { console.log( text + "\n" ); }
				}
				this.client.on( "message" , this.config.on_message );
				await Utils.sleep( 1000 );
				console.log( "done initializing" );
				resolve();
				return;
			}
			catch( error ) { console.log( error ); reject( error ); }
		}.bind( this ));
	}

	async disconnect() {
		return new Promise( async function( resolve , reject ) {
			try {
				await this.client.disconnect();
				console.log( "\nDisconnected" );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		}.bind( this ));
	}

	async say( channel , message ) {
		return new Promise( async function( resolve , reject ) {
			try {
				console.log( `Posting: [ ${ message } ] in #${ channel }` );
				await this.client.say( channel , message );
				resolve();
			}
			catch( error ) { console.log( error ); reject( error ); }
		}.bind( this ));
	}

};
module.exports = TwitchIRCWrapper;