const { test, expect } = require('@playwright/test');
const path = require('path');

test('Player can jump and move', async ({ page }) => {
  const filePath = 'file://' + path.join(__dirname, '../index.html');
  await page.goto(filePath);

  const player = await page.$('#player');
  const gameArea = await page.$('#gameArea');

  // Make sure initial positions are rendered
  await page.waitForTimeout(500);

  // Press SPACE to jump
  await page.keyboard.press('Space');
  await page.waitForTimeout(1000); // give game loop time to update
  const topAfterJump = await player.evaluate(el => el.getBoundingClientRect().top);
  const gameAreaTop = await gameArea.evaluate(el => el.getBoundingClientRect().top);
  expect(topAfterJump).toBeLessThan(gameAreaTop + gameArea.clientHeight - player.clientHeight);

  // Press RIGHT arrow
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(600); // allow movement
  const leftAfterRight = await player.evaluate(el => el.getBoundingClientRect().left);
  const gameAreaLeft = await gameArea.evaluate(el => el.getBoundingClientRect().left);
  expect(leftAfterRight).toBeGreaterThan(gameAreaLeft);

  // Press LEFT arrow
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(600);
  const leftAfterLeft = await player.evaluate(el => el.getBoundingClientRect().left);
  expect(leftAfterLeft).toBeGreaterThanOrEqual(gameAreaLeft);
});
