const $filterSelect = document.getElementById("filter-select")
const $sortSelect = document.getElementById("sort-select")
const $articleCategory = document.getElementById("article-category")
const $articles = document.getElementById("articles");
const $loadBtn = document.getElementById("load-btn");
let articles = [];

import ApiService from "./ApiService.js";
const headlineApiService = new ApiService();

// -- START OF HELPER CLASSES --
class DisplayService {

    async displayAllTags() {
        let tags = await headlineApiService.getAllTags();
        // Remove "None" filter (which is used to show all articles) in case there is no category available because then all articles will be shown anyway
        if(tags[0] === "No category found") {
            let noneFilter = $filterSelect.children[1];
            $filterSelect.removeChild(noneFilter);
        } 
        // Show categories if available and error message otherwise in the filter dropdown
        tags.forEach(tag => { 
            let option = document.createElement("option");
            let optionText = tag.charAt(0).toUpperCase() + tag.slice(1);
            option.textContent = optionText;
            option.setAttribute('value', tag);
            $filterSelect.appendChild(option);

            if(optionText === "No category found"){
                option.setAttribute('disabled', '');
            }
        });
           
    }
    
    async displayAllArticles() {
        loadArticles(); 
    
        $articleCategory.innerHTML="<h2>Latest Headlines</h2>";
    
        articles = await headlineApiService.getAllNews();

        if(!articles.length) {
            let errText = "No articles found.";
            $articles.innerHTML = `<p>${errText}</p>`;
        } else {
            if ($sortSelect.selectedOptions[0].value) {
                articles = headlineApiService.sortArticlesBy(articles, $sortSelect.selectedOptions[0].value); 
            }
            // Remove load spinner
            $articles.innerHTML = "";

            for (let i = 0; i < 10; i++) {
                let obj = articles[i];
                this.createArticle(obj);
            }
        }    
    }
    
    async displayArticlesByTag(tag) {
        loadArticles(); 
        
        let tagText = tag.charAt(0).toUpperCase() + tag.slice(1);
        $articleCategory.innerHTML=`<h2>${tagText}</h2>`;
    
        articles = await headlineApiService.getNewsByTag(tag);  
       
        if(!articles.length) {
            let errText = "No articles found in this category.";
            $articles.innerHTML = `<p>${errText}</p>`;
        } else {
            if ($sortSelect.selectedOptions[0].value) {
                articles = headlineApiService.sortArticlesBy(articles, $sortSelect.selectedOptions[0].value); 
            }
            $articles.innerHTML = "";
            let i = 0;
            while (i < Math.min(10, articles.length)) {
                let obj = articles[i];
                this.createArticle(obj);
                i++;
            }
        }     
    }
    
    createArticle(obj) {
        let article = document.createElement("article");
        article.innerHTML = `
                <h4>${obj.title}</h4>
                <div class="date-time">
                    <span>${obj.date}</span>
                    <span>${obj.time}</span>
                </div>
                <span class="article-tag"><em>#${obj.tag}</em></span>
                <p>${obj.text}</p>
                <a href=${obj.url}>Read article</a>`;
        let datetime = `${obj.date} ${obj.time}`;
        article.setAttribute('data-datetime', datetime);
        $articles.appendChild(article);
    }
}


class LoadMoreService {

    displayMoreArticles() {
        let i = 0;
        let displayedArticles = $articles.querySelectorAll("article");
        let nrOfDisplayedArticles = Array.from(displayedArticles).length;
    
        while (i < Math.min(10, articles.length - nrOfDisplayedArticles)) {
            let obj = articles[i + nrOfDisplayedArticles];
            headlineDisplayService.createArticle(obj);
            i++;
        }
        if(articles.length - nrOfDisplayedArticles === 0) {
            let loadMessages = $articles.getElementsByClassName("message");
            if(!loadMessages.length) {
                let loadMessage = document.createElement('p');
                loadMessage.classList.add("message");
                loadMessage.textContent = "No more articles to show";
                $articles.appendChild(loadMessage);
            }
        }

        let loadSpinner = $articles.querySelector(".load-spinner");
        loadSpinner.remove();
    }

    loadMore() {
        let div = document.createElement('div');
        div.classList.add('load-spinner');
        let img = document.createElement('img');
        img.src = "img/load-spinner.webp";
        div.appendChild(img);
        $articles.appendChild(div);
    }

    setSortToDefault() {
        let nrOfDisplayedArticles = Array.from($articles.querySelectorAll("article")).length;
        if ($sortSelect.selectedOptions[0].value && (articles.length - nrOfDisplayedArticles > 0)) {
            $sortSelect.value = "";
        }
    };
}


class SortService {

    sortAndDisplayArticlesBy(data, criterion) {
        let sortedArr = headlineApiService.sortArticlesBy(data, criterion);
        let nrOfDisplayedArticles = Array.from($articles.querySelectorAll("article")).length;
        $articles.innerHTML = ""; 
        for (let i = 0; i < nrOfDisplayedArticles; i++) {
            let obj = sortedArr[i];
            headlineDisplayService.createArticle(obj);
        }
    }

}

// -- END OF HELPER CLASSES --


const headlineDisplayService = new DisplayService();
const headlineLoadMoreService = new LoadMoreService();
const headlineSortService = new SortService();

window.onload = function() {
    $articleCategory.innerHTML="<h2>Latest Headlines</h2>";
    headlineDisplayService.displayAllTags();
    headlineDisplayService.displayAllArticles();
};

$filterSelect.addEventListener('change', e => {
        if ($filterSelect.selectedOptions[0].value === "none") {
            loadArticles();
            headlineDisplayService.displayAllArticles();
        } else {
            headlineDisplayService.displayArticlesByTag($filterSelect.selectedOptions[0].value)
        }
    }
);

$sortSelect.addEventListener('change', () => headlineSortService.sortAndDisplayArticlesBy(articles, $sortSelect.selectedOptions[0].value));

$loadBtn.addEventListener('click', () => {
    headlineLoadMoreService.loadMore();
    setTimeout(headlineLoadMoreService.displayMoreArticles, 600);
    headlineLoadMoreService.setSortToDefault();
})


// -- Show Load-Spinner while loading (not while loading "more" articles)
const loadArticles = () => {
    $articles.innerHTML = `<div class="load-spinner"><img src="img/load-spinner.webp" /></div>`
}
