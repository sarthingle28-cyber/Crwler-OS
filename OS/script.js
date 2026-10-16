let pages = [];


// ==========================================
// LOAD CRWLER INDEX
// ==========================================

async function loadPages() {

    try {

        const response = await fetch("../data/pages.json");

        if (!response.ok) {
            throw new Error("Could not load pages.json");
        }

        pages = await response.json();

        console.log("Crwler Index loaded.");

    } catch (error) {

        console.error(
            "Could not load Crwler Index:",
            error
        );

    }
}


// ==========================================
// LAUNCHER
// ==========================================

function toggleLauncher() {

    const launcher =
        document.getElementById("launcher");


    if (launcher.style.display === "block") {

        launcher.style.display = "none";

    } else {

        launcher.style.display = "block";

    }
}


// ==========================================
// OPEN APP
// ==========================================

function openApp(app) {

    const windowElement =
        document.getElementById(
            app + "Window"
        );


    if (!windowElement) {
        return;
    }


    windowElement.style.display = "block";


    // Close launcher
    document.getElementById(
        "launcher"
    ).style.display = "none";
}


// ==========================================
// CLOSE APP
// ==========================================

function closeApp(app) {

    const windowElement =
        document.getElementById(
            app + "Window"
        );


    if (!windowElement) {
        return;
    }


    windowElement.style.display = "none";
}


// ==========================================
// PERFORM SEARCH
// ==========================================

function performSearch() {

    const input =
        document.getElementById(
            "searchInput"
        );


    const results =
        document.getElementById(
            "searchResults"
        );


    const query =
        input.value
            .trim()
            .toLowerCase();


    results.innerHTML = "";


    if (query === "") {
        return;
    }


    // ======================================
    // SEARCH INDEX
    // ======================================

    const matches = pages.filter(page => {

        const searchableText = [

            page.name,

            page.type,

            page.status,

            page.location,

            page.description,

            ...(page.keywords || [])

        ]
        .join(" ")
        .toLowerCase();


        return searchableText.includes(query);

    });


    // ======================================
    // NO RESULTS
    // ======================================

    if (matches.length === 0) {

        const message =
            document.createElement("div");


        message.className =
            "no-results";


        message.textContent =
            `No Crwler results found for "${query}".`;


        results.appendChild(message);

        return;
    }


    // ======================================
    // DISPLAY RESULTS
    // ======================================

    matches.forEach(page => {

        const result =
            document.createElement("div");


        result.className =
            "search-result";


        const title =
            document.createElement("h3");


        title.textContent =
            page.name;


        const description =
            document.createElement("p");


        description.textContent =
            page.description;


        const meta =
            document.createElement("div");


        meta.className = "meta";


        meta.textContent =
            `Type: ${page.type} | Status: ${page.status}`;


        const location =
            document.createElement("div");


        location.className =
            "location";


        location.textContent =
            `Location: ${page.location}`;


        result.appendChild(title);

        result.appendChild(description);

        result.appendChild(meta);

        result.appendChild(location);


        results.appendChild(result);

    });

}


// ==========================================
// ENTER KEY SEARCH
// ==========================================

document
    .getElementById("searchInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );


// ==========================================
// SHUTDOWN
// ==========================================

function shutdown() {

    const desktop =
        document.querySelector(".desktop");


    desktop.innerHTML = `

        <div style="
            height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            flex-direction:column;
            background:#000;
            color:white;
        ">

            <h1>Crwler OS</h1>

            <p>
                System shut down.
            </p>

            <button
                onclick="location.reload()"
                style="
                    padding:10px 20px;
                    border:none;
                    border-radius:6px;
                    cursor:pointer;
                "
            >
                Restart
            </button>

        </div>

    `;
}


// ==========================================
// CLOCK
// ==========================================

function updateClock() {

    const clock =
        document.getElementById("clock");


    const now =
        new Date();


    const hours =
        String(now.getHours())
            .padStart(2, "0");


    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");


    clock.textContent =
        `${hours}:${minutes}`;
}


setInterval(
    updateClock,
    1000
);


updateClock();


// ==========================================
// START CRWLER OS
// ==========================================

loadPages();