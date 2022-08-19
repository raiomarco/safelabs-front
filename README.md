# SafeLabs-playlist-front

## How to run

First of all, we need to set the environment variables.

You can either create a `.env` file based on the `.env.example` file or you can set the environment variables directly in your terminal (great for CI/CD).

Then you can execute the following command to run the application:

```bash
docker-compose -f .\docker-compose.yml up -d -V --remove-orphans --build
```

And now you can visit the application on the 80 port (or the 443 port, but missing certificate, could use a proxy pass).

---

## Report

This application was created because i thought a `FullStack` challenge without a front-end was a bit strange...

It's not complicated, using `React` with `react-router-dom` for routing and `bootstrap` for the styling (with custom css too).

A `template` was created to prevents code repetition and to make the application more readable.

I didn't created a `components` folder because everything was so unique (because of the simplicity of the app) that it was not necessary (which is really sad because i really like props and state management =/).

The `/home` page is the main page of the application, where you can select what type of information do you want to use on the search.

Every input is validated before submit (which is just changing the page to the next one).

On the `/results` page, you can see the results from the back-end API.

The query params is used to keep the search on the URL, so the user can save or share without problems (and it's removed when it's back on home, keeping it nice and clean).

The page is responsive and adapts for mobile, so you can use it on a smartphone.

This project uses a `.env` for back-end URL's, making it and easier to deploy to different environments (an staging environment and a production environment for example).

When there's an error on the back-end for some reason, there's a popup with the error message, and when pressing OK it will bring the user to the home (a great way to test it is trying a nonexistent city).
