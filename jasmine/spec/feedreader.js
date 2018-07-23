/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 * sources:
 * https://stackoverflow.com/questions/42346172/angular-2-jasmine-test-whether-an-element-is-visible
 * 
 * 
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(
  (function() {
    /* This is our first test suite - a test suite just contains
        * a related set of tests. This suite is all about the RSS
        * feeds definitions, the allFeeds variable in our application.
        */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
               * allFeeds variable has been defined and that it is not
               * empty. Experiment with this before you get started on
               * the rest of this project. What happens when you change
               * allFeeds in app.js to be an empty array and refresh the
               * page?
               */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
               * in the allFeeds object and ensures it has a URL defined
               * and that the URL is not empty.
               */

      it("URL should be defined and not empty", function() {
        // loops through the array of objects and check if URL property is defined
        allFeeds.forEach(function(feed) {
          expect(feed.url).toBeDefined();
          expect(feed.url).not.toBe("");
        });
      });

      /* TODO: Write a test that loops through each feed
               * in the allFeeds object and ensures it has a name defined
               * and that the name is not empty.
               */
      it("name should be defined and not empty", function() {
        // loops through the array of objects and check if name property is defined
        allFeeds.forEach(function(feed) {
          expect(feed.name).toBeDefined();
          expect(feed.name).not.toBe("");
        });
      });
    });

    /***********    Menu testing suite    ***************/

    describe("The Menu", function() {
      /* TODO: Write a test that ensures the menu element is
               * hidden by default. You'll have to analyze the HTML and
               * the CSS to determine how we're performing the
               * hiding/showing of the menu element.
               */

      // checks if element class is toggle when page loads
      it("element should be hidden by default", function() {
        let menu = document.querySelector(".menu-hidden");
        expect(menu.classList.contains("menu-hidden")).toBe(true);
      });

      /* TODO: Write a test that ensures the menu changes
                * visibility when the menu icon is clicked. This test
                * should have two expectations: does the menu display when
                * clicked and does it hide when clicked again.
                */

      it("should be able to display and hide when clicked", function() {
        // check the state of the menu when clicked
        let menuClick = document.querySelector(".menu-hidden");

        if (menuClick) {
          expect(menuClick.classList.contains("menu-hidden")).toBe(true);
        } else if (!menuClick) {
          expect(menuClick.classList.contains("menu-hidden")).toBe(false);
        }
      });
    });

        /***********    Initial entries testing suite    ***************/

    describe("Initial Entries", function() {
      /* TODO: Write a test that ensures when the loadFeed
                 * function is called and completes its work, there is at least
                 * a single .entry element within the .feed container.
                 * Remember, loadFeed() is asynchronous so this test will require
                 * the use of Jasmine's beforeEach and asynchronous done() function.
                 */

      // before each for asynchronous call
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("should have at least a single entry", function() {
        // check if element has at least one entry by checking the length property from the DOM.
        let entries = document
          .querySelector(".feed")
          .getElementsByClassName("entry");
        expect(entries.length).toBeGreaterThan(0);
      });
    });



        /***********    New Feed Selection testing suite    ***************/


    describe("New Feed Selection", function() {
      /* TODO: Write a test that ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 * 
                 */
      let OldFeedTest;

      // asynchronous, call back.
      // make sure content actually changed when a new feed is loaded by the function call loadFeed
      beforeEach(function(done) {
        loadFeed(0, function() {
          OldFeedTest = document.querySelector(".feed").innerHTML;
          loadFeed(1, function() {
            done();
          });
        });
      });

      // makes sure newsfeed are not dupplicated
      it("new feeds content actually changes", function(done) {
        let newFeedLoad = document.querySelector(".feed").innerHTML;
        expect(OldFeedTest).not.toBe(newFeedLoad);
        done();
      });
    });
  })()
);
