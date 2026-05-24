import { chromium } from "playwright-core";
import Browserbase from "@browserbasehq/sdk";

const bb = new Browserbase({
    apiKey: process.env.BROWSERBASE_API_KEY,
});

// Search Google for a keyword and extract ranking results for a target domain.
export async function rankTracker(keyword, targetDomain) {
    let browser;
    try {
        // 1. Initialize Browserbase Session & Connect Playwright
        const session = await bb.sessions.create({ browserSettings: { blockAds: true } });
        browser = await chromium.connectOverCDP(session.connectUrl);
        const page = browser.contexts()[0].pages()[0];
        page.setDefaultNavigationTimeout(45000);

        // 2. Initial Google Visit & Consent Handling
        await page.goto("https://www.google.com", { waitUntil: "networkidle" });
        try {
            const btn = await page.$('button[id="L2AGLb"], form[action*="consent"] button');
            if (btn) {
                await btn.click();
                await page.waitForTimeout(1500);
            }
        } catch {}

        let found = null,
            allResults = [];

        const cleanTarget = targetDomain.replace("www.", "").toLowerCase();

        // 3. Search Loop: Iterate through up to 5 pages of Google results
        for (let gPage = 0; gPage < 5; gPage++) {
            await page.goto(`https://www.google.com/search?q=${encodeURIComponent(keyword)}&start=${gPage * 10}&num=10&hl=en&gl=us`, { waitUntil: "networkidle" });

            // 4. Page Extraction: Retry up to 3 times if results are missing
            let pageResults = [];
            for (let retry = 0; retry < 3; retry++) {
                try {
                    await page.waitForSelector("h3", { timeout: 8000 });
                    await page.waitForTimeout(1500);
                    pageResults = await page.evaluate(() =>
                        Array.from(document.querySelectorAll("h3"))
                            .map((h3) => {
                                let a = h3.closest("a");
                                if (!a) {
                                    let p = h3.parentElement;
                                    for (let j = 0; j < 5 && p; j++, p = p.parentElement) {
                                        if (p.tagName === "A") {
                                            a = p;
                                            break;
                                        }
                                        const sub = p.querySelector("a[href]");
                                        if (sub && sub.contains(h3)) {
                                            a = sub;
                                            break;
                                        }
                                    }
                                }
                                if (!a || !a.href.startsWith("http") || a.href.includes("google.")) return null;
                                let s = "",
                                    c = a.parentElement;
                                for (let j = 0; j < 6 && j++; c = c.parentElement) {
                                    const txt = c.innerText || "";
                                    if (txt.length > h3.innerText.length + 50) {
                                        s = (txt.split("\n").find((l) => l.length > 30 && !l.includes(h3.innerText.substring(0, 20))) || "").trim().substring(0, 300);
                                        if (s) break;
                                    }
                                }
                                return { url: a.href, domain: new URL(a.href).hostname.replace("www.", ""), title: h3.innerText.trim(), snippet: s };
                            })
                            .filter(Boolean)
                    );
                    if (pageResults.length > 0) break;
                    await page.reload({ waitUntil: "networkidle" });
                } catch (err) {
                    if (retry === 2) break;
                    await page.reload({ waitUntil: "networkidle" });
                }
            }
            if (!pageResults.length) break;

            // 5. Result Synthesis: Update global results and check for target match
            for (const r of pageResults) {
                r.position = allResults.length + 1;
                allResults.push(r);
                if (!found && (r.domain.toLowerCase().includes(cleanTarget) || cleanTarget.includes(r.domain.toLowerCase()))) {
                    found = { ...r, page: gPage + 1 };
                }
            }
            if (found) break;
            await page.waitForTimeout(2000 + Math.random() * 2000);
        }

        // 6. Finalization: Close browser and extract competitors
        await browser.close();
        const competitors = allResults.filter((r) => !r.domain.toLowerCase().includes(cleanTarget) && !cleanTarget.includes(r.domain.toLowerCase())).slice(0, 10);

        return {
            success: true,
            data: {
                keyword,
                targetDomain,
                position: found?.position || null,
                page: found?.page || null,
                title: found?.title || "",
                snippet: found?.snippet || "",
                competitors,
                totalResultsScanned: allResults.length,
            },
        };
    } catch (error) {
        console.error("Rank check error:", error.message);
        if (browser) await browser.close().catch(() => {});
        return { success: false, error: error.message };
    }
}
