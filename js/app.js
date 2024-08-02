//Let's Discuss
const allPostLoadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();
  discussFunctionality(data.posts);
};

function discussFunctionality(posts) {
  const postSection = document.getElementById("posts");
  // Spinner
  let spinner = true;
  let spinnerOn = false;

  postSection.innerHTML = "";

  //Validate Data
  if (!posts.length) {
    postSection.innerHTML = `
    <div
        class="flex flex-col justify-center items-center space-y-4 text-center"
      >
        <img class="size-96" src="./images/corrupted-file.png" alt="" />
        <p class="text-[##100F0F] text-xl md:text-3xl lg:text-5xl font-bold">
          Oops!! Sorry, There is no posts<br />
         available on this search.
        </p>
      </div>
    `;
    spinner = false;
  }
  //Spinner On
  if (!!spinner) {
    postSection.innerHTML = `
    <div id="loading-spinner" class="flex justify-center">
  <div role="status" class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
  <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
      <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
      </svg>
  </div>
  <div class="w-full">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
  </div>
  <span class="sr-only">Loading...</span>
  </div>
        </div>
    `;
    spinnerOn = true;
  }
  //Lopping on post
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className =
      "flex flex-col md:flex-row gap-6 p-10 bg-[#797DFC1A] rounded-3xl mb-6";
    setTimeout(() => {
      div.innerHTML = `
        <!-- Author -->
              <div class="relative">
                <img
                  class="size-[74px] rounded-2xl"
                  src="${post?.image || "Not Available"}"
                  alt=""
                />
                <span
                  class="absolute top-0 left-14 transform -translate-y-1/4 size-[18.667px] ${
                    post?.isActive ? "bg-[#1eda9b]" : "bg-[#f31f1f]"
                  } rounded-full"
                ></span>
              </div>
              <!-- Post  -->
              <div class="space-y-4 flex-1">
                <ul
                  class="flex gap-6 items-center text-sm text-[#12132DCC] font-medium"
                >
                  <li># <span>${post?.category || "Not Available"}</span></li>
                  <li>Author: <span>${
                    post?.author?.name || "Not Available"
                  }</span></li>
                </ul>
                <article class="border-b-2 border-dashed border-[#12132D40]">
                  <h2 class="text-xl text-[#12132D] font-bold mb-4">
                  ${post?.title || "Not Available"}
                  </h2>
                  <p class="text-base text-[#12132D99] font-medium mb-5">
                  ${post?.description || "Not Available"}
                  </p>
                </article>
                <div class="flex items-center justify-between">
                  <ul class="flex gap-6 items-center text-base text-[#12132D99]">
                    <li class="flex gap-2 md:gap-3 items-center">
                      <i class="fa-solid fa-message"></i><span>${
                        post?.comment_count || "Not Available"
                      }</span>
                    </li>
                    <li class="flex gap-2 md:gap-3 items-center">
                      <i class="fa-regular fa-eye"></i><span>${
                        post?.view_count || "Not Available"
                      }</span>
                    </li>
                    <li class="flex gap-2 md:gap-3 items-center">
                      <i class="fa-regular fa-clock"></i><span>${
                        post?.posted_time || "Not Available"
                      } min</span>
                    </li>
                  </ul>
                  <button
                    onclick="marked('${
                      post?.title.replace("'", "\\'") || "Not Available"
                    }', '${post?.view_count || "Not Available"}')"
                    type="button"
                    class="bg-[#10B981] text-white px-2 py-1 rounded-full"
                  >
                    <i class="fa-regular fa-envelope-open"></i>
                  </button>
                </div>
              </div>
        `;

      postSection.appendChild(div);
    }, 2000);
  });

  //Spinner Off
  if (!!spinnerOn) {
    setTimeout(() => {
      document
        .getElementById("loading-spinner")
        .classList.replace("flex", "hidden");
    }, 2000);
  }
}

// Post Making
function closure() {
  let count = 1;
  function remember() {
    return count++;
  }
  return remember;
}
const check = document.getElementById("markChecked");
const markCount = document.getElementById("markedCount");
const count = closure();

//Post Selected
const selected = document.getElementById("markedPost");
//Clicked
const marked = (title, view) => {
  check.classList.add("text-[#3DCE09]");
  markCount.innerText = count();

  const article = document.createElement("article");
  article.className =
    "flex items-center justify-between bg-white p-4 rounded-2xl";
  article.innerHTML = `
    <h2 class="text-[#12132D] text-base font-semibold">
                ${title}
              </h2>
              <p class="flex gap-3 items-center text-base text-[#12132D99]">
                <i class="fa-regular fa-eye"></i><span>${view}</span>
              </p>
    `;
  selected.appendChild(article);
};

//Latest Post
const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  latestFunctionality(data);
};

function latestFunctionality(posts) {
  //Spinner On
  const latestPost = document.getElementById("latestSpinner");
  latestPost.innerHTML = `
  <div id="lPost-spinner" class="flex justify-center">
  <div role="status" class="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
  <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
      <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
      </svg>
  </div>
  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
  <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
  <div class="flex items-center mt-4">
     <svg class="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
      </svg>
      <div>
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
  </div>
  <span class="sr-only">Loading...</span>
</div>
      </div>
  `;

  const lPostSection = document.getElementById("latestPost");
  // Lopping On Post
  posts.forEach((post) => {
    console.log("enter");
    const div = document.createElement("div");
    div.className = "p-6 rounded-3xl border border-[#12132D26] space-y-4";

    setTimeout(() => {
      div.innerHTML = `
  <img
  class="object-cover max-w-full rounded-2xl"
  src="${post?.cover_image || "Not Available"}"
  alt=""
/>
<p class="text-[#12132D99] text-base">
  <i class="fa-solid fa-calendar-day"></i>
  <span>${post?.author?.posted_date || "No publish date"}</span>
</p>
<article>
  <h2 class="text-[#12132D] text-lg font-extrabold">
  ${post?.title || "Not Available"}
  </h2>
  <p class="text-base text-[#12132D99]">
  ${post?.description || "Not Available"}
  </p>
</article>
<ul class="grid grid-cols-6 space-x-3">
  <li class="row-span-2">
    <img
      class="object-cover size-12 rounded-full"
      src="${post?.profile_image || "Not Available"}"
      alt=""
    />
  </li>
  <li class="col-span-5 text-[#12132D] text-base font-bold">
  ${post?.author?.name || "Not Available"}
  </li>
  <li class="col-span-5 text-[#12132D99] text-sm">${
    post?.author?.designation || "Unknown"
  }</li>
</ul>
  `;

      lPostSection.appendChild(div);
    }, 2000);
  });

  //Spinner Off
  setTimeout(() => {
    document
      .getElementById("lPost-spinner")
      .classList.replace("flex", "hidden");
  }, 2000);
}

//Search Functionality
document.getElementById("search").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${userInput}`
  );
  const data = await res.json();
  discussFunctionality(data.posts);
});

allPostLoadData();
latestPost();
