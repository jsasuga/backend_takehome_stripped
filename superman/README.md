# Setup

Make sure that you have a somewhat recent version of batmobile: get the latest master-master.

# Running Tests

## Units

Run units like this:

  $ npm run units

Run a particular file like this:

  $ npm run units billingAPI*

Any glob will do

## Custom E2Es

You can run E2Es with a custom glob like this:

  $ npm run e2es_custom **/ViewCampaign.spec.js

That will run nodemon and your tests.

This command is useful for isolating a test or a group of tests. You don't want to waste time.

## Pipelines

There are two main ways to run pipelines tests locally. We run these to simulate what piplines does.

### Regular Simulation

Here is the first, and simplest, way:

  $ npm run pipes step=<step_name>

For example:

  $ npm run pipes step=e2es

This command will simulate pipelines, locally. You are running the step "e2es", which you can find
in pipe_scripts/e2es.sh.

### Perfect Simulation

Here is the more advanced way:

  $ npm run simulate_bitbucket_pipes step=<step_name>

You do this if you want to reproduce what pipes is doing completely. The main difference is that
this command will pull your code from bitbucket. The previous command will volume your repo.

# Running a Stack

## Full-stack

Run quinn and superman

  $ npm run fullstack

Run penguin, quinn, and superman

  $ npm run fullstack_with_penguin

## Back-stack

Run penguin and superman

  $ npm run backstack_with_penguin

## Running with Containerless Quinn

Sometimes, you want to run quinn outside of its container. Normally, I do this when writing cypress
tests. That way, quinn will bounce on file changes that I make to its repo.

You need two terminals for this. In the first, run superman without penguin:

  $ npm run serve

Then run quinn in a different terminal:

  $ npm run serve_quinn

# Calling the API

### How to create a model

Call this:

   POST  /api/<model-name>/create
   BODY  {
     "name": "stuff"
   }

Response:

   BODY  {
     "id": "123",
     "name": "stuff"
   }

### How to get a model

Call this:

   GET  /api/<model-name>/get
   BODY  {
     "id": "123"
   }

### How to load seed data.

Currently, we support test mode only.

Edit this file:

  /seed_data/test.js

Call this route:

  localhost:1938/admin/seed_data/test

# How do I test superman e2e with TLS?

first you should go to branch `ssl_test_loadbalancer_alien` where the Caddy configs are (this commit `e4b03ac709edbdb7ce38c38dd3478e3414c3fa40` has the superman configs set to https to pass through Caddy and was tested, but it must be tested with the frontend commit below for the https configs to be correct)

you'll also want to go to branch `ssl_testing_caddy` in `base_frontend` where the API port is set to `https://localhost` (this `base_frontend` commit was built and tested for TLS=`cf9f40099e63a9b3c17101b2d9047d7db239d0f8`)

next, you want to do a few things:
- first cd to the `base_frontend` repo and into the `brandUI` directory and run `npm run build`. When that's done from within `base_frontend` run `cp -r dist/ ../../superman/`
  -why? first, you need to build Quinn for prod. Quinn in dev mode doesn't work with TLS because Vue is constantly making connections to poll for code changes to render and that means the app won't render in your browser. By building Quinn for prod we combine and minify all of Quinn into a set of files that can be served without the Quinn backend running. This means that Vue doesn't poll and the page is able to load
- next, you need to open a few terminals. The first terminal should run Caddy for TLS. You can do this with `npm run caddy_local_up`. This will enable TLS on localhost. Keep this terminal open
- in another terminal, you need to goto the `superman` directory (you should be there if you're reading this) and run `npm run serve`. This runs the superman backend to receive requests from Caddy. Keep this terminal open
- BONUS SANITY CHECK: `curl https://localhost/admin/ping` -- this will tell you that you can hit superman from Caddy TLS and it routes correctly in the terminal. The real sanity test is in the browser though, so run `npm run co`, and run any of the `fullstack` commands, those will hit the localhost TLS page and confirm everything works

- note: if you need to make a change to Quinn in this workflow, you'll need to rebuild Quinn everytime. The other terminals can stay up and will load the new Quinn automatically after you've run the `cp` command to copy it into superman
