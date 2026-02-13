export type QuoteSegment = {
	text: string;
	highlight: boolean;
};

export type Quote = QuoteSegment[];

const quotes: Quote[] = [
	[
		{ text: "Are you ", highlight: false },
		{ text: "dark mode", highlight: true },
		{ text: "? Because you're so easy on my eyes.", highlight: false },
	],
	[
		{ text: "Let's skip the ", highlight: false },
		{ text: "staging", highlight: true },
		{ text: ", I'm ready for ", highlight: false },
		{ text: "Production", highlight: true },
		{ text: " with you.", highlight: false },
	],
	[
		{ text: "You must be a ", highlight: false },
		{ text: "keyboard", highlight: true },
		{ text: ", because you're just my ", highlight: false },
		{ text: "type", highlight: true },
		{ text: ".", highlight: false },
	],
	[
		{ text: "Are you a ", highlight: false },
		{ text: "router", highlight: true },
		{ text: ", because you always ", highlight: false },
		{ text: "lead me to happiness", highlight: true },
		{ text: ".", highlight: false },
	],
	[
		{ text: "You will always be my ", highlight: false },
		{ text: "P0", highlight: true },
		{ text: ".", highlight: false },
	],
	[
		{ text: "My love for you is like a ", highlight: false },
		{ text: "while loop", highlight: true },
		{ text: ", it ", highlight: false },
		{ text: "never ends", highlight: true },
		{ text: ".", highlight: false },
	],
	[
		{ text: "Are you a ", highlight: false },
		{ text: "div", highlight: true },
		{ text: "? Because you're the ", highlight: false },
		{ text: "container", highlight: true },
		{ text: " of my heart.", highlight: false },
	],
	[
		{ text: "You complete me like a ", highlight: false },
		{ text: "semicolon", highlight: true },
		{ text: " completes a ", highlight: false },
		{ text: "statement", highlight: true },
		{ text: ".", highlight: false },
	],
	[
		{ text: "I'd never ", highlight: false },
		{ text: "force push", highlight: true },
		{ text: " you away.", highlight: false },
	],
	[
		{ text: "Are you ", highlight: false },
		{ text: "CSS", highlight: true },
		{ text: "? Because you add ", highlight: false },
		{ text: "style", highlight: true },
		{ text: " to my life.", highlight: false },
	],
	[
		{ text: "My heart beats at ", highlight: false },
		{ text: "144 frames per second", highlight: true },
		{ text: " when I see you.", highlight: false },
	],
	[
		{ text: "You're the ", highlight: false },
		{ text: "CSS", highlight: true },
		{ text: " to my ", highlight: false },
		{ text: "HTML", highlight: true },
		{ text: ".", highlight: false },
	],
];

export function getRandomQuote(): Quote {
	return quotes[Math.floor(Math.random() * quotes.length)];
}
