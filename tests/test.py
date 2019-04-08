from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver import Firefox
from selenium.webdriver.firefox.options import Options

class Tester:
    def __init__(self, base_url):
        #chrome_options = ChromeOptions()
        #chrome_options.add_argument('--headless')
        #chrome_options.add_argument('--window-size=1920x1080')
        #self.driver = webdriver.Chrome(chrome_options=chrome_options)
        firefox_options = Options()
        firefox_options.add_argument('--headless')
        self.driver = Firefox(firefox_options=firefox_options)
        self.base_url = base_url
        self.driver.get(self.base_url)

    def get(self, url):
        self.driver.get(url)

    def screenshot(self, local_path):
        self.driver.save_screenshot(local_path)

    def scan(self, url):
        self.driver.get(url)
        assert 'Glimpse ID' in self.driver.title

    def get_scan_result(self, url):
        self.driver.get('SOMETHING/scan/{ hash_of_url }')

    def enter_url(self, url):
        url_input = self.driver.find_element_by_class_name('form-control')[0]
        if url_input:
            url_input.send_keys(url)
        else:
            raise("Couldn't find URL form input by class name")

        scan_btn = self.driver.find_element_by_id('btn-override')
        scan_btn.click()

    def force_update(self):
        checkmark = self.driver.find_element_by_id('force-update')
        if checkmark:
            checkmark.click()

    def get_title(self):
        return self.driver.title


def main():
    base_url = os.environ.get('BASE_URL')
    tester = Tester(base_url)
    tester.enter_url('google.com')
    tester.force_update()
    tester.screenshot('force_update.png')

if __name__ == '__main__':
    main()