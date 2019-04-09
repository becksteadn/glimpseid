import os
from time import sleep
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver import Firefox
#from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.options import Options as FirefoxOptions

class Tester:
    def __init__(self, base_url):
        #chrome_options = ChromeOptions()
        #chrome_options.add_argument('--headless')
        #chrome_options.add_argument('--window-size=1920x1080')
        #self.driver = webdriver.Chrome(chrome_options=chrome_options)
        firefox_options = FirefoxOptions()
        firefox_options.headless = True
        self.driver = Firefox(options=firefox_options)
        self.base_url = base_url
        self.driver.get(self.base_url)

    def get(self, url):
        self.driver.get(url)

    def screenshot(self, local_path):
        self.driver.save_screenshot(local_path)

    def scan(self, url, update=False):
        self.driver.get(self.base_url)
        assert 'Glimpse ID' in self.driver.title

        self.enter_url(url)

        self.show_options() # Remove when element has been hidden, not removed
        if update:
            self.force_update()
        self.press_scan()
        
        wait_secs = 1
        while 'Scan Results' not in self.get_title():
            if wait_secs > 45:
                raise('Timed out waiting for window title to equal "Scan Results"')
            print(str(wait_secs) + '-' + '.'*wait_secs)
            wait_secs += 1
            sleep(1)

        sleep(2)
        self.screenshot('result.png')


    def get_scan_result(self, url):
        self.driver.get('SOMETHING/scan/{ hash_of_url }')

    def press_scan(self):
        scan_btn = self.driver.find_element_by_id('btn-scan')
        scan_btn.click()

    def show_options(self):
        opts_btn = self.driver.find_element_by_id('btn-options')

        try:
            checkmark = self.driver.find_element_by_id('force-update')
        except selenium.common.exceptions.NoSuchElementException:
            opts_btn.click()

    def close_options(self):
        opts_btn = self.driver.find_element_by_id('btn-options')

        try:
            checkmark = self.driver.find_element_by_id('force-update')
            opts_btn.click()
        except selenium.common.exceptions.NoSuchElementException:
            pass

    def enter_url(self, url):
        url_input = self.driver.find_element_by_id('input-url')
        if url_input:
            url_input.send_keys(url)
        else:
            raise("Couldn't find URL form input by class name")

    def force_update(self):
        checkmark = self.driver.find_element_by_id('force-update')
        if checkmark:
            checkmark.click()

    def get_title(self):
        return self.driver.title


def main():
    base_url = os.environ.get('BASE_URL')
    tester = Tester(base_url)
    tester.scan('google.com', update=True)

if __name__ == '__main__':
    main()