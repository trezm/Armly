Armly
=====

Formerly Open Builder, Armly is a management tool for tabletop games written in Javascript and HTML5.  The goal of this project was to create an open source tool for the community to better serve them across platforms and operating systems.

Overview
-----
The Armly server works using two independent pieces, a REST API, built on nodejs, and a javascript front end.
* ArmlyServer
  * Written using MongoDB as backend database
  * Stores army lists and army books.
* Client
  * Can use ArmlyServer as product server
  * Otherwise normal javascript
  * Contacts REST API in order to store and load army lists and army books

Notes
-----
This project is still in its beta phase and, as such, there will likely be many rapid iterations.  Please keep updated and post any questions you might have.  We will have an installation guide soon.
