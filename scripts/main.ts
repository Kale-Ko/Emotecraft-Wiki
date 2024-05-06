const cacheVersionKey: string = "version";
const cacheName: string = "pageCache";

const defaultLanguage: string = "en";

declare const marked: any;
declare const markedGfmHeadingId: any;
declare const DOMPurify: any;

async function fetchText(url: string | URL, options?: RequestInit): Promise<string | null> {
    let response: Response = await fetch(url, options);

    if (response.ok) {
        let text: string = await response.text();
        return text;
    } else {
        return null;
    }
}

async function fetchJson(url: string | URL, options?: RequestInit): Promise<any | null> {
    let response: Response = await fetch(url, options);

    if (response.ok) {
        let json: any = await response.json();
        return json;
    } else {
        return null;
    }
}

async function isCacheMiss(url: string | URL): Promise<boolean> {
    let cache: Cache = await caches.open(cacheName);
    let cachedPage: Response | undefined = await cache.match(url);

    return cachedPage == undefined;
}

async function fetchTextCached(url: string | URL, options?: RequestInit): Promise<string | null> {
    let cache: Cache = await caches.open(cacheName);
    let cachedPage: Response | undefined = await cache.match(url);

    if (cachedPage == undefined) {
        let response: Response = await fetch(url, options);

        if (response.ok) {
            await cache.put(url, response);

            let responseCopy: Response = await cache.match(url) as Response;
            let text: string = await responseCopy.text()
            return text;
        } else {
            return null;
        }
    } else {
        let text: string = await cachedPage.text()
        return text;
    }
}

async function fetchJsonCached(url: string | URL, options?: RequestInit): Promise<any | null> {
    let cache: Cache = await caches.open(cacheName);
    let cachedPage: Response | undefined = await cache.match(url);

    if (cachedPage == undefined) {
        let response: Response = await fetch(url, options);

        if (response.ok) {
            await cache.put(url, response);

            let responseCopy: Response = await cache.match(url) as Response;
            let json: any = await responseCopy.json()
            return json;
        } else {
            return null;
        }
    } else {
        let json: any = await cachedPage.json()
        return json;
    }
}

interface Language {
    code: string,
    name: string,
    status: string
}

interface VersionInfo {
    version: number,
    languages: Language[],
    files: string[]
}

