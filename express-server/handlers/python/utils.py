#!/usr/bin/env python3
import json
import os.path

def getTextToAnalyze(id):
    my_path = os.path.abspath(os.path.dirname(__file__))
    path = os.path.join(my_path, "../../../resources/student_error.json")

    with open(path) as data_file:
        student_errors = json.load(data_file)

    text = ''
    for entry in student_errors['examples']:
        if entry["id"] == id: 
            text = entry['text']
            
    return text