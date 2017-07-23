### T-shirt Designer Prototype

A simplified tshirt design editor that can support text/image
uploading, resizing and rotation.

### Things to yet implement
- Proper validation (angular as well as node)
- auto zoom down of image after upload
- text color
- Awesome Theme
- Delete of saved entries

### Requirements

- Node 6.x.x (latest LTS)
- NPM
- Bower

### Installation

Execute the following commands in squential manner

```shell
npm install
bower install
```

Add seed data

```shell
npm run seed
```

### Starting     

Execute the following commands
```shell
npm start
```

By default the server will be listning at localhost:3000

But you can configure the following parametes by use of environment variable:
- NODE_ENV | used to set environment for node app | Default: development
- NODE_PORT | used to set port on which server will listen | Default: 3000
- MONGO_HOST | used to set mongo db host address | Default: localhost
- MONGO_PORT | used to set mongo db host port | Default: 27017
- MONGO_DB_NAME | name of the mongo database | Default: tshirtApp

Accessing App

After the server starts listning on a port, just navigate to that url
from your browse.

E.g: http://localhost:3000/

Here you can find the Angular App running

Additionally this Angular App depends on Backend node server for its data services

### How to use

First choose a tshirt template form dropdown on left side in style tab
pick your color

For adding text/image proceed to Text/Image Tab
Additional simple formatting for text is available from buttons at top for tshirt display canvas

Delete button on top deletes and active selected object

On right side you can enter your style name and email
Here you can access for history as well as stored designs

For saving click on save button (Note: for saving style title and email is must).

### Node APIs

`GET` /api/colors
Gives list of all the colors in database

`POST` /api/colors
Add new color to database
```js
{
  name: 'name',
  code: 'colorCode'
}
```

`GET` /api/tshirts
Gives list of all the tshirts templates in database

`POST` /api/tshirts
Add new tshirt template to database
```js
{
  name: 'name',
  img: 'data:image/png;base64,iVBORw0KGgo...'
}
```

`GET` /api/canvases?email=some@email.com
Gives list of all the saved canvases by email

`POST` /api/canvases
Add new tshirt to database
```js
{
  colorCode: 'code',
  apparelId: 'unique tshirt id',
  title: 'name or title of canvas',
  email: 'email of creator',
  canvasJSON: {/** fabric.js canvas json data**/}
}
```