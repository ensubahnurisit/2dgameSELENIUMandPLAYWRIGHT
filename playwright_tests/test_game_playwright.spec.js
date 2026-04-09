const { test, expect } = require('@playwright/test');
const path = require('path');

test('Player can jump and move', async ({ page }) => {
    // Open local HTML
    const filePath = 'file://' + path.join(__dirname, '..', 'index.html');
    await page.goto(filePath);

    const player = page.locator('#player');

    // Jump
    await page.keyboard.press('Space');
    await page.waitForTimeout(500); // wait for jump to take effect
    const topAfterJump = await player.evaluate(el => el.getBoundingClientRect().top);
    console.log('Top after jump:', topAfterJump);
    expect(topAfterJump).toBeLessThan(400); // 400 is ground level

    // Move right
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    const leftAfterRight = await player.evaluate(el => el.getBoundingClientRect().left);
    console.log('Left after right:', leftAfterRight);
    expect(leftAfterRight).toBeGreaterThan(0);

    // Move left
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    const leftAfterLeft = await player.evaluate(el => el.getBoundingClientRect().left);
    console.log('Left after left:', leftAfterLeft);
    expect(leftAfterLeft).toBeGreaterThanOrEqual(0);
});
