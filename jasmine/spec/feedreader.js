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
    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.trim()).not.toEqual('');
            });
         });

        /* This a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.trim()).not.toEqual('');
            });
         });
    });

    /* Tests to make sure that the Menu is hidden by default,
     * and that the menu changes visibility when clicked.
     */
    describe('The menu', function() {
        /* test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('shows when icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
        });

        // since this it() is reset, it actually has no memory of
        //   the state of the previous it() function.
        //   Therefore, the menu had not been clicked already.
        it('hides when icon is clicked again', function() {
            $('.menu-icon-link').trigger('click');
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Tests to make sure that there are initial entries present
     * after loadFeed completes
     */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0,done);
        });

        it('feed container is not empty', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Tests to make sure that the feed selection changes the
       content.
     */
   describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedHtml;

        beforeEach(function(done) {
            loadFeed(1,function() {
                feedHtml = $('.feed').html();
                done();
            });
        });

        it('feed content changes', function(done) {
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(feedHtml);
                done();
            });
        });
    });
});
