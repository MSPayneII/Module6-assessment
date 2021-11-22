import { Builder, Capabilities, By } from "selenium-webdriver";

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeEach(async () => {
  driver.get("http://localhost:3000/");
});

afterAll(async () => {
  driver.quit();
});

// Example test
test("Title shows up when page loads", async () => {
  const title = await driver.findElement(By.id("title"));
  const displayed = await title.isDisplayed();
  expect(displayed).toBe(true);
});

// Test 1
test("Robot Choices appear when 'Draw' button is clicked", async () => {
  await driver.sleep(2000); //gives time before the draw button click
  const robotChoiceContainer = await driver.findElement(By.id("choices"));
  const drawBtn = await driver.findElement(By.id("draw"));

  drawBtn.click();
  await driver.sleep(2000); // gives time after the draw button click to make sure the tests don't get ahead of themselves

  const isDisplayed = await robotChoiceContainer.isDisplayed();
  expect(isDisplayed).toBe(true);
});

// Test 2
test("player-duo container is displayed when an 'Add to Duo' button is clicked", async () => {
  const playerDuoContainer = await driver.findElement(By.id("player-duo"));

  const robotChoiceContainer = await driver.findElement(By.id("choices"));

  const drawBtn = await driver.findElement(By.id("draw"));
  drawBtn.click();

  await driver.sleep(2000);

  // finds the first robotcard in the robot choice container. I only need one instead of the entire list
  const robotCard = await robotChoiceContainer.findElement(
    By.className("bot-card outline")
  );

  //finds the Add to duo button on the robot card
  const robotAddBtn = robotCard.findElement(By.className("bot-btn"));

  robotAddBtn.click();

  await driver.sleep(2000); // gives time after the draw button click to make sure the tests don't get ahead of themselves

  const playerDuoContainerIsDisplayed = await playerDuoContainer.isDisplayed();
  expect(playerDuoContainerIsDisplayed).toBe(true);
});
