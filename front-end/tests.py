import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time



class SiteTest(unittest.TestCase):
  
    def test_visit_site(self):

        time.sleep(10)

        browser = webdriver.Remote("http://host.docker.internal:4444/wd/hub", DesiredCapabilities.FIREFOX)
        browser.get("http://localhost:4200/")
        
        #Clic en Start Process
        startProcessBtn = browser.find_element(By.LINK_TEXT, value="Start Process")
        startProcessBtn.click()
        time.sleep(4)

        #Clic en My Process
        myProcessBtn = browser.find_element(By.LINK_TEXT, value="My Process")
        myProcessBtn.click()
        time.sleep(4)

        
        #Cargo la First Name
        firstName = browser.find_element(By.ID, "firstName")
        firstName.clear()
        firstName.send_keys("Juan")
        time.sleep(4)

        #Cargo la Last Name
        lastName = browser.find_element(By.ID, "lastName")
        lastName.clear()
        lastName.send_keys("Perez")
        time.sleep(4)

        #Presiono ENTER para iniciar proceso
        lastName.send_keys(Keys.RETURN)
        time.sleep(4)

        try:
            self.assertTrue("Process has been started." in browser.page_source, "Fallo test")
            browser.close()

        except AssertionError:
            browser.close()
            raise AssertionError("Fallo startProcessTest")
        
if __name__ == '__main__':
    unittest.main()