import spacy
from spacy import displacy
from spellchecker import SpellChecker
from spacy.tokens import Doc, Token
import pandas

nlp = spacy.load('en_core_web_sm')

def initialworddiversity(doc,numwords):
    words = []
    partsofspeech = []
    for sentence in doc.sents:
        #check to make sure the desired length does not exceed the number of wors in sentence
        if len(sentence)< numwords:
            depth = len(sentence)
        else:
            depth = numwords
        try:
            words.append([word.text for word in sentence[:depth]])
            partsofspeech.append([word.pos_ for word in sentence[:depth]])
        except:
            #add in case where if the requested length is greater than the number of words in the sentence
            pass
    df = pandas.concat([pandas.DataFrame(words,columns = ['word ' + str(num) for num in range(0,numwords)])
                          ,pandas.DataFrame(partsofspeech ,columns = ['partofspeech ' + str(num) for num in range(0,numwords)])],axis=1)

    wordgroup = ['word ' + str(num) for num in range(0,numwords)]
    posgroup = ['partofspeech ' + str(num) for num in range(0,numwords)]

    return {'word_distribution': df.groupby(wordgroup)['partofspeech 0'].agg('count').to_dict()
            ,'pos_distribution': df.groupby(posgroup)['word 0'].agg('count').to_dict()}
initialworddiversity(doc,2)
