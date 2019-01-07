# Starter project for hackathon team-sermo

## Dependencies
```
# brew install rabbitmq
# sudo easy_install pip
# sudo pip install pika
# npm install nodemon
# NOTE: Python 3 is required (3.7.2 is working for me)
```


## Python Libraries
```
# pip install spacy
# python -m spacy download en
# pip install pandas
# pip install pyspellchecker
# pip install nltk
# pip install numpy
# python -m nltk.downloader punkt
# python -m nltk.downloader vader_lexicon
```

If this is still not working for you it may be because you have multiple Python versions installed. Try creating a virtual environment before installing the libraries.
```
# python3 -m venv .env
# source .env/bin/activate
# pip install spacy
# python3 -m spacy download en
# pip install pandas
# pip install pyspellchecker
# pip install nltk
# pip install numpy
# python3 -m nltk.downloader punkt
# python3 -m nltk.downloader vader_lexicon
```

For MacOS, if you have errors downloading nltk's modules, try: https://stackoverflow.com/questions/41348621/ssl-error-downloading-nltk-data

## To start
```
# brew services start rabbitmq
# cd express-server && npm i
# cd web && npm i && npm run dev
```

## Python Node integration using RabbitMQ
For more details see:
 https://www.rabbitmq.com/tutorials/tutorial-five-python.html
 https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html
