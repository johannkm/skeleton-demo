var scrTime = 300;

/**
    https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery

    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration

    Returns a promise that's fulfilled when done, or rejected if
    interrupted
 */
var smooth_scroll_to = function(element, target, duration) {
    var globalID;
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    var start_time = Date.now();
    var end_time = start_time + duration;

    var start_top = element.scrollTop;
    var distance = target - start_top;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    var smooth_step = function(start, end, point) {
        if (point <= start) {
            return 0;
        }
        if (point >= end) {
            return 1;
        }
        var x = (point - start) / (end - start); // interpolation
        return x * x * (3 - 2 * x);
    }

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        var previous_top = element.scrollTop;

        // This is like a think function from a game loop
        var scroll_frame = function() {
            if (element.scrollTop != previous_top) {
                reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            var now = Date.now();
            var point = smooth_step(start_time, end_time, now);
            var frameTop = Math.round(start_top + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if (now >= end_time) {
                cancelAnimationFrame(globalID);
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            previous_top = element.scrollTop;

            // schedule next frame for execution
            // setTimeout(scroll_frame, 0);
            globalID = requestAnimationFrame(scroll_frame);
        }

        // boostrap the animation process
        globalID = requestAnimationFrame(scroll_frame);
    });
}

document.addEventListener("DOMContentLoaded", function() {

    var navbar = document.getElementById('navbar').getBoundingClientRect();
    var offset = navbar.bottom - navbar.top

    document.getElementById("projectButton").addEventListener('click', function(e) {
        e.preventDefault();
        smooth_scroll_to(document.body, 0, 200).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("")
        });
    });
    document.getElementById("aboutButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('about').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("about")
        });
    });
    document.getElementById("timelineButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('timeline').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("timeline")
        });
    });
    document.getElementById("teamButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('team').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("team")
        });
    });
    document.getElementById("contactButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('contact').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("contact")
        });
    });
    document.getElementById("innerAboutButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('about').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("about")
        });
    });
    document.getElementById("innerContactButton").addEventListener('click', function(e) {
        e.preventDefault();
        let y1 = document.getElementById('contact').getBoundingClientRect().top
        let y2 = document.body.getBoundingClientRect().top
        smooth_scroll_to(document.body, y1 - y2 + 80 - offset, scrTime).catch(function(error) {
            console.log("Sequence cancelled:", error);
            jumpTo("contact")
        });
    });
});

function jumpTo(anchor) {
    window.location.href = "#" + anchor;
}
