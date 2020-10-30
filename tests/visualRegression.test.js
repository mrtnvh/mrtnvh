const port = 3001;
const getUrl = (p) => `http://localhost:${port}${p}`;

describe("Homepage", () => {
	it('should contain text "Maarten" in brand', async () => {
		await page.goto(getUrl("/"));
		const brandHTML = await page.$eval(
			".brand",
			(brand) => brand.innerHTML,
		);
		await expect(brandHTML).toContain("Maarten");
	});
});
