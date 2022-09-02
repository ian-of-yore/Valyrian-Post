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

const displayNews = (news) => {
    console.log(news);
}











loadCategories();