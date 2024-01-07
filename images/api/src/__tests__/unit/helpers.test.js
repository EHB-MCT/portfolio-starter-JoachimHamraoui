const {checkMangaTitle, checkMangaAuthor, checkMangaCoverUrl, checkMangaVolumes} = require('../../helpers/endpointHelpers');


test("Check Manga Title", () => {
    expect(checkMangaTitle("")).toBe(false);
    expect(checkMangaTitle(null)).toBe(false);
    expect(checkMangaTitle("i")).toBe(false);
    expect(checkMangaTitle(0)).toBe(false);
    expect(checkMangaTitle("ddehdgugdhiuguehzdgyhuyguydegyuezfdbhfbhshbdshjdfgyufgyugfefhjvdshvsdvcghsv")).toBe(false);
    expect(checkMangaTitle("naruto")).toBe(true);
    expect(checkMangaTitle("one piece")).toBe(true);
})

test("Check Manga Author's name", () => {
    expect(checkMangaAuthor("")).toBe(false);
    expect(checkMangaAuthor(null)).toBe(false);
    expect(checkMangaAuthor("i")).toBe(false);
    expect(checkMangaAuthor(0)).toBe(false);
    expect(checkMangaAuthor("ddehdgugdhiuguehzdgyhuyguydegyuezfdbhfbhshbdshjdfgyu")).toBe(false);
    expect(checkMangaAuthor("ONE")).toBe(true);
    expect(checkMangaAuthor("Q Hayashida")).toBe(true);
});

test("Check Manga Cover URL", () => {
    expect(checkMangaCoverUrl("https://example.com/manga1.jpg")).toBe(true);
    expect(checkMangaCoverUrl("https://example.com/manga2.png")).toBe(false);
    expect(checkMangaCoverUrl("https://example.com/manga3")).toBe(false);
    expect(checkMangaCoverUrl("https://example.com/manga4.jpg123")).toBe(false);
    expect(checkMangaCoverUrl("https://example.com/123.jpg")).toBe(false);
    expect(checkMangaCoverUrl("https://example.com/manga5.jpg")).toBe(true);
});

test("Check Manga Volumes", () => {
    expect(checkMangaVolumes(0)).toBe(true);
    expect(checkMangaVolumes(5)).toBe(true);
    expect(checkMangaVolumes(-1)).toBe(false); // Negative value should be invalid
    expect(checkMangaVolumes(3.5)).toBe(false); // Decimal should be invalid
    expect(checkMangaVolumes("5")).toBe(false); // String input should be invalid
    expect(checkMangaVolumes(null)).toBe(false); // Null should be invalid
    expect(checkMangaVolumes(undefined)).toBe(false); // Undefined should be invalid
});