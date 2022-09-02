const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (categories) => {
    console.log(categories);
    const categoriesContainer = document.getElementById("categories-container");
    for (const category of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
            <h5>${category.category_name}</h5>
        `
        categoriesContainer.appendChild(categoryDiv);

        // adding event handler for click on the categories
        
    }
}

loadCategories();