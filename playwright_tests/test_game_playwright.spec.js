const { test, expect } = require('@playwright/test');
const path = require('path');

test('Player can jump and move', async ({ page }) => {
  const filePath = 'file://' + path.join(__dirname, '../index.html');
  await page.goto(filePath);

  const player = await page.$('#player');

  await page.keyboard.press('Space');
  await page.waitForTimeout(1000);
  const topAfterJump = parseInt((await player.evaluate(el => el.style.top)).replace('px',''));
  expect(topAfterJump).toBeLessThan(300);

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  const leftAfterRight = parseInt((await player.evaluate(el => el.style.left)).replace('px',''));
  expect(leftAfterRight).toBeGreaterThan(0);

  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(500);
  const leftAfterLeft = parseInt((await player.evaluate(el => el.style.left)).replace('px',''));
  expect(leftAfterLeft).toBeGreaterThanOrEqual(0);
});
