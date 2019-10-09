---
title: Pixeo
subtitle: Web agency
thumbnail: "/media/pixeo.jpg"
color: 85FFFF
current: false
datePublished: 20130101
---

<div class="intro mb-4">

[Pixeo](https://pixeo.be) from Arendonk, Belgium offers total digital packages, gaining from graphic design to websites over web apps and digital marketing, to small and medium-sized companies that believe in their own digital future.

</div>

<div class="column-lg-2 column-xxl-3 mb-4">

I started at Pixeo in 2013 ago as a Junior Front-end Developer with the main task of designing and building websites. Over the years I have been able to contribute to a whole smörgåsbord of projects, often as a Lead Front-end Developer.

Due to the size of Pixeo, at most 6 people, we could behave like a startup. The tech stack of Pixeo has changed drastically over the course of our mutual career. Every new technology popping up was viewed with a critical eye, assessed as to whether it benefits our daily workflow, tested and depending on the results, implemented as quickly as possible.

</div>

## Evenementenkluis

<div class="column-lg-2 column-xxl-3 mb-4">

This project began at the end of 2017. The Evenementenkluis (roughly translated the "Event Vault") is a web platform where organizers can manage the entire municipal regulation around an event from start to end in a single place and where local authorities can follow and assist it at any given time.

With the help of a few simple multiple choice questions, organizers can get the necessary form, fill it in online and submit it. The competent authorities can provide their own specialized advice per form. Depending on these recommendations, an organizer can make the necessary changes in time before the start of the event.

As of 2019, Pixeo is full build-mode for the Evenementenkluis's next feature, a full blown rental module. This enables organizers to immediately rent out the necessary materials for her/his event. From the organizer's point of view, everything is nicely bundled and organized within one event view en several subviews. Behind the scenes, the rental request is send to the right person within the municipality, like the rental-manager, logistic personnel.

In this project I helped build the technical framework. The front end is built on Nuxt.js, the Vue counterpart of Next.js and the backend on a .NET Core Web API. The entire project follows the principle of Continuous Delivery with a weekly patch-release cycle and a monthly minor-release cycle. This is also possible thanks to a well-designed GitLab CI / CD configuration and a thorough testing suite build upon [Cypress](https://cypress.io).

Since September 2018 we have been in production with v1.0.0 of the Event Safe in 2 municipalities. The goal of the Evenementenkluis is provide every municipality in Flanders with this platform.

Shortly after the release of v1.0.0, my function within the project was briefly changed to following up on incoming feedback, bugs and feature requests. A.h.v. screenshots or video replays of the relevant feedback, I pass this on as clearly as possible to my fellow developers via the GitLab issue boards. I consult with the team on how we can implement new features in the most usable and efficient way.

You can visit this platform at mol.evenementenkluis.be and evenementen.balen.be.

</div>


## Omnitruck

<div class="column-lg-2 column-xxl-3 mb-4">

In the summer of 2018 I was commissioned to develop a knowledge-base for a logistics/transport company, codenamed Omnitruck.

The purpose of this platform is to provide a fast, easy and digital documentation platform for all their drivers.

Due to the large number of internationalities of employees within the company, the platform had to be available in 6 different languages. After the first load, the web app skeleton is stored on the user's device as a **PWA**, after which the user only has to retrieve the content from the server. This will ensure that despite the high possibility of suboptimal network conditions, truck drivers will consult the app at lightning fast speeds.

I had the opportunity to develop the complete application. This application is built on a [Nuxt.js](https://nuxtjs.org/) frontend and [Laravel](https://laravel.com/) API back-end. The initial load is rendered [Server-Side](https://ssr.vuejs.org/#what-is-server-side-rendering-ssr) and is saved as a [PWA](https://developers.google.com/web/progressive-web-apps/) on the user's device. The applications contains following features:

-  Internationalization of 6 languages
-  Authentication via an OAuth2 layer
-  Authorization via multiple roles
-  Diff-view of the latest changes
-  Search
-  PWA functionality
-  Server-side rendering
-  [CKEditor](https://ckeditor.com/ckeditor-5/) integration
-  ...

</div>

## Other work

### [Arkana](https://www.arkana.be/)
Front-end implementation of a design system used throughout the entire [B&R Building Group](http://jobs.benrbouwgroep.be/)

### [Bemdhal](http://www.bemdhal.be/nl-BE/)
Design & build for a local sports complex
