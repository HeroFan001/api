let page = 1;
let queryString = "";

function handleSubmit(e) {
  e.preventDefault();
  queryString = document.querySelector("#queryString").value;
  console.log(queryString);
  let queryUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&page=page&query=${queryString}`;
  getData(queryUrl, renderCards);
  console.log(getData);
}

function renderCards(data) {
  console.log(data);
  const container = document.querySelector(".cards")
  container.innerHTML = ""
  data.results.forEach((obj) => {
    container.innerHTML += createCard(obj);
  });
}

function createCard(obj) {
  return `
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="smallimg rounded-t-lg" src="${obj.urls.small}" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-m font-bold tracking-tight text-gray-900 dark:text-white">${obj.alt_description  }</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>
        <button popovertarget="mypopover-${obj.id}" href="#" class="inline-flex items-center px-3 py-2 text-sm font-sm text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>
        <div class="popoverContent" id="mypopover-${obj.id}" popover>
        <h3>${obj.likes}</h3>
          <img class="popoverImage" src="${obj.urls.full}" alt="">
          <p>${obj.description || obj.alt_description}</p>
        </div>
          
</div>

`;
}

function setPage(op){
  console.log(op)
  if(op=='-'){
    if(page==1) return
    page = page-1
  }else page = page+1
  let queryUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&page=${page}&query=${queryString}`;
  getData(queryUrl, renderCards);
  console.log(page)
}