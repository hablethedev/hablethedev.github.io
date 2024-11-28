

const bannerContainer = document.getElementById('banner-container');

// jank
function addBanner(image, description, time) {
    const bannerItem = document.createElement('div');
    bannerItem.classList.add('banner-item');
    
    const imageElement = document.createElement('img');
    imageElement.classList.add('banner-image');
    imageElement.src = image;
    imageElement.alt = 'Banner image';
    
    const bannerInfo = document.createElement('div');
    bannerInfo.classList.add('banner-info');
    
    const descElement = document.createElement('p');
    descElement.classList.add('description');
    descElement.textContent = description;

    const timeBox = document.createElement('div');
    timeBox.classList.add('time-box');

    const timeElement = document.createElement('p');
    timeElement.classList.add('time');
    timeElement.textContent = time;

    const labelElement = document.createElement('p');
    labelElement.classList.add('label');
    labelElement.textContent = 'to make';

    timeBox.appendChild(timeElement);
    timeBox.appendChild(labelElement);
    bannerInfo.appendChild(descElement);
    bannerItem.appendChild(imageElement);
    bannerItem.appendChild(bannerInfo);
    bannerItem.appendChild(timeBox);

    bannerContainer.appendChild(bannerItem);
}

// TODO: ACTUAL BANNERS
addBanner('https://http.cat/500', 'placeholder! lorem ipsum i forgot the rest hehehehehehehehe haha this is alength test wowzers amazing am i right lorem ipsum', '45m');

