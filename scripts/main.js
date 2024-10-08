"use strict";
const cacheVersionKey = "version";
const cacheName = "pageCache";
const defaultLanguage = "en";
async function fetchText(url, options) {
    let response = await fetch(url, options);
    if (response.ok) {
        let text = await response.text();
        return text;
    }
    else {
        return null;
    }
}
async function fetchJson(url, options) {
    let response = await fetch(url, options);
    if (response.ok) {
        let json = await response.json();
        return json;
    }
    else {
        return null;
    }
}
async function isCacheMiss(url) {
    let cache = await caches.open(cacheName);
    let cachedPage = await cache.match(url);
    return cachedPage === undefined;
}
async function fetchTextCached(url, options) {
    let cache = await caches.open(cacheName);
    let cachedPage = await cache.match(url);
    if (cachedPage === undefined) {
        let response = await fetch(url, options);
        if (response.ok) {
            await cache.put(url, response);
            let responseCopy = await cache.match(url);
            let text = await responseCopy.text();
            return text;
        }
        else {
            return null;
        }
    }
    else {
        let text = await cachedPage.text();
        return text;
    }
}
async function fetchJsonCached(url, options) {
    let cache = await caches.open(cacheName);
    let cachedPage = await cache.match(url);
    if (cachedPage === undefined) {
        let response = await fetch(url, options);
        if (response.ok) {
            await cache.put(url, response);
            let responseCopy = await cache.match(url);
            let json = await responseCopy.json();
            return json;
        }
        else {
            return null;
        }
    }
    else {
        let json = await cachedPage.json();
        return json;
    }
}
(async () => {
    console.group("Loading version info...");
    let currentVersion = null;
    let currentVersionString = localStorage.getItem(cacheVersionKey);
    if (currentVersionString !== null) {
        currentVersion = parseInt(currentVersionString);
    }
    let versionInfo = await fetchJson("/pages/version.json");
    console.log("Latest version is " + versionInfo.version + ", current version is " + currentVersion + ".");
    if (currentVersion === null || versionInfo.version < 0 || versionInfo.version > currentVersion) {
        localStorage.setItem(cacheVersionKey, versionInfo.version.toString());
        console.log("Clearing cache...");
        await caches.delete(cacheName);
    }
    console.groupEnd();
    let scrollPaused = false;
    let scrollQueue = null;
    function scrollToElement(element) {
        if (scrollPaused) {
            scrollQueue = element;
            return;
        }
        element.classList.remove("highlight");
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("highlight");
        element.getAnimations()[0].addEventListener("finish", () => {
            element.classList.remove("highlight");
        });
    }
    function scrollToElementQueue() {
        if (scrollQueue != null) {
            scrollToElement(scrollQueue);
            scrollQueue = null;
        }
    }
    let originalTitle = document.title;
    let currentUrl = new URL(window.location.href);
    async function loadPage(scrollToTop = false) {
        console.group("Loading page...");
        let parameters = new URLSearchParams(window.location.search);
        let language = parameters.get("language");
        if (language === null) {
            language = "en";
        }
        let page = parameters.get("page");
        if (page === null) {
            page = "home";
        }
        console.log("Selected language is " + language + ".");
        console.log("Selected page is " + page + ".");
        let body = document.querySelector("body");
        async function displayMarkdown(element, data) {
            let markedInstance = new marked.Marked();
            markedInstance.use({ gfm: true });
            markedInstance.use(markedGfmHeadingId.gfmHeadingId({ prefix: "" }));
            markedInstance.use({
                walkTokens: (token) => {
                    if (token.type !== "link") {
                        return;
                    }
                    if (!token.href.startsWith("%")) {
                        return;
                    }
                    if (token.href.includes("#")) {
                        token.href = "/?page=" + token.href.substring(1, token.href.indexOf("#")) + "&language=" + language + "#" + token.href.substring(token.href.indexOf("#") + 1);
                    }
                    else {
                        token.href = "/?page=" + token.href.substring(1) + "&language=" + language;
                    }
                }
            });
            let markdown = markedInstance.parse(data);
            let sanitized = DOMPurify.sanitize(markdown);
            element.innerHTML = sanitized;
            {
                let links = element.querySelectorAll("a");
                for (let i = 0; i < links.length; i++) {
                    let element = links.item(i);
                    if (element.classList.contains("download")) {
                        continue;
                    }
                    let href = element.getAttribute("href");
                    if (href.startsWith("/")) {
                        element.addEventListener("click", (event) => {
                            event.preventDefault();
                            let url = new URL(window.location.href);
                            if (href.includes("#")) {
                                url.search = href.substring(1, href.indexOf("#"));
                                url.hash = href.substring(href.indexOf("#"));
                            }
                            else {
                                url.search = href.substring(1);
                                url.hash = "";
                            }
                            currentUrl = url;
                            history.pushState({ mode: "changePage" }, "", url);
                            loadPage(true);
                        });
                    }
                    else if (href.startsWith("#")) {
                        element.addEventListener("click", (event) => {
                            event.preventDefault();
                            let url = new URL(window.location.href);
                            url.hash = href;
                            currentUrl = url;
                            history.pushState({ mode: "jumpToElement" }, "", url);
                            let scrollElement = body.querySelector(href);
                            if (scrollElement !== null) {
                                scrollToElement(scrollElement);
                            }
                        });
                    }
                }
            }
            {
                let downloads = element.querySelectorAll("a.download");
                for (let i = 0; i < downloads.length; i++) {
                    let element = downloads.item(i);
                    let disabled = false;
                    element.addEventListener("click", (event) => {
                        if (disabled) {
                            return;
                        }
                        event.preventDefault();
                        fetch(element.href).then((response) => response.blob()).then((blob) => {
                            let url = URL.createObjectURL(blob);
                            element.href = url;
                            disabled = true;
                            element.click();
                        });
                    });
                }
            }
        }
        function getHeadings(data) {
            let markedInstance = new marked.Marked();
            markedInstance.use({ gfm: true });
            markedInstance.use(markedGfmHeadingId.gfmHeadingId({ prefix: "" }));
            markedInstance.parse(data);
            return markedGfmHeadingId.getHeadingList();
        }
        function generateTitle(data) {
            let tokens = getHeadings(data);
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
        function generateTableOfContents(data) {
            let tokens = getHeadings(data);
            let output = "";
            for (let token of tokens) {
                if (token.level <= 1) {
                    continue;
                }
                output += "\t".repeat(token.level - 2) + "* " + "[" + token.text + "]" + "(" + "#" + token.id + ")" + "\n";
            }
            return output;
        }
        async function displayPage(data) {
            await displayMarkdown(body.querySelector("#main"), data);
            await displayTableOfContents(generateTableOfContents(data));
            document.title = originalTitle + " - " + generateTitle(data);
        }
        async function displaySidebar(data) {
            await displayMarkdown(body.querySelector("#sidebar"), data);
        }
        async function displayTableOfContents(data) {
            await displayMarkdown(body.querySelector("#table-of-contents"), data);
        }
        async function markDone() {
            if (scrollToTop) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            body.classList.remove("loading");
            body.classList.add("loaded");
            if (window.location.hash.length > 0) {
                let scrollElement = body.querySelector(window.location.hash);
                if (scrollElement !== null) {
                    scrollToElement(scrollElement);
                }
            }
        }
        if (versionInfo.languages.filter(a => a.code === language).length > 0) {
            let pageData = await fetchTextCached("/pages/" + language + "/" + page + ".md");
            if (pageData !== null) {
                console.log("Downloaded page...");
                await displayPage(pageData);
                let sidebarData = await fetchTextCached("/pages/" + language + "/sidebar.md");
                if (sidebarData !== null) {
                    console.log("Downloaded sidebar...");
                    await displaySidebar(sidebarData);
                }
                else {
                    console.warn("Failed to find sidebar in language " + language + ".");
                    let sidebarDataEn = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md");
                    await displaySidebar(sidebarDataEn);
                }
                await markDone();
            }
            else {
                console.warn("Failed to find page in language " + language + ".");
                let pageDataEn = await fetchTextCached("/pages/" + defaultLanguage + "/" + page + ".md");
                if (pageDataEn !== null) {
                    console.log("Found page in default language.");
                    let pageDataErr = await fetchTextCached("/pages/" + language + "/404-untranslated-page.md");
                    await displayPage(pageDataErr);
                    let sidebarData = await fetchTextCached("/pages/" + language + "/sidebar.md");
                    if (sidebarData !== null) {
                        console.log("Downloaded sidebar...");
                        await displaySidebar(sidebarData);
                    }
                    else {
                        console.warn("Failed to find sidebar in language " + language + ".");
                        let sidebarDataEn = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md");
                        await displaySidebar(sidebarDataEn);
                    }
                    await markDone();
                }
                else {
                    console.warn("Failed to find page in default language.");
                    let pageDataErr = await fetchTextCached("/pages/" + language + "/404-not-found.md");
                    await displayPage(pageDataErr);
                    let sidebarData = await fetchTextCached("/pages/" + language + "/sidebar.md");
                    if (sidebarData !== null) {
                        console.log("Downloaded sidebar...");
                        await displaySidebar(sidebarData);
                    }
                    else {
                        console.warn("Failed to find sidebar in language " + language + ".");
                        let sidebarDataEn = await fetchTextCached("/pages/" + defaultLanguage + "/sidebar.md");
                        await displaySidebar(sidebarDataEn);
                    }
                    await markDone();
                }
            }
        }
        else {
            console.warn("Failed to find language " + language + ".");
            let pageDataErr = await fetchTextCached("/pages/" + defaultLanguage + "/404-untranslated-language.md");
            await displayPage(pageDataErr);
            await markDone();
        }
        console.groupEnd();
    }
    async function loadSettings() {
        console.group("Loading settings...");
        let body = document.querySelector("body");
        let settingsElement = body.querySelector("#settings");
        let languageElement = settingsElement.querySelector("#settings-language");
        let themeElement = settingsElement.querySelector("#settings-theme");
        for (let language of versionInfo.languages) {
            let optionElement = document.createElement("option");
            optionElement.value = language.code;
            optionElement.innerText = language.name + " (" + language.status + ")";
            languageElement.appendChild(optionElement);
        }
        languageElement.addEventListener("change", () => {
            console.log("Switching language to " + languageElement.value);
            let url = new URL(window.location.href);
            url.searchParams.set("language", languageElement.value);
            currentUrl = url;
            history.pushState({ mode: "changePage" }, "", url);
            loadPage();
        });
        let html = document.querySelector("html");
        let darkmode = html.classList.contains("darkmode");
        function updateElements() {
            if (darkmode) {
                html.classList.remove("lightmode");
                html.classList.add("darkmode");
            }
            else {
                html.classList.remove("darkmode");
                html.classList.add("lightmode");
            }
            let lightElements = html.querySelectorAll(".lightmode");
            for (let i = 0; i < lightElements.length; i++) {
                let element = lightElements.item(i);
                if (darkmode) {
                    element.classList.add("hidden");
                }
                else {
                    element.classList.remove("hidden");
                }
            }
            let darkElements = html.querySelectorAll(".darkmode");
            for (let i = 0; i < darkElements.length; i++) {
                let element = darkElements.item(i);
                if (!darkmode) {
                    element.classList.add("hidden");
                }
                else {
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
        themeElement.addEventListener("click", () => {
            darkmode = !darkmode;
            localStorage.setItem("darkmode", darkmode ? "true" : "false");
            console.log("Switching theme to " + (darkmode ? "darkmode" : "lightmode"));
            updateElements();
        });
        console.groupEnd();
    }
    async function loadDeviceSupport() {
        console.group("Loading device support...");
        let body = document.querySelector("body");
        let sidebarDropdown = body.querySelector("#sidebar-dropdown");
        let sidebarActive = false;
        sidebarDropdown.addEventListener("click", () => {
            sidebarActive = !sidebarActive;
            scrollPaused = sidebarActive;
            if (sidebarActive) {
                body.classList.add("sidebar-active");
            }
            else {
                body.classList.remove("sidebar-active");
            }
            if (!scrollPaused) {
                scrollToElementQueue();
            }
        });
        let tableOfContentsDropdown = body.querySelector("#table-of-contents-dropdown");
        let tableOfContentsActive = false;
        tableOfContentsDropdown.addEventListener("click", () => {
            tableOfContentsActive = !tableOfContentsActive;
            scrollPaused = tableOfContentsActive && window.matchMedia("(max-width: 900px)").matches;
            if (tableOfContentsActive) {
                body.classList.add("table-of-contents-active");
            }
            else {
                body.classList.remove("table-of-contents-active");
            }
            if (!scrollPaused) {
                scrollToElementQueue();
            }
        });
        console.groupEnd();
    }
    async function runBackgroundCache() {
        console.group("Starting background caching...");
        for (let file of versionInfo.files) {
            if (file.includes("{language}")) {
                for (let language of versionInfo.languages) {
                    let url = file.replace("{language}", language.code);
                    if (await isCacheMiss(url)) {
                        console.log("Caching " + url + "...");
                        await fetchTextCached(url);
                    }
                }
            }
            else {
                let url = file;
                if (await isCacheMiss(url)) {
                    console.log("Caching " + url + "...");
                    await fetchTextCached(url);
                }
            }
        }
        console.groupEnd();
    }
    window.addEventListener("popstate", (event) => {
        let url = new URL(window.location.href);
        let state = event.state;
        let testUrl = new URL(window.location.href);
        testUrl.hash = "";
        let testCurrentUrl = currentUrl;
        testCurrentUrl.hash = "";
        if (testUrl.href !== testCurrentUrl.href || !(state !== null && state.mode === "jumpToElement")) {
            loadPage();
        }
        else {
            // FIXME Chrome & Firefox are automatically scrolling to the hash element on forward/back so it isn't smooth.
            let body = document.querySelector("body");
            let scrollElement = body.querySelector(url.hash);
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
