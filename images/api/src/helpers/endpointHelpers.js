/**
 * check title of new manga on post
 * 
 * @param: manga title
 * @returns: fails if no match, true if right type
 */

function checkMangaTitle(title) {
    if(
        title == null 
        || title.length <= 1 
        || typeof(title) != "string" 
        || title.length > 50
        ) {
        return false
        }

        return true
}

function checkMangaAuthor(name) {
    if(
        name == null 
        || name.length <= 1 
        || typeof(name) != "string" 
        || name.length > 30
        ) {
        return false
        }

        return true
}


function checkMangaCoverUrl(url) {
    if (typeof url !== 'string' 
    || !url.endsWith('.jpg') 
    || !isNaN(url.split('/').pop().split('.')[0]) // 
    ) {
        return false;
    }
    return true;
}

function checkMangaVolumes(volumes) {
    if (typeof volumes !== 'number' //checks for numerical value but with decimals
    || !Number.isInteger(volumes) // checks if number is in fact an integer, blocking any kind of decimals
    || volumes < 0) {
        return false;
    }
    return true;
}

module.exports = { checkMangaVolumes };


module.exports = {
    checkMangaTitle,
    checkMangaAuthor,
    checkMangaCoverUrl,
    checkMangaVolumes
}