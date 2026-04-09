from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import os

# Chrome headless options for CI
chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920,1080")

driver = webdriver.Chrome(options=chrome_options)

# Open local index.html
file_path = "file://" + os.path.join(os.getcwd(), "index.html")
driver.get(file_path)

player = driver.find_element("id", "player")

# Jump test
driver.execute_script("document.dispatchEvent(new KeyboardEvent('keydown', {'code':'Space'}));")
time.sleep(1)
top_after_jump = driver.execute_script("return document.getElementById('player').getBoundingClientRect().top")
print("Top after jump:", top_after_jump)
assert top_after_jump < 400  # ground is 400px

# Move right
driver.execute_script("document.dispatchEvent(new KeyboardEvent('keydown', {'code':'ArrowRight'}));")
time.sleep(0.6)
left_after_right = driver.execute_script("return document.getElementById('player').getBoundingClientRect().left")
print("Left after right:", left_after_right)
assert left_after_right > 0

# Move left
driver.execute_script("document.dispatchEvent(new KeyboardEvent('keydown', {'code':'ArrowLeft'}));")
time.sleep(0.6)
left_after_left = driver.execute_script("return document.getElementById('player').getBoundingClientRect().left")
print("Left after left:", left_after_left)
assert left_after_left >= 0

driver.quit()
