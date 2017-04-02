# storage-js-iso

storage.js compatible with isomorphic apps.

### How to use

```html
<script src="https://unpkg.com/storage-js-iso@0.2.0/dist/storage.min.js"></script>
```

```js
$storage.on('time', function (e) {
  console.log('time changed', e)
})

setInterval(function () {
  $storage.set('time', (new Date()).getTime());
}, 50)
```

### API

- set(key:String, value:Any)
- get(key:String)
- remove(key:String)
- clear()
- on(key:String, fn:Function)
- off(key:String, fn:Function)
