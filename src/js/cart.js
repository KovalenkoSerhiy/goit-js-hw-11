export const galleryImages = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
            <a href="${largeImageURL}" class="gallery__link">   
              <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
              <div class="info">
                <p class="info-item likes">
                <b>likes</b>
                  <b>${likes}</b>
                </p>
                <p class="info-item views">
                <b>views</b>
                  <b>${views}</b>
                </p>
                <p class="info-item comments">
                <b>comments</b>
                  <b>${comments}</b>
                </p>
                <p class="info-item downloads">
                <b>downloads</b>
                  <b>${downloads}</b>
                </p>
              </div>
            </a>
          </div>`;
      }
    )
    .join('');
};
