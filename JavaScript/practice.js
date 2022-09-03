
const newsArray = [
    { category_id: '01', category_name: 'Breaking News' },
    { category_id: '02', category_name: 'Regular News' },
    { category_id: '03', category_name: 'International News' },
    { category_id: '04', category_name: 'Sports' },
    { category_id: '05', category_name: 'Entertainment' },
    { category_id: '06', category_name: 'Culture' },
    { category_id: '07', category_name: 'Arts' },
    { category_id: '08', category_name: 'All News' }
]

const categoriesTypeArray = [];
const categoriesIDArray = [];

for (let news of newsArray) {
    categoriesTypeArray.push(news.category_name);
    categoriesIDArray.push(news.category_id);
}

console.log(categoriesTypeArray);
console.log(categoriesIDArray);