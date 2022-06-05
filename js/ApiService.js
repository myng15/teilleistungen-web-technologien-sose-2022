export default class ApiService {
    currentData = [];
    tagData = [];
    rootUrl = "https://web-t.l0e.de/tl2/news/";

    async getAllTags() {
        const response = await fetch(this.rootUrl + "tags");
        this.tagData = await response.json()
                                        .then((response) => {
                                            return response.content;
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            let errText = "No category found";
                                            return [errText];
                                        });
        return this.tagData;
    }

    async getAllNews() {
        const response = await fetch(this.rootUrl);
        this.currentData = await response.json()
                                        .then((response) => {
                                            return response.content;
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            return [];
                                        });
        return this.currentData;
    }

    async getNewsByTag(tag) {
        const response = await fetch(this.rootUrl + `tag/${tag}`);
        this.currentData = await response.json()
                                        .then((response) => {
                                            return response.content;
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            return [];
                                        });

        return this.currentData;
    }
    

    // Sortierfunktionen

    sortArticlesBy(data, criterion) {
        let sortedArr = [];
        
        if (criterion === 'time' | criterion === 'default') {
            sortedArr = data.sort((a, b) => {
                let timeA = a.time;
                let timeB = b.time;
                return timeA > timeB ? -1 : 1;
            })
        }
        if (criterion === 'title') {
            sortedArr = data.sort((a, b) => {
                let titleA = a.title.replaceAll('"', ''); 
                let titleB = b.title.replaceAll('"', ''); 
                return titleA > titleB ? -1 : 1;
            })
        }
        if (criterion === 'tag') {
            sortedArr = data.sort((a, b) => {
                let tagA = a.tag; 
                let tagB = b.tag; 
                return tagA > tagB ? -1 : 1;
            })
        }
        
        return sortedArr;
    }
    
}
