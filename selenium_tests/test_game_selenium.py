from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os

file_path = "file://" + os.path.abspath("index.html")

driver = webdriver.Chrome()
driver.get(file_path)

player = driver.find_element(By.ID, "player")
game_area = driver.find_element(By.ID, "gameArea")

player.send_keys(Keys.SPACE)
time.sleep(1)
top_pos = int(player.value_of_css_property('top').replace('px',''))
assert top_pos < game_area.size['height']

player.send_keys(Keys.ARROW_RIGHT)
time.sleep(0.5)
right_pos = int(player.value_of_css_property('left').replace('px',''))
assert right_pos > 0

player.send_keys(Keys.ARROW_LEFT)
time.sleep(0.5)
left_pos = int(player.value_of_css_property('left').replace('px',''))
assert left_pos >= 0

driver.quit()
print("Selenium UI test passed!")
