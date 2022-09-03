const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
}

// Spinner Function
const toggleSpinner = (isLoading) => {
    const spinnerDiv = document.getElementById("spinner");
    if (isLoading) {
        spinnerDiv.classList.remove("d-none");
    }
    else {
        spinnerDiv.classList.add("d-none");
    }
}


const categoriesTypeArray = [];

const displayCategories = (categories) => {
    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    categories.forEach(category => {
        categoriesTypeArray.push(category.category_name);

        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("cursor-pointer");

        categoryDiv.innerHTML = `
            <h5 onclick="loadNews(${category.category_id})">${category.category_name}</h5>
        `
        categoriesContainer.appendChild(categoryDiv);
    })

}



const loadNews = async (categoryId) => {
    // Start Spinner
    toggleSpinner(true);
    const addingZero = "0" + categoryId;
    const url = `https://openapi.programming-hero.com/api/news/category/${addingZero}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);


}


// console.log(categoriesTypeArray);

const displayNews = (allNews) => {
    // Displaying the availble number of news for the clicked news category

    const newsNumberElement = document.getElementById("news-number");
    const newsCategoryElement = document.getElementById("news-category");
    newsCategoryElement.innerText = "";
    const newsTypeLength = allNews.length;

    if (newsTypeLength === 0) {
        newsNumberElement.innerText = "No News Items found for this category";
    }
    else {
        const currentNewsType = ((allNews[0].category_id) - 01);
        const newsCategory = categoriesTypeArray[currentNewsType];
        newsNumberElement.innerText = newsTypeLength + " ";
        newsCategoryElement.innerText = "Items found for " + newsCategory + " Category";

    }

    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;
    for (const news of allNews) {
        // console.log(news.category_id);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("row", "m-3", "border", "p-2")
        newsDiv.innerHTML = `
        <div class="col-lg-3 col-md-4 col-sm-12">
            <img class="img-fluid card-img h-100 w-100" src="${news.thumbnail_url}">
        </div>
        <div class="col-lg-9 col-md-8 col-sm-12">
            <div class="card-block">
                <h4 class="card-title">${news.title}</h4>
                <p class="card-text mb-5" style="display: -webkit-box; -webkit-line-clamp: 8;-webkit-box-orient: vertical;
                                    overflow: hidden; text-overflow: ellipsis;">${news.details}</p> 
                
            <div class="d-flex justify-content-between">
                <div class="d-flex">
                    <div style="height: 3.5vh; width: 3.5vw;"><img class="img-fluid"
                        src="${news.author.img}" alt="">
                    </div>
                    <div class="d-flex flex-column ms-2">
                        <h5>${news.author?.name || "No Info Available"}</h5>
                        <p>${news.author?.published_date || "Publication Date Not Avaiable"}</p>
                    </div>
                    </div>
                        <div class="d-flex align-items-center">
                            <h5>Views: ${news?.total_view || "No Info Available"}</h5>
                        </div>
                    <div class="d-flex align-items-center">
                        <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsDiv);
    }

    // stop spinner
    toggleSpinner(false);

}


const loadNewsDetails = async (news_id) => {
    try {
        url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsDetails = (newsDetails) => {
    const newsDetailsContainer = document.getElementById("news-details-container");
    newsDetailsContainer.innerHTML = ``;
    const modalDiv = document.createElement("div");
    modalDiv.classList.add("modal-content");
    modalDiv.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title">${newsDetails.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img class="img-fluid mb-3" src="${newsDetails.image_url}" alt="">
            <p>${newsDetails.details}</p>

            <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <div style="height: 3.5vh; width: 3.5vw;">
                            <img class="img-fluid" src="${newsDetails.author.img}" alt="">
                        </div>
                        <div class="d-flex flex-column ms-2">
                            <h5>${newsDetails.author?.name || "Author Name Not Available"}</h5>
                            <p>${newsDetails.author?.published_date || "Publication Date Not Avaiable"}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <h5>Total View: ${newsDetails?.total_view || "No info avaiable"}</h5>
                    </div>
            </div>
            

        </div>
            
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary">Today's Pick: ${newsDetails.others_info.is_todays_pick}</button>
        <button type="button" class="btn btn-secondary">Trending: ${newsDetails.others_info.is_trending}</button>
            <button type="button" class="btn btn-secondary">Rating: ${newsDetails.rating.number}</button>
            <button type="button" class="btn btn-secondary">Badge: ${newsDetails.rating.badge}</button>

        </div>
        `
    newsDetailsContainer.appendChild(modalDiv);
}



loadNews();
loadCategories();
