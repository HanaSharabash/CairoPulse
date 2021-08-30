import json
import os
import time
folders = os.listdir(str(os.getcwd().replace("\\","/")))
abspath = os.getcwd().replace("\\","/")
for folder in folders:
    os.chdir(abspath)
    try:
        files = os.listdir(str(os.getcwd().replace("\\","/"))+"/"+folder)
        os.chdir(str(os.getcwd().replace("\\","/"))+"/"+folder)
        for file in files:
            result = open(f"filtered_{file}",'w',encoding='utf-8')
            data = set()
            path = str((os.getcwd()).replace("\\","/"))
            region = str(file.split(".")[0])
            file = open(path+"/"+file,'r').read()
            data = json.loads(file)
            res = []
            for obj in data.values():
                for i in obj:
                    if type(i) != str:
                        o = {"type":folder,'region':region,"name":i['name'],"location":i['geometry']['location']}
                        res.append(o)
                    else:
                        continue           
            result.write(json.dumps(res,ensure_ascii= False))
    except:
        print(f"error in {region}")