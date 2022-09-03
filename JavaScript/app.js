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
        newsDiv.classList.add("grid", "grid-rows-3", "grid-flow-col", "gap-4", "mb-4", "border-2", "border-oranger-900", "p-6");
        newsDiv.innerHTML = `
                <div class="row-span-3 ">
                    <img class="w-full" src="${news.thumbnail_url}" alt="">
                </div>
                <div class="row-span-2 col-span-2">
                    <h1 class="text-2xl mb-2 font-bold">
                        ${news.title}
                    </h1>
                    <p>
                        From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers,
                        read on some of the
                        best fashion blogs out there, and for even more inspiration, do head to our separate black
                        fashion influencer roundup.
                        Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday,

                    </p>
                </div>
                <div class="col-span-2">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-1 pt-1">
                            <img class="w-20 rounded-full" src="${news.author.img}" alt="">
                        </div>
                        <div class="col-span-3 me-6 pt-2">
                            <h1 class="text-xl">${news.author.name} </h1>
                            <p>Published On: ${news.author.published_date.split(" ")[0]} </p>
                        </div>
                        <div class="col-span-4 text-center ml-28 pl-16 pt-6">
                            <h1 class="text-2xl">View: ${news.total_view}</h1>
                        </div>
                        <div class="col-span-4 text-end pt-6"><button onclick="loadNewsDetails('${news._id}')" 
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                Details
                            </button></div>
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
}








loadNews(02);
loadCategories();