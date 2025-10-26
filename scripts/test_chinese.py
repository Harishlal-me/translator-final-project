import json
import urllib.request

TARGETS = ['zh','zh-CN','zh-TW','zh-Hans','zh-cn']
for target in TARGETS:
    try:
        data = json.dumps({'q':'Good morning','source':'en','target':target}).encode()
        req = urllib.request.Request('http://127.0.0.1:5000/translate', data=data, headers={'Content-Type':'application/json'})
        res = urllib.request.urlopen(req, timeout=10).read().decode()
        print(f"{target}: {res}")
    except Exception as e:
        print(f"{target}: ERROR {e}")
