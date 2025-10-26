import json, urllib.request, sys

# Test Next proxy with targetLang 'zh'
try:
    body = json.dumps({'text':'Good evening','sourceLang':'en','targetLang':'zh'}).encode()
    req = urllib.request.Request('http://127.0.0.1:3000/api/translate', data=body, headers={'Content-Type':'application/json'})
    res = urllib.request.urlopen(req, timeout=10).read().decode()
    print('NEXT PROXY:', res)
except Exception as e:
    print('NEXT PROXY ERROR', e)

# Test backend direct with zh-CN
try:
    body = json.dumps({'q':'Good evening','source':'en','target':'zh-CN'}).encode()
    req = urllib.request.Request('http://127.0.0.1:5000/translate', data=body, headers={'Content-Type':'application/json'})
    res = urllib.request.urlopen(req, timeout=10).read().decode()
    print('BACKEND zh-CN:', res)
except Exception as e:
    print('BACKEND ERROR', e)
