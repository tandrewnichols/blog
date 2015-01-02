---
title: Why we stopped using lineman.js
description: Learn why the Manta frontend dev team stopped using lineman.js to manage builds and started using pure grunt.
published: January 2, 2015
draft: true

---

# Why Manta stopped using lineman.js

First, a little backstory on how we came to use [lineman.js](http://linemanjs.com/) in the first place.

### Migration

I work for Manta Media Inc. in Columbus, OH. Our website used to be backed by a monolithic Perl application that included, amongst other things, a home-rolled ORM. And it was _slow_ and difficult to maintain and had very few tests. And besides all that - let me reemphasize - _it was written in Perl_. Perl is fine, really . . . until you start trying to recruit top level developers. Who wants to go work every day on a giant Perl application when you could be working with technologies from this millenium instead? So for those reasons, and because our company in general was in a state of transition, we began a platform migration project to move the entirety of our frontend application into a node.js app powered by express (on the server side) and angular.js (on the client) that talked to Java-based services that interacted with data and other services. Perhaps there will be time, in some future post, to delve into this migration in greater detail. It is, after all, a thrilling tale. A swashbuckler to be sure. But for now, the key point is that we were migrating to new technologies (new to us, I mean), and we needed some help with that.

We knew that we wanted to build something better than the previous application, something maintainable, something covered by tests, something that used well-documented industry-standard tools. Tools like [grunt](http://gruntjs.com/). If you're unfamiliar with grunt (first of all, are you living under a rock?), it's a task runner that automates build processes, such as converting less or sass to css, concatenating and minifying javascript, and even running tests. There are hundreds (thousands?) of grunt plugins for just about any task you can think of (including printing "hello world" in your terminal - see [grunt-helloworld](https://www.npmjs.com/package/grunt-helloworld)). But we didn't choose grunt, did we? No, the title gives it away. We chose lineman. Partially, that was due to the fact that we hired testdouble to consult on test-driven development methodologies, and lineman is written and maintained by testdouble. But also, partially, it _really was_ the right tool for us at the time.

But wait, isn't this a post about moving _away_ from lineman? Yes. Yes it is. I was just coming to that.

### Lineman: the good parts

Lineman is really _not_ a bad tool. The point of this post is not to drive people away from lineman or make them think it's poorly written or ineffective. On the contrary, I have great affection for Justin Searls and the testdouble team, and lineman really helped us get off the ground quickly. That's the nice thing about lineman. It wraps a lot of the build process up neatly and abstracts the messy details away so that newbies, as we were at the time, can quickly and _easily_ get started. Honestly, it's as easy as 1. `npm i lineman -g`, 2. `lineman new`, 3. `lineman run`. Voila! You have a running website. Lineman's single greatest feature is its short learning curve.

On our Perl platform, we had (as it seemed we did with _all_ things) a home-rolled asset concatenation/minification system, so something that just _worked_ out of the box with little to no configuration, setup, overhead, or research (and was maintained by someone else who understood the details) was a great way to kick off our project. And lineman served our purposes nobly for months. We even became somewhat savvy in the technology, enough so that we added our own configuration, changed defaults, installed plugins, wrote custom tasks, overrode the custom task execution order . . . and at some point we realized that the simplicity that originally made lineman so fantastic was actually now working against us.

### At last, the reasons we changed

So a few months ago, I expressed in our frontend slack channel the feeling I was having that lineman had sort of outlived its use in our platform and cited the following reasons we should remove the abstraction and just use grunt itself.

##### 1. Lineman is resource intensive.

This is not exactly lineman's fault. Lineman is resource intensive because file watching is expensive. But we were watching _a lot_ - probably more than we needed to be (needing to increase the EMFILE limit was a common problem amongst new developers), and no one was really willing to try to reduce the number of files, primarily because of the _other_ reasons listed below.

##### 2. Lineman abstracts a little _too_ much away

Or maybe the abstraction is just done in such a way that it's difficult to hack into. Regardless, we often found that making changes to the lineman config was cumbersome and the outcome often difficult to predict. The abstraction was great at the beginning when we didn't understand what we were doing and only needed the core out-of-the-box functionality. But as we started to change things, to add things, to put things in different orders, it became harder and harder to manage. By the end, I might've been the only one on our team willing to mess with the lineman config because it was just hard to track what was happening. What originally was abstraction, by the end was more like _hiding_.

##### 3. Lineman is obscenely extensible . . . _most_ of the time

"Obscenely extensible" is lineman's own claim. But the thing about a tool that wraps other tools is that no matter how extensible you try to make it, eventually there is a use case you just did not expect, and then it's actually _more_ difficult for users to do that thing because, not only do they have the initial problem, they have the tool itself preventing them solving the problem because everything is abstracted away. This is actually the issue that made me realize that we had outgrown lineman. I found that I needed two different testem configurations, one for our normal tests, and one to run those tests under coverage and generate a coverage report. Lineman doesn't (as far as I could tell at the time) provide a way to have more than one testem configuration and because testem was actually wrapped up by lineman, it was difficult to figure out if there was a way to hack it to make it do what I wanted.

##### 4. Lineman's config is long and messy

This would also normally be true of traditional Gruntfiles, but at least with Gruntfiles you don't have anything like this:

```js
loadNpmTasks: app.loadNpmTasks.filter(function(task) { return task !== 'grunt-ngmin'; }).concat(['grunt-browserify', 'grunt-jasmine-bundle', 'grunt-env', 'grunt-ng-annotate']
```

(That is _real_ line from our lineman configuration.)

However, when we switched, we started using a tool that I had previously built and published for use in my own projects. [Task-master](https://github.com/tandrewnichols/task-master) lets you break your grunt configuration into multiple files and then loads those pieces, assembles them, and passes the resultant object to `grunt.initConfig`. It also does a few other handy things, like plug into `jit-grunt`, permit overriding pieces of configuration, and allow specifying aliases easily and succinctly. This approach has turned out to be really useful because it provides simplicity to task configuration while maintaining readability and coherence. 

##### 5. We were dependent on lineman's lifecycle

Lineman is still a project that is growing and improving, which _really_ is good thing, but it did mean that we were dependent on other people for functionality we might want. Typically the testdouble developers were quick with bug fixes, simple ones anyway, but a few of the more complicated ones, bugs that made some of what we wanted to do extremely difficult to manage, were left unresolved for long periods of time (some were still unresolved when we moved away from lineman).

##### 6. It's hard to stay up to date with lineman

Yes . . . we were simultaneously wanting lineman to fix and update more quickly and to _just slow down_. Sometimes it felt like they could've been competing (probably with Java) for an award for shortest lifecycle. I'd update lineman to the latest version (because again, I was the only willing to mess with it by the end), and a week later we'd be one minor version and four patches behind. That by itself wasn't necessarily a bad thing. You want the libraries you use to be "under development," and you often see comments on github that say things like, "Is this still being maintained? Hasn't been updated in two months." The problem was not knowing whether updating would make something break inexplicably. Well, it was probably _excplicable_, if it weren't for the abstraction hiding it. Pretty early on in our use of lineman (but after testdouble had stopped consulting with us), we realized we were like eight minor versions behind the current, stable version. I started updating it, but it turned out the API had changed somewhat, and I had maybe a week of frustration trying to figure out how to get everything working again with the new version. That being said, in fairness to lineman, some of the features added in the later stages of our use - like `lineman config --process` - were _really_ fantastic. I actually wouldn't have been able to migrate our config from lineman over to grunt without that feature.

##### 7. Grunt is less proprietary

Lineman is open source, but what I mean is that grunt is a well-known, well-documented, stable paradigm in the node.js community. That means that new developers coming on board would likely have more familiarity with it than with lineman and that answers to questions would be easier to find.  Case in point, if you search "lineman" on stack overflow, you get 34 hits. If you search "grunt", you get over 10,000. There are less than 30 questions tagged lineman. There are nearly 500 tagged "grunt" or "gruntjs" (plus there are many tagged with specific plugins, like "grunt-contrib-less").

##### 8. We might actual publish grunt plugins

We have some custom grunt tasks, including a task that runs our tests in parallel and produces parallel, readable output (grunt-concurrent will do the first, but not the second). I, personally, have published a number of grunt plugins. Our team, in general, which has it's own npm account and _has_ published modules previously, would be far more likely to open source a grunt plugin than a lineman plugin.

##### 9. We had a lot of duplication between client and server code

Admittedly, we could've solved this problem _and kept lineman_, but not having lineman made it a lot easier. Our github repository has a server directory, in which our node application resides, and a client directory for all our frontend javascript, as well as our build process code (i.e. lineman configuration). We had separate Gruntfiles in each directory, duplicated tasks (like one to start our express server), and a whole host of duplicated npm modules. As part of our lineman removal, we moved our Gruntfile and package.json up to the root level so that both client and server would have access to the same tasks and third-party code. More on this point in another post.

##### 10. We just weren't in lineman's niche anymore

Lineman is _perfect_ for start up projects because you can get off the ground quickly with reasonable defaults. It's perfect for people who don't know how to use grunt and/or don't want to customize their build process. It's _not_ perfect for large web applications that need a ton of customization and configuration, especially when the developers are highly self-motivated and will learn grunt on their own anyway. And that was clearly us.

### Conclusion

In the next couple posts, I'll detail _how_ we went about migrating from lineman to grunt and what we saw as a result, so I don't want to say too much toward that point here. But I will say that, in general, our build process is much more flexible and accessible now that we don't use lineman, and we've really expanded what we can do with grunt tasks.
