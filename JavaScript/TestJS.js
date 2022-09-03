const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (categories) => {
    // console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    for (const category of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("cursor-pointer");
        categoryDiv.innerHTML = `
            <h5 onclick="loadNews(${category.category_id})">${category.category_name}</h5>
        `
        categoriesContainer.appendChild(categoryDiv);

        // adding event handler for click on the categories
    }
}

const loadNews = async (categoryId) => {
    const addingZero = "0" + categoryId;
    const url = `https://openapi.programming-hero.com/api/news/category/${addingZero}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = (allNews) => {
    // console.log(allNews);
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ``;
    for (const news of allNews) {
        // console.log(news._id);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("row", "m-3", "border", "p-2")
        newsDiv.innerHTML = `
        <div class="col-md-4">
            <img class="img-fluid" src="${news.thumbnail_url}" class="w-100">
        </div>
        <div class="col-md-8">
            <div class="card-block ">
                <h4 class="card-title">${news.title}</h4>
                <p class="card-text">Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. </p>
                <p class="card-text">Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                                    sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.</p>
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex">
                                        <div style="height: 3.5vh; width: 3.5vw;"><img class="img-fluid"
                                        src="${news.author.img}" alt=""></div>
                                        <div class="d-flex flex-column ms-2">
                                            <h5>${news.author.name}</h5>
                                            <p>${news.author.published_date.split(" ")[0]}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <h5>Views: ${news.total_view}</h5>

                                    </div>
                                    <div class="d-flex align-items-center">
                                    <button onclick="loadNewsDetails('${news._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Details
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
        `
        newsContainer.appendChild(newsDiv);
    }

}


const loadNewsDetails = async (news_id) => {
    url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);

}

const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails);
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
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Rating: ${newsDetails.rating.number}</button>
            <button type="button" class="btn btn-primary">Badge: ${newsDetails.rating.badge}</button>
        </div>
        `
    newsDetailsContainer.appendChild(modalDiv);
}


loadNews(02);
loadCategories();