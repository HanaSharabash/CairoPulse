from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
path = "C://Program Files (x86)/chromedriver.exe"
driver = webdriver.Chrome(path)
file = open("data.json",'a')
for j in range(7725,7773):
    org = "https://www.talabat.com/egypt/restaurants/"
    org+=str(j)
    driver.get(org)
    org = str(driver.current_url)
    link = org.split('/')
    locName = link[len(link)-1]
    #file.write(locName)
    for i in range(1,40):
        try:
            driver.get(org+"/?page="+str(i))
            if i != 1 and str(i) != str(str(driver.current_url).split("=")[1]):
                break
            driver.implicitly_wait(5)
            elems = driver.find_elements_by_class_name("restaurant-info-section")
            for res in elems:
                result = str(res.text).split("\n")[0]
                writable = {locName:result}
                jsonString = json.dumps(writable)
                file.write(jsonString)
                
        except:
            print("Page Not Found")
            break    
    print("DONE")
file.close()        