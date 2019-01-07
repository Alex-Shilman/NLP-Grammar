#!/usr/bin/env python3
import re
import spacy
from spellchecker import SpellChecker
from spacy.tokens import Token
import os
from collections import defaultdict
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
import numpy

def testSpacy(incomingString):
    nlp = spacy.load('en_core_web_sm')
    nltk.download('punkt', quiet=True)
    nltk.download('vader_lexicon', quiet=True)

    return nlp(str(incomingString))


def leftmostword(words):
    """Return the word in the list that appears first in the doc"""
    left = None

    for word in words:
        if True if left is None else True if left.idx > word.idx else False:
            left = word

    return left


def rightmostword(words):
    """Return the word in the list that appears last in the doc"""
    right = None

    for word in words:
        if True if right is None else True if right.idx < word.idx else False:
            right = word

    return right


def predicateMatchesTag (verb, tag):
    if verb.tag_.lower() == tag:
        return True

    aux = getAuxiliaries(verb)
    tagAug = [x for x in aux if x.tag_.lower() == tag]
    if tagAug:
        return True

    return False


def predicateIs3dSingular (verb):
    """Retruns True if the predicate is recognized as 3rd person singular, also considering the auxiliary"""
    return predicateMatchesTag(verb, "vbz")


def predicateIsNon3dSingular (verb):
    """Retruns True if the predicate is recognized as non-3rd person singular, also considering the auxiliary"""
    return predicateMatchesTag(verb, "vbp")


def getAuxiliaries (verb):
    """Return any auxiliary for the verb"""
    return [x for x in list(verb.children) if re.match("aux.*",x.dep_.lower())]


def getSubjectAndPredicateGroup (subject):
    """Get a list of all the words that are part of subject and predicate, given the subject"""
    return [subject, subject.head] + list(subject.children) + list(subject.conjuncts) + getAuxiliaries(subject.head)


def spellcorrect(document):
    Token.set_extension('spelling_correction',default = None,force= True)
    Token.set_extension('spelling_candidates',default = None,force= True)

    spell = SpellChecker()
    violations = []
    for word in document:
        ignore_regex = r"(“|”|’|\n|\t|\\n|\\t| |'s|’s|n't|n’t)"
        misspelled = (not bool(re.match(ignore_regex, word.text))) & (len(spell.unknown([word.text])) > 0)
        if misspelled:
            word._.spelling_correction= spell.correction(word.text)
            word._.spelling_candidates= spell.candidates(word.text)

            violations.append({
                'rule_id':'spellCorrect',
                'word':word.text,
                'positions':[[word.idx,word.idx + len(word.text)]],
                'correction': word._.spelling_correction,
                'candidates': list(word._.spelling_candidates)
            })
    return violations

def conjunctionstart(document):
    violations = []
    for sentence in document.sents:
        if len(sentence) > 1:
            word1, word2 = sentence[0:2]
            if (word1.text == 'And' and word2.text == 'then'):
                violations.append({
                    'rule_id':'conjunctionStart',
                    'positions':[[word1.idx,word2.idx + len(word2)]]
                })
    return violations

def arc_inconsistency (doc,expected_use,actual_use):
    violations = []
    for sentence in doc.sents:
        for word in sentence:
            if word.dep_.lower() == expected_use.lower() and word.pos_.lower() != actual_use.lower():
                violations.append({
                    'rule_id':'arcInconsistency',
                    'word':word.text,
                    'positions':[[word.idx,word.idx + len(word.text)],[word.head.idx,word.head.idx + len(word.head.text)]]
                })
    return violations

def splitinfinitive (document):
    violations = []

    for i, word in enumerate(document):
        if (word.dep_.lower() == "aux") & (word.lemma_.lower() == "to"):
            next_word = document[i + 1]
            if next_word != word.head:
                left = leftmostword([word, word.head])
                right = rightmostword([word, word.head])
                violations.append({
                    'rule_id':'splitInfinitive',
                    'positions':[[left.idx,right.idx + len(right.text)]]
                })
    return violations

def choppySentence (doc):
    violations = []

    for sentence in doc.sents:
        if len(sentence) <= 3:
            violations.append({
                'rule_id': 'choppySentence',
                'positions': [[sentence[0].idx, sentence[-1].idx + len(sentence[-1]) ]]
            })
    return violations


def get_tier3words(doc):
    with open(os.path.join(re.sub(r"express-server.*", "", os.getcwd()), "resources", "tier3.txt"),'r') as filehandle:
        tier3words = filehandle.read().splitlines()
        tier3words = [x[:-1].lower().strip() for x in tier3words]

    wordlist = defaultdict(list)
    for sentence in doc.sents:
        for word in sentence:
            if word.text.lower().strip() in tier3words:
                wordlist[word.text.lower()].append([word.idx,word.idx + len(word.text)])
    violationlist = []
    for key,value in dict(wordlist).items():
        violationlist.append({'rule_id':'tier3words'
                            , 'word':key
                            ,'positions':value})
    return violationlist

