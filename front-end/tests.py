from cmath import e
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service

#Set Driver
#s = Service('/usr/local/bin/chromedriver')
driver = webdriver.Chrome('/usr/local/bin/chromedriver')

class Tests(unittest.TestCase):

    

    def test_startProcess(self):
        #ingreso a la URL
        driver.get("http://localhost:4200/")


        #Clic en Start Process
        startProcessBtn = driver.find_element(By.LINK_TEXT, value="Start Process")
        startProcessBtn.click()
        time.sleep(1)
        
        #Clic en My Process
        myProcessBtn = driver.find_element(By.LINK_TEXT, value="My Process")
        myProcessBtn.click()
        time.sleep(1)

        
        #Cargo la First Name
        firstName = driver.find_element(By.ID, "firstName")
        firstName.clear()
        firstName.send_keys("Juan")
        time.sleep(2)

        #Cargo la Last Name
        lastName = driver.find_element(By.ID, "lastName")
        lastName.clear()
        lastName.send_keys("Perez")
        time.sleep(2)

        #Presiono ENTER para iniciar proceso
        lastName.send_keys(Keys.RETURN)
        time.sleep(2)

        try:
            self.assertTrue("Process has been started." in driver.page_source)
            driver.close()

        except AssertionError:
            driver.close()
            raise AssertionError("Fallo startProcessTest")

        

    #def test_sum_tuple(self):
    #   self.assertEqual(sum((1, 2, 2)), 6, "Should be 6")


if __name__ == '__main__':
    unittest.main()







'''
s = Service('/usr/local/bin/chromedriver')
driver = webdriver.Chrome(service=s)
#ingreso a la URL
driver.get("http://localhost:4200/")


#Clic en Start Process
startProcessBtn = driver.find_element(By.LINK_TEXT, value="Start Process")
startProcessBtn.click()

time.sleep(1)

myProcessBtn = driver.find_element(By.LINK_TEXT, value="My Process")
myProcessBtn.click()

time.sleep(1)

 
#Cargo la First Name
firstName = driver.find_element(By.ID, "firstName")
firstName.clear()
firstName.send_keys("Juan")

time.sleep(2)

#Cargo la Last Name
lastName = driver.find_element(By.ID, "lastName")
lastName.clear()
lastName.send_keys("Perez")

time.sleep(2)

#Presiono ENTER para iniciar proceso
lastName.send_keys(Keys.RETURN)

time.sleep(3)

driver.close()
'''









'''
#Hay que redirigir de nuevo porque no toma el puerto sino
driver.get("http://192.168.56.101:8117/") 

#Lleno un campo de la sección "Creacion rapida de ticket"
contenidoTicket = driver.find_element(By.NAME, "Content")
contenidoTicket.clear()
contenidoTicket.send_keys("Probando")

#Hago clic en crear
crearTicket = driver.find_element(By.NAME, "SubmitTicket").click

'''




