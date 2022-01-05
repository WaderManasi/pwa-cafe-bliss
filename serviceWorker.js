const staticCafeBliss = 'cafe-bliss-site-static-v7';
const dynamicCache = 'cafe-bliss-site-dynamic-v2';
const assets = [
   '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.gstatic.com/s/materialicons/v118/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

//each items in above array represents the sep asset


// cache size limit function
const limitCacheSize = (namee,size) => {
    caches.open(namee).then(cache => {
        cache.keys().then(k=>{
            if(k.length > size){
                //delete previous stored from cache
                cache.delete(k[0]).then(limitCacheSize(namee,size));
            }
        })
    })
}


//****installing service worker
self.addEventListener('install',evnt => {
//    console.log('Service worker has been installed');

/*here we're going to access 'cache' api 
    below is asnyc task, it may take time..&returns a promis
*/
    evnt.waitUntil(
    caches.open(staticCafeBliss).then((cache) => {

    console.log('caching shell assets..');
    // to add an array of items, here add array of assets
    cache.addAll(assets);
})
);
});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       


//activate service worker
self.addEventListener('activate',event => {
//    console.log('Service worker has been activated');
event.waitUntil(
    caches.keys().then(key => {
        console.log(key);       //goes through all our caches, look upon the keys
        return Promise.all(key
        .filter(k => k!==staticCafeBliss && k!==dynamicCache)
        .map(k => caches.delete(k))    
        )
    })
)

})


//fetch events
self.addEventListener('fetch', event => {
//    console.log('Fetch events beloe:', event);

// fetch response from a catched resource
// event.respondWith(
//     caches.match(event.request).then(res => {
//         // this res is eithr the one which matches the request(then return that resp), or diff(then return empty)
//         return res || fetch(event.request).then(fetRes => {
//             return caches.open(dynamicCache).then(cache => {
//                 cache.put(event.request.url, fetRes.clone())
//                 limitCacheSize(dynamicCache,3)
//                 // it means currently, we cannot have more than 3 elements in dynamic cacjhe
//                 return fetRes
//             })
//         });
//     }).catch(()=>{
//                 //below will return a int value
//         if(event.request.url.indexOf('.html')>-1)
//         return caches.match('/pages/fallback.html')
//     })
// )


})