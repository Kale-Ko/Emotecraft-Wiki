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

    return cachedPage === undefined;
}

async function fetchTextCached(url: string | URL, options?: RequestInit): Promise<string | null> {
    let cache: Cache = await caches.open(cacheName);
    let cachedPage: Response | undefined = await cache.match(url);

    if (cachedPage === undefined) {
        let response: Response = await fetch(url, options);

        if (response.ok) {
            await cache.put(url, response);

            let responseCopy: Response = await cache.match(url) as Response;
            let text: string = await responseCopy.text();
            return text;
        } else {
            return null;
        }
    } else {
        let text: string = await cachedPage.text();
        return text;
    }
}

async function fetchJsonCached(url: string | URL, options?: RequestInit): Promise<any | null> {
    let cache: Cache = await caches.open(cacheName);
    let cachedPage: Response | undefined = await cache.match(url);

    if (cachedPage === undefined) {
        let response: Response = await fetch(url, options);

        if (response.ok) {
            await cache.put(url, response);

            let responseCopy: Response = await cache.match(url) as Response;
            let json: any = await responseCopy.json();
            return json;
        } else {
            return null;
        }
    } else {
        let json: any = await cachedPage.json();
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
    if (currentVersionString !== null) {
        currentVersion = parseInt(currentVersionString);
    }

    let versionInfo: VersionInfo = await fetchJson("/pages/version.json");

    console.log("Latest version is " + versionInfo.version + ", current version is " + currentVersion + ".");

    if (currentVersion === null || versionInfo.version < 0 || versionInfo.version > currentVersion) {
        localStorage.setItem(cacheVersionKey, versionInfo.version.toString());

        console.log("Clearing cache...");

        await caches.delete(cacheName);
    }

    console.groupEnd();

    let scrollPaused = false;
    let scrollQueue: HTMLElement | null = null;

    function scrollToElement(element: HTMLElement): void {
        if (scrollPaused) {
            scrollQueue = element;
            return;
        }

        element.classList.remove("highlight");

        element.scrollIntoView({ behavior: "smooth", block: "center" });

        element.classList.add("highlight");

        element.getAnimations()[0]!!.addEventListener("finish", (): void => {
            element.classList.remove("highlight");
        });
    }

    function scrollToElementQueue(): void {
        if (scrollQueue != null) {
            scrollToElement(scrollQueue);
            scrollQueue = null;
        }
    }

    let originalTitle: string = document.title;
    let currentUrl: URL = new URL(window.location.href);

    async function loadPage(scrollToTop: boolean = false) {
        console.group("Loading page...");

        let parameters: URLSearchParams = new URLSearchParams(window.location.search);

        let language: string | null = parameters.get("language");
        if (language === null) {
            language = "en";
        }
        let page: string | null = parameters.get("page");
        if (page === null) {
            page = "home";
        }

        console.log("Selected language is " + language + ".");
        console.log("Selected page is " + page + ".");

        let body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;

        async function displayMarkdown(element: HTMLElement, data: string): Promise<void> {
            let markedInstance = new marked.Marked();
            markedInstance.use({ gfm: true });
            markedInstance.use(markedGfmHeadingId.gfmHeadingId({ prefix: "" }));
            markedInstance.use({
                walkTokens: (token: any): void => {
                    if (token.type !== "link") {
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

            let markdown: string = markedInstance.parse(data);
            let sanitized: string = DOMPurify.sanitize(markdown);
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

                            let url: URL = new URL(window.location.href);
                            if (href.includes("#")) {
                                url.search = href.substring(1, href.indexOf("#"));
                                url.hash = href.substring(href.indexOf("#"));
                            } else {
                                url.search = href.substring(1);
                                url.hash = "";
                            }

                            currentUrl = url;
                            history.pushState({ mode: "changePage" }, "", url);

                            loadPage(true);
                        });
                    } else if (href.startsWith("#")) {
                        element.addEventListener("click", (event: MouseEvent): void => {
                            event.preventDefault();

                            let url: URL = new URL(window.location.href);
                            url.hash = href;

                            currentUrl = url;
                            history.pushState({ mode: "jumpToElement" }, "", url);

                            let scrollElement: HTMLElement | null = body.querySelector(href);
                            if (scrollElement !== null) {
                                scrollToElement(scrollElement);
                            }
                        });
                    }
                }
            }

            {
                let downloads: NodeListOf<HTMLAnchorElement> = element.querySelectorAll("a.download");

                for (let i = 0; i < downloads.length; i++) {
                    let element: HTMLAnchorElement = downloads.item(i);

                    let disabled: boolean = false;

                    element.addEventListener("click", (event: MouseEvent): void => {
                        if (disabled) {
                            return;
                        }

                        event.preventDefault();

                        fetch(element.href).then((response: Response): Promise<Blob> => response.blob()).then((blob: Blob): void => {
                            let url: string = URL.createObjectURL(blob);

                            element.href = url;

                            disabled = true;
                            element.click();
                        });
                    });
                }
            }
        }

        function getHeadings(data: string): any[] {
            let markedInstance = new marked.Marked();
            markedInstance.use({ gfm: true });
            markedInstance.use(markedGfmHeadingId.gfmHeadingId({ prefix: "" }));
            markedInstance.parse(data);

            return markedGfmHeadingId.getHeadingList();
        }

        function generateTitle(data: string): string {
            let tokens: any[] = getHeadings(data);

            for (let token of tokens) {
                if (token.level === 1 && token.text !== originalTitle) {
                    break;
                }
                if (token.level !== 2) {
                    continue;
                }

                return token.text;
            }

            return "Unknown";
        }

        function generateTableOfContents(data: string): string {
            let tokens: any[] = getHeadings(data);

            let output: string = "";

            for (let token of tokens) {
                if (token.level <= 1) {
                    continue;
                }

                output += "\t".repeat(token.level - 2) + "* " + "[" + token.text + "]" + "(" + "#" + token.id + ")" + "\n";
            }

            return output;
        }

        async function displayPage(data: string): Promise<void> {
            await displayMarkdown(body.querySelector("#main") as HTMLElement, data);

            await displayTableOfContents(generateTableOfContents(data));

            document.title = originalTitle + " - " + generateTitle(data);
        }

        async function displaySidebar(data: string): Promise<void> {
            await displayMarkdown(body.querySelector("#sidebar") as HTMLElement, data);
        }

        async function displayTableOfContents(data: string): Promise<void> {
            await displayMarkdown(body.querySelector("#table-of-contents") as HTMLElement, data);
        }

        async function markDone(): Promise<void> {
            if (scrollToTop) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }

            body.classList.remove("loading");
            body.classList.add("loaded");

            if (window.location.hash.length > 0) {
                let scrollElement: HTMLElement | null = body.querySelector(window.location.hash);
                if (scrollElement !== null) {
                    scrollToElement(scrollElement);
                }
            }
        }

        if (versionInfo.languages.filter(a => a.code === language).length > 0) {
            let pageData: string | null = await fetchTextCached("/pages/" + language + "/" + page + ".md");

            if (pageData !== null) {
                console.log("Downloaded page...");

                await displayPage(pageData);

                let sidebarData: string | null = await fetchTextCached("/pages/" + language + "/sidebar.md");
                if (sidebarData !== null) {
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
                if (pageDataEn !== null) {
                    console.log("Found page in default language.");

                    let pageDataErr: string = await fetchTextCached("/pages/" + language + "/404-untranslated-page.md") as string;
                    await displayPage(pageDataErr);

                    let sidebarData: string | null = await fetchTextCached("/pages/" + language + "/sidebar.md");
                    if (sidebarData !== null) {
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
                    if (sidebarData !== null) {
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

    async function loadSettings(): Promise<void> {
        console.group("Loading settings...");

        let body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;

        let settingsElement: HTMLDivElement = body.querySelector("#settings") as HTMLDivElement;

        let languageElement: HTMLSelectElement = settingsElement.querySelector("#settings-language") as HTMLSelectElement;
        let themeElement: HTMLButtonElement = settingsElement.querySelector("#settings-theme") as HTMLButtonElement;

        for (let language of versionInfo.languages) {
            let optionElement: HTMLOptionElement = document.createElement("option") as HTMLOptionElement;
            optionElement.value = language.code;
            optionElement.innerText = language.name + " (" + language.status + ")";
            languageElement.appendChild(optionElement);
        }

        languageElement.addEventListener("change", (): void => {
            console.log("Switching language to " + languageElement.value);

            let url: URL = new URL(window.location.href);
            url.searchParams.set("language", languageElement.value);

            currentUrl = url;
            history.pushState({ mode: "changePage" }, "", url);

            loadPage();
        });

        let html: HTMLHtmlElement = document.querySelector("html") as HTMLHtmlElement;
        let darkmode: boolean = html.classList.contains("darkmode");

        function updateElements(): void {
            if (darkmode) {
                html.classList.remove("lightmode");
                html.classList.add("darkmode");
            } else {
                html.classList.remove("darkmode");
                html.classList.add("lightmode");
            }

            let lightElements: NodeListOf<HTMLElement> = html.querySelectorAll(".lightmode");
            for (let i = 0; i < lightElements.length; i++) {
                let element: HTMLElement = lightElements.item(i);

                if (darkmode) {
                    element.classList.add("hidden");
                } else {
                    element.classList.remove("hidden");
                }
            }

            let darkElements: NodeListOf<HTMLElement> = html.querySelectorAll(".darkmode");
            for (let i = 0; i < darkElements.length; i++) {
                let element: HTMLElement = darkElements.item(i);

                if (!darkmode) {
                    element.classList.add("hidden");
                } else {
                    element.classList.remove("hidden");
                }
            }
        }

        if (localStorage.getItem("darkmode") !== null) {
            darkmode = localStorage.getItem("darkmode") == "true";

            updateElements();
        }

        localStorage.setItem("darkmode", (darkmode ? "true" : "false"));

        console.log("Theme is " + (darkmode ? "darkmode" : "lightmode"));

        themeElement.addEventListener("click", (): void => {
            darkmode = !darkmode;

            localStorage.setItem("darkmode", darkmode ? "true" : "false");

            console.log("Switching theme to " + (darkmode ? "darkmode" : "lightmode"));

            updateElements();
        });

        console.groupEnd();
    }

    async function loadDeviceSupport(): Promise<void> {
        console.group("Loading device support...");

        let body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;

        let sidebarDropdown = body.querySelector("#sidebar-dropdown")!!;

        let sidebarActive = false;
        sidebarDropdown.addEventListener("click", (): void => {
            sidebarActive = !sidebarActive;
            scrollPaused = sidebarActive;

            if (sidebarActive) {
                body.classList.add("sidebar-active");
            } else {
                body.classList.remove("sidebar-active");
            }

            if (!scrollPaused) {
                scrollToElementQueue();
            }
        });

        let tableOfContentsDropdown = body.querySelector("#table-of-contents-dropdown")!!;

        let tableOfContentsActive = false;
        tableOfContentsDropdown.addEventListener("click", (): void => {
            tableOfContentsActive = !tableOfContentsActive;
            scrollPaused = tableOfContentsActive && window.matchMedia("(max-width: 900px)").matches;

            if (tableOfContentsActive) {
                body.classList.add("table-of-contents-active");
            } else {
                body.classList.remove("table-of-contents-active");
            }

            if (!scrollPaused) {
                scrollToElementQueue();
            }
        });

        console.groupEnd();
    }

    async function runBackgroundCache(): Promise<void> {
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

    window.addEventListener("popstate", (event: PopStateEvent): void => {
        let url: URL = new URL(window.location.href);
        let state = event.state;

        let testUrl: URL = new URL(window.location.href);
        testUrl.hash = "";
        let testCurrentUrl: URL = currentUrl;
        testCurrentUrl.hash = "";

        if (testUrl.href !== testCurrentUrl.href || !(state !== null && state.mode === "jumpToElement")) {
            loadPage();
        } else {
            // FIXME Chrome & Firefox are automatically scrolling to the hash element on forward/back so it isn't smooth.

            let body: HTMLBodyElement = document.querySelector("body") as HTMLBodyElement;

            let scrollElement: HTMLElement | null = body.querySelector(url.hash);
            if (scrollElement !== null) {
                scrollToElement(scrollElement);
            }
        }
    });

    await loadSettings();
    await loadDeviceSupport();
    await loadPage();

    if (versionInfo.version >= 0) {
        runBackgroundCache();
    }
})();