def get_tier2words(doc):
    with open(os.path.join(re.sub(r"express-server.*", "", os.getcwd()), "resources", "tier2.txt"),'r') as filehandle:
        tier2words = filehandle.read().splitlines()
        tier2words = [x[:-1].lower().strip() for x in tier2words]
    wordlist = defaultdict(list)
    for sentence in doc.sents:
        for word in sentence:
            if word.text.lower().strip() in tier2words:
                wordlist[word.text.lower()].append([word.idx,word.idx + len(word.text)])
    violationlist = []
    for key,value in dict(wordlist).items():
        violationlist.append({'rule_id':'tier2words'
                            , 'word':key
                            ,'positions':value})
    return violationlist


def subjverbconcordance (document):
    violations = []

    for word in document:
        if re.match("nsubj*", word.dep_.lower()):
            subj_conjuncts = list(word.conjuncts)
            is_3rd_singular = (not bool(re.match(r"^(i|you|we|they|me|us|them)$", word.text.lower()))) \
                              & (not (bool(subj_conjuncts) & (not True in [y in [x.text.lower() for x in list(word.children) if x.tag_.lower()=="cc"] for y in ["or", "nor"]]))) \
                              & (not bool(re.match(r"nnp?s", word.tag_.lower())))

            if (is_3rd_singular & predicateIsNon3dSingular(word.head)) | ((not is_3rd_singular) & predicateIs3dSingular(word.head)):
                left = leftmostword(getSubjectAndPredicateGroup(word))
                right = rightmostword(getSubjectAndPredicateGroup(word))
                detail = "The subject is 3rd person singular, the verb is not" \
                    if is_3rd_singular \
                    else "The verb is 3rd person singular, the subject is not"
                violations.append({'rule_id': 'subjVerbConcordance'
                                                    ,"positions":[[left.idx,right.idx + len(right.text)]]
                                                    ,"detail":detail})
    return violations


def passiveform (document):
    violations = []
    for word in document:
        if re.match(r".*subjpass", word.dep_.lower()):
            left = leftmostword(getSubjectAndPredicateGroup(word))
            right = rightmostword(getSubjectAndPredicateGroup(word))
            violations.append({'rule_id': 'passiveForm'
                                                , "positions": [[left.idx, right.idx + len(right.text)]]})

    return violations

def initialworddiversity(doc,numwords,threshold):
    words = []
    for sentence in doc.sents:
        #check to make sure the desired length does not exceed the number of wors in sentence
        if len(sentence)< numwords:
            depth = len(sentence)
        else:
            depth = numwords
        words.append([word for word in sentence[:depth]])

    pair_dict = defaultdict(list)

    for pair in words:
        pair_dict[tuple(item.text for item in pair)].append([[item.idx,item.idx + len(item.text)] for item in pair])

    violations = []
    for key, value in pair_dict.items():
        if len(value) > threshold:
            violations.append({'rule_id':'worddiversity'
                              ,'wordgroup':list(key)
                              ,'occurences':len(pair_dict[key])
                              ,'positions':pair_dict[key]})

    for item in violations:
        positions = []
        for pair in item['positions']:
            positions.append([int(numpy.min(pair)),int(numpy.max(pair))])
        item['positions'] = positions

    return violations

def initialposdiversity(doc,numwords,threshold):
    words = []
    for sentence in doc.sents:
        #check to make sure the desired length does not exceed the number of wors in sentence
        if len(sentence)< numwords:
            depth = len(sentence)
        else:
            depth = numwords
        words.append([word for word in sentence[:depth]])


    pair_dict = defaultdict(list)

    for pair in words:
        pair_dict[tuple(item.pos_ for item in pair)].append([[item.idx,item.idx + len(item.text)] for item in pair])

    violations = []
    for key, value in pair_dict.items():
        if len(value) > threshold:
            violations.append({'rule_id':'posdiversity'
                              ,'wordgroup':list(key)
                              ,'occurences':len(pair_dict[key])
                              ,'positions':pair_dict[key]})
    for item in violations:
        positions = []
        for pair in item['positions']:
            positions.append([int(numpy.min(pair)),int(numpy.max(pair))])
        item['positions'] = positions

    return violations

def neutral_sentence(doc,threshold):
    sid = SentimentIntensityAnalyzer()
    violations = []
    positions = []
    for sentence in doc.sents:
        if sid.polarity_scores(sentence.text)['neu'] > threshold:
            positions.append([sentence[0].idx,sentence[-1].idx])

    if positions:
        violations.append({'rule_id':'neutralsentiment'
                            ,'positions':positions})
    return violations


def response_polarity(doc,threshold):
    #threshold is a number between 0 and 1 where 0 is not expressive
    #and 1 is very, very expressive
    sid = SentimentIntensityAnalyzer()
    positions = []
    polarities = []
    for sentence in doc.sents:
        polarities.append(abs(sid.polarity_scores(sentence.text)['compound']))
        if abs(sid.polarity_scores(sentence.text)['compound']) < .5:
            positions.append([sentence[0].idx,sentence[-1].idx + len(sentence[-1])])
    return [{'rule_id':'response_polarity'
            ,'positions':positions
            ,'polarity':numpy.mean(polarities)}]
