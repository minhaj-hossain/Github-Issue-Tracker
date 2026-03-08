// get the input field value from the login page
const userName = document.getElementById("user-name");
const password = document.getElementById("password");


// get  element from the main page
const issueCardContainer = document.getElementById("issue-card-container");
const quantityOfIssues = document.getElementById("quantity-of-issues");
const spinnerSection = document.getElementById("spinner-section");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const issueCardModal = document.getElementById("issue-card-modal");
const tabBtns = document.querySelectorAll(".tab-btn button");
const modalInner = document.getElementById('modal-inner')

const labals = document.getElementById('lebels');




console.log(labals)

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


// search functionality
searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    showSpinner();
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`);
    const data = await response.json();
    hideSpinner();

    displayIssues(data.data)
    displayQuantityOfIssues(data.data);

    searchInput.value = "";
})

async function loadIssues() {

    showSpinner();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();

    hideSpinner();
    displayIssues(data.data)
    displayQuantityOfIssues(data.data);
    filterIssuesByStatus(data.data);
}

async function openModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json();

    const issue = data.data;

    console.log(issue)
    // console.log(modalInner)

    modalInner.innerHTML = '';

    modalInner.innerHTML = `
    
            <!-- modal header  -->
                        <div class="space-y-2">
                            <h1 class="font-bold text-2xl">${issue.title ? issue.title : 'title not found'} </h1>
                            <div class="flex space-x-2 items-center">
                                <div class="badge badge-accent bg-[#00a96e] text-white">${issue.status}</div>
                                <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
                                <p class="text-[12px] text-[#64748b]">Opened by Fahim Ahmed</p>
                                <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
                                <p class="text-[12px] text-[#64748b]">22/02/2026</p>
                            </div>
                        </div>

                        <!-- modal badge  -->
                        <div class="flex flex-wrap space-x-2">

                                <div
                                    class="badge badge-soft badge-primary bg-[#feecec] flex items-center text-[#ef4444] ${!issue.labels[0] ? 'hidden' : ''} font-medium px-1 uppercase rounded-full w-fit border border-[#fecaca]">
                                    <i class="fa-solid fa-bug"></i>${issue.labels[0]}
                                </div>

                                <div
                                    class="badge badge-soft badge-primary bg-[#fff8db] flex items-center text-[#ef4444] font-medium px-1 uppercase ${!issue.labels[1] ? 'hidden' : ''} rounded-full w-fit border border-[#fde68a]">
                                    <i class="fa-solid fa-bug"></i>${issue.labels[1]} 
                                </div>
                            </div>
                        </div>

                        <!-- description -->
                         <p class="text-[#64748b] line-clamp-2">${issue.description}</p>


                         <!-- assignee info -->

                         <div class="flex bg-[#f8fafc] rounded-lg p-4">
                            <div class="flex-1">
                                <p class="text-[#64748b]">Assignee:</p>
                                <strong>${issue.assignee}</strong>
                            </div>

                            <div class="flex-1">

                                <p class="text-[#64748b]">Priority:</p>

                                <div class="badge badge-accent">${issue.priority}</div>

                            </div>

                         </div>
    
    `




    issueCardModal.showModal();
}

// quantity counter
function displayQuantityOfIssues(issues) {
    quantityOfIssues.innerText = issues.length;
}

async function btnSelector(id) {

    tabBtns.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    })

    const selectedBtn = document.getElementById(id);
    selectedBtn.classList.remove("btn-outline");
    selectedBtn.classList.add("btn-primary");


    showSpinner();
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    hideSpinner()

    // console.log(selectedBtn.innerText.toLocaleLowerCase())

    if (selectedBtn.innerText.toLocaleLowerCase() === 'all') {

        displayIssues(data.data);
        displayQuantityOfIssues(data.data);
    } else if (selectedBtn.innerText.toLocaleLowerCase() === 'open') {

        const openIssues = data.data.filter(elem => {
            return elem.status.toLowerCase() === selectedBtn.innerText.toLocaleLowerCase();
        });

        displayIssues(openIssues);
        displayQuantityOfIssues(openIssues)
    } else {

        const closedIssues = data.data.filter(elem => {
            return elem.status.toLowerCase() === selectedBtn.innerText.toLocaleLowerCase();
        });

        displayIssues(closedIssues);
        displayQuantityOfIssues(closedIssues)
    }


}



// function to display All issues on the main page
function displayIssues(issues) {

    issueCardContainer.innerHTML = "";
    issues.forEach(element => {

        // console.log(element);

        const div = document.createElement("div");

        div.innerHTML = `

        <div class="h-full rounded-b-lg bg-white shadow-sm  rounded-t-lg border-t-4 ${element.status.toLowerCase() === 'open' ? 'border-green-500' : 'border-purple-500'}">
         
                    <!-- upper section of the card -->
                    <div onclick="openModal(${element.id})" class="p-4 space-y-4 border-b border-b-[#e4e4e7]">

                        <!-- cards badge and status icon -->
                        <div class="flex justify-between">
                            <div>
                                <img src="./assets/${element.status.toLowerCase() ? element.status.toLowerCase() : 'default'}-Status.png" alt="">
                            </div>
                            <div
                                class=" ${element.priority === 'high'
                ? 'badge badge-soft badge-primary bg-[#feecec] text-[#ef4444] font-medium text-[12px] px-5 rounded-full'
                : element.priority === 'medium'
                    ? 'badge badge-soft badge-primary bg-[#fff6d1] text-[#f59e0b] font-medium text-[12px] px-5 rounded-full'
                    : 'badge badge-soft badge-primary bg-[#eeeff2] text-[#9ca3af] font-medium text-[12px] px-5 rounded-full'
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
                            <div class="flex flex-wrap gap-1" id="lebels">

                            

                                <div
                                    class="badge badge-soft badge-primary bg-[#feecec] flex items-center text-[#ef4444] ${!element.labels[0] ? 'hidden' : ''} font-medium px-1 uppercase rounded-full w-fit border border-[#fecaca]">
                                    <i class="fa-solid fa-bug"></i>${element.labels[0]}
                                </div>

                                <div
                                    class="badge badge-soft badge-primary bg-[#fff8db] flex items-center text-[#ef4444] font-medium px-1 uppercase ${!element.labels[1] ? 'hidden' : ''} rounded-full w-fit border border-[#fde68a]">
                                    <i class="fa-solid fa-bug"></i>${element.labels[1]} 
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






