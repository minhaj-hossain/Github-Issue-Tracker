// get the input field value from the login page
const userName = document.getElementById("user-name");
const password = document.getElementById("password");


// get  element from the main page
const issueCardContainer = document.getElementById("issue-card-container");
const quantityOfIssues = document.getElementById("quantity-of-issues");
const spinnerSection = document.getElementById("spinner-section");

// login function
function loadPage() {

    if (userName.value === "admin" && password.value === "admin123") {
        window.location.href = "main.html";
    } else {
        return;
    }

}

function showSpinner() {
    spinnerSection.classList.remove("hidden");
}

function hideSpinner() {
    spinnerSection.classList.add("hidden");
}


async function loadIssues() {

    showSpinner();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    hideSpinner();
    displayIssues(data.data)
    displayQuantityOfIssues(data.data);
}

// quantity counter
function displayQuantityOfIssues(issues) {
    quantityOfIssues.innerText = issues.length;
}

// function to display All issues on the main page
function displayIssues(issues) {

    issueCardContainer.innerHTML = "";
    issues.forEach(element => {

        // console.log(element);

        const div = document.createElement("div");

        // div.classList.add("h-full rounded-b-lg bg-white shadow-sm  rounded-t-lg border-t-4 `${element.status.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}`");

        div.innerHTML = `

        <div class="h-full rounded-b-lg bg-white shadow-sm  rounded-t-lg border-t-4 ${element.status.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}">
         
                    <!-- upper section of the card -->
                    <div class="p-4 space-y-4 border-b border-b-[#e4e4e7]">

                        <!-- cards badge and status icon -->
                        <div class="flex justify-between">
                            <div>
                                <img src="./assets/${element.status.toLowerCase() ? element.status.toLowerCase() : 'default'}-Status.png" alt="">
                            </div>
                            <div
                                class=" ${element.priority === 'high'
                ? 'badge badge-soft badge-primary bg-[#feecec] text-[#ef4444] font-medium text-[12px] px-5 rounded-full'// If High
                : element.priority === 'medium'
                    ? 'badge badge-soft badge-primary bg-[#fff6d1] text-[#f59e0b] font-medium text-[12px] px-5 rounded-full' // If Medium
                : 'badge badge-soft badge-primary bg-[#eeeff2] text-[#9ca3af] font-medium text-[12px] px-5 rounded-full' // If Low (Everything else)
            }">
                                ${element.priority ? element.priority : 'No priority available'}</div>
                        </div>

                        <!-- card text and badge  -->
                        <div class="space-y-3">

                            <!-- card text  -->
                            <div class="space-y-2">
                                <h3 class="title font-semibold text-[14px]">${element.title ? element.title : 'No title available'}</h3>
                                <p class="Description text-[#64748b] line-clamp-2 text-[12px]">${element.description ? element.description : 'No description available'}</p>
                            </div>

                            <!-- badge under text  -->
                            <div class="flex gap-1">

                                <div
                                    class="badge badge-soft badge-primary bg-[#feecec] flex items-center text-[#ef4444] font-medium px-1 uppercase rounded-full w-fit border border-[#fecaca]">
                                    <i class="fa-solid fa-bug"></i>Bug
                                </div>

                                <div
                                    class="badge badge-soft badge-primary bg-[#fff8db] flex items-center text-[#ef4444] font-medium px-1 uppercase text-[12px] rounded-full w-fit border border-[#fde68a]">
                                    <i class="fa-solid fa-bug"></i>help wanted
                                </div>
                            </div>
                        </div>
                    </div>


                    <!-- lower section of card -->
                    <div class="p-4 text-[12px] text-[#64748b] space-y-1 bg-white">

                        <p class="">#1
                            by ${element.author || 'Unknown Author'}</p>
                        <p>${element.createdAt || 'No date available'}</p>

                    </div>
                </div>
                
        `
        issueCardContainer.appendChild(div);

    });

}



loadIssues();






