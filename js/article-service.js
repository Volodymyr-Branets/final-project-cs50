class ArticlesService {
    constructor() {
        if (!ArticlesService._instance) ArticlesService._instance = this;
        return ArticlesService._instance;
    }
    // Get articles from array in json file (Can be changed to server part)
    async getArticles() {
        if (!this.articles) {
            this.articles = await( await fetch('api/articles.json') ).json();
        }
        return this.articles;
    }
    // Search article by id
    async getArticleById(id) {
        const articles = await this.getArticles();
        return articles.find(article => article.id === id);
    }
}