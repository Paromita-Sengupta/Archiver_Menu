import json
import requests
from flask import Flask, render_template, request, redirect, url_for, escape, flash


app=Flask(__name__)
app.secret_key = 'super_secret_key'
app.config['TESTING'] = True


def get_pvs(url):
    string ="http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="
    s= []
    pvs = []
    response = requests.request("GET", url)
    # print(response.text)
    data = json.loads(response.text)
    print data

    s= '&pv='.join(data)
    t=str(string) + str(s) +str("&from=2019-05-13T23:59:59&to=2019-05-14T23:59:59")
    print t

def get_pvs_regEx(url):
    string ="http://vm-archiver-02.clsi.ca:17668/retrieval/ui/viewer/archViewer.html?pv="
    s= []
    pvs = []
    response = requests.request("GET", url)
    # print(response.text)
    data = json.loads(response.text)
    print data

    s= '&pv='.join(data)
    t=str(string) + str(s) +str("&from=2019-05-13T23:59:59&to=2019-05-14T23:59:59")
    print t

pv = str("%5ETM.*")

get_pvs("http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&pv="+pv)


get_pvs_regEx("http://vm-archiver-02.clsi.ca:17668/retrieval/bpl/getMatchingPVs?limit=10000&regex="+pv)
