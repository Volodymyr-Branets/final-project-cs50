class ArticleList {
    constructor() {
        this.container = document.querySelector('.articles-container');
        this.articlesService = new ArticlesService();
        this.renderArticles();
    }
    async renderArticles() {
        let articleListDomString = '';
        const articles = await this.articlesService.getArticles();
        articles.forEach(article => {
            articleListDomString += this.createArticleDomString(article);
        });
        this.container.innerHTML = articleListDomString;
        this.addEventListeners();
    }
    createArticleDomString(article) {
        return `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="img/${article.img}" class="bd-placeholder-img card-img-top article-img" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.short_text}</p>
                            <a href="#" class="btn btn-warning btn-more" data-bs-toggle="modal" data-bs-target="#article-modal" data-id=${article.id}>Read more...</a>
                        </div>
                    </div>
                </div>`;
    }
    addEventListeners() {
        document.querySelectorAll('.btn-more').forEach(btn => {
            btn.addEventListener('click', this.showArticle.bind(this));
        });
    }
    async showArticle(event) {
        const id = event.target.dataset.id;
        const article = await this.articlesService.getArticleById(id);
        const modal = document.querySelector('#article-modal');
        modal.querySelector('.modal-title').innerHTML = article.title;
        modal.querySelector('.product-image').src = `img/${article.img}`;
        modal.querySelector('.product-description').innerHTML = article.text;
        modal.querySelector('.btn-buy').dataset.id = article.id;
    }
}
new ArticleList();