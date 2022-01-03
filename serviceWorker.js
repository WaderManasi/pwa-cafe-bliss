const staticCafeBliss = 'cafe-bliss-site-static';
const assets = [
   '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

//each items in above array represents the sep asset


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
})


//fetch events
self.addEventListener('fetch', event => {
//    console.log('Fetch events beloe:', event);

// fetch response from a catched resource
event.respondWith(
    caches.match(event.request).then(res => {
        // this res is eithr the one which matches the request(then return that resp), or diff(then return empty)
        return res || fetch(event.request);
    })
)

})