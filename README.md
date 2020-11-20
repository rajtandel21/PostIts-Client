# PostIt's - Client Repository

[![License: MIT](https://img.shields.io/badge/Licence-MIT-green.svg)](https://opensource.org/licenses/MIT)

![PostIts-min](https://user-images.githubusercontent.com/73439151/99552244-af7d2b00-29b4-11eb-962d-9877b1f5e6ae.gif)

PostIt's is a website where anonymous users can post and comment on other people's posts.

## Installation

* Clone and download this repo.

* Clone and download the PostIt's server repo.

* Get Api key from GIPHY and enter it into the variable apiKey in app.js

## Usage 

* Go to the following link:

* Through the User Interface write posts in the small left container (top for smartphones and tablets) or write comments on other posts in the large right container (bottom for smartphones and tablets).


## Technologies

* Figma
* HTML
* CSS
* JavaScript
* Netlify
* Heroku


## Process

The project started with the analysis of the website requirements based on which a rough design was sketched using Figma. We then created a plan in a shared Google Docs file where we outlined what features we wanted to include, allocated a time frame for each one and logged our progress and remaining tasks.


After the planning and designing step, we worked on the initial HTML, Javascript and Server-side JavaScript by mob programming. This step ensured we had a basic functioning website before we split tasks and worked on specific features individually.

Everytime a new functioning feature was completed, its branch was merged to the Development branch and pushed to the main git repository. At the end all final changes were merged with the master branch.

## Code Snippets

Method of adding a background image with a set opacity. Source: [CSS Tricks](https://css-tricks.com/snippets/css/transparent-background-images/)

```CSS
html::after {
    content: "";
    background: url(img-url);
    opacity: 0.75;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: cover;
}
```

## Wins & Challenges

Wins | Challenges
------------ | -------------
Improved understanding of Bootstrap and how to use it in combination with vanilla CSS. | The page layout was challenging to implement as the features were often unresponsive.
Succesfully posted gif and emoji data on the page and saved it on our server. | The Bootstrap and vanilla CSS styling would often override each other, creating confusion about the origin of the style.
Entered and stored new data into an external json file. | Creating the function that allowed us to post comments on the page and store them in a separate .json file.
Recorded a gif highlighting the website functionality and inserted it into the README file. | Hiding a responsive API key using a dotenv file.

## Bugs

* When trying to comment with an emoji to a post, the comment and emoji button expand disproportionately to the text area, but go back to their normal size after posting the comment.

## Features

* Ability to post text, gifs and emojis in a designated area.
* Ability to comment on other people's posts with text and emojis.

## Future Features

* Searching for a specific gif.
* Creating different boards for different topics.
* Sorting the posts based on the published dates.
* Adapting the CSS for all different browsers.
* Making the design responsive for tablets.
* Allowing users to create an account and authenticate on the website.
* Adding a badge and a license to the repo.

## Licence

* [MIT Licence](https://opensource.org/licenses/mit-license.php)
