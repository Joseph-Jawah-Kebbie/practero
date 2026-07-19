import { expect, test } from "@playwright/test";

test("judge can trace the MetroMove connectivity gap into its deployment action", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Where plans meet reality." })).toBeVisible();

  await page.getByRole("link", { name: "Try MetroMove Demo" }).click();
  await expect(page.getByRole("heading", { name: "Urban mobility pilot readiness" })).toBeVisible();
  await expect(page.getByText("Sample analysis", { exact: true }).first()).toBeVisible();

  await page.getByRole("link", { name: "Reality Gaps", exact: true }).click();
  await page
    .getByRole("link", { name: /Continuous ride updates conflict with field connectivity/ })
    .click();

  await expect(page.getByRole("heading", { name: "Why Practero raised this gap" })).toBeVisible();
  await expect(page.getByText(/Drivers reported that mobile data frequently drops/)).toBeVisible();
  await expect(page.getByText(/There is no local event queue, durable offline store/)).toBeVisible();

  await page.getByRole("link", { name: "Open complete source" }).first().click();
  await expect(page.getByRole("heading", { name: "Complete extracted text" })).toBeVisible();
  await expect(page.getByText(/Ride status updates must be recorded continuously/)).toBeVisible();

  await page.getByRole("link", { name: "Deployment Path", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Reliable ride-state delivery" })).toBeVisible();
  await expect(
    page.getByText(
      "A driver can complete all required ride-state transitions during a 15-minute simulated outage, and each transition synchronizes exactly once and in order after connectivity returns.",
      { exact: true },
    ),
  ).toBeVisible();
});
