#!/usr/bin/env python
import pika
import rules
import utils
import json
import os.path

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

channel.queue_declare(queue='simulations')
channel.queue_declare(queue='results')

def callback(ch, method, properties, body):
    jsonBody = json.loads(body.decode('utf-8'))
    text = jsonBody['text']
    results = rules.testSpacy(text)

    rulesToRun = jsonBody['rules']
    ruleViolations = []
    for item in rulesToRun:
        ruleId = item.get('id');
        print(">>> rule ID: " + ruleId);

        # parameterized rules need to be handled explicitly here; non-parameterized ones are "free"
        if (ruleId == "initialworddiversity"):
            ruleViolations += rules.initialworddiversity(results, item.get('numwords'), item.get('threshold'));
        elif (ruleId == "initialposdiversity"):
            ruleViolations += rules.initialposdiversity(results, item.get('numwords'), item.get('threshold'));
        elif (ruleId == "neutral_sentence"):
            ruleViolations += rules.neutral_sentence(results, item.get('threshold'));
        elif (ruleId == "response_polarity"):
            ruleViolations += rules.response_polarity(results, item.get('threshold'));
        elif (ruleId == "arc_inconsistency"):
            ruleViolations += rules.arc_inconsistency(results, item.get('expected_use'), item.get('actual_use'));
        else:
            ruleViolations += getattr(rules, ruleId)(results);

    print(ruleViolations)

    # send a message back
    channel.basic_publish(exchange='',
                          routing_key='results',
                          body=json.dumps(ruleViolations, ensure_ascii=False))

    # connection.close()

#  receive message and complete simulation
channel.basic_consume(callback,
                  queue='simulations',
                  no_ack=True)

channel.start_consuming()