/**
 * These are all the rules that the client knows about.
 *
 * Standard rules are ones that are NOT user-selectable -- every request to the back end will automatically include these
 * Optional rules are the user-selectable ones
 *
 * To add a new rule:
 * - the key must correspond exactly to the rule_id that the rule in rules.py returns
 * - the id in the structure returned by a payload() method must correspond to the name of the intended rule in the rules.py
 * - if the back-end rule is parameterized (such as arcInconsistency), you will need to add a "case" for it in the
 *   callback handler in messaging.py (see comment around line 25)
 */

export const standardRules = {
	spellCorrect: {
		name: 'Incorrect spelling',
		description: 'This rule checks writing for incorrect spellings',
		example: 'Braed is tasty.',
		payload: () => {
			return {id: 'spellcorrect'};
		}
	},
	conjunctionStart: {
		name: 'Improper conjuction usage',
		payload: () => {
			return {id: 'conjunctionstart'};
		}
	},
	arcInconsistency: {
		name: 'Improper adjective/adverb usage',
		description: "This rule identifies when a student is using an adjective where they should be using an adverb",
		example: 'She sleeps <b>deep</b>.',
		payload: () => {
			return {id: 'arc_inconsistency', expected_use: 'advmod', actual_use: 'adv'};
		},
	},
	splitInfinitive: {
		name: 'Split infinitives',
		payload: () => {
			return {id: 'splitinfinitive'};
		}
	},
	choppySentence: {
		name: 'Choppy sentence',
		description: 'A sentence with 3 or fewer words',
		example: 'Bread is tasty.',
		payload: () => {
			return {id: 'choppySentence'};
		}
	},
	subjVerbConcordance: {
		name: 'Verb/subject plurality mismatch',
		description: 'This rule checks that a verb is in agreement with the subject(s) that it modifies',
		example: '<i>They <b>is</b> going home soon.</i><br/>Since the verb is modifying a plural pronoun, we want the plural form of the verb.',
		payload: () => {
			return {id: 'subjverbconcordance'};
		}
	},
	tier2words: {
		name: 'Tier 2 word usage',
		description: "This rule highlights the student's use of Common Core tier 2 words",
		payload: () => {
			return {id: 'get_tier2words'};
		}
	},
	tier3words: {
		name: 'Tier 3 word usage',
		description: "This rule highlights the student's use of Common Core tier 3 words",
		payload: () => {
			return {id: 'get_tier3words'};
		}
	},
	passiveForm: {
		name: 'Use of passive voice',
		description: 'Students should make limited use of passive the voice.',
		example: '',
		payload: () => {
			return {id: 'passiveform'};
		}
	},

	// neutralsentiment: {
	//     name: 'Excessively neutral sentences',
	//     description: 'This rule checks for sentences that are excessively neutral, and that could be written more expressively',
	//     payload: () => {
	//         return {id: 'neutral_sentence', threshold: 0.4}
	//     }
	// },
	// response_polarity: {
	//     name: 'Unexpressive sentences',
	//     description: 'This rule checks for sentences that are too neutral on average, and that could be written more expressively',
	//     payload: () => {
	//         return {id: 'response_polarity', threshold: 0.4}
	//     }
	// }
};

export const optionalRules = {
	worddiversity: {
		name: 'Repetition of initial words',
		description: 'This rule checks if the same initial <i>n</i> words in a sentence are used more than a certain amount of times',
		example: '<b>Then we</b> ran.<br/><b>Then we</b> swam.<br/><b>Then we</b> ate.',
		payload: () => {
			return {id: 'initialworddiversity', numwords: 2, threshold: 1}
		}
	},
	posdiversity: {
		name: 'Sentences begin with parallel structures',
		description: 'This rule checks if the parts of speech for the initial <i>n</i> words in a sentence occur in the same pattern more than a certain amount of times',
		example: "<b>The first time we went out</b> it was cold. <b>The second time we went out</b> it was hot. <b>The third time</b> it was snowing.",
		payload: () => {
			return {id: 'initialposdiversity', numwords: 4, threshold: 2}
		}
	},
};
