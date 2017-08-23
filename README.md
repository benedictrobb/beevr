## About The Project

BEEVR helps connect students, who are looking for ad hoc work that fits their schedule, with residents who need help with everyday tasks.

## Getting Started

git clone

npm install

npm start

cd react-ui

npm start


## Running The Tests

npm test

## Modifying the job categories dropdown (only for collaborators)
1. Go to [job_categories.js](https://github.com/majakudlicka/beevr/blob/master/react-ui/src/constants/job_categories.js) file.
1. Click on "edit this file" (pencil icon on the top right).
1. Add/modify the categories as needed, make sure that:
    * The first line is always:
    ```js
    const categories = [
    ```
    * The format of list items is:
    ```js
    {group: 'NAME OF THE HEADER', value: 'NAME OF THE CATEGORY'},
    ```
    * The list ends with:
    ```js
    ];
    
    export default categories;
    ``` 
1. When done go to the bottom of the page to "Commit changes".
1. Leave the pre-defined description (or write a brief description of what you have done).
1. Select "Commit directly to the master branch."
1. Click on the "Commit changes" button.
1. After a couple of minutes the changes should appear in the app.

___Please note that the points of the Add/modify step are VERY important and ALL and EVERY punctuation/parenthesis HAVE to be right for the App to work.___

## Built With

* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Redux](http://redux.js.org/)
* Node.js
* Hapi.js
* Postgres-SQL [Database schema](https://app.quickdatabasediagrams.com/#/schema/9klWQjlbdUC-GABVZxLzPg)


## Contributors

The list of project contributors can be found [here](https://github.com/majakudlicka/beevr/graphs/contributors)

## License

 This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