(async () => {
    console.group("Loading version info...");

    let currentVersion: number | null = null;
    let currentVersionString: string | null = localStorage.getItem(cacheVersionKey);
    if (currentVersionString != null) {
        currentVersion = parseInt(currentVersionString);
    }

    let versionInfo: VersionInfo = await fetchJson("/pages/version.json");

    console.log("Latest version is " + versionInfo.version + ", current version is " + currentVersion + ".");

    if (currentVersion == null || versionInfo.version > currentVersion) {
        localStorage.setItem(cacheVersionKey, versionInfo.version.toString());

        console.log("Clearing cache...");

        await caches.delete(cacheName);
    }

    console.groupEnd();

    async function loadPage() {
        console.group("Loading page...");

        let parameters: URLSearchParams = new URLSearchParams(window.location.search);

        let language: string | null = parameters.get("language");
        if (language == null) {
            language = "en";
        }
        let page: string | null = parameters.get("page");
        if (page == null) {
            page = "home";
        }

        console.log("Selected language is " + language + ".");
        console.log("Selected page is " + page + ".");

        async function displayMarkdown(element: HTMLElement, data: string): Promise<void> {
            marked.use({ gfm: true });
            marked.use(markedGfmHeadingId.gfmHeadingId({ prefix: "" }));
            marked.use({
                walkTokens: (token: any): void => {
                    if (token.type != "link") {
                        return;
                    }
                    if (!token.href.startsWith("%")) {
                        return;
                    }

                    if (token.href.includes("#")) {
                        token.href = "/?page=" + token.href.substring(1, token.href.indexOf("#")) + "&language=" + language + "#" + token.href.substring(token.href.indexOf("#") + 1);
                    } else {
                        token.href = "/?page=" + token.href.substring(1) + "&language=" + language;
                    }
                }
            });

            let markdown = marked.parse(data);
            let sanitized = DOMPurify.sanitize(markdown);
            element.innerHTML = sanitized;

            {
                let links: NodeListOf<HTMLAnchorElement> = element.querySelectorAll("a");

                for (let i = 0; i < links.length; i++) {
                    let element: HTMLAnchorElement = links.item(i);

                    if (element.classList.contains("download")) {
                        continue;
                    }

                    let href: string = element.getAttribute("href")!!;

                    if (href.startsWith("/")) {
                        element.addEventListener("click", (event: MouseEvent): void => {
                            event.preventDefault();

                            history.pushState(null, "", href);

                            loadPage();
                        });
                    }
                }
            }

            {
                let downloads: NodeListOf<HTMLAnchorElement> = element.querySelectorAll("a.download");

                for (let i = 0; i < downloads.length; i++) {
                    let element: HTMLAnchorElement = downloads.item(i);

                    let disabled = false;

                    element.addEventListener("click", (event: MouseEvent): void => {
                        if (disabled) {
                            return;
                        }

                        event.preventDefault();

                        fetch(element.href).then((response: Response): Promise<Blob> => response.blob()).then((blob: Blob): void => {
                            let url = URL.createObjectURL(blob);

                            element.href = url;

                            disabled = true;
                            element.click();
                        })
                    });
                }
            }
        }

        async function displayPage(data: string): Promise<void> {
            await displayMarkdown(document.querySelector("#main") as HTMLElement, data);
        }

        async function displaySidebar(data: string): Promise<void> {
            await displayMarkdown(document.querySelector("#sidebar") as HTMLElement, data);
        }

        async function markDone(): Promise<void> {
            await document.fonts.load("1ex Roboto Slab"); // Prevent flicker

            let body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;
            body.classList.remove("loading");
            body.classList.add("loaded");
        }

        if (versionInfo.languages.filter(a => a.code == language).length > 0) {
            let pageData: string | null = await fetchTextCached("/pages/" + language + "/" + page + ".md");

            if (pageData != null) {
                console.log("Downloaded page...");

                await displayPage(pageData);

                let sidebarData: string | null = await fetchTextCached("/pages/" + language + "/sidebar.md");
                if (sidebarData != null) {
                    console.log("Downloaded sidebar...");

                    await displaySidebar(sidebarData);
                } else {
                    console.warn("Failed to find sidebar in language " + language + ".");

                    let sidebarDataEn: string = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md") as string;
                    await displaySidebar(sidebarDataEn);
                }

                await markDone();
            } else {
                console.warn("Failed to find page in language " + language + ".");

                let pageDataEn: string | null = await fetchTextCached("/pages/" + defaultLanguage + "/" + page + ".md");
                if (pageDataEn != null) {
                    console.log("Found page in default language.");

                    let pageDataErr: string = await fetchTextCached("/pages/" + language + "/404-untranslated-page.md") as string;
                    await displayPage(pageDataErr);

                    let sidebarData: string | null = await fetchTextCached("/pages/" + language + "/sidebar.md");
                    if (sidebarData != null) {
                        console.log("Downloaded sidebar...");

                        await displaySidebar(sidebarData);
                    } else {
                        console.warn("Failed to find sidebar in language " + language + ".");

                        let sidebarDataEn: string = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md") as string;
                        await displaySidebar(sidebarDataEn);
                    }

                    await markDone();
                } else {
                    console.warn("Failed to find page in default language.");

                    let pageDataErr: string = await fetchTextCached("/pages/" + language + "/404-not-found.md") as string;
                    await displayPage(pageDataErr);

                    let sidebarData: string | null = await fetchTextCached("/pages/" + language + "/sidebar.md");
                    if (sidebarData != null) {
                        console.log("Downloaded sidebar...");

                        await displaySidebar(sidebarData);
                    } else {
                        console.warn("Failed to find sidebar in language " + language + ".");

                        let sidebarDataEn: string = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md") as string;
                        await displaySidebar(sidebarDataEn);
                    }

                    await markDone();
                }
            }
        } else {
            console.warn("Failed to find language " + language + ".");

            let pageDataErr: string = await fetchTextCached("/pages/" + defaultLanguage + "/404-untranslated-language.md") as string;
            await displayPage(pageDataErr);

            await markDone();
        }

        console.groupEnd();
    }

    async function loadSettings() {
        console.group("Loading settings...");

        let settingsElement = document.querySelector("#settings") as HTMLDivElement;

        let languageElement = settingsElement.querySelector("#settings-language") as HTMLSelectElement;
        let themeElement = settingsElement.querySelector("#settings-theme") as HTMLButtonElement;

        for (let language of versionInfo.languages) {
            let optionElement = document.createElement("option");
            optionElement.value = language.code;
            optionElement.innerText = language.name + " (" + language.status + ")";
            languageElement.appendChild(optionElement);
        }

        languageElement.addEventListener("change", (): void => {
            console.log("Switching language to " + languageElement.value);

            let url: URL = new URL(window.location.href);
            url.searchParams.set("language", languageElement.value);
            window.location.replace(url);
        });

        let html = document.querySelector("html") as HTMLElement;
        let darkmode = html.classList.contains("darkmode");

        if (localStorage.getItem("darkmode") != null) {
            darkmode = localStorage.getItem("darkmode") == "true";

            if (darkmode) {
                html.classList.remove("lightmode")
                html.classList.add("darkmode")
            } else {
                html.classList.remove("darkmode");
                html.classList.add("lightmode");
            }
        }

        localStorage.setItem("darkmode", darkmode ? "true" : "false");

        console.log("Theme is " + (darkmode ? "darkmode" : "lightmode"));

        themeElement.addEventListener("click", (): void => {
            darkmode = !darkmode;

            if (darkmode) {
                html.classList.remove("lightmode")
                html.classList.add("darkmode")
            } else {
                html.classList.remove("darkmode");
                html.classList.add("lightmode");
            }

            localStorage.setItem("darkmode", darkmode ? "true" : "false");

            console.log("Switching theme to " + (darkmode ? "darkmode" : "lightmode"));
        });

        console.groupEnd();
    }

    async function runBackgroundCache() {
        console.group("Starting background caching...");

        for (let file of versionInfo.files) {
            if (file.includes("{language}")) {
                for (let language of versionInfo.languages) {
                    let url: string = file.replace("{language}", language.code);

                    if (await isCacheMiss(url)) {
                        console.log("Caching " + url + "...");

                        await fetchTextCached(url);
                    }
                }
            } else {
                let url: string = file;

                if (await isCacheMiss(url)) {
                    console.log("Caching " + url + "...");

                    await fetchTextCached(url);
                }
            }
        }

        console.groupEnd();
    }

    window.addEventListener("popstate", (): void => {
        loadPage();
    });

    await loadSettings();
    await loadPage();
    runBackgroundCache();
})();