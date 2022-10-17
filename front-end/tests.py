import unittest
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time



class SiteTest(unittest.TestCase):
  
    def test_visit_site(self):

        time.sleep(40)

        browser = webdriver.Remote("http://host.docker.internal:4444/wd/hub", DesiredCapabilities.FIREFOX)
        browser.get("http://localhost:3000/")

        try:
            self.assertTrue("Laab Project" in browser.page_source, "Fallo test")
            browser.close()

        except AssertionError:
            browser.close()
            raise AssertionError("Fallo startProcessTest")
        
if __name__ == '__main__':
    unittest.main()