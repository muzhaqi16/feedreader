/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* RSS Feeds suite*/
    describe('RSS Feeds', function() {
        /* Check if allFeeds variable is defined and check if at least one feed is loaded
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check if allFeeds has an url varible and it is not empty
         */
         it('has a non empty url',function(){
           for(let feed of allFeeds){
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe("");
            }
         });


        /* Check if allFeeds has a name variable and it is not empty
         */
         it('has a non empty name',function(){
           for(let feed of allFeeds){
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe("");
            }
         });
    });


    /* "The menu" suite */
  describe('The Menu', function() {
        /* Check if the menu is hidden
         */
         it('Menu is hidden',function(){
           expect($('body').hasClass('menu-hidden')).toBe(true);
           //we can also use expect$(body).toHaveClass('menu-hidden');
           //expect(document.getElementsByClassName('className')).toBe(true);
         });
         /* Check if the menu changes visibility when it's clicked.
          * We first trigger a click to the menu and check if it shows
          * then we trigger another click and then check if it hides
          */
          it('Menu Changes Visibility on click',function(){
                  $(".menu-icon-link").click();
                  expect($('body').hasClass('menu-hidden')).toBe(false);

                  $(".menu-icon-link").click();
                  expect($('body').hasClass('menu-hidden')).toBe(true);
            });
      });
    /* "Initial Entries" suites*/
  describe('Initial Entries',function(){
    /* check if after loadFeed function is called there is at least one entry
     * shown on the page.
     * we use Jasmine's beforeEach and asynchronous done() function.
     * to first call the loadFeed and expect till it's done processing
     * and then check if the feed has any entries
     */
     beforeEach(function(done){
       loadFeed(0,function(){
				done();
			});
     });
     it('Load feed has at least a single entry',function(){
       expect($('.feed .entry').length).toBeGreaterThan(0);
     });
  });
/* "New Feed Selection" */
describe('New Feed Selection',function(){
    /* Check that when a new feed is loaded the page content changes.
     * We use asynchronous jasmine beforeEach function again and then
     * load two different feeds and compare them
     */
     var feed1,feed2;
     beforeEach(function(done){
       loadFeed(0,function(){
         feed1=$('.feed').html();
         loadFeed(1,function(){
            feed2=$('.feed').html();
  				   done();
        });
			});
     });
     it('Check if content changes when new feed is loaded',function(){
      expect(feed1===feed2).toBe(false);
     });

});

}());